function (request, state, logger) { 
    if (typeof state.requests === 'undefined') {
      state.requests = {};
    }
    const item = JSON.parse(request.body);
    
    if (typeof state.requests[item.user] === 'undefined') {
      state.requests[item.user] = { 'count': 0, 'amount': 0};
    }

    state.requests[item.user].count += 1;
    state.requests[item.user].amount += item.price * item.quantity;

    if(state.requests[item.user].count > 3 || state.requests[item.user].amount > 1000) {
      return {statusCode: 400};
    }

    return { 
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(state.requests[item.user])
    };
}