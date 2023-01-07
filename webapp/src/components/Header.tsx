import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";

function Header(props : any): JSX.Element {

    return (
      <header>
        <h1><img src={logo} className="App-logo" alt="logo" width="60px" />DeDe</h1>
        {
          getDefaultSession().info.isLoggedIn
            ? (
              <nav>
                <Link to="/">Catálogo</Link>
                <Link to="/carrito">Cesta</Link>
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