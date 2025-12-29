# reargv

Reads command-line arguments and returns a structured, representative object.

> **Note:** This module is intended to provide a lightweight alternative to full-featured argument management libraries such as [commander.js](https://www.npmjs.com/package/commander).  
> If you need a more fine-tuned or advanced CLI utility, consider using those instead of `reargv`.

## Installation

```bash
npm install reargv
```

## Usage

```js
import { reargv } from "reargv";

// Example:
process.argv = [
  null,
  null,
  ...[
    "hello",
    "--world",
    "reargv",
    "on.npm",
    '--and="this is great!"',
    "help",
    "VERSION",
    "-k8",
    "-x",
  ],
];

const argv = reargv();

console.log(argv);
```

### Output

```js
{
    options: {
      world: 'reargv',
      and: '"this is great!"',
      help: true,
      version: true,
      k: '8',
      x: true
    },
    files: [ 'on.npm' ],
    misc: [ 'hello' ]
}
```

---

## API

### `reargv(): ReArgVObject`

| Parameters | Returns |
|-----------|---------|
| / | A structured description of the command-line arguments |

### Returned object properties

- **options** — An object containing arguments introduced by dashes (`-` or `--`) or matched special arguments.
- **files** — An array of arguments recognized as file names.
- **misc** — An array of remaining arguments that are neither options nor files.

---

## License

[MIT © 2025](https://github.com/ManuUseGitHub/reargv?tab=MIT-1-ov-file#readme)
