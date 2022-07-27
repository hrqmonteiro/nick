import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseType } from '../../../../../types/ResponseType';
import { prisma } from '../../../../../services/prisma';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>,
) => {
    const { page, categoryId } = req.body
    if (req.method === 'POST') {
        const db = prisma.product;
        try {
            let view = 10;
            let skip: number | undefined = 0;
            let take: number | undefined = view;
            if (Number(page) === 0) {
                skip = undefined;
                take = undefined;
            } else if (!page) {
                skip = undefined;
                take = undefined;
            } else {
                skip = Number(page) === 1 ? 0 : ((Number(page) - 1) * view);
                take = view;
            }
            let allItens;
            let totalItens;

            allItens = await db.findMany({
                where: {
                    status: 1,
                    categoryId: Number(categoryId)
                },
                orderBy: {
                    id: 'desc'
                },
                skip,
                take
            });
            totalItens = await db.count({
                where: {
                    status: 1,
                    categoryId: Number(categoryId)
                }
            })

            res.status(200).json({ status: 'success', content: allItens, count: totalItens });


        } catch (err) {
            console.log(err)
            res.status(401).json({ status: 'error', message: 'Ocorreu um erro na solicitação' });
        }
    } else {
        res.status(401).json({ status: 'error', message: 'Método não permitido' });
    }

}

export default handler;