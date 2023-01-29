import FeaturedHandler from "pages/api/property/featured";
import testHandler from "__test__/pages/api/TestHandler"

describe("Property Get", () => {
    it("should forbid with empty query", async () => {
        const res = await testHandler(FeaturedHandler, {
            method: "GET",
        });

        expect(res.statusCode).toBe(200);
    });
})