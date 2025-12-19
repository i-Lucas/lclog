import { Output } from "./output.interface";

export abstract class OutputDecorator implements Output {

    constructor(protected readonly output: Output) { }

    abstract write(content: string): void;

    getLastLineLength(): number {

        return this.output.getLastLineLength();
    }
}