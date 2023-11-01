import { LyraConfig } from '..';
export interface axiosHeaders {
    maxContentLength: number;
    maxBodyLength: number;
    headers: {
        [key: string]: any;
    };
    withCredentials?: boolean;
}
export declare function validateApiKeys(lyraApiKey?: string, lyraSecretApiKey?: string): void;
export declare function createConfigForAxiosHeaders(config: LyraConfig): {
    withCredentials: boolean;
    headers: {
        lyra_api_key: string;
        lyra_secret_api_key: string;
        'x-lyra-origin': string;
        'x-version': string;
    };
} | {
    headers: {
        Authorization: string;
        'x-lyra-origin': string;
        'x-version': string;
    };
    withCredentials?: undefined;
};
export declare function createConfigForAxiosHeadersWithFormData(config: LyraConfig, boundaryValue: string): axiosHeaders;
export declare function validateHostNodes(hostNodes: any): void;
export declare function validateMetadata(metadata: any): void;
export declare function validatePinPolicyStructure(pinPolicy: {
    regions: any[];
}): void;
export declare function validateLyraOptions(options: {
    cidVersion?: number;
    wrapWithDirectory?: boolean;
    hostNodes?: any;
    customPinPolicy?: any;
}): void;
