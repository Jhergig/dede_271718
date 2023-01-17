import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../api/solidSession';

function Header(props: { nombre: string }): JSX.Element {

  return (
    <header>
      <h1><img src={logo} className="App-logo" alt="logo" width="60px" />DeDe</h1>
      {
        isLoggedIn()
          ? (
            <nav>
              <Link to="/">Catálogo</Link>
              <Link to="/cesta">Cesta</Link>
              <Link to="/pedidos">Mis pedidos</Link>
              <Link to="/direcciones">Mis direcciones</Link>
              <Link to="/logout">{props.nombre}: Cerrar sesión</Link>
            </nav>
          ) : (
            <nav>
              <Link to="/">Catálogo</Link>
              <Link to="/login">Iniciar sesión</Link>
            </nav>
          )
      }

    </header >
  );
}

export default Header;