import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseType } from '../../../../types/ResponseType';
import { prisma } from '../../../../services/prisma';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>,
) => {
    const { id } = req.query
    if (req.method === 'GET') {
        const db = prisma.user;
        try {
            const data = await db.findFirst({
                where: {
                    id: Number(id),
                },
                include: {
                    role: true
                }
            });
            res.status(200).json({ status: 'success', content: data });
        } catch (err) {
            console.log(err)
            res.status(401).json({ status: 'error', message: 'Ocorreu um erro na solicitação' });
        }
    } else {
        res.status(401).json({ status: 'error', message: 'Método não permitido' });
    }

}

export default handler;