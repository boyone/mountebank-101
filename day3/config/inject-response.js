function (request) { 
    if (request.path.indexOf('/items/1') === 0) { 
      return { statusCode: 404 }; 
    } 
    return {}; 
}