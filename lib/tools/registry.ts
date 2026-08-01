import { ComponentType } from 'react';

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  keywords: string[];
  tags?: string[];
  component: () => Promise<{ default: ComponentType }>;
}

// Math
import { fuelCalculatorTool }       from '@/tools/math/fuel-calculator/meta';
import { ohmCalculatorTool }        from '@/tools/math/ohm-calculator/meta';
import { statisticsTool }           from '@/tools/math/statistics/meta';
import { compoundInterestTool }     from '@/tools/math/compound-interest/meta';
import { tipCalculatorTool }        from '@/tools/math/tip-calculator/meta';
import { finalPriceTool }           from '@/tools/math/final-price/meta';
import { scientificNotationTool }   from '@/tools/math/scientific-notation/meta';
import { percentageCalculatorTool } from '@/tools/math/percentage-calculator/meta';
import { percentageChangeTool }     from '@/tools/math/percentage-change/meta';
import { proportionCalculatorTool } from '@/tools/math/proportion-calculator/meta';
import { ageCalculatorTool }        from '@/tools/math/age-calculator/meta';
import { mortgageCalculatorTool }   from '@/tools/math/mortgage-calculator/meta';
import { dateDiffTool }             from '@/tools/math/date-diff/meta';

// Converters
import { lengthConverterTool }           from '@/tools/converters/length/meta';
import { weightConverterTool }           from '@/tools/converters/weight/meta';
import { temperatureConverterTool }      from '@/tools/converters/temperature/meta';
import { temperatureAdvancedTool }       from '@/tools/converters/temperature-advanced/meta';
import { speedConverterTool }            from '@/tools/converters/speed/meta';
import { areaConverterTool }             from '@/tools/converters/area/meta';
import { durationConverterTool }         from '@/tools/converters/duration/meta';
import { powerConverterTool }            from '@/tools/converters/power/meta';
import { romanNumeralsTool }             from '@/tools/converters/roman-numerals/meta';
import { currencyConverterTool }         from '@/tools/converters/currency/meta';
import { pressureConverterTool }         from '@/tools/converters/pressure/meta';
import { angleConverterTool }            from '@/tools/converters/angle/meta';
import { colorConverterTool }            from '@/tools/converters/color/meta';
import { morseCodeTool }                 from '@/tools/converters/morse/meta';

// Text
import { wordCounterTool }       from '@/tools/text/word-counter/meta';
import { caseConverterTool }     from '@/tools/text/case-converter/meta';
import { charCounterTool }       from '@/tools/text/char-counter/meta';
import { jsonFormatterTool }     from '@/tools/text/json-formatter/meta';

// Crypto
import { uuidGeneratorTool }     from '@/tools/crypto/uuid-generator/meta';
import { base64Tool }            from '@/tools/crypto/base64/meta';
import { passwordGeneratorTool } from '@/tools/crypto/password-generator/meta';

// Tax / Math
import { discountCalculatorTool } from '@/tools/math/discount-calculator/meta';
import { ivaCalculatorTool }      from '@/tools/tax/iva-calculator/meta';
import { vatCalculatorTool }      from '@/tools/tax/vat-calculator/meta';

// Health
import { bmiCalculatorTool }     from '@/tools/health/bmi-calculator/meta';
import { bmrCalculatorTool }     from '@/tools/health/bmr-calculator/meta';

// New Sprint 13
import { salaryCalculatorTool }      from '@/tools/math/salary-calculator/meta';
import { volumeConverterTool }       from '@/tools/converters/volume/meta';
import { loremIpsumTool }            from '@/tools/text/lorem-ipsum/meta';
import { hashGeneratorTool }         from '@/tools/crypto/hash-generator/meta';
import { dataStorageConverterTool }  from '@/tools/converters/data-storage/meta';
import { triangleCalculatorTool }    from '@/tools/math/triangle-calculator/meta';

// Sprint 14
import { qrGeneratorTool }           from '@/tools/converters/qr-generator/meta';
import { finiquitoCalculatorTool }   from '@/tools/math/finiquito-calculator/meta';
import { loanCalculatorTool }        from '@/tools/math/loan-calculator/meta';
import { calorieCalculatorTool }     from '@/tools/health/calorie-calculator/meta';
import { savingsCalculatorTool }     from '@/tools/math/savings-calculator/meta';
import { timeCalculatorTool }        from '@/tools/math/time-calculator/meta';

// Sprint 15
import { numberToWordsTool }         from '@/tools/text/number-to-words/meta';
import { reverseVatTool }            from '@/tools/tax/reverse-vat/meta';
import { roiCalculatorTool }         from '@/tools/math/roi-calculator/meta';
import { baseConverterTool }         from '@/tools/converters/base-converter/meta';
import { simpleInterestTool }        from '@/tools/math/simple-interest/meta';

