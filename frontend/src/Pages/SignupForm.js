import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const SignupForm = ({ setIsLoggedIn }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        cPassword: ''
    })
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    function changeHandler(e) {
        console.log(e);
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }



    async function submitHandler(e) {
        e.preventDefault();


        if (formData.password !== formData.cPassword) {
            toast.error("password do not match")
            return;
        }
        const { firstName, lastName, email,
            password, cPassword } = formData;
        const res = await fetch('http://localhost:5000/user/signup', {
            method: "POST",
            // crossDomain:true,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName, lastName, email,
                password, cPassword
            })

        });
        const data = await res.json();
        if(res.status===422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid registration")
        }
        else{
            window.alert("Registration successfull");
            console.log("Registration successfull")
            setIsLoggedIn(true);
            toast.success("Account created");
            navigate('/dashboard');
        }   
    }
    return (
        <div className='text-white flex flex-col items-center'>
            <div className='text-3xl'>Signup</div>
            <form onSubmit={submitHandler} method='POST' >
                <div className='flex gap-x-4 w-full mt-4'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name <sup className='text-pink-200'>*</sup></p>
                        <input required type='text' name='firstName' onChange={changeHandler} placeholder='Enter Your Name' value={formData.firstName} className='bg-richblack-800 rounded-md text-slate-900 w-full p-[12px]' />
                    </label>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name <sup className='text-pink-200'>*</sup></p>
                        <input required type='text' name='lastName' onChange={changeHandler} placeholder='Enter Your last Name' value={formData.lastName} className='bg-richblack-800 rounded-md text-slate-900 w-full p-[12px]' />
                    </label>
                </div>
                <label>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
                    <input required type='email' name='email' onChange={changeHandler} placeholder='Enter email' value={formData.email} className='bg-richblack-800 rounded-md text-slate-900 w-full p-[12px]' />
                </label>
                <div className='flex w-full gap-x-4'>
                    <label className='relative w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password <sup className='text-pink-200'>*</sup></p>
                        <input required type={showPassword ? ('text') : ('password')} name='password' onChange={changeHandler} placeholder='Enter Your last Name' value={formData.password} className='bg-richblack-800 rounded-md text-slate-900 w-full p-[12px]' />
                        <span className='absolute right-3 top-[38px] cursor-pointer text-richblack-200 text-2xl' onClick={() => {
                            setShowPassword((prev) => !prev)
                        }}>{showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}</span>
                    </label>
                    <label className='relative w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password <sup className='text-pink-200'>*</sup></p>
                        <input required type={showPassword ? ('text') : ('password')} name='cPassword' onChange={changeHandler} placeholder='confirm password' value={formData.cPassword} className='bg-richblack-800 rounded-md text-slate-900 w-full p-[12px]' />
                        <span className='absolute right-3 top-[38px] cursor-pointer text-richblack-200 text-2xl' onClick={() => {
                            setShowPassword((prev) => !prev)
                        }}>{showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}</span>
                    </label>

                </div>

                <button type='submit'  className=' w-full bg-yellow-50 rounded-[10px] text-richblack-900 px-[12px] py-[8px] mt-4 text-black'>Create Account</button>
            </form>

        </div>
    )
}

export default SignupForm