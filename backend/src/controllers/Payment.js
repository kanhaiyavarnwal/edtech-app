import { instance } from "../utils/razorpay.js";
import { CourseProgress } from "../models/CourseProgress.js";
import {Course} from "../models/Course.js"
import {User} from "../models/User.js"
import {mailSender} from "../utils/mailSender.js"
import { courseEnrollmentEmail } from "../mail/templates/courseEnrollmentEmail.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { paymentSuccessEmail } from "../mail/templates/paymentSuccessful.js";

// capture the payment and initiate razorpay
const capturePayment = asyncHandler(async(req , res)=>{
    // get courseid and userid
    //  const { course_id} = req.body;
     const userId = req.user.id;
     const {courses} = req.body;

    //validation
    // if(!course_id){
    //     throw new ApiError(401, "please provide valid course id")
    // }
    if(courses.length === 0){
        throw new ApiError(404,"course not found")
    }

    let total_amount = 0

    for(const course_id of courses){
        let course

        try{
         //find the course by its id
           course = await Course.findById(course_id)
              // If the course is not found, return an error
              if(!course){
        
         throw new ApiError(404, "could not find the course")
    
       }

       // check if the user is already enrolled in the course
       const uid = new mongoose.Types.ObjectId(userId) 
       if(course.studentEnrolled.includes(uid)){
           throw new ApiError(200,"Student is already Enrolledd")
       }

         // Add the price of the course to the total amount
         total_amount += course.price

        }catch(err){
           console.log(err)
           throw new ApiError(500,err.message)
        }
    }

    const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }


     try{  
      //  initiate the payment using razorpay
      const paymentResponse = await instance.orders.create(options)

      console.log("payment Response ;-> ",paymentResponse)
          
      res.json(
        new ApiResponse(200,paymentResponse,"payment initiated success")
      )
    
     }catch(err){
       console.log(err)
       throw new ApiError(500,"Could not initiated payment")
     }
     
  
})

const verifySignature = asyncHandler(async(req , res)=>{
   

    const{rozarpay_order_id , rozarpay_payment_id , rozarpay_signature , courses} = req.body;
    
    const userId = req.user?.id

    if(!rozarpay_order_id || ! rozarpay_payment_id || ! rozarpay_signature || ! courses || ! userId){
        throw new ApiError(401,"Payment failed")
    }

    let body = rozarpay_order_id + "|" + rozarpay_payment_id

    const expectedSignature = crypto
       .createHmac("sha256" , process.env.ROZARPAY_SECRET)
       .update(body.toString())
       .digest("hex")

        if(expectedSignature === rozarpay_signature){
            await enrollStudents(courses,userId,res)

            return res
            .status(200)
            .json(
                new ApiResponse(200,"Payment verified")
            )
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200,"Payment failed")
        )
})

const sendPaymentSuccessfullPayment = asyncHandler(async(req , res)=>{
    const {orderId , paymentId , amount} = req.body;

    const userId = req.user?.id

    if(!orderId || !paymentId || ! amount || !userId){
        throw new ApiError(400,"provide all the field")
    }

    try {
        const enrolledStudent = await User.findById(userId)
        await mailSender(
            enrolledStudent.email,
        `Payment Recieved`,
        paymentSuccessEmail(
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
            amount / 100 ,
            orderId,
            paymentId
        )
        )
    } catch (error) {
        console.log("error in sending email", error.message)
        throw new ApiError(400, "could not send email")
        
    }
}) 

// enroll the student int he course

const enrollStudent = asyncHandler(async(courses , userId , res)=>{
    if(!userId  || !courses){
        throw new ApiError(400,"please provide userId, courses")

    }
   for(const courseId of courses){
     try{
     // find the course and enrolled the student in it
     const enrolledCourse = await Course.findOneAndUpdate(
        {_id:courseId},
        {$push:{studentsEnrolled: userId}},
        {new:true}
     )
     if(!enrolledCourse){
        throw new ApiError(500,"course not found")
     }
     console.log("enrolledCourse:-> ",enrolledCourse)

     const courseProgress = await courseProgress.create({
                                courseID:courseId,
                                userID:userId,
                                completedVideo:[],
     })

    // find the student and addd the course
    const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {$push:{courses:courseId,
                courseProgress:courseProgress?._id,
        },
    },{new:true}
    )
    console.log("enrolled student : ",enrolledStudent)

    // send an email notifications to the enrolled student

    const mailResponse = await mailSender(
          enrolledStudent.email,
          `successfully enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(
            enrolledCourse.courseName,
            `${enrollStudent.firstName} ${enrolledStudent.lastName}`
          )
    )
     console.log("email send successfully-> ",mailResponse)

     }catch(err){
       console.log(err)
       throw new ApiError(400,"err while sending the course enrolled"| err.message)
     }
   }



})

export {capturePayment , verifySignature,sendPaymentSuccessfullPayment,enrollStudent}