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
import { lengthTool }                    from '@/tools/converters/length/meta';
import { weightTool }                    from '@/tools/converters/weight/meta';
import { temperatureTool }               from '@/tools/converters/temperature/meta';
import { temperatureAdvancedTool }       from '@/tools/converters/temperature-advanced/meta';
import { speedTool }                     from '@/tools/converters/speed/meta';
import { areaTool }                      from '@/tools/converters/area/meta';
import { durationConverterTool }         from '@/tools/converters/duration/meta';
import { powerConverterTool }            from '@/tools/converters/power/meta';
import { romanNumeralsTool }             from '@/tools/converters/roman-numerals/meta';
import { currencyTool }                  from '@/tools/converters/currency/meta';
import { pressureTool }                  from '@/tools/converters/pressure/meta';
import { angleTool }                     from '@/tools/converters/angle/meta';
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

// Tax
import { discountCalculatorTool } from '@/tools/math/discount-calculator/meta';
import { ivaCalculatorTool }      from '@/tools/tax/iva-calculator/meta';
import { vatCalculatorTool }      from '@/tools/tax/vat-calculator/meta';

// Health
import { bmiCalculatorTool }     from '@/tools/health/bmi-calculator/meta';
import { bmrCalculatorTool }     from '@/tools/health/bmr-calculator/meta';

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
  lengthTool,
  weightTool,
  temperatureTool,
  temperatureAdvancedTool,
  speedTool,
  areaTool,
  durationConverterTool,
  powerConverterTool,
  romanNumeralsTool,
  currencyTool,
  pressureTool,
  angleTool,
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
];

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
