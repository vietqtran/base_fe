describe("Sign In Page", () => {
  beforeEach(() => {
    cy.visit("/auth/sign-in");

    cy.wait(500);
  });

  it("should display the sign in form correctly", () => {
    cy.get("form").should("be.visible");
    cy.contains("h2", "Welcome back").should("be.visible");
    cy.contains("Enter your credentials to access your account").should(
      "be.visible"
    );

    cy.get('input[placeholder="name@example.com"]').should("be.visible");
    cy.get('input[placeholder="Your password"]').should("be.visible");

    cy.contains("button", "Sign in").should("be.visible");
    cy.contains("button", "Forgot password?").should("be.visible");

    cy.contains("Or continue with").should("be.visible");
    cy.get("button").contains("Google").should("be.visible");
    cy.get("button").contains("GitHub").should("be.visible");

    cy.contains("Don't have an account?").should("be.visible");
    cy.contains("a", "Sign up")
      .should("be.visible")
      .and("have.attr", "href", "/auth/sign-up");
  });

  it("should validate email input field", () => {
    cy.get('input[placeholder="Your password"]').type("password123");
    cy.contains("button", "Sign in").click();
    cy.contains("Please enter a valid email address").should("be.visible");

    cy.get('input[placeholder="name@example.com"]').type("invalid-email");
    cy.contains("button", "Sign in").click();
    cy.contains("Please enter a valid email address").should("be.visible");

    cy.get('input[placeholder="name@example.com"]')
      .clear()
      .type("valid@example.com");
    cy.contains("Please enter a valid email address").should("not.exist");
  });

  it("should validate password input field", () => {
    cy.get('input[placeholder="name@example.com"]').type("valid@example.com");
    cy.contains("button", "Sign in").click();
    cy.contains("Password must be at least 8 characters").should("be.visible");

    cy.get('input[placeholder="Your password"]').type("short");
    cy.contains("button", "Sign in").click();
    cy.contains("Password must be at least 8 characters").should("be.visible");

    cy.get('input[placeholder="Your password"]').clear().type("password123");
    cy.contains("Password must be at least 8 characters").should("not.exist");
  });

  it("should show loading state when submitting form", () => {
    cy.get('input[placeholder="name@example.com"]').type("test@example.com");
    cy.get('input[placeholder="Your password"]').type("password123");

    cy.contains("button", "Sign in").click();
    cy.get('button[type="submit"]').should(
      "have.class",
      "mantine-Button-loading"
    );

    cy.wait(1100);
    cy.get('button[type="submit"]').should(
      "not.have.class",
      "mantine-Button-loading"
    );
  });

  it("should toggle password visibility", () => {
    cy.get('input[placeholder="Your password"]').should(
      "have.attr",
      "type",
      "password"
    );

    cy.get('input[placeholder="Your password"]')
      .parent()
      .find("button")
      .click();

    cy.get('input[placeholder="Your password"]').should(
      "have.attr",
      "type",
      "text"
    );

    cy.get('input[placeholder="Your password"]')
      .parent()
      .find("button")
      .click();
    cy.get('input[placeholder="Your password"]').should(
      "have.attr",
      "type",
      "password"
    );
  });

  it("should handle failed sign in attempt", () => {
    cy.intercept("POST", "/api/auth/sign-in", {
      statusCode: 401,
      body: { message: "Invalid email or password. Please try again." },
    }).as("loginRequest");

    cy.get('input[placeholder="name@example.com"]').type("test@example.com");
    cy.get('input[placeholder="Your password"]').type("password123");
    cy.contains("button", "Sign in").click();

    cy.wait("@loginRequest");

    cy.contains("Invalid email or password. Please try again.").should(
      "be.visible"
    );
  });

  it("should handle successful sign in attempt", () => {
    cy.intercept("POST", "/api/auth/sign-in", {
      statusCode: 200,
      body: { success: true },
    }).as("loginRequest");

    cy.intercept("GET", "/", {}).as("homePage");

    cy.get('input[placeholder="name@example.com"]').type("test@example.com");
    cy.get('input[placeholder="Your password"]').type("password123");
    cy.contains("button", "Sign in").click();

    cy.wait("@loginRequest");

    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("should handle social sign in with Google", () => {
    cy.window().then((win) => {
      cy.spy(win, "handleSocialSignIn").as("socialSignInSpy");
    });

    cy.contains("button", "Google").click();

    cy.contains("button", "Google").should("be.disabled");

    cy.wait(1100);

    cy.get("@socialSignInSpy").should("have.been.calledWith", "google");
  });

  it("should handle social sign in with GitHub", () => {
    cy.window().then((win) => {
      cy.spy(win, "handleSocialSignIn").as("socialSignInSpy");
    });

    cy.contains("button", "GitHub").click();

    cy.contains("button", "GitHub").should("be.disabled");

    cy.wait(1100);

    cy.get("@socialSignInSpy").should("have.been.calledWith", "github");
  });

  it('should navigate to sign up page when clicking "Sign up" link', () => {
    cy.contains("a", "Sign up").click();
    cy.url().should("include", "/auth/sign-up");
  });

  it("should handle forgot password click", () => {
    cy.window().then((win) => {
      cy.stub(win, "location", "assign").as("locationAssign");
    });

    cy.contains("button", "Forgot password?").click();

    cy.get("@locationAssign").should(
      "have.been.calledWith",
      "/auth/forgot-password"
    );
  });

  it("should render properly on mobile devices", () => {
    cy.viewport("iphone-x");

    cy.get("form").should("be.visible");
    cy.get('button[type="submit"]').should("have.css", "width", "100%");

    cy.get(".mantine-Paper-root")
      .should("have.css", "padding")
      .should("not.eq", "xl");
  });
});
