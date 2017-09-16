import equal from '@async-generators/equal';
import map from '../src';
import { expect } from 'chai';

describe("@async-generator/filter", () => {
  it("should throw error if source is not iterable", async () => {
    let error: Error;
    try {
      for await (const _ of map(<any>{}, x => x));
    } catch (err) {
      error = err.message;
    }
    expect(error).to.be.eq("source parameter is not iterable");
  })

  it("should pass item index (sequence order) of value to predicate", async () => {
    let source = async function* () {
      yield "a"; yield "b"; yield "c"; yield "d";
    }
    let index = 0;
    let expected = [0, 1, 2, 3];
    let result = [];

    for await (const _ of map(source(), (x, i) => { result.push(i); return true }));

    expect(expected).to.be.eql(result);
  })

  it("should yield selector(item)", async () => {
    let source = async function* () {
      yield 1; yield 2; yield 3; yield 4;
    }
    
    let expected = async function* () {
      yield { x: "1", i: 0 };
      yield { x: "2", i: 1 };
      yield { x: "3", i: 2 };
      yield { x: "4", i: 3 };
    }

    expect(await
      equal(
        expected(),
        map(source(), (x, i) => { return { x: x.toString(), i: i } }),
        (a, b) => a.i === b.i && a.x === b.x
      )).to.be.true;
  });
})
