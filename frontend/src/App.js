import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Inicio from "./components/Inicio";
import Empleados from "./components/Empleados";
import Empleado from "./components/Empleado";
import Cliente from "./components/Cliente";
import Clientes from "./components/Clientes";


function App() {
    return (
        <>
            <Menu/>
                <div className="container text-center">
                    <Routes>
                        <Route path='/' element={<Inicio></Inicio>} ></Route>
                         <Route path='/empleados' element={<Empleados></Empleados>} ></Route>
                        <Route path='/empleado/:id' element={<Empleado></Empleado>} ></Route>
                        <Route path='/clientes' element={<Clientes></Clientes>}></Route>
                        <Route path='/cliente/:id' element={<Cliente></Cliente>} ></Route>
                    </Routes>
                </div>

        
        </>
    )
}

export default App;