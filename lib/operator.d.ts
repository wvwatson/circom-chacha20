import { Logger, ZKOperator } from "./types";
type RemoteSnarkJsOperatorOpts = {
    zkeyUrl: string;
    circuitWasmUrl: string;
};
/**
 * Use for browser based environments, where we can't
 * load the WASM and zkey from the filesystem
 */
export declare function makeRemoteSnarkJsZkOperator({ zkeyUrl, circuitWasmUrl }: RemoteSnarkJsOperatorOpts, logger?: Logger): Promise<ZKOperator>;
/**
 * Make a ZK operator from the snarkjs dependency
 * @param logger
 * @returns
 */
export declare function makeLocalSnarkJsZkOperator(logger?: Logger): Promise<ZKOperator>;
export {};
