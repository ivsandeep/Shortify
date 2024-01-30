import React from 'react'
import Template from './Template'
const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
        formType='signup'
        setIsLoggedIn={setIsLoggedIn}

    />
  )
}

export default Signup