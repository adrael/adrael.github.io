$(function () {
        setTimeout(function() {
            $('#container_cegedim').highcharts({
            chart: {
                zoomType: 'x',
                spacingRight: 20
            },
            title: {
                text: 'Evolution du cours de l\'action en fonction du temps'
            },
            subtitle: {
                text: 'CEGEDIM'
            },
            xAxis: {
                type: 'datetime',
                maxZoom: 14 * 24 * 3600000, // fourteen days
                title: {
                    text: null
                }
            },
            yAxis: {
                title: {
                    text: 'Cours'
                }
            },
            tooltip: {
                shared: true
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
    
            series: [{
                type: 'area',
                name: 'Valeur',
                pointInterval: 24 * 3600 * 1700,
                pointStart: Date.UTC(2013, 11, 16),
                data: [
                    20.78,
                    20.89,
                    20.97,
                    21.05,
                    20.99,
                    21.01,
                    22.18,
                    22.35,
                    22.65,
                    22.89,
                    23.12,
                    23.12,
                    23.20,
                    23.11,
                    23.30,
                    23.05,
                    23.30,
                    23.25,
                    23.19,
                    23.30,
                    24.48
                ]
            }]
        });
        }, 500);
});