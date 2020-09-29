"use strict";

class StringBuilder {
    constructor(str) {
        this.baseString = str;
    }
    get value() {
        return this.baseString;
    }
    set value(newStr) {
        this.baseString = newStr;
    }

    append(addstr) {
        const endStr = this.baseString + addstr; //this.baseString.concat(addstr);
        this.value = endStr;
        return this;
    }
    prepend(addstr) {
        const startStr = addstr + this.value; //addstr.concat(this.value);
        this.value = startStr;
        return this;
    }
    pad(addstr) {
        const fullStr = addstr + this.value + addstr; //addstr.concat(this.value, addstr);
        this.value = fullStr;
        return this;
    }
}

const builder = new StringBuilder(".");

builder.append("^").prepend("^").pad("=");

console.log(builder); // '=^.^='
