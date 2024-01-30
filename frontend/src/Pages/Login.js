import React from 'react'
import Template from './Template'
const Login = ({setIsLoggedIn}) => {
  return (
    <Template
        title='Welcome Back'
        formType='login'
        setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Login