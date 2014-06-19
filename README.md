# sweet-es7-promise

[![Build Status](https://travis-ci.org/jussi-kalliokoski/sweet-es7-async.svg)](https://travis-ci.org/jussi-kalliokoski/sweet-es7-async.js)

A sweet.js macro for [ES7 async functions](http://jakearchibald.com/2014/es7-async-functions/).

You're probably better off using the [Traceur Compiler](http://jakearchibald.com/2014/es7-async-functions/), but this is a fun experiment.

## Usage

```javascript
var getComments = async function (postId) {
    var response = await fetch("/posts/" + postId);

    if ( response.headers["X-Has-No-Comments"] ) {
        return;
    }

    var post = await response.body.to("json");
    return post.comments;
};
```

Translates to:

```javascript
var getComments = function (postId) {
    return Promise.resolve().then(function () {
        return fetch("/posts/" + postId).then(function (response) {
            if ( response.headers["X-Has-No-Comments"] ) {
                return;
            }

            return response.body.to("json").then(function (post) {
                return post.comments;
            });
        });
    });
};
```

## Missing features

* try-catch blocks with await.
