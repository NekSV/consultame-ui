import { useFormContext, Controller, useFieldArray } from "react-hook-form"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from '@blueupcode/components'
import { useEffect } from "react";
import { remove } from "nprogress";

const TextChoicesForm = ({ item, index } = props) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `steps[${index}].answerFormat.textChoices`,
    control
  });

  const addChoice = () => {
    append({ text: '', value: '' });
  };

  useEffect(() => {
    if (fields.length == 0) {
      append({ text: '', value: '' })
    }
  }, [])

  return (
    <div className="container-fluid p-0">
      <hr />
      <h5 className="mb-4">Opciones</h5>

      {
        fields.map((choice, j) => (
          <div key={choice.id} className="row">
            <div className="col-5">

              <div className="form-group">
                <label htmlFor={`steps[${index}].answerFormat.textChoices[${j}].text`}>Texto:</label>
                <Controller
                  name={`steps[${index}].answerFormat.textChoices[${j}].text`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="form-control"
                      id={`steps[${index}].answerFormat.textChoices[${j}].text`}
                      type="text"
                    />
                  )}
                />
              </div>

            </div>
            <div className="col-5">

              <div className="form-group">
                <label htmlFor={`steps[${index}].answerFormat.textChoices[${j}].value`}>Valor:</label>
                <Controller
                  name={`steps[${index}].answerFormat.textChoices[${j}].value`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="form-control"
                      id={`steps[${index}].answerFormat.textChoices[${j}].value`}
                      type="text"
                    />
                  )}
                />
              </div>

            </div>
            <div className="col d-flex flex-direction-row align-items-center">
              <Button
                style={{ marginInlineEnd: '1em' }}
                size="sm"
                icon
                circle
                variant="info"
                type="button"
                onClick={() => addChoice()}
              >
                <FontAwesomeIcon icon={SolidIcon.faPlus} />
              </Button>

              {fields.length > 1 &&
                <Button
                  size="sm"
                  icon
                  circle
                  variant="danger"
                  type="button"
                  onClick={() => remove(j)}
                >
                  <FontAwesomeIcon icon={SolidIcon.faMinus} />
                </Button>
              }

            </div>
          </div>
        ))
      }

      <hr />
    </div>
  );

};

export default TextChoicesForm;