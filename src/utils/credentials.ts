"use server";

import { redirect } from "next/navigation";
import * as bcrypt from "bcrypt";
import ConexaoBD from "./conexao-bd";
import { createSessionToken, deleteToken, isSessionValid } from "@/utils/auth";

const arquivo = "usuarios-db.json";

// Definindo a interface para os usuários no banco de dados
interface User {
    usuario: string;
    email: string;
    senha: string;
    avatar: string;
}

// Interface de credenciais do cadastro
export interface CadCredentials {
    usuario: string;
    email: string;
    senha: string;
    confirmaSenha: string;
    avatar: string;
}

export interface LoginCredentials{
    usuario: string;
    senha: string;
}

// Função para criar um novo usuário
export async function createUser(data: CadCredentials) {
    const usuarioTrimmed = data.usuario.trim();
    const emailTrimmed = data.email.trim();
    const senha = data.senha;
    const avatar = data.avatar;

    console.log(data);

    const senhaCrypt = await bcrypt.hash(senha, 10);

    const novoUser: User = {
        usuario: usuarioTrimmed,
        email: emailTrimmed,
        senha: senhaCrypt,
        avatar: avatar
    }

    const usuariosBD = await ConexaoBD.retornaBD<User>(arquivo);
    console.log("Usuários atuais:", usuariosBD);

    for (const user of usuariosBD) {
        if (user.email === emailTrimmed) {
            console.log("Usuário já existe");
            return { error: "Usuário já existe" };
        }
    }

    usuariosBD.push(novoUser);
    await ConexaoBD.armazenaBD(arquivo, usuariosBD);
    console.log("Usuário salvo com sucesso!");
    redirect("/user/login");
}



// Função de login com criação de token de sessão
export async function login(data: LoginCredentials) {
    const usuario = data.usuario.trim();
    const senha = data.senha;
  
    const usuariosBD: User[] = await ConexaoBD.retornaBD(arquivo);
  
    const user = usuariosBD.find((user) => user.usuario === usuario);
  
    if (!user) {
      return { error: "Usuário não encontrado" };
    }
  
    const isMatch = await bcrypt.compare(senha, user.senha);
  
    if (isMatch) {
      await createSessionToken({ sub: user.usuario, senha: user.senha });
      console.log("Usuário logado com sucesso!");
      redirect('/main/listar');
    } else {
      await deleteToken();
    }
  }
  

// Função de logout com deleção do token de sessão
export async function logout() {
    await deleteToken();
    redirect("/login");
}

// Função para proteger rotas privadas
export async function protectRoute() {
    const isValid = await isSessionValid();

    if (!isValid) {
        redirect("/login");
    }
}
