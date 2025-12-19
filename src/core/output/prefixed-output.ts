import { Output } from "./output.interface";
import { OutputDecorator } from "./output-decorator";

export class PrefixedOutput extends OutputDecorator {

    constructor(output: Output, private readonly prefix: string) {

        super(output);
    }

    write(content: string): void {

        const prefixed = content
            .split('\n')
            .map(line => line ? `${this.prefix}${line}` : line)
            .join('\n');

        this.output.write(prefixed);
    }
}