
const Errors =  {

                uploadError:            {status:500,   msg: "can not upload file."},
                publicKeyReadError:     {status:500,   msg: "can not read public key."},
                verifierError:          {status:500,   msg: "The file was not signed by Radiflow."},
                saveError:              {status:500,   msg: "can not save file."}
};


export = Errors;