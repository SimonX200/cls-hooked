'use strict';

const { expect } = require('chai');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function t2(l) {
  if (l > 1) {
  }
}

describe('cls performance leak', function () {
  this.timeout(200000);

  const cls = require('../index');

  it('Execute ns.runPromise', async () => {
    const INNER_LOOPS = 100;
    const REPEATS = 1000;
    const ns = cls.createNamespace('abc');
    let base_limit;
    let last_limit;
    let count_above_base = 0;
    await sleep(1000);
    for (let i = 0; i < REPEATS; i++) {
      await sleep(10);
      const start = Date.now();
      for (let j = 0; j < INNER_LOOPS; j++) {
        await ns.runPromise(t2);
      }
      const avr_dur = (Date.now() - start) / INNER_LOOPS;
      if (i === 0) {
        base_limit = (avr_dur + 0.5) * 2;
        last_limit = base_limit;
      } else {
        if (avr_dur > base_limit + 0.1) {
          if (avr_dur > last_limit) {
            count_above_base++;
            last_limit = avr_dur;
          }
        } else if (avr_dur < base_limit - 0.1) {
          count_above_base = 0;
        }

        expect(count_above_base).below(15);
        console.log(i, count_above_base, avr_dur, base_limit);
      }
    }
  });
});
