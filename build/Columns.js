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
    var minColumnsIndex = React.useMemo(function () { return 0; }, [numColumns]);
    var keysList = React.useMemo(function () { return []; }, [numColumns]);
    var addItems = function (data) {
        if (data.length === 0) {
            return setAddIteming(false);
        }
        setAddIteming(true);
        var item = data.shift();
        // 已经渲染则跳过
        if (checkIsExist(item)) {
            return addItems(data);
        }
        var _columns = addItem(item, addItems.bind(addItems, data))._columns;
        setColumns(_columns);
    };
    var addItem = function (item, cb) {
        var _columns = __spreadArrays(columns);
        item._keyForItem_ = props.keyForItem(item);
        keysList.push(item._keyForItem_);
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
        // 获取总高度最小列
        minColumnsIndex = __spreadArrays(columnsHeight).indexOf(Math.min.apply(Math, __spreadArrays(columnsHeight)));
        var currentColumn = _columns[minColumnsIndex];
        currentColumn.push(item);
        return { _columns: _columns, minColumnsIndex: minColumnsIndex };
    };
    // 清除所有renderItem
    var clear = function () {
        for (var index = 0; index < columnsHeight.length; index++) {
            columnsHeight[index] = 0;
        }
        keysList = [];
        setColumns(Array(numColumns)
            .fill([])
            .map(function () { return []; }));
    };
    // 通过 _keyForItem_ 检查是否已经渲染
    var checkIsExist = React.useCallback(function (item) {
        var checkIsExist = keysList.indexOf(props.keyForItem(item)) !== -1;
        return checkIsExist;
    }, [columns]);
    React.useEffect(function () {
        if (typeof props.heightForItem === 'function') {
            var _columns = Array(numColumns)
                .fill([])
                .map(function () { return []; });
            setColumns(_columns);
            for (var _i = 0, _a = props.data; _i < _a.length; _i++) {
                var item = _a[_i];
                // 已经渲染则跳过
                if (checkIsExist(item)) {
                    continue;
                }
                // 获取总高度最小列
                var addItemValue = addItem(item);
                var height = props.heightForItem(item);
                columnsHeight[addItemValue.minColumnsIndex] += height;
                _columns = addItemValue._columns;
            }
            return setColumns(_columns);
        }
        addItems(props.data.slice());
    }, [props.data]);
    React.useImperativeHandle(ref, function () { return ({
        clear: clear,
        addIteming: addIteming,
    }); });
    return (<react_native_1.FlatList keyExtractor={function (item, index) {
        return "item-" + index;
    }} data={columns} onScroll={props.onEndReached} 
    // style={{
    //   flex: 1,
    // }}
    removeClippedSubviews={true} {...columnsFlatListProps} numColumns={props.numColumns} renderItem={function (_a) {
        var item = _a.item, index = _a.index;
        return <Column_1.Colunm columnFlatListProps={props.columnFlatListProps} key={"column-" + index} listKey={"column-" + index} data={item} renderItem={props.renderItem}/>;
    }}/>);
};
exports.default = React.forwardRef(Columns);
//# sourceMappingURL=Columns.js.map