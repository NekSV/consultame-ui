import { Container } from "@blueupcode/components"
import { Component, Fragment } from "react"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"
import PAGE from "config/page.config"

class DashboardPage extends Component {
  componentDidMount() {
    // Set header title
    this.props.pageChangeHeaderTitle("Dashboard")
    // Set breadcrumb data
    this.props.breadcrumbChange([{ text: "Dashboard", link: "/" }])
  }

  render() {
    return (
      <Fragment>
        <Head>
          <title>Dashboard | {PAGE.siteName}</title>
        </Head>
        <Container fluid>
          {/* <Row>
            <Col xs="12">
              <Widget33 />
            </Col>
          </Row>
          <Row>
            <Col xl="4">
              <Row portletFill="md" className="h-100">
                <Col md="7" xl="12">
                  <Widget22 />
                </Col>
                <Col md="5" xl="12">
                  <Widget10 />
                </Col>
              </Row>
            </Col>
            <Col xl="4">
              <Row portletFill="md" className="h-100">
                <Col md="4" xl="12">
                  <Widget28 />
                </Col>
                <Col md="4" xl="12">
                  <Widget29 />
                </Col>
                <Col md="4" xl="12">
                  <Widget34 />
                </Col>
              </Row>
            </Col>
            <Col xl="4">
              <Row portletFill="md" className="h-100">
                <Col md="6" xl="12">
                  <Widget3 />
                </Col>
                <Col md="6" xl="12">
                  <Row portletFill="sm">
                    <Col sm="6">
                      <Widget21 />
                      <Widget16 />
                    </Col>
                    <Col sm="6">
                      <Widget35 />
                      <Widget18 />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row portletFill="xl">
            <Col xl="4">
              <Widget27 />
            </Col>
            <Col xl="8">
              <Row portletFill="md">
                <Col md="6">
                  <Widget13 />
                  <Widget14 />
                </Col>
                <Col md="6">
                  <Widget7 />
                  <Widget15 />
                </Col>
              </Row>
            </Col>
          </Row> */}
        </Container>
      </Fragment>
    )
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange },
    dispatch
  )
}

export default connect(
  null,
  mapDispathToProps
)(withAuth(withLayout(DashboardPage)))
