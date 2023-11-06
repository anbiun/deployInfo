  const objEncInfo = {
    files: {},
    deployinfo: {
      date: new Date().toLocaleString('en-US', { hour12: false }),
      user: 'cf303645'
    }
  }

  const el = {
    fileInput: $('#fileInput'),
    areaResult: $('#areaResult'),
    areaEditSwitch: $('#areaEditSwitch'),
    encResult: $('#encResult')

  }

  $(document).ready(() => {
    //On Load
    el.fileInput.on('change', function () {
      let files = this.files
      let newFileData = Array.from(files).map(file => ({
        dir: file.webkitRelativePath,
        lastModifiedDate: file.lastModifiedDate.toLocaleString('en-US', { hour12: false })
      }));

      // สร้าง JSON Object ใหม่ที่มีข้อมูลที่คัดลอกมาจาก files
      objEncInfo.files = newFileData
      el.areaResult.text(JSON.stringify(objEncInfo, undefined, 2))
    })

    el.areaEditSwitch.on('change', function () {
      el.areaResult.prop('disabled', !this.checked)
    })

    el.areaResult.on('blur', () => {
      el.areaEditSwitch.prop('checked', false)
      el.areaEditSwitch.trigger('change')
    })

    $('button.dropdown-item').on('click',function() { 
      $('#defaultBtnGroup').text(this.textContent)
      if(this.value == 'download') {
        console.log('download')
      } 
    })

  })

import jwt from 'jsonwebtoken';

// สร้างข้อมูล JSON ที่ต้องการเข้ารหัส
const jsonData = { name: 'John', age: 30, city: 'New York' };

// กำหนด secret key สำหรับการเข้ารหัสและถอดรหัส
const secretKey = 'YourSecretKey'; // สามารถแทนคีย์นี้ตามต้องการ

// เข้ารหัส JSON เป็น JWT
const token = jwt.sign(jsonData, secretKey, { expiresIn: '1h' }); // ในกรณีนี้ token จะหมดอายุใน 1 ชั่วโมง

console.log('Token:', token);

// ถอดรหัส JWT เป็น JSON
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('เกิดข้อผิดพลาดในการถอดรหัส:', err);
  } else {
    console.log('ข้อมูล JSON ที่ถอดรหัส:', decoded);
  }
});