import { Output } from "../output";
import { Context } from "../context";

import { Logger } from "./logger.interface";
import { Color, ThemeProvider } from "../styling";

import {

    BannerOptions,
    JsonRenderStrategy,
    BannerRenderStrategy,
    MessageRenderStrategy,

} from "../strategies";

export class ClogLogger implements Logger {

    constructor(

        private readonly context: Context,
        private readonly output: Output,
        private readonly themeProvider: ThemeProvider

    ) { }

    log(level: string, message: string): void {

        const theme = this.themeProvider.get(level);

        const strategy = new MessageRenderStrategy(

            message,
            theme,
            this.context,
            new Date()
        );

        this.output.write(strategy.render());
    }

    json(data: unknown, indent = 2): void {

        const strategy = new JsonRenderStrategy(

            data,
            indent,
            this.context,
            new Date()
        );

        this.output.write(strategy.render());
    }

    banner(message: string, options: Partial<BannerOptions> = {}): void {

        const fullOptions = this.buildBannerOptions(options);

        const strategy = new BannerRenderStrategy(

            message,
            fullOptions,
            this.context,
            new Date()
        );

        this.output.write(strategy.render());
    }

    divider(char = '─'): void {

        const width = this.output.getLastLineLength() + 2 || 50;
        const line = Color.GRAY.apply(char.repeat(width));
        this.output.write(line);
    }

    private buildBannerOptions(partial: Partial<BannerOptions>): BannerOptions {

        return {

            info: partial.info,
            width: partial.width || 100,
            color: partial.color || 'default'
        };
    }
}

