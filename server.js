const {app} =require('./index')
const server = require("./config/server");
const port = server.SERVER_PORT;
const host = server.SERVER_HOST;
app.listen(port, host, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`)
})