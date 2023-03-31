import { HttpStatus, HttpException } from "@nestjs/common";
import { ResponseCodes } from "../constants";
import {Helpers} from "./helpers";


export class CustomError extends HttpException {
    err: any = {};

    constructor(errMessage: string) {
        super(
            {
                code: HttpStatus.BAD_REQUEST,
                success: false,
                message: errMessage,
            },
            HttpStatus.BAD_REQUEST);
        this.err = errMessage;
    }
    statusCode = this.err;
}