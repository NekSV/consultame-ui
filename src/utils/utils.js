export const mapSurvey = (data) => {
  const steps = data.steps.map((x, i) => mapStep(x, i));
  return {
    id: data.surveyId,
    rules: [],
    steps: steps,
    type: 'navigable'
  }
};

export const mapStep = (step, index) => {


  if ((step.type != 'intro') && (step.type != 'completion')) {
    const type = step.answerFormat.type;
    switch (type) {
      case 'single':
        return {
          stepIdentifier: {
            id: `${(index + 1)}`
          },
          title: step.title,
          text: step.text??'',
          answerFormat: {
            type: 'single',
            textChoices: step.answerFormat.textChoices
          },
          type: 'question'
        };
      case 'multiple':
        return {
          stepIdentifier: {
            id: `${(index + 1)}`
          },
          title: step.title,
          text: step.text??'',
          answerFormat: {
            type: 'single',
            textChoices: step.answerFormat.textChoices
          },
          type: 'question'
        };
      case 'scale':
        return {
          stepIdentifier: {
            id: `${(index + 1)}`
          },
          title: step.title,
          text: step.text??'',
          answerFormat: {
            type: 'scale',
            defaultValue: parseInt(step.answerFormat.defaultValue),
            maximumValue: parseInt(step.answerFormat.maximumValue),
            maximumValueDescription: step.answerFormat.maximumValueDescription,
            minimumValue: parseInt(step.answerFormat.minimumValue),
            minimumValueDescription: step.answerFormat.minimumValueDescription,
            step: parseInt(step.answerFormat.step),
          },
          type: 'question'
        };
      case 'integer':
        return {
          stepIdentifier: {
            id: `${(index + 1)}`
          },
          title: step.title,
          text: step.text??'',
          answerFormat: {
            type: 'integer',
            defaultValue: parseInt(step.answerFormat.defaultValue),
            hint: step.answerFormat.hint,
          },
          type: 'question'
        };
    }
  } else {
    return {
      ...step,
      stepIdentifier: {
        id: `${(index + 1)}`
      },
    }
  }



}