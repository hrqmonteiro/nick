import type { NextApiRequest, NextApiResponse } from 'next'
import md5 from '../../../../../services/md5';
import { ResponseType } from '../../../../../types/ResponseType';
import { prisma } from '../../../../../services/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const db = prisma.user;
  try {
    const admin = await db.create({
      data: {
        name: 'Minha loja',
        email: 'minhaloja@email.com',
        password: md5('12345'),
        roleId: 2,
        status: 1
      }
    });
    res.status(200).json({ status: "success" })
  } catch (err) {
    res.status(401).json({ status: "error" })
  }
}
