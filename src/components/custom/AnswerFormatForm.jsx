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
              rules={{ required: true }}
              render={({
                field,
                fieldState: { error }
              }) => (
                <>
                  <input
                    {...field}
                    className="form-control"
                    id={`steps[${index}].answerFormat.defaultValue`}
                    type="text"
                  />
                  {!!error &&
                    <span className="text-danger">Ingrese un valor por defecto</span>
                  }
                </>
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`steps[${index}].answerFormat.hint`}>Sugerencia:</label>
            <Controller
              name={`steps[${index}].answerFormat.hint`}
              control={control}
              rules={{ required: true }}
              render={({
                field,
                fieldState: { error }
              }) => (
                <>
                  <input
                    {...field}
                    className="form-control"
                    id={`steps[${index}].answerFormat.hint`}
                    type="text"
                  />
                  {!!error &&
                    <span className="text-danger">Ingrese una sugerencia</span>
                  }
                </>
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
              rules={{ required: true }}
              render={({
                field,
                fieldState: { error }
              }) => (
                <>
                  <input
                    {...field}
                    className="form-control"
                    id={`steps[${index}].answerFormat.defaultValue`}
                    type="text"
                  />
                  {!!error &&
                    <span className="text-danger">Ingrese un valor por defecto</span>
                  }
                </>
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`steps[${index}].answerFormat.maximumValue`}>Máximo:</label>
            <Controller
              name={`steps[${index}].answerFormat.maximumValue`}
              control={control}
              rules={{ required: true }}
              render={({
                field,
                fieldState: { error }
              }) => (
                <>
                  <input
                    {...field}
                    className="form-control"
                    id={`steps[${index}].answerFormat.maximumValue`}
                    type="text"
                  />
                  {!!error &&
                    <span className="text-danger">Ingrese el máximo</span>
                  }
                </>
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`steps[${index}].answerFormat.maximumValueDescription`}>Descripción de valor máximo:</label>
            <Controller
              name={`steps[${index}].answerFormat.maximumValueDescription`}
              control={control}
              rules={{ required: true }}
              render={({
                field,
                fieldState: { error }
              }) => (
                <>
                  <input
                    {...field}
                    className="form-control"
                    id={`steps[${index}].answerFormat.maximumValueDescription`}
                    type="text"
                  />
                  {!!error &&
                    <span className="text-danger">Ingrese descripción</span>
                  }
                </>

              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`steps[${index}].answerFormat.minimumValue`}>Mínimo:</label>
            <Controller
              name={`steps[${index}].answerFormat.minimumValue`}
              control={control}
              rules={{ required: true }}
              render={({
                field,
                fieldState: { error }
              }) => (
                <>
                  <input
                    {...field}
                    className="form-control"
                    id={`steps[${index}].answerFormat.minimumValue`}
                    type="text"
                  />
                  {!!error &&
                    <span className="text-danger">Ingrese el mínimo</span>
                  }
                </>

              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`steps[${index}].answerFormat.minimumValueDescription`}>Descripción de valor mínimo:</label>
            <Controller
              name={`steps[${index}].answerFormat.minimumValueDescription`}
              control={control}
              rules={{ required: true }}
              render={({
                field,
                fieldState: { error }
              }) => (
                <>
                  <input
                    {...field}
                    className="form-control"
                    id={`steps[${index}].answerFormat.minimumValueDescription`}
                    type="text"
                  />
                  {!!error &&
                    <span className="text-danger">Ingrese descripción</span>
                  }
                </>
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`steps[${index}].answerFormat.step`}>Incremento:</label>
            <Controller
              name={`steps[${index}].answerFormat.step`}
              control={control}
              rules={{ required: true }}
              render={({
                field,
                fieldState: { error }
              }) => (
                <>
                  <input
                    {...field}
                    className="form-control"
                    id={`steps[${index}].answerFormat.step`}
                    type="text"
                  />
                  {!!error &&
                    <span className="text-danger">Ingrese el incremento</span>
                  }
                </>

              )}
            />
          </div>
        </>

      }

      {(['single', 'multiple'].includes(questionType)) &&

        <>
          <TextChoicesForm index={index} />
        </>
      }
    </>
  );


};

export default AnswerFormatForm;