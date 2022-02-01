import {isExpired, decodeToken} from "react-jwt";

export const getClaims = (token) => decodeToken(token);

export const esVigente = (token) => !isExpired(token);

export const getClaim = (token, claim) => getClaims(token)[claim];

export const getUID = (token) =>token ? getClaims(token)['UID'] : null;

export const getN = (token) =>token ? getClaims(token)['n'] : null;

export const esToken = token => (token.toString() || "").split(".").length === 3;
