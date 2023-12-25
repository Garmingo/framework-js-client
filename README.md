# FiveM Framework Library (client-side)
This library allows you to easily interact with the servers framework, without writing the same code over and over again for each framework.

## Installation

```bash
npm install @garmingo/framework-js-client
```

## Supported Frameworks
 * ESX Legacy
 * ESX Infinity
 * QBCore
 * Custom implementations

## Usage
```typescript
import { Framework } from '@garmingo/framework-js-client';

const framework = new Framework();

framework.getPlayerJobName();
framework.getPlayerJobGrade();
...
```


## Docs
[Project setup and usage](https://docs.garmingo.com/purchase-and-installation/frameworks)

[Type reference](https://tsdocs.dev/docs/@garmingo/framework-js-client/)

## Other packages
https://github.com/Garmingo/framework-js-server

https://github.com/Garmingo/FrameworkLibraryNET

https://github.com/Garmingo/framework-lua
