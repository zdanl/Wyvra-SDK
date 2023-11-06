import { WyvraConfig } from '..';
export interface axiosHeaders {
    maxContentLength: number;
    maxBodyLength: number;
    headers: {
        [key: string]: any;
    };
    withCredentials?: boolean;
}
export declare function validateApiKeys(wyvraApiKey?: string, wyvraSecretApiKey?: string): void;
export declare function createConfigForAxiosHeaders(config: WyvraConfig): {
    withCredentials: boolean;
    headers: {
        wyvra_api_key: string;
        wyvra_secret_api_key: string;
        'x-wyvra-origin': string;
        'x-version': string;
    };
} | {
    headers: {
        Authorization: string;
        'x-wyvra-origin': string;
        'x-version': string;
    };
    withCredentials?: undefined;
};
export declare function createConfigForAxiosHeadersWithFormData(config: WyvraConfig, boundaryValue: string): axiosHeaders;
export declare function validateHostNodes(hostNodes: any): void;
export declare function validateMetadata(metadata: any): void;
export declare function validatePinPolicyStructure(pinPolicy: {
    regions: any[];
}): void;
export declare function validateWyvraOptions(options: {
    cidVersion?: number;
    wrapWithDirectory?: boolean;
    hostNodes?: any;
    customPinPolicy?: any;
}): void;
