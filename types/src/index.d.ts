import './require-babel-polyfill';
import { LyraPinByHashPinOptions } from './commands/pinning/pinByHash';
import { LyraPinOptions } from './commands/pinning/pinFileToIPFS';
import { LyraPinJobsFilterOptions } from './commands/pinning/pinJobs/pinJobs';
import { LyraMetadata, LyraPinListFilterOptions } from './commands/data/pinList/pinList';
export interface LyraConfig {
    lyraApiKey?: string;
    lyraSecretApiKey?: string;
    lyraJWTKey?: string;
}
declare class LyraClient {
    config: LyraConfig;
    constructor(lyraApiKey?: string | LyraConfig, lyraSecretApiKey?: string);
    pinByHash(hashToPin: string, options?: LyraPinByHashPinOptions): Promise<any>;
    hashMetadata(ipfsPinHash: string, metadata: LyraMetadata): Promise<any>;
    pinFileToIPFS(readableStream: any, options?: LyraPinOptions): Promise<import("./commands/pinning").LyraPinResponse>;
    pinFromFS(sourcePath: string, options?: LyraPinOptions): Promise<import("./commands/pinning").LyraPinResponse>;
    pinJSONToIPFS(body: any, options?: LyraPinOptions): Promise<import("./commands/pinning").LyraPinResponse>;
    pinJobs(filters?: LyraPinJobsFilterOptions): Promise<import("./commands/pinning").LyraPinJobsResponse>;
    unpin(hashToUnpin: string): Promise<unknown>;
    pinList(filters: LyraPinListFilterOptions): Promise<import("./commands/data").LyraPinListResponse>;
    getFilesByCount(filters: LyraPinListFilterOptions, maxCount?: number): {
        [Symbol.asyncIterator]: () => {
            next(): Promise<{
                value: import("./commands/data").LyraPin;
                done: boolean;
            }>;
            return(): Promise<{
                value: number;
                done: boolean;
            }>;
        };
    };
    testAuthentication(): Promise<import("./commands/data").LyraTestAuthenticationResponse>;
    userPinnedDataTotal(): Promise<number>;
}
export * from './commands/data';
export * from './commands/pinning';
export default LyraClient;
