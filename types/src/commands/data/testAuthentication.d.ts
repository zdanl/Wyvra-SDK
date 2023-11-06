import { WyvraConfig } from '../..';
export interface WyvraTestAuthenticationResponse {
    authenticated: boolean;
}
export default function testAuthentication(config: WyvraConfig): Promise<WyvraTestAuthenticationResponse>;
