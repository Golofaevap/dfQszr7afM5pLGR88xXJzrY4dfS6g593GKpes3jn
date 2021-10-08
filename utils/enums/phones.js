export default function getPhonesInfo() {
    const countries = [
        { code: "lv", phoneCode: "+371", name: "Latvia", length: 12, possible: [7026] },
        { code: "lt", phoneCode: "+370", name: "Lithuania", length: 12, possible: [7026] },
        { code: "us", phoneCode: "+1", name: "USA", length: 12, possible: [7026] },
    ];
    const codes = [];
    for (let i in countries) {
        codes.push(countries[i].code);
    }
    return { countries, codes };
}
