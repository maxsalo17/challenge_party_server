const IResponse = require('../../../domain/entities/IResponse')

class BaseSuccessResponse extends IResponse {


    constructor(type, data) {
        super()
        this.type = type;
        this.success = true;
        this.data = data;
    }

}

module.exports = BaseSuccessResponse;