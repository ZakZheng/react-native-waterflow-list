"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Columns_1 = require("./Columns");
var utils_1 = require("./utils");
var WaterFlow = function (props, ref) {
    var data = props.data || [];
    var WaterflowRef = React.useRef({});
    /**
     * 上拉加载, 传入一个 Promise 回调, 请求完成后才允许再次触发回调
     * 如果回调不为一个 Promise 对象, 则不做拦截处理
     */
    var onEndReached = React.useCallback((function () {
        var loading = false;
        // 使用 onScroll 代替 onEndReached, 避免有时无法触发 bug
        return function (event, cb) { return __awaiter(void 0, void 0, void 0, function () {
            var tempCb, err_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // 请求中和 renderItem 未加载完全时无法再次触发回调
                        if (loading || ((_a = WaterflowRef.current) === null || _a === void 0 ? void 0 : _a.addIteming)) {
                            return [2 /*return*/];
                        }
                        ;
                        if (!utils_1.checkScrollEnd(event)) return [3 /*break*/, 6];
                        loading = true;
                        if (!(typeof cb === 'function')) return [3 /*break*/, 6];
                        tempCb = cb();
                        if (!utils_1.isPromise(tempCb)) return [3 /*break*/, 5];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, tempCb];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.error(err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        loading = false;
                        return [3 /*break*/, 6];
                    case 5:
                        loading = false;
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    })(), []);
    React.useImperativeHandle(ref, function () {
        var _a, _b;
        return ({
            clear: (_a = WaterflowRef.current) === null || _a === void 0 ? void 0 : _a.clear,
            addIteming: (_b = WaterflowRef.current) === null || _b === void 0 ? void 0 : _b.addIteming,
        });
    });
    return (<Columns_1.default {...props} ref={WaterflowRef} data={data} onEndReached={function (e) { return onEndReached(e, props.onEndReached); }}/>);
};
exports.default = React.forwardRef(WaterFlow);
//# sourceMappingURL=index.js.map