import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import NavbarLink from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropDown from '../core/auth/ProfileDropDown'
import { categories } from '../../services/api'
import { apiConnector } from '../../services/apiconnectors'
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const sublinks=[
    {
        title:"python",
        link:"/catalog/python"
    },
    {
        title:"web dev",
        link:"/catalog/web-development"
    },
 ]
export default function Navbar() {
 const {token} = useSelector((state)=>state.auth)
 const {user} = useSelector((state)=>state.profile)
 const {totalItems} = useSelector((state)=>state.cart)
 const location = useLocation()
 

 const matchRoute = (route)=>{
    return matchPath({path:route}, location.pathname)
    
 }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-700'> 
    <div className='w-11/12 flex max-w-maxContent items-center justify-between'>
     <Link to="/">
     <img src={logo} alt="logo" width={160} height={42} loading='lazy' />
     </Link>

     <nav>
        <ul className='flex flex-col md:flex-row md:justify-between md:items-center md:gap-x-6 text-richblack-25'>
            {
            NavbarLink.map((link,index)=>(
                <li key={index}>
                   {
                    link.title === "Catalog" ? 
                         (

                         <div className='group relative flex items-center gap-x-3'>
                            <p>{link.title}</p>
                            <MdKeyboardDoubleArrowDown />
                            
                            <div className='z-50 invisible absolute translate-x-[-50%] translate-y-[20%]
                             left-[50%] top-[50%]
                             flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                             opacity-0 transition-all duration-200 group-hover:visible
                             group-hover:opacity-100 lg:w-[300px]
                            '>
                            <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45 translate-y-[-30%] translate-x-[88%] rounded  bg-richblack-5'>

                            </div>
                                {
                                   sublinks.length ? 
                                   ( 
                                    sublinks.map((subLink,index)=>(
                                        <Link key={index} to={`${subLink.link}`}>
                                        <p>{subLink.title}</p>
                                        </Link>
                                    ))
                                    
                                   ):
                                   (

                                   <div></div>

                                ) 
                                }
                            </div>
                         </div>
                        
                        ):(
                         <Link to={link?.path}>
                            <p className={`${matchRoute(link?.path) ? "text-yellow-25":"text-richblack-25"}`}>
                                {link.title}
                            </p>
                         </Link>
                         )
                   }
                </li>
            ))
            }
        </ul>
     </nav>
       {/* login, sign up,dashboard */}
       <div className='flex gap-x-4 items-center'>
          {
            user && user.accountType != "Instructor" && (
                <Link to="/dashboard/cart"  className='relative'>
                  <FaShoppingCart />
                  {
                    totalItems > 0 && (
                        <span>
                            {totalItems}
                        </span>
                    )
                  }
                </Link>
            )
          }
          {
            token === null && (
                <Link to="/login">
                    <button className='border border-richblack-700 bg-richblue-800 px-[12px] py-[8px] 
                    text-richblack-100 font-extralight
                    '>login</button>
                </Link>
            )
          }
          {
            token === null && (
                <Link to='/signup'>
                    <button className='border border-richblack-700 bg-richblue-800 px-[12px] py-[8px] 
                    text-richblack-100 font-extralight
                    '>sign up</button>
                </Link>
            )
          }

          {
            token !== null && <ProfileDropDown/>
          }

       </div>


    </div>



    </div>
  )
}

