import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import { Col, Container, Portlet, Row, Table, Button, Tooltip } from "@blueupcode/components"
import { Fragment, useEffect } from "react"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Head from "next/head"
import PAGE from "config/page.config"
import useData from "hooks/useData"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Surveys = (props) => {

  const { docs: surveys } = useData('surveys');

  useEffect(() => {
    props.pageChangeHeaderTitle("Encuestas")
    props.breadcrumbChange([
      { text: "Encuesta" },
      { text: "Encuestas" },
    ])
  }, [props]);

  return (
    <Fragment>
      <Head>
        <title>Encuestas | {PAGE.siteName}</title>
      </Head>
      <Container fluid>
        <Row className="mt-3">
          <Col md="12">
            <Portlet>
              <Portlet.Header bordered>
                <Portlet.Title>Encuestas</Portlet.Title>
              </Portlet.Header>
              <Portlet.Body>
                <Table responsiveDown="md" className="text-nowrap mb-0">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th># de Preguntas</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {surveys.length > 0
                      ? surveys.map((x, i) => (
                        <tr key={i}>
                          <td>{x.id}</td>
                          <td>{x.steps.length}</td>
                          <td>
                            {/* <Button id="btn-watch" style={{ marginInlineEnd: '1em' }} icon circle variant="dark" type="button">
                              <FontAwesomeIcon icon={SolidIcon.faEye} />
                            </Button>
                            <Tooltip.Uncontrolled target="btn-watch">
                              Ver encuesta
                            </Tooltip.Uncontrolled> */}


                            <Button id="btn-edit" style={{ marginInlineEnd: '1em' }} icon circle variant="info" type="button">
                              <FontAwesomeIcon icon={SolidIcon.faEdit} />
                            </Button>
                            <Tooltip.Uncontrolled target="btn-edit">
                              Editar
                            </Tooltip.Uncontrolled>

                            <Button id="btn-delete" style={{ marginInlineEnd: '1em' }} icon circle variant="danger" type="button">
                              <FontAwesomeIcon icon={SolidIcon.faTrash} />
                            </Button>
                            <Tooltip.Uncontrolled target="btn-delete">
                              Eliminar
                            </Tooltip.Uncontrolled>
                          </td>
                        </tr>
                      ))
                      : <tr>
                        <td colSpan={3} align="center">
                          No hay datos disponibles.
                        </td>
                      </tr>
                    }
                  </tbody>
                </Table>
              </Portlet.Body>
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
)(withAuth(withLayout(Surveys)))