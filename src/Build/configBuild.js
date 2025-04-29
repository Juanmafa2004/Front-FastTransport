import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import CryptoJS from "crypto-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const Config = fs.readJsonSync(resolve(__dirname, "../Constant/Config.json"));
const Params = fs.readJsonSync(resolve(__dirname, "../Constant/Params.json"));
const Key = fs.readJsonSync(resolve(__dirname, "../Constant/Key.json"));
const Routes = fs.readJsonSync(resolve(__dirname, "../Constant/Routes.json"));


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const args = process.argv.slice(2);
const baseRute = resolve(__dirname, "..");

const reconstructKey = (shuffledData) => {
    const order = shuffledData.yhs.split(",").map(Number);
    let sortedKeyParts = new Array(order.length);
    for (let i = 0; i < order.length; i++) {
        sortedKeyParts[order[i]] = shuffledData.xyz[i];
    }
    return sortedKeyParts.join("");
};

const encryptInformation = (data) => {
    let dataCifred = JSON.stringify(data);
    if (Params.Encripted[args[0]]) {
        const info = dataCifred;
        const metaKey = reconstructKey(Key.secretKey);
        dataCifred = CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(info),
            metaKey
        ).toString();
    }
    return dataCifred;
};

const transformarJSON = (objeto, funcion) => {
    if (typeof objeto === 'object' && objeto !== null) {
        for (let clave in objeto) {
            if (typeof objeto[clave] === 'object' && objeto[clave] !== null) {
                transformarJSON(objeto[clave], funcion);
            } else {
                objeto[clave] = funcion(objeto[clave]);
            }
        }
    }
    return objeto;
}

const tmpObject = { ...Config }
if (args[0] == 'Local') {
    tmpObject.isProd = Params.Encripted.Local
    tmpObject.Api = encryptInformation(Params.Apis.Local)
    tmpObject.Routes = transformarJSON(Routes.Routes, encryptInformation);
}

if (args[0] == 'Dev') {
    tmpObject.isProd = Params.Encripted.Dev;
    tmpObject.Api = encryptInformation(Params.Apis.Dev);
    tmpObject.Routes = transformarJSON(Routes.Routes, encryptInformation);
}

if (args[0] == 'Prod') {
    tmpObject.isProd = Params.Encripted.Prod;
    tmpObject.Api = encryptInformation(Params.Apis.Prod);
    tmpObject.Routes = transformarJSON(Routes.Routes, encryptInformation);
}

if (args[0] == 'New') {
    tmpObject.isProd = Params.Encripted.New;
    tmpObject.Api = encryptInformation(Params.Apis.New);
    tmpObject.Routes = transformarJSON(Routes.Routes, encryptInformation);
}

tmpObject.rxtz = { ...Key.secretKey }
tmpObject.nzxtz = Params.MinutesJWT


const newConfig = JSON.stringify(tmpObject)
fs.writeFileSync(`${baseRute}/Constant/Config.json`, newConfig);
