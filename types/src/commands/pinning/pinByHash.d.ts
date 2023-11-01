import { LyraConfig } from '../..';
import { LyraOptions } from './pinFileToIPFS';
import { LyraMetadata } from '../data/pinList/pinList';
export interface LyraPinByHashPinOptions {
    lyraMetadata?: LyraMetadata;
    lyraOptions?: LyraOptions;
}
export interface LyraPinByHashResponse {
    id: number | string;
    ipfsHash: string;
    status: string;
    name: string;
}
export default function pinByHash(config: LyraConfig, hashToPin: string, options: any): Promise<any>;
