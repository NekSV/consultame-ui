import { useFormContext, Controller } from "react-hook-form";
import { answerFormatOptions } from "@constants/constants";
import TextChoicesForm from "./TextChoicesForm";

const AnswerFormatForm = ({ item, index } = props) => {

  const { watch, control } = useFormContext();
  const questionType = watch(`steps[${index}].answerFormat.type`);

  return (
    <>
      <div className="form-group">
        <label htmlFor={`steps[${index}].answerFormat.type`}>Tipo:</label>
        <Controller
          name={`steps[${index}].answerFormat.type`}
          control={control}
          render={({
            field: { onChange, onBlur, value, name, ref },
          }) => (
            <select
              name={name}
              ref={ref}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              className="form-control"
              id={`steps[${index}].answerFormat.type`}
            >
              {answerFormatOptions.map((x, i) => (
                <option key={i} value={x.value}>{x.text}</option>
              ))}
            </select>
          )}
        />
      </div>

      {questionType == 'integer' &&

        <>
          <div className="form-group">
            <label htmlFor={`steps[${index}].answerFormat.defaultValue`}>Valor por defecto:</label>
            <Controller
              name={`steps[${index}].answerFormat.defaultValue`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="form-control"
                  id={`steps[${index}].answerFormat.defaultValue`}
                  type="text"
                />
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`steps[${index}].answerFormat.hint`}>Sugerencia:</label>
            <Controller
              name={`steps[${index}].answerFormat.hint`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="form-control"
                  id={`steps[${index}].answerFormat.hint`}
                  type="text"
                />
              )}
            />
          </div>
        </>

      }

      {questionType == 'scale' &&

        <>
          <div className="form-group">
            <label htmlFor={`steps[${index}].answerFormat.defaultValue`}>Valor por defecto:</label>
            <Controller
              name={`steps[${index}].answerFormat.defaultValue`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="form-control"
                  id={`steps[${index}].answerFormat.defaultValue`}
                  type="text"
                />
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`steps[${index}].answerFormat.maximumValue`}>Máximo:</label>
            <Controller
              name={`steps[${index}].answerFormat.maximumValue`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="form-control"
                  id={`steps[${index}].answerFormat.maximumValue`}
                  type="text"
                />
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`steps[${index}].answerFormat.maximumValueDescription`}>Descripción de valor máximo:</label>
            <Controller
              name={`steps[${index}].answerFormat.maximumValueDescription`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="form-control"
                  id={`steps[${index}].answerFormat.maximumValueDescription`}
                  type="text"
                />
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`steps[${index}].answerFormat.minimumValue`}>Mínimo:</label>
            <Controller
              name={`steps[${index}].answerFormat.minimumValue`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="form-control"
                  id={`steps[${index}].answerFormat.minimumValue`}
                  type="text"
                />
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`steps[${index}].answerFormat.minimumValueDescription`}>Descripción de valor mínimo:</label>
            <Controller
              name={`steps[${index}].answerFormat.minimumValueDescription`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="form-control"
                  id={`steps[${index}].answerFormat.minimumValueDescription`}
                  type="text"
                />
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`steps[${index}].answerFormat.step`}>Incremento:</label>
            <Controller
              name={`steps[${index}].answerFormat.step`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="form-control"
                  id={`steps[${index}].answerFormat.step`}
                  type="text"
                />
              )}
            />
          </div>
        </>

      }

      {(['single', 'multiple'].includes(questionType)) &&

        <>
          <TextChoicesForm item={item} index={index} />
        </>
      }
    </>
  );


};

export default AnswerFormatForm;