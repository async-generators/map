# map
![logo](https://avatars1.githubusercontent.com/u/31987273?v=4&s=100)

map items of an iterable sequence to another value

[![NPM version][npm-image]][npm-url]
[![Travis Status][travis-image]][travis-url]
[![Travis Status][codecov-image]][codecov-url]

## Usage

_package requires a system that supports async-iteration, either natively or via down-compiling_

### Install
```
npm install @async-generators/map --save
yarn add @async-generators/map
```

This package's `main` entry points to a `commonjs` distribution. 

Additionally, the `module` entry points to a `es2015` distribution, which can be used by build systems, such as webpack, to directly use es2015 modules. 

## Api

### map(source, selector)

<code>map()</code> iterates the source and yields `await selector(item, index)`

`source` must have a `[Symbol.asyncIterator]` or `[Symbol.iterator]` property. If both are present only `[Symbol.asyncIterator]` is used. 

`selector(item, index)` should return the object to yield.  The second parameter is the `index` of the item as it appeared in the source sequence. 

## Example

example.js
```js
const map = require('@async-generators/map').default;

async function main() {

  async function* source() {
    yield "hello"; yield "world";
  }

  let mapped = map(source(),
    (x, i) => {
      return {
        value: x.toString(),
        index: i
      }
    });

  for await (let item of mapped) {
    console.log(item);
  }
}

main();
```

Execute with the latest node.js: 

```
node --harmony-async-iteration example.js
```


output:
```
{ value: 'hello', index: 0 }
{ value: 'world', index: 1 }
```
## Typescript

This library is fully typed and can be imported using: 

```ts
import filter from '@async-generators/map');
```

It is also possible to directly execute your [properly configured](https://stackoverflow.com/a/43694282/1657476) typescript with [ts-node](https://www.npmjs.com/package/ts-node):

```
ts-node --harmony_async_iteration foo.ts
```

[npm-url]: https://npmjs.org/package/@async-generators/map
[npm-image]: https://img.shields.io/npm/v/@async-generators/map.svg
[npm-downloads]: https://img.shields.io/npm/dm/@async-generators/map.svg
[travis-url]: https://travis-ci.org/async-generators/map
[travis-image]: https://img.shields.io/travis/async-generators/map/master.svg
[codecov-url]: https://codecov.io/gh/async-generators/map
[codecov-image]: https://codecov.io/gh/async-generators/map/branch/master/graph/badge.svg
