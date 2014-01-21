$(function () {
        $('#container_altran').highcharts({
            chart: {
                zoomType: 'x',
                spacingRight: 20
            },
            title: {
                text: 'Evolution du cours de l\'action en fonction du temps'
            },
            subtitle: {
                text: 'ALTRAN'
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
                    6.230,
					6.010,
					6.080,
					6.140,
					6.260,
					6.220,
					6.190,
					6.300,
					6.384,
					6.374,
					6.335,
					6.427,
					6.450,
					6.460,
					6.485,
					6.400,
					6.556,
					6.551,
					6.525,
					6.602
                ]
            }]
        });
    });