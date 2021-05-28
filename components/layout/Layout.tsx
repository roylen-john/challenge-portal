import React, { ReactElement, useState } from 'react'
import Head from 'next/head'
import { classNames } from '../../utils/utils'
import Navbar from '../navbar/Navbar'
import { routes } from '../../utils/constants'

interface iLayoutProps {
  children: React.ReactNode
}

export function MinimalLayout({ children }: iLayoutProps): ReactElement {
  const [lightTheme] = useState(false)

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
        data-testid="minimal-layout"
      >
        {children}
      </div>
    </>
  )
}

export function AppLayout({ children }: iLayoutProps): ReactElement {
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
        data-testid="app-layout"
      >
        <Navbar
          navItems={[
            { name: 'All Challenges', href: routes.ALL_CHALLENGES },
            { name: 'New Challenge', href: routes.NEW_CHALLENGE },
          ]}
          onThemeChange={handleThemeChange}
        />
        <div className="h-16" />
        {children}
      </div>
    </>
  )
}

export const getLayout = (
  page: React.ReactNode,
  route: string
): React.ReactNode => {
  switch (route) {
    case routes.Home:
      return <MinimalLayout>{page}</MinimalLayout>

    case routes.ALL_CHALLENGES:
      return <AppLayout>{page}</AppLayout>

    case routes.NEW_CHALLENGE:
      return <AppLayout>{page}</AppLayout>

    default:
      return <MinimalLayout>{page}</MinimalLayout>
      break
  }
}
