import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function Clientes() {
    const { register, handleSubmit } = useForm()
    const [empleados, setEmpleados] = useState(null);
    const [clientes, setClientes] = useState(null);

    useEffect(() => {
        getEmpleados()
        getClientes()
    }, []);

    const getClientes = async (queries = '') => {
        const { data } = await axios.get(`http://localhost:3030/clientes?${queries}`)
        setClientes(data);
    }
    const getEmpleados = async () => {
        const { data } = await axios.get(`http://localhost:3030/empleados`)
        setEmpleados(data);
    }
    const deleteCliente = async (id) => {
        if (window.confirm('Desea borrar el Cliente?')) {
            await axios.delete(`http://localhost:3030/clientes/${id}`)
            getClientes();
        }
    }

    const onSubmit = async (data) => {
        let query = []
        console.log(data)
        data.nombre && query.push(`nombre=${data.nombre}`)
        getClientes(query.join('&'))

    }
    return (<div className='text-start'>
        <h1 className="text-center">Clientes</h1>


        <form onSubmit={handleSubmit(onSubmit)}>

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

        <table className="table table-striped  mt-5">
            <thead className="table-primary font-monospace">
                <tr>
                    <th>nombre</th>
                    <th>apellido</th>
                    <th>fecha de nacimiento</th>
                    <th>Empleados</th>
                    <th><Link className="btn text-dark" to='/cliente/0'><i className="bi bi-plus-circle"></i> Nuevo Cliente</Link></th>


                </tr>
            </thead>
            <tbody>
                {clientes && clientes.map((c) => {
                    return (
                        <tr key={c.id} className='table-warning'>
                            <td>{c.nombre}</td>
                            <td>{c.apellido}</td>
                            <td>{c.fecha_nacimiento}</td>
                            <td>{c.Empleados.map((e) => e.apellido + ' - ')}</td>

                            <td>
                                <button className="btn btn-default" onClick={() => deleteCliente(c.id)}>
                                    <i className="bi bi-trash text-danger"></i>
                                </button>
                                <Link className="btn btn-default" to={`/cliente/${c.id}`}>
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

export default Clientes