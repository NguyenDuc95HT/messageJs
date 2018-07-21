import dbConfig from './db-config';
import FS from 'fs-extra';
import Path from 'path';
const privateKey = FS.readFileSync(Path.resolve(__dirname, '.', 'jwt-keys', 'Private.Key'), 'utf-8');
const publicKey = FS.readFileSync(Path.resolve(__dirname, '.', 'jwt-keys', 'Public.Key'), 'utf-8');
module.exports = {
    dbConfig,
    privateKey,
    publicKey,
};