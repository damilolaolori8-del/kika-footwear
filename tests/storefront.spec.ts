import { test, expect } from "@playwright/test";

test("campus and corporate collections include affordable flats and unisex smart shoes", async ({
  page,
}) => {
  await page.goto("/shop?collection=campus");
  await expect(
    page.getByRole("heading", { name: "Campus rotation", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".product-card")).toHaveCount(8);
  await expect(
    page
      .locator(".product-card")
      .filter({ hasText: "Everyday Mary Jane Flats" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "The 9–5 edit", exact: true }).click();
  await expect(
    page.locator(".product-card").filter({ hasText: "Everyday Derby Shoes" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Everything", exact: true }).click();
  await page.getByLabel("Search shoes").fill("timberland");
  await expect(page.locator(".product-card")).toHaveCount(2);
  await expect(page.locator(".product-meta").first()).toContainText("₦350,000");
  await page.getByLabel("Search shoes").fill("");
  await page.getByLabel("Maximum price").fill("35000");
  await expect(page.locator(".product-card")).toHaveCount(4);
});

test("cart validates size, persists quantities, and checkout uses naira totals", async ({
  page,
}) => {
  await page.goto("/product/penny-loafers");
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(
    "Please choose your size first",
  );
  await page.getByRole("button", { name: "42", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("link", { name: "View bag" }).click();
  await expect(page.locator(".total")).toContainText("₦58,500");
  await page.getByRole("button", { name: "Increase quantity" }).click();
  await page.reload();
  await expect(page.locator(".quantity")).toContainText("2");
  await expect(page.locator(".total")).toContainText("₦113,500");
  await page.getByRole("link", { name: "Continue to checkout" }).click();
  await page.getByLabel("Full name").fill("Assignment Shopper");
  await page.getByLabel("Email address").fill("shopper@example.com");
  await page.getByLabel("Street address").fill("1 Demo Street");
  await page.getByLabel("City", { exact: true }).fill("Lagos");
  await page.getByLabel("Postal code").fill("100001");
  await page.getByRole("button", { name: "Place demo order" }).click();
  await expect(
    page.getByRole("heading", { name: "Your demo order is confirmed." }),
  ).toBeVisible();
  await page.goto("/cart");
  await expect(
    page.getByRole("heading", { name: "Your next step is waiting." }),
  ).toBeVisible();
});

test("wishlist saves a pair across navigation and refresh", async ({
  page,
}) => {
  await page.goto("/shop");
  await page
    .getByRole("button", { name: "Toggle Speedcat OG Red / White in wishlist" })
    .click();
  await page.goto("/wishlist");
  await page.reload();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await expect(page.locator(".product-card")).toContainText("Speedcat OG");
  await page
    .getByRole("button", { name: "Toggle Speedcat OG Red / White in wishlist" })
    .click();
  await expect(
    page.getByRole("heading", { name: "A little room for favourites." }),
  ).toBeVisible();
});

test("demo registration validates confirmation, stores hashes, and rejects incorrect login", async ({
  page,
}) => {
  await page.goto("/signup");
  await page.getByLabel("Your name").fill("Kika Student");
  await page.getByLabel("Email address").fill("student@example.com");
  await page.getByLabel("Password", { exact: true }).fill("KikaDemo42!");
  await page.getByLabel("Confirm password").fill("Different42!");
  await page
    .getByRole("button", { name: "Create account", exact: true })
    .click();
  await expect(page.locator(".form-error[role=alert]")).toContainText(
    "passwords don’t match",
  );
  await page.getByLabel("Confirm password").fill("KikaDemo42!");
  await page
    .getByRole("button", { name: "Create account", exact: true })
    .click();
  await expect(page.getByRole("heading", { name: "You’re in." })).toBeVisible();
  const saved = await page.evaluate(() =>
    localStorage.getItem("kika-demo-accounts-v1"),
  );
  expect(saved).not.toContain("KikaDemo42!");
  expect(JSON.parse(saved!)[0].passwordHash).toMatch(/^[a-f0-9]{64}$/);
  await page.getByRole("link", { name: "Go to your account" }).click();
  await expect(page.getByRole("heading", { name: "Hey, Kika." })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "Hey, Kika." })).toBeVisible();
  await page.getByRole("button", { name: "Sign out", exact: true }).click();
  await page.getByRole("link", { name: "Sign in", exact: true }).click();
  await page.getByLabel("Email address").fill("student@example.com");
  await page.getByLabel("Password", { exact: true }).fill("Incorrect42!");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.locator(".form-error[role=alert]")).toContainText(
    "Email or password is incorrect",
  );
  await page.getByLabel("Password", { exact: true }).fill("KikaDemo42!");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Welcome back.", exact: true }),
  ).toBeVisible();
  await page.goto("/signup");
  await page.getByLabel("Your name").fill("Duplicate");
  await page.getByLabel("Email address").fill("STUDENT@example.com");
  await page.getByLabel("Password", { exact: true }).fill("KikaDemo42!");
  await page.getByLabel("Confirm password").fill("KikaDemo42!");
  await page
    .getByRole("button", { name: "Create account", exact: true })
    .click();
  await expect(page.locator(".form-error[role=alert]")).toContainText(
    "already exists",
  );
});

test("contact page exposes the supplied phone and four correct social profiles", async ({
  page,
}) => {
  await page.goto("/contact");
  await expect(page.locator(".contact-cards a")).toHaveAttribute(
    "href",
    "tel:+2349066400635",
  );
  const links = {
    TikTok: "https://www.tiktok.com/@kickrofficial",
    Instagram: "https://www.instagram.com/kikaoffical6/",
    X: "https://x.com/dotunolori_91",
    YouTube: "https://www.youtube.com/@kikaofficial-p5n",
  };
  for (const [name, url] of Object.entries(links))
    await expect(
      page
        .locator(".contact-social")
        .getByRole("link", { name: new RegExp(`^${name} —`) }),
    ).toHaveAttribute("href", url);
});

test("mobile layouts have no horizontal overflow and menu reaches collections and accounts", async ({
  page,
}) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of [
      "/",
      "/shop",
      "/product/penny-loafers",
      "/signup",
      "/contact",
    ]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} at ${width}px`,
      ).toBe(true);
    }
  }
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Campus rotation" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Campus rotation", exact: true }),
  ).toBeVisible();
});

test("all catalogue images resolve locally and all main pages render without browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of [
    "/",
    "/shop",
    "/cart",
    "/checkout",
    "/wishlist",
    "/account",
    "/login",
    "/signup",
    "/signin",
    "/about",
    "/contact",
    "/faq",
    "/shipping",
  ]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
  }
  await page.goto("/shop");
  const images = await page
    .locator(".product-image img")
    .evaluateAll((elements) =>
      elements.map((e) => (e as HTMLImageElement).getAttribute("src")!),
    );
  for (const src of [...new Set(images)]) {
    const response = await page.request.get(src);
    expect(response.status(), src).toBe(200);
    expect(response.headers()["content-type"], src).toContain("image/");
  }
  expect(errors).toEqual([]);
});
