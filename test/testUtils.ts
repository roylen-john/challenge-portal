import { render, RenderResult } from '@testing-library/react'
import { ReactElement } from 'react'
// Use incase if translation library required
// import { TranslationProvider } from "my-i18n-lib"
// import defaultStrings from "i18n/en-x-default"

const Providers = ({ children }) => {
  return children
  // Use incase if translation library required
  // return (
  //     <TranslationProvider messages={defaultStrings}>
  //       {children}
  //     </TranslationProvider>
  // )
}

const customRender = (ui: ReactElement, options = {}): RenderResult =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
