import type { NextApiRequest, NextApiResponse } from 'next';
import { namecookie } from '../../../../config/variables';
import { findUserByCookieService } from '../../../../services/AuthServices/findUserByCookieService';
import { prisma } from '../../../../services/prisma';
import { ResponseType } from '../../../../types/ResponseType';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>,
) => {
    const { page, id } = req.body
    if (req.method === 'POST') {
        const db = prisma.productGroup;
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
            const hash = req.cookies[namecookie];
            const findUser = await findUserByCookieService(hash);
            if (findUser && findUser.id) {
                const allItens = await db.findMany({
                    where: {
                        status: 1,
                        userId: findUser.id,
                        productId: Number(id)
                    },
                    include: {
                        productOptions: {
                            where: {
                                status: 1
                            }
                        }
                    },
                    orderBy: {
                        id: 'desc'
                    },
                    skip,
                    take
                });
                const totalItens = await db.count({
                    where: {
                        status: 1,
                        userId: findUser.id
                    }
                })
    
                res.status(200).json({ status: 'success', content: allItens, count: totalItens });
            } else {
                res.status(401).json({ status: 'error', message: 'Você não tem permissão para ver esses itens' });
            }
            
        } catch (err) {
            console.log(err)
            res.status(401).json({ status: 'error', message: 'Ocorreu um erro na solicitação' });
        }
    } else {
        res.status(401).json({ status: 'error', message: 'Método não permitido' });
    }

}

export default handler;