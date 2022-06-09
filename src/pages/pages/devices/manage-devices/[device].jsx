import { Fragment, useEffect, useState } from "react"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { useRouter } from "next/router"
import PAGE from "config/page.config"
import Head from "next/head"
import useData from "hooks/useData"
import { Col, Container, Portlet, Row, Button, Widget4, Form, Input } from "@blueupcode/components"
import useDocument from "hooks/useDocument"
import { swal } from "components/swal/instance"
import { firestoreClient } from '@components/firebase/firestoreClient';
import LoadingFiller from "@components/custom/LoadingFiller"
import 'firebase/firestore'

const AssignSurvey = (props) => {

  const router = useRouter();
  const { device } = router.query;
  const { docs: surveys } = useData('surveys');
  const { document: deviceData, trigger } = useDocument('devices', device);
  const [selectedSurvey, setSelectedSurvey] = useState('');
  const [deviceLabel, setDeviceLabel] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    props.pageChangeHeaderTitle("Dispositivos")
    props.breadcrumbChange([
      { text: "Dispositivos" },
      {
        text: "Gestionar dispositivos",
        link: '../manage-devices'
      },
      { text: "Asignar encuesta" },
    ])
  }, [props]);

  useEffect(() => {
    if (!!deviceData) {
      setDeviceLabel(!!deviceData.label ? deviceData.label : '');
      setSelectedSurvey(!!deviceData.survey ? deviceData.survey.id : '');
    }
  }, [deviceData]);


  const updateSurvey = () => {
    setLoading(true);
    const surveyRef = firestoreClient.collection('surveys').doc(selectedSurvey);
    const deviceRef = firestoreClient.collection('devices').doc(device);

    return deviceRef.update({
      survey: surveyRef,
      label: deviceLabel
    }).then(() => {
      swal.fire({
        icon: 'success',
        title: 'Dispositivo actualizado',
        timer: 2000
      });
    }).catch(err => {
      swal.fire({
        icon: 'error',
        title: 'Error al actualizar dispositivo',
        timer: 2000
      });
      console.log('survey-error', err);
    }).finally(() => {
      setLoading(false);
      trigger();
    });
  };

  return (
    <Fragment>
      <Head>
        <title>Asignar encuesta | {PAGE.siteName}</title>
      </Head>

      <Container>
        <Row className="mt-3">

          <Col md="12">

            {isLoading &&

              <LoadingFiller />

            }

            <Portlet>
              <Portlet.Header bordered>
                <Portlet.Title>Asignar encuesta</Portlet.Title>
              </Portlet.Header>
              <Portlet.Body>

                {!!deviceData &&

                  <>
                    <Portlet>
                      <Portlet.Body>
                        <Row>
                          <Col xs="12" sm="12" md="2">
                            <Widget
                              title="Id"
                              highlight={deviceData.id}
                              className="mb-3"
                            />
                          </Col>
                          <Col xs="12" sm="12" md="2">
                            <Widget
                              title="Etiqueta"
                              highlight={deviceData.label}
                              className="mb-3"
                            />
                          </Col>
                          <Col xs="12" sm="12" md="2">
                            <Widget
                              title="Marca"
                              highlight={deviceData.brand}
                              className="mb-3"
                            />
                          </Col>
                          <Col xs="12" sm="12" md="2">
                            <Widget
                              title="Modelo"
                              highlight={deviceData.model}
                              className="mb-3"
                            />
                          </Col>
                          <Col xs="12" sm="12" md="1">
                            <Widget
                              title="Dispositivo"
                              highlight={deviceData.device}
                              className="mb-3"
                            />
                          </Col>
                          <Col xs="12" sm="12" md="2">
                            <Widget
                              title="Encuesta"
                              highlight={!!deviceData.survey ? deviceData.survey.id : '-'}
                              className="mb-3"
                            />
                          </Col>
                        </Row>
                      </Portlet.Body>
                    </Portlet>

                    <Portlet>
                      <Portlet.Body>
                        <Form>
                          <Form.Group>
                            <label htmlFor={`selectSurvey`}>Seleccionar encuesta:</label>
                            <select
                              name="selectSurvey"
                              id="selectSurvey"
                              className="form-control"
                              onChange={(e) => setSelectedSurvey(e.target.value)}
                              value={selectedSurvey}
                            >
                              {surveys.map((x, i) => (
                                <option key={i} value={x.id}>{x.id}</option>
                              ))
                              }
                            </select>
                          </Form.Group>

                          <Form.Group>
                            <label htmlFor={`selectSurvey`}>Etiqueta del dispositivo:</label>
                            <Input
                              type="text"
                              id="deviceLabel"
                              onChange={(e) => setDeviceLabel(e.target.value)}
                              value={deviceLabel}
                            />
                          </Form.Group>

                          <Button
                            type="button"
                            variant="primary"
                            width="widest"
                            onClick={updateSurvey}
                          >
                            Actualizar
                          </Button>
                        </Form>

                      </Portlet.Body>
                    </Portlet>
                  </>
                }
              </Portlet.Body>
            </Portlet>
          </Col>
        </Row>
      </Container>
    </Fragment>

  );
};

const Widget = (props) => {
  const { title, highlight, ...attributes } = props
  return (
    <Widget4 {...attributes}>
      <Widget4.Group>
        <Widget4.Display>
          <Widget4.Subtitle>{title}</Widget4.Subtitle>
          <Widget4.Highlight>{highlight}</Widget4.Highlight>
        </Widget4.Display>
      </Widget4.Group>
    </Widget4>
  )
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
)(withAuth(withLayout(AssignSurvey)))