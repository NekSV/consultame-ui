import { Header, Button, Marker } from "@blueupcode/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { asideToggle, sidemenuToggle } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import HeaderBreadcrumb from "./HeaderBreadcrumb"
import HeaderUser from "./HeaderUser"
import Sticky from "react-stickynode"
import PAGE from "config/page.config"

function HeaderComponent(props) {
  const { headerTitle, sidemenuToggle, asideToggle } = props

  return (
    <Header>
      <Sticky
        enabled={true}
        top={0}
        bottomBoundary={0}
        className="sticky-header"
      >
        {/* BEGIN Header Holder */}
        <Header.Holder desktop>
          <Header.Container fluid>
            <Header.Wrap block>
            </Header.Wrap>
            <Header.Wrap>
              <HeaderUser className="ml-2" />
            </Header.Wrap>
          </Header.Container>
        </Header.Holder>
        {/* END Header Holder */}
      </Sticky>
      {/* BEGIN Header Holder */}
      <Header.Holder desktop>
        <Header.Container fluid>
          <Header.Title>{headerTitle}</Header.Title>
          <Header.Divider />
          <Header.Wrap block justify="start">
            <HeaderBreadcrumb />
          </Header.Wrap>
        </Header.Container>
      </Header.Holder>
      {/* END Header Holder */}
      <Sticky
        enabled={true}
        top={0}
        bottomBoundary={0}
        className="sticky-header"
      >
        {/* BEGIN Header Holder */}
        <Header.Holder mobile>
          <Header.Container fluid>
            <Header.Wrap>
              <Button icon variant="flat-primary" onClick={asideToggle}>
                <FontAwesomeIcon icon={SolidIcon.faBars} />
              </Button>
            </Header.Wrap>
            <Header.Wrap block justify="start" className="px-3">
              <Header.Brand>{PAGE.siteName}</Header.Brand>
            </Header.Wrap>
            <Header.Wrap>
              <HeaderUser className="ml-2" />
            </Header.Wrap>
          </Header.Container>
        </Header.Holder>
        {/* BEGIN Header Holder */}
      </Sticky>
      {/* BEGIN Header Holder */}
      <Header.Holder mobile>
        <Header.Container fluid>
          <Header.Wrap block justify="start" className="w-100">
            <HeaderBreadcrumb />
          </Header.Wrap>
        </Header.Container>
      </Header.Holder>
      {/* END Header Holder */}
    </Header>
  )
}

function mapStateToProps(state) {
  return {
    headerTitle: state.page.headerTitle
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ asideToggle, sidemenuToggle }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
