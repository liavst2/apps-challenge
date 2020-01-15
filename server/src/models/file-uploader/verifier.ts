
import Errors = require("./errors");
const crypto = require('crypto');
const fs = require('fs');
const util = require('util');
const publicKeyPath = '/opt/rf/crypto/publicKey.pem';
const readFile = util.promisify(fs.readFile);

export class Verifier {

    file;
    signature;

    /**
     *
     * @param file:      buffer
     * @param signature: string
     */
    constructor(file, signature) {
        this.file = file;
        this.signature = signature;
    }

    async verify() {

        let publicKey;
        try {
            publicKey = await readFile( publicKeyPath, { encoding: 'utf8', flag: 'r' }  );

        }  catch(e)  {
            console.error(e);
            throw Errors.publicKeyReadError;
        }

        const verifier = crypto.createVerify('sha256');
        const hashedFile = crypto.createHash('sha256').update(this.file).digest('base64');
        verifier.update(hashedFile);
        const ver = verifier.verify( publicKey , this.signature, 'base64');

        if ( ! ver ){
               return Promise.reject(Errors.verifierError)
        }
        else {
            return Promise.resolve();
        }
    }

}
