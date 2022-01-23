import { Button, Tooltip, FloatButton } from "@blueupcode/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { bindActionCreators } from "redux"
import { pageChangeTheme } from "store/actions"
import { Component } from "react"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

class FloatButtonComponent extends Component {
  render() {
    const { theme, pageChangeTheme } = this.props
    const darkModeActive = theme === "dark"

    return (
      <FloatButton align="right">
        <Button
          icon
          id="darkModeTrigger"
          variant="flat-primary"
          className="mb-2"
          onClick={() => pageChangeTheme(!darkModeActive ? "dark" : "light")}
        >
          <FontAwesomeIcon
            icon={darkModeActive ? SolidIcon.faSun : SolidIcon.faMoon}
          />
        </Button>
        <Tooltip.Uncontrolled placement="left" target="darkModeTrigger">
          Enable {!darkModeActive ? "dark" : "light"} mode
        </Tooltip.Uncontrolled>
        <Button
          icon
          id="docsLink"
          variant="flat-primary"
          href="https://docs.blueupcode.com/guide-react.html"
        >
          <FontAwesomeIcon icon={SolidIcon.faLightbulb} />
        </Button>
        <Tooltip.Uncontrolled placement="left" target="docsLink">
          Look documentation
        </Tooltip.Uncontrolled>
      </FloatButton>
    )
  }
}

function mapStateToProps(state) {
  return {
    theme: state.page.theme
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ pageChangeTheme }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FloatButtonComponent)
