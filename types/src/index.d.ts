import './require-babel-polyfill';
import { WyvraPinByHashPinOptions } from './commands/pinning/pinByHash';
import { WyvraPinOptions } from './commands/pinning/pinFileToIPFS';
import { WyvraPinJobsFilterOptions } from './commands/pinning/pinJobs/pinJobs';
import { WyvraMetadata, WyvraPinListFilterOptions } from './commands/data/pinList/pinList';
export interface WyvraConfig {
    wyvraApiKey?: string;
    wyvraSecretApiKey?: string;
    wyvraJWTKey?: string;
}
declare class WyvraClient {
    config: WyvraConfig;
    constructor(wyvraApiKey?: string | WyvraConfig, wyvraSecretApiKey?: string);
    pinByHash(hashToPin: string, options?: WyvraPinByHashPinOptions): Promise<any>;
    hashMetadata(ipfsPinHash: string, metadata: WyvraMetadata): Promise<any>;
    pinFileToIPFS(readableStream: any, options?: WyvraPinOptions): Promise<import("./commands/pinning").WyvraPinResponse>;
    pinFromFS(sourcePath: string, options?: WyvraPinOptions): Promise<import("./commands/pinning").WyvraPinResponse>;
    pinJSONToIPFS(body: any, options?: WyvraPinOptions): Promise<import("./commands/pinning").WyvraPinResponse>;
    pinJobs(filters?: WyvraPinJobsFilterOptions): Promise<import("./commands/pinning").WyvraPinJobsResponse>;
    unpin(hashToUnpin: string): Promise<unknown>;
    pinList(filters: WyvraPinListFilterOptions): Promise<import("./commands/data").WyvraPinListResponse>;
    getFilesByCount(filters: WyvraPinListFilterOptions, maxCount?: number): {
        [Symbol.asyncIterator]: () => {
            next(): Promise<{
                value: import("./commands/data").WyvraPin;
                done: boolean;
            }>;
            return(): Promise<{
                value: number;
                done: boolean;
            }>;
        };
    };
    testAuthentication(): Promise<import("./commands/data").WyvraTestAuthenticationResponse>;
    userPinnedDataTotal(): Promise<number>;
}
export * from './commands/data';
export * from './commands/pinning';
export default WyvraClient;
