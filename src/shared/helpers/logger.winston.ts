import winston from "winston";

//Tipos de Severidade
type LevelName = "error" | "warn" | "ok" | "info" | "http" | "sql" | "debug";

interface ILevel {
    id:number;
    color:string;
    emoji:string;
}

interface CustomLevels extends winston.Logger {
    error: winston.LeveledLogMethod;
    warn: winston.LeveledLogMethod;
    ok: winston.LeveledLogMethod;
    info: winston.LeveledLogMethod;
    http: winston.LeveledLogMethod;
    sql: winston.LeveledLogMethod;
    debug: winston.LeveledLogMethod;
}

const LevelsRecord: Record<LevelName, ILevel> = {
    error: {id:0 , color: 'red',  emoji:'🔴 '},
    warn: {id:1, color: 'yellow',  emoji:'🟡'},
    ok: {id:2, color: 'green',  emoji:'🟢'},
    info: {id:3, color: 'blue',  emoji:'🔵 '},
    http: {id:4, color: 'italic white magentaBG' ,  emoji:'🌐 '},
    sql: {id:5, color: 'italic gray whiteBG',  emoji:'🔎 '},
    debug: {id:6, color: 'italic white redBG',  emoji:'🐞 '},
};

const levels: winston.config.AbstractConfigSetLevels = Object.fromEntries(Object.keys(LevelsRecord).map(key => [key, LevelsRecord[key as LevelName].id]));
const colors = Object.fromEntries(Object.keys(LevelsRecord).map(key => [key, LevelsRecord[key as LevelName].color]));
const emojis = Object.fromEntries(Object.keys(LevelsRecord).map(key => [key, LevelsRecord[key as LevelName].emoji]));

//Este método define a gravidade atual com base no NODE_ENV atual
//Mostra todos os níveis de log se o servidor estiver executando em modo de desenvolvimento; 
//Se está sendo executado em produção, mostra apenas mensagens de advertência e erro.
const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
};

//Configura as cores no winston
//Definido acima para os níveis de severidade/levels existentes
winston.addColors(colors);

//Cria um timestamp da mensagem com o formato preferido
const timeStampDefault = winston.format.timestamp({ format: 'YYYY.MM.DD HH:mm:ss A' });

//Indica ao Winston que os logs devem ser coloridos
const colorizaDefault = winston.format.colorize({ all: true });

//Define o formato da mensagem para o console mostrando o timestamp de data/hora, nome da api, emoji que indica o level e a mensagem
const printfConsole = winston.format.printf(
    ({ level, message, label, timestamp }) => {
      const cleanLevel = level.replace(/\u001b\[.*?m/g, '');
      const emoji = emojis[cleanLevel as keyof typeof emojis];
      const cleanEmoji = emoji.replace(/\u001b\[.*?m/g, '');
      return `[${process.env.API_NAME}] ${cleanEmoji} ${message}`;
   },
);

//Define o formato da mensagem para o arquivo de log mostrando o timestamp de data/hora, nome da api, emoji que indica o level e a mensagem
const printfFileLog =  winston.format.printf(
    ({ level, message, label, timestamp }) => {
      const cleanLevel = level.replace(/\u001b\[.*?m/g, '');
      const cleanMessage = message.replace(/\u001b\[.*?m/g, '');
      const emoji = emojis[cleanLevel as keyof typeof emojis];
      return `[${timestamp}][${process.env.API_NAME}] ${emoji.trim()} ${cleanMessage}`;
   },
  );

//Personalizando o formato padrão usado do log no console
const formatDefault = winston.format.combine(
    timeStampDefault,
    colorizaDefault,
    printfConsole
);

//Personalizando o formato padrão usado no arquivo de log
const formatFileLog = winston.format.combine(
    timeStampDefault,
    colorizaDefault,
    printfFileLog
);

// Define quais transportes o logger deve utilizar para imprimir mensagens.
// Neste exemplo, estamos usando três transportes diferentes
const transports = [
    //Permitir usar o console para imprimir as mensagens
    new winston.transports.Console(),
    //Permitir imprimir todas as mensagens de nível de erro dentro do arquivo error.log
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: formatFileLog
    }),
    //Permite imprimir todas as  mensagens dentro do arquivo api.log
    new winston.transports.File({ 
        filename: 'logs/api.log',
        format: formatFileLog
    }),
];

//Cria a instância do logger que deve ser exportada e usado para registrar mensagens.
const logger:  CustomLevels = <CustomLevels>winston.createLogger({
    level: level(),
    levels: levels,
    format: formatDefault,
    transports: transports
});

export { logger }