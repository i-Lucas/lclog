import { Theme } from './theme';
import { Color } from './color';
import { Style } from './style';

export class ThemeProvider {

    private readonly themes = new Map<string, Theme>([

        ['info', new Theme(Color.CYAN, Style.BOLD, 'ℹ️ ')],
        ['success', new Theme(Color.GREEN, Style.BOLD, '✅')],
        ['warning', new Theme(Color.YELLOW, Style.BOLD, '⚠️ ')],
        ['error', new Theme(Color.RED, Style.BOLD, '❌')],
        ['debug', new Theme(Color.GRAY, Style.ITALIC, '🔥')]
    ]);

    get(level: string): Theme {

        return this.themes.get(level) || this.themes.get('info')!;
    }
}