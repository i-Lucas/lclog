import { Color } from '../styling/color';
import { Style } from '../styling/style';

import { Context } from '../context/context';
import { AnsiCode } from '../styling/ansi-code';

import { BannerOptions } from './banner-options.interface';
import { RenderStrategy } from './render-strategy.interface';

import { TimestampFormatter } from '../formatters/timestamp-formatter';
import { TextDecorator } from '../processors/text-decorator';

import { LineBuilder } from '../builders/line-builder';
import { BannerBoxBuilder } from '../builders/banner-box-builder';
import { ContextPartBuilder } from '../builders/context-part-builder';

export class BannerRenderStrategy implements RenderStrategy {

    constructor(

        private readonly message: string,
        private readonly options: BannerOptions,
        private readonly context: Context,
        private readonly timestamp: Date

    ) { }

    render(): string {

        const parts = [
            '',
            '',
            this.buildHeader(),
            ...this.buildBox(),
            this.buildInfo()
        ];

        return parts.join('\n');
    }

    private buildHeader(): string {

        const timestampFmt = new TimestampFormatter();
        const contextBuilder = new ContextPartBuilder(this.context);

        return new LineBuilder()
            .add(timestampFmt.format(this.timestamp))
            .add(contextBuilder.build().join(Color.GRAY.apply(' → ')))
            .build();
    }

    private buildBox(): string[] {

        const color = this.getColor();
        const builder = new BannerBoxBuilder(this.message, color, this.options.width);
        return builder.build();
    }

    private getColor(): AnsiCode {

        const colorMap = new Map<string, AnsiCode>([

            ['info', Color.CYAN],
            ['success', Color.GREEN],
            ['warning', Color.ORANGE],
            ['error', Color.RED],
            ['default', Color.YELLOW]
        ]);

        return colorMap.get(this.options.color) || Color.YELLOW;
    }

    private buildInfo(): string {

        if (!this.options.info) return '\n';

        const decorator = new TextDecorator(Color.GRAY, Style.ITALIC);
        return `${decorator.process(`⚠️  ${this.options.info}`)}\n`;
    }
}