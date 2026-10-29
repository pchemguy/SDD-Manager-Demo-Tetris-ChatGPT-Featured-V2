/** Environment-only evidence: no gameplay compatibility claim. */
import { test, expect } from '@playwright/test';
test('@environment repeated isolated input rendering and teardown', async ({ browser }, info) => {
  console.log('Effective managed browser:', info.project.name, browser.version());
  for (let i = 0; i < 2; i++) {
    const context = await browser.newContext();
    try {
      const page = await context.newPage();
      await page.goto('/');
      await page.setContent('<label>Name<input></label><button onclick="this.textContent=\'Ready\'">Run</button><div style="width:40px;height:40px;background:rgb(255,0,0)"></div>');
      await page.getByRole('textbox').fill('isolated');
      await page.getByRole('button').click();
      await expect(page.getByRole('button')).toHaveText('Ready');
      await expect(page.getByRole('textbox')).toHaveValue('isolated');
      await page.screenshot({ path: info.outputPath(`environment-${i}.png`) });
    } finally { await context.close(); }
  }
});
