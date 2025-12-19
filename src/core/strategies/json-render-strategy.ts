import { Color } from '../styling/color';
import { Style } from '../styling/style';

import { Context } from '../context/context';

import { LineBuilder } from '../builders/line-builder';
import { ContextPartBuilder } from '../builders/context-part-builder';

import { RenderStrategy } from './render-strategy.interface';
import { TextDecorator } from '../processors/text-decorator';

import { JsonFormatter } from '../formatters/json-formatter';
import { TimestampFormatter } from '../formatters/timestamp-formatter';

export class JsonRenderStrategy implements RenderStrategy {

    constructor(

        private readonly data: unknown,
        private readonly indent: number,
        private readonly context: Context,
        private readonly timestamp: Date

    ) { }

    render(): string {

        const header = this.buildHeader();
        const json = new JsonFormatter().format(this.data, this.indent);
        const lines = this.colorizeLines(json);

        return `\n${header}\n${lines.join('\n')}`;
    }

    private buildHeader(): string {

        const timestampFmt = new TimestampFormatter();
        const contextBuilder = new ContextPartBuilder(this.context);
        const title = new TextDecorator(Color.CYAN, Style.BOLD).process('🧩 JSON');

        return new LineBuilder()
            .add(timestampFmt.format(this.timestamp))
            .add(contextBuilder.build().join(Color.GRAY.apply(' → ')))
            .add(title)
            .build();
    }

    private colorizeLines(json: string): string[] {

        const decorator = new TextDecorator(Color.GRAY, Style.ITALIC);
        return json.split('\n').map(line => `  ${decorator.process(line)}`);
    }
}
