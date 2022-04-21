import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import { Col, Container, Portlet, Row, FloatLabel, Input, Label, Button } from "@blueupcode/components"
import { Fragment, useEffect } from "react"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Head from "next/head"
import PAGE from "config/page.config"
import { answerFormatOptions, defaultSteps, emptyStep } from "@constants/constants"
import { Form } from "@blueupcode/components/index"
import { useForm, Controller, FormProvider } from "react-hook-form"
import * as yup from 'yup';
import { yupResolver } from "components/validation/yupResolver"
import StepsForm from "components/custom/StepsForm"

const AddSurvey = (props) => {

  const formSchema = yup.object().shape({
    surveyId: yup.string().required('Ingrese un id para la encuesta'),
    steps: yup.array().of(
      yup.object().shape({
        title: yup.string(),
        text: yup.string(),
        type: yup.string()
      }),
    ),
  });

  const formOptions = { resolver: yupResolver(formSchema) };


  const formContext = useForm(formOptions);

  const { errors } = formContext.formState;

  useEffect(() => {
    props.pageChangeHeaderTitle("Agregar encuesta")
    props.breadcrumbChange([
      { text: "Encuesta" },
      { text: "Agregar encuesta" },
    ]);
  }, [props])

  const onSubmit = async (data) => {
    console.log(data.steps);
  }


  return (
    <Fragment>
      <Head>
        <title>Agregar encuesta | {PAGE.siteName}</title>
      </Head>
      <Container fluid>
        <Row className="mt-3 d-flex justify-content-center">
          <Col md="8">

            <FormProvider {...formContext}>
              <Form onSubmit={formContext.handleSubmit(onSubmit)}>
                <Portlet>
                  <Portlet.Header bordered>
                    <Portlet.Title>Id</Portlet.Title>
                  </Portlet.Header>
                  <Portlet.Body>
                    <Form.Group className="mb-4">
                      <Controller
                        name="surveyId"
                        control={formContext.control}
                        render={({
                          field: { onChange, onBlur, value, name, ref },
                          fieldState: { invalid }
                        }) => (
                          <FloatLabel size="lg">
                            <Input
                              type="text"
                              id="surveyId"
                              size="lg"
                              placeholder="Ingrese un Id para la encuesta"
                              name={name}
                              innerRef={ref}
                              invalid={invalid}
                              onChange={onChange}
                              onBlur={onBlur}
                              defaultValue={value}
                            />
                            <Label for="surveyId">Id</Label>
                            {invalid && <Form.Feedback>{errors.surveyId?.message}</Form.Feedback>}
                          </FloatLabel>
                        )}
                      />
                    </Form.Group>
                  </Portlet.Body>
                </Portlet>

                <hr />

                <StepsForm />

                <hr />

                <Button
                  type="submit"
                  variant="primary"
                  width="widest"
                >
                  Finalizar encuesta
                </Button>

              </Form>
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