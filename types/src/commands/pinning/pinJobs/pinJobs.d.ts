import { WyvraConfig } from '../../..';
export interface WyvraPinJobsResponseRow {
    id: number | string;
    ipfs_pin_hash: string;
    date_queued: string;
    name: string | undefined | null;
    status: string;
}
export interface WyvraPinJobsResponse {
    count: number;
    rows: WyvraPinJobsResponseRow[];
}
export interface WyvraPinJobsFilterOptions {
    sort: 'ASC' | 'DESC';
    status?: string | undefined;
    ipfs_pin_hash?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}
export default function pinJobs(config: WyvraConfig, filters?: WyvraPinJobsFilterOptions): Promise<WyvraPinJobsResponse>;
