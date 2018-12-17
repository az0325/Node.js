const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;
const http = require('http');

//반복문으로 서버를 여러개를 만듦
if(cluster.isMaster){
    //worker들의 행동들을 총 관리
    console.log('Master Process ID : ', process.pid);
    for(let i = 0; i < numCPUs; i++){
        cluster.fork();
    }
    //worker가 쓰러지면, 다시 만들어줌
    cluster.on('exit', (worker, code, signal) => {
        console.log('워커 종료 : ', worker.process.pid);
        cluster.fork();
    });
} else {
    //worker(일꾼)일 경우 -> 서버를 만듦
    http.createServer((req, res)=> {
        res.end('http server');
    }).listen(8090);
    console.log('워커 실행 : ',process.pid);
}