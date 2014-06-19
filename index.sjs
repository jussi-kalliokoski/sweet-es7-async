macro async {
    // declares a new async function, wrapping the body into a then-block
    rule { function $fparams {
        $fbody ...
    } } => {
        function $fparams {
            return Promise.resolve().then(function () {
                async $fbody...
            });
        }
    }

    // declares a new name async function, wrapping the body into a then-block
    rule { function $name:ident $fparams {
        $fbody ...
    } } => {
        function $name $fparams {
            return Promise.resolve().then(function () {
                async $fbody...
            });
        }
    }

    // declares a variable with the initial value of the result of the promise
    // and inserts the things after the await expression into a then-block
    rule { var $x:ident = await $y:expr $rest... } => {
        return $y.then(function ($x) {
            async $rest...
        });
    }

    // inserts things after the await expression into a then-block
    rule { await $y:expr $rest... } => {
        return $y.then(function () {
            async $rest...
        });
    }

    // cleans up the unnecessary semicolons created by the above rules
    rule { ; $rest } => {
        async $rest
    }

    // ignores unmatched tokens while processing the tokens after them
    rule { $y $rest } => {
        $y
        async $rest
    }

    // ignores the last token to be processed if it's unmatched
    rule { $rest } => { $rest }
}

export async
