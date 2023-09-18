import Ajv from 'ajv';
import { ethers } from 'ethers';

const ajv = new Ajv();

const authSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' },
    signature: { type: 'string' },
    address: { type: 'string' },
  },
  required: ['message', 'signature', 'address'],
  additionalProperties: false,
};
const messageSchema = {
  type: 'object',
  properties: {
    timestamp: { type: 'number' },
    seed: { type: 'string' },
  },
  required: ['timestamp', 'seed'],
  additionalProperties: false,
};

const validateAuthData = ajv.compile(authSchema);
const validateMessage = ajv.compile(messageSchema);

function hexToUtf8(s: any): string {
  return decodeURIComponent(
    s
      .replace(/\s+/g, '') // remove spaces
      .replace(/[0-9a-f]{2}/g, '%$&'), // add '%' before each 2 characters
  );
}

const utf8encoder = new TextEncoder();

function utf8ToHex(s: string): string {
  const rb = utf8encoder.encode(s);
  let r = '';
  for (const b of rb) {
    r += ('0' + b.toString(16)).slice(-2);
  }
  return r;
}

function getCurrentTimestamp() {
  return Math.floor(Date.now() / 1000);
}

/**
 *
 * @param {ethers.Signer | ethers.Wallet}  signer
 * @return {Promise<object>}
 * {
 *         message: message,
 *         signature: signature
 *         address: address
 * }
 */

/**
 *
 * @param {String} authData example : {"address":"0x55666165666A29D2C6F71B1324301b93036a0da3","message":"{\"seed\":\"hDx3DcF5pGWR1JOHarSTPXxGZimpjUDH\",\"timestamp\":1660019049}","signature":"0x4831934d502876064a29ac16a5efa0f984d4614ef9983607d3e5606780d405d37f17278560de8c191e40dfa0a48947c456cd7288dc3a109c8df3446da00495fd1c"}
 * @param {number} interval
 * @return {{valid: boolean, address: string}}
 */

export class SignatureUtils {
  public static verifyAuthSignature(
    authData: any,
    interval = 900,
  ): { valid: boolean; address: string } {
    authData = JSON.parse(hexToUtf8(authData));
    let valid = validateAuthData(authData);
    if (!valid) {
      throw validateAuthData.errors;
    }
    const messageJson = JSON.parse(authData.message);
    valid = validateMessage(messageJson);
    if (!valid) {
      throw validateMessage.errors;
    }

    const currentTimestamp = getCurrentTimestamp();
    if (currentTimestamp < messageJson.timestamp) {
      throw Error(
        `Timestamp in message exceed currentTimestamp ${messageJson.timestamp} vs ${currentTimestamp}`,
      );
    }
    if (currentTimestamp - messageJson.timestamp > interval) {
      throw Error(`Exceeded time interval allow - interval :${interval}s`);
    }
    const address = ethers.utils.verifyMessage(
      authData.message,
      authData.signature,
    );
    if (address !== authData.address) {
      throw Error(`
          Difference between auth address and signature address :
          ${messageJson.address} vs ${address}
          `);
    }
    return {
      valid: true,
      address: address,
    };
  }
}
