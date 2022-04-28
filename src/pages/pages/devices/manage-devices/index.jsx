import { Fragment, useEffect } from "react"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import PAGE from "config/page.config"
import Head from "next/head"
import Link from "next/link"
import { Col, Container, Portlet, Row, Table, Button } from "@blueupcode/components"
import useData from "hooks/useData"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import 'firebase/firestore'

const ManageDevices = (props) => {

  const { docs: devices } = useData('devices');

  useEffect(() => {
    props.pageChangeHeaderTitle("Dispositivos")
    props.breadcrumbChange([
      { text: "Dispositivos" },
      { text: "Gestionar dispositivos", },
    ])
  }, [props]);

  const getDevices = () => {
    if (devices.length > 0) {
      const resolved = devices.map(item => {
        const surveyDoc =
          (item.survey !== null)
            ? item.survey.id
            : '';
        return {
          ...item,
          survey: surveyDoc
        }

      });

      return resolved;
    }
    return [];
  }


  return (
    <Fragment>
      <Head>
        <title>Gestionar dispositivos | {PAGE.siteName}</title>
      </Head>

      <Container>
        <Row className="mt-3">
          <Col md="12">
            <Portlet>
              <Portlet.Header bordered>
                <Portlet.Title>Gestionar dispositivos</Portlet.Title>
              </Portlet.Header>
              <Portlet.Body>
                <Table responsiveDown="md" className="text-nowrap mb-0">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Dispositivo</th>
                      <th>Encuesta</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDevices().length > 0
                      ? getDevices().map((x, i) => (
                        <tr key={i}>
                          <td>{x.id}</td>
                          <td>{x.brand}</td>
                          <td>{x.model}</td>
                          <td>{x.device}</td>
                          <td>{x.survey}</td>
                          <td>
                            <Link
                              href={`./manage-devices/${x.id}`}
                              passHref
                            >
                              <Button id="btn-edit" style={{ marginInlineEnd: '1em' }} icon circle variant="info" type="button">
                                <FontAwesomeIcon icon={SolidIcon.faEdit} />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))
                      : <tr>
                        <td colSpan={6} align="center">
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
)(withAuth(withLayout(ManageDevices)))