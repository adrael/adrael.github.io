$(function () {
        $('#container_cegid').highcharts({
            chart: {
                zoomType: 'x',
                spacingRight: 20
            },
            title: {
                text: 'Evolution du cours de l\'action en fonction du temps'
            },
            subtitle: {
                text: 'CEGID'
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
                    22.63,
                    23.22,
                    23.90,
                    24.71,
                    25.00,
                    25.18,
                    25.24,
                    25.89,
                    25.69,
                    25.69,
                    25.40,
                    25.10,
                    24.92,
                    25.00,
                    24.74,
                    23.50,
                    23.67,
                    23.15,
                    22.58,
                    23.34
                ]
            }]
        });
    });