export interface Output {

    write(content: string): void;
    getLastLineLength(): number;
}