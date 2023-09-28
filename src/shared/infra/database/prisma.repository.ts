import { PrismaClient } from "@prisma/client";

abstract class PrismaRepository {

    protected _datasource: PrismaClient;

    constructor(prisma: PrismaClient){
        this._datasource = prisma;
    }

}

export { PrismaRepository }