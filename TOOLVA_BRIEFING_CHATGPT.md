# Toolva — Briefing completo del proyecto (actualizado agosto 2026)

## Qué es Toolva

Plataforma web de herramientas gratuitas en español. El modelo de negocio es **SEO + Google AdSense**: generar tráfico orgánico masivo con 167 herramientas útiles y monetizar con publicidad contextual.

- **URL:** https://create-toolva.vercel.app
- **GitHub:** https://github.com/ericverdet-create/Create-Toolva
- **Herramientas activas:** 167
- **Estado actual:** Live, indexado en Google Search Console, sin ingresos todavía (AdSense pendiente de solicitar)

---

## Stack técnico

- **Framework:** Next.js 14 App Router + TypeScript + Tailwind CSS
- **Deploy:** Vercel (auto-deploy al hacer push a `main`)
- **Repo:** GitHub (push manual desde script .js ejecutado con .bat desde File Explorer)
- **Sin backend:** no database, no auth, no Redis, no Docker, no microservicios
- **Sin pagos:** solo monetización gratuita (AdSense + afiliados potenciales)

---

## Estructura del proyecto

```
toolva/
├── app/
│   ├── layout.tsx          — Layout global, slot AdSense integrado (condicionado a env var)
│   ├── sitemap.ts          — Sitemap dinámico (/sitemap.xml) con las 167 URLs
│   ├── robots.ts           — Apunta a create-toolva.vercel.app
│   └── herramientas/[slug]/page.tsx  — Página dinámica por herramienta
├── lib/tools/registry.ts   — Array central con los 167 tools registrados
├── tools/                  — Carpetas por categoría, cada tool = meta.ts + component.tsx
│   ├── math/               — 94 herramientas
│   ├── health/             — 27 herramientas
│   ├── converters/         — 29 herramientas
│   ├── text/               — 10 herramientas
│   └── tax/                — 5 herramientas (IVA, deducciones…)
└── public/
    └── ads.txt             — Preparado para AdSense (ca-pub placeholder)
```

### Patrón de cada herramienta

```typescript
// meta.ts — define la herramienta
export const miTool: ToolDefinition = {
  id: 'mi-herramienta',
  slug: 'mi-herramienta',
  name: 'Nombre para humanos',
  description: 'Descripción SEO...',
  icon: '🔢',
  category: 'math',
  keywords: ['keyword1', 'keyword2'],
  tags: ['tag1'],
  component: () => import('./component').then(m => ({ default: m.default })),
};

// component.tsx — UI React 'use client'
export default function MiHerramienta() { ... }
```

---

## Las 167 herramientas (por categoría)

### Math (94)
age-calculator, ahorro-jubilacion, amortizacion-hipoteca, area-figuras, autonomos-calculator, billetes-monedas, business-days, calculadora-autonomia-electrico, calculadora-descuento-segunda-mano, calculadora-descuento-tienda, calculadora-finanzas-personales, calculadora-intereses-tarjeta, calculadora-irpf, calculadora-letra-dni, calculadora-pensiones-jubilacion, calculadora-propina, calculadora-regla-de-tres, calculadora-tae, calculo-combustible-viaje, calculo-finiquito-completo, calculo-macros, calculo-volumen-figuras, cambio-divisas, cement-calculator, commission-calculator, compound-interest, consumo-electrico-aparatos, conversor-bases-numericas, coste-reforma-hogar, countdown-timer, cuota-comunidad, cuota-prestamo-personal, date-diff, days-between-dates, descuento-acumulado, detector-numero-primo, dias-hasta-fecha, discount-calculator, electricity-bill, energia-solar, escalar-receta, final-price, finiquito-calculator, fracciones-decimales, fuel-calculator, fuel-cost, generador-numeros-aleatorios-lista, horas-extras, hourly-rate, hours-worked, iban-validator, indemnizacion-despido, inflation-calculator, interes-demora, invoice-calculator, letra-dni, loan-calculator, mortgage-calculator, mortgage-overpayment, multiplication-table, net-salary, nota-media, numero-suerte, ohm-calculator, pago-fraccionado, paint-calculator, pension-calculator, percentage-calculator, percentage-change, plazo-fijo, plusvalia-municipal, porcentaje-nota, precio-luz, precio-m2, pregnancy-weeks, presupuesto-personal, proportion-calculator, random-number, regla-72, rentabilidad-alquiler, rental-calculator, roi-calculator, roman-numerals-converter, salary-calculator, savings-calculator, scientific-notation, seguro-vida, simple-interest, simulador-dados, speed-distance-time, statistics, tax-refund, time-calculator, tip-calculator, tip-calculator-groups, tip-splitter, triangle-calculator, unit-price, validador-iban, weighted-average

