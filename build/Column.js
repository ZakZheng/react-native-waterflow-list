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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
function Colunm(_a) {
    var columnFlatListProps = _a.columnFlatListProps, props = __rest(_a, ["columnFlatListProps"]);
    return (<react_native_1.FlatList removeClippedSubviews={true} style={{ flex: 1 }} {...columnFlatListProps} {...props} renderItem={function (_a) {
        var item = _a.item, index = _a.index;
        return <react_native_1.View onLayout={item.onLayout}>
          {props.renderItem({ item: item, index: index })}
        </react_native_1.View>;
    }}/>);
}
exports.Colunm = Colunm;
//# sourceMappingURL=Column.js.map