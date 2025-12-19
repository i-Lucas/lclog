import { Context } from "../context";
import { ThemeProvider } from "../styling";
import { ClogLogger } from "./clog-logger";
import { Logger } from "./logger.interface";
import { ConsoleOutput, Output } from "../output";

export class LoggerFactory {

    constructor(

        private readonly output: Output = new ConsoleOutput(),
        private readonly themeProvider: ThemeProvider = new ThemeProvider()

    ) { }

    create(context: Context): Logger {

        return new ClogLogger(context, this.output, this.themeProvider);
    }
}