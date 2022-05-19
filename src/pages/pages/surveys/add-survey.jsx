import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import { Col, Container, Row } from "@blueupcode/components"
import { Fragment, useEffect, useRef, useState } from "react"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Head from "next/head"
import PAGE from "config/page.config"
import { defaultSteps } from "@constants/constants"
import { useForm, FormProvider } from "react-hook-form"
import saveDoc from "utils/saveDoc"
import { swal } from "components/swal/instance"
import LoadingFiller from 'components/custom/LoadingFiller'
import { mapSurvey } from "utils/utils"
import SurveyForm from "@components/custom/SurveyForm"

const AddSurvey = (props) => {

  const [isLoading, setLoading] = useState(false);
  const [surveyBg, setSurveyBg] = useState();

  const formOptions = {
    defaultValues: { surveyId: '', steps: defaultSteps }
  };

  const formContext = useForm(formOptions);

  const handleImage = (image) => {
    setSurveyBg(image);
  };

  const imageCompRef = useRef();

  useEffect(() => {
    props.pageChangeHeaderTitle("Agregar encuesta")
    props.breadcrumbChange([
      { text: "Encuesta" },
      { text: "Agregar encuesta" },
    ]);
  }, [props]);

  const onSubmit = async (data) => {
    setLoading(true);

    const survey = mapSurvey(data, surveyBg);

    saveDoc('surveys', survey)
      .then(res => {
        if (res.status == 'success') {
          swal.fire({
            icon: 'success',
            title: 'Encuesta guardada exitosamente',
            timer: 2000
          });
        } else {
          swal.fire({
            icon: 'error',
            title: 'Error al guardar encuesta',
            timer: 2000
          });
          console.log('survey-error', res.error)
        }
      })
      .catch(err => {
        swal.fire({
          icon: 'error',
          title: 'Error al guardar encuesta',
          timer: 2000
        });
        console.log('survey-error', err)
      })
      .finally(() => {
        setLoading(false);
        formContext.reset();
        imageCompRef.current.resetImage();
      })
  };


  return (
    <Fragment>
      <Head>
        <title>Agregar encuesta | {PAGE.siteName}</title>
      </Head>
      <Container fluid>

        <Row className="mt-3 d-flex justify-content-center">
          <Col md="8">
            {isLoading &&
              <LoadingFiller />
            }
            <FormProvider {...formContext}>
              <SurveyForm
                ref={imageCompRef}
                onSubmit={onSubmit}
                edit={false}
                handleImage={handleImage}
              />
            </FormProvider>

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
)(withAuth(withLayout(AddSurvey)))