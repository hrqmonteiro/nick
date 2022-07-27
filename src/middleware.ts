import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { namecookie, url } from './config/variables';

export async function middleware(req: NextRequest,res: NextResponse) {
    const { cookies } = req;
    const nextUrl = req.nextUrl.clone();


    if (req.nextUrl.pathname.startsWith('/painel')) {
        // Verifica se o usuário está autenticado
        try {
            const jwt = cookies.get(namecookie);
            const rawResponse = await fetch(url + 'auth/verify', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: jwt })
            });
            const response = await rawResponse.json();
            if (response.content.email) {
                console.log(response.content.name + ' em ' + req.nextUrl.pathname.toString());
            } else {
                throw new Error('Dados incorretos');
            }
        } catch (err) {
            console.log(err)
            nextUrl.pathname = "/login";
        }
    }

    return NextResponse.rewrite(nextUrl);
}