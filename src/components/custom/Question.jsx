import { Portlet, Button } from "@blueupcode/components"
import { useFormContext, Controller } from 'react-hook-form';
import AnswerFormatForm from "./AnswerFormatForm";

const Question = ({ item, index, removeStep } = props) => {

  const { control } = useFormContext();


  return (
    <Portlet className="mt-4">
      <Portlet.Header bordered>
        <Portlet.Title>
          {index + 1}
        </Portlet.Title>

        {!(['intro', 'completion'].includes(item.type)) &&
          <Button
            size="sm"
            variant="label-danger"
            onClick={() => removeStep(index)}
          >
            Remover
          </Button>
        }


      </Portlet.Header>
      <Portlet.Body>
        {/* <h5 className="mb-4">Principal</h5> */}
        <div className="form-group">
          <label htmlFor={`steps[${index}].title`}>Titulo:</label>
          <Controller
            name={`steps[${index}].title`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="form-control"
                id={`steps[${index}].title`}
                type="text"
              />
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor={`steps[${index}].text`}>Texto:</label>
          <Controller
            name={`steps[${index}].text`}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="form-control"
                id={`steps[${index}].text`}
                type="text"
              />
            )}
          />
        </div>


        {!(['intro', 'completion'].includes(item.type)) &&
            <AnswerFormatForm item={item} index={index} />
        }
      </Portlet.Body>
    </Portlet>
  )
};

export default Question;