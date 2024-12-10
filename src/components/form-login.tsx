"use client";

import '@/styles/Login.css';

import Link from "next/link";
import Image from "next/image";
import { login } from "@/utils/credentials";
import { z } from "zod"; //import do zod para apoio nas validações do front: npm i zod 
import toast from 'react-hot-toast'; //import do react-hot-toast:  npm i react-hot-toast
import { LoginCredentials } from '@/utils/credentials';

//Criação do schema para colocarmos as regras de validação do zod para os campos de login
const LoginSchema = z.object({
    email: z.string().trim().email('Email com formato incorreto'),
    password: z.string({ message: 'Insira uma senha' }).trim().min(1, { message: 'Senha não pode ser vazia' })
})

export default function LoginForm() {

    const loginClientAction = async (formData: FormData) => {

        const loginData: LoginCredentials = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }

        const result = LoginSchema.safeParse(loginData);

        if (!result.success) {

            let errorMsg = "";

            result.error.issues.forEach((issue) => {
                errorMsg = errorMsg + issue.message + '. ';
            })

            toast.error(errorMsg);
            return;
        }

        //Chama o Server Action (nesse local é permitido)
        const retorno = await login(loginData);

        if (retorno) {
            toast.error(retorno.error);
            return;
        }
    }

    return (
        <>
            <header id="heading">
                <div>
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/640px-Pokebola-pokeball-png-0.png"
                        alt="pokebola"
                        className="pokebola"
                        width={50}
                        height={50}
                    />
                </div>
                <div className="bar">
                    <h1 className="h1">Pokédex</h1>
                </div>
            </header>

            <main>
                <div id="form-container">
                    <h2 id="titulo">Logue com a sua conta</h2>
                    <form action="/logar" method="post">
                        <div id="tres-pokemons">
                            <Image
                                src="https://i.pinimg.com/236x/da/23/2e/da232e027d0e7f2d24bc68f27186c2da.jpg"
                                alt="três pokémons"
                                id="tres-pokemons"
                                width={200}
                                height={200}
                            />
                        </div>
                        <label htmlFor="usuario">Usuário:</label>
                        <input type="text" id="usuario" name="usuario" required />

                        <label htmlFor="senha">Senha:</label>
                        <input type="password" id="senha" name="senha" required />

                        <button type="submit" id="submit">
                            Entrar
                        </button>
                    </form>
                    <Link id="link-cadastrar" href="/user/create"> <p id='possui-conta'>Não tem cadastro? Clique aqui</p></Link>
                </div>
            </main>

            <footer>
                <p>
                    Feito com <span className="red">&#10084;</span> por{' '}
                    <Link href="https://github.com/seu-usuario">GitHub</Link>
                </p>
            </footer>
        </>
    )
}


