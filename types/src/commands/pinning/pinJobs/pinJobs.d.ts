import { LyraConfig } from '../../..';
export interface LyraPinJobsResponseRow {
    id: number | string;
    ipfs_pin_hash: string;
    date_queued: string;
    name: string | undefined | null;
    status: string;
}
export interface LyraPinJobsResponse {
    count: number;
    rows: LyraPinJobsResponseRow[];
}
export interface LyraPinJobsFilterOptions {
    sort: 'ASC' | 'DESC';
    status?: string | undefined;
    ipfs_pin_hash?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}
export default function pinJobs(config: LyraConfig, filters?: LyraPinJobsFilterOptions): Promise<LyraPinJobsResponse>;
