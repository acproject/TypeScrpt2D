export var ETokenType;
(function (ETokenType) {
    ETokenType[ETokenType["NONE"] = 0] = "NONE";
    ETokenType[ETokenType["STRING"] = 1] = "STRING";
    ETokenType[ETokenType["NUMBER"] = 2] = "NUMBER";
})(ETokenType || (ETokenType = {}));
var Doom3Token = /** @class */ (function () {
    function Doom3Token() {
        this._charArr = [];
        // this._type = ETokenType.NONE;
        // this._charArr.length = 0;
        // this._val = 0.0;
        this.reset();
    }
    Doom3Token.prototype.reset = function () {
        this._charArr.length = 0;
        this._type = ETokenType.NONE;
        this._val = 0.0;
    };
    Object.defineProperty(Doom3Token.prototype, "type", {
        //这里的get表示只读属性，对应readonly；如果是只写就用set
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Doom3Token.prototype.getString = function () {
        return this._charArr.join("");
    };
    Doom3Token.prototype.getFloat = function () {
        return this._val;
    };
    Doom3Token.prototype.getInt = function () {
        // 第二个参数表示使用10进制
        return parseInt(this._val.toString(), 10);
    };
    Doom3Token.prototype.isString = function (str) {
        var count = this._charArr.length;
        if (str.length !== count) {
            return false;
        }
        for (var i = 0; i < count; i++) {
            if (this._charArr[i] !== str[i]) {
                return false;
            }
        }
        return true;
    };
    /**
     * 下面的方法都是接口没有定义的
     *
     */
    Doom3Token.prototype.addChar = function (c) {
        this._charArr.push(c);
    };
    Doom3Token.prototype.setVal = function (num) {
        this._val = num;
        this._type = ETokenType.NUMBER;
    };
    Doom3Token.prototype.setType = function (type) {
        this._type = type;
    };
    return Doom3Token;
}());
var Doom3Tokenzier = /** @class */ (function () {
    function Doom3Tokenzier() {
        this._current = new Doom3Token();
        this._digts = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this._whiteSpaces = [' ', '\t', '\v', '\n', '\r'];
        this._source = ' Doom3Tokenizer ';
        this._currIdx = 0;
    }
    Doom3Tokenzier.prototype.moveNext = function () {
        return this.getNextToken(this._current);
    };
    Object.defineProperty(Doom3Tokenzier.prototype, "current", {
        get: function () {
            return this.current;
        },
        enumerable: true,
        configurable: true
    });
    Doom3Tokenzier.prototype.setSource = function (source) {
        this._source = source;
        this._currIdx = 0;
    };
    Doom3Tokenzier.prototype.reset = function () {
        this._currIdx = 0;
    };
    Doom3Tokenzier.prototype._isDigit = function (c) {
        for (var i = 0; i < this._digts.length; i++) {
            if (c === this._digts[i]) {
                return true;
            }
        }
        return false;
    };
    Doom3Tokenzier.prototype._isWhiteSpace = function (c) {
        for (var i = 0; i < this._whiteSpaces.length; i++) {
            if (c === this._whiteSpaces[i]) {
                return true;
            }
        }
        return false;
    };
    Doom3Tokenzier.prototype._getChar = function () {
        if (this._currIdx >= 0 && this._currIdx < this._source.length) {
            return this._source.charAt(this._currIdx++);
        }
        return "";
    };
    Doom3Tokenzier.prototype._peekChar = function () {
        if (this._currIdx >= 0 && this._currIdx < this._source.length) {
            return this._source.charAt(this._currIdx);
        }
        return "";
    };
    Doom3Tokenzier.prototype._ungetChar = function () {
        if (this._currIdx > 0) {
            --this._currIdx;
        }
    };
    Doom3Tokenzier.prototype.getNextToken = function (tok) {
        var token = tok;
        var c = "";
        token.reset();
        do {
            c = this._skipWhitespace();
            if (c === '/' && this._peekChar() === '/') {
                c = this._skipComments0();
            }
            else if (c === '/' && this._peekChar() === '*') {
                c = this._skipComments1();
            }
            else if (this._isDigit(c) || c === '-' || (c === '.' && this._isDigit(this._peekChar()))) {
                this._ungetChar();
                this._getNumber(token);
                return true;
            }
            else if (c === '\"' || c === '\' ') {
                this._getSubstring(token, c);
                return true;
            }
            else if (c.length > 0) {
                this._ungetChar();
                this._getString(token);
                return true;
            }
        } while (c.length > 0);
        return false;
    };
    Doom3Tokenzier.prototype._skipWhitespace = function () {
        var c = "";
        do {
            c = this._getChar();
        } while (c.length > 0 && this._isWhiteSpace(c));
        return c;
    };
    Doom3Tokenzier.prototype._skipComments0 = function () {
        var c = "";
        do {
            c = this._getChar();
        } while (c.length > 0 && c !== '\n');
        return c;
    };
    Doom3Tokenzier.prototype._skipComments1 = function () {
        var c = "";
        c = this._getChar();
        do {
            c = this._getChar();
        } while (c.length > 0 && (c !== '*' || this._peekChar() !== '/'));
        c = this._getChar();
        return c;
    };
    Doom3Tokenzier.prototype._getNumber = function (token) {
        var val = 0.0;
        var isFloat = false;
        var scaleValue = 0.1;
        var c = this._getChar();
        var isNegate = (c === '-');
        var consumed = false;
        var ascii0 = '0'.charCodeAt(0);
        do {
            token.addChar(c);
            if (c === '.') {
                isFloat = true;
            }
            else if (c !== '-') {
                var ascii = c.charCodeAt(0);
                var vc = (ascii - ascii0);
                if (!isFloat) {
                    val = 10 * val + vc;
                }
                else {
                    val = val + scaleValue * vc;
                    scaleValue *= 0.1;
                }
                if (consumed === true) {
                    this._getChar();
                }
                c = this._peekChar();
                consumed = true;
            }
        } while (c.length > 0 && (this._isDigit(c) || (!isFloat && c === '.')));
        if (isNegate) {
            val = -val;
        }
        token.setVal(val);
    };
    Doom3Tokenzier.prototype._getSubstring = function (token, endChar) {
        var end = false;
        var c = '';
        token.setType(ETokenType.STRING);
        do {
            c = this._getChar();
            if (c === endChar) {
                end = true;
            }
            else {
                token.addChar(c);
            }
        } while (c.length > 0 && c !== '\n' && !end);
    };
    Doom3Tokenzier.prototype._getString = function (token) {
        var c = this._getChar();
        token.setType(ETokenType.STRING);
        do {
            token.addChar(c);
            if (!this._isSpecialChar(c)) {
                c = this._getChar();
            }
        } while (c.length > 0 && !this._isWhiteSpace(c) && !this._isSpecialChar(c));
    };
    Doom3Tokenzier.prototype._isSpecialChar = function (c) {
        switch (c) {
            case '(':
                return true;
            case ')':
                return true;
            case '[':
                return true;
            case ']':
                return true;
            case '{':
                return true;
            case '}':
                return true;
            case ',':
                return true;
            case '.':
                return true;
        }
        return false;
    };
    Doom3Tokenzier.prototype.createIDoom3Token = function () {
        return new Doom3Token();
    };
    return Doom3Tokenzier;
}());
var Doom3Factory = /** @class */ (function () {
    function Doom3Factory() {
    }
    Doom3Factory.createDoom3Tokenizer = function () {
        var ret = new Doom3Tokenzier();
        return ret;
    };
    return Doom3Factory;
}());
export { Doom3Factory };
