import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import { Col, Container, Row } from "@blueupcode/components"
import { Fragment, useEffect, useRef, useState } from "react"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Head from "next/head"
import PAGE from "config/page.config"
import { useForm, FormProvider } from "react-hook-form"
import editDoc from "utils/saveDoc"
import { swal } from "components/swal/instance"
import LoadingFiller from 'components/custom/LoadingFiller'
import { mapSurvey } from "utils/utils"
import SurveyForm from "@components/custom/SurveyForm"
import useDocument from "hooks/useDocument"

import { useRouter } from "next/router"

const EditSurvey = (props) => {

  const router = useRouter();
  const { id } = router.query;

  const { document: surveyData, trigger } = useDocument('surveys', id);
  const [isLoading, setLoading] = useState(false);
  const [surveyBg, setSurveyBg] = useState('');

  const formContext = useForm();

  const { reset } = formContext;

  const handleImage = (image) => {
    setSurveyBg(image);
  };

  const imageCompRef = useRef();

  useEffect(() => {

    if (!!surveyData) {
      imageCompRef.current.setImg(surveyData.bg);
      reset({
        surveyId: surveyData.id,
        steps: surveyData.steps
      })
    }

  }, [surveyData])

  useEffect(() => {
    props.pageChangeHeaderTitle("Editar encuesta")
    props.breadcrumbChange([
      { text: "Encuesta" },
      { text: "Editar encuesta" },
    ]);
  }, [props]);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);

    const survey = mapSurvey(data, surveyBg);

    editDoc('surveys', survey)
      .then(res => {
        if (res.status == 'success') {
          swal.fire({
            icon: 'success',
            title: 'Encuesta actualizada exitosamente',
            timer: 2000
          });
        } else {
          swal.fire({
            icon: 'error',
            title: 'Error al actualizar encuesta',
            timer: 2000
          });
          console.log('survey-error', res.error)
        }
      })
      .catch(err => {
        swal.fire({
          icon: 'error',
          title: 'Error al actualizar encuesta',
          timer: 2000
        });
        console.log('survey-error', err)
      })
      .finally(() => {
        setLoading(false);
        formContext.reset(data);
      })
  };


  return (
    <Fragment>
      <Head>
        <title>Editar encuesta | {PAGE.siteName}</title>
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
                edit={true}
                image={surveyBg}
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
)(withAuth(withLayout(EditSurvey)))