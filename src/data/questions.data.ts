```typescript
export const DIMENSION_QUESTIONS = {
  organization: {
    id: 'organization',
    name: 'Organización',
    icon: '🏛️',
    description: 'Estructura, procesos, cultura y liderazgo',
    questions: [
      {
        id: 'org_1',
        question: '¿La estructura organizacional facilita la colaboración entre áreas?',
        category: 'Estructura'
      },
      {
        id: 'org_2',
        question: '¿La toma de decisiones estratégicas es ágil y descentralizada?',
        category: 'Gobierno'
      },
      {
        id: 'org_3',
        question: '¿Existe una cultura de aprendizaje y experimentación?',
        category: 'Cultura'
      },
      {
        id: 'org_4',
        question: '¿Los líderes modelan el comportamiento que esperan de sus equipos?',
        category: 'Liderazgo'
      },
      {
        id: 'org_5',
        question: '¿Los procesos están optimizados y alineados con la estrategia?',
        category: 'Procesos'
      }
    ]
  },
  resources: {
    id: 'resources',
    name: 'Recursos',
    icon: '💰',
    description: 'Capital, infraestructura, talento, datos y relaciones',
    questions: [
      {
        id: 'res_1',
        question: '¿La organización cuenta con el capital financiero necesario para su estrategia?',
        category: 'Capital Financiero'
      },
      {
        id: 'res_2',
        question: '¿La infraestructura física y digital es adecuada y está bien mantenida?',
        category: 'Infraestructura'
      },
      {
        id: 'res_3',
        question: '¿El talento disponible tiene las habilidades necesarias para el futuro?',
        category: 'Capital Humano'
      },
      {
        id: 'res_4',
        question: '¿Los datos son de calidad, accesibles y se usan para decidir?',
        category: 'Datos e Información'
      },
      {
        id: 'res_5',
        question: '¿Las alianzas y relaciones son estratégicas y generan valor?',
        category: 'Relaciones y Redes'
      }
    ]
  },
  wellbeing: {
    id: 'wellbeing',
    name: 'Bienestar',
    icon: '❤️',
    description: 'Salud, propósito, crecimiento y equilibrio',
    questions: [
      {
        id: 'wel_1',
        question: '¿Los equipos tienen un alto nivel de compromiso y satisfacción?',
        category: 'Salud y Compromiso'
      },
      {
        id: 'wel_2',
        question: '¿Existe un sentido de propósito claro en el trabajo diario?',
        category: 'Propósito'
      },
      {
        id: 'wel_3',
        question: '¿Hay oportunidades reales de crecimiento y desarrollo profesional?',
        category: 'Crecimiento'
      },
      {
        id: 'wel_4',
        question: '¿Se promueve un equilibrio saludable entre vida personal y trabajo?',
        category: 'Equilibrio'
      },
      {
        id: 'wel_5',
        question: '¿Existe un ambiente de confianza y seguridad psicológica?',
        category: 'Cultura y Confianza'
      }
    ]
  },
  innovation: {
    id: 'innovation',
    name: 'Innovación',
    icon: '💡',
    description: 'Capacidad de generar e implementar nuevas ideas',
    questions: [
      {
        id: 'inn_1',
        question: '¿La organización tiene una cultura que fomenta la experimentación?',
        category: 'Cultura de Innovación'
      },
      {
        id: 'inn_2',
        question: '¿Existe un proceso sistemático para generar e implementar nuevas ideas?',
        category: 'Proceso de Innovación'
      },
      {
        id: 'inn_3',
        question: '¿Se destina presupuesto específico a I+D y nuevas iniciativas?',
        category: 'Inversión en Innovación'
      },
      {
        id: 'inn_4',
        question: '¿La innovación está conectada con la estrategia y el modelo de negocio?',
        category: 'Estrategia de Innovación'
      },
      {
        id: 'inn_5',
        question: '¿Se mide el impacto de la innovación en los resultados del negocio?',
        category: 'Métrica de Innovación'
      }
    ]
  },
  technology: {
    id: 'technology',
    name: 'Tecnología',
    icon: '🤖',
    description: 'Herramientas, sistemas y conocimientos digitales',
    questions: [
      {
        id: 'tec_1',
        question: '¿La tecnología está alineada con la estrategia del negocio?',
        category: 'Alineamiento Estratégico'
      },
      {
        id: 'tec_2',
        question: '¿La IA se usa para transformar el modelo de negocio o solo para automatizar?',
        category: 'Uso de IA'
      },
      {
        id: 'tec_3',
        question: '¿La organización cuenta con competencias tecnológicas adecuadas?',
        category: 'Capacidades Digitales'
      },
      {
        id: 'tec_4',
        question: '¿La ciberseguridad y gobernanza de datos son prioridades?',
        category: 'Seguridad y Gobernanza'
      },
      {
        id: 'tec_5',
        question: '¿La infraestructura tecnológica es moderna, escalable y está actualizada?',
        category: 'Infraestructura Tecnológica'
      }
    ]
  },
  adaptability: {
    id: 'adaptability',
    name: 'Adaptabilidad',
    icon: '🔄',
    description: 'Capacidad de ajustarse a cambios en el entorno',
    questions: [
      {
        id: 'ada_1',
        question: '¿La organización detecta cambios en el entorno de manera temprana?',
        category: 'Anticipación'
      },
      {
        id: 'ada_2',
        question: '¿La estructura permite reasignar recursos y ajustar la estrategia rápidamente?',
        category: 'Flexibilidad'
      },
      {
        id: 'ada_3',
        question: '¿Se utilizan escenarios y simulaciones para preparar el futuro?',
        category: 'Planeación de Escenarios'
      },
      {
        id: 'ada_4',
        question: '¿La cultura es resiliente y aprende de los fracasos?',
        category: 'Resiliencia'
      },
      {
        id: 'ada_5',
        question: '¿Hay capacidad para responder a cambios inesperados en menos de un mes?',
        category: 'Velocidad de Respuesta'
      }
    ]
  }
} as const;

export type DimensionKey = keyof typeof DIMENSION_QUESTIONS;