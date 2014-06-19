async function namedFunction (a, b, c) {
    var x = await foo(a);

    if ( x === 3 ) {
        return;
    }

    var y = await bar(x);

    return baz(a + b + c + y + x);
}

var anonymousFunction = async function (a, b, c) {
    await foo(c);
    await bar(a);
    return baz(b);
};
