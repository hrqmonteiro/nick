import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseType } from '../../../../types/ResponseType';
import { prisma } from '../../../../services/prisma';
import md5 from '../../../../services/md5';
import { drncrypt } from '../../../../services/crypt';
import { UserType } from '../../../../types/UserType';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>,
) => {

    if (req.method === 'POST') {
        const { email, password } = req.body;
        const db = prisma.user;
        try {
            const findUser = await db.findFirst({
                where: {
                    email,
                    status: 1
                },
                include: {
                    role: true
                }
            });

            if (findUser && findUser.password === md5(password)) {
                const token = drncrypt(findUser as UserType)
                res.status(200).json({
                    status: "success", 
                    content: token
                });
            } else {
                res.status(401).json({ status: 'error', message: 'Usuário ou senha inválidos' })
            }
        } catch (err) {
            console.log(err)
            res.status(401).json({ status: 'error', message: 'Usuário ou senha inválidos' })
        }
    } else {
        res.status(401).json({ status: 'error', message: 'Método não permitido' })
    }
}

export default handler;