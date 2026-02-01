import mockPage from "../pageobjects/mock.page";

describe("Mocks page (browser.mock)", () => {
  it("@mock should show success message when API returns 200", async () => {
    const apiMock = await browser.mock(
      "https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks?action=getData*"
    );

    await apiMock.respond(
      { status: "ok", message: "Success from mock" },
      {
        statusCode: 200,
        headers: { "content-type": "application/json" },
      }
    );

    await mockPage.open();
    await mockPage.clickFetch();

    await mockPage.expectSuccessVisible();

    await apiMock.restore();
  });

  it("@mock should show error message when API returns 500", async () => {
    const apiMock = await browser.mock(
      "https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks?action=getData*"
    );

    await apiMock.respond(
      { status: "error", message: "Error from mock" },
      {
        statusCode: 500,
        headers: { "content-type": "application/json" },
      }
    );

    await mockPage.open();
    await mockPage.clickFetch();

    await mockPage.expectErrorVisible();

    await apiMock.restore();
  });
});