// Sprint 36
import { caloriasEjercicioTool }     from '@/tools/health/calorias-ejercicio/meta';
import { diasHastaFechaTool }        from '@/tools/math/dias-hasta-fecha/meta';
import { ahorroJubilacionTool }      from '@/tools/math/ahorro-jubilacion/meta';
import { testVelocidadEscrituraTool } from '@/tools/health/test-velocidad-escritura/meta';

// Sprint 35
import { combustibleViajeTool }      from '@/tools/math/calculo-combustible-viaje/meta';
import { calculadoraIrpfTool }       from '@/tools/math/calculadora-irpf/meta';
import { calculadoraHidratacionTool } from '@/tools/health/calculadora-hidratacion/meta';
import { temperaturaCoccinaTool }    from '@/tools/converters/temperatura-cocina/meta';

// Sprint 34
import { calculadoraPropinaTool }    from '@/tools/math/calculadora-propina/meta';
import { calculadoraEmbarazoTool }   from '@/tools/health/calculadora-embarazo/meta';
import { descuentoTiendaTool }       from '@/tools/math/calculadora-descuento-tienda/meta';
import { velocidadVientoTool }       from '@/tools/converters/velocidad-viento/meta';

// Sprint 33
import { cuotaPrestamoPersonalTool } from '@/tools/math/cuota-prestamo-personal/meta';
import { cambioDivisasTool }         from '@/tools/math/cambio-divisas/meta';
import { seguroVidaTool }            from '@/tools/math/seguro-vida/meta';
import { analizadorTextoTool }       from '@/tools/text/analizador-texto/meta';

// Sprint 32
import { calculoMacrosTool }         from '@/tools/math/calculo-macros/meta';
import { numeroSuerteTool }          from '@/tools/math/numero-suerte/meta';
import { volumenFigurasTool }        from '@/tools/math/calculo-volumen-figuras/meta';
import { imcAvanzadoTool }           from '@/tools/health/calculadora-imc-avanzado/meta';

// Sprint 31
import { presupuestoPersonalTool }   from '@/tools/math/presupuesto-personal/meta';
import { cicloMenstrualTool }        from '@/tools/health/ciclo-menstrual/meta';
import { ibanValidatorTool }         from '@/tools/math/iban-validator/meta';
import { areaFigurasTool }           from '@/tools/math/area-figuras/meta';

// Sprint 30
import { proteinasDiariasTool }      from '@/tools/health/proteinas-diarias/meta';
import { letraDniTool }              from '@/tools/math/letra-dni/meta';
import { billetesMonedasTool }       from '@/tools/math/billetes-monedas/meta';
import { cuotaComunidadTool }        from '@/tools/math/cuota-comunidad/meta';

// Sprint 29
import { precioLuzTool }             from '@/tools/math/precio-luz/meta';
import { liquidacionSalarioTool }    from '@/tools/math/calculo-finiquito-completo/meta';
import { tallasNinosTool }           from '@/tools/converters/tallas-ninos/meta';
import { porcentajeNotaTool }        from '@/tools/math/porcentaje-nota/meta';

// Sprint 28
import { plazoFijoTool }             from '@/tools/math/plazo-fijo/meta';
import { notaMediaTool }             from '@/tools/math/nota-media/meta';
import { horasExtrasTool }           from '@/tools/math/horas-extras/meta';
import { gastoCalorico }             from '@/tools/health/gasto-calorico/meta';

// Sprint 27
import { calculadoraSuenoTool }      from '@/tools/health/calculadora-sueno/meta';
import { regla72Tool }               from '@/tools/math/regla-72/meta';
import { amortizacionHipotecaTool }  from '@/tools/math/amortizacion-hipoteca/meta';
import { energiaConverterTool }      from '@/tools/converters/energia/meta';

// Sprint 26
import { rentabilidadAlquilerTool }  from '@/tools/math/rentabilidad-alquiler/meta';
import { tensionArterialTool }       from '@/tools/health/tension-arterial/meta';
import { shoeSizeTool }              from '@/tools/converters/shoe-size/meta';
import { interesDemoraTool }         from '@/tools/math/interes-demora/meta';

// Sprint 25
import { calorieFoodsTool }          from '@/tools/health/calorie-foods/meta';
import { hourlyRateTool }            from '@/tools/math/hourly-rate/meta';
import { descuentoAcumuladoTool }    from '@/tools/math/descuento-acumulado/meta';
import { imcCinturaTool }            from '@/tools/health/imc-cintura/meta';

