"use client";

import {useState } from 'react';
import pokemonData from '@/db/pokemon_db.json';
import usuariosData from '@/db/usuarios-db.json'; 
import '@/styles/Pokemon.css';

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

export default function PokemonPage() {
    const [mostrarEquipe, setMostrarEquipe] = useState(false);
    const [pokemonSelecionados, setPokemonSelecionados] = useState<number[]>([]);
    const [mouseOverBox, setMouseOverBox] = useState<number | null>(null);
    let tooltipTimeout: ReturnType<typeof setTimeout> | null = null;
    const ultimoUsuario = usuariosData[usuariosData.length - 1]; // Pega o último usuário cadastrado
    const nomeUsuario = ultimoUsuario?.usuario || 'Usuário'; // Nome do usuário ou 'Usuário' por padrão
    const avatarUsuario = ultimoUsuario?.avatar || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'; // Avatar padrão se não houver avatar definido

    const totalPokemons = 151;

    const getPokemonFromDB = (id: number): Pokemon | undefined => {
        return (pokemonData as Pokemon[]).find(p => p.id === id);
    };

    const getPokemonName = (id: number): string => {
        const p = getPokemonFromDB(id);
        return p ? p.name.charAt(0).toUpperCase() + p.name.slice(1) : `Pokémon ${id}`;
    };

    const getStat = (pokemon: Pokemon, statName: string): number | string => {
        const statObj = pokemon.stats.find(s => s.name === statName);
        return statObj ? statObj.base_stat : 'N/A';
    };

    const toggleSelectPokemon = (id: number) => {
        setPokemonSelecionados(prev => {
            if (prev.includes(id)) {
                return prev.filter(pid => pid !== id);
            } else {
                if (prev.length < 6) {
                    const novo = [...prev, id];
                    // Se chegar em 6, mostra a equipe
                    if (novo.length === 6) {
                        setMostrarEquipe(true);
                    }
                    return novo;
                } else {
                    return prev;
                }
            }
        });
    };

    const removerPokemonDoTime = (id: number) => {
        setPokemonSelecionados(prev => prev.filter(pid => pid !== id));
    };

    const pokemonsEscolhidos = (pokemonData as Pokemon[]).filter(p => pokemonSelecionados.includes(p.id));

    // Página 1: Grade de Pokémons
    const paginaSelecao = (
        <section id="pokemon-selection" className={`page ${!mostrarEquipe ? 'active' : ''}`}>
            <h2>Monte a sua equipe de Pokémons!</h2>
            <div className="separator"></div>
            <div className="pokemon-grid">
                {Array.from({ length: totalPokemons }, (_, i) => i + 1).map(num => {
                    const isSelected = pokemonSelecionados.includes(num);
                    return (
                        <div
                            key={num}
                            className={`pokemon-box ${isSelected ? 'selected' : ''}`}
                            onMouseEnter={() => {
                                tooltipTimeout = setTimeout(() => {
                                    setMouseOverBox(num);
                                }, 1000);
                            }}
                            onMouseLeave={() => {
                                if (tooltipTimeout) clearTimeout(tooltipTimeout);
                                setMouseOverBox(null);
                            }}
                            onClick={() => {
                                setMouseOverBox(null);
                                toggleSelectPokemon(num);
                            }}
                        >
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`}
                                alt={`Pokémon ${num}`}
                            />
                            <div className="tooltip" style={{ visibility: mouseOverBox === num ? 'visible' : 'hidden' }}>
                                {getPokemonName(num)}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="button-container">
                <a href="#full-page">
                    <button className="select-button" onClick={() => setMostrarEquipe(true)}>Selecionar</button>
                </a>
            </div>
        </section>
    );

    // Página 2: Equipe Escolhida
    const paginaEquipe = (
        <section id="full-page" className="full-page">
            <div className="full-page-content">
                <h2>Sua Equipe de Pokémons</h2>
                <div className="separator-dois"></div>
                <div className="chosen-pokemon-grid">
                    {pokemonsEscolhidos.map(poke => {
                        const tipo = poke.types.join(', ');
                        const ataque = getStat(poke, 'Ataque');
                        const defesa = getStat(poke, 'Defesa');
                        const poderEspecial = getStat(poke, 'Ataque Especial');

                        return (
                            <div className="pokemon-card" key={poke.id}>
                                <button className="delete-btn" onClick={() => removerPokemonDoTime(poke.id)}>X</button>
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`}
                                    alt={poke.name}
                                    className="pokemon"
                                />
                                <h3>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h3>
                                <p><strong>Tipo:</strong> {tipo}</p>
                                <p><strong>Ataque:</strong> {ataque}</p>
                                <p><strong>Defesa:</strong> {defesa}</p>
                                <p><strong>Poder Especial:</strong> {poderEspecial}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="button-container" style={{ marginTop: '20px' }}>
                   <button className="select-button" onClick={() => setMostrarEquipe(false)}>
                      Voltar ao Menu Principal
                   </button>
                </div>
            </div>
        </section>
    );

    return (
        <>
            <header id="heading">
                <div>
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/640px-Pokebola-pokeball-png-0.png"
                        alt="pokebola"
                        className="pokebola"
                    />
                </div>
                <div className="bar">
                    <h1 className="h1">Pokédex</h1>
                    <div className="menu-item">
                        <img 
                            src={avatarUsuario}
                            alt="Avatar do Usuário"
                            className="user-avatar"
                        />
                        <a href="#full-page">{nomeUsuario}</a>
                    </div>
                </div>
            </header>
            <main>
                {!mostrarEquipe ? paginaSelecao : paginaEquipe}
            </main>
            <footer>
                <p>Feito com <span className="red">&#10084; </span>por <a href="#">GitHub</a></p>
            </footer>
        </>
    );
}