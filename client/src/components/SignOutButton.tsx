import { UserAuth } from './auth/AuthContextProvider'
import { Button } from '@mui/base'
import { useNavigate } from 'react-router-dom'
import React, { useContext } from 'react'
import { UserContext } from './auth/AuthContextProvider'

const SignOutButton = () => {

    const { logOut } = UserAuth()
    const navigate = useNavigate();
    const { user } = useContext(UserContext) 

    const handleSighOut = async() => {
        try {
            await logOut()
            navigate('/')
            console.log("logged out")
            
        } catch(error) {
            console.log(error)
        }

    }

    
  return (
    <>
      <Button onClick={handleSighOut}>Sign Out</Button>
    </>
  )
}

export default SignOutButton
