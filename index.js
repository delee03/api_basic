//thực hiện khai báo 1 instance cho axios

let http = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn/api/", // + end pint
    timeout: 30000, // thời gian setup , nếu quá thời gian sẽ tự động báo lỗi
    headers: {
        tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczNjI5NDQwMDAwMCIsIm5iZiI6MTcxMjk0MTIwMCwiZXhwIjoxNzM2NDQyMDAwfQ.dTEJFBH9VnWoG3lE6KU86OTAeY78oRLVFwIiQgbKkCM",
    },
});

// B1: Thực hiện truy xuất dữ liệu từ APPI
// B2: Tạo 1 hàm để hiển thị dữ liệu từ BackEnd

async function layDuLieuNguoiDung() {
    let res = await http.get(
        "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
    );
    console.log(res);
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
                            <button class='btn btn-danger'>Xóa</button>
                            <button  class='btn btn-warning'>Sửa</button>
                        </td>
                </tr>
        `;
    }
    document.getElementById("nguoiDung_tbody").innerHTML = content;
}
