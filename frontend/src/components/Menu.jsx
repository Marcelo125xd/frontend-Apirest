import { Link } from 'react-router-dom';

function Menu() {
    return (
        <>

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'>FRONT-END</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li>
                                <Link className='nav-link active' to='/'> Inicio </Link>
                            </li>

                            <li>
                                <Link className="nav-link active" to='/empleados'>Empleados</Link>

                            </li>
                            <li>
                                <Link className="nav-link active" to='/clientes'>Clientes</Link>

                            </li>

                        </ul>
                    </div>
                </div>
            </nav>


        </>
    )
}

export default Menu;