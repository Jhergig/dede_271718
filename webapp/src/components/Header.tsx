import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import { isLoggedIn, getName } from '../api/solidSession';

function Header(props: { webId: string }): JSX.Element {

  return (
    <header>
      <h1><img src={logo} className="App-logo" alt="logo" width="60px" />DeDe</h1>
      {
        isLoggedIn(props.webId)
          ? (
            <nav>
              <Link to="/">Catálogo</Link>
              <Link to="/cesta">Cesta</Link>
              <Link to="/pedidos">Mis pedidos</Link>
              <Link to="/direcciones">Mis direcciones</Link>
              <Link to="/logout">{props.webId.substring(8).split('.')[0]}: Cerrar sesión</Link>
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