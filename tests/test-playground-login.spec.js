const { test, expect } = require("@playwright/test");

test.describe("playground", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("Validate load home page", async ({ page }) => {
    await expect(page).toHaveTitle(/Playground page/);
  });
});

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("Validate load login page", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByRole("button", { name: "Logar" })).toBeVisible();
  });

  test("Validate with correct credentials", async ({ page }) => {
    await page.getByRole("link", { name: "LOGIN" }).click();
    await page.getByPlaceholder("Digite seu usuário").click();
    await page.getByPlaceholder("Digite seu usuário").fill("teste");
    await page.getByPlaceholder("Digite sua senha").click();
    await page.getByPlaceholder("Digite sua senha").fill("password123");
    await page.getByRole("button", { name: "Logar" }).click();
    await expect(page.getByText("Usuário teste logado")).toBeVisible();
  });

  test("Validate with correct user and incorrect password", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "LOGIN" }).click();
    await page.getByPlaceholder("Digite seu usuário").click();
    await page.getByPlaceholder("Digite seu usuário").fill("teste");
    await page.getByPlaceholder("Digite sua senha").click();
    await page.getByPlaceholder("Digite sua senha").fill("password12341");
    await page.getByRole("button", { name: "Logar" }).click();
    await expect(
      page.getByText("Usuário ou senha estão incorretos!")
    ).toBeVisible();
  });

  test("Validate with incorrect user and incorrect password", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "LOGIN" }).click();
    await page.getByPlaceholder("Digite seu usuário").click();
    await page.getByPlaceholder("Digite seu usuário").fill("teste1");
    await page.getByPlaceholder("Digite sua senha").click();
    await page.getByPlaceholder("Digite sua senha").fill("password1234");
    await page.getByRole("button", { name: "Logar" }).click();
    await expect(page.getByText("Usuário não encontrado!")).toBeVisible();
  });

  test("3 times with wrong credentials should block user temporarily", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "LOGIN" }).click();

    // login 1
    await page.getByPlaceholder("Digite seu usuário").fill("teste");
    await page.getByPlaceholder("Digite sua senha").click();
    await page.getByPlaceholder("Digite sua senha").fill("password12341");
    await page.getByRole("button", { name: "Logar" }).click();

    // login 2
    await page.getByPlaceholder("Digite seu usuário").fill("teste");
    await page.getByPlaceholder("Digite sua senha").click();
    await page.getByPlaceholder("Digite sua senha").fill("password12341");
    await page.getByRole("button", { name: "Logar" }).click();

    // login 3 - should block after this
    await page.getByPlaceholder("Digite seu usuário").fill("teste");
    await page.getByPlaceholder("Digite sua senha").click();
    await page.getByPlaceholder("Digite sua senha").fill("password12341");
    await page.getByRole("button", { name: "Logar" }).click();

    await expect(
      page.getByText("Usuário bloqueado temporariamente!")
    ).toBeVisible();
  });

  test("Validate user with blocked account", async ({ page }) => {
    await page.getByRole("link", { name: "LOGIN" }).click();
    await page.getByPlaceholder("Digite seu usuário").click();
    await page.getByPlaceholder("Digite seu usuário").fill("testeblock");
    await page.getByPlaceholder("Digite sua senha").click();
    await page.getByPlaceholder("Digite sua senha").fill("password123");
    await page.getByRole("button", { name: "Logar" }).click();
    await expect(page.getByText("Usuário bloqueado!")).toBeVisible();
  });
});
