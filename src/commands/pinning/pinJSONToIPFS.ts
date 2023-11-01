import axios from 'axios';
import { baseUrl } from '../../constants';
import { createConfigForAxiosHeaders, validateMetadata, validateLyraOptions } from '../../util/validators';
import { handleError } from '../../util/errorResponse';
import { LyraConfig } from '../..';
import { LyraPinOptions, LyraPinResponse } from './pinFileToIPFS';

export default function pinJSONToIPFS(config: LyraConfig, body: any, options? : LyraPinOptions):Promise<LyraPinResponse> {

    let requestBody: any = body;

    if (typeof body !== 'object') {
        throw new Error('body must be a valid JSON object');
    }

    if (options) {
        requestBody = {
            lyraContent: body
        };
        if (options.lyraMetadata) {
            validateMetadata(options.lyraMetadata);
            requestBody.lyraMetadata = options.lyraMetadata;
        }
        if (options.lyraOptions) {
            validateLyraOptions(options.lyraOptions);
            requestBody.lyraOptions = options.lyraOptions;
        }
    }

    const endpoint = `${baseUrl}/pinning/pinJSONToIPFS`;

    return new Promise((resolve, reject) => {
        axios.post(
            endpoint,
            requestBody,
            {...createConfigForAxiosHeaders(config)})
        .then(function (result) {
            if (result.status !== 200) {
                reject(new Error(`unknown server response while pinning JSON to IPFS: ${result}`));
            }
            resolve(result.data);
        }).catch(function (error) {
            const formattedError = handleError(error);
            reject(formattedError);
        });
    });
}
