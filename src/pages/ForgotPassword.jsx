import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authApi';
 function  ForgotPassword () {
   const [emailSent , setEmailSent] = useState(false)
   const [email,setEmail] = useState("");
    const {loading} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()

const handleOnSubmit = (e)=>{
     e.preventDefault();
     dispatch(getPasswordResetToken(email,setEmailSent))

}



  return (
    <div className='flex justify-center items-center text-white'>
       {
        loading ? 
           (<div>Loading...</div>):
           (
            <div>
                <h1>
                    {
                    !emailSent ? "Reset your password":"Check your email"
                    }
                </h1>
                <p>
                    {
                     !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery": `we have sent the reset email to ${email}`   
                    }
                </p>
            <form onSubmit={handleOnSubmit}>
                {
                    !emailSent && (
                        <label htmlFor="email">
            <p>Email Address:</p>
              <input 
                type="email"
                required
                name="email"
                value={email}
                onChange=      {(e)=>setEmail(e.target.value)}
                placeholder='Enter your email'

               />
                        </label>
                    )
                }
                <button type='submit'>
                    {
                        !emailSent ?"Reset Password":"Resend email"
                    }
                </button>
            </form>
            <div>
                <Link to="/login">
                <p>Back to login</p>
                </Link>
            </div>
            </div>
           )
       } 
        
     </div>
  )
}

export default ForgotPassword
