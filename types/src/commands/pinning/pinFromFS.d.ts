import { LyraConfig } from '../..';
import { LyraPinOptions, LyraPinResponse } from './pinFileToIPFS';
export declare function normalizePath(p: string, folderLevel?: number): string;
export default function pinFromFS(config: LyraConfig, sourcePath: string, options?: LyraPinOptions): Promise<LyraPinResponse>;
