"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkScrollEnd = exports.sleep = exports.isPromise = exports.flat = void 0;
var react_native_1 = require("react-native");
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
function checkScrollEnd(event) {
    var y = event.nativeEvent.contentOffset.y;
    var height = event.nativeEvent.layoutMeasurement.height;
    var contentHeight = event.nativeEvent.contentSize.height;
    return y + height >= contentHeight - react_native_1.Dimensions.get('screen').height;
}
exports.checkScrollEnd = checkScrollEnd;
//# sourceMappingURL=utils.js.map