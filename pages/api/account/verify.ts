import { NextApiRequest, NextApiResponse } from 'next';
import { SiweMessage } from 'siwe';

export default async function verify(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message, signature } = req.body;
  const siweMessage = new SiweMessage(message);
  try {
    await siweMessage.validate(signature);
    res.send(true);
  } catch {
    res.send(false);
  }
}
