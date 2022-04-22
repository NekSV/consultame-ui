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

  // {
  //   buttonText: "Continuar",
  //   stepIdentifier: {
  //     id: 1
  //   },
  //   text: "¿podrías ayudarnos con las siguientes preguntas?",
  //   title: "Hola, nos encantaría servirte mejor",
  //   type: "intro"
  // },
  // {
  //   text: "prueba1.1",
  //   title: "prueba1",
  //   answerFormat: {
  //     type: "single",
  //     defaultValue: 0,
  //     hint: "",
  //     textChoices: [
  //       {
  //         text: "Opcion 1",
  //         value: "option-one"
  //       },
  //       {
  //         text: "Opcion 2",
  //         value: "option-two"
  //       },
  //       {
  //         text: "Opcion 3",
  //         value: "option-three"
  //       }
  //     ],
  //     maximumValue: 0,
  //     maximumValueDescription: "",
  //     minimumValue: 0,
  //     minimumValueDescription: "",
  //     step: 1
  //   },
  //   type: "question"
  // },
  // {
  //   text: "Probando step integer",
  //   title: "prueba integer",
  //   answerFormat: {
  //     type: "integer",
  //     defaultValue: "12",
  //     hint: "Prueba",
  //     textChoices: [
  //       {
  //         text: "",
  //         value: ""
  //       }
  //     ],
  //     maximumValue: 0,
  //     maximumValueDescription: "",
  //     minimumValue: 0,
  //     minimumValueDescription: "",
  //     step: 1
  //   },
  //   type: "question"
  // },
  // {
  //   text: "Probando step scale",
  //   title: "Prueba Scale",
  //   answerFormat: {
  //     type: "scale",
  //     defaultValue: "20",
  //     hint: "",
  //     textChoices: [
  //       {
  //         text: "",
  //         value: ""
  //       }
  //     ],
  //     maximumValue: "100",
  //     maximumValueDescription: "Maximo",
  //     minimumValue: "10",
  //     minimumValueDescription: "Minimo",
  //     step: "10"
  //   },
  //   type: "question"
  // },
  // {
  //   buttonText: "Finalizar",
  //   stepIdentifier: {
  //     id: 2
  //   },
  //   text: "Gracias por ayudarnos",
  //   title: "Fin!",
  //   type: "completion"
  // }

];

export const emptyStep = [
  {
    text: '',
    title: '',
    answerFormat: {
      type: 'single',

      defaultValue: 0,
      hint: '',

      textChoices: [],

      maximumValue: 0,
      maximumValueDescription: '',
      minimumValue: 0,
      minimumValueDescription: '',
      step: 1,
    },
    type: 'question',
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