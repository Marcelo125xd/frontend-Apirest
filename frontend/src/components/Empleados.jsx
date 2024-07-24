import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Empleados(){
    const { register, handleSubmit } = useForm();
    const [empleados, setEmpleados] = useState(null);
    const [clientes, setClientes] = useState(null);

    useEffect(()=>{
        getEmpleados()
        getClientes()

    }, []);

    const getClientes = async () => {
        const { data } = await axios.get(`http://localhost:3030/clientes`)
        setClientes(data);
    }
    const getEmpleados = async (queries = '') => {
        const { data } = await axios.get(`http://localhost:3030/empleados?${queries}`)
        setEmpleados(data);
    }

    const deleteEmpleado = async (id) =>{
        if (window.confirm('Desea borrar el Empleado?')) {
            await axios.delete(`http://localhost:3030/empleados/${id}`)
            getEmpleados();
        }
    }
    const onSubmit = async (data) => {
        let query = []
        console.log(data)
        data.nombre && query.push(`nombre=${data.nombre}`)
        getEmpleados(query.join('&'))
        
    }

    return( <div className='text-start'>
        <h1 className="text-center">Empleados</h1>


        <form  onSubmit={handleSubmit(onSubmit)}>

            <fieldset>
                <legend>Buscar</legend>
                <div className='row'>
                    <div className='col-5'>
                        <input type="text" placeholder='nombre' className='form-control' {...register('nombre')} />
                    </div>
                   
                    <div className="col-2">
                        <button type="submit" className="btn btn-info">Buscar
                        <i className="bi bi-search ms-2"></i>

                        </button>
                    </div>
                </div>
            </fieldset>
        </form>

        <table className="table mt-5 table-striped">
            <thead className="table-primary font-monospace">
                <tr>
                    <th>nombre</th>
                    <th>apellido</th>
                    <th>fecha de nacimiento</th>
                    <th>Cliente Id</th>
                    <th>Cliente</th>
                    <th><Link className="btn text-dark" to='/empleado/0'><i className="bi bi-plus-circle"></i> Nuevo Empleado</Link></th>
                </tr>
            </thead>
            <tbody>
                {empleados && empleados.map((e) => {
                    return (
                        <tr key={e.id} className='table-warning'>
                            <td>{e.nombre}</td>
                            <td>{e.apellido}</td>
                            <td>{e.fecha_nacimiento}</td>
                            <td>{e.id_cliente}</td>
                            <td>{e.Cliente.nombre}</td>


                            <td>
                                <button className="btn btn-default" onClick={() => deleteEmpleado(e.id)}>
                                    <i className="bi bi-trash text-danger"></i>
                                </button>
                                <Link className="btn btn-default" to={`/empleado/${e.id}`}>
                                    <i className="bi bi-pencil text-primary"></i>
                                </Link>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>)
}

export default Empleados;