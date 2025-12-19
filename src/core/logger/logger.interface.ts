import { BannerOptions } from "../strategies";

export interface Logger {

    log(level: string, message: string): void;
    json(data: unknown, indent?: number): void;
    banner(message: string, options?: Partial<BannerOptions>): void;
    divider(char?: string): void;
}