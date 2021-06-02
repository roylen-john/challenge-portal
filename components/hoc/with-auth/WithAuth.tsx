import React, { ComponentType, ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { verifyToken } from '../../../services/verifyToken.service'
import { toast } from 'react-toastify'

interface iWithAuthProps {
  children: React.ReactNode
}

const withAuth = <P extends iWithAuthProps>(
  WrappedComponent: ComponentType<any>
): ComponentType<P> => {
  return (
    props: Pick<P, Exclude<keyof P, keyof iWithAuthProps>>
  ): ReactElement => {
    const router = useRouter()
    const [verified, setVerified] = useState(false)

    useEffect(() => {
      const checkAuth = async () => {
        const accessToken = localStorage.getItem('accessToken')
        // if no accessToken was found,then we redirect to "/" page.
        if (!accessToken) {
          toast('Authentication failed. Please login again.', {
            type: 'error',
          })
          router.push('/')
        } else {
          // we call the api that verifies the token.
          const verified = await verifyToken()
          // if token was verified we set the state.
          if (verified) {
            setVerified(verified)
          } else {
            // If the token was fraud we first remove it from localStorage and then redirect to "/"
            localStorage.removeItem('accessToken')
            toast('Authentication failed. Please login again.', {
              type: 'error',
            })
            router.push('/')
          }
        }
      }
      checkAuth()
    }, [])

    if (verified) {
      return <WrappedComponent {...(props as P)} />
    } else {
      return null
    }
  }
}

export default withAuth
