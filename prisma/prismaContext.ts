
import { PrismaClient } from "@prisma/client";



const context= () =>{
    let prismaContext
        if (global.prismaContext) {
            global.prismaContext = global.prismaContext;
        } else {
            prismaContext = new PrismaClient();
        }
        return prismaContext;
}

const PrismaContext = context();
export {PrismaContext};