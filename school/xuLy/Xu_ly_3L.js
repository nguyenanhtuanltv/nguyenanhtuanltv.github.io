
const Dia_chi_Dich_vu = "data/dsHocsinh.json"

//========================================
function Doc_Danh_sach_Hoc_sinh() {
  let Du_lieu = {}
  let Xu_ly_HTTP = new XMLHttpRequest()
  let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}`
  Xu_ly_HTTP.open("GET", Dia_chi_Xu_ly, false)
  Xu_ly_HTTP.send("")
  let Chuoi_JSON = Xu_ly_HTTP.responseText
  if (Chuoi_JSON != "") {
    Du_lieu = JSON.parse(Chuoi_JSON)
    Du_lieu.forEach(item => {
      let hoTen = item.Ho_ten.split(" ");
      item.Ten = hoTen[hoTen.length - 1]
    })
  }
  return Du_lieu
}


//==============================================

function Xuat_dsHocsinh(ds, Th_Cha) {
  ds.sort((a, b) => {
    return a.Ten.localeCompare(b.Ten)
  })
  Th_Cha.innerHTML = ``
  var the_hien = document.createElement("table")
  the_hien.className = "table table-sm"
  Th_Cha.appendChild(the_hien)
  var Chuoi_HTML = ``
  Chuoi_HTML += `<tr style='background-color: green;color: white; font-weight: bold;text-align: left;'>`
  Chuoi_HTML += `<td class="text-nowrap text-warning" colspan="6">
   <em> ${ds[0].Lop.Ten} - Sĩ số: ${ds.length}</em>
   </td>`
  Chuoi_HTML += `</tr>`
  Chuoi_HTML += `<tr style='background-color: green;color: white; font-weight: bold;text-align: center;'>`
  Chuoi_HTML += `<td class="text-nowrap">#</td>
  <td class="text-nowrap">Họ tên</td>
  <td class="text-nowrap">Giới tính</td>
  <td class="text-nowrap">Lớp</td>
  <td class="text-nowrap">Khối</td>
  <td class="text-nowrap"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></td>`
  Chuoi_HTML += `</tr>`

  ds.forEach((hs, index) => {
    Chuoi_HTML += `<tr style='border: 1px solid gray'>`
    Chuoi_HTML += `<td class="text-center" id="${hs.Ma_so}">${index + 1}</td>
    <td class="text-nowrap text-capitalize">${hs.Ho_ten}</td>
    <td class="text-nowrap">${hs.Gioi_tinh}</td>
    <td class="text-nowrap">${hs.Lop.Ten}</td>
    <td class="text-nowrap">${hs.Lop.Khoi.Ten}</td>
    <td class="text-nowrap text-center"><input class="checkbox" value=1 type="checkbox" id="${hs.Ma_so}"></td>`
    Chuoi_HTML += `</tr>`
  })
  the_hien.innerHTML = Chuoi_HTML;
  return the_hien
}

function xuatdsKhoi(ds, Th_Cha) {
  let html = ``
  ds.forEach(khoi => {
    html += `<option value="${khoi.Ma_so}">${khoi.Ten}</option>`
  })
  Th_Cha.innerHTML = html;
}

function xuatdsLop(ds, Th_Cha) {
  let html = ``
  ds.forEach(lop => {
    html += `<option value="${lop.Ma_so}">${lop.Ten}</option>`
  })
  Th_Cha.innerHTML = html;
}



//==============================================================================
// Xử lý biến Số nguyên
function Nhap_So_nguyen_duong(Th_So_nguyen) {
  var Kq = {}
  Kq.So_nguyen = parseInt(Th_So_nguyen.value.trim())
  Kq.Hop_le = !isNaN(Kq.So_nguyen) && Kq.So_nguyen > 0
  return Kq
}

function Tao_Chuoi_The_hien_So_nguyen_duong(So_nguyen) {
  var Chuoi_The_hien = ""
  var Chuoi_So_nguyen = So_nguyen.toString()
  var So_Ky_so = Chuoi_So_nguyen.length
  if (So_Ky_so % 3 == 0) {
    for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
      Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
      if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
        Chuoi_The_hien += "."
    }
  } else if (So_Ky_so % 3 == 1) {
    Chuoi_The_hien = Chuoi_So_nguyen[0]
    if (So_Ky_so > 1)
      Chuoi_The_hien += "."
    Chuoi_So_nguyen = Chuoi_So_nguyen.slice(1)
    for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
      Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
      if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
        Chuoi_The_hien += "."

    }
  } else if (So_Ky_so % 3 == 2) {
    Chuoi_The_hien = Chuoi_So_nguyen[0] + Chuoi_So_nguyen[1]
    if (So_Ky_so > 2)
      Chuoi_The_hien += "."
    Chuoi_So_nguyen = Chuoi_So_nguyen.slice(2)
    for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
      Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
      if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
        Chuoi_The_hien += "."
    }
  }
  return Chuoi_The_hien
}
// Xử lý Biến Số thực
function Nhap_So_thuc_duong(Th_So_thuc) {
  var Kq = {}
  Kq.So_thuc = parseInt(Th_So_thuc.value.trim())
  Kq.Hop_le = !isNaN(Kq.So_thuc) && Kq.So_thuc > 0
  return Kq
}

function Tao_Chuoi_The_hien_So_thuc_duong(So_thuc, So_so_le) {
  So_thuc = parseFloat(So_thuc)
  var Chuoi_The_hien = ""
  if (!So_so_le)
    So_so_le = 2
  var Thanh_phan_con = So_thuc
    .toFixed(So_so_le)
    .split(".")
  Chuoi_The_hien = Tao_Chuoi_The_hien_So_nguyen_duong(Thanh_phan_con[0])
  if (Thanh_phan_con.length == 2 && parseInt(Thanh_phan_con[1]) != 0 && So_so_le > 0)
    Chuoi_The_hien += "," + Tao_Chuoi_The_hien_So_nguyen_duong(Thanh_phan_con[1])
  return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Tien(So_tien, n) {
  if (!n)
    n = 0

  var Chuoi_The_hien = Tao_Chuoi_The_hien_So_thuc_duong(So_tien, n)

  return Chuoi_The_hien
}

// Xử lý với Biến Ngày
function La_Ngay_Hien_hanh(Ngay) {
  var Ngay_Hien_hanh = new Date()
  Ngay = new Date(Ngay)
  var Kq = Ngay_Hien_hanh.getDate() == Ngay.getDate() &&
    Ngay_Hien_hanh.getMonth() == Ngay.getMonth() &&
    Ngay_Hien_hanh.getFullYear() == Ngay.getFullYear()

  return Kq
}

function Tao_Chuoi_The_hien_Ngay(Ngay) {
  var Chuoi_The_hien = ""
  if (!Ngay)
    Ngay = new Date()
  Chuoi_The_hien = Ngay.getDate() + "/" + (Ngay.getMonth() + 1) + "/" + Ngay.getFullYear()
  return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Gio(Ngay) {
  var Chuoi_The_hien = ""
  if (!Ngay)
    Ngay = new Date()
  Chuoi_The_hien = Ngay.getHours() + ":" + Ngay.getMinutes() + ":" + Ngay.getMinutes()
  return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Ngay_Gio(Ngay) {
  var Chuoi_The_hien = Tao_Chuoi_The_hien_Ngay(Ngay) + " " + Tao_Chuoi_The_hien_Gio(Ngay)
  return Chuoi_The_hien
}

function Kiem_tra_Ngay(Chuoi_ngay) {
  var Thanh_phan_con = Chuoi_ngay.split("/")
  var Hop_le = Thanh_phan_con.length == 3 && !isNaN(Thanh_phan_con[0]) && !isNaN(Thanh_phan_con[1]) && !isNaN(Thanh_phan_con[2])
  if (Hop_le) {
    var Ng = parseInt(Thanh_phan_con[0])
    var Th = parseInt(Thanh_phan_con[1])
    var Nm = parseInt(Thanh_phan_con[2])
    var So_ngay_cua_Th = new Date(Nm, Th, 0).getDate()
    // var So_ngay_cua_Th = new Date(Nm, Th+1 , 0).getDate()
    Hop_le = Ng >= 1 && Ng <= So_ngay_cua_Th && Th >= 1 && Th <= 12 && Nm > 0
  }
  return Hop_le
}

function Nhap_Ngay(Th_Ngay) {
  var Kq = {}
  var Chuoi_Ngay = Th_Ngay
    .value
    .trim()
  Kq.Hop_le = Kiem_tra_Ngay(Chuoi_Ngay)
  if (Kq.Hop_le) {
    var Thanh_phan_con = Chuoi_ngay.split("/")
    Kq.Ngay = new Date(Thanh_phan_con[1] + "-" + Thanh_phan_con[0] + "-" + Thanh_phan_con[2])
  }

  return Kq
}





