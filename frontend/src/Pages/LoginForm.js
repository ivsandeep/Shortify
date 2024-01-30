import React, { useState } from 'react'

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'

import { toast } from 'react-hot-toast'

const LoginForm = ({ setIsLoggedIn }) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false)
    function changeHandler(e) {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }


    async function submitHandler(e) {
        e.preventDefault();
        const {email,password}=formData;
        const res = await fetch('http://localhost:5000/user/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = res.json();
        console.log(data);
        if (res.status === 400 || !data) {
            toast.error("Invalid Credentials");
        }
        else {
            setIsLoggedIn(true);
            toast.success('Logged In')
            navigate('/dashboard');
        }
    }
    return (
        <form onSubmit={submitHandler}
            method='POST' className='flex flex-col w-full gap-y-4 mt-4'>
            <label className='w-full '>
                <p className='text-[0.875rebm] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Email Address <sup className='text-pink-200'>*</sup>
                </p>
                <input required type='email' value={formData.email} name='email' onChange={changeHandler} placeholder='Enter Your Email' className='bg-richblack-800 rounded-md text-slate-900 w-full p-[12px]' />
            </label>
            <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Password <sup>*</sup>
                </p>
                <input required type={showPassword ? ('text') : ('password')} value={formData.password} name='password' onChange={changeHandler} placeholder='Enter Password' className='bg-richblack-800 rounded-md text-slate-900 w-full p-[12px]' />
                <span className='absolute right-3 top-[38px] cursor-pointer text-richblack-200 text-2xl' onClick={() => {
                    setShowPassword((prev) => !prev)
                }}>{showPassword ?

                    (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :

                    (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}</span>
                <Link to='#' >
                    <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                        Forgot Password
                    </p>
                </Link>
            </label>
            <button type='submit' className='bg-yellow-50 rounded-[10px] text-black px-[12px] py-[8px] mt-4'>Sign In</button>
        </form>
    )
}

export default LoginForm