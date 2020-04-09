function (request, response, logger) { 
    const item = JSON.parse(request.body); 
    response.body.message = item.name + ' is created';
    response.body.timestamp = new Date().toString(); 
}