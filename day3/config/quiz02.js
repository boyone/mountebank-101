function (request) { 
    const item = JSON.parse(request.body);
    if (item.name == 'riderX') { 
      return { 
        statusCode: 201,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'message': 'item is created'})
      }; 
    }
    if (item.name == 'alpha bot') { 
        return { 
          statusCode: 401,
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({'message': 'item is not allowed'})
        }; 
    }
    return {}; 
}