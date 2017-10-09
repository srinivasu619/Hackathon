const category = ["ST","SC","OBC","Other categories"]
$(document).ready(function () {
    api_call();
});
function api_call() {
    $.get('http://192.168.43.28:5000/common/', function (data) {
        console.log(data);
        createChart("barChart_religion",data["Community/Caste"], data["Female"],"Female", data["Male"],"Male",'Literacy Rate Distribution - Religion Based');
        createChart("barChart_com",category, data["female_array_comm"],"Female", data["male_array_comm"],"Male",'Literacy Rate Distribution - Category Based');
    });
}
function createChart(id,labels, data1,label1, data2,label2,title) {
    const options = {
        title: {
            display: true,
            text: title,
            position: 'top',
            fontStyle: 'bold',
            fontSize: 16,
            fontFamily: 'Abel'
        },
        legend: {
            display: true,
            position: 'bottom'
        },
        elements: {
            line: {
                tension: 0
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    display: false
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Percentage',
                    fontSize: 14
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Religion',
                    fontSize: 14,
                },
                gridLines: {
                    display: false
                }
            }]
        },
    }
    var data = {
        labels: labels,
        datasets: [{
                label: label1,
                fill: false,
                borderColor: 'rgba(255,99,132,1)',
                backgroundColor:'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                data: data1
            },
            {
                label: label2,
                fill: false,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor:'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
                data: data2
            }
        ]
    };
    let CHART = document.getElementById(id);
    console.log(CHART);
    var chart = new Chart(CHART, {
        type: 'bar',
        data: data,
        options: options
    });
}