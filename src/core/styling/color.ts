import { AnsiCode } from './ansi-code';

export class Color {
    
    static rgb(r: number, g: number, b: number): AnsiCode {
        return new AnsiCode(`\x1b[38;2;${r};${g};${b}m`);
    }

    static readonly RED = Color.rgb(255, 60, 60);
    static readonly CYAN = Color.rgb(0, 255, 255);
    static readonly GREEN = Color.rgb(0, 255, 120);
    static readonly YELLOW = Color.rgb(255, 255, 0);
    static readonly ORANGE = Color.rgb(255, 165, 0);
    static readonly GRAY = Color.rgb(160, 160, 160);
    static readonly BLUE = Color.rgb(100, 180, 255);
    static readonly PURPLE = Color.rgb(180, 120, 255);
}