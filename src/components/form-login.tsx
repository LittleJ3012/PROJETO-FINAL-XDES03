"use client";

import Header from '@/components/header'; // Importação do Header
import '@/styles/Login.css';
import Link from "next/link";
import Image from "next/image";
import { login } from "@/utils/credentials";
import { z } from "zod"; // Import do zod para apoio nas validações do front
import toast from 'react-hot-toast'; // Import do react-hot-toast
import { useRouter } from 'next/navigation'; // Importação do useRouter para redirecionar a página
import { LoginCredentials } from '@/utils/credentials';
import '@/app/page.css';
import '@/styles/Header.css';

// Criação do schema para validação dos campos de login
const LoginSchema = z.object({
  usuario: z.string().trim().min(1, { message: 'Usuário não pode ser vazio' }),
  senha: z.string({ message: 'Insira uma senha' }).trim().min(1, { message: 'Senha não pode ser vazia' })
});

export default function LoginForm() {
  const router = useRouter(); // Instancia o router

  const loginClientAction = async (formData: FormData) => {
    console.log("Iniciando o processo de login...");
  
    const loginData: LoginCredentials = {
      usuario: formData.get('usuario') as string,
      senha: formData.get('senha') as string
    };
  
    const result = LoginSchema.safeParse(loginData);
  
    if (!result.success) {
      let errorMsg = "";
  
      result.error.issues.forEach((issue) => {
        errorMsg += issue.message + '. ';
      });
  
      console.error("Erro de validação:", errorMsg);
      toast.error(errorMsg);
      return;
    }
  
    console.log("Chamando a função de login no servidor...");
    const retorno = await login(loginData);
  
    if (retorno?.error) {
      console.error("Erro de login:", retorno.error);
      toast.error(retorno.error);
      return;
    }
  
    console.log("Login bem-sucedido! Redirecionando...");
    toast.success('Usuário logado com sucesso!');
    router.push('/main/listar'); // Redireciona manualmente no cliente
  };
  

  return (
    <>
      <Header /> {/* Adiciona o Header aqui */}
      <main>
        <div id="form-container">
          <h2 id="titulo">Logue com a sua conta</h2>
          <form action={loginClientAction}>
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
          <Link id="link-cadastrar" href="/user/create">
            <p id="possui-conta">Não tem cadastro? Clique aqui</p>
          </Link>
        </div>
      </main>

      <footer>
        <p>
          Feito com <span className="red">&#10084;</span> por{' '}
          <Link href="https://github.com/seu-usuario">GitHub</Link>
        </p>
      </footer>
    </>
  );
}




