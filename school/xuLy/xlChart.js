function bieudoKhoi() {
    let categories = []
    let data = []
    dsKhoi.forEach(k => {
        categories.push(k.Ten)
        data.push(dsHocsinh.filter(hs => hs.Lop.Khoi.Ma_so == k.Ma_so).length)
    })



    if (document.querySelector("#thBieudo").style.visibility == "hidden") {
        document.querySelector("#thBieudo").style.visibility = "visible"
        document.querySelector("#thBieudo").style.height = "auto"
        document.querySelector("#thBieudo").style.padding = "10px 15px"
    } else {
        document.querySelector("#thBieudo").style.visibility = "hidden"
        document.querySelector("#thBieudo").style.height = "0vh"
        document.querySelector("#thBieudo").style.padding = "0px"
    }
    Highcharts.setOptions({
        chart: {
            backgroundColor: {
                linearGradient: [0, 0, 500, 500],
                stops: [
                    [0, 'rgb(255, 255, 255)'],
                    [1, 'rgb(240, 240, 255)']
                ]
            },

            plotBackgroundColor: 'rgba(255, 255, 255, .9)',
            plotShadow: true,
            style: {
                fontFamily: `tahoma`, /// chỉnh font cho chữ thống dc đúng
                fontSize: 16
            }

        }
    });
    // 'rgba(255,255,250,0.8)'
    const chart = Highcharts.chart('thBieudo', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Số Học sinh theo Khối',
            style: {
                color: 'red',
                fontWeight: 'bold',
                fontSize: '5vh'
            }
        },

        // tooltip: {
        //     positioner: function () {
        //         return { x: 80, y: 10 };
        //     },
        //     shadow: false,
        //     borderWidth: 0,
        //     backgroundColor:"rgb(255, 255, 204)" 
        // },
        xAxis: {
            categories: categories,

        },
        yAxis: {
            title: {
                text: 'Học sinh'
            }
        },
        series: [{
            name: 'Số học sinh',
            data: data,
            color: "chocolate"
        }]
    });
}