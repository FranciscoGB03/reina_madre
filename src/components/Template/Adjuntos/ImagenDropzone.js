import React from 'react';
import Dropzone from 'react-dropzone';
import { FcOpenedFolder, FcFolder } from 'react-icons/fc';
import i18next from "i18next";

const ImagenDropzone = ({ onChange = () => { },fileNames,setFileNames, multiple = false }) => {
    const handleDrop = acceptedFiles => {
        setFileNames(acceptedFiles.map(file => file.name));
        onChange(acceptedFiles)
    }
    return (
        <div className="App">
            <Dropzone onDrop={handleDrop}
                accept="image/*"
                minSize={1024}
                maxSize={3072000}
                multiple={multiple}>
                {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject}) => {
                    const additionalClass = isDragAccept ? "accept" : isDragReject ? "reject" : "";
                    return (
                        <div className="ml-auto mr-auto text-small" style={isDragActive ? { border: '4px dashed  #007E33' } : { border: '2px dashed #0d47a1' }} {...getRootProps({ className: `dropzone ${additionalClass}` })}>
                            <input {...getInputProps()} />
                            <span className="">{isDragActive ? <FcOpenedFolder size={30} /> : <FcFolder size={30} />}</span>
                            <p>{i18next.t('catalogos:seleccionaArchivo')}</p>
                        </div>
                    );
                }}
            </Dropzone>
            <div>
                <strong>{i18next.t('catalogos:archivos')}</strong>
                <ul>
                    {fileNames.map(fileName => (
                        <li key={fileName}>{fileName}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default ImagenDropzone;
