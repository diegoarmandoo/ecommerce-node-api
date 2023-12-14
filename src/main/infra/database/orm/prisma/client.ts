import { PrismaClient } from '@prisma/client';
import { logger } from '@shared/helpers/logger.winston';

//Adiciona o prisma aos tipos globais do NodeJS
declare global {
    var prisma: PrismaClient
}

//Evita múltiplas instâncias do cliente prisma
const prisma = global.prisma || new PrismaClient({
    log: [
        {emit: 'event', level: 'query'}, 
        {emit: 'event', level: 'info'},
        {emit: 'event', level: 'error'},
        {emit: 'event', level: 'warn'}
    ],
    errorFormat: 'minimal'
});

export type QueryEvent = {
    timestamp: Date
    query: string //Consulta enviada ao banco de dados
    params: string //Parâmetros de consulta
    duration: number //Tempo decorrido (em milissegundos) entre a emissão da consulta pelo cliente e a resposta do banco de dados - não apenas o tempo necessário para executar a consulta
    target: string
}

prisma.$on('query' as never, (event:QueryEvent) => {logger.sql(event);})

prisma.$on('info' as never, (event) => {logger.info(event);})

prisma.$on('error' as never, (event) => {logger.error(event);})

prisma.$on('warn' as never, (event) => {logger.warn(event);})

//Em desenvolvimento é criado por hot-reloading (recarga automática)
if (process.env.NODE_ENV === 'development') {
    global.prisma = prisma
}

export { prisma }