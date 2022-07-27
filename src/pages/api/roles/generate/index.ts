import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../services/prisma'
import { ResponseType } from '../../../../types/ResponseType';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const db = prisma.role;
  try {
    const admin = await db.create({
      data: {
        name: 'Admin',
        slug: 'admin'
      }
    });
    const store = await db.create({
      data: {
        name: 'Lojista',
        slug: 'store'
      }
    });
    const delivery = await db.create({
      data: {
        name: 'Entregador',
        slug: 'delivery'
      }
    });
    const customer = await db.create({
      data: {
        name: 'Cliente',
        slug: 'customer'
      }
    });
    const worker = await db.create({
      data: {
        name: 'Funcionário',
        slug: 'worker'
      }
    });
    res.status(200).json({ status: "success" })
  } catch (err) {
    res.status(401).json({ status: "error" })
  }
}
