import i18next from "i18next";
import DatePicker from "../DatePicker";
import moment from "moment";
import React from "react";

const TipoDatepicker = ({campo, seleccionado, setSeleccionado}) => {
    const handleChange = value => {
        let nuevo = seleccionado;
        nuevo[campo.key] = value;
        setSeleccionado({...nuevo});
    }
    return (
        <div className="mt-1 d-flex">
            <label className="mx-2">{i18next.t(campo?.label)}:</label>
            <div>
                <DatePicker value={seleccionado[campo?.key] ? moment(seleccionado[campo?.key]).toDate() : null}
                            actualiza={e => handleChange(moment(e).format('YYYY-MM-DD'))}
                />
            </div>
        </div>
    )
};

export default TipoDatepicker;
