"use client";

import Header from '@/components/header'; 
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import { CadCredentials, createUser } from "@/utils/credentials";
import pokemonData from '@/db/pokemon_db.json';
import '@/styles/Create.css';
import '@/styles/Header.css';
import '@/app/page.css';

// Função para selecionar um Pokémon aleatório
const getRandomAvatar = (avatars: string[]) => {
  return avatars[Math.floor(Math.random() * avatars.length)];
};

export default function CreateUserForm() {
  const [avatar, setAvatar] = useState<string>('');
  const [pokemonAvatars, setPokemonAvatars] = useState<string[]>([]);
  const router = useRouter(); // Instancia o router

  // Carregar avatares dos Pokémon ao montar o componente
  useEffect(() => {
    const avatars = pokemonData.map((pokemon) => pokemon.image); //Aqui, ele pega a propriedade image 
    //cada pokemón do banco de dados
    setPokemonAvatars(avatars);
    setAvatar(getRandomAvatar(avatars));
  }, []);

  // Lógica para trocar avatar
  const trocarAvatar = () => {
    setAvatar(getRandomAvatar(pokemonAvatars));
  };

  // Schema de validação com Zod
  const CreateUserSchema = z
  .object({
    usuario: z.string().trim().min(1, { message: 'Usuário não pode ser vazio' }),
    email: z.string().trim().email('Email com formato inválido'),
    senha: z.string().trim().min(4, { message: 'Senha deve ter no mínimo 4 caracteres' }),
    confirmaSenha: z.string().trim().min(4, { message: 'Confirmação de senha deve ter no mínimo 4 caracteres' }),
  })
  .refine((data) => data.senha === data.confirmaSenha, {
    message: 'As senhas não conferem',
    path: ['confirmaSenha'],
  });



  const createUserClient = async (formData: FormData) => {
    const createUserData = {
      usuario: formData.get('usuario') as string,
      email: formData.get('email') as string,
      senha: formData.get('senha') as string,
      confirmaSenha: formData.get('confirma-senha') as string,
      avatar: avatar,
    };
  
    const result = CreateUserSchema.safeParse(createUserData);
  
    if (!result.success) {
      let errorMsg = "";
  
      result.error.issues.forEach((issue) => {
        errorMsg += issue.message + '. ';
      });
  
      if (errorMsg.includes('As senhas não conferem')) {
        alert('Erro: As senhas digitadas não são iguais. Por favor, tente novamente.');
      }
  
      toast.error(errorMsg);
      return;
    }
  
    // Chama o Server Action
    const retorno = await createUser(createUserData as CadCredentials);
    if (retorno) {
      toast.error(retorno.error);
      return;
    }
  
    toast.success('Usuário cadastrado com sucesso!');
    router.push('/user/login'); // Redireciona para a página de login
  };
  
  return (
    <>
      <Header /> 
      <main>
        <div id="form-container">
          <h2 id="titulo">Crie uma nova conta</h2>
          <form action={createUserClient}>
            <div id="avatar-container">
              <Image id="avatar" src={avatar} alt="Avatar do Usuário" width={100} height={100} />
              <button type="button" id="trocar-avatar" onClick={trocarAvatar}>
                Trocar Avatar
              </button>
            </div>

            <label htmlFor="usuario">Usuário:</label>
            <input type="text" id="usuario" name="usuario" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="senha">Senha:</label>
            <input type="password" id="senha" name="senha" required />

            <label htmlFor="confirma-senha">Confirme a senha:</label>
            <input type="password" id="confirma-senha" name="confirma-senha" required />

            <button type="submit" id="submit">
              Cadastrar
            </button>
          </form>
          <Link id="link-logar" href="/user/login">
            <p id="possui-conta">Já possui conta?</p>
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