import Link from "next/link";

import '@/styles/CreatePokemon.css';


import { redirect } from "next/navigation";

import crypto from 'crypto';
import ConexaoBD from "@/utils/conexao-bd";

const arquivo = 'pokemon-db.json';

//Marcar o componente como async para "server component"
export default async function CreatePokemon(){

    //Server Action. Só irá executar no servidor
    const addPokemon = async (formData: FormData) => {
        "use server";

        const novoPokemon =
            {
                id: crypto.randomUUID(),
                nome : formData.get("nome"),
                descricao : formData.get("descricao"),
                img : formData.get("img")
            }
        
        const pokemonDB = await ConexaoBD.retornaBD(arquivo);
        pokemonDB.push(novoPokemon);
        await ConexaoBD.armazenaBD(arquivo,pokemonDB);
        
        redirect('/main/listar');
    }

    return(
        <div className="create-pokemon-container">
            <h2>
                Inserir Novo Pokémon
            </h2> 
            <form action={addPokemon} className="create-pokemon-form">
                <section className="pokemon-input">
                    <input type="text"
                        id="nome"
                        name="nome" 
                        placeholder="Nome do Pokémon"
                        aria-label="Nome do Pokémon"
                        />
                </section>

                <section className="pokemon-input">
                    <input type="text"
                        id="descricao"
                        name="descricao" 
                        placeholder="Descrição do Pokémon"
                        aria-label="Descrição do pokémon"
                        />
                </section>

                <section className="pokemon-input">
                    <input type="text"
                        id="img"
                        name="img" 
                        placeholder="Link com Imagem do Pokémon"
                        aria-label="Link com Imagem do pokémon"
                            />
                </section>

                               

                <button>Adicionar Pokémon</button>
            </form>
            
        </div>
       

    );

}