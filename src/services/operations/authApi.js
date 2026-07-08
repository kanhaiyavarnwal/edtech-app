import toast from "react-hot-toast";
import { userEndpoints } from "../api"
import { apiConnector } from "../apiconnectors"
import {resetCart} from "../../slices/cartSlice"
import {setLoading,setToken} from "../../slices/authSlice"
import {setUser} from "../../slices/profileSlice"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSWORD_API,
    RESETPASSTOKEN_API
       
} = userEndpoints;



export function sendOtp(email,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", SENDOTP_API,{
                email,
                checkUserPresent:true,
            })
            console.log(" send otp response in the operations-> ",response)
            console.log(response.data.success)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("otp send successfully")
            navigate("/verify-email")
           

        }catch(err){
            console.log("send otp api err in the operation -> ",err)
            toast.error(err.message)
        }
        dispatch(setLoading(false))
    toast.dismiss(toastId)
    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    
    navigate
){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
       const response = await apiConnector("POST", SIGNUP_API,{
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        
       })
       console.log("hlo")
       console.log("sign up response from operation -> ",response)

       if(!response.data.success){
        throw new Error(response.data.message)
       }

       toast.success("signUp successfully")

       navigate("/login")

        }catch(err){
        console.log("Sign up api err-:> :",err.message)
        toast.error("signUp failed")
        navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email,password,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        console.log(email,password)
        try{
            const response = await apiConnector("POST", LOGIN_API,{
                email,password,
            })
            console.log("before response")
            console.log("login api response  : ",response)
            console.log("after response",response.data.message)
            if(! (response.data.success)){
                throw new Error( response.data.message)
            }
            toast.success("Login successfully")
            dispatch(setToken(response.data.token))
            const userImage = await response.data?.user?.image
            ? response.data.user.image :
             `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({...await response.data.user, image: userImage}))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user",JSON.stringify( response).data.user)
            navigate("/dashboard/my-profile")
        }catch(err){
            console.log("login api err-> : ",err.message)
            toast.error("could not login")
        }
         dispatch(setLoading(false))
    toast.dismiss(toastId)
    }
}

export function logOut(navigate){
    return (dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
         localStorage.removeItem("token")
         localStorage.removeItem("user")
         toast.success("Logged Out")
         navigate("/")
    }
}




export function getPasswordResetToken (email,setEmailSent){
    return async(dispatch) =>{
        dispatch(setLoading(true))
        console.log("token api: ",RESETPASSTOKEN_API)
        try{
            const response = await apiConnector("POST", RESETPASSTOKEN_API,{email})
            console.log("resetpasword token res-> ",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Reset email sent");
            setEmailSent(true);
        }
        catch(err){
            console.log("Reset password token error",err)
            toast.error("email not send")

        }
        dispatch(setLoading(false))
    }
}

export function resetPassword(password,confirmPassword,token){
    return async(dispatch)=>{
        dispatch(setLoading(true))
        console.log("reset password token api: ",RESETPASSWORD_API)
        try{
            const response = await apiConnector("POST", RESETPASSWORD_API,{
                password,confirmPassword,token
            })
            console.log("reset password response : ",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("password has been reset successfully")
        }catch(err){
            console.log("error in reset password token error; ",err.message)
            toast.error("unable to reset password")
        }
        dispatch(setLoading(false));
    }
}