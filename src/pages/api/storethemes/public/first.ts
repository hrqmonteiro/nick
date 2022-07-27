import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../services/prisma';
import { ResponseType } from '../../../../types/ResponseType';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>,
) => {
    if (req.method === 'GET') {
        const db = prisma.storeTheme;
        let item;

        try {
            item = await db.findFirst({
                where: {
                    status: 1
                },
                include: {
                    user: {
                        include: {
                            categories: {
                                where: {
                                    status: 1
                                }
                            },
                            banners: {
                                where: {
                                    status: 1
                                }
                            },
                            products: {
                                where: {
                                    status: 1
                                }
                            }
                        }
                    }
                }
            })
            res.status(200).json({ status: 'success', content: item });

        } catch (err) {
            console.log(err)
            res.status(401).json({ status: 'error', message: 'Ocorreu um erro na solicitação' });
        }
    } else {
        res.status(401).json({ status: 'error', message: 'Método não permitido' });
    }

}

export default handler;