'user server';

//Para ler arquivos com nextjs
import {promises as fs} from 'fs';
import path from "path";

async function retornaBD<T>(arquivo: string): Promise<T[]> {
  const dbPath = path.join(process.cwd(), 'src', 'db', arquivo);

  try {
      const dados = await fs.readFile(dbPath, 'utf-8');
      return JSON.parse(dados) as T[];
  } catch (error) {
      console.error("Erro ao ler o banco de dados:", error);
      throw error;
  }
}

async function armazenaBD(arquivo: string, dados: any)
{
    const dbPath = path.join(process.cwd(),'src','db',arquivo);
    await fs.writeFile(dbPath, JSON.stringify(dados,null,2));
}

const ConexaoBD = {
    retornaBD,
    armazenaBD
}

export default ConexaoBD;