import { LyraConfig } from '../../..';
export interface LyraPinRegion {
    regionId: string;
    currentReplicationCount: number;
    desiredReplicationCount: number;
}
export interface LyraMetadata {
    [key: string]: string | number | null;
}
export interface LyraMetadataFilter {
    name?: string | undefined;
    keyvalues: {
        [key: string]: {
            value: string | number | null;
            op: string;
        };
    };
}
export interface LyraPin {
    id: string | number;
    ipfs_pin_hash: string;
    size: number;
    user_id: string | number;
    date_pinned: string;
    date_unpinned: string | null;
    metadata: LyraMetadata;
    regions: LyraPinRegion[];
}
export declare type LyraPinListFilterOptions = {
    hashContains?: string | undefined;
    pinStart?: string | undefined;
    pinEnd?: string | undefined;
    unpinStart?: string | undefined;
    unpinEnd?: string | undefined;
    pinSizeMin?: number | undefined;
    pinSizeMax?: number | undefined;
    status?: string | undefined;
    pageLimit?: number | undefined;
    pageOffset?: number | undefined;
    metadata?: LyraMetadataFilter | undefined;
};
export interface LyraPinListResponse {
    rows: LyraPin[];
}
export default function pinList(config: LyraConfig, filters?: LyraPinListFilterOptions): Promise<LyraPinListResponse>;
