import fs from 'fs/promises';
import path from 'path';

export async function POST(req) {
    try {
        // Caminho correto para acessar o arquivo `usuarios-db.json`
        const dbPath = path.join(process.cwd(), 'src/db/usuarios-db.json');
        const userData = await req.json();

        // Ler o arquivo existente
        const fileData = await fs.readFile(dbPath, 'utf-8');
        const users = JSON.parse(fileData);

        // Adicionar o novo usuário
        users.push(userData);

        // Escrever no arquivo novamente
        await fs.writeFile(dbPath, JSON.stringify(users, null, 2));

        return new Response(JSON.stringify({ message: 'Usuário cadastrado com sucesso!' }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        return new Response(JSON.stringify({ error: 'Erro ao salvar usuário' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
