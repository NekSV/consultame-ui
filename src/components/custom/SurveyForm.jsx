import { Portlet, FloatLabel, Input, Label, Button, Form } from "@blueupcode/components"
import StepsForm from "components/custom/StepsForm"
import { Controller, useFormContext } from "react-hook-form"

const SurveyForm = ({ onSubmit, edit } = props) => {

  const { control, handleSubmit, formState } = useFormContext();
  const { errors } = formState;

  return (
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
                    disabled={edit}
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
  )

};

export default SurveyForm;