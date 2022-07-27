import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseType } from '../../../../types/ResponseType';
import { prisma } from '../../../../services/prisma';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>,
) => {
    const { slug } = req.query
    if (req.method === 'GET') {
        const db = prisma.category;
        try {

            const findCategoryBySlug = await db.findFirst(
                {
                    where: {
                        slug: String(slug)
                    }
                }
            )

            res.status(200).json({ status: 'success', content: findCategoryBySlug });

        } catch (err) {
            console.log(err)
            res.status(401).json({ status: 'error', message: 'Ocorreu um erro na solicitação' });
        }
    } else {
        res.status(401).json({ status: 'error', message: 'Método não permitido' });
    }

}

export default handler;