import '@/styles/Create.css';

// Para ler arquivos com Next.js
import { promises as fs } from 'fs';
import path from 'path';
import PokemonFav, { PokemonFavProps } from '@/components/pokemon';
import { notFound, redirect } from 'next/navigation';

const dbPath = path.join(process.cwd(), 'src', 'db', 'pokemon-db.json');

interface EditPokemonProps {
    params: {
        id: string;
    };
}

export default async function Edit(props: EditPokemonProps) {
    const file = await fs.readFile(`${dbPath}`, 'utf8');
    const data = JSON.parse(file);

    const id = props.params.id;

    const pokemon = data.find((p: PokemonFavProps) => p.id === id);

    const updatePokemon = async (formData: FormData) => {
        'use server';

        const updatedPokemon = {
            id,
            nome: formData.get('nome'),
            descricao: formData.get('descricao'),
            img: formData.get('img'),
        };

        const acharIndex = (p: PokemonFavProps) => p.id === id;

        const index = data.findIndex(acharIndex);

        data.splice(index, 1, updatedPokemon);
        console.log(data);
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2));

        redirect('/main/listar');
    };

    if (!pokemon) return notFound();

    return (
        <div className='create-pokemon-container'>
            <h2>Editar Pokémon {pokemon.nome}</h2>
            <PokemonFav id={pokemon.id} nome={pokemon.nome} img={pokemon.img} descricao={pokemon.descricao} />
            <form action={updatePokemon} className='create-pokemon-form'>
                <section className='pokemon-input'>
                    <input
                        type='text'
                        id='nome'
                        name='nome'
                        placeholder='Nome do Pokémon'
                        defaultValue={pokemon.nome}
                    />
                </section>
                <section className='pokemon-input'>
                    <input
                        type='text'
                        id='descricao'
                        name='descricao'
                        placeholder='Descrição do Pokémon'
                        defaultValue={pokemon.descricao}
                    />
                </section>
                <section className='pokemon-input'>
                    <input
                        type='text'
                        id='img'
                        name='img'
                        placeholder='Imagem do Pokémon'
                        defaultValue={pokemon.img}
                    />
                </section>
                <button>Atualizar Pokémon</button>
            </form>
        </div>
    );
}
