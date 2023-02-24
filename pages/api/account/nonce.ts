import { NextApiRequest, NextApiResponse } from 'next';
import { generateNonce } from 'siwe';

export default function nonce(_: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text-plain');
  res.send(generateNonce());
}