### Health (27)
alcohol-calculator, bmi-calculator, bmi-children, bmr-calculator, body-fat, calculadora-embarazo, calculadora-hidratacion, calculadora-imc-avanzado, calculadora-riesgo-cardiovascular, calculadora-sueno, calculadora-sueno-deuda, calorias-bebidas, calorias-ejercicio, calorie-calculator, calorie-deficit, calorie-foods, ciclo-menstrual, gasto-calorico, ideal-weight, imc-cintura, ovulation-calculator, proteinas-diarias, tension-arterial, test-memoria, test-velocidad-escritura, water-intake

### Converters (29)
angle, area, base-converter, clothing-size, color, cooking-measures, currency, data-storage, duration, energia, euros-pesetas, length, morse, numerology, power, pressure, qr-generator, roman-numerals, shoe-size, speed, tabla-unitaria, tallas-ninos, temperatura-cocina, temperature, temperature-advanced, timezone, velocidad-viento, volume, weight

### Text (10)
analizador-texto, case-converter, char-counter, generador-contrasena-segura, json-formatter, lorem-ipsum, number-to-words, test-nivel-ingles, test-velocidad-escritura, word-counter

### Tax (5)
iva-calculator, reverse-vat, vat-calculator + 2 más

---

## Historial de sprints

| Sprint | Herramientas | Total |
|--------|-------------|-------|
| 1–38   | Base        | 159   |
| 39     | +4          | 156   |
| 40     | +4          | 160   |
| 41     | regla de tres, bases numéricas, intereses tarjeta, primo detector | 163 |
| 42     | letra DNI/NIF, validador IBAN, autonomía eléctrico, test inglés A1-C2 | 167 |

---

## Estado de monetización

### Google AdSense — PENDIENTE DE SOLICITAR
- El código ya está integrado en `app/layout.tsx` (condicionado a variable de entorno)
- `public/ads.txt` listo con placeholder `ca-pub-XXXXXXXXXXXXXXXX`
- **Acción requerida:**
  1. Ir a https://adsense.google.com
  2. Solicitar con URL: `https://create-toolva.vercel.app`
  3. Obtener ca-pub-XXXXXXXXXXXXXXXXX
  4. En Vercel → Settings → Environment Variables: añadir `NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXX`
  5. Actualizar `public/ads.txt` con el ID real
  6. Pegar el snippet de verificación de AdSense si lo piden en `app/layout.tsx`

### Google Search Console — ACTIVO
- Propiedad verificada: `https://create-toolva.vercel.app`
- Sitemap enviado: `https://create-toolva.vercel.app/sitemap.xml`
- Estado sitemap: en proceso de re-crawl (robots.txt fue corregido para apuntar al dominio correcto)
- 167 URLs indexables, cada una con metadata SEO única

### Estrategia SEO
- URL limpia por herramienta: `/herramientas/[slug]`
- Keywords long-tail en español para cada tool
- Sitemap dinámico generado automáticamente con cada nuevo deploy
- Objetivo: captar tráfico de búsquedas como "calculadora IRPF", "validador IBAN online", etc.

---

## Flujo de trabajo (cómo se añaden herramientas)

1. Crear `tools/[category]/[slug]/meta.ts` + `component.tsx`
2. Importar y registrar en `lib/tools/registry.ts`
3. Crear `pushXX.js` (token embebido, se autodelete) + `runXX.bat`
4. Doble click en `runXX.bat` desde File Explorer → push a GitHub → Vercel despliega automáticamente

**Importante:** el token de GitHub (PAT) nunca se commitea — solo existe en el script que se autodelete tras el push.

---

## Próximos pasos prioritarios

1. **INMEDIATO:** Solicitar Google AdSense en adsense.google.com
2. **Sprint 43+:** Seguir añadiendo 4 herramientas por sprint (objetivo: 200+ tools)
3. **SEO:** Revisar Search Console cuando empiece a haber impresiones → optimizar herramientas con mayor potencial
4. **Monetización secundaria:** Links de afiliado en herramientas relevantes (hipoteca → bancos, seguros → comparadores)

---

## Constraints del proyecto (no cambiar)

- Sin auth, sin usuarios, sin admin panel
- Sin Stripe ni pagos
- Sin database, Redis, Docker, microservicios
- Sin IA integrada en las herramientas (todo es lógica JS pura)
- Monetización únicamente: AdSense + afiliados orgánicos

---

*Generado: agosto 2026 | 167 herramientas | 40 commits | Vercel + GitHub*
