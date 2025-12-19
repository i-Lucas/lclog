export class AnsiCode {
    
    constructor(private readonly code: string) { }

    apply(text: string): string {
        return `${this.code}${text}\x1b[0m`;
    }

    get value(): string {
        return this.code;
    }
}