var handlers = {};

handlers.user = (data, callback)=>{
    callback(200,{
        method:data.methodType,
    });
};

handlers.feed = (data, callback)=>{
    callback(200,{'Feed' : 'This is feed route'})
};

handlers.notifications = (data, callback)=>{
    callback(200,{'Push' : 'This is notifications route'})
};

handlers.events = (data, callback)=>{
    callback(200,{'Event' : 'This is events route'})
};

handlers.auth = (data, callback)=>{
    callback(200,{'Auth' : 'This is auth route'})
};

handlers.notFound = (data, callback)=>{
    callback(404);
};


var methods = function(){
 console.log(req.method.toLocaleLowerCase());
};

module.exports = handlers;