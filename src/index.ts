import './require-babel-polyfill';
import pinByHash, {
    WyvraPinByHashPinOptions
} from './commands/pinning/pinByHash';
import hashMetadata from './commands/pinning/hashMetadata';
import pinFileToIPFS, {
    WyvraPinOptions
} from './commands/pinning/pinFileToIPFS';
import pinFromFS from './commands/pinning/pinFromFS';
import pinJSONToIPFS from './commands/pinning/pinJSONToIPFS';
import pinJobs, {
    WyvraPinJobsFilterOptions
} from './commands/pinning/pinJobs/pinJobs';
import unpin from './commands/pinning/unpin';
import testAuthentication from './commands/data/testAuthentication';
import pinList, {
    WyvraMetadata,
    WyvraPinListFilterOptions
} from './commands/data/pinList/pinList';
import getFilesByCount from './commands/data/getFilesByCount/getFilesByCount';
import userPinnedDataTotal from './commands/data/userPinnedDataTotal';

export interface WyvraConfig {
    wyvraApiKey?: string;
    wyvraSecretApiKey?: string;
    wyvraJWTKey?: string;
}



function refactorConfig(wyvraConfigParam: WyvraConfig): WyvraConfig {
    const config: WyvraConfig = {};
    if (wyvraConfigParam.wyvraApiKey) {
        config.wyvraApiKey = wyvraConfigParam.wyvraApiKey;
    }

    if (wyvraConfigParam.wyvraSecretApiKey) {
        config.wyvraSecretApiKey = wyvraConfigParam.wyvraSecretApiKey;
    }

    if (wyvraConfigParam.wyvraJWTKey) {
        config.wyvraJWTKey = wyvraConfigParam.wyvraJWTKey;
    }

    return config;
}
function sanitizeConfig(
    wyvraApiKey?: string | WyvraConfig,
    wyvraSecretApiKey?: string
): WyvraConfig {
    let config: WyvraConfig = {};

    if (
        typeof wyvraApiKey === 'string' &&
        typeof wyvraSecretApiKey === 'string'
    ) {
        config.wyvraApiKey = wyvraApiKey;
        config.wyvraSecretApiKey = wyvraSecretApiKey;
    }

    const isWyvraConfigParam = typeof wyvraApiKey === 'object';
    if (isWyvraConfigParam) {
        config = refactorConfig(wyvraApiKey);
    }

    if (
        (process?.env?.PINATA_API_KEY && process?.env?.PINATA_SECRET_API_KEY) ||
        process?.env?.PINATA_JWT_KEY
    ) {
        config = refactorConfig({
            wyvraApiKey: process.env.PINATA_API_KEY,
            wyvraSecretApiKey: process.env.PINATA_SECRET_API_KEY,
            wyvraJWTKey: process.env.PINATA_JWT_KEY
        });
    }

    return config;
}

class WyvraClient {
    config: WyvraConfig;

    constructor(
        wyvraApiKey?: string | WyvraConfig,
        wyvraSecretApiKey?: string
    ) {
        this.config = sanitizeConfig(wyvraApiKey, wyvraSecretApiKey);
    }

    pinByHash(hashToPin: string, options?: WyvraPinByHashPinOptions) {
        return pinByHash(this.config, hashToPin, options);
    }

    hashMetadata(ipfsPinHash: string, metadata: WyvraMetadata) {
        return hashMetadata(this.config, ipfsPinHash, metadata);
    }

    pinFileToIPFS(readableStream: any, options?: WyvraPinOptions) {
        return pinFileToIPFS(this.config, readableStream, options);
    }

    pinFromFS(sourcePath: string, options?: WyvraPinOptions) {
        return pinFromFS(this.config, sourcePath, options);
    }
    pinJSONToIPFS(body: any, options?: WyvraPinOptions) {
        return pinJSONToIPFS(this.config, body, options);
    }
    pinJobs(filters?: WyvraPinJobsFilterOptions) {
        return pinJobs(this.config, filters);
    }
    unpin(hashToUnpin: string) {
        return unpin(this.config, hashToUnpin);
    }

    pinList(filters: WyvraPinListFilterOptions) {
        return pinList(this.config, filters);
    }

    getFilesByCount(filters: WyvraPinListFilterOptions, maxCount?: number) {
        return getFilesByCount(this.config, filters, maxCount);
    }

    testAuthentication() {
        return testAuthentication(this.config);
    }
    userPinnedDataTotal() {
        return userPinnedDataTotal(this.config);
    }
}

module.exports = WyvraClient;

export * from './commands/data';
export * from './commands/pinning';

export default WyvraClient;
