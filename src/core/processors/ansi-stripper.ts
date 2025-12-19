import { TextProcessor } from './text-processor.interface';

export class AnsiStripper implements TextProcessor {

    process(text: string): string {

        return text.replace(/\x1b\[[0-9;]*m/g, '');
    }
}