import dbConfig from './db-config';
import FS from 'fs-extra';
import Path from 'path';
const privateKey = FS.readFileSync(Path.resolve(__dirname, '.', 'jwt-keys', 'Private.Key'));
const publicKey = FS.readFileSync(Path.resolve(__dirname, '.', 'jwt-keys', 'Public.Key'));
module.exports = {
    dbConfig,
    privateKey,
    publicKey,
};