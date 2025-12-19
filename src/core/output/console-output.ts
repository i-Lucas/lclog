import { Output } from "./output.interface";
import { AnsiStripper } from "../processors";

export class ConsoleOutput implements Output {

    private lastLineLength = 0;

    write(content: string): void {

        this.updateLastLineLength(content);
        console.log(content);
    }

    getLastLineLength(): number {

        return this.lastLineLength;
    }

    private updateLastLineLength(content: string): void {

        const stripper = new AnsiStripper();
        const lines = content.split('\n');
        const lastLine = lines[lines.length - 1] || '';
        this.lastLineLength = stripper.process(lastLine).length;
    }
}