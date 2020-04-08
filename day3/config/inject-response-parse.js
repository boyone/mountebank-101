function (request) { 
    const item = JSON.parse(request.body);
    if (item.id === 1) { 
      return { 
        statusCode: 404,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'message': 'resource not found'})
      }; 
    } 
    return {}; 
}