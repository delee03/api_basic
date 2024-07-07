function nauCom() {
    setTimeout(() => {
        console.log("Tường nấu cơm");
    }, 3000);
}

function lauNha() {
    console.log("lau nhà");
}

nauCom();
//ném xử lí của function nấu cơm vào queue
lauNha();
//thực thi lauNha trước

//Promise handler

let myPromise = new Promise((resolve, reject) => {
    //trạng thái xử lí resolve
    //trạng thái thất bại reject
    let sinhVienGioi = 10;
    if (sinhVienGioi > 8) {
        resolve("Chúc mừng sinh viên xuất sắc");
    } else {
        reject("Cố gắng hơn nhé");
    }
});

myPromise
    .then((resolve) => {
        console.log(resolve);
    })
    .catch((err) => {
        console.log(err);
    });

//axios

//đầu 2: 201 tạo thành công, 200 OK xử lí thành công
//đầu 4 : not found, 400 bad-request, 401 authorize
//403 not allowed
//Đầu 5: 500 server error do mơ hồ ko rõ nguyên nhân

let promise = axios({
    //method: Phương thức HTTP
    method: "GET",
    //url: Đường dẫn API
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01",
    headers: {
        tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczNjI5NDQwMDAwMCIsIm5iZiI6MTcxMjk0MTIwMCwiZXhwIjoxNzM2NDQyMDAwfQ.dTEJFBH9VnWoG3lE6KU86OTAeY78oRLVFwIiQgbKkCM",
    },

    //data: Dữ liệu gửi lên
});

promise
    .then((res) => {
        console.log(res.data.content);
    })
    .catch((err) => {
        console.log(err);
    });

//thực hiện khai báo 1 instance cho axios

let http = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn/api/", // + end pint
    timeout: 30000, // thời gian setup , nếu quá thời gian sẽ tự động báo lỗi
    headers: {
        tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczNjI5NDQwMDAwMCIsIm5iZiI6MTcxMjk0MTIwMCwiZXhwIjoxNzM2NDQyMDAwfQ.dTEJFBH9VnWoG3lE6KU86OTAeY78oRLVFwIiQgbKkCM",
    },
});

let promise2 = http.get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"); //end point
//http.get("QuanLyNguoiDung/LayDanhSachNgu")

promise2
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

//Async - await

async function layDuLieuNguoiDung() {
    try {
        let result = await http.get(
            "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
        );
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

layDuLieuNguoiDung();

let layDuLieu = async () => {
    //async với arrow function;
};
