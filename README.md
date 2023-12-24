# FiveM Framework Library (client-side)
This library allows you to easily interact with the servers framework, without writing the same code over and over again for each framework.

## Installation

```bash
npm install @garmingo/framework-js-client
```

## Usage
```typescript
import { Framework } from '@garmingo/framework-js-client';

const framework = new Framework();

framework.getPlayerJobName();
framework.getPlayerJobGrade();
...
```


## License

https://github.com/Garmingo/Framework-Library/blob/main/LICENSE.md