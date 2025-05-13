google.charts.load('current', {
    packages: ['corechart', 'bar']
});

google.charts.setOnLoadCallback(drawPieChart);

function drawPieChart() {
    var data = google.visualization.arrayToDataTable([
        ['Linguagem', 'Uso'],
        ['HTML', 31.72],
        ['C#', 7.48],
        ['CSS', 28.83],
        ['JavaScript', 20.41],
        ['Next.js', 11.56]
    ]);

    var options = {
        title: 'Linguagens mais usadas',
        titleTextStyle: {
            color: '#fff',
            fontSize: 15,
            bold: true
        },
        slices: {
            0: { offset: 0 },
            1: { offset: 0 },
            2: { offset: 0 },
            3: { offset: 0 },
            4: { offset: 0 }
        },
        sliceVisibilityThreshold: 0, // Mostra todas as fatias sem autoesconder
        legend: { position: 'right', textStyle: { color: '#fff' } },
        pieSliceText: 'percentage',
        is3D: false,
        backgroundColor: '#0D1117',
        legendTextStyle: {
            color: '#fff',
            fontSize: 10
        },
        chartArea: {
            left: '15%',
            top: '20%',
            width: '80%',
            height: '80%'
        },
        backgroundColor: 'transparent',
        colors: [
            '#0c2d72',
            '#49a5f5',
            '#1275c9',
            '#7cc6ff',
            '#0077b6'
        ]
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}

// Função para desenhar o gráfico de barras horizontais
google.charts.setOnLoadCallback(drawBarChart);

function drawBarChart() {
    var data = google.visualization.arrayToDataTable([
        ['Ferramenta', 'Nível de Conhecimento', { role: 'style' }],
        ['HTML', 90, 'color: #7cc6ff'],
        ['CSS', 85, 'color: #49a5f5'],
        ['JavaScript', 65, 'color: #1275c9'],
        ['C#', 50, 'color:rgb(1, 85, 131)'],
        ['Next.js', 40, 'color: #0c2d72']
    ]);

    var options = {
        title: 'Nível de Conhecimento das Ferramentas',
        titleTextStyle: {
            color: '#fff',
            fontSize: 18,
            bold: true
        },
        hAxis: {
            title: 'Nível de conhecimento (%)',
            minValue: 0,
            textStyle: {
                color: '#fff',
                fontSize: 14
            },
            titleTextStyle: {
                color: '#fff',
                fontSize: 16
            }
        },
        vAxis: {
            title: 'Ferramentas',
            textStyle: {
                color: '#fff',
                fontSize: 14
            },
            titleTextStyle: {
                color: '#fff',
                fontSize: 16
            }
        },
        chartArea: {
            width: '50%',
            height: '80%'
        },
        backgroundColor: '#0D1117',
        legendTextStyle: {
            color: '#fff'
        }
    };

    var chart = new google.visualization.BarChart(document.getElementById('barchart'));
    chart.draw(data, options);
}
