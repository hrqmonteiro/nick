import type { NextApiRequest, NextApiResponse } from 'next';
import { namecookie } from '../../../../config/variables';
import { findUserByCookieService } from '../../../../services/AuthServices/findUserByCookieService';
import { prisma } from '../../../../services/prisma';
import { ResponseType } from '../../../../types/ResponseType';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>,
) => {
    const { id, name, colorNavbar, colorBackground, colorDrawer, colorFooter, head, footer, address, schedule, path, slug } = req.body
    if (req.method === 'POST') {
        const db = prisma.storeTheme;
        try {
            const hash = req.cookies[namecookie];
            const findUser = await findUserByCookieService(hash);
            if (findUser && findUser.id) {
                let item;
                if (id) {
                    item = await db.update({
                        where: {
                            id: Number(id)
                        },
                        data: {
                            name,
                            slug,
                            path,
                            colorNavbar,
                            colorBackground,
                            colorDrawer,
                            colorFooter,
                            head,
                            footer,
                            address,
                            schedule,
                            userId: findUser.id,
                            theme: 'theme01', // Tema predefinido
                            type: 'store' // Deixe store se o formato for ecommerce, e storeMarketplace se for Marketplace. Para voltar a ser ecommerce, delete todos os registros em storethemes.
                        }
                    });
                } else {
                    item = await db.create({
                        data: {
                            name,
                            slug,
                            path,
                            colorNavbar,
                            colorBackground,
                            colorDrawer,
                            colorFooter,
                            head,
                            footer,
                            address,
                            schedule,
                            status: 1,
                            userId: findUser.id,
                            theme: 'theme01', // Tema predefinido
                            type: 'store' // Deixe store se o formato for ecommerce, e storeMarketplace se for Marketplace. Para voltar a ser ecommerce, delete todos os registros em storethemes.
                        }
                    });
                }

                res.status(200).json({ status: 'success', content: item });
            } else {
                res.status(401).json({ status: 'error', message: 'Você não tem permissão para editar esse item' });
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