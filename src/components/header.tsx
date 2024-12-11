import Image from 'next/image'
import "@/styles/Header.css";

export default function Header(){
    return(
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
    )
}