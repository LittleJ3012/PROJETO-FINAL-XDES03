'use client';

import Link from "next/link";
import Image from 'next/image';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/Create.css'; // Importe o estilo existente

const defaultAvatar = '/user.png';

// Schema de validação com Zod
const CreateUserSchema = z
    .object({
        usuario: z.string().trim().min(1, { message: 'Usuário não pode ser vazio' }),
        email: z.string().trim().email('Email com formato inválido'),
        senha: z.string().trim().min(4, { message: 'Senha deve ter no mínimo 4 caracteres' }),
        confirmaSenha: z
            .string()
            .trim()
            .min(1, { message: 'Confirmação de senha é obrigatória' }),
    })
    .refine((data) => data.senha === data.confirmaSenha, {
        message: 'As senhas não conferem',
        path: ['confirmaSenha'],
    });

export default function CreateUserForm() {
    const [avatar, setAvatar] = useState<string | null>(null);
    const [avatarURLs, setAvatarURLs] = useState<string[]>([]);
    const router = useRouter();

    // Carregar avatares da API ao montar o componente
    useEffect(() => {
        async function fetchAvatars() {
            try {
                const response = await fetch('/api/avatars');
                if (!response.ok) {
                    throw new Error('Erro ao carregar os avatares');
                }
                const data: string[] = await response.json();
                setAvatarURLs(data);
                if (data.length > 0) {
                    setAvatar(data[Math.floor(Math.random() * data.length)]);
                }
            } catch (error) {
                console.error('Erro ao carregar os avatares:', error);
                toast.error('Erro ao carregar os avatares. Tente novamente mais tarde.');
            }
        }

        fetchAvatars();
    }, []);

    // Lógica para trocar avatar
    const trocarAvatar = () => {
        if (avatarURLs.length > 0 && avatar !== null) {
            const indexAtual = avatarURLs.indexOf(avatar);
            const proximoIndex = (indexAtual + 1) % avatarURLs.length;
            setAvatar(avatarURLs[proximoIndex]);
        }
    };

    // Manipular envio do formulário
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Enviando formulário...');

        const formData = new FormData(event.currentTarget);

        const createUserData = {
            usuario: formData.get('usuario') as string,
            email: formData.get('email') as string,
            senha: formData.get('senha') as string,
            confirmaSenha: formData.get('confirma-senha') as string,
            avatar: avatar || defaultAvatar,
        };

        console.log('Dados enviados:', createUserData);

        const result = CreateUserSchema.safeParse(createUserData);

        if (!result.success) {
            const errorMsg = result.error.issues.map((issue) => issue.message).join(' ');
            toast.error(errorMsg);
            return;
        }

        try {
            const response = await fetch('/api/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createUserData),
            });
            

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao cadastrar usuário.');
            }

            toast.success('Usuário cadastrado com sucesso!');
            router.push('/user/login'); // Redireciona para a página de login
        } catch (error) {
            toast.error('Erro ao cadastrar usuário.');
            console.error('Erro:', error);
        }
    };

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
                    <h2 id="titulo">Crie uma nova conta</h2>
                    <form onSubmit={handleSubmit}>
                        <div id="avatar-container">
                            <Image id="avatar" src={avatar || defaultAvatar} alt="Avatar do Usuário" width={100} height={100} />
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
