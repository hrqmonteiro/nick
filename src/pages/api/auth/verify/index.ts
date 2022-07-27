import type { NextApiRequest, NextApiResponse } from 'next';
import { drndecrypt } from '../../../../services/crypt';
import { ResponseType } from '../../../../types/ResponseType';
import { UserType } from '../../../../types/UserType';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>,
) => {
    const { token } = req.body
    if (req.method === 'POST') {
        const user = drndecrypt(token) as UserType;
        res.status(200).json({ status: 'success', content: user })

    } else {
        res.status(401).json({ status: 'error', message: 'Método não permitido' })
    }
}

export default handler;