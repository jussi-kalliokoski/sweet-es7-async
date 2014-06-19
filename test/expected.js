function namedFunction(a, b, c) {
    return Promise.resolve().then(function () {
        return foo(a).then(function (x) {
            if (x === 3) {
                return;
            }
            return bar(x).then(function (y) {
                return baz(a + b + c + y + x);
            });
        });
    });
}
var anonymousFunction = function (a, b, c) {
    return Promise.resolve().then(function () {
        return foo(c).then(function () {
            return bar(a).then(function () {
                return baz(b);
            });
        });
    });
};