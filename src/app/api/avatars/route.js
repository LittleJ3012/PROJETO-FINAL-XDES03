import fs from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
        const dbPath = path.join(process.cwd(), 'src/db/pokemon_db.json');

        // Lê o conteúdo do JSON
        const fileData = await fs.readFile(dbPath, 'utf-8');
        const pokemonData = JSON.parse(fileData);

        // Extrai as URLs das imagens
        const avatarURLs = pokemonData.map(pokemon => pokemon.img);

        return new Response(JSON.stringify(avatarURLs), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Erro ao ler o arquivo pokemon_db.json:', error);
        return new Response(JSON.stringify({ error: 'Erro ao carregar os avatares' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
