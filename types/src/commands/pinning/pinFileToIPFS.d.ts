import NodeFormData from 'form-data';
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
export declare function uploadToIPFS(config: WyvraConfig, data: NodeFormData, options?: WyvraPinOptions): Promise<WyvraPinResponse>;
export default function pinFileToIPFS(config: WyvraConfig, readStream: any, options?: WyvraPinOptions): Promise<WyvraPinResponse>;
