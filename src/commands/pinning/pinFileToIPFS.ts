import axios from 'axios';
import { baseUrl } from '../../constants';
import NodeFormData from 'form-data';
import stream from 'stream';
import {
    createConfigForAxiosHeadersWithFormData,
    validateMetadata,
    validateLyraOptions
} from '../../util/validators';
import { handleError } from '../../util/errorResponse';
import { LyraConfig, LyraMetadata } from '../..';

export interface LyraPinPolicyItem {
    id: string;
    desiredReplicationCount: number;
}
export interface LyraOptions {
    hostNodes?: string[] | undefined;
    cidVersion?: 0 | 1;
    wrapWithDirectory?: boolean;
    customPinPolicy?: {
        regions: LyraPinPolicyItem[];
    };
}

export interface LyraPinResponse {
    IpfsHash: string;
    PinSize: number;
    Timestamp: string;
}
export interface LyraPinOptions {
    lyraMetadata?: LyraMetadata;
    lyraOptions?: LyraOptions | undefined;
}
const endpoint = `${baseUrl}/pinning/pinFileToIPFS`;

export function uploadToIPFS(
    config: LyraConfig,
    data: NodeFormData,
    options?: LyraPinOptions
): Promise<LyraPinResponse> {
    return new Promise((resolve, reject) => {
        if (options && options.lyraMetadata) {
            validateMetadata(options.lyraMetadata);
            data.append(
                'lyraMetadata',
                JSON.stringify(options.lyraMetadata)
            );
        }
        if (options && options.lyraOptions) {
            validateLyraOptions(options.lyraOptions);
            data.append('lyraOptions', JSON.stringify(options.lyraOptions));
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
    config: LyraConfig,
    readStream: any,
    options?: LyraPinOptions
): Promise<LyraPinResponse> {
    return new Promise((resolve, reject) => {
        const data = new NodeFormData();

        if (
            !(
                options?.lyraMetadata?.name &&
                typeof options.lyraMetadata.name === 'string' &&
                options.lyraMetadata.name.length > 0
            )
        ) {
            throw Error(
                'filename was not provide, make sure to provide options.lyraMetadata.name'
            );
        }

        data.append('file', readStream, {
            filename: options.lyraMetadata.name
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
