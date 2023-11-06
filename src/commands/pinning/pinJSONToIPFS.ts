import axios from 'axios';
import { baseUrl } from '../../constants';
import { createConfigForAxiosHeaders, validateMetadata, validateWyvraOptions } from '../../util/validators';
import { handleError } from '../../util/errorResponse';
import { WyvraConfig } from '../..';
import { WyvraPinOptions, WyvraPinResponse } from './pinFileToIPFS';

export default function pinJSONToIPFS(config: WyvraConfig, body: any, options? : WyvraPinOptions):Promise<WyvraPinResponse> {

    let requestBody: any = body;

    if (typeof body !== 'object') {
        throw new Error('body must be a valid JSON object');
    }

    if (options) {
        requestBody = {
            wyvraContent: body
        };
        if (options.wyvraMetadata) {
            validateMetadata(options.wyvraMetadata);
            requestBody.wyvraMetadata = options.wyvraMetadata;
        }
        if (options.wyvraOptions) {
            validateWyvraOptions(options.wyvraOptions);
            requestBody.wyvraOptions = options.wyvraOptions;
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
