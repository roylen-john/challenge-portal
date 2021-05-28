import React from 'react'
import { render } from '@testing-library/react'
import { cleanup } from '@testing-library/react'

import { getLayout } from './Layout'
import { routes } from '../../utils/constants'

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

describe('Layout', () => {
  const layouts = [
    {
      component: 'Test',
      route: routes.Home,
      expectedLayoutTestId: 'minimal-layout',
    },
    {
      component: 'Test',
      route: routes.ALL_CHALLENGES,
      expectedLayoutTestId: 'app-layout',
    },
    {
      component: 'Test',
      route: routes.NEW_CHALLENGE,
      expectedLayoutTestId: 'app-layout',
    },
  ]

  afterEach(cleanup)

  test.each(
    layouts.map((layout) => [
      layout.component,
      layout.route,
      layout.expectedLayoutTestId,
    ])
  )(
    'testing layout for getLayout(%s, %s) and expect %s',
    (component, route, testid) => {
      const { getByTestId } = render(<>{getLayout(component, route)}</>)
      expect(getByTestId(testid)).toBeDefined()
    }
  )

  test.each(
    layouts.map((layout) => [
      layout.component,
      layout.route,
      layout.expectedLayoutTestId,
    ])
  )(
    'testing layout for getLayout(%s, %s) and expect %s',
    (component, route) => {
      const { getByText } = render(<>{getLayout(component, route)}</>)
      expect(getByText(component)).toBeDefined()
    }
  )
})
