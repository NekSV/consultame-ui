import { Fragment, useEffect, useState } from "react"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { useRouter } from "next/router"
import { Col, Container, Portlet, Row, Button, Form } from "@blueupcode/components"
import PAGE from "config/page.config"
import Head from "next/head"


const SurveyGraph = (props) => {

  useEffect(() => {
    props.pageChangeHeaderTitle("Gráficos")
    props.breadcrumbChange([
      { text: "Gráficos" },
      {
        text: "Resultados de encuestas",
      }
    ])
  }, [props]);

  return (
    <Fragment>
      <Head>
      <title>Resultados de Encuestas | {PAGE.siteName}</title>
      </Head>

    <Container>
      <Row>
        <Col className="mt-3">

        <Portlet>
          <Portlet.Header>
            <Portlet.Title>
              
            </Portlet.Title>
          </Portlet.Header>
        </Portlet>

        </Col>
      </Row>
    </Container>

    </Fragment>
  );
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
)(withAuth(withLayout(SurveyGraph)))