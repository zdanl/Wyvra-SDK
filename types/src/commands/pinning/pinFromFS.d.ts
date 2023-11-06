import { WyvraConfig } from '../..';
import { WyvraPinOptions, WyvraPinResponse } from './pinFileToIPFS';
export declare function normalizePath(p: string, folderLevel?: number): string;
export default function pinFromFS(config: WyvraConfig, sourcePath: string, options?: WyvraPinOptions): Promise<WyvraPinResponse>;
