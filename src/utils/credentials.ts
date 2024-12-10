"use server";

import { redirect } from "next/navigation";
import * as bcrypt from "bcrypt";
import crypto from "crypto";
import ConexaoBD from "./conexao-bd";
import { createSessionToken, deleteToken, isSessionValid } from "@/utils/auth";

const arquivo = "usuarios-db.json";

export interface LoginCredentials {
    email: string;
    password: string;
}

// Função para criar um novo usuário
export async function createUser({ email, password }: { email: string; password: string }) {
    const emailTrimmed = email.trim();
    const passwordCrypt = await bcrypt.hash(password, 10);

    const novoUser = {
        id: crypto.randomUUID(),
        email: emailTrimmed,
        password: passwordCrypt,
    };

    const usuariosBD = await ConexaoBD.retornaBD(arquivo);

    for (const user of usuariosBD) {
        if (user.email === emailTrimmed) {
            throw new Error("Usuário já existe");
        }
    }

    usuariosBD.push(novoUser);
    await ConexaoBD.armazenaBD(arquivo, usuariosBD);
}

// Função de login com criação de token de sessão
export async function login(data: LoginCredentials) {
    const email = data.email.trim();
    const password = data.password;

    // Manipula BD
    const usuariosBD = await ConexaoBD.retornaBD(arquivo);

    const user = usuariosBD.find((user) => user.email === email);

    if (!user) {
        return { error: "Usuário não encontrado" };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        await createSessionToken({ sub: user.id, email: user.email });
        redirect("/main/listar");
    } else {
        await deleteToken(); // Garante que não há token residual
        return { error: "Usuário ou senha incorretos" };
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
