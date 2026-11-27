import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const BASE = '/Tour/';

test('loads under the base path without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
  page.on('pageerror', (err) => errors.push(err.message));

  const response = await page.goto(BASE);
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Thousand Sunny/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Explore and\s*Travel/);
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
});

for (const width of [375, 768, 1440]) {
  test(`has no horizontal scroll at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(BASE);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test('has no serious or critical axe violations', async ({ page }) => {
  await page.goto(BASE);
  const { violations } = await new AxeBuilder({ page }).analyze();
  const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  expect(blocking.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
});

test('holiday finder lists matching trips', async ({ page }) => {
  await page.goto(BASE);
  await page.getByLabel('Location').selectOption('Asia');
  await page.getByLabel('Activity').selectOption('Hiking');
  await page.getByRole('button', { name: 'Explore' }).click();
  await expect(page.getByRole('status')).toHaveText('1 trip matches your search.');
  await expect(page.getByText('Red Clouds temple trek')).toBeVisible();
  expect(page.url()).not.toContain('?');
});

test('testimonial arrows switch quotes', async ({ page }) => {
  await page.goto(BASE);
  const quotes = page.locator('[data-slide]:visible');
  await expect(quotes).toContainText('Edward Newgate');
  await page.getByRole('button', { name: 'Next testimonial' }).click();
  await expect(quotes).toContainText('Nami Kovač');
  await page.getByRole('button', { name: 'Previous testimonial' }).click();
  await page.getByRole('button', { name: 'Previous testimonial' }).click();
  await expect(quotes).toContainText('Nico Robin');
});

test('mobile menu opens and closes from the keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto(BASE);
  const toggle = page.getByRole('button', { name: 'Menu' });
  await expect(page.getByRole('link', { name: 'Destinations' })).toBeHidden();
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('link', { name: 'Destinations' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('account buttons open an explanatory popover', async ({ page }) => {
  await page.goto(BASE);
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByText('Accounts open with the app')).toBeVisible();
  await page.getByRole('button', { name: 'Got it' }).first().click();
  await expect(page.getByText('Accounts open with the app')).toBeHidden();
});
