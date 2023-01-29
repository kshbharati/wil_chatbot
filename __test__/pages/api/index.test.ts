import DialogFlowRequestHandler from "pages/api";
import testHandler from "__test__/pages/api/TestHandler"

describe("Login", () => {
    it("should Forbidden Get Method (Ony Allow Post)", async () => {

        const res = await testHandler(DialogFlowRequestHandler, {
            method: "GET",
        });

        expect(res.statusCode).toBe(403);
    });

    it("Should Forbid Dialogflow empty query", async () => {
        let query = {};

        const res = await testHandler(DialogFlowRequestHandler, {
            method: "POST",
            query:query
        });

        expect(res.statusCode).toBe(403);
    });


})