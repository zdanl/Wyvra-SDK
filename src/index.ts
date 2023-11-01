import './require-babel-polyfill';
import pinByHash, {
    LyraPinByHashPinOptions
} from './commands/pinning/pinByHash';
import hashMetadata from './commands/pinning/hashMetadata';
import pinFileToIPFS, {
    LyraPinOptions
} from './commands/pinning/pinFileToIPFS';
import pinFromFS from './commands/pinning/pinFromFS';
import pinJSONToIPFS from './commands/pinning/pinJSONToIPFS';
import pinJobs, {
    LyraPinJobsFilterOptions
} from './commands/pinning/pinJobs/pinJobs';
import unpin from './commands/pinning/unpin';
import testAuthentication from './commands/data/testAuthentication';
import pinList, {
    LyraMetadata,
    LyraPinListFilterOptions
} from './commands/data/pinList/pinList';
import getFilesByCount from './commands/data/getFilesByCount/getFilesByCount';
import userPinnedDataTotal from './commands/data/userPinnedDataTotal';

export interface LyraConfig {
    lyraApiKey?: string;
    lyraSecretApiKey?: string;
    lyraJWTKey?: string;
}



function refactorConfig(lyraConfigParam: LyraConfig): LyraConfig {
    const config: LyraConfig = {};
    if (lyraConfigParam.lyraApiKey) {
        config.lyraApiKey = lyraConfigParam.lyraApiKey;
    }

    if (lyraConfigParam.lyraSecretApiKey) {
        config.lyraSecretApiKey = lyraConfigParam.lyraSecretApiKey;
    }

    if (lyraConfigParam.lyraJWTKey) {
        config.lyraJWTKey = lyraConfigParam.lyraJWTKey;
    }

    return config;
}
function sanitizeConfig(
    lyraApiKey?: string | LyraConfig,
    lyraSecretApiKey?: string
): LyraConfig {
    let config: LyraConfig = {};

    if (
        typeof lyraApiKey === 'string' &&
        typeof lyraSecretApiKey === 'string'
    ) {
        config.lyraApiKey = lyraApiKey;
        config.lyraSecretApiKey = lyraSecretApiKey;
    }

    const isLyraConfigParam = typeof lyraApiKey === 'object';
    if (isLyraConfigParam) {
        config = refactorConfig(lyraApiKey);
    }

    if (
        (process?.env?.PINATA_API_KEY && process?.env?.PINATA_SECRET_API_KEY) ||
        process?.env?.PINATA_JWT_KEY
    ) {
        config = refactorConfig({
            lyraApiKey: process.env.PINATA_API_KEY,
            lyraSecretApiKey: process.env.PINATA_SECRET_API_KEY,
            lyraJWTKey: process.env.PINATA_JWT_KEY
        });
    }

    return config;
}

class LyraClient {
    config: LyraConfig;

    constructor(
        lyraApiKey?: string | LyraConfig,
        lyraSecretApiKey?: string
    ) {
        this.config = sanitizeConfig(lyraApiKey, lyraSecretApiKey);
    }

    pinByHash(hashToPin: string, options?: LyraPinByHashPinOptions) {
        return pinByHash(this.config, hashToPin, options);
    }

    hashMetadata(ipfsPinHash: string, metadata: LyraMetadata) {
        return hashMetadata(this.config, ipfsPinHash, metadata);
    }

    pinFileToIPFS(readableStream: any, options?: LyraPinOptions) {
        return pinFileToIPFS(this.config, readableStream, options);
    }

    pinFromFS(sourcePath: string, options?: LyraPinOptions) {
        return pinFromFS(this.config, sourcePath, options);
    }
    pinJSONToIPFS(body: any, options?: LyraPinOptions) {
        return pinJSONToIPFS(this.config, body, options);
    }
    pinJobs(filters?: LyraPinJobsFilterOptions) {
        return pinJobs(this.config, filters);
    }
    unpin(hashToUnpin: string) {
        return unpin(this.config, hashToUnpin);
    }

    pinList(filters: LyraPinListFilterOptions) {
        return pinList(this.config, filters);
    }

    getFilesByCount(filters: LyraPinListFilterOptions, maxCount?: number) {
        return getFilesByCount(this.config, filters, maxCount);
    }

    testAuthentication() {
        return testAuthentication(this.config);
    }
    userPinnedDataTotal() {
        return userPinnedDataTotal(this.config);
    }
}

module.exports = LyraClient;

export * from './commands/data';
export * from './commands/pinning';

export default LyraClient;
