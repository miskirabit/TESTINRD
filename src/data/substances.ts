import { Substance, SafetyRule, Reagent } from '../types';

export const REAGENTS: Reagent[] = [
  {
    id: 'marquis',
    name: 'Marquis',
    description: 'El reactivo estándar y más popular. Ideal como primera línea de descarte para MDMA, anfetaminas y opiáceos.',
    chemicalComposition: 'Mezcla de formaldehído y ácido sulfúrico concentrado',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
  },
  {
    id: 'mecke',
    name: 'Mecke',
    description: 'Reactivo secundario crucial. Excelente para diferenciar MDMA de otros compuestos y para verificar familias de fenetilaminas como 2C-X.',
    chemicalComposition: 'Ácido selenioso en ácido sulfúrico concentrado',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  {
    id: 'froehde',
    name: 'Froehde',
    description: 'Altamente resistente a la degradación. Muy útil para descartar adulterantes peligrosos como PMA/PMMA y confirmar alucinógenos.',
    chemicalComposition: 'Molibdato de sodio en ácido sulfúrico concentrado',
    badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20'
  }
];

export const SUBSTANCES: Substance[] = [
  {
    id: 'mdma',
    name: 'MDMA / Éxtasis',
    chemicalName: '3,4-metilendioximetanfetamina',
    category: 'Entactógeno / Estimulante',
    description: 'Sustancia empatógena popular en contextos de ocio. El uso de múltiples reactivos (Marquis, Mecke, Froehde) es crucial para descartar catinonas u otras imitaciones peligrosas.',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    textColor: 'text-purple-400',
    reactions: {
      marquis: {
        colorSpectrum: ['#F1F5F9', '#D8B4FE', '#6B21A8', '#030712'],
        resultType: 'positive',
        obtainedColorName: 'Púrpura a Negro profundo',
        explanation: 'El cambio rápido a púrpura que finaliza en negro es el resultado esperado para MDMA.',
        adulterantInfo: 'Si el cambio es lento o aparecen destellos naranjas al inicio, podría estar adulterado con anfetaminas, cafeína o aglutinantes.',
        reactionPhases: [
          { timeOffset: 0, color: '#F1F5F9', description: 'Gota cae sobre la muestra de cristal molido' },
          { timeOffset: 0.5, color: '#D8B4FE', description: 'Efervescencia suave y aparición de tonos púrpuras claros' },
          { timeOffset: 1.2, color: '#6B21A8', description: 'Oscurecimiento violáceo intenso en los bordes' },
          { timeOffset: 2.0, color: '#030712', description: 'Color negro absoluto y espeso. Reacción Marquis positiva típica.' }
        ]
      },
      mecke: {
        colorSpectrum: ['#F1F5F9', '#86EFAC', '#059669', '#022C22'],
        resultType: 'positive',
        obtainedColorName: 'Verde brillante a Negro verdoso',
        explanation: 'El reactivo Mecke reacciona con el MDMA volviéndose de un verde brillante que rápidamente oscurece a un negro-verdoso opaco.',
        adulterantInfo: 'Si vira inmediatamente a rojo o marrón sin pasar por verde, sospecha la presencia de otras sustancias no deseadas o adulterantes de tipo catinona.',
        reactionPhases: [
          { timeOffset: 0, color: '#F1F5F9', description: 'Contacto inicial del reactivo Mecke con la muestra' },
          { timeOffset: 0.5, color: '#86EFAC', description: 'Aparición instantánea de un verde brillante vivo' },
          { timeOffset: 1.2, color: '#059669', description: 'Transición a un verde azulado oscuro y espeso' },
          { timeOffset: 2.0, color: '#022C22', description: 'Verde-negro de alta intensidad. Confirmación positiva de MDMA.' }
        ]
      },
      froehde: {
        colorSpectrum: ['#F1F5F9', '#C084FC', '#4C1D95', '#090514'],
        resultType: 'positive',
        obtainedColorName: 'Púrpura a Negro/Marrón muy oscuro',
        explanation: 'Froehde reacciona de forma similar a Marquis, pasando de un púrpura/negro rojizo a un negro carbón impenetrable.',
        adulterantInfo: 'Si reacciona en color amarillo o no produce cambios, descarta inmediatamente la presencia de MDMA de alta pureza.',
        reactionPhases: [
          { timeOffset: 0, color: '#F1F5F9', description: 'Gota de reactivo Froehde toca la muestra' },
          { timeOffset: 0.5, color: '#C084FC', description: 'Tinte púrpura violáceo inmediato en el centro' },
          { timeOffset: 1.2, color: '#4C1D95', description: 'Expansión de la reacción con tonos negros-morados' },
          { timeOffset: 2.0, color: '#090514', description: 'Negro con matices azulados/purpúreos. Patrón clásico de Froehde para MDMA.' }
        ]
      }
    }
  },
  {
    id: 'anfetamina',
    name: 'Anfetamina / Speed',
    chemicalName: 'Sulfato de anfetamina',
    category: 'Estimulante del SNC',
    description: 'Estimulante sintético. El formato callejero ("speed") suele presentarse altamente adulterado. Es importante cruzar resultados para no confundirlo con metanfetamina o cafeína pura.',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    textColor: 'text-amber-500',
    reactions: {
      marquis: {
        colorSpectrum: ['#F1F5F9', '#FEF08A', '#D97706', '#451A03'],
        resultType: 'positive',
        obtainedColorName: 'Naranja a Marrón rojizo',
        explanation: 'Marquis reacciona de manera inmediata a naranja, virando en segundos a un marrón rojizo oscuro y denso.',
        adulterantInfo: 'Si el cambio es rojo brillante, puede ser aspirina. Si es rosa-púrpura, es MDMA. Si es naranja sucio y turbio, hay presencia de múltiples adulterantes.',
        reactionPhases: [
          { timeOffset: 0, color: '#F1F5F9', description: 'Gota ácida de Marquis entra en contacto' },
          { timeOffset: 0.5, color: '#FEF08A', description: 'Reacción amarilla vibrante inmediata' },
          { timeOffset: 1.2, color: '#D97706', description: 'Transición veloz a naranja tostado' },
          { timeOffset: 2.0, color: '#451A03', description: 'Marrón rojizo oscuro estable. Característico de anfetaminas.' }
        ]
      },
      mecke: {
        colorSpectrum: ['#F1F5F9', '#F8FAFC', '#E2E8F0', '#CBD5E1'],
        resultType: 'info',
        obtainedColorName: 'Sin Reacción (Incoloro)',
        explanation: 'El reactivo Mecke NO reacciona ante la anfetamina pura, manteniéndose claro o ligeramente grisáceo por disolución física.',
        adulterantInfo: 'Cualquier cambio de color significativo (azul, verde o rojo) indica la presencia de otros compuestos activos o adulterantes peligrosos.',
        reactionPhases: [
          { timeOffset: 0, color: '#F1F5F9', description: 'Gota de Mecke sobre el polvo blanco' },
          { timeOffset: 0.5, color: '#F8FAFC', description: 'La muestra se disuelve físicamente sin cambiar de color' },
          { timeOffset: 1.2, color: '#E2E8F0', description: 'Ausencia total de virado cromático' },
          { timeOffset: 2.0, color: '#CBD5E1', description: 'Estable e incoloro. Resultado de control esperado para anfetamina con Mecke.' }
        ]
      },
      froehde: {
        colorSpectrum: ['#F1F5F9', '#F8FAFC', '#E2E8F0', '#CBD5E1'],
        resultType: 'info',
        obtainedColorName: 'Sin Reacción (Incoloro)',
        explanation: 'Al igual que Mecke, Froehde no produce cambios cromáticos con la anfetamina, lo que permite diferenciarla claramente de otras fenetilaminas.',
        adulterantInfo: 'Si se observa un cambio a rojo-púrpura o marrón, la muestra contiene otras sustancias mezcladas o no se trata de anfetamina.',
        reactionPhases: [
          { timeOffset: 0, color: '#F1F5F9', description: 'Gotas de Froehde sobre la muestra' },
          { timeOffset: 0.5, color: '#F8FAFC', description: 'La muestra se disuelve lentamente' },
          { timeOffset: 1.2, color: '#E2E8F0', description: 'Sin trazas de color' },
          { timeOffset: 2.0, color: '#CBD5E1', description: 'Incoloro/transparente. Confirma la ausencia de otros compuestos reactivos.' }
        ]
      }
    }
  },
  {
    id: '2cb',
    name: '2C-B (Tusi Real)',
    chemicalName: '4-bromo-2,5-dimetoxifenetilamina',
    category: 'Psicodélico / Fenetilamina',
    description: 'Fenetilamina psicodélica sintética. El auténtico 2C-B produce un hermoso arcoiris con reactivos, lo que desenmascara fácilmente al "Tusi" de la calle (mezcla rosa de ketamina y estimulantes).',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    textColor: 'text-emerald-400',
    reactions: {
      marquis: {
        colorSpectrum: ['#F1F5F9', '#FEF08A', '#A3E635', '#15803D'],
        resultType: 'positive',
        obtainedColorName: 'Verde Amarillento Brillante',
        explanation: 'Marquis vira de un amarillo inicial suave hacia un verde lima brillante y llamativo.',
        adulterantInfo: 'Si la muestra vendida como "Tusi" cambia a negro, contiene MDMA. Si no reacciona, es ketamina pura con colorante rosa.',
        reactionPhases: [
          { timeOffset: 0, color: '#F1F5F9', description: 'Contacto inicial del reactivo con el polvo' },
          { timeOffset: 0.5, color: '#FEF08A', description: 'Disolución y aparición de tonos amarillo-limón' },
          { timeOffset: 1.2, color: '#A3E635', description: 'Evolución rápida a verde lima muy vivo' },
          { timeOffset: 2.0, color: '#15803D', description: 'Verde bosque amarillento brillante. Reacción típica de 2C-B.' }
        ]
      },
      mecke: {
        colorSpectrum: ['#F1F5F9', '#FCD34D', '#10B981', '#1D4ED8'],
        resultType: 'positive',
        obtainedColorName: 'Amarillo a Verde y luego Azul profundo',
        explanation: 'Mecke ofrece una de las transiciones más bellas para el 2C-B: inicia en amarillo, vira a verde y termina en un azul real profundo.',
        adulterantInfo: 'La falta de este cambio secuencial tan característico es prueba irrefutable de que no se trata de 2C-B auténtico.',
        reactionPhases: [
          { timeOffset: 0, color: '#F1F5F9', description: 'Gota de Mecke se mezcla con la muestra' },
          { timeOffset: 0.5, color: '#FCD34D', description: 'Tono amarillo mostaza inmediato' },
          { timeOffset: 1.2, color: '#10B981', description: 'Vira hacia un verde azulado brillante' },
          { timeOffset: 2.0, color: '#1D4ED8', description: 'Azul profundo brillante y estable. Espectáculo cromático clásico.' }
        ]
      },
      froehde: {
        colorSpectrum: ['#F1F5F9', '#FCD34D', '#A3E635', '#047857'],
        resultType: 'positive',
        obtainedColorName: 'Amarillo a Verde brillante',
        explanation: 'Froehde cambia de amarillo suave a un verde esmeralda brillante de manera muy limpia.',
        adulterantInfo: 'Este test es excelente como confirmador junto con Mecke para verificar la identidad inequívoca de la molécula 2C-B.',
        reactionPhases: [
          { timeOffset: 0, color: '#F1F5F9', description: 'Contacto inicial con el reactivo Froehde' },
          { timeOffset: 0.5, color: '#FCD34D', description: 'Coloración amarilla brillante en los bordes' },
          { timeOffset: 1.2, color: '#A3E635', description: 'Transición hacia verde claro primaveral' },
          { timeOffset: 2.0, color: '#047857', description: 'Verde esmeralda/bosque de alta definición. Confirma fenetilamina.' }
        ]
      }
    }
  },
  {
    id: 'aspirina',
    name: 'Aspirina (Control)',
    chemicalName: 'Ácido acetilsalicílico',
    category: 'Analgésico / Control Casero',
    description: 'Medicamento común no psicoactivo. Utilizado habitualmente en reducción de daños como muestra de control positivo para verificar la viabilidad de tus reactivos.',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    textColor: 'text-rose-400',
    reactions: {
      marquis: {
        colorSpectrum: ['#F1F5F9', '#FCA5A5', '#EF4444', '#7F1D1D'],
        resultType: 'info',
        obtainedColorName: 'Rojo Profundo / Cereza',
        explanation: 'La aspirina reacciona volviéndose roja de inmediato. Es ideal para confirmar que Marquis no se ha degradado.',
        adulterantInfo: 'Si colocas Marquis sobre aspirina y no cambia a rojo brillante en 10 segundos, tu reactivo está vencido o dañado.',
        reactionPhases: [
          { timeOffset: 0, color: '#F1F5F9', description: 'Gota de Marquis cae sobre la aspirina molida' },
          { timeOffset: 0.5, color: '#FCA5A5', description: 'Aparición instantánea de tonos rosados' },
          { timeOffset: 1.2, color: '#EF4444', description: 'Vira con fuerza a un rojo sangre' },
          { timeOffset: 2.0, color: '#7F1D1D', description: 'Rojo cereza profundo y vivo. Confirmación de reactivo sano.' }
        ]
      },
      mecke: {
        colorSpectrum: ['#F1F5F9', '#F8FAFC', '#E2E8F0', '#CBD5E1'],
        resultType: 'info',
        obtainedColorName: 'Sin Reacción (Incoloro)',
        explanation: 'Mecke no reacciona ante la aspirina pura, sirviendo como control negativo para este reactivo específico.',
        adulterantInfo: 'Si tu reactivo Mecke sobre aspirina cambia de color, es posible que el reactivo esté contaminado o la aspirina contenga otros compuestos.',
        reactionPhases: [
          { timeOffset: 0, color: '#F1F5F9', description: 'Contacto de Mecke con la aspirina' },
          { timeOffset: 0.5, color: '#F8FAFC', description: 'La muestra se disuelve con efervescencia suave física' },
          { timeOffset: 1.2, color: '#E2E8F0', description: 'Sin cambios de color detectables' },
          { timeOffset: 2.0, color: '#CBD5E1', description: 'Incoloro y claro. Patrón correcto para Mecke.' }
        ]
      },
      froehde: {
        colorSpectrum: ['#F1F5F9', '#FED7AA', '#F97316', '#C2410C'],
        resultType: 'info',
        obtainedColorName: 'Naranja apagado a Marrón suave',
        explanation: 'Froehde reacciona lentamente con la aspirina dando un color naranja o marrón muy claro tras varios segundos.',
        adulterantInfo: 'Utilízalo únicamente como referencia secundaria para comprobar la vitalidad ácida del reactivo Froehde.',
        reactionPhases: [
          { timeOffset: 0, color: '#F1F5F9', description: 'Gota de Froehde cae sobre la aspirina' },
          { timeOffset: 0.5, color: '#FED7AA', description: 'Tono crema amarillento lento' },
          { timeOffset: 1.2, color: '#F97316', description: 'Evolución a naranja claro' },
          { timeOffset: 2.0, color: '#C2410C', description: 'Marrón anaranjado suave. Reacción completada.' }
        ]
      }
    }
  },
  {
    id: 'desconocida',
    name: 'Sustancia Desconocida / Adulterada',
    chemicalName: 'Muestra anómala / Mezcla sospechosa',
    category: 'Alerta de Sustancia Extraña',
    description: 'Simula el comportamiento altamente sospechoso de una muestra adulterada con catinonas (sales de baño), anfetaminas de baja calidad o sustancias químicas de diseño no deseadas.',
    badgeColor: 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse',
    textColor: 'text-red-400',
    reactions: {
      marquis: {
        colorSpectrum: ['#F1F5F9', '#FED7AA', '#CA8A04', '#78350F'],
        resultType: 'danger',
        obtainedColorName: 'Marrón Sucio / Naranja turbio',
        explanation: 'Reacción retrasada y sucia que vira a marrón-grisáceo apagado. No coincide con los perfiles limpios de MDMA.',
        adulterantInfo: '¡ALERTA! El virado a marrón apagado o naranja turbio sugiere la mezcla con compuestos inertes, catinonas sintéticas, o niveles alarmantes de cafeína/disolventes.',
        reactionPhases: [
          { timeOffset: 0, color: '#F1F5F9', description: 'Gota de Marquis entra en contacto' },
          { timeOffset: 0.5, color: '#FED7AA', description: 'Retraso inicial con efervescencia gris-naranja' },
          { timeOffset: 1.2, color: '#CA8A04', description: 'Manchas de color heterogéneo (marrón y gris)' },
          { timeOffset: 2.0, color: '#78350F', description: 'Mezcla turbia de tonos marrones y amarillos oscuros. Peligro de adulteración.' }
        ]
      },
      mecke: {
        colorSpectrum: ['#F1F5F9', '#F9A8D4', '#DB2777', '#831843'],
        resultType: 'danger',
        obtainedColorName: 'Rosa fucsia brillante a Rojo opaco',
        explanation: 'En lugar del verde-negro esperado para MDMA, esta muestra reacciona violentamente a tonos fucsias o rojos oscuros.',
        adulterantInfo: '¡PRECAUCIÓN! Un cambio a fucsia o rojo con Mecke es altamente indicativo de adulterantes de la familia de las catinonas (ej: Metilona, Butilona o MDPV) o cafeína en exceso.',
        reactionPhases: [
          { timeOffset: 0, color: '#F1F5F9', description: 'Gota de Mecke se aplica a la muestra sospechosa' },
          { timeOffset: 0.5, color: '#F9A8D4', description: 'Reacción muy violenta de color fucsia chillón' },
          { timeOffset: 1.2, color: '#DB2777', description: 'Virado rápido a rojo carmín espeso' },
          { timeOffset: 2.0, color: '#831843', description: 'Marrón-rojo oscuro opaco. Descarte completo de sustancia pura.' }
        ]
      },
      froehde: {
        colorSpectrum: ['#F1F5F9', '#FEE2E2', '#EF4444', '#991B1B'],
        resultType: 'danger',
        obtainedColorName: 'Rojo brillante inmediato',
        explanation: 'La reacción a rojo instantáneo con Froehde revela adulteración grave. MDMA o 2C-B auténticos jamás producirían este resultado.',
        adulterantInfo: '¡PELIGRO! La reacción de color rojo brillante con Froehde suele delatar la presencia de PMA o PMMA, adulterantes letales de alta toxicidad que se venden falsamente como éxtasis.',
        reactionPhases: [
          { timeOffset: 0, color: '#F1F5F9', description: 'Contacto de Froehde con la muestra' },
          { timeOffset: 0.5, color: '#FEE2E2', description: 'Tono rosado intenso instantáneo' },
          { timeOffset: 1.2, color: '#EF4444', description: 'Coloración roja estridente que emite vapores suaves' },
          { timeOffset: 2.0, color: '#991B1B', description: 'Rojo sangre oscuro. Posible presencia de PMA/PMMA altamente peligroso.' }
        ]
      }
    }
  }
];

export const SAFETY_RULES: SafetyRule[] = [
  {
    id: 'sample_size',
    title: 'Muestra del tamaño de una cabeza de alfiler',
    icon: 'Info',
    description: 'Usa una cantidad minúscula. Una muestra grande saturará el reactivo, oscureciendo posibles adulterantes que se diluyen en menor cantidad.'
  },
  {
    id: 'one_drop',
    title: 'Una sola gota de reactivo',
    icon: 'Droplet',
    description: 'No inundes la muestra. Una sola gota es químicamente suficiente para provocar el cambio de color detectable.'
  },
  {
    id: 'acid_safety',
    title: 'El reactivo es ácido concentrado',
    icon: 'ShieldAlert',
    description: 'Los reactivos Marquis, Mecke y Froehde contienen ácidos extremadamente corrosivos. Usa protección ocular, guantes y trabaja en zonas ventiladas.'
  },
  {
    id: 'discard_reaction',
    title: 'Desecha adecuadamente después de usar',
    icon: 'Trash2',
    description: 'Lava la placa de cerámica con abundante agua corriente y bicarbonato de sodio para neutralizar el ácido. No toques el residuo.'
  }
];

export const EDUCATIONAL_TIPS = [
  {
    title: '¿Por qué usar múltiples reactivos?',
    content: 'Una de las mayores trampas es testear usando únicamente Marquis. Algunos adulterantes imitan el color de la sustancia deseada en Marquis, pero revelan su verdadera naturaleza al cruzarse con reactivos de segunda línea como Mecke o Froehde.'
  },
  {
    title: 'Limitaciones fundamentales',
    content: 'Ningún test colorimétrico casero mide pureza o concentración. Solo confirman presencia. Si tu muestra es un 10% de MDMA y un 90% de un adulterante inerte o cafeína, el reactivo Marquis igualmente se volverá negro por el MDMA, ocultando por completo la cafeína.'
  },
  {
    title: 'Conservación idónea',
    content: 'Almacena tus botes siempre en vertical, dentro de su envase protector y refrigerados (entre 2 y 8 °C). Protégelos de la luz solar directa y la humedad extrema. Deséchalos de forma segura si notas que el líquido original se ha oscurecido en reposo.'
  }
];
