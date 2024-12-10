import './page.css';
import Link from 'next/link';

export default function Home() {
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
          <h1 className="menu-item">
            <Link href={"/user/login"} className='link-conhecer' >Login/Cadastrar</Link>
          </h1>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="welcome-text">
            <p>Bem Vindo ao Pokédex!</p>
            <p>Aqui você monta o seu time de pokémons!</p>
          </div>
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
