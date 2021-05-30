// import App from "next/app";
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ReactFragment } from 'react'
import { getLayout } from '../components/layout/Layout'
import { AuthProvider } from '../context/auth/AuthContext'
import '../styles/globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps): ReactFragment {
  const router = useRouter()
  return (
    <AuthProvider>
      {getLayout(<Component {...pageProps} />, router.pathname)}
      <ToastContainer
        position={
          typeof window !== 'undefined' && window.innerWidth < 800
            ? 'bottom-center'
            : 'top-right'
        }
        autoClose={5000}
        closeOnClick
        pauseOnHover
        newestOnTop={typeof window !== 'undefined' && window.innerWidth < 800}
        limit={3}
      />
    </AuthProvider>
  )
}

export default MyApp
