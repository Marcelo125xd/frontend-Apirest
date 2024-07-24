import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Empleado() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [empleado, setEmpleado] = useState({});
    const [clientes, setClientes] = useState(null);
    const [cliente_id, setCliente_id] = useState(null);

    useEffect(() => {
        getEmpleado(id)
        getClientes()
    }, []);

    const getEmpleado = async (id) => {
        if (id > 0) {
            const { data } = await axios.get(`http://localhost:3030/empleados/${id}`)
            setEmpleado(data)
            setValue('nombre', data.nombre);
            setValue('apellido', data.apellido);
            // setValue('fecha_nacimiento', data.fecha_nacimiento)
            setValue('id_cliente', data.id_cliente);
            setCliente_id(data.id_cliente);

        };
    };

    const getClientes = async () => {
        const { data } = await axios.get('http://localhost:3030/clientes');
        setClientes(data);
    };
    const volver = () => {
        navigate('/empleados');

    };

    const cancelar = () => {
        volver();
    };

    const onSubmit = async (data) => {
        if (id > 0) {
            await axios.put(`http://localhost:3030/empleados/${id}`, data);
        } else {
            await axios.post(`http://localhost:3030/empleados`, data);
        };
        volver();
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
            <h1 className='mb-5'>Empleado {id > 0 ? empleado.nombre : 'nuevo'}</h1>
            <div className="row mt-3">
                <div className="col-4 text-end">
                    <label htmlFor="nombre">Nombre:</label>
                </div>
                <div className="col-8 text-start">
                    <input type="text"
                        className='form-control'
                        defaultValue={empleado?.nombre}
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
                        defaultValue={empleado?.apellido}
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
                        defaultValue={empleado?.fecha_nacimiento}
                        {...register('fecha_nacimiento', {
                            required: 'La fecha es requerida (YYYY-MM-DD)'

                        })}
                    />
                    {errors.fecha_nacimiento && <span className='text-danger'>{errors.fecha_nacimiento.message}</span>}
                </div>

            </div>
            <div className="row mt-3">
                <div className="col-4 text-end">
                    <label htmlFor="id_cliente">Apellido Cliente:</label>
                </div>

                <div className="col-8 text-start">
                    <select className="form-select"
                        defaultValue={cliente_id}
                        onChange={(e) => { setCliente_id(e.target.value) }}
                        {...register('id_cliente')}>
                        <option value='0'>Elegir</option>
                        {clientes && clientes.map(c => <option key={c.id} value={c.id} >{c.apellido}</option>)}
                    </select>
                </div>
            </div>

            <div className="mt-5 mb-5">
                <button className='btn btn-danger ms-2' onClick={cancelar}>Cancelar</button>
                <input className="btn btn-success ms-2" type="submit" value={id > 0 ? 'Actualizar' : 'Crear'} />
            </div>
        </form>
    )
}

export default Empleado;