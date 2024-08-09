"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padArray = exports.makeUint8Array = exports.padU8ToU32Array = exports.toUint8Array = exports.makeUintArray = exports.toUintArray = exports.REDACTION_CHAR_CODE = void 0;
// we use this to pad the ciphertext
exports.REDACTION_CHAR_CODE = '*'.charCodeAt(0);
function toUintArray(buf) {
    const arr = makeUintArray(buf.length / 4);
    const arrView = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arrView.getUint32(i * 4, true);
    }
    return arr;
}
exports.toUintArray = toUintArray;
function makeUintArray(init) {
    return typeof init === 'number'
        ? new Uint32Array(init)
        : Uint32Array.from(init);
}
exports.makeUintArray = makeUintArray;
/**
 * Convert a UintArray (uint32array) to a Uint8Array
 */
function toUint8Array(buf) {
    const arr = new Uint8Array(buf.length * 4);
    const arrView = new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    for (let i = 0; i < buf.length; i++) {
        arrView.setUint32(i * 4, buf[i], true);
    }
    return arr;
}
exports.toUint8Array = toUint8Array;
function padU8ToU32Array(buf) {
    if (buf.length % 4 === 0) {
        return buf;
    }
    return makeUint8Array([
        ...Array.from(buf),
        ...new Array(4 - buf.length % 4).fill(exports.REDACTION_CHAR_CODE)
    ]);
}
exports.padU8ToU32Array = padU8ToU32Array;
function makeUint8Array(init) {
    return typeof init === 'number'
        ? new Uint8Array(init)
        : Uint8Array.from(init);
}
exports.makeUint8Array = makeUint8Array;
function padArray(buf, size) {
    return makeUintArray([
        ...Array.from(buf),
        ...new Array(size - buf.length).fill(exports.REDACTION_CHAR_CODE)
    ]);
}
exports.padArray = padArray;
