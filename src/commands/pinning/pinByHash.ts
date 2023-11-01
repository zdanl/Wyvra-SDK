import axios from 'axios';
import { baseUrl } from '../../constants';
import { createConfigForAxiosHeaders, validateMetadata } from '../../util/validators';
import isIPFS from 'is-ipfs';
import { handleError } from '../../util/errorResponse';
import { LyraConfig } from '../..';
import { LyraOptions } from './pinFileToIPFS';
import { LyraMetadata } from '../data/pinList/pinList';

export interface LyraPinByHashPinOptions {
    lyraMetadata?: LyraMetadata;
    lyraOptions?: LyraOptions ;
}

export interface LyraPinByHashResponse {
    id: number | string;
    ipfsHash: string;
    status: string;
    name: string;
}

export default function pinByHash(config: LyraConfig, hashToPin: string, options: any): Promise<any> {
    if (!hashToPin) {
        throw new Error('hashToPin value is required for pinning by hash');
    }
    if (!isIPFS.cid(hashToPin)) {
        throw new Error('hashToPin value is an invalid IPFS CID');
    }

    const endpoint = `${baseUrl}/pinning/pinByHash`;
    const body : {
        hashToPin: any,
        lyraOptions: any,
        lyraMetadata?: any,
    } = {
        hashToPin: hashToPin,
        lyraOptions: {}
    };

    if (options) {
        if (options.lyraOptions) {
            body.lyraOptions = options.lyraOptions;
        }
        if (options.lyraMetadata) {
            validateMetadata(options.lyraMetadata);
            body.lyraMetadata = options.lyraMetadata;
        }
    }

    return new Promise((resolve, reject) => {
        axios.post(
            endpoint,
            body,
            {...createConfigForAxiosHeaders(config)})
        .then(function (result) {
            if (result.status !== 200) {
                reject(new Error(`unknown server response while adding to pin queue: ${result}`));
            }
            resolve(result.data);
        }).catch(function (error) {
            const formattedError = handleError(error);
            reject(formattedError);
        });
    });
}
