import {Injectable} from '@nestjs/common';
import {DataSource} from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
const mysql = require('mysql');

@Injectable()
export class UsersService {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource
    ){}
}
