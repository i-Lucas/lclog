# poc-clog

Biblioteca de logging minimalista em TypeScript com saídas formatadas, banners, JSON e contexto encadeável.

## Visão geral

`poc-clog` fornece uma API simples e encadeável para enriquecer logs com contexto (arquivo, contexto, debug, trace), temas (cores/emoji), formatação de timestamps, renderizações em banner e saída JSON. Foi concebida para ser usada diretamente em projetos TypeScript/Node (pode ser consumida como fonte `src/index.ts`).

## Instalação

Instale via NPM (após publicação):

```bash
npm i lclog
```

Para desenvolvimento local, você pode executar o exemplo com `tsx`:

```bash
# instalação de dependências de execução (se necessário)
npm install
npx tsx src/index.ts
```

## Uso rápido

Importe o cliente `clog` e use os métodos encadeáveis:

```ts
import { Clog } from "lclog";

const clog = new Clog()

clog.info("Hello, World!");
clog.warning("This is a warning message.");
clog.error("This is an error message.");
clog.debug("Debugging information here.");
clog.success("Operation completed successfully.");

clog
  .file('user.service.ts')
  .context('UserService')
  .success('User created successfully');

clog.json({ user: 'John', age: 30 });

clog.banner('Deployment Complete', { color: 'success', width: 80, info: 'v1.0.0' });

clog.divider('=');
```

## API pública

- **`clog.file(file: string)`**: retorna uma instância com o campo `file` anexado ao contexto.
- **`clog.context(context: string)`**: adiciona um rótulo de contexto (por ex. nome da classe/subsistema).
- **`clog.debug(trace: string)`**, **`clog.trace(trace: string)`**: armazenam informações de debug/trace no contexto.

- Níveis de log (cada um registra a mensagem usando o tema apropriado):
  - `clog.info(message: string)`
  - `clog.success(message: string)`
  - `clog.warning(message: string)`
  - `clog.error(message: string)`

- **`clog.json(data: unknown, indent = 2)`**: converte o objeto em JSON formatado e escreve-o (tenta parse quando a entrada é string).
- **`clog.banner(message: string, options?: Partial<BannerOptions>)`**: desenha um banner centralizado; `options` aceita `width`, `color` e `info`.
- **`clog.divider(char = '─')`**: escreve uma linha divisória baseada no comprimento da última linha de saída.

## Estrutura e componentes

- **Facade**: `clog` exportado de `src/clog/clog.facade.ts` — interface encadeável para construir contexto e emitir logs.
- **Logger**: `ClogLogger` monta estratégias de renderização e delega a escrita para um `Output`.
- **Output**: Implementações de saída (ex.: `ConsoleOutput`) que definem como o conteúdo é escrito e calculam o comprimento da última linha (usado por `divider`).
- **Formatters**: `TimestampFormatter`, `DateTimeFormatter`, `JsonFormatter` — responsáveis por formatar datas e JSON.
- **Builders**: `ContextPartBuilder`, `LineBuilder`, `BannerBoxBuilder` — constroem partes do log e banners.
- **Processors**: `AnsiStripper` (limpa códigos ANSI), `TextDecorator` (aplica cor/estilo em textos).
- **Styling / Themes**: `ThemeProvider` oferece temas por nível (`info`, `success`, `warning`, `error`, `debug`) com `Color`, `Style` e `emoji`.

## Personalização

- Para mudar cores/estilos padrão, substitua/instancie `ThemeProvider` ao criar um `LoggerFactory` (se exposto) ou modifique `ThemeProvider` no código.
- Para direcionar saída a outro destino (arquivo, serviço remoto), implemente a interface `Output` (`write(content: string): void` e `getLastLineLength(): number`) e injete na `LoggerFactory`.

## Exemplos avançados

- Banner personalizado:

```ts
clog.banner('Release', { width: 60, color: 'success', info: 'v2.0.0' });
```

- Log com contexto encadeado:

```ts
clog.file('auth.ts').context('AuthService').debug('starting authentication').info('user authenticated');
```

## Contribuição

Abra issues e pull requests. Mantenha formato consistente e adicione testes/discussões para mudanças de API.

## Licença

MIT
