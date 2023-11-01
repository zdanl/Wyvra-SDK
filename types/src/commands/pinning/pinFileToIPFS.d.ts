import NodeFormData from 'form-data';
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
export declare function uploadToIPFS(config: LyraConfig, data: NodeFormData, options?: LyraPinOptions): Promise<LyraPinResponse>;
export default function pinFileToIPFS(config: LyraConfig, readStream: any, options?: LyraPinOptions): Promise<LyraPinResponse>;
