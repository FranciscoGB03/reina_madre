import {cl_trans} from "./trans";

export const default_options = {
    cloudName: 'xheim',
    uploadPreset: 'categorias',
    cropping: true,
    showSkipCropButton: true,
    publicId: '',
    sources:['local', 'url', 'camera'],
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
    },
    language: "es",
    text: cl_trans
};
