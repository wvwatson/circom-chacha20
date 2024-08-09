import { UintArray } from "./types";
export declare const REDACTION_CHAR_CODE: number;
export declare function toUintArray(buf: Uint8Array): Uint32Array;
export declare function makeUintArray(init: number | number[]): Uint32Array;
/**
 * Convert a UintArray (uint32array) to a Uint8Array
 */
export declare function toUint8Array(buf: UintArray): Uint8Array;
export declare function padU8ToU32Array(buf: Uint8Array): Uint8Array;
export declare function makeUint8Array(init: number | number[]): Uint8Array;
export declare function padArray(buf: UintArray, size: number): UintArray;
