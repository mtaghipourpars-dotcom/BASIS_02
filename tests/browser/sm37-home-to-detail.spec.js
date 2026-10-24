import { test, expect } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const prototypeUrl = "file://" + path.resolve(here, "../../prototypes/sm37-home-to-detail.html");

test.describe("SM37 Home-to-detail prototype", () => {
  test("Home opens Jobs & Processes and displays source-backed sample rows", async ({ page }) => {
    await page.goto(prototypeUrl);
    await expect(page.locator("#homePage")).toBeVisible();
    await page.locator("#openJobs").click();
    await expect(page.locator("#jobsPage")).toBeVisible();
    await expect(page.locator("#jobsBody tr")).toHaveCount(5);
    await expect(page.locator("body")).toContainText("8,062");
    await expect(page.locator("body")).toContainText("not a unique-run count");
  });

  test("status filter and search narrow the same table", async ({ page }) => {
    await page.goto(prototypeUrl);
    await page.locator("#openJobs").click();
    await page.locator("#statusFilter").selectOption("Canceled");
    await expect(page.locator("#jobsBody tr")).toHaveCount(1);
    await expect(page.locator("#jobsBody")).toContainText("QM_REPET_INSP");
    await page.locator("#searchInput").fill("does-not-exist");
    await expect(page.locator("#jobsBody tr")).toHaveCount(0);
    await expect(page.locator("#emptyState")).toBeVisible();
    await page.locator("#clearFilters").click();
    await expect(page.locator("#jobsBody tr")).toHaveCount(5);
  });

  test("selecting a row opens provenance details and does not expose execution actions", async ({ page }) => {
    await page.goto(prototypeUrl);
    await page.locator("#openJobs").click();
    await page.locator("#jobsBody tr").filter({ hasText: "QM_REPET_INSP" }).click();
    await expect(page.locator("#detailDrawer")).toHaveClass(/open/);
    await expect(page.locator("#detailJobName")).toHaveText("QM_REPET_INSP");
    await expect(page.locator("#detailSource")).toContainText("SM37.md excerpt");
    await expect(page.locator("#detailGrid")).toContainText("REF-SM37-L2583");
    await expect(page.getByRole("button", { name: /re-run|cancel job|release job/i })).toHaveCount(0);
  });

  test("locale switch updates direction and retains the selected record", async ({ page }) => {
    await page.goto(prototypeUrl);
    await page.locator("#openJobs").click();
    await page.locator("#jobsBody tr").first().click();
    await page.locator("#localeBtn").click();
    await expect(page.locator("html")).toHaveAttribute("lang", "fa");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("#detailDrawer")).toHaveClass(/open/);
    await expect(page.locator("#detailJobName")).toHaveText("/BUILD/REORG");
    await page.locator("#localeBtn").click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  });

  test("mobile viewport keeps the primary navigation and table route reachable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(prototypeUrl);
    await page.locator("#openJobs").click();
    await expect(page.locator("#jobsPage")).toBeVisible();
    await expect(page.locator("#jobsBody tr")).toHaveCount(5);
  });
});
