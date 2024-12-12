import '@/styles/Create.css';
import '@/styles/Pokemon.css';

import { promises as fs } from 'fs';
import path from 'path';
import {notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import ConexaoBD from '@/utils/conexao-bd';

interface EditPokemonProps {
    params: {
        id: string;
    };
}

interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
    habitat: string;
    flavor_text: string;
    abilities: {
        name: string;
        is_hidden: boolean;
    }[];
    stats: {
        name: string;
        base_stat: number;
    }[];
}

const dbPath = path.join(process.cwd(), 'src', 'db', 'pokemon_db.json');

function getStat(pokemon: Pokemon, statName: string): number | string {
    const statObj = pokemon.stats.find(s => s.name === statName);
    return statObj ? statObj.base_stat : 'N/A';
}

export default async function Edit({ params }: EditPokemonProps) {
    const idNumber = parseInt(params.id, 10);
    const data = await ConexaoBD.retornaBD<Pokemon>('pokemon_db.json');

    const pokemon = data.find((p) => p.id === idNumber);

    if(!pokemon){
        return notFound;
    }

    const updatePokemon = async (formData: FormData) => {
        'use server';

        const newName = formData.get('name')?.toString().trim() || pokemon.name;
        const newImage = formData.get('image')?.toString().trim() || pokemon.image;

        const index = data.findIndex((p) => p.id === idNumber);
        if (index !== -1) {
            const updatedPokemon = {
                ...pokemon,
                name: newName,
                image: newImage
            };
            await fs.writeFile(dbPath, JSON.stringify([...data.slice(0, index), updatedPokemon, ...data.slice(index+1)], null, 2));
        }

        redirect('/main/listar');
    };

    const tipo = pokemon.types.join(', ');
    const ataque = getStat(pokemon, 'Ataque');
    const defesa = getStat(pokemon, 'Defesa');
    const poderEspecial = getStat(pokemon, 'Ataque Especial');

    return (
        <>
            <header id="heading">
                <div>
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/640px-Pokebola-pokeball-png-0.png"
                        alt="pokebola"
                        className="pokebola"
                        width={32}
                        height={32}
                    />
                </div>
                <div className="bar">
                    <h1 className="h1">Pokédex</h1>
                    <div className="menu-item">
                        <Image
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
                            alt="Avatar do Usuário"
                            className="user-avatar"
                            width={35}
                            height={35}
                        />
                        <a href="/main/listar">Usuário</a>
                    </div>
                </div>
            </header>
            <main>
                <div className='create-pokemon-container'>
                    <h2>Editar Pokémon {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                    <div className="pokemon-card" style={{ margin: '20px auto' }}>
                        <Image
                            src={pokemon.image}
                            alt={pokemon.name}
                            width={100}
                            height={100}
                            className="pokemon"
                        />
                        <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
                        <p><strong>Tipo:</strong> {tipo}</p>
                        <p><strong>Ataque:</strong> {ataque}</p>
                        <p><strong>Defesa:</strong> {defesa}</p>
                        <p><strong>Poder Especial:</strong> {poderEspecial}</p>
                    </div>
                    <form action={updatePokemon} className='create-pokemon-form'>
                        <section className='pokemon-input'>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                placeholder='Nome do Pokémon'
                                defaultValue={pokemon.name}
                            />
                        </section>
                        <section className='pokemon-input'>
                            <input
                                type='text'
                                id='image'
                                name='image'
                                placeholder='URL da Imagem do Pokémon'
                                defaultValue={pokemon.image}
                            />
                        </section>
                        <button>Atualizar Pokémon</button>
                    </form>
                </div>
            </main>
            <footer>
                <p>Feito com <span className="red">&#10084;</span> por <a href="#">GitHub</a></p>
            </footer>
        </>
    );
}
