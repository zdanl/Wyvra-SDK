import axios from 'axios';
import { baseUrl } from '../../constants';
import { createConfigForAxiosHeaders, validateMetadata } from '../../util/validators';
import isIPFS from 'is-ipfs';
import { handleError } from '../../util/errorResponse';
import { WyvraConfig } from '../..';
import { WyvraOptions } from './pinFileToIPFS';
import { WyvraMetadata } from '../data/pinList/pinList';

export interface WyvraPinByHashPinOptions {
    wyvraMetadata?: WyvraMetadata;
    wyvraOptions?: WyvraOptions ;
}

export interface WyvraPinByHashResponse {
    id: number | string;
    ipfsHash: string;
    status: string;
    name: string;
}

export default function pinByHash(config: WyvraConfig, hashToPin: string, options: any): Promise<any> {
    if (!hashToPin) {
        throw new Error('hashToPin value is required for pinning by hash');
    }
    if (!isIPFS.cid(hashToPin)) {
        throw new Error('hashToPin value is an invalid IPFS CID');
    }

    const endpoint = `${baseUrl}/pinning/pinByHash`;
    const body : {
        hashToPin: any,
        wyvraOptions: any,
        wyvraMetadata?: any,
    } = {
        hashToPin: hashToPin,
        wyvraOptions: {}
    };

    if (options) {
        if (options.wyvraOptions) {
            body.wyvraOptions = options.wyvraOptions;
        }
        if (options.wyvraMetadata) {
            validateMetadata(options.wyvraMetadata);
            body.wyvraMetadata = options.wyvraMetadata;
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
