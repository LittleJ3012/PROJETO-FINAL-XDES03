import Link from "next/link";
import PokemonFav, { PokemonFavProps } from "@/components/pokemon";

import '@/styles/ListPokemon.css';
import ConexaoBD from "@/utils/conexao-bd";

const arquivo = 'pokemon_db.json';

export default async function Listar() {
    const pokemonsDb = await ConexaoBD.retornaBD(arquivo);

    const pokemonsMapped = pokemonsDb.map((pokemon: PokemonFavProps) => {
        return <PokemonFav key={pokemon.id} {...pokemon} />;
    });

    return (
        <div className="list-container">
            <Link href={'/main/create'} className="add-pokemon">
                Adicionar
            </Link>
            <div className="list-pokemon-container">
                {pokemonsMapped}
            </div>
        </div>
    );
}
