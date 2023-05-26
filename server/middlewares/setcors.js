
exports.setcors = (req,res,next)=>{
    res.setHeader('Content-Type','application/json');
    res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:8000')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type')
    res.setHeader('Vary','Origin')
    next()
}   