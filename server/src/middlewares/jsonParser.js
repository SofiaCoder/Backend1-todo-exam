exports.myMiddleware = function myMiddleware (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    } else if (req.headers['content-type'] === 'application/json') {
        req.on('data', (chunk) => {
            try {
            const body = JSON.parse(chunk.toString());
            req.body = body;
            next()
            }
            catch(error) {
                res.status(500).send('Error occured in jsonParser-middleware')
            }
        })
    } else {
        next()
    }
}