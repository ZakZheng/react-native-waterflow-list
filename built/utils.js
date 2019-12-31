"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 扁平化数组
function flat(arr) {
    var arrResult = [];
    arr.forEach(function (item) {
        if (Array.isArray(item)) {
            arrResult = arrResult.concat(flat(item)); // 递归
            // 或者用扩展运算符
            // arrResult.push(...arguments.callee(item));
        }
        else {
            arrResult.push(item);
        }
    });
    return arrResult;
}
exports.flat = flat;
function isPromise(e) {
    return !!e && typeof e.then === 'function';
}
exports.isPromise = isPromise;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
;
//# sourceMappingURL=utils.js.map