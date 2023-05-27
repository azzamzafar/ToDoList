
exports.setcors = ([host,port])=>{
    if (host=='localhost')host='http://127.0.0.1'
    return (req,res,next)=>{
        console.log(host,port)
        res.setHeader('Content-Type','application/json');
        res.setHeader('Access-Control-Allow-Origin',`${host}:${port}`)
        res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
        res.setHeader('Access-Control-Allow-Headers','Content-Type')
        res.setHeader('Vary','Origin')
        next()
    }   
}