const express = require('express');
const app = express();
const jwt = require('jsonwebtoken'); // เพิ่ม jsonwebtoken
const bodyParser = require('body-parser');
const port = 3001;
const privateKey = 'nitipon1988';

app.use(bodyParser.json());
app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/pages/index.html');
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.post('/api/encode', (req, res) => {
    // สร้างคีย์เป็นรหัสผ่าน (หรือคีย์ลับ) ในที่นี้เราจะใช้ 'mySecretKey' แต่ควรใช้คีย์ที่ปลอดภัยมากขึ้นในสภาวะจริง

    // เรียกใช้ฟังก์ชันเพื่อเข้ารหัส objInfo และสร้าง JWT
    let reqString = JSON.stringify(req.body)
    const encodedToken = encodeAndSign(reqString, privateKey);

    // ส่ง JWT กลับ
    res.json({ data: encodedToken });
});

app.post('/api/decode',(req,res) => {
    let reqString = JSON.stringify(req.body.token)
    reqString = reqString.replace(/"/g, '');
    const decoded = jwt.verify(reqString, privateKey);
    res.json({ data: decoded });
})

function encodeAndSign(obj, privateKey) {
    const token = jwt.sign(obj, privateKey); // ใช้ expiresIn เพื่อกำหนดระยะเวลาในการใช้งานของ token
    return token;
}
