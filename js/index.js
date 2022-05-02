// Codigo hecho en base a la demo de Highcharts de mapa global con tooltip: 
// https://stackoverflow.com/questions/8110832/plot-data-on-world-country-map
// https://www.highcharts.com/demo/maps/tooltip

(async () => {

    const topology = await fetch(
        'https://code.highcharts.com/mapdata/custom/world.topo.json'
    ).then(response => response.json());

    Highcharts.getJSON(window.location.href + "data/csvjson.json", function (data) {

        // Initialize the chart
        Highcharts.mapChart('container', {

            chart: {
                map: topology
            },

            title: {
                text: 'Gasto gubernamental en aerolíneas nacionales'
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            tooltip: {
                backgroundColor: 'none',
                borderWidth: 0,
                shadow: false,
                useHTML: true,
                padding: 0,
                pointFormat: '<span class="f32"><span class="flag {point.properties.hc-key}">' +
                    '</span></span> {point.name}<br>' +
                    '<span style="font-size:30px">{point.value} Billion USD</span>',
                positioner: function () {
                    return { x: 0, y: 250 };
                }
            },

            colorAxis: {
                min: 0.1,
                max: 100,
                type: 'logarithmic'
            },

            series: [{
                data: data,
                joinBy: ['iso-a3', 'code3'],
                name: 'Government Spending in Airlines',
                states: {
                    hover: {
                        color: '#a4edba'
                    }
                }
            }]
        });
    });

})();
