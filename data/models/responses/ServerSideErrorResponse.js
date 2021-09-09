const IResponse = require('../../../domain/entities/IResponse')

class ServerSideErrorResponse extends IResponse {
    type;
    success;
    data;
    error;

    constructor(error) {
        super();
        this.type = 'INTERNAL_ERROR';
        this.success = false;
        this.error = error;
    }

}

module.exports = ServerSideErrorResponse;