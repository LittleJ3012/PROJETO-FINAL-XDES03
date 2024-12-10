import Image from "next/image";
import Link from "next/link";

//Para ler arquivos com nextjs
import path from "path";
import { redirect } from "next/navigation";

import '@/styles/Pokemon.css';
import ConexaoBD from "@/utils/conexao-bd";

const dbPath = 
    path.join(process.cwd(),'src','db','pokemon-db.json');

export interface PokemonFavProps{
        id: string,    
        nome: string,
        img: string,
        descricao: string
}

const arquivo = 'pokemon-db.json';

export default async function PokemonFav(props: PokemonFavProps){

    const deletePokemon = async (formData: FormData) =>{
        'use server';

        // const file = await fs.readFile(`${dbPath}`,'utf8');
        // const data = JSON.parse(file);
    
        const id = props.id;

        const acharIndex = (p) => {
            return p.id === id
        }
        
        const pokemonDB = await ConexaoBD.retornaBD(arquivo)

        const index = pokemonDB.findIndex(acharIndex);
        
        pokemonDB.splice(index,1);
        await ConexaoBD.armazenaBD(arquivo,pokemonDB);

        redirect('/main/listar');
        

    }

    return(
        <div className="pokemon-container-card">
            <h2>{props.nome}</h2>
            <Image src={props.img}
                   alt=""
                   width={200}
                   height={200}
            />
            <p>{props.descricao}</p>
            <section className="pokemon-edit-buttons-container">
                <Link href={`/main/edit/${props.id}`} className="edit-pokemon">Editar</Link>
                <form action={deletePokemon}>
                    <button>Remover</button>
                </form>
            </section>
            
        </div>
    );
}