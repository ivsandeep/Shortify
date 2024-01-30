import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import {FcGoogle} from 'react-icons/fc'
const Template = ({title,formType,setIsLoggedIn}) => {
  return (
    <div className='flex  w-full max-w-[1060px] py-12 mx-auto gap-x-12 gap-y-0 justify-center items-center bg-white text-white'>
        <div className='w-1/2 max-w-[450px] bg-slate-800 p-4 m-2 rounded-lg'>
            <div></div>
            <h1 className='flex justify-center text-richblack-5 font-semibold '>{title}</h1>
            
            {formType==='signup'?
            (<SignupForm setIsLoggedIn={setIsLoggedIn}/>):
            (<LoginForm setIsLoggedIn={setIsLoggedIn}/>)
            }
            <div className='flex w-full items-center my-4 gap-x-2'>
                <div className='h-[1px] w-full bg-richblack-700'></div>
            </div>
        </div>
    </div>
  )
}

export default Template