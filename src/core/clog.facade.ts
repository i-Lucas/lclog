import { Context } from './context/context';
import { Logger } from './logger/logger.interface';
import { LoggerFactory } from './logger/logger-factory';
import { BannerOptions } from './strategies/banner-options.interface';

export class Lclog {

    constructor(

        private readonly ctx: Context = new Context(),
        private readonly factory: LoggerFactory = new LoggerFactory()

    ) { }

    file(file: string): Lclog {

        return new Lclog(this.ctx.with('file', file), this.factory);
    }

    context(context: string): Lclog {

        return new Lclog(this.ctx.with('context', context), this.factory);
    }

    debug(debug: string): Lclog {

        return new Lclog(this.ctx.with('debug', debug), this.factory);
    }

    trace(trace: string): Lclog {

        return new Lclog(this.ctx.with('trace', trace), this.factory);
    }

    info(message: string): this {

        this.createLogger().log('info', message);
        return this;
    }

    success(message: string): this {

        this.createLogger().log('success', message);
        return this;
    }

    warning(message: string): this {

        this.createLogger().log('warning', message);
        return this;
    }

    error(message: string): this {

        this.createLogger().log('error', message);
        return this;
    }

    json(data: unknown, indent = 2): this {

        this.createLogger().json(data, indent);
        return this;
    }

    banner(message: string, options?: Partial<BannerOptions>): this {

        this.createLogger().banner(message, options);
        return this;
    }

    divider(char = '─'): this {

        this.createLogger().divider(char);
        return this;
    }

    private createLogger(): Logger {

        return this.factory.create(this.ctx);
    }
}