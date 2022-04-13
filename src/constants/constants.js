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
    answerFormat: {
      type: ''
    },
    text: '',
    title: '',
    type: 'question'
  }
]