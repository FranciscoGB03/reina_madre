import React, {useEffect} from 'react';
import {useState} from 'react';
import {ordenarArrPorKey} from "../../../services/sortService";
import i18next from "i18next";
import {useStore} from "../../../index";
import {setSeleccionado} from "../../../store/appsStore";
import {FaChevronUp,FaChevronDown} from "react-icons/fa";

const Roles = () => {
    const roles = useStore.getState().roles;
    const seleccionado=useStore().seleccionado;
    const [sort, setSort] = useState({key: 'id', order: 'asc'});
    const [registros, setRegistros] = useState(roles);
    useEffect(()=>setRegistros(roles),[roles]);
    useEffect(() => {
        ordenarRegistros();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort]);
    const ordenarRegistros = () => setRegistros(ordenarArrPorKey(registros, sort.key, sort.order));
    return (
        <div className="card d-flex mx-4 border-tabla z-depth-2 animated bounceInUp">
            <div className="card-header d-flex justify-content-between text-center py-0">
                <h5 className="text-center text-titulo-tabla txts_gray pt-2">
                    <i className="py-2 px-2">{i18next.t('admin:rolesDisponibles')}</i>
                </h5>
            </div>
            <div className="card-body p-0">
                <div id="div_tabla">
                    <table className=" table table-condensed responsive hover">
                        <TheadTitulos sort={sort} setSort={setSort}/>
                        <tbody className="text-left">
                        {(registros || []).map((rol, idx) =>
                            <tr key={idx}
                                className={"cursor " + (rol?.id === seleccionado?.id ? 'bg-primary text-white' : '')}
                                onClick={() => setSeleccionado(rol)}>
                                <td>{rol.nombre}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
//|------Subcomponentes------|//
const TheadTitulos = ({sort, setSort}) => {
    const handleSort = key => {
        if (key === sort.key)
            setSort({...sort, order: sort.order === 'asc' ? 'desc' : 'asc'});
        else
            setSort({key, order: 'asc'});
    };
    return (
        <thead className=''>
        <tr>
            <th className='text-center cursor'
                onClick={() => handleSort('clave')}>
                <IconosSort key_sort='clave' key_actual={sort.key} order={sort.order}/>
                {i18next.t('catalogos:clave')}
            </th>
        </tr>
        </thead>
    );
}
const IconosSort = ({key_actual, key_sort, order}) => {
    return (<React.Fragment>
        {key_sort === key_actual && order === 'asc' && <FaChevronUp/>}
        {key_sort === key_actual && order === 'desc' && <FaChevronDown/>}
    </React.Fragment>);
}
export default Roles;
