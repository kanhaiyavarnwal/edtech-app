
// import { Link, matchPath, useLocation } from 'react-router-dom'
// import logo from "../../assets/Logo/Logo-Full-Light.png"
// import NavbarLink from "../../data/navbar-links"
// import { useSelector } from 'react-redux'
// import { FaShoppingCart } from "react-icons/fa";
// import ProfileDropDown from '../core/auth/ProfileDropDown'
// // import { categories } from '../../services/api'
// // import { apiConnector } from '../../services/apiconnectors'
// import { MdKeyboardDoubleArrowDown } from "react-icons/md";

// const sublinks=[
//     {
//         title:"python",
//         link:"/catalog/python"
//     },
//     {
//         title:"web dev",
//         link:"/catalog/web-development"
//     },
//  ]
// export default function Navbar() {
//  const {token} = useSelector((state)=>state.auth)
//  const {user} = useSelector((state)=>state.profile)
//  const {totalItems} = useSelector((state)=>state.cart)
//  const location = useLocation()
 

//  const matchRoute = (route)=>{
//     return matchPath({path:route}, location.pathname)
    
//  }

//   return (
//     <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-700'> 
//     <div className='w-11/12 flex max-w-maxContent items-center justify-between'>
//      <Link to="/">
//      <img src={logo} alt="logo" width={160} height={42} loading='lazy' className=''/>
//      </Link>

//      <nav className='hidden md:block'>
//         <ul className='flex flex-col md:flex-row md:justify-between md:items-center md:gap-x-6 text-richblack-25'>
//             {
//             NavbarLink.map((link,index)=>(
//                 <li key={index}>
//                    {
//                     link.title === "Catalog" ? 
//                          (

//                          <div className='group relative flex items-center gap-x-3'>
//                             <p>{link.title}</p>
//                             <MdKeyboardDoubleArrowDown />
                            
//                             <div className='z-50 invisible absolute translate-x-[-50%] translate-y-[20%]
//                              left-[50%] top-[50%]
//                              flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
//                              opacity-0 transition-all duration-200 group-hover:visible
//                              group-hover:opacity-100 lg:w-[300px]
//                             '>
//                             <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45 translate-y-[-30%] translate-x-[88%] rounded  bg-richblack-5'>

//                             </div>
//                                 {
//                                    sublinks.length ? 
//                                    ( 
//                                     sublinks.map((subLink,index)=>(
//                                         <Link key={index} to={`${subLink.link}`}>
//                                         <p>{subLink.title}</p>
//                                         </Link>
//                                     ))
                                    
//                                    ):
//                                    (

//                                    <div></div>

//                                 ) 
//                                 }
//                             </div>
//                          </div>
                        
//                         ):(
//                          <Link to={link?.path}>
//                             <p className={`${matchRoute(link?.path) ? "text-yellow-25":"text-richblack-25"}`}>
//                                 {link.title}
//                             </p>
//                          </Link>
//                          )
//                    }
//                 </li>
//             ))
//             }
//         </ul>
//      </nav>
//        {/* login, sign up,dashboard */}
//        <div className='flex gap-x-4 items-center'>
//           {
//             user && user.accountType !== "Instructor" && (
//                 <Link to="/dashboard/cart"  className='relative'>
//                   <FaShoppingCart />
//                   {
//                     totalItems > 0 && (
//                         <span>
//                             {totalItems}
//                         </span>
//                     )
//                   }
//                 </Link>
//             )
//           }
//           {
//             token === null && (
//                 <Link to="/login">
//                     <button className='hidden sm:block border border-richblack-700 bg-richblue-800 px-[12px] py-[8px] 
//                     text-richblack-100 font-extralight
//                     '>login</button>
//                 </Link>
//             )
//           }
//           {
//             token === null && (
//                 <Link to='/signup'>
//                     <button className='hidden sm:block border border-richblack-700 bg-richblue-800 px-[12px] py-[8px] 
//                     text-richblack-100 font-extralight
//                     '>sign up</button>
//                 </Link>
//             )
//           }

//           {
//             token !== null && <ProfileDropDown/>
//           }

//        </div>


//     </div>



//     </div>
//   )
// }



