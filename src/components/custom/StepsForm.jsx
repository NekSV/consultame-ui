import { useFormContext, useFieldArray } from "react-hook-form";
import { Portlet, Button } from "@blueupcode/components"
import Question from "./Question";
import { emptyStep } from "@constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"


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
        <Portlet.Title className="d-flex justify-content-between">
          <span>Preguntas</span>
          <span className="text-muted"><small>Para agregar una pregunta haga clic en el botón inferior</small></span>
        </Portlet.Title>
      </Portlet.Header>

      <Portlet.Body>

        {fields.map((item, i) => (
          <Question key={item.id} item={item} index={i} removeStep={removeStep} />
        ))
        }

      </Portlet.Body>

      <Portlet.Footer bordered>
        <Button
          type="button"
          variant="success"
          width="widest"
          onClick={addStep}
        >
          <span className="mx-2">Agregar pregunta</span>
          
          <FontAwesomeIcon
            icon={SolidIcon.faPlus}
          />
        </Button>
      </Portlet.Footer>
    </Portlet>

  )


};

export default StepsForm;