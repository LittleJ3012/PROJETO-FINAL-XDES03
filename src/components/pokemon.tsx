import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import '@/styles/Pokemon.css';
import ConexaoBD from "@/utils/conexao-bd";

export interface PokemonFavProps {
    id: string;
    nome: string;
    img: string;
    descricao: string;
}

const arquivo = 'pokemon-db.json';

export default async function PokemonFav(props: PokemonFavProps) {
    const deletePokemon = async () => {
        'use server';

        const id = props.id;

        const acharIndex = (p: PokemonFavProps) => p.id === id;

        // Especifica explicitamente o tipo de retorno como PokemonFavProps[]
        const pokemonDB = await ConexaoBD.retornaBD<PokemonFavProps>(arquivo);

        const index = pokemonDB.findIndex(acharIndex);

        if (index !== -1) {
            pokemonDB.splice(index, 1);
            await ConexaoBD.armazenaBD(arquivo, pokemonDB);
        }

        redirect('/main/listar');
    };

    return (
        <div className="pokemon-container-card">
            <h2>{props.nome}</h2>
            <Image
                src={props.img}
                alt={`Imagem de ${props.nome}`}
                width={200}
                height={200}
            />
            <p>{props.descricao}</p>
            <section className="pokemon-edit-buttons-container">
                <Link href={`/main/edit/${props.id}`} className="edit-pokemon">
                    Editar
                </Link>
                <form action={deletePokemon}>
                    <button type="submit">Remover</button>
                </form>
            </section>
        </div>
    );
}
