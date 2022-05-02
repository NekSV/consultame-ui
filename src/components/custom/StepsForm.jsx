import { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Portlet, Button } from "@blueupcode/components"
import Question from "./Question";
import { defaultSteps, emptyStep } from "@constants/constants";


const StepsForm = () => {
  const { control } = useFormContext();
  const { fields, remove, insert } = useFieldArray({
    name: 'steps',
    control
  });

  const addStep = () => {
    insert((fields.length - 1), emptyStep);
  };

  const removeStep = (step) => {
    remove(step);
  };

  return (
    <Portlet className="mt-4">
      <Portlet.Header bordered>
        <Portlet.Title>
          Preguntas
        </Portlet.Title>
      </Portlet.Header>

      <Portlet.Body>

        {fields.map((item, i) => (
          <Question key={item.id} item={item} index={i} removeStep={removeStep}/>
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

  )


};

export default StepsForm;