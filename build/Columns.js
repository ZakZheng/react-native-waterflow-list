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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var Column_1 = require("./Column");
var Columns = function (_a, ref) {
    var columnsFlatListProps = _a.columnsFlatListProps, props = __rest(_a, ["columnsFlatListProps"]);
    var numColumns = props.numColumns;
    var _b = React.useState(false), addIteming = _b[0], setAddIteming = _b[1];
    var _c = React.useState(Array(numColumns)
        .fill('')
        .map(function () { return []; })), columns = _c[0], setColumns = _c[1];
    var columnsHeight = React.useMemo(function () { return Array(numColumns).fill(0); }, [numColumns]);
    var keysList = React.useMemo(function () { return []; }, []);
    var heightForItemAddItems = function (data) {
        var tempColumns = Array(numColumns)
            .fill([])
            .map(function () { return []; });
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            item._keyForItem_ = props.keyForItem(item);
            // 已经渲染则跳过
            if (checkIsExist(item._keyForItem_)) {
                continue;
            }
            // 获取总高度最小列
            var addItemValue = addItem(item);
            var height = props.heightForItem(item);
            columnsHeight[addItemValue.minColumnsIndex] += height;
            tempColumns = addItemValue.tempColumns;
        }
        return setColumns(tempColumns);
    };
    var addItems = function (data, isSyncHeightForItem) {
        if (isSyncHeightForItem === void 0) { isSyncHeightForItem = false; }
        if (data.length === 0) {
            return setAddIteming(false);
        }
        setAddIteming(true);
        var item = data.shift();
        item._keyForItem_ = props.keyForItem(item);
        // 已经渲染则跳过
        if (checkIsExist(item._keyForItem_)) {
            return addItems(data);
        }
        var tempColumns = addItem(item, addItems.bind(addItems, data), isSyncHeightForItem).tempColumns;
        setColumns(tempColumns);
    };
    var addItem = function (item, cb, isSyncHeightForItem) {
        if (isSyncHeightForItem === void 0) { isSyncHeightForItem = false; }
        var tempColumns = __spreadArrays(columns);
        // 获取总高度最小列
        var minColumnsIndex = __spreadArrays(columnsHeight).indexOf(Math.min.apply(Math, __spreadArrays(columnsHeight)));
        // 获取当前renderItem高度,获取后渲染下一个renderItem,直到全部渲染完毕
        if (typeof cb === 'function') {
            item.onLayout = function (e) { return __awaiter(void 0, void 0, void 0, function () {
                var height;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // 触发一次后销毁
                            item.onLayout = null;
                            height = 0;
                            if (!isSyncHeightForItem) return [3 /*break*/, 2];
                            return [4 /*yield*/, props.asyncHeightForItem(item)];
                        case 1:
                            height = _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            height = e.nativeEvent.layout.height;
                            _a.label = 3;
                        case 3:
                            columnsHeight[minColumnsIndex] += height;
                            cb();
                            return [2 /*return*/];
                    }
                });
            }); };
        }
        ;
        var currentColumn = tempColumns[minColumnsIndex];
        currentColumn.push(item);
        return { tempColumns: tempColumns, minColumnsIndex: minColumnsIndex };
    };
    // 清除所有renderItem
    var clear = function () {
        for (var index = 0; index < columnsHeight.length; index++) {
            columnsHeight[index] = 0;
        }
        keysList.splice(0, keysList.length);
        setColumns(Array(numColumns)
            .fill([])
            .map(function () { return []; }));
    };
    // 通过 _keyForItem_ 检查是否已经渲染
    var checkIsExist = React.useCallback(function (key) {
        var check = keysList.indexOf(key) !== -1;
        // 如果未渲染则保存key
        if (!check) {
            keysList.push(key);
        }
        return check;
    }, [columns, keysList]);
    React.useEffect(function () {
        if (!props.data.length) {
            return;
        }
        if (typeof props.heightForItem === 'function') {
            if (props.asyncHeightForItem) {
                addItems(props.data.slice(), true);
                return;
            }
            heightForItemAddItems(props.data.slice());
            return;
        }
        addItems(props.data.slice());
    }, [props.data]);
    React.useImperativeHandle(ref, function () { return ({
        clear: clear,
        addIteming: addIteming,
    }); });
    return (<react_native_1.FlatList data={columns} keyExtractor={function (columnItem) { return "item-" + columnItem._keyForItem_; }} onScroll={props.onEndReached} removeClippedSubviews={true} {...columnsFlatListProps} numColumns={props.numColumns} renderItem={function (_a) {
        var item = _a.item, index = _a.index;
        return <Column_1.Colunm columnFlatListProps={props.columnFlatListProps} key={"column-" + index} listKey={"column-" + index} keyExtractor={function (columnItem) { return "item-" + columnItem._keyForItem_; }} data={item} renderItem={props.renderItem}/>;
    }}/>);
};
exports.default = React.forwardRef(Columns);
//# sourceMappingURL=Columns.js.map