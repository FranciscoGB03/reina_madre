import React from 'react';
import {Helmet} from "react-helmet-async";

const CloudinaryScript = () => {
    return (
        <div>
            <Helmet>
                <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>
            </Helmet>
        </div>
    );
};
export default CloudinaryScript;