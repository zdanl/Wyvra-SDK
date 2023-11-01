import { LyraConfig } from '../..';
export interface LyraTestAuthenticationResponse {
    authenticated: boolean;
}
export default function testAuthentication(config: LyraConfig): Promise<LyraTestAuthenticationResponse>;
