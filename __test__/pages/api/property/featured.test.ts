import FeaturedHandler from "pages/api/property/featured";
import testHandler from "__test__/pages/api/TestHandler"

describe("Property Get", () => {
    it("show featured properties", async () => {
        const res = await testHandler(FeaturedHandler, {
            method: "GET",
        });

        expect(res.statusCode).toBe(200);
    });
})