import React, { ReactElement } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Disclosure, Transition } from '@headlessui/react'
import { LogoutIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { classNames } from '../../utils/utils'
import Logo from '../logo/Logo'
import { useAuth } from '../../context/auth/AuthContext'
import { UrlObject } from 'url'
import Button from '../form-components/button/Button'

interface navItem {
  name: string
  href?: UrlObject | string
}

export interface iNavbarProps {
  navItems: navItem[]
  onThemeChange: () => void
}

function Navbar({ navItems }: iNavbarProps): ReactElement {
  const router = useRouter()
  const { user, logout } = useAuth()

  return (
    <Disclosure
      as="nav"
      className="bg-neutralBg fixed w-full border-b border-gray-700 z-20"
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-start sm:items-stretch">
                <div className="flex-shrink-0 flex items-center" role="banner">
                  <span className="h-5 w-auto text-2xl leading-4 lg:mr-5">
                    🐱‍💻
                  </span>
                  <div className="hidden lg:block">
                    <Logo />
                  </div>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <ul className="flex space-x-4">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href}>
                          <a
                            className={classNames(
                              router.pathname === item.href ||
                                router.pathname ===
                                  (item.href as UrlObject).pathname
                                ? 'transition duration-200 ease-out bg-primary text-white'
                                : 'transition duration-200 ease-out text-contrastNeutralBgSoft hover:bg-primarySoft hover:text-white',
                              'px-3 py-2 rounded text-sm font-medium focus:outline-none focus:ring focus:border-primaryBold'
                            )}
                            aria-current={
                              router.pathname === item.href ? 'page' : undefined
                            }
                            role="link"
                          >
                            {item.name}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 items-center hidden sm:flex">
                {/* Hidden button for theme change
                <button
                  onClick={onThemeChange}
                  className="bg-primaryBold hover:bg-primarySoft hover:text-contrastPrimaryBgSoft text-white px-3 py-2 rounded text-sm font-medium"
                >
                  Theme Toggle
                </button> */}
                {user && (
                  <div className="flex items-center">
                    <div className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-primaryBold text-xl text-white uppercase flex-shrink-0">
                      <span>{user?.name?.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="hidden md:block ml-4 text-lg font-bold text-white mr-10">
                      {user?.name}
                    </span>
                  </div>
                )}
                <div className="w-40">
                  <Button
                    variant="danger"
                    type="submit"
                    icon={<LogoutIcon className="h-6 w-6 absolute" />}
                    onClick={logout}
                    fullWidth
                  >
                    Log Out
                  </Button>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-contrastNeutralBgSoft hover:bg-neutral hover:text-neutralBg focus:outline-none focus:ring focus:border-primaryBold">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform -translate-y-16  opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
          >
            <Disclosure.Panel className="sm:hidden">
              <ul className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <a
                        className={classNames(
                          router.pathname === item.href ||
                            router.pathname ===
                              (item.href as UrlObject).pathname
                            ? 'transition duration-200 ease-out bg-primary text-white'
                            : 'transition duration-200 ease-out text-contrastNeutralBgSoft hover:bg-primarySoft hover:text-white',
                          'block px-3 py-2 rounded text-base font-medium focus:outline-none focus:ring focus:border-primaryBold'
                        )}
                        aria-current={
                          router.pathname === item.href ? 'page' : undefined
                        }
                        role="link"
                      >
                        {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
                <li className="border-t border-gray-700">
                  {user && (
                    <div className="flex items-center my-4">
                      <div className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-primaryBold text-xl text-white uppercase flex-shrink-0">
                        <span>{user?.name?.charAt(0).toUpperCase()}</span>
                      </div>
                      <span className="ml-4 text-lg font-bold text-white mr-10">
                        {user?.name}
                      </span>
                    </div>
                  )}
                  <Button
                    variant="danger"
                    type="submit"
                    icon={<LogoutIcon className="h-6 w-6 absolute" />}
                    onClick={logout}
                    fullWidth
                  >
                    Log Out
                  </Button>
                </li>
              </ul>
              <div className="fixed h-screen w-screen bg-black opacity-40" />
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
