import { test, expect } from '@playwright/test';

test('home page carga correctamente', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Toolva/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('buscador muestra resultados', async ({ page }) => {
  await page.goto('/');
  const search = page.getByPlaceholder('Buscar herramienta...');
  await search.fill('calcula');
  await expect(page.getByRole('listbox')).toBeVisible();
  await expect(page.getByRole('option').first()).toBeVisible();
});

test('herramienta porcentaje renderiza', async ({ page }) => {
  await page.goto('/herramientas/calculadora-porcentaje');
  await expect(page).toHaveTitle(/Toolva/);
  await expect(page.locator('main')).toBeVisible();
});

test('herramienta convertidor temperatura renderiza', async ({ page }) => {
  await page.goto('/herramientas/convertidor-temperatura');
  await expect(page.locator('main')).toBeVisible();
});

test('404 muestra página personalizada', async ({ page }) => {
  await page.goto('/herramientas/herramienta-que-no-existe');
  await expect(page.locator('h1, h2')).toBeVisible();
});
