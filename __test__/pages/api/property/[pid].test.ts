import propertyHandler from "pages/api/property/[pid]";
import testHandler from "__test__/pages/api/TestHandler"

describe("Property Get", () => {
    it("should forbid with empty query", async () => {
        const res = await testHandler(propertyHandler, {
            method: "GET",
        });

        expect(res.statusCode).toBe(403);
    });

    it("should 404 on property not in database #1", async () => {
        let query={pid:"sad121d2d12"}
        const res = await testHandler(propertyHandler, {
            method: "GET",
            query:query
        });

        expect(res.statusCode).toBe(404);
    });

    it("should 404 on property not in database #2", async () => {
        let query = { pid: "clcn09m6l000cdwgz209kw" };
        const res = await testHandler(propertyHandler, {
            method: "GET",
            query: query,
        });

        expect(res.statusCode).toBe(404);
    });

    it("should send property object on correct test #1", async () => {
        let query = { pid: "clcn09m6l000cdwgz209kwvvy" };
        const res = await testHandler(propertyHandler, {
            method: "GET",
            query: query,
        });

        expect(res.statusCode).toBe(200);
    });

    it("should send property object on correct test #2", async () => {
        let query = { pid: "cld5bhvl80000dwebzfnjmg4g" };
        const res = await testHandler(propertyHandler, {
            method: "GET",
            query: query,
        });

        expect(res.statusCode).toBe(200);
    });
})