$(function () {
    setTimeout(function() {
        $('#container_airbus').highcharts({
            chart: {
                zoomType: 'x',
                spacingRight: 20
            },
            title: {
                text: 'Evolution du cours de l\'action en fonction du temps'
            },
            subtitle: {
                text: 'AIRBUS'
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
                    55.42,
                    54.44,
                    55.00,
                    55.84,
                    55.90,
                    55.91,
                    56.15,
                    56.24,
                    55.73,
                    55.81,
                    56.55,
                    56.40,
                    55.43,
                    55.91,
                    55.35,
                    55.28,
                    55.78,
                    56.10,
                    56.64
                ]
            }]
        });
    }, 500);
});