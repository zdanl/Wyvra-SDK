import { LyraConfig } from '../..';
import { LyraPinOptions, LyraPinResponse } from './pinFileToIPFS';
export default function pinJSONToIPFS(config: LyraConfig, body: any, options?: LyraPinOptions): Promise<LyraPinResponse>;
