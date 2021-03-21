'use strict';

// Must be called with to fail: process.env.NODE_OPTIONS="--max-old-space-size=15"

async function t2(l) {
  if (l > 1) {
  }
}

describe('cls memory leak', function () {
  this.timeout(200000);

  const cls = require('../index');

  it('Execute ns.runPromise many times', async () => {
    const ns = cls.createNamespace('abc');
    for (let i = 0; i < 100000; i++) {
      await ns.runPromise(t2);
    }
  });
});
