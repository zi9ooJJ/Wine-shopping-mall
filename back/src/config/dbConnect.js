const mongoose  = require('mongoose');
const AppError = require('../misc/AppError');


const connect = () => {
    console.log(process.env.DB_URL)
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_URL, {  // app.js(메인서버 js파일)에서 dotenv를 호출했으니 여기서도 연결됨(아래 export한 connect를 app.js에서 호출했으니까.).
        dbName: 'wine'
    }, (error, result) => {
        console.log('mongoDB connection success');
    });
}
// 몽구스 커넥션에도 에러처리 해주기 위해 이벤트 리스너를 달게 해준다.
mongoose.connection.on('error', (error) => {
    console.error('mongoDB connection error: ', error);
    // & 에러처리 어떻게 하는가.
});

mongoose.connection.on('disconnected', () => {
    console.error('lost connection to mongoDB. trying to reconnect');
    // & 에러처리 어떻게 하는가.
    connect(); // 연결 재시도.
});

module.exports = connect;
