import pino from "pino";

export interface ILogger{
    trace(message: string, meta?: object): void;
    debug(message: string, meta?: object): void;
    info(message: string, meta?: object): void;
    warn(message: string, meta?: object): void;
    error(message: string, meta?: object): void;
    fatal(message: string, meta?: object): void;
  }

  class Logger implements ILogger {
    private logger: pino.Logger;
    
    constructor() {
      this.logger = pino();
    } 

    public trace(message: string, meta?: object): void {
      this.logger.trace(meta, message);
    }

    public debug(message: string, meta?: object): void {
      this.logger.debug(meta, message);
    }

    public info(message: string, meta?: object): void {
      this.logger.info(meta, message);
    }

    public warn(message: string, meta?: object): void {
      this.logger.warn(meta, message);
    }

    public error(message: string, meta?: object): void {
      this.logger.error(meta, message);
    }

    public fatal(message: string, meta?: object): void {
      this.logger.fatal(meta, message);
    }
  }

export const logger = new Logger();