const chart_options = {
    title: {
        display: true,
        text: 'Literacy    Rate    Distribution',
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
            scaleLabel: {
                display: true,
                labelString: 'Literacy Percentage',
                fontSize: 14
            },
        }],
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Year',
                fontSize: 14,
            },
            gridLines: {
                display: false
            },
        }]
    },
}
const backgroundColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
];
const borderColor = [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];
$(document).ready(function () {
    prediction_api_call();
});

function prediction_api_call() {
    $.get('http://192.168.43.28:5000/prediction/', function (data) {
        console.log(data);
        createChart(data.Year, data["Female Literacy Percentage"], "Female Literacy Percentage", data["Male Literacy Percentage"], "Male Literacy Percentage", data["Literacy Percentage"], "Literacy Percentage");
        createTable(data["state_array"],data["array_2001"],data["array_2011"],data["array_2021"]);
    });
}

function createChart(labels, data1, label1, data2, label2, data3, label3) {
    var data = {
        labels: labels,
        datasets: [{
                label: label1,
                fill: false,
                borderColor: borderColor[0],
                backgroundColor: backgroundColor[0],
                borderWidth: 2,
                data: data1
            },
            {
                label: label2,
                fill: false,
                borderColor: borderColor[1],
                backgroundColor: backgroundColor[1],
                borderWidth: 2,
                data: data2
            },
            {
                label: label3,
                fill: false,
                borderColor: borderColor[2],
                backgroundColor: backgroundColor[2],
                borderWidth: 2,
                data: data3
            }
        ]
    };
    let CHART = document.getElementById("barChart");
    let lineChart = new Chart(CHART, {
        type: 'bar',
        data: data,
        options: chart_options
    });
}

function createTable(state, arr1, arr2, arr3) {
    for(var i=0;i<state.length;i++)
        {
            console.log(state[i]+" "+arr1[i]+" "+arr2[i]+" "+arr3[i]);
            $("#populate").append('<tr><td>'+state[i]+'</td><td>'+arr1[i]+'</td><td>'+arr2[i]+'</td><td>'+arr3[i]+'</td></tr>');
        }
}