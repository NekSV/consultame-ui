export const stepTypes = {
  question: 'question',
  intro: 'intro',
  completion: 'completion'
};

export const defaultSteps = [
  {
    buttonText: 'Continuar',
    stepIdentifier: {id: 1},
    text: '¿podrías ayudarnos con las siguientes preguntas?',
    title: 'Hola, nos encantaría servirte mejor',
    type: 'intro'
  },
  {
    buttonText: 'Finalizar',
    stepIdentifier: {id: 2},
    text: 'Gracias por ayudarnos',
    title: 'Fin!',
    type: 'completion'
  }
];

export const emptyStep = [
  {
    text: '',
    title: '',
    type: 'single',
    defaultValue: 0,
  }
];

export const stepTypeOptions = [
  {
    text: 'Intro',
    value: 'intro'
  },
  {
    text: 'Pregunta',
    value: 'question'
  },
  {
    text: 'Completado',
    value: 'completion'
  }
];

export const answerFormatOptions = [
  {
    text: 'Opción única',
    value: 'single'
  },
  {
    text: 'Opción múltiple',
    value: 'multiple'
  },
  {
    text: 'Escala',
    value: 'scale'
  },
  {
    text: 'Número',
    value: 'integer'
  },
];