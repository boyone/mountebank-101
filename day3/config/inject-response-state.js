function (request, state) { 
    if (typeof state.requests === 'undefined') {
      state.requests = {};
    }
    const item = JSON.parse(request.body);
    if (typeof state.requests[item.id] === 'undefined') {
      state.requests[item.id] = 0;
    }
    state.requests[item.id] += 1;
    
    return { 
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'count': state.requests[item.id]})
    }; 
}