import i18next from "i18next";

export const copiarPortapapeles = (nombreDiv) => {
    let el = document.getElementById(nombreDiv);
    let body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(el);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
        }
    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
    document.execCommand('copy');
    sel.removeAllRanges();
    alert(i18next.t('general:copiadoCorrecto'));
};

export const isEmailValid = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const isPasswordEnforced = password => {
    return !!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%.,*#?&^_-]{8,}$/);
};

export const cifraString = str => {
    let rand1 = Math.random().toString(36).substr(2, 5);
    let rand2 = Math.random().toString(36).substr(2, 5);
    return window.btoa(`${rand1}##${str}##${rand2}`);
}

export const noop = () => {};