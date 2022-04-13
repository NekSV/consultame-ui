import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import { Col, Container, Portlet, Row, FloatLabel, Input, Label, Button } from "@blueupcode/components"
import { Fragment, useEffect, useState } from "react"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Head from "next/head"
import PAGE from "config/page.config"
import { defaultSteps, emptyStep } from "@constants/constants"
import { Form } from "@blueupcode/components/index"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import * as yup from 'yup';
import { yupResolver } from "components/validation/yupResolver"

const AddSurvey = (props) => {

  const formSchema = yup.object().shape({
    surveyId: yup.string().required('Ingrese un id para la encuesta'),
    steps: yup.array().of(
      yup.object().shape({
        title: yup.string().required('no'),
        text: yup.string().required('no')
      }),
    ),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    control,
    formState,
    handleSubmit,
    register,
    watch,
  } = useForm(formOptions);

  const { errors } = formState;

  const { fields, append, insert, remove, update, swap, replace } = useFieldArray({ name: 'steps', control });

  useEffect(() => {
    props.pageChangeHeaderTitle("Agregar encuesta")
    props.breadcrumbChange([
      { text: "Encuesta" },
      { text: "Agregar encuesta" },
    ]);
  }, [props])

  const onSubmit = async (data) => {
    console.log(data);
  }

  useEffect(() => {
    defaultSteps.forEach(item => {
      append(item)
    });
  }, []);

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);


  const addStep = () => {
    insert((fields.length - 1), emptyStep);
    // append(emptyStep);
  };

  const removeStep = (step) => {

  };

  return (
    <Fragment>
      <Head>
        <title>Agregar encuesta | {PAGE.siteName}</title>
      </Head>
      <Container fluid>
        <Row className="mt-3 d-flex justify-content-center">
          <Col md="8">

            <Form onSubmit={handleSubmit(onSubmit)}>

              <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Id</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <Form.Group className="mb-4">
                    <Controller
                      name="surveyId"
                      control={control}
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

              <Portlet className="mt-4">
                <Portlet.Header bordered>
                  <Portlet.Title>
                    Preguntas
                  </Portlet.Title>
                </Portlet.Header>

                <Portlet.Body>

                  {fields.map((item, i) => (
                    <Portlet key={i} className="mt-4">

                      <Portlet.Body>
                        <div className="form-group">
                          <label htmlFor={`steps[${i}].title`}>Titulo:</label>
                          <input
                            className={`form-control`}
                            name={`steps[${i}].title`}
                            id={`steps[${i}].title`}
                            {...register(`steps[${i}].title`)}
                            type="text"
                            defaultValue={item.title}
                          />
                          {!!errors.steps &&
                            <div className="">efe</div>
                          }

                        </div>

                        <div className="form-group">
                          <label htmlFor={`steps[${i}].text`}>Texto:</label>
                          <input
                            className={`form-control`}
                            name={`steps[${i}].text`}
                            id={`steps[${i}].text`}
                            {...register(`steps[${i}].text`)}
                            type="text"
                            defaultValue={item.text}
                          />
                          {!!errors.steps &&
                            <div className="">efe</div>
                          }
                        </div>

                        {/* <div className="">{errors.steps?.[i]?.text?.message}</div> */}
                        {/* <Form.Group>

                          <Controller
                            name={`steps[${i}].text`}
                            control={control}
                            render={({
                              field,
                              fieldState: { invalid }
                            }) => (
                              <>
                                <Label for={`steps[${i}].text`}>Texto</Label>
                                <input
                                  className={`form-control ${errors.steps?.[i]?.text ? 'is-invalid' : ''
                                    }`}
                                  {...field}
                                  defaultValue={item.text}
                                />

                                {invalid && <Form.Feedback>{errors.steps?.[i].text?.message}</Form.Feedback>}

                              </>

                            )}
                          />
                        </Form.Group> */}
                      </Portlet.Body>

                    </Portlet>
                  ))
                  }
                </Portlet.Body>

                <Portlet.Footer bordered>
                  <Button
                    type="button"
                    variant="label-secondary"
                    width="widest"
                    onClick={addStep}
                  >
                    Agregar pregunta
                  </Button>
                </Portlet.Footer>
              </Portlet>

              <hr />

              <Button
                type="submit"
                variant="primary"
                width="widest"
              >
                Finalizar encuesta
              </Button>

            </Form>


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