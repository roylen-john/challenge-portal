import * as React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

// interface iProps {}

class Document extends NextDocument {
  render(): React.ReactElement {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/site.webmanifest" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <meta name="theme-color" content="#51fbf9" />
          <meta name="apple-mobile-web-app-status-bar" content="#51fbf9" />
          <meta
            name="description"
            content="Challenge portal is a platform for developers to post their programming challenges and the challengers to view and vote them."
          ></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
