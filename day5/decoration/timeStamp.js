function (request, response, logger) {
    response.body.timestamp = '2018-12-03T10:57:37.842+07:00';

    const path = require('path');
    const dateFormat = require(path.resolve('node_modules/dateformat/lib/dateformat'));
    
    response.body.ldatetime = dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM:ss.l+07:00");
    response.body.date = dateFormat(new Date(), "yyyy-mm-dd HH Z o");
    response.body.time = dateFormat(new Date(), "HHMMss Z o");
    response.body.longtime = dateFormat("longTime");
}