const fs = require("fs");
import path = require("path");
const moment = require('moment');

export class Helpers {
    static twoDecimalPlaces(decimal) {
        return Math.round((Number(decimal) + Number.EPSILON) * 100) / 100;
    }

    static GetEnumKeyByEnumValue(myEnum, enumValue) {
        let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
        return keys.length > 0 ? keys[0] : null;
    }

    static getHTML(file: string) {
        return fs.readFileSync(path.resolve(path.join(__dirname, '../../', 'templates'), `${file}.html`), 'utf8')
    }

    static generateRandomPassword() {
        let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%&()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passwordLength = 8;
        let password = "";
        for (let i = 0; i <= passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber +1);
        }
        return password;
    }

    static generateRandomCode(passwordLength = 8) {
        let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let password = "";
        for (let i = 0; i <= passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber +1);
        }
        return password;
    }

    static getCurrentDate()
    {
        return moment().format('YYYY-MM-D');
    }
}