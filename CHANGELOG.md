# CHANGELOG — Toolva & Digital Portfolio
*Registro completo de mejoras. Entradas más recientes primero.*

---

## [Agosto 2026] — Fase Monetización

### AdSense & Monetización
- Integrado Google AdSense ca-pub-7353067433806430 en layout.tsx (todas las páginas)
- Actualizado ads.txt con ID real de AdSense
- CMP de Google configurada para GDPR (3 botones)
- Eliminado "sin anuncios" del home — evita contradicción con AdSense

### SEO
- Corregido robots.txt apuntando a create-toolva.vercel.app
- Sitemap enviado a Google Search Console

### Herramientas Sprint 42 (167 total)
- Calculadora Letra DNI/NIF (mod23 + NIE)
- Validador IBAN (mod97, desglose español)
- Calculadora Autonomía Coche Eléctrico (6 presets)
- Test Nivel Inglés A1-C2 (20 preguntas MCER)

### Herramientas Sprint 41 (163 total)
- Calculadora Regla de Tres (simple + compuesta)
- Conversor Bases Numéricas (decimal/binario/hex/octal)
- Calculadora Intereses Tarjeta de Crédito
- Detector Número Primo

### Documentación Portfolio
- MASTER_ROADMAP.md — prioridades por retorno
- DIGITAL_PORTFOLIO.md — estado de activos
- OPPORTUNITIES.md — análisis 4 oportunidades próximo activo
- CHANGELOG.md — este archivo

---

# Changelog — Toolva (histórico)

## Sprint 11 — Fase 2 FINAL: Performance + OG Images + Breadcrumbs
**Fecha:** 30/07/2026

### Añadido
- OG Images dinámicas: Next.js Edge runtime, imagen global + por herramienta (1200x630)
- Breadcrumbs JSON-LD: BreadcrumbList schema en todas las páginas de herramientas
- Breadcrumb nav con microdata Schema.org (itemScope/itemProp)
- Pagina /herramientas: Catalogo completo con filtro por categoria
- next.config.mjs: Headers HTTP de seguridad, cache agresivo para assets estaticos
- getToolBySlug / getToolsByCategory helpers en registry.ts

## Sprint 10 — Fase 2: Dark Mode + Busqueda Fuzzy + Tests E2E
**Fecha:** 30/07/2026
- Dark mode toggle, fuzzy search nativa, pagina /buscar, 5 tests Playwright

## Sprint 9 — Fase 2: PWA + SEO Avanzado + Accesibilidad
**Fecha:** 30/07/2026
- manifest.json, service worker, JSON-LD, skip links, 404, sitemap

## Sprint 8 — Fase 1 COMPLETADA: 40 herramientas
**Fecha:** 30/07/2026
Total: 40 herramientas OK

## Sprints 1-7
- 40 herramientas construidas iterativamente desde MVP
