import { Formatter } from './formatter.interface';

export class JsonFormatter implements Formatter<unknown> {

    format(data: unknown, indent = 2): string {

        try {

            const parsed = typeof data === 'string' ? JSON.parse(data) : data;
            return JSON.stringify(parsed, null, indent);

        } catch {

            return String(data);
        }
    }
}
