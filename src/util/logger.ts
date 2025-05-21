import { createLogger, format, transports } from "winston";
const { combine, timestamp, colorize, printf } = format;

interface Logger {
  info: (service: string, message: string) => void;
  error: (service: string, message: string) => void;
  warn: (service: string, message: string) => void;
  debug: (service: string, message: string) => void;
}

const logFormat = printf(({ level, message, timestamp, service }) => {
  return `[${timestamp}] [${service || "unknown service"}] ${level}: ${message}`;
});

const baseLogger = createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new transports.Console({
      format: combine(colorize(), logFormat),
    }),
  ],
});

const logger: Logger = {
  info: (service, message) => baseLogger.info({ service, message }),
  error: (service, message) => baseLogger.error({ service, message }),
  warn: (service, message) => baseLogger.warn({ service, message }),
  debug: (service, message) => baseLogger.debug({ service, message }),
};

export default logger;
