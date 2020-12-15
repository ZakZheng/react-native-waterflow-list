"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colunm = void 0;
var React = require("react");
var react_native_1 = require("react-native");
function Colunm(_a) {
    var columnFlatListProps = _a.columnFlatListProps, renderItem = _a.renderItem, props = __rest(_a, ["columnFlatListProps", "renderItem"]);
    return (<react_native_1.FlatList removeClippedSubviews={true} {...props} {...columnFlatListProps} style={[{ flex: 1, }, __assign({}, columnFlatListProps === null || columnFlatListProps === void 0 ? void 0 : columnFlatListProps.style)]} renderItem={function (_a) {
        var item = _a.item, index = _a.index;
        return <react_native_1.View key={item._keyForItem_} onLayout={item.onLayout}>
          {renderItem({ item: item, index: index })}
        </react_native_1.View>;
    }}/>);
}
exports.Colunm = Colunm;
//# sourceMappingURL=Column.js.map