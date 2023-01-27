
import { PrismaClient } from "@prisma/client";



const context= () =>{
    if (!global.prismaContext) {
        
        global.prismaContext = new PrismaClient();
    }
    return global.prismaContext;
}

const PrismaContext = context();
export {PrismaContext};