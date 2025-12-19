import { Color } from '../styling/color';
import { Builder } from './builder.interface';

export class LineBuilder implements Builder<string> {

    private readonly parts: string[] = [];
    private readonly separator = Color.GRAY.apply(' → ');

    add(part: string): this {

        if (part.trim()) {

            this.parts.push(part);
        }

        return this;
    }

    build(): string {

        return this.parts.join(this.separator);
    }
}
