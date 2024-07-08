function getEById(id) {
    return document.getElementById(id);
}

//thực hiện khai báo 1 instance cho axios

let http = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn/api/", // + end point
    timeout: 30000, // thời gian setup , nếu quá thời gian sẽ tự động báo lỗi
    headers: {
        tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczNjI5NDQwMDAwMCIsIm5iZiI6MTcxMjk0MTIwMCwiZXhwIjoxNzM2NDQyMDAwfQ.dTEJFBH9VnWoG3lE6KU86OTAeY78oRLVFwIiQgbKkCM",

        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4xMTIzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiYWRtaW4xMjNAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJhZG1pbjEyM0BnbWFpbC5jb20iLCJHUDAxIl0sIm5iZiI6MTcyMDQyNjM5NiwiZXhwIjoxNzIwNDI5OTk2fQ.i1dW5Dy7rjFNsYT61U2QTm1l-xDVCq3nYOkwO4LJdhE",
    },
});

// B1: Thực hiện truy xuất dữ liệu từ APPI
// B2: Tạo 1 hàm để hiển thị dữ liệu từ BackEnd

async function layDuLieuNguoiDung() {
    let res = await http.get(
        "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00"
    );
    console.log(res.data.content);
    renderArrNguoiDung(res.data.content);
}

layDuLieuNguoiDung();

function renderArrNguoiDung(arr) {
    let content = ""; //chứa chuỗi HTML
    for (let nguoiDung of arr) {
        // destructoring bóc từ nguoiDung
        let { taiKhoan, email, hoTen, soDT, maLoaiNguoiDung } = nguoiDung;
        content += `
                <tr class="">
                        <td scope="row">${taiKhoan}</td>
                        <td>${hoTen}</td>
                        <td>${email}</td>
                         <td>${soDT}</td>
                        <td>${
                            maLoaiNguoiDung == "QuanTri"
                                ? "<span class='badge text-bg-info'>Quản trị</span>"
                                : "<span class='badge text-bg-success'>Khách hàng</span>"
                        }
                        </td>
                        <td>
                            <button onclick="deleteUser('${taiKhoan}')" class='btn btn-danger'>Xóa</button>
                            <button onclick="getUserByTaiKhoan('${taiKhoan}')" class='btn btn-warning'>Sửa</button>
                        </td>
                </tr>
        `;
    }
    document.getElementById("nguoiDung_tbody").innerHTML = content;
}

//thực hiện tạo hàm lấy dữ liệu từ form
function getValueForm() {
    let formValue = document.querySelectorAll("#QLND_form input");
    console.log(formValue);
    let nguoiDung = {};

    for (let field of formValue) {
        let { id, value } = field;
        nguoiDung[id] = value;
    }
    return nguoiDung;
}

//xử lí gọi API đăgn kí từ backEnd
function submitValue(e) {
    e.preventDefault();
    //B1 thực hiện truy xuất lấy dữ liệu từ form
    let nguoiDung = getValueForm();
    //B2 thực hiện gửi dữ liệu cho BE dki user mới bằng thư viện Axios
    http.post("QuanLyNguoiDung/DangKy", { ...nguoiDung, maNhom: "GP01" })
        .then(function (response) {
            console.log(response);
            getEById("QLND_form").reset();
        })
        .catch(function (error) {
            console.log(error);
            alert("Có lỗi xảy ra, vui lòng thử lại");
        });
}

getEById("QLND_form").onsubmit = submitValue;

//xóa người dùng
function deleteUser(taiKhoan) {
    http.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
            alert("có lỗi xảy ra khi xóa vui lòng thử lại");
        });
}

let maLoaiNguoiDung = "";
//lây thông tin người dùng truyeenf len form
function getUserByTaiKhoan(taiKhoan) {
    http.post(`QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`)
        .then((res) => {
            console.log(res);
            let arrField = document.querySelectorAll("#QLND_form input");
            let nguoiDung = res.data.content;
            for (let field of arrField) {
                field.value = nguoiDung[field.id];
            }
            maLoaiNguoiDung = res.data.content.maLoaiNguoiDung;
        })
        .catch((err) => {
            console.log(err);
            alert("Đã có lỗi khi update");
        });
}

//save update nguoi dung
function submitUpdate(e) {
    e.preventDefault();
    //B1 thực hiện truy xuất lấy dữ liệu từ form
    let nguoiDung = getValueForm();
    let newNguoiDung = { ...nguoiDung, maNhom: "GP01", maLoaiNguoiDung };

    //B2 thực hiện gửi dữ liệu cho BE dki user mới bằng thư viện Axios
    http.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", newNguoiDung)
        .then((res) => {
            console.log(res);
            alert("Cập nhật thành công");
            layDuLieuNguoiDung();
        })
        .catch((err) => {
            console.log(err);
        });
}

getEById("btnUpdate").onclick = submitUpdate;

//truyền lên form

// function fillToForm(taiKhoan) {
//     let nguoiDung = getUserByTaiKhoan(taiKhoan);
//     let formValue = document.querySelectorAll("#QLND_form input");
//     for (let field of formValue) {
//         field.value = nguoiDung[field.id];
//     }
// }
