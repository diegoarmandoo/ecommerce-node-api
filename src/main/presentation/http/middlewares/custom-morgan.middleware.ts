import morgan from "morgan";
import { logger } from "@shared/helpers/logger.winston";

const stream = {
    write: (message:string) => logger.http(message.trim()),
};

const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};

// Define a string do formato da mensagem (este é o padrão).
const formatDefault = ":remote-addr :method :url :status :res[content-length] - :response-time ms";

const customMorganMiddleware = morgan(
    formatDefault,
    { stream, skip }
);


export { customMorganMiddleware as customMorgan }