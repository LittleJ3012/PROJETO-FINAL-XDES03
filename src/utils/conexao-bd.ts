'user server';

//Para ler arquivos com nextjs
import {promises as fs} from 'fs';
import path from "path";

async function retornaBD(arquivo: string): Promise<Array<any>> {
    const dbPath = path.join(process.cwd(), 'src', 'db', arquivo);
    console.log("Caminho do banco de dados:", dbPath);
  
    try {
      const dados = await fs.readFile(dbPath, 'utf-8');
      console.log("Conteúdo do banco de dados:", dados);
      return JSON.parse(dados);
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