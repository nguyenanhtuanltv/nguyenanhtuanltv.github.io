tieuDe.innerHTML += Tao_Chuoi_The_hien_Ngay_Gio(new Date())
let dsHocsinh = Doc_Danh_sach_Hoc_sinh();
let dsKhoi = []
let dsLop = []
let ds = []
taoKhoi()
xuatdsKhoi(dsKhoi, chonKhoi)
chonKhoi.selectedIndex = -1
function taoKhoi() {
    dsKhoi = Array.from(new Set(dsHocsinh.map(x => x.Lop.Khoi.Ma_so))).map(Ma_so => {
        khoi = {
            Ma_so: Ma_so,
            Ten: dsHocsinh.find(x => x.Lop.Khoi.Ma_so == Ma_so).Lop.Khoi.Ten
        }
        return khoi
    })

}

function taoLop(maKhoi) {

    dsLop = Array.from(new Set(dsHocsinh.map(x => x.Lop.Ma_so))).map(Ma_so => {
        lop = {
            Ma_so: Ma_so,
            Ten: dsHocsinh.find(x => x.Lop.Ma_so == Ma_so).Lop.Ten,
            Ma_khoi: dsHocsinh.find(x => x.Lop.Ma_so == Ma_so).Lop.Khoi.Ma_so
        }
        return lop
    })
    dsLop = dsLop.filter(x => x.Ma_khoi == maKhoi)

}

chonKhoi.onchange = () => {
    Th_Tim.innerHTML = ""
    let maKhoi = chonKhoi.value
    taoLop(maKhoi)
    dsLop.sort((a, b) => {
        return a.Ma_so.localeCompare(b.Ma_so)
    })
    xuatdsLop(dsLop, chonLop)
    let maLop = chonLop.value

    ds = dsHocsinh.filter(x => x.Lop.Ma_so == maLop)
    Xuat_dsHocsinh(ds, Th_Cha)

}
chonLop.onchange = () => {
    Th_Tim.innerHTML = ""
    let maLop = chonLop.value
    ds = dsHocsinh.filter(x => x.Lop.Ma_so == maLop)
    ds.sort((a, b) => {
        return a.Ten - b.Ten
    })
    Xuat_dsHocsinh(ds, Th_Cha)
}
function KeyCode(event) {
    if (event.keyCode == 13) {
        let gtTim = event.target.value
        
        if (gtTim != "") {
            ds = ds.filter(x => x.Ten.toLowerCase().includes(gtTim.toLowerCase()))
        
            if (ds.length != 0) {
                ds.sort((a, b) => {
                    return a.Lop.Ma_so.localeCompare(b.Lop.Ma_so)
                })
                Xuat_dsHocsinh(ds, Th_Cha)

            }
        } else {
            maKhoi = chonKhoi.value;
            maLop = chonLop.value;
            ds = dsHocsinh.filter(x => x.Lop.Ma_so == maLop && x.Lop.Khoi.Ma_so == maKhoi)
            Xuat_dsHocsinh(ds, Th_Cha)
        }

    }
}

ghiNhan.onclick = () => {
    let dsCheck = document.querySelectorAll(".checkbox");
    let ngayDiemdanh = Tao_Chuoi_The_hien_Ngay_Gio(new Date());
    let tenLop = chonLop[chonLop.selectedIndex].text
    let dsVang = ``
    let dem = 0
    dsCheck.forEach(item => {
        if (item.checked) {
            let maSo = item.getAttribute("id");
            dsVang += `Mã số: ${maSo}<br>`
            dem += 1
        }

    })

    if (dsVang == "") {
        modalTitle.innerHTML = `Ngày điểm danh: ${ngayDiemdanh}`
        modalBody.innerHTML = `<h4 class="text-danger">${tenLop} - Số học sinh vắng:${dem}</h4>`
    } else {
        modalTitle.innerHTML = `Ngày điểm danh: ${ngayDiemdanh}`
        modalBody.innerHTML = `<h4 class="text-danger">${tenLop} - Số học sinh vắng:${dem}</h4>
                ${dsVang}`
    }
    modalShow.click()
}