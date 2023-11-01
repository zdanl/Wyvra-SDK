import { LyraConfig } from '../../..';
import { LyraPin, LyraPinListFilterOptions } from '../pinList/pinList';

export default function getFilesByCount(config: LyraConfig, filters?: LyraPinListFilterOptions, maxCount?: number): {
    [Symbol.asyncIterator]: () => {
        next(): Promise<{
            value: LyraPin;
            done: boolean;
        }>;
        return(): Promise<{
            value: number;
            done: boolean;
        }>;
    };
};
