import Document, { Html, Head, Main, NextScript } from "next/document"
import { Fragment } from "react"
import ANALYTICS from "config/analytics.config"
import PAGE from "config/page.config"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {ANALYTICS.enabledAnalytics ? (
            <Fragment>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.googleAnalyticsId}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${ANALYTICS.googleAnalyticsId}', {
                      page_path: window.location.pathname,
                    });
                  `
                }}
              />
            </Fragment>
          ) : null}
          <link href={PAGE.favicon} rel="shortcut icon" type="image/x-icon" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&family=Roboto+Mono&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="theme-light">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
