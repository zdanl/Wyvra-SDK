import { WyvraConfig } from '../..';
import { WyvraPinOptions, WyvraPinResponse } from './pinFileToIPFS';
export default function pinJSONToIPFS(config: WyvraConfig, body: any, options?: WyvraPinOptions): Promise<WyvraPinResponse>;
