//load danh sách người dùng
var urlAPI = "http://localhost/api/nhanviens";
function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET",urlAPI);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = ''; 
        const objects = JSON.parse(this.responseText);
        
        for (let object of objects) {
          trHTML += '<tr>'; 
          trHTML += '<td>'+object['id']+'</td>';
          trHTML += '<td>'+object['maNhanVien']+'</td>';
          trHTML += '<td>'+object['hoTenNhanVien']+'</td>';
          trHTML += '<td>'+object['diaChi']+'</td>';
          trHTML += '<td>'+object['phongBan']+'</td>';
          trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox('+object['id']+')">Sửa</button>';
          trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete('+object['id']+')">Xóa</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  
  loadTable();

  //hiển thị hộp thoại thêm mới thông tin người dùng
  function showUserCreateBox() {
    Swal.fire({
      title: 'Thêm Nhân Viên',
      html:
        '<input id="id" type="hidden">' +
        '<input id="maNhanVien" class="swal2-input" placeholder="Mã Nhân Viên">' +
        '<input id="hoTenNhanVien" class="swal2-input" placeholder="Họ Tên">' +
        '<input id="diaChi" class="swal2-input" placeholder="Địa chỉ">' +
        '<input id="phongBan" class="swal2-input" placeholder="phòng ban">',
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      }
    })
  }
  
  //thêm mới một người dùng
  function userCreate() {
    const maNhanVien = document.getElementById("maNhanVien").value;
    const hoTenNhanVien = document.getElementById("hoTenNhanVien").value;
    const diaChi = document.getElementById("diaChi").value;
    const phongBan = document.getElementById("phongBan").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", urlAPI);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "maNhanVien": maNhanVien, 
      "hoTenNhanVien": hoTenNhanVien, 
      "diaChi": diaChi, 
      "phongBan": phongBan     
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 201) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable(); //sau khi thêm mói load lại dữ liệu đã thêm ra table
      }
    };
  }

  //hiển thị thông tin chi tiết người dùng thông qua ID
  function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", urlAPI + "/" + id);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        const user = objects['user'];
        console.log(user);
        Swal.fire({
          title: 'Thông Tin-Cập Nhật',
          html:
            '<input id="id" type="hidden" value='+user['id']+'>' +
            '<input id="maNhanVien" class="swal2-input" placeholder="First" value="'+user['maNhanVien']+'">' +
            '<input id="hoTenNhanVien" class="swal2-input" placeholder="Last" value="'+user['hoTenNhanVien']+'">' +
            '<input id="diaChi" class="swal2-input" placeholder="Username" value="'+user['diaChi']+'">' +
            '<input id="phongBan" class="swal2-input" placeholder="Email" value="'+user['phongBan']+'">',
          focusConfirm: false,
          preConfirm: () => {
            userEdit();
          }
        })
      }
    };
  }
  
  //cập nhật thông tin người dùng
  function userEdit() {
    const id = document.getElementById("id").value;
    const maNhanVien = document.getElementById("maNhanVien").value;
    const hoTenNhanVien = document.getElementById("hoTenNhanVien").value;
    const diaChi = document.getElementById("diaChi").value;
    const phongBan = document.getElementById("phongBan").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", urlAPI + "/" + id);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id, 
      "maNhanVien": maNhanVien, 
      "hoTenNhanVien": hoTenNhanVien, 
      "diaChi": diaChi, 
      "phongBan": phongBan
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      }
    };
  }

  //hàm xóa người dùng
  function userDelete(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE",  urlAPI + "/" + id);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      } 
    };
  }