
/**
 * This module encloses the 'multer' npm package.
 * https://www.npmjs.com/package/multer
 */

import * as fs from 'fs';
const multer = require('multer');
import { Verifier } from './verifier';
import * as Errors from './errors';
const path = require('path');

let landingDirectory = path.join(__dirname, 'temp-files/');


export class Uploader {

    directory;
    multer;

    constructor(directory = landingDirectory){

        this.directory = directory;
        this.multer = multer({
            storage:multer.memoryStorage(),
            limits: {
                files: 1,
                fileSize: 20 * 1000000
            }
        });
    }


    /**
     *
     * @param req: express request object.
     * @param fieldName: Array<{name:'name', count: count}> // the expected fields that were given in the client side.
     * @param saveAs: Array<{name:'name', saveAs: 'saveAs'}> // saving the  expected fieldName as desired file name.
     */
    async uploadSigned(req, fieldName, saveAs?){

        let uploadResult = await this.uploadSingle(req, fieldName);
        let verifier = new Verifier(req.file.buffer, req.body.signature);
        await verifier.verify();

        let savedFilePath;

        if( saveAs ) {
            savedFilePath = path.join( this.directory, saveAs);
        }
        else {
            savedFilePath = path.join( this.directory, req.file.originalname );
        }

        console.log( "trying to save the uploaded file in path: ", savedFilePath );
        await this.saveFile( savedFilePath, req.file.buffer );
        return savedFilePath;
    };


    /**
     * @param req: express request object.
     * @param fields: Array<{name:'name', count: count}> // the expected fields that were given in the client side.
     * @param saveAs: Array<{name:'name', saveAs: 'saveAs'}> // saving the  expected fields as desired files name.
     */
    uploadUnsigned(req, fields, saveAs?){

    };



     uploadSingle(req, fieldName) {

        let upload = this.multer.single(fieldName);

        return new Promise(function (resolve, reject) {

            upload(req, null, function (err) {
                if (err)
                    reject(Errors.uploadError);
                
                else if(req.file === undefined)
                    reject(Errors.uploadError);
                else
                    resolve({file: req.file, body: req.signature});

            });
        });
    }



     async saveFile(path, buffer){

        return new Promise(function(resolve, reject){
            fs.writeFile(path, buffer, function(err){
                if(err) {
                    reject(Errors.saveError);
                }
                else {
                    resolve();
                }
            });
        });
    }



}
