import axios from 'axios';
import hashMetadata from '../../../src/commands/pinning/hashMetadata';

jest.mock('axios');

//common values
const badHash = 'test';
const goodHash = 'Qma6e8dovfLyiG2UUfdkSHNPAySzrWLX9qVXb44v1muqcp';
const metadata = {
    name: 'testname',
    keyvalues: {
        newKey: 'newValue'
    }
};

const metadataTwo = {
    name: 'testname',
    keyvalues: {
        newKey: 'newValue',
        secondKey: 'secondValue'
    }
};

test('No ipfsPinHash value provided should error', () => {
    expect(() => {
        hashMetadata({ lyraApiKey: 'test', lyraSecretApiKey: 'test' }, null, metadata);
    }).toThrow();
});

test('Invalid ipfsPinHash value is provided', () => {
    expect(() => {
        hashMetadata({ lyraApiKey: 'test', lyraSecretApiKey: 'test' }, badHash, metadata);
    }).toThrow();
});

test('No metadata object provided should error', () => {
    expect(() => {
        hashMetadata({ lyraApiKey: 'test', lyraSecretApiKey: 'test' }, goodHash);
    }).toThrow();
});

test('One keyvalue pair is added', () => {
    const goodStatus = {
        status: 200,
        data: 'testData'
    };
    (axios.put as jest.Mock).mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(hashMetadata({ lyraApiKey: 'test', lyraSecretApiKey: 'test' }, goodHash, metadata)).resolves.toEqual(goodStatus.data);
});

test('Two keyvalue pairs is added', () => {
    const goodStatus = {
        status: 200,
        data: 'testData'
    };
    (axios.put as jest.Mock).mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(hashMetadata({ lyraApiKey: 'test', lyraSecretApiKey: 'test' }, goodHash, metadataTwo)).resolves.toEqual(goodStatus.data);
});

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    (axios.put as jest.Mock).mockResolvedValue(badStatus);
    expect.assertions(1);
    expect(hashMetadata({ lyraApiKey: 'test', lyraSecretApiKey: 'test' }, goodHash, metadata)).rejects.toEqual(Error(`unknown server response while changing metadata for hash: ${JSON.stringify(badStatus, null, 2)}`));
});

test('Rejection handled', () => {
    (axios.put as jest.Mock).mockRejectedValue('test error');
    expect.assertions(1);
    expect(hashMetadata({ lyraApiKey: 'test', lyraSecretApiKey: 'test' }, goodHash, metadata)).rejects.toEqual('test error');
});

