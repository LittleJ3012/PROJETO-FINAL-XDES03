'use server';

// Para ler arquivos com Next.js
import { promises as fs } from 'fs';
import path from 'path';

// Definição de um tipo genérico para os dados
type DataItem = {
    id: string;
    [key: string]: string | number | boolean | DataItem | DataItem[];
};

async function retornaBD<T = DataItem>(arquivo: string): Promise<T[]> {
    const dbPath = path.join(process.cwd(), 'src', 'db', arquivo);
    const dados = await fs.readFile(dbPath, 'utf-8');

    return JSON.parse(dados) as T[];
}

async function armazenaBD<T = DataItem>(arquivo: string, dados: T[]): Promise<void> {
    const dbPath = path.join(process.cwd(), 'src', 'db', arquivo);
    await fs.writeFile(dbPath, JSON.stringify(dados, null, 2));
}

const ConexaoBD = {
    retornaBD,
    armazenaBD,
};

export default ConexaoBD;
