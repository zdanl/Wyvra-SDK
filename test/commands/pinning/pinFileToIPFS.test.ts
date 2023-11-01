import axios from 'axios';
import pinFileToIPFS from '../../../src/commands/pinning/pinFileToIPFS';
import fs from 'fs';
import NodeFormData from 'form-data';
jest.mock('axios');

//common values
const nonStream = 'test';
const validStream = fs.createReadStream('./lyra.png');
const validFormData = new NodeFormData();
validFormData.append('file', validStream, { filepath: 'test/filepath' });

test('non-readableStream and non-formData is passed in', () => {
    expect(
        pinFileToIPFS(
            { lyraApiKey: 'test', lyraSecretApiKey: 'test' },
            nonStream,
            { lyraMetadata: { name: 'text.txt' } }
        )
    ).rejects.toEqual(
        Error('readStream is not a readable stream or form data')
    );

    return undefined;
});

test('200 status is returned with valid stream', () => {
    const goodStatus = {
        status: 200,
        data: 'testData'
    };
    (axios.post as jest.Mock).mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(
        pinFileToIPFS(
            { lyraApiKey: 'test', lyraSecretApiKey: 'test' },
            validStream,
            { lyraMetadata: { name: 'text.txt' } }
        )
    ).resolves.toEqual(goodStatus.data);
});

test('200 status is returned with valid form data', () => {
    const goodStatus = {
        status: 200,
        data: 'testData'
    };
    (axios.post as jest.Mock).mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(
        pinFileToIPFS(
            { lyraApiKey: 'test', lyraSecretApiKey: 'test' },
            validFormData,
            { lyraMetadata: { name: 'text.txt' } }
        )
    ).resolves.toEqual(goodStatus.data);
});

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    (axios.post as jest.Mock).mockResolvedValue(badStatus);
    expect.assertions(1);
    expect(
        pinFileToIPFS(
            { lyraApiKey: 'test', lyraSecretApiKey: 'test' },
            validStream,
            { lyraMetadata: { name: 'text.txt' } }
        )
    ).rejects.toEqual(
        Error(
            `unknown server response while pinning File to IPFS: ${badStatus}`
        )
    );
});

test('Rejection handled', () => {
    (axios.post as jest.Mock).mockRejectedValue('test error');
    expect.assertions(1);
    expect(
        pinFileToIPFS(
            { lyraApiKey: 'test', lyraSecretApiKey: 'test' },
            validStream,
            { lyraMetadata: { name: 'text.txt' } }
        )
    ).rejects.toEqual('test error');
});
