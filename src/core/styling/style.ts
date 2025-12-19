import { AnsiCode } from './ansi-code';

export class Style {

    static readonly BOLD = new AnsiCode('\x1b[1m');
    static readonly ITALIC = new AnsiCode('\x1b[3m');
    static readonly UNDERLINE = new AnsiCode('\x1b[4m');
    static readonly RESET = new AnsiCode('\x1b[0m');
}
