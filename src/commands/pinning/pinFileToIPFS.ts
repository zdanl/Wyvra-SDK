import axios from 'axios';
import { baseUrl } from '../../constants';
import NodeFormData from 'form-data';
import stream from 'stream';
import {
    createConfigForAxiosHeadersWithFormData,
    validateMetadata,
    validateWyvraOptions
} from '../../util/validators';
import { handleError } from '../../util/errorResponse';
import { WyvraConfig, WyvraMetadata } from '../..';

export interface WyvraPinPolicyItem {
    id: string;
    desiredReplicationCount: number;
}
export interface WyvraOptions {
    hostNodes?: string[] | undefined;
    cidVersion?: 0 | 1;
    wrapWithDirectory?: boolean;
    customPinPolicy?: {
        regions: WyvraPinPolicyItem[];
    };
}

export interface WyvraPinResponse {
    IpfsHash: string;
    PinSize: number;
    Timestamp: string;
}
export interface WyvraPinOptions {
    wyvraMetadata?: WyvraMetadata;
    wyvraOptions?: WyvraOptions | undefined;
}
const endpoint = `${baseUrl}/pinning/pinFileToIPFS`;

export function uploadToIPFS(
    config: WyvraConfig,
    data: NodeFormData,
    options?: WyvraPinOptions
): Promise<WyvraPinResponse> {
    return new Promise((resolve, reject) => {
        if (options && options.wyvraMetadata) {
            validateMetadata(options.wyvraMetadata);
            data.append(
                'wyvraMetadata',
                JSON.stringify(options.wyvraMetadata)
            );
        }
        if (options && options.wyvraOptions) {
            validateWyvraOptions(options.wyvraOptions);
            data.append('wyvraOptions', JSON.stringify(options.wyvraOptions));
        }

        axios
            .post(
                endpoint,
                data,
                createConfigForAxiosHeadersWithFormData(
                    config,
                    data.getBoundary()
                )
            )
            .then(function (result) {
                if (result.status !== 200) {
                    reject(
                        new Error(
                            `unknown server response while pinning File to IPFS: ${result}`
                        )
                    );
                }
                resolve(result.data);
            })
            .catch(function (error) {
                const formattedError = handleError(error);
                reject(formattedError);
            });
    });
}

export default function pinFileToIPFS(
    config: WyvraConfig,
    readStream: any,
    options?: WyvraPinOptions
): Promise<WyvraPinResponse> {
    return new Promise((resolve, reject) => {
        const data = new NodeFormData();

        if (
            !(
                options?.wyvraMetadata?.name &&
                typeof options.wyvraMetadata.name === 'string' &&
                options.wyvraMetadata.name.length > 0
            )
        ) {
            throw Error(
                'filename was not provide, make sure to provide options.wyvraMetadata.name'
            );
        }

        data.append('file', readStream, {
            filename: options.wyvraMetadata.name
        });

        if (
            !(
                readStream instanceof stream.Readable ||
                readStream instanceof NodeFormData
            )
        ) {
            throw Error('readStream is not a readable stream or form data')
            ;
        }

        resolve(uploadToIPFS(config, data, options));
    });
}
