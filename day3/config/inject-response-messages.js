function (request) { 
    if (request.path.indexOf('/items/1') === 0) { 
      return { 
        statusCode: 404,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'message': 'resource not found'})
      }; 
    } 
    return {}; 
}