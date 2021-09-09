const IResponse = require('../../../domain/entities/IResponse')

class NoRequiredParamErrorResponse extends IResponse {
    type;
    success;
    data;
    error;

    constructor(error) {
        super();
        this.type = 'NO_REQUIRED_PARAM';
        this.success = false;
        this.error =  error || 'NO required param';
    }

}

module.exports = NoRequiredParamErrorResponse;