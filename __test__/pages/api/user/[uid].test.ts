
import userHandler from "pages/api/user/[uid]";
import testHandler from "__test__/pages/api/TestHandler";

describe("User", () => {

    it("Empty Query", async () => {
        let query = { uid: "" };
        const res = await testHandler(userHandler, {
            method: "GET",
            query: query,
        });

        expect(res.statusCode).toBe(403);
    });

    it("User Not in database", async () => {
        let query = { uid: "dh789h9dh2189h" };
        const res = await testHandler(userHandler, {
            method: "GET",
            query: query,
        });

        expect(res.statusCode).toBe(404);
    });

    it("User correct details", async () => {
        let query = { uid: "clcn0b5jt000qdwgzs38w70fa" };
        const res = await testHandler(userHandler, {
            method: "GET",
            query: query,
        });

        expect(res.statusCode).toBe(200);
    })
}
)