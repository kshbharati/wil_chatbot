// import {render, screen} from '@testing-library/react'
// import Page from '../app/page'

// describe('Page',()=>{
//     render(<Page />)

//     const heading = screen.getByRole('button')
//     expect(heading).toBeInTheDocument()
// })

// // test("Dummy unit test",()=>{
// //     const actual = null;
// //     expect(actual).toBe(1);
// // })

import {createMocks} from 'node-mocks-http';
import userHandler from "../pages/api/user/[uid]"

// describe('api/getmovie',()=>{
//     test('returns a json',async ()=>{
//         const {req,res}=createMocks({
//             method:'GET',
//             query:{
//                 getmovie:'movie'
//             }
//         });
        
//         await handler(req,res);

//         expect(res._getStatusCode()).toBe(200);
//         expect(JSON.parse(res._getData())).toEqual(
//             expect.objectContaining({
//                 fulfillmentMessages: [
//                     {
//                         card: {
//                             title: "card title",
//                             subtitle: "card text",
//                             imageUri:
//                                 "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic01.nyt.com%2Fimages%2F2011%2F01%2F14%2Farts%2F14MOVING-span%2FMOVING-jumbo.jpg&f=1&nofb=1&ipt=d992525934df99e762a810588c789b5e503404666ccb977d5465ddf8e75c2e95&ipo=images",
//                             buttons: [
//                                 {
//                                     text: "button text",
//                                     postback:
//                                         "https://example.com/path/for/end-user/to/follow",
//                                 },
//                             ],
//                         },
//                     },
//                 ],
//             })
//         );
//     })
// })



describe("api/user/claf8ct4p0000dwqjpz5sqo12", () => {
    test("returns a json", async () => {
        
        const { req, res } = createMocks({
            method: "GET",
            query: {
                uid:"claf8ct4p0000dwqjpz5sqo12"
            },
        });

        await userHandler(req, res);

        expect(res._getStatusCode()).toBe(200);
        const obj = JSON.parse(res._getData());

        expect(obj.name).toEqual('Bob')
    });
});


describe("api/user/claf8ct4p0000dwqjpz5sqo12", () => {
    test("returns a json", async () => {
        const { req, res } = createMocks({
            method: "GET",
            query: {
                uid: "claf8ct4p0000dwqjpz5sqo12",
            },
        });

        await userHandler(req, res);

        expect(res._getStatusCode()).toBe(200);
        const obj = JSON.parse(res._getData());

        expect(obj.name).toEqual("Bob");
    });
});
