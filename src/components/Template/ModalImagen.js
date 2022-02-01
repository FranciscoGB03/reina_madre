import React, {useState} from 'react'
import ImagenDropzone from './Adjuntos/ImagenDropzone';
import $ from 'jquery';
import i18next from "i18next";

const ModalImagen = ({onGuardar, multiple = false, titulo = ''}) => {
    const [imagen, setImagen] = useState({});
    const [fileNames, setFileNames] = useState([]);
    const [bandera, setBandera] = useState(true);

    const guardaImagen = () => {
        onGuardar(imagen);
        setImagen({});
        setFileNames([]);
        setBandera(true);
        $('#agregarImagen').modal('hide');
    }
    const actualizaImagen = (e) => {
        setBandera(false);
        setImagen(e);
    }

    return (
        <div className="modal fade" id="agregarImagen" tabIndex="-1" role="dialog" aria-labelledby="agregarImagenTitle"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="titulo">{`${i18next.t('catalogos:agregarImagen')}${titulo}`}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <ImagenDropzone onChange={actualizaImagen}
                                            fileNames={fileNames}
                                            setFileNames={setFileNames}
                                            multiple={multiple}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button"
                                onClick={() => {
                                    setFileNames([]);
                                    setBandera(true);
                                    $('#agregarImagen').modal('hide')
                                }
                                }
                                className="btn btn-secondary"
                                data-dismiss="modal">{i18next.t('general:cancelar')}
                        </button>
                        <button type="button" disabled={bandera} onClick={guardaImagen}
                                className={`btn ${bandera ? 'btn-outline-danger' : 'btn-outline-success'}`}>{i18next.t('general:guardar')}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ModalImagen;
