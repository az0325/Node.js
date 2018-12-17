const http = require('http');
const fs = require('fs');

//메모리
const users = {};

//리팩토링
const router = {
    get : {
        '/': (req, res) => {
            fs.readFile('./restFront.html', (err, data) => {
                if (err) {
                    throw err;
                }
                res.end(data);
            });
        },
        '/users': (req, res) => {
            res.end(JSON.stringify(users));
        },
        '*': (req, res) => {
            fs.readFile(`.${req.url}`, (err, data) => { //정적 파일 처리
                if (err) {
                    return res.end('NOT FOUND')
                }
                return res.end(data);
            });
        }
    },
    post : {
        '/users': (req, res) => {
            let body = '';
            req.on('data', (data)=> {
                body += data;
            });
            return req.on('end', () => {
                console.log('POST : ', body);
                const { name } = JSON.parse(body);
                const id = +new Date();
                users[id] = name;
                res.writeHead(201, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('등록 성공')
            });
        }
    },
    // patch : {
    //     '/': (req, res) => {

    //     },
    //     '/users': (req, res) => {

    //     }
    // },
    put : {
        '/users': (req, res) => {
            const id = req.url.split('/')[2];
            let body = '';
            req.on('data', (data)=> {
                body += data;
            });
            return req.on('end', () => {
                console.log('PUT : ', body);
                users[id] = JSON.parse(body).name;
                return res.end(JSON.stringify(users));
            });
        }
    },
    delete : {
        '/users': (req, res) => {
            const id = req.url.split('/')[2];
            let body = '';
            req.on('data', (data)=> {
                body += data;
            });
            return req.on('end', () => {
                console.log('DELETE : ', body);
                delete users[id];
                return res.end(JSON.stringify(users));
            });
        }
    }
}

const server = http.createServer((req, res) => {

    const matchedUrl = router[req.method.toLowerCase()][req.url];

    //matchedUrl이 undefined일 때,
    (matchedUrl || router[req.method.toLowerCase()]['*'])(res, req);

//     if (req.method === 'GET') {
//         if (req.url === '/') {
//             return fs.readFile('./restFront.html', (err, data) => {
//                 if (err) {
//                     throw err;
//                 }
//                 res.end(data);
//             });
//         } else if (req.url === '/users') {
//             return res.end(JSON.stringify(users));
//         }
//         return fs.readFile(`.${req.url}`, (err, data) => { //정적 파일 처리
//             if (err) {
//                 return res.end('NOT FOUND')
//             }
//             return res.end(data);
//         });
//     }

//     else if (req.method === 'POST') {
//         if (req.url === '/users') {
//             let body = '';
//             req.on('data', (data)=> {
//                 body += data;
//             });
//             return req.on('end', () => {
//                 console.log('POST : ', body);
//                 const { name } = JSON.parse(body);
//                 const id = +new Date();
//                 users[id] = name;
//                 res.writeHead(201, { 'Content-Type': 'text/html; charset=utf-8' });
//                 res.end('등록 성공')
//             });
//         }
//     }

//     else if (req.method === 'PATCH') {
//         if (req.url === '/') {

//         } else if (req.url === '/users') {

//         }
//     }

//     else if (req.method === 'PUT') {
//         if (req.url.startsWith('/users/')) {
//             const id = req.url.split('/')[2];
//             let body = '';
//             req.on('data', (data)=> {
//                 body += data;
//             });
//             return req.on('end', () => {
//                 console.log('PUT : ', body);
//                 users[id] = JSON.parse(body).name;
//                 return res.end(JSON.stringify(users));
//             });
//         }
//     }

//     else if (req.method === 'DELETE') {
//         if (req.url.startsWith('/users/')) {
//             const id = req.url.split('/')[2];
//             let body = '';
//             req.on('data', (data)=> {
//                 body += data;
//             });
//             return req.on('end', () => {
//                 console.log('DELETE : ', body);
//                 delete users[id];
//                 return res.end(JSON.stringify(users));
//             });
//         }
//     }

}).listen(8090, () => {
    console.log('8090번 포트에서 서버 대기 중')
});