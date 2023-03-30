import { HttpStatus, HttpException } from "@nestjs/common";
import { ResponseCodes } from "../constants";
import {Helpers} from "./helpers";


export class CustomError extends HttpException {
    err: any = {};

    constructor(err, additionalText: string = '') {
        super(
            {
                statusCode: HttpStatus.BAD_REQUEST,
                errorCode: Number(ResponseCodes[err] == undefined ? 0 : Helpers.GetEnumKeyByEnumValue(ResponseCodes, ResponseCodes[err])),
                message: [(ResponseCodes[err] == undefined ? '' : ResponseCodes[err]) + additionalText],
            },
            HttpStatus.BAD_REQUEST);
        this.err = err;
    }
    statusCode = this.err;
}