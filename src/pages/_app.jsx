// All components stylesheets
import "styles/core/reboot.scss"
import "styles/components/index.scss"
import "styles/quill/core.scss"
import "styles/quill/snow.scss"
import "styles/quill/bubble.scss"
import "styles/apexcharts/index.scss"
import "styles/simplebar/index.scss"
import "styles/sweetalert2/index.scss"
import "styles/slick-carousel/index.scss"
import "styles/datetime/index.scss"

import { AuthProvider } from "components/firebase/firebaseAuth"
import { bindActionCreators } from "redux"
import { pageChangeTheme } from "store/actions"
import { withRouter } from "next/router"
import { wrapper } from "store"
import { connect } from "react-redux"
import DefaultLayout from "components/layout/template/DefaultLayout"
import BlankLayout from "components/layout/template/BlankLayout"
import ProgressBar from "@blueupcode/progressbar"
import App from "next/app"
import ANALYTICS from "config/analytics.config"

class MyApp extends App {
  // Handling analytics report when route changed
  handleChangeRoute = (url) => {
    if (ANALYTICS.enabledAnalytics) {
      window.gtag("config", ANALYTICS.googleAnalyticsId, {
        page_path: url
      })
    }
  }

  componentDidMount() {
    let darkModeActive = false

    // Get dark mode support from native device and local storage
    const nativeDarkModeActive = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches

    if (localStorage.getItem("theme")) {
      darkModeActive = localStorage.getItem("theme") === "dark"
    } else {
      darkModeActive = nativeDarkModeActive
    }

    // Enable/disable dark mode
    this.props.pageChangeTheme(darkModeActive ? "dark" : "light")

    // Add router handling
    if (ANALYTICS.enabledAnalytics) {
      this.props.router.events.on("routeChangeComplete", this.handleChangeRoute)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.theme !== prevProps.theme) {
      // Toggling theme body class
      if (this.props.theme === "dark") {
        document.body.classList.remove("theme-light")
        document.body.classList.add("theme-dark")
      } else {
        document.body.classList.remove("theme-dark")
        document.body.classList.add("theme-light")
      }
    }
  }

  componentWillUnmount() {
    // Remove router handling
    if (ANALYTICS.enabledAnalytics) {
      this.props.router.events.off(
        "routeChangeComplete",
        this.handleChangeRoute
      )
    }
  }

  render() {
    const { Component, pageProps } = this.props
    let Layout

    switch (pageProps.layout) {
      case "default":
        Layout = DefaultLayout
        break
      case "blank":
        Layout = BlankLayout
        break
      default:
        Layout = BlankLayout
    }

    return (
      <AuthProvider>
        <Layout>
          <ProgressBar />
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    theme: state.page.theme
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ pageChangeTheme }, dispatch)
  }
}

export function reportWebVitals({ id, name, label, value }) {
  if (ANALYTICS.enabledAnalytics) {
    // Use `window.gtag` for reporting analytics
    window.gtag("event", name, {
      event_category: label === "web-vital" ? "Web Vitals" : "Next.js metric",
      value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
      event_label: id, // id unique to current page load
      non_interaction: true // avoids affecting bounce rate.
    })
  }
}

export default wrapper.withRedux(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(MyApp))
)
