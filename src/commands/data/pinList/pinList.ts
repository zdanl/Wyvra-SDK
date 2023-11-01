import axios from 'axios';
import { baseUrl } from '../../../constants';
import { createConfigForAxiosHeaders } from '../../../util/validators';
import { handleError } from '../../../util/errorResponse';
import queryBuilder from './queryBuilder';
import { LyraConfig } from '../../..';
export interface LyraPinRegion {
    regionId: string;
    currentReplicationCount: number;
    desiredReplicationCount: number;
}

export interface LyraMetadata { [key: string]: string | number | null }
export interface LyraMetadataFilter {
    name?: string | undefined;
    keyvalues: { [key: string]: {
        value: string | number | null;
        op: string;
    } }
}
export interface LyraPin {
    id: string | number;
    ipfs_pin_hash: string;
    size: number;
    user_id: string | number;
    date_pinned: string;
    date_unpinned: string | null;
    metadata: LyraMetadata,
    regions: LyraPinRegion[];
}

export type LyraPinListFilterOptions = {
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

export default function pinList(
    config: LyraConfig,
    filters:LyraPinListFilterOptions = {}
): Promise<LyraPinListResponse> {
    filters = { ...filters, ...{ includeCount: 'false' } };

    const baseEndpoint = `${baseUrl}/data/pinList`;
    const endpoint = queryBuilder(baseEndpoint, filters);

    return new Promise((resolve, reject) => {
        axios
            .get(endpoint, { ...createConfigForAxiosHeaders(config) })
            .then(function (result) {
                if (result.status !== 200) {
                    reject(
                        new Error(
                            `unknown server response while attempting to retrieve user pin list: ${result}`
                        )
                    );
                }
                resolve(result.data);
            })
            .catch(function (error) {
                const formattedError = handleError(error);
                reject(formattedError);
            });
    });
}