// Sprint 24
import { alcoholCalculatorTool }     from '@/tools/health/alcohol-calculator/meta';
import { energiaSolarTool }          from '@/tools/math/energia-solar/meta';

// Sprint 23
import { gratuityCalculatorTool }    from '@/tools/math/indemnizacion-despido/meta';
import { precioM2Tool }              from '@/tools/math/precio-m2/meta';
import { numerologyTool }            from '@/tools/converters/numerology/meta';

// Sprint 22
import { cementCalculatorTool }      from '@/tools/math/cement-calculator/meta';
import { fuelCostTool }              from '@/tools/math/fuel-cost/meta';
import { idealWeightTool }           from '@/tools/health/ideal-weight/meta';
import { taxRefundTool }             from '@/tools/math/tax-refund/meta';

// Sprint 21
import { paintCalculatorTool }       from '@/tools/math/paint-calculator/meta';
import { plusvaliaMunicipalTool }    from '@/tools/math/plusvalia-municipal/meta';
import { pagoFraccionadoTool }       from '@/tools/math/pago-fraccionado/meta';
import { cookingMeasuresTool }       from '@/tools/converters/cooking-measures/meta';
import { ovulationCalculatorTool }   from '@/tools/health/ovulation-calculator/meta';

// Sprint 20
import { waterIntakeTool }           from '@/tools/health/water-intake/meta';
import { unitPriceTool }             from '@/tools/math/unit-price/meta';
import { speedDistanceTimeTool }     from '@/tools/math/speed-distance-time/meta';
import { mortgageOverpaymentTool }   from '@/tools/math/mortgage-overpayment/meta';

// Sprint 19
import { electricityBillTool }       from '@/tools/math/electricity-bill/meta';
import { tipSplitterTool }           from '@/tools/math/tip-splitter/meta';
import { calorieDeficitTool }        from '@/tools/health/calorie-deficit/meta';
import { bodyFatTool }               from '@/tools/health/body-fat/meta';
import { timezoneTool }              from '@/tools/converters/timezone/meta';

// Sprint 18
import { netSalaryTool }             from '@/tools/math/net-salary/meta';
import { pregnancyWeeksTool }        from '@/tools/math/pregnancy-weeks/meta';
import { invoiceCalculatorTool }     from '@/tools/math/invoice-calculator/meta';
import { countdownTimerTool }        from '@/tools/math/countdown-timer/meta';
import { bmiChildrenTool }           from '@/tools/health/bmi-children/meta';

// Sprint 17
import { eurosPesetasTool }          from '@/tools/converters/euros-pesetas/meta';
import { hoursWorkedTool }           from '@/tools/math/hours-worked/meta';
import { randomNumberTool }          from '@/tools/math/random-number/meta';
import { pensionCalculatorTool }     from '@/tools/math/pension-calculator/meta';
import { clothingSizeTool }          from '@/tools/converters/clothing-size/meta';
import { rentalCalculatorTool }      from '@/tools/math/rental-calculator/meta';

// Sprint 16
import { commissionCalculatorTool }  from '@/tools/math/commission-calculator/meta';
import { autonomosCalculatorTool }   from '@/tools/math/autonomos-calculator/meta';
import { businessDaysTool }          from '@/tools/math/business-days/meta';
import { inflationCalculatorTool }   from '@/tools/math/inflation-calculator/meta';
import { multiplicationTableTool }   from '@/tools/math/multiplication-table/meta';
import { weightedAverageTool }       from '@/tools/math/weighted-average/meta';

