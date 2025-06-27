const assert = require("assert");
// Утилитная функция из code.js
const { calculateBalance } = require("../code.js");

describe("Функция calculateBalance", () => {

  it("должна корректно считать разницу для положительных чисел", () => {
    assert.strictEqual(calculateBalance(200, 150), 50);
    assert.strictEqual(calculateBalance(0, 0), 0);
  });

  it("должна возвращать отрицательное значение при expense > income", () => {
    assert.strictEqual(calculateBalance(100, 120), -20);
  });

  it("должна обрабатывать null или undefined как 0", () => {
    assert.strictEqual(calculateBalance(null, 50), -50);
    assert.strictEqual(calculateBalance(100, undefined), 100);
  });

  it("должна возвращать 0 при обоих аргументах null/undefined", () => {
    assert.strictEqual(calculateBalance(null, undefined), 0);
  });

});
