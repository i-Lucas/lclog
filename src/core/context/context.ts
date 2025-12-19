import { ContextData } from './context-data.interface';

export class Context {

    constructor(private readonly data: ContextData = {}) { }

    with(key: keyof ContextData, value: string): Context {

        return new Context({ ...this.data, [key]: value });
    }

    get(key: keyof ContextData): string | undefined {

        return this.data[key];
    }

    isEmpty(): boolean {

        return Object.keys(this.data).length === 0;
    }
}