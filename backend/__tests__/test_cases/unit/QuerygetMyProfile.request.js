const given = require("../../steps/given");
const when = require("../../steps/when");
const then = require("../../steps/then");
const chance = require("chance").Chance();
const path = require("path");
describe("Query get my request Template", () => {
  it("Should use username as 'id' ", () => {
    const templatePath = path.resolve(
      __dirname,
      "../../../lib/stacks/API_STACK/resolvers/query/getMyProfile/getMyProfileRequest.vtl"
    );
    const username = chance.guid(); // check cognito user pool for why guid
    const context = given.an_appsync_context({ username });
    const result = when.we_invoke_an_appsync_template(templatePath, context);
    // check toEqual vs Match Object
    expect(result).toEqual({
      version: "2018-05-29",
      operation: "GetItem",
      key: {
        id: {
          S: username,
        },
      },
    });
  });
});
