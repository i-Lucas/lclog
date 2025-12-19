import { Style } from '../styling/style';
import { Color } from '../styling/color';

import { Context } from '../context/context';
import { Builder } from './builder.interface';
import { TextDecorator } from '../processors/text-decorator';

export class ContextPartBuilder implements Builder<string[]> {

    private readonly parts: string[] = [];

    constructor(private readonly context: Context) { }

    build(): string[] {

        this.addFile();
        this.addContext();
        this.addDebug();
        this.addTrace();
        return this.parts;
    }

    private addFile(): void {

        const file = this.context.get('file');

        if (file) {

            this.parts.push(this.formatFile(file));
        }
    }

    private addContext(): void {

        const ctx = this.context.get('context');

        if (ctx) {

            this.parts.push(this.formatContext(ctx));
        }
    }

    private addDebug(): void {

        const debug = this.context.get('debug');

        if (debug) {

            this.parts.push(this.formatDebug(debug));
        }
    }

    private addTrace(): void {

        const trace = this.context.get('trace');

        if (trace) {

            this.parts.push(this.formatTrace(trace));
        }
    }

    private formatFile(file: string): string {

        const decorator = new TextDecorator(Color.BLUE, Style.ITALIC);
        return `📄 ${decorator.process(file)}`;
    }

    private formatContext(context: string): string {

        const decorator = new TextDecorator(Color.PURPLE, Style.BOLD);
        return `🎯 ${decorator.process(context)}`;
    }

    private formatDebug(debug: string): string {

        return Color.YELLOW.apply(`💡 [ ${debug} ]`);
    }

    private formatTrace(trace: string): string {

        const decorator = new TextDecorator(Color.GRAY, Style.ITALIC);
        return `🔥 ${decorator.process(trace)}`;
    }
}
