import { Style } from '../styling/style';
import { AnsiCode } from '../styling/ansi-code';
import { TextProcessor } from './text-processor.interface';

export class TextDecorator implements TextProcessor {

    constructor(

        private readonly color: AnsiCode,
        private readonly style: AnsiCode

    ) { }

    process(text: string): string {

        return `${this.color.value}${this.style.value}${text}${Style.RESET.value}`;
    }
}