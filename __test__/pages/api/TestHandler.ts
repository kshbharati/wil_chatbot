import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {
    createMocks,
    createRequest,
    createResponse,
    RequestMethod,
    RequestOptions,
} from "node-mocks-http";

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>;

async function testHandler(
    handler: NextApiHandler,
    options: RequestOptions
){
    const req = createRequest<ApiRequest>(options);
    const res = createResponse<APiResponse>();

    await handler(req, res);
    return res;
};

export default testHandler;