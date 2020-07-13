import { func } from "prop-types";
import CryptoJS from 'crypto-js';

/**
 * Function that validates fields from anywhere in the app
 * 
 * @param {Object} field - Field to be validated
 * @param {string} field.value - The value of the input
 * @param {string} field.validation - The type of validations to be done
 * 
 * @returns {Object}  - This object contains the result and the message
 * @returns {boolean} result - This object contains the result and the message
 * @returns {string} messageCode - Code message to be encoded
 */
export function validateField(field, fieldCompare){
    const response = {};
    //Si el campo es obligatorio o si tiene un valor, validamos su contenido
    if(field.required || (field.value !== "" && typeof field.value === 'string') ){
        const pathErroTranslation = "investigation.errors.";
        let re;
        switch(field.validation){
            case "validEmail" : 
                re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                response.result = re.test(String(field.value).toLowerCase());
                response.messageCode = pathErroTranslation+"error_email";
                break;
            case "validPhone" : 
                re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
                response.result = re.test(String(field.value).toLowerCase());
                response.messageCode = pathErroTranslation+"error_phone";
                break;
            case "password":
                response.result = Boolean(field.value && field.value.length > 6);
                response.messageCode =  pathErroTranslation+"error_password"
                break;
            case "textMin2" : 
                response.result = Boolean(field.value && field.value.length > 2);
                response.messageCode =  pathErroTranslation+"error_length2"
                break;
            case "textMin6" : 
                response.result = Boolean(field.value && field.value.length > 6);
                response.messageCode =  pathErroTranslation+"error_length6"
                break;
            case "notEmpty" : 
                response.result = Boolean(field.value && field.value !== "");
                response.messageCode =  pathErroTranslation+"error_not_empty"
                break;
            case "equalTo":
                response.result = Boolean(field.value === fieldCompare);
                response.messageCode =  pathErroTranslation+"error_not_same"
                break;
            default:
                console.log("Validación no definida");
                response.result = false;
                response.messageCode =  pathErroTranslation+"error_not_defined"
                break;
        }
    }
    else{
        response.result = true;
        response.messageCode =  "";
    }
    return response;
    
}

export async function generateKey(){
    const genObj = await crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256
        },
        true,
        ["encrypt", "decrypt"]
      );
    //A partir del objeto cryptoObj obtenemos la clave
    const cryptoObj = await crypto.subtle.exportKey("jwk", genObj);
    const keyString = cryptoObj.k;

    return keyString;
}

export async function importKey(key){
    let keyObj = await crypto.subtle.importKey(
        "jwk",
        {
            alg: "A256GCM",
            ext: true,
            k: key,
            key_ops: ["encrypt", "decrypt"],
            kty: "oct"
        },
        {
            name: "AES-GCM",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
    );

    return keyObj;
}

export async function encriptData(data, key){
    var KeyObj = CryptoJS.AES.encrypt(data, key);
    var ciphertext = KeyObj.toString();
    console.log(KeyObj);
    return ciphertext;
}

export async function decryptData(ciphertext, key){

     var bytes  = CryptoJS.AES.decrypt(ciphertext, key);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    console.log(originalText);

    return originalText;

}

