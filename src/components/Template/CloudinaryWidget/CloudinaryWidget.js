import React, {useEffect, useState} from 'react';
import {default_options} from "./options";
import {noop} from "../../../services/generalService";
import {v4} from "uuid";
import {cl_trans} from "./trans";

const CloudinaryWidget = ({
                              children, cloud_name = process.env.REACT_APP_CLOUDNAME, preset = '', options = {},
                              sources = ['local', 'url', 'camera'],
                              public_id = v4(), multiple = false,
                              maxFiles = 10,
                              language = 'es', onSuccess = noop, onError = noop, onQueuesEnd = noop
                          }) => {
    const [opciones, setOpciones] = useState(
        // ...default_options,
        // ...options,
        // cloudName: cloud_name,
        // uploadPreset: preset,
        // publicId: public_id,
        // multiple: multiple,
        // cropping: !multiple,
        // sources: sources,
        // maxFiles: maxFiles,
        // language: language
        {
            cloudName: cloud_name,
            uploadPreset: preset,
            publicId: public_id,
            multiple: multiple,
            cropping: !multiple,
            showSkipCropButton: true,
            sources:sources,
            language: language,
            maxFiles: maxFiles,
            text: cl_trans,
            styles: {
                palette: {
                    window: "#FFF",
                    windowBorder: "#90A0B3",
                    tabIcon: "#0E2F5A",
                    menuIcons: "#5A616A",
                    textDark: "#000000",
                    textLight: "#FFFFFF",
                    link: "#0078FF",
                    action: "#FF620C",
                    inactiveTabIcon: "#0E2F5A",
                    error: "#F44235",
                    inProgress: "#0078FF",
                    complete: "#20B832",
                    sourceBg: "#E4EBF1"
                }
            }
        }
    );
    const [myWidget, setMyWidget] = useState();
    const handleQueueEnd = (info) => {
        // myWidget.close({quiet: true});
        onQueuesEnd(info);
    }
    useEffect(() => {
        setMyWidget(window.cloudinary.createUploadWidget(opciones, (error, result) => {
                if (error) {
                    onError(error);
                    setOpciones(default_options);
                }
                if (result.event === 'success'){
                    onSuccess(result.info);
                    setOpciones(default_options);
                }
                if (result.event === 'queues-end') {
                    handleQueueEnd(result.info.files)
                }
            }
        ))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div onClick={() => {
            myWidget.update({public_id: v4()});
            myWidget.open()
        }}>
            {children}
        </div>
    );
};

export default CloudinaryWidget;
