function (request) { 
    if (request.path.indexOf('/items/1') === 0) { 
        return true; 
    } else { 
        return false;
    }
}