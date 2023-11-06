import axios from 'axios';
import { baseUrl } from '../../constants';
import {createConfigForAxiosHeaders} from '../../util/validators';
import { handleError } from '../../util/errorResponse';
import { WyvraConfig } from '../..';

export interface WyvraTestAuthenticationResponse {
    authenticated: boolean;
}

export default function testAuthentication(config: WyvraConfig): Promise<WyvraTestAuthenticationResponse> {
    //  test authentication to make sure that the user's provided keys are legit
    const endpoint = `${baseUrl}/data/testAuthentication`;

    return new Promise((resolve, reject) => {
        axios.get(
            endpoint,
            {...createConfigForAxiosHeaders(config)})
        .then(function (result) {
            if (result.status !== 200) {
                reject(new Error(`unknown server response while authenticating: ${result}`));
            }
            resolve({
                authenticated: true
            });
        }).catch(function (error) {
            const formattedError = handleError(error);
            reject(formattedError);
        });
    });
}
