import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import { Col, Container, Portlet, Row } from "@blueupcode/components"
import { Component, Fragment } from "react"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Head from "next/head"
import PAGE from "config/page.config"

class AddSurvey extends Component {

  componentDidMount() {
    this.props.pageChangeHeaderTitle("Agregar encuesta")
    this.props.breadcrumbChange([
      { text: "Encuesta"},
      { text: "Agregar encuesta"},
    ])
  }

  render() {
    return (
      <Fragment>
        <Head>
        <title>Agregar encuesta | {PAGE.siteName}</title>
        </Head>
        <Container fluid>
          <Row className="mt-3">
            <Col md="12">
              <Portlet>
                <Portlet.Header>
                  <Portlet.Title>Agregar encuesta</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>

                </Portlet.Body>
              </Portlet>
            </Col>
          </Row>
        </Container>
      </Fragment>

    );
  }

};

function mapDispathToProps(dispatch) {
  return bindActionCreators(
    { pageChangeHeaderTitle, breadcrumbChange },
    dispatch
  )
}

export default connect(
  null,
  mapDispathToProps
)(withAuth(withLayout(AddSurvey)))