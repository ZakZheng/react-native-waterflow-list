"use strict";
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
        // setColumns(tempColumns)
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
    var addItems = function (data) {
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
        var tempColumns = addItem(item, addItems.bind(addItems, data)).tempColumns;
        setColumns(tempColumns);
    };
    var addItem = function (item, cb) {
        var tempColumns = __spreadArrays(columns);
        // 获取总高度最小列
        var minColumnsIndex = __spreadArrays(columnsHeight).indexOf(Math.min.apply(Math, __spreadArrays(columnsHeight)));
        // 获取当前renderItem高度,获取后渲染下一个renderItem,直到全部渲染完毕
        if (typeof cb === 'function') {
            item.onLayout = function (e) {
                // 触发一次后销毁
                item.onLayout = null;
                var height = e.nativeEvent.layout.height;
                columnsHeight[minColumnsIndex] += height;
                cb();
            };
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
        if (typeof props.heightForItem === 'function') {
            return heightForItemAddItems(props.data.slice());
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