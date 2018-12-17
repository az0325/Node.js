const http = require('http');
const https = require('https');
const http2 = require('http2');

http.createServer((req, res) => {
    res.end('http server');
}).listen(80);

//암호화가 제대로 되고 있다는 '인증서'가 필요
https.createServer({

}, (req, res) => {
    res.end('https server');
}).listen(443);

//https 기반에서만 사용 가능 -> '인증서' 필요 :  Node v.10
http2.createSecureServer({

}, (req, res) => {
    res.end('https server');
}).listen(443);