import React, { useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import NavbarLink from "../../data/navbar-links";
import ProfileDropDown from "../core/auth/ProfileDropDown";

import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const sublinks = [
  {
    title: "Python",
    link: "/catalog/python",
  },
  {
    title: "genAi",
    link: "/catalog/genAi",
  },
  {
    title: "Web Development",
    link: "/catalog/web-development",
  },

];

export default function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <header className="border-b border-richblack-700 bg-richblack-900 sticky top-0 z-50">
      <div className="mx-auto flex h-16 w-11/12 max-w-maxContent items-center justify-between">

        {/* Logo */}

        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="w-28 md:w-40"
            loading="lazy"
          />
        </Link>

        {/* ================= DESKTOP NAV ================= */}

        <nav className="hidden md:block">
          <ul className="flex items-center gap-7 text-richblack-25">

            {NavbarLink.map((link, index) => (
              <li key={index}>

                {link.title === "Catalog" ? (

                  <div className="group relative flex cursor-pointer items-center gap-2">

                    <p>{link.title}</p>

                    <MdKeyboardDoubleArrowDown />

                    <div
                      className="
                      invisible
                      absolute
                      left-1/2
                      top-full
                      mt-4
                      w-60
                      -translate-x-1/2
                      rounded-lg
                      bg-richblack-5
                      p-3
                      text-richblack-900
                      opacity-0
                      shadow-xl
                      transition-all
                      duration-200
                      group-hover:visible
                      group-hover:opacity-100
                    "
                    >
                      {sublinks.map((item, i) => (
                        <Link
                          key={i}
                          to={item.link}
                          className="block rounded-md px-3 py-2 hover:bg-richblack-50"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                ) : (

                  <Link to={link.path}>
                    <p
                      className={`${
                        matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>

                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* =========== RIGHT SECTION =========== */}

        <div className="flex items-center gap-4">

          {/* Cart */}

          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">

              <FaShoppingCart size={22} />

              {totalItems > 0 && (
                <span
                  className="
                  absolute
                  -right-2
                  -top-2
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-yellow-50
                  text-xs
                  text-black
                "
                >
                  {totalItems}
                </span>
              )}

            </Link>
          )}

          {/* Desktop Buttons */}

          {token === null && (
            <div className="hidden md:flex gap-3">

              <Link to="/login">
                <button className="rounded-md border border-richblack-700 bg-richblue-800 px-4 py-2 text-richblack-5 hover:bg-richblue-700">
                  Login
                </button>
              </Link>

              <Link to="/signup">
                <button className="rounded-md border border-richblack-700 bg-yellow-50 px-4 py-2 text-richblack-900 hover:bg-yellow-100">
                  Sign Up
                </button>
              </Link>

            </div>
          )}

          {/* Profile */}

          {token !== null && <ProfileDropDown />}

          {/* Mobile Menu Button */}

          <button
            className="text-white md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>

        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[600px] " : "max-h-0 max-w-[0px]"
        }`}
      >
        <div className="border-t border-richblack-700 bg-richblack-900">

          <ul className="flex flex-col gap-1 p-5">

            {NavbarLink.map((link, index) => (

              <li key={index}>

                {link.title === "Catalog" ? (

                  <>
                    <p className="mb-2 text-richblack-100 font-semibold">
                      Catalog
                    </p>

                    <div className="ml-4 flex flex-col gap-2">

                      {sublinks.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.link}
                          onClick={() => setMenuOpen(false)}
                          className="text-richblack-300"
                        >
                          {sub.title}
                        </Link>
                      ))}

                    </div>
                  </>

                ) : (

                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-2 ${
                      matchRoute(link.path)
                        ? "text-yellow-50"
                        : "text-richblack-25"
                    }`}
                  >
                    {link.title}
                  </Link>

                )}

              </li>

            ))}

            {token === null && (

              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  <button className="mt-4 w-full rounded-md bg-richblue-800 py-2 text-white">
                    Login
                  </button>
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                >
                  <button className="mt-2 w-full rounded-md bg-yellow-50 py-2 text-black">
                    Sign Up
                  </button>
                </Link>
              </>

            )}

          </ul>

        </div>
      </div>
    </header>
  );
}