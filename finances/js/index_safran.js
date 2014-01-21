$(function () {
        $('#container_safran').highcharts({
            chart: {
                zoomType: 'x',
                spacingRight: 20
            },
            title: {
                text: 'Evolution du cours de l\'action en fonction du temps'
            },
            subtitle: {
                text: 'SAFRAN'
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
                    49.00,
                    48.37,
                    48.84,
                    49.26,
                    49.21,
                    49.58,
                    49.84,
                    50.40,
                    50.19,
                    50.51,
                    50.29,
                    51.20,
                    51.59,
                    51.36,
                    51.13,
                    51.10,
                    51.50,
                    51.53,
                    52.46,
                    53.61
                ]
            }]
        });
    });