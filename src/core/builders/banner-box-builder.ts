import { Color } from '../styling/color';
import { Style } from '../styling/style';

import { Builder } from './builder.interface';
import { AnsiCode } from '../styling/ansi-code';

import { TextDecorator } from '../processors/text-decorator';

export class BannerBoxBuilder implements Builder<string[]> {

    constructor(

        private readonly message: string,
        private readonly color: AnsiCode,
        private readonly width: number

    ) { }

    build(): string[] {

        const cleanMsg = ` ${this.message} `;
        const padding = Math.floor((this.width - cleanMsg.length) / 2);

        const border = this.buildBorder();
        const middle = this.buildMiddle(cleanMsg, padding);

        return [border, middle, border];
    }

    private buildBorder(): string {

        const decorator = new TextDecorator(this.color, Style.BOLD);
        return decorator.process('═'.repeat(this.width));
    }

    private buildMiddle(msg: string, padding: number): string {

        const left = Color.ORANGE.apply('->');
        const leftPad = ' '.repeat(padding - 1);
        const rightPad = ' '.repeat(padding - 2);
        const right = Style.BOLD.apply('*');

        return `${left}${leftPad}${msg}${rightPad}${right}`;
    }
}