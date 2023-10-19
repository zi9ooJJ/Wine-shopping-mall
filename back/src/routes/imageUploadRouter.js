const imageUploadRouter = require('express').Router();
const isAdmin = require('../middlewares/isAdmin');
const util = require('../misc/util');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({ // 저장소를 하드다스크로 (memoeryStorage는 메모리에 저장해달라는 거. 휘발성.)
    destination : function(req, file, cb){
        cb(null, './src/image') // terminal에서 설정된 경로기준으로 src/image 폴더에 넣겠다는 뜻
    },
    filename : function(req, file, cb){
        cb(null, file.originalname) // 기본파일명으로 저장함. 원한다면 이름을 커스텀 가능 (날짜는 file.originalname + new Date())
    },
    fileFilter: function (req, file, callback) { // 파일 형식(확장자) 거르기
        const ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('PNG, JPG만 업로드하세요', 'only allowed png and jpg'))
        }
        callback(null, true)
    },
    limits:{ // 파일 사이즈 제한
        fileSize: 1024 * 1024
    }
})
const upload = multer({storage : storage}); // 미들웨어임. 쓸땐, upload.single('input의 name속성이름(json으로 요청시의 key 값)') 형식 지켜야 함.


// imageUploadRouter.use('/', isAdmin);
imageUploadRouter.get('/', (req, res, next) =>{
    console.log('/upload 페이지입니다.')
    res.status(200).json(util.buildResponse({text: '/upload 페이지입니다.'}, null, 200))
})

// ! 다수 이미지 업로드할 때, single말고 array('input의 name', 최대 받을 이미지 개수) 설정(프론트에선 type="file"인 input의 속성에 multiple 넣어주기)
imageUploadRouter.post('/', upload.single('profile'), (req, res, next) =>{
    console.log('이미지 업로드 완료했습니다.')
    res.status(200).json(util.buildResponse({text:"이미지 업로드가 완료되었습니다."}, null, 200))
})

// ! 업로드한 이미지 보여주는법(이미지API 만들기)
imageUploadRouter.get('/image/:imageName', (req, res) =>{
    // ! /image/:파라미터에 접속시 '파라미터' 라는 파일을 보내주는 코드.
    // __dirname은 현재 이 코드를 작성한 파일의 경로
    console.log(path.join(__dirname, '..\\') +'image\\'+ req.params.imageName);
    // res.sendFile(path.join(__dirname, '..\\') +'image\\'+ req.params.imageName)
    res.status(200).json(util.buildResponse({imageFile: path.join(__dirname, '..\\') +'image\\'+ req.params.imageName}, null, 200));
})

// 프론트에선, <img src="/image/nodejs.jpg"> 로 사진 띄우기 가능.

// 프론트에서 UI로 기능작동 시키기 위해 써줘야 함.
// entype의 내용 : 인코딩 하지 말고 파일 그대로 전송해달라(default값은 base64로 인코딩해서 보냄)
{/* <form method="post" action="/upload" enctype="multipart/form-data">
    <input type="file" name="profile"><br>
    <button type="submit">전송</button>
</form> */}

module.exports = imageUploadRouter;