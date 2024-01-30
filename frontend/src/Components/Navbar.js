import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

import DropDown from './DropDown';
const Navbar = (props) => {
    let isLoggedIn = props.isLoggedIn;
    let setIsLoggedIn = props.setIsLoggedIn;

    // const [openDropDown, setOpenDropDown] = useState(true);

    return (
        <div className="w-full bg-slate-800 text-white h-[60px] flex flex-row justify-between  items-center pl-[20px] pr-[20px]" >
            <Link to='/' className='text-3xl font-bold text-neutral-300'>Shortify</Link>
            <Link to='/'>Home</Link>
            <div className='flex items-center gap-3'>
                {!isLoggedIn &&
                    <Link to='/login'>
                        <button className=''>
                            Login
                        </button>
                    </Link>
                }
                {!isLoggedIn &&
                    <Link to='/signup'>
                        <button className='' >
                            Sign Up
                        </button>
                    </Link>
                }

                {/* {isLoggedIn && openDropDown &&
                    <div>
                        <div className='flex space-x-1 hover:bg-slate-700 p-1'>
                            
                            <button className=''>
                                Sandeep koshti
                            </button>

                        </div>
                        <DropDown />
                    </div>
                } */}
                {/* {isLoggedIn &&
                    
                } */}
            </div>
        </div>
    )
}

export default Navbar
{/* <Link to='/'>
                <button className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700' onClick={()=>{
                    setIsLoggedIn(false);
                    toast.success("Logged Out");
                }}>
                    Log Out
                </button>
            </Link> */}