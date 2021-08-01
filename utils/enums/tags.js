export function getProxiesTags() {
    return ["proxy", "https / http", "socks5"];
}

export function getProxiesStatus() {
    return ["ALIVE", "DIED", "NEED REVIEW"];
}

const geoTags = ["geo - USA", "geo - Netherlands", "geo - Lithuania", "geo - Germany"];

export function getPhonesTags() {
    return ["phone", ...geoTags];
}

export function getAddressesTags() {
    return ["address", ...geoTags];
}
