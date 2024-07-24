import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Cliente() {
    const { id } = useParams();
    const navigate = useNavigate()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [empleado, setEmpleado] = useState(null)
    const [clientes, setClientes] = useState({});
    const [empleado_id, setEmpleado_id] = useState(null);
   

    useEffect(() => {
        getEmpleado()
        getClientes(id)
    }, []);

    const getClientes = async (id) => {
        if (id > 0) {
            const { data } = await axios.get(`http://localhost:3030/clientes/${id}`)
            setClientes(data)
            setValue('nombre', data.nombre);
            setValue('apellido', data.apellido);
            setValue('fecha_nacimiento', data.fecha_nacimiento)
            setValue('Empleados', data.Empleados);
            setEmpleado_id(data.empleado);

        }
    }
   
    const getEmpleado = async () => {
        const { data } = await axios.get('http://localhost:3030/empleados');
        setEmpleado(data);
    }
    const volver = () => {
        navigate('/clientes');

    }

    const cancelar = () => {
        volver()
    }

    const onSubmit = async (data) => {
        if (id > 0) {
            await axios.put(`http://localhost:3030/clientes/${id}`, data)
        } else {
            await axios.post(`http://localhost:3030/clientes`, data)
        }
        volver()
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
            <h1 className='mb-5'>Cliente {id > 0 ? clientes.nombre : 'nuevo'}</h1>
            <div className="row mt-3">
                <div className="col-4 text-end">
                    <label htmlFor="nombre">Nombre:</label>
                </div>
                <div className="col-8 text-start">
                    <input type="text"
                        className='form-control'
                        defaultValue={clientes?.nombre}
                        {...register('nombre', { required: 'El nombre es requerido' })}
                    />
                    {errors.nombre && <span className='text-danger'>{errors.nombre.message}</span>}
                </div>
            </div>
            


            <div className="row mt-3">
                <div className="col-4 text-end">
                    <label htmlFor="apellido">Apellido:</label>
                </div>

                <div className="col-8 text-start">
                    <input type="text"
                        className='form-control'
                        defaultValue={clientes?.apellido}
                        {...register('apellido', { required: 'El apellido es requerido' })}
                    />
                    {errors.apellido && <span className='text-danger'>{errors.apellido.message}</span>}
                </div>
            </div>
            

            <div className="row mt-3">
                <div className="col-4 text-end">
                    <label htmlFor="fec_nac">Fecha Nacimiento:</label>
                </div>
                <div className="col-8 text-start">
                    <input type="text"
                        className='form-control'
                        defaultValue={clientes?.fecha_nacimiento}
                        {...register('fecha_nacimiento', {
                            required: 'La fecha es requerida (YYYY-MM-DD)'
                            
                        })}
                    />
                    {errors.fecha_nacimiento && <span className='text-danger'>{errors.fecha_nacimiento.message}</span>}
                </div>

            </div>
            <div className="mt-5 mb-5">
                <button className='btn btn-danger ms-2' onClick={cancelar}>Cancelar</button>
                <input className="btn btn-success ms-2" type="submit" value={id > 0 ? 'Actualizar' : 'Crear'} />
            </div>
        </form>
    )
}

export default Cliente