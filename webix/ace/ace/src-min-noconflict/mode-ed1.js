ace.define("ace/mode/ed1_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var ED1HighlightRules = function() {
        var keywordControls = (
            "sino|devolver|inicio|fin|si|mientras|para|repetir|que|hasta|hacer|entonces|funcion|entonces|segun|cada|romper|continuar"
        );

        var storageType = (
            "entero|real|cadena|nuevo|malloc|imprimir|leer|aleatorio|vector|matriz|free|liberar|caso|longitud"
        );

        var builtinConstants = (
            "nulo|indefinido|verdadero|falso"
        );

        var keywordMapper = this.createKeywordMapper({
            "keyword.control": keywordControls,
            "constant.language" : storageType,
            "constant.other": builtinConstants
        }, "identifier", true);

        this.$rules = {
            "start" : [
                {
                    token : "comment",
                    regex : "//",
                    next : "singleLineComment"
                }, {
                    token : "comment", // multi line comment
                    regex : "\\/\\*",
                    next : "comment"
                }, {
                    token : "string",           // " string
                    regex : '".*?"'
                }, {
                    token : "string",           // ' string
                    regex : "'.*?'"
                }, {
                    token : "constant.numeric", // float
                    regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b",
                }, {
                    token : keywordMapper,
                    regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                }, {
                    token : "keyword.operator",
                    regex : "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|new|delete|typeof|void)"
                }, {
                    token : "paren.lparen",
                    regex : "[\\(]"
                }, {
                    token : "paren.rparen",
                    regex : "[\\)]"
                }, {
                    token : "text",
                    regex : "\\s+"
                } ],
                "comment" : [
                    {
                        token : "comment", // closing comment
                        regex : ".*?\\*\\/",
                        next : "start"
                    }, {
                        token : "comment", // comment spanning whole line
                        regex : ".+"
                    }
                ],
                "singleLineComment" : [
                    {
                        token : "comment",
                        regex : /\\$/,
                        next : "singleLineComment"
                    }, {
                        token : "comment",
                        regex : /$/,
                        next : "start"
                    }, {
                        defaultToken: "comment"
                    }
                ]
        };
    };

    oop.inherits(ED1HighlightRules, TextHighlightRules);

    exports.ED1HighlightRules = ED1HighlightRules;
});

ace.define("ace/mode/ed1",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/ed1_highlight_rules","ace/range"], function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var ED1HighlightRules = require("./ed1_highlight_rules").ED1HighlightRules;
    var Range = require("../range").Range;

    var Mode = function() {
        this.HighlightRules = ED1HighlightRules;
    };
    oop.inherits(Mode, TextMode);

    (function() {

        this.lineCommentStart = "--";

        this.$id = "ace/mode/ed1";
    }).call(Mode.prototype);

    exports.Mode = Mode;

});
