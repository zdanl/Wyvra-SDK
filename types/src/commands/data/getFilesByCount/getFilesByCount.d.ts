import { WyvraConfig } from '../../..';
import { WyvraPin, WyvraPinListFilterOptions } from '../pinList/pinList';

export default function getFilesByCount(config: WyvraConfig, filters?: WyvraPinListFilterOptions, maxCount?: number): {
    [Symbol.asyncIterator]: () => {
        next(): Promise<{
            value: WyvraPin;
            done: boolean;
        }>;
        return(): Promise<{
            value: number;
            done: boolean;
        }>;
    };
};
