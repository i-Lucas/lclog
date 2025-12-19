import { Context } from "../context";
import { Color, Style, Theme } from "../styling";
import { TimestampFormatter } from "../formatters";
import { ContextPartBuilder, LineBuilder } from "../builders";
import { RenderStrategy } from "./render-strategy.interface";

export class MessageRenderStrategy implements RenderStrategy {

    constructor(

        private readonly message: string,
        private readonly theme: Theme,
        private readonly context: Context,
        private readonly timestamp: Date

    ) { }

    render(): string {

        const timestampFmt = new TimestampFormatter();
        const contextBuilder = new ContextPartBuilder(this.context);

        const line = new LineBuilder()
            .add(timestampFmt.format(this.timestamp))
            .add(contextBuilder.build().join(Color.GRAY.apply(' → ')))
            .add(this.formatMessage())
            .build();

        return `\n${line}`;
    }

    private formatMessage(): string {

        const { color, style, emoji } = this.theme;
        return `${color.value}${style.value}${emoji} ${this.message}${Style.RESET.value}`;
    }
}