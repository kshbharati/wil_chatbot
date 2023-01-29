import LoginHandler from "pages/api/user/login";
import testHandler from "__test__/pages/api/TestHandler"

describe("Login", () => {


    it("Login Forbidden Method (Ony Allow Post)", async () => {
        let bodyData ={}

        const res = await testHandler(LoginHandler, {
            method: "GET",
            body: bodyData,
        });

        expect(res.statusCode).toBe(401);
    });

    it("Login Reject on Empty Body", async () => {
        let bodyData = {};

        const res = await testHandler(LoginHandler, {
            method: "POST",
            body: bodyData,
        });

        expect(res.statusCode).toBe(403);
    });

    it("Login Reject on Empty Body Parameters", async () => {
        let bodyData = {
            username:"",
            password:""
        };

        const res = await testHandler(LoginHandler, {
            method: "POST",
            body: bodyData,
        });

        expect(res.statusCode).toBe(403);
    });

    it("Login Reject on Empty Password Parameters", async () => {
        let bodyData = {
            username: "kshbharati@outlook.com",
            password: "",
        };

        const res = await testHandler(LoginHandler, {
            method: "POST",
            body: bodyData,
        });

        expect(res.statusCode).toBe(403);
    });

    it("Login Reject on Empty Username Parameters", async () => {
        let bodyData = {
            username: "",
            password: process.env.password,
        };

        const res = await testHandler(LoginHandler, {
            method: "POST",
            body: bodyData,
        });

        expect(res.statusCode).toBe(403);
    });

    it("Login Reject on wrong crendentials", async () => {
        let bodyData = {
            username: "kshitizxox@hotmail.com",
            password: "randomPassword",
        };

        const res = await testHandler(LoginHandler, {
            method: "POST",
            body: bodyData,
        });

        expect(res.statusCode).toBe(404);
    });

    it('Login correct credentials', async()=>{
        let bodyData = {
            username: "kshbharati@outlook.com",
            password: process.env.PASSWORD,
        };

        const res = await testHandler(LoginHandler, {
            method: "POST",
            body:bodyData
        })

        expect(res.statusCode).toBe(200);
        let data=res._getJSONData();
        expect(data).toHaveProperty("id");
    })

});

