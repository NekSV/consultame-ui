import { Portlet, FloatLabel, Input, Label, Button, Form } from "@blueupcode/components"
import StepsForm from "components/custom/StepsForm"
import { forwardRef, useRef, useImperativeHandle } from "react";
import { Controller, useFormContext } from "react-hook-form"
import BgForm from "./BgForm";

const SurveyForm = forwardRef(({ onSubmit, edit, handleImage } = props, ref) => {

  const { control, handleSubmit, formState } = useFormContext();
  const { errors } = formState;

  const childImage = useRef();

  useImperativeHandle(ref, () => ({
    resetImage() {
      childImage.current.resetImageForm();
    },
    setImg(img) { 
      childImage.current.setImg(img);
    }
  }));

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

      <BgForm
        ref={childImage}
        handleImage={handleImage}
      />

      <hr />

      <Button
        type="submit"
        variant="primary"
        width="widest"
        className="mb-4"
      >
        Finalizar encuesta
      </Button>

    </Form>
  )

});

export default SurveyForm;