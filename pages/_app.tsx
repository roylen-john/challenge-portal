// import App from "next/app";
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ReactFragment } from 'react'
import { getLayout } from '../components/layout/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): ReactFragment {
  const router = useRouter()
  return getLayout(<Component {...pageProps} />, router.pathname)
}

export default MyApp
