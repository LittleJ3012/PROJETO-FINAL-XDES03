import * as jose from 'jose'; // npm i jose
import { cookies } from 'next/headers';

// Função para descriptografar o token
async function openSessionToken(token: string) {
    const secret = new TextEncoder().encode(process.env.TOKEN);
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
}

// Função para criar o token de sessão
export async function createSessionToken(payload = {}) {
    const secret = new TextEncoder().encode(process.env.TOKEN);

    const session = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(secret);

    const { exp } = await openSessionToken(session);

    const cookieStore = await cookies();
    cookieStore.set('session', session, {
        expires: (exp as number) * 1000,
        path: '/',
        httpOnly: true,
    });
}

// Função para verificar se a sessão é válida
export async function isSessionValid() {
    const sessionCookie = (await cookies()).get('session');

    if (sessionCookie) {
        const { value } = sessionCookie;
        const { exp } = await openSessionToken(value);
        const currentDate = new Date().getTime();

        return ((exp as number) * 1000) > currentDate;
    }

    return false;
}

// Função para deletar o token de sessão
export async function deleteToken() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}
