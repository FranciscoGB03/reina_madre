import {useStore} from "../index";

export const setRegistroPassword = (nuevo) => useStore.setState(s => ({registroPassword: {...s.registroPassword, ...nuevo}}));