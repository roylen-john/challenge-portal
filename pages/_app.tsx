// import App from "next/app";
import type { AppProps } from 'next/app'
import { ReactFragment, useState } from 'react'
import Head from 'next/head'
import { classNames } from '../utils/utils'

import '../styles/globals.css'
import Navbar from '../components/navbar/Navbar'

function MyApp({ Component, pageProps }: AppProps): ReactFragment {
  const [lightTheme, setLightTheme] = useState(false)

  const handleThemeChange = () => setLightTheme(!lightTheme)

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div
        className={classNames(
          'w-full',
          'min-h-screen',
          'bg-neutralBg',
          lightTheme ? 'theme-light' : 'theme-dark'
        )}
      >
        <Navbar
          navItems={[
            { name: 'All Challenges', href: '/' },
            { name: 'New Challenge', href: '/new-challenge' },
          ]}
          onThemeChange={handleThemeChange}
        />
        <div className="h-16" />
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
