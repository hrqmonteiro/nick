import type { NextApiRequest, NextApiResponse } from 'next';
import { namecookie } from '../../../../config/variables';
import { findUserByCookieService } from '../../../../services/AuthServices/findUserByCookieService';
import { prisma } from '../../../../services/prisma';
import stringToSlug from '../../../../services/stringToSlug';
import { ResponseType } from '../../../../types/ResponseType';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>,
) => {
    const { name, path, productId } = req.body
    if (req.method === 'POST') {
        const db = prisma.banner;
        const slug = stringToSlug(name);
        try {
            const hash = req.cookies[namecookie];
            const findUser = await findUserByCookieService(hash);
            if (findUser && findUser.id) {
                const item = await db.create({
                    data: {
                        name,
                        path,
                        productId: Number(productId),
                        userId: findUser.id,
                        status: 1
                    }
                });
                res.status(200).json({ status: 'success', content: item });
            } else {
                res.status(401).json({ status: 'error', message: 'Você não tem permissão para criar novo item' });
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