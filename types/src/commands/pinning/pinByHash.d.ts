import { WyvraConfig } from '../..';
import { WyvraOptions } from './pinFileToIPFS';
import { WyvraMetadata } from '../data/pinList/pinList';
export interface WyvraPinByHashPinOptions {
    wyvraMetadata?: WyvraMetadata;
    wyvraOptions?: WyvraOptions;
}
export interface WyvraPinByHashResponse {
    id: number | string;
    ipfsHash: string;
    status: string;
    name: string;
}
export default function pinByHash(config: WyvraConfig, hashToPin: string, options: any): Promise<any>;