export const toolRegistry: ToolDefinition[] = [
  // Math (13)
  percentageCalculatorTool,
  percentageChangeTool,
  proportionCalculatorTool,
  ageCalculatorTool,
  mortgageCalculatorTool,
  dateDiffTool,
  fuelCalculatorTool,
  ohmCalculatorTool,
  statisticsTool,
  compoundInterestTool,
  tipCalculatorTool,
  finalPriceTool,
  scientificNotationTool,

  // Converters (14)
  lengthConverterTool,
  weightConverterTool,
  temperatureConverterTool,
  temperatureAdvancedTool,
  speedConverterTool,
  areaConverterTool,
  durationConverterTool,
  powerConverterTool,
  romanNumeralsTool,
  currencyConverterTool,
  pressureConverterTool,
  angleConverterTool,
  colorConverterTool,
  morseCodeTool,

  // Text (4)
  wordCounterTool,
  caseConverterTool,
  charCounterTool,
  jsonFormatterTool,

  // Crypto (3)
  uuidGeneratorTool,
  base64Tool,
  passwordGeneratorTool,

  // Tax (3)
  discountCalculatorTool,
  ivaCalculatorTool,
  vatCalculatorTool,

  // Health (2)
  bmiCalculatorTool,
  bmrCalculatorTool,

  // Sprint 13 (6)
  salaryCalculatorTool,
  volumeConverterTool,
  loremIpsumTool,
  hashGeneratorTool,
  dataStorageConverterTool,
  triangleCalculatorTool,

  // Sprint 14 (6)
  qrGeneratorTool,
  finiquitoCalculatorTool,
  loanCalculatorTool,
  calorieCalculatorTool,
  savingsCalculatorTool,
  timeCalculatorTool,

  // Sprint 15 (5)
  numberToWordsTool,
  reverseVatTool,
  roiCalculatorTool,
  baseConverterTool,
  simpleInterestTool,

  // Sprint 16 (6)
  commissionCalculatorTool,
  autonomosCalculatorTool,
  businessDaysTool,
  inflationCalculatorTool,
  multiplicationTableTool,
  weightedAverageTool,

  // Sprint 17 (6)
  eurosPesetasTool,
  hoursWorkedTool,
  randomNumberTool,
  pensionCalculatorTool,
  clothingSizeTool,
  rentalCalculatorTool,

  // Sprint 18 (5)
  netSalaryTool,
  pregnancyWeeksTool,
  invoiceCalculatorTool,
  countdownTimerTool,
  bmiChildrenTool,

  // Sprint 19 (5)
  electricityBillTool,
  tipSplitterTool,
  calorieDeficitTool,
  bodyFatTool,
  timezoneTool,

  // Sprint 20 (4)
  waterIntakeTool,
  unitPriceTool,
  speedDistanceTimeTool,
  mortgageOverpaymentTool,

  // Sprint 21 (5)
  paintCalculatorTool,
  plusvaliaMunicipalTool,
  pagoFraccionadoTool,
  cookingMeasuresTool,
  ovulationCalculatorTool,

  // Sprint 22 (4)
  cementCalculatorTool,
  fuelCostTool,
  idealWeightTool,
  taxRefundTool,

  // Sprint 23 (3)
  gratuityCalculatorTool,
  precioM2Tool,
  numerologyTool,

  // Sprint 24 (2)
  alcoholCalculatorTool,
  energiaSolarTool,

  // Sprint 25 (4)
  calorieFoodsTool,
  hourlyRateTool,
  descuentoAcumuladoTool,
  imcCinturaTool,

  // Sprint 26 (4)
  rentabilidadAlquilerTool,
  tensionArterialTool,
  shoeSizeTool,
  interesDemoraTool,

  // Sprint 27 (4)
  calculadoraSuenoTool,
  regla72Tool,
  amortizacionHipotecaTool,
  energiaConverterTool,

  // Sprint 28 (4)
  plazoFijoTool,
  notaMediaTool,
  horasExtrasTool,
  gastoCalorico,

  // Sprint 29 (4)
  precioLuzTool,
  liquidacionSalarioTool,
  tallasNinosTool,
  porcentajeNotaTool,

  // Sprint 30 (4)
  proteinasDiariasTool,
  letraDniTool,
  billetesMonedasTool,
  cuotaComunidadTool,

  // Sprint 31 (4)
  presupuestoPersonalTool,
  cicloMenstrualTool,
  ibanValidatorTool,
  areaFigurasTool,

  // Sprint 32 (4)
  calculoMacrosTool,
  numeroSuerteTool,
  volumenFigurasTool,
  imcAvanzadoTool,

  // Sprint 33 (4)
  cuotaPrestamoPersonalTool,
  cambioDivisasTool,
  seguroVidaTool,
  analizadorTextoTool,

  // Sprint 34 (4)
  calculadoraPropinaTool,
  calculadoraEmbarazoTool,
  descuentoTiendaTool,
  velocidadVientoTool,

  // Sprint 35 (4)
  combustibleViajeTool,
  calculadoraIrpfTool,
  calculadoraHidratacionTool,
  temperaturaCoccinaTool,

  // Sprint 36 (4)
  caloriasEjercicioTool,
  diasHastaFechaTool,
  ahorroJubilacionTool,
  testVelocidadEscrituraTool,
];

// Aliases for backward compatibility with older page files
export const tools = toolRegistry;

export function getAllCategories(): string[] {
  return [...new Set(toolRegistry.map(t => t.category))];
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return toolRegistry.find(t => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolDefinition[] {
  return toolRegistry.filter(t => t.category === category);
}

export function searchTools(query: string): ToolDefinition[] {
  const q = query.toLowerCase();
  return toolRegistry.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.keywords.some(k => k.includes(q)) ||
    (t.tags || []).some(tag => tag.includes(q))
  );
}
