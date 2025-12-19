import { AnsiCode } from './ansi-code';

export class Theme {

    constructor(

        public readonly color: AnsiCode,
        public readonly style: AnsiCode,
        public readonly emoji: string

    ) { }
}
