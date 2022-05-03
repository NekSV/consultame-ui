import { Fragment, useEffect, useState } from "react"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Col, Container, Portlet, Row, Button, Form, ListGroup } from "@blueupcode/components"
import PAGE from "config/page.config"
import Head from "next/head"
import useData from "hooks/useData"
import useDataWhere from "hooks/useDataWhere"
import BarGraph from "@components/custom/BarGraph"


const SurveyGraph = (props) => {

  const { docs: surveys } = useData('surveys');
  const [selectedSurvey, setSelectedSurvey] = useState('');
  const [surveyData, setSurveyData] = useState();
  const [stepData, setStepData] = useState();
  const [detailLabels, setDetailLabels] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [selectedStep, setSelectedStep] = useState('-');
  const { documents: results, trigger } = useDataWhere('results', 'id', selectedSurvey);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    props.pageChangeHeaderTitle("Resultados")
    props.breadcrumbChange([
      {
        text: "Resultados de encuestas",
      }
    ])
  }, [props]);

  useEffect(() => {
    setSurveyData(surveys.find(x => x.id === selectedSurvey));
  }, [selectedSurvey]);

  useEffect(() => {
    if (surveys.length > 0) {
      setSelectedSurvey(surveys[0].id);
    }
  }, [surveys]);

  useEffect(() => {
    if (filteredResults.length > 0) {
      setGraphData(mapGraphData(filteredResults));
    }
  }, [filteredResults]);

  useEffect(() => {

    if (!!results) {
      setFilteredResults(mapFilteredResults(results));
    }

  }, [stepData]);

  const changeSelectedStep = (e) => {

    const val = e.target.value;
    const parsed = JSON.parse(val);
    setStepData(parsed);
    setSelectedStep(val);
  };

  const mapFilteredResults = (results) => {
    let fr = [];
    const answers = results.map(x => x.answers);

    const mappedAnswers = answers.map(x => {
      const keys = Object.keys(x);
      const values = Object.values(x);

      return keys.map((y, j) => ({
        question: y,
        answer: values[j]
      }))

    });

    mappedAnswers.forEach(x => {
      x.forEach(y => {
        fr.push(y);
      })
    });

    return fr.filter(item => item.question == stepData.stepIdentifier.id);
  };

  const mapGraphData = (filtered) => {

    let _graphData = [];
    const reduced = filtered.reduce((acc, val) => {
      let currentCount = acc[val.answer] || 0;
      acc[val.answer] = currentCount + 1;
      return acc;
    }, {});

    for (var i in reduced) {
      _graphData.push({
        label: i,
        value: reduced[i]
      })
    }

    return _graphData;

  };

  return (
    <Fragment>
      <Head>
        <title>Resultados de encuestas | {PAGE.siteName}</title>
      </Head>

      <Container>
        <Row>
          <Col className="mt-3">

            <Portlet>
              <Portlet.Header>
                <Portlet.Title>Resultados de Encuestas</Portlet.Title>
              </Portlet.Header>
              <Portlet.Body>
                <Row>
                  <Col>
                    <Form>
                      <Row>
                        <Col>
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
                        </Col>
                        <Col>
                          <Form.Group>
                            <label htmlFor={`selectSurvey`}>Seleccionar pregunta:</label>
                            <select
                              name="selectStep"
                              id="selectStep"
                              disabled={!surveyData}
                              className="form-control"
                              onChange={(e) => changeSelectedStep(e)}
                              value={selectedStep}
                            >
                              <option hidden value='-'>Seleccione una pregunta</option>
                              {!!surveyData &&
                                surveyData.steps
                                  .filter(x => x.type === 'question')
                                  .map((x, i) => (
                                    <option key={i} value={JSON.stringify(x)}>{x.title}</option>
                                  ))
                              }
                            </select>
                          </Form.Group>
                        </Col>
                      </Row>

                    </Form>
                  </Col>
                </Row>

                {!!stepData &&
                  <Row>
                    <Col>
                      <Portlet>
                        <Portlet.Body>

                          <div>
                            <h5>Detalle</h5>

                            <b>Pregunta</b>
                            <br />
                            {stepData.title}
                          </div>

                          <Row className="d-flex justify-content-center my-4">
                            <Col xs="12" sm="6" md="6">
                              <BarGraph data={graphData} theme={props.theme} />
                            </Col>
                          </Row>

                        </Portlet.Body>
                      </Portlet>
                    </Col>
                  </Row>
                }


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
)(withAuth(withLayout(SurveyGraph)))