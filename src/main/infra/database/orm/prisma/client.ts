import { PrismaClient } from '@prisma/client';

//Adiciona o prisma aos tipos globais do NodeJS
declare global {
    var prisma: PrismaClient
}

//Evita múltiplas instâncias do cliente prisma
const prisma = global.prisma || new PrismaClient({
    log: ['query', 'info'],
    errorFormat: 'pretty'
});

//Em desenvolvimento é criado por hot-reloading (recarga automática)
if (process.env.NODE_ENV === 'development') {
    global.prisma = prisma
}

export { prisma }