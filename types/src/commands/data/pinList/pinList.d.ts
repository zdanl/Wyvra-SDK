import { WyvraConfig } from '../../..';
export interface WyvraPinRegion {
    regionId: string;
    currentReplicationCount: number;
    desiredReplicationCount: number;
}
export interface WyvraMetadata {
    [key: string]: string | number | null;
}
export interface WyvraMetadataFilter {
    name?: string | undefined;
    keyvalues: {
        [key: string]: {
            value: string | number | null;
            op: string;
        };
    };
}
export interface WyvraPin {
    id: string | number;
    ipfs_pin_hash: string;
    size: number;
    user_id: string | number;
    date_pinned: string;
    date_unpinned: string | null;
    metadata: WyvraMetadata;
    regions: WyvraPinRegion[];
}
export declare type WyvraPinListFilterOptions = {
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
    metadata?: WyvraMetadataFilter | undefined;
};
export interface WyvraPinListResponse {
    rows: WyvraPin[];
}
export default function pinList(config: WyvraConfig, filters?: WyvraPinListFilterOptions): Promise<WyvraPinListResponse>;
