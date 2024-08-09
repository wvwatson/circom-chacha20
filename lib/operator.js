"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLocalSnarkJsZkOperator = exports.makeRemoteSnarkJsZkOperator = void 0;
/**
 * Use for browser based environments, where we can't
 * load the WASM and zkey from the filesystem
 */
async function makeRemoteSnarkJsZkOperator({ zkeyUrl, circuitWasmUrl }, logger) {
    const [wasm, zkey] = await Promise.all([
        // the circuit WASM
        fetch(circuitWasmUrl)
            .then((r) => r.arrayBuffer()),
        fetch(zkeyUrl)
            .then((r) => r.arrayBuffer()),
    ]);
    // snarkjs needs to know that we're
    // in a browser environment
    if (typeof window !== 'undefined'
        && window.process === undefined) {
        // @ts-ignore
        window.process = { browser: true };
    }
    return _makeSnarkJsZKOperator({
        zkey: { data: new Uint8Array(zkey) },
        circuitWasm: new Uint8Array(wasm)
    }, logger);
}
exports.makeRemoteSnarkJsZkOperator = makeRemoteSnarkJsZkOperator;
/**
 * Make a ZK operator from the snarkjs dependency
 * @param logger
 * @returns
 */
async function makeLocalSnarkJsZkOperator(logger) {
    const { join } = await Promise.resolve().then(() => __importStar(require('path')));
    return _makeSnarkJsZKOperator({
        zkey: {
            data: join(__dirname, '../resources/circuit_final.zkey')
        },
        circuitWasm: join(__dirname, '../resources/circuit.wasm'),
    }, logger);
}
exports.makeLocalSnarkJsZkOperator = makeLocalSnarkJsZkOperator;
function _makeSnarkJsZKOperator({ circuitWasm, zkey }, logger) {
    // require here to avoid loading snarkjs in
    // any unsupported environments
    const snarkjs = require('snarkjs');
    return {
        groth16FullProve(input) {
            return snarkjs.groth16.fullProve(input, circuitWasm, zkey.data, logger);
        },
        async groth16Verify(publicSignals, proof) {
            if (!zkey.json) {
                zkey.json = await snarkjs.zKey.exportVerificationKey(zkey.data);
            }
            return snarkjs.groth16.verify(zkey.json, publicSignals, proof, logger);
        }
    };
}
