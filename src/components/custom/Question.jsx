import { Portlet } from "@blueupcode/components"
import { answerFormatOptions } from "@constants/constants";
import { useEffect, useState } from "react";
import { useFormContext, Controller } from 'react-hook-form';

const Question = ({ item, index } = props) => {

  const { watch, control } = useFormContext();
  const questionType = watch(`steps[${index}].type`);

  return (
    <Portlet className="mt-4">
      <Portlet.Header bordered>
        <Portlet.Title>
          {index + 1}
        </Portlet.Title>
      </Portlet.Header>
      <Portlet.Body>
        <div className="form-group">
          <label htmlFor={`steps[${index}].title`}>Titulo:</label>
          <Controller
            name={`steps[${index}].title`}
            control={control}
            defaultValue={item.title}
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
            defaultValue={item.text}
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
          <>
            <div className="form-group">
              <label htmlFor={`steps[${index}].type`}>Tipo:</label>
              <Controller
                name={`steps[${index}].type`}
                control={control}
                defaultValue={item.type}
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
                    id={`steps[${index}].type`}
                    type="text"
                  >
                    {answerFormatOptions.map((x, i) => (
                      <option key={i} value={x.value}>{x.text}</option>
                    ))}
                  </select>
                )}
              />
            </div>

            {questionType == 'integer' &&

              <div className="form-group">
                <label htmlFor={`steps[${index}].defaultValue`}>Valor por defecto:</label>
                <Controller
                  name={`steps[${index}].defaultValue`}
                  control={control}
                  defaultValue={item.defaultValue}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="form-control"
                      id={`steps[${index}].defaultValue`}
                      type="text"
                    />
                  )}
                />
              </div>
            }
          </>
        }
      </Portlet.Body>
    </Portlet>
  )
};

export default Question;