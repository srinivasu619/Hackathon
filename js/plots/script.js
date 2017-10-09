const options = {
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
            ticks: {
                display: false
            },
            scaleLabel: {
                display: true,
                labelString: 'No. of people',
                fontSize: 14
            }
        }],
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Age Group',
                fontSize: 14,
            },
            gridLines: {
                display: false
            }
        }]
    },
}
var progressbaroptions1 = {
    color: '#81a4e3',
    strokeWidth: 7,
    trailWidth: 5,
    easing: 'easeInOut',
    duration: 1400,
    text: {
        autoStyleContainer: false
    },
    from: {
        color: '#81a4e3',
        width: 7
    },
    to: {
        color: '#81a4e3',
        width: 7
    },
    step: function (state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        var value = Math.round(circle.value() * 100);
        if (value === 0) {
            circle.setText('');
        } else {
            circle.setText(value + '%');
        }

    }
}
var progressbaroptions2 = {
    color: '#e85f71',
    strokeWidth: 7,
    trailWidth: 5,
    easing: 'easeInOut',
    duration: 1400,
    text: {
        autoStyleContainer: false
    },
    from: {
        color: '#e85f71',
        width: 7
    },
    to: {
        color: '#e85f71',
        width: 7
    },
    step: function (state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        var value = Math.round(circle.value() * 100);
        if (value === 0) {
            circle.setText('');
        } else {
            circle.setText(value + '%');
        }

    }
}
const bar_id = [litMale, illMale,litFemale,illFemale,litUrban,illUrban,litRural,illRural,litp,illp];
const bar_id1 = ["litMale", "illMale","litFemale","illFemale","litUrban","illUrban","litRural","illRural"];
$(document).ready(function () {
    var input = "   himachal PraDesh     ";
    $("#loc").text(input.trim().toUpperCase()+" ,INDIA");
    input = input.trim().split(" ").join("").toLowerCase();
    console.log(input);
    api_call(input);
});
$( "#searchbutton" ).click(function() {
    var input = document.getElementById("searchval").value;
    $("#loc").text(input.trim().toUpperCase()+" ,INDIA");
    input = input.trim().split(" ").join("").toLowerCase();
    // con
    api_call(input);
    $("#searchval").val('');
  });
function literacy(id, data) {
    var bar = new ProgressBar.Circle(id, progressbaroptions1);
    bar.text.style.fontFamily = '"Abel", Helvetica, sans-serif';
    bar.text.style.fontSize = '14px';
    bar.text.style.letterSpacing = '1px';
    bar.animate(data);
}

function illiteracy(id, data) {
    var bar = new ProgressBar.Circle(id, progressbaroptions2);
    bar.text.style.fontFamily = '"Abel", Helvetica, sans-serif';
    bar.text.style.fontSize = '14px';
    bar.text.style.letterSpacing = '1px';
    bar.animate(data);
}

function createChart(id,labels, data1,label1, data2,label2) {
    const options = {
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
                ticks: {
                    display: false
                },
                scaleLabel: {
                    display: true,
                    labelString: 'No. of people',
                    fontSize: 14
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Age Group',
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
                borderColor: '#e85f71',
                borderWidth: 2,
                data: data1
            },
            {
                label: label2,
                fill: false,
                borderColor: '#81a4e3',
                borderWidth: 2,
                data: data2
            }
        ]
    };
    let CHART = document.getElementById(id);
    let lineChart = new Chart(CHART, {
        type: 'line',
        data: data,
        options: options
    });
}

function api_call(input) {
    $.get('http://192.168.43.28:5000/info/f' + input, function (data) {
        console.log(data);
        for(var i=0;i<bar_id.length;i++)
            {
                $('#'+bar_id1[i]).empty();
            }
        $('#dense').text(data.population_density+" per square km.");
        $('#ratio').text(data.Sexratio+" :1000 men");
        literacy(bar_id[8], data["Literacy Percentage"][0]);
        illiteracy(bar_id[9], data["Literacy Percentage"][1])
        createChart("lineChart",data["labels"], data.datasets[2].data,data.datasets[2].label, data.datasets[1].data,data.datasets[1].label);
        literacy(bar_id[0], data["Literacy Male Percentage"][0]);
        illiteracy(bar_id[1], data["Literacy Male Percentage"][1])
        createChart("lineChart1",data["labels"], data.datasets[4].data,data.datasets[4].label, data.datasets[3].data,data.datasets[3].label);
        literacy(bar_id[2], data["Literacy Female Percentage"][0]);
        illiteracy(bar_id[3], data["Literacy Female Percentage"][1]);
        createChart("lineChart2",data["labels"], data.datasets[8].data,data.datasets[8].label, data.datasets[7].data,data.datasets[7].label);
        literacy(bar_id[4], data["Literacy Urban Percentage"][0]);
        illiteracy(bar_id[5], data["Literacy Urban Percentage"][1]);
        createChart("lineChart3",data["labels"], data.datasets[16].data,data.datasets[16].label, data.datasets[15].data,data.datasets[15].label);
        literacy(bar_id[6], data["Literacy Rural Percentage"][0]);
        illiteracy(bar_id[7], data["Literacy Rural Percentage"][1]);
        createChart("lineChart4",data["labels"], data.datasets[12].data,data.datasets[12].label, data.datasets[11].data,data.datasets[11].label);
    });
}