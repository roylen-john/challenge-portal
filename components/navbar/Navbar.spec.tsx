import React from 'react'
import { render, within } from '@testing-library/react'
import { screen } from '@testing-library/dom'

import Navbar, { Props } from './Navbar'

const DEFAULT_PROPS: Props = {
  navItems: [],
  onThemeChange: jest.fn(),
}

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
}))

describe('Navbar', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<Navbar {...DEFAULT_PROPS} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders the logo', () => {
    const { getByRole } = render(<Navbar {...DEFAULT_PROPS} />)
    const logo = getByRole('banner')
    expect(logo).toBeVisible()
  })

  test('renders the nav links', () => {
    const navItems = [
      { name: 'All Challenges', href: '/' },
      { name: 'New Challenge', href: '/new-challenge' },
    ]

    const { getAllByRole } = render(
      <Navbar {...DEFAULT_PROPS} navItems={navItems} />
    )

    const links = getAllByRole('link')
    expect(links).toHaveLength(navItems.length)

    links.forEach((item, index) => {
      const { getByText } = within(item)
      const { name, href } = navItems[index]
      expect(getByText(name)).toBeVisible()
      expect(screen.getByText(name).closest('a')).toHaveAttribute('href', href)
    })
  })
})
