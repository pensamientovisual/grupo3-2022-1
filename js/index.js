// Codigo hecho en base a la demo de Highcharts de mapa global con tooltip: 
// https://stackoverflow.com/questions/8110832/plot-data-on-world-country-map
// https://www.highcharts.com/demo/maps/tooltip

(async () => {

    const topology = await fetch(
        'https://code.highcharts.com/mapdata/custom/world.topo.json'
    ).then(response => response.json());

    Highcharts.getJSON(window.location.href + "/data/spendings.json", function (data) {

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

            legend: {
                title: {
                    style: {
                        color: ( // theme
                            Highcharts.defaultOptions &&
                            Highcharts.defaultOptions.legend &&
                            Highcharts.defaultOptions.legend.title &&
                            Highcharts.defaultOptions.legend.title.style &&
                            Highcharts.defaultOptions.legend.title.style.color
                        ) || 'black'
                    }
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
                type: 'logarithmic',
                minColor: '#EEEEFF',
                maxColor: '#000022',
                stops: [
                    [0, '#EFEFFF'],
                    [0.8, '#4444FF'],
                    [1, '#000022']
                ]
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


/* Inicio bibliografia datos 

Portugal: 
 - https://www.reuters.com/business/portugals-tap-may-need-more-aid-than-planned-2021-minister-says-2021-02-14/

Spain, GB, Greece, Netherlands, France, Ireland, Italy, Germany, Finland, Sweden:
- https://assets.gov.ie/205030/a6e0e95a-2486-433c-9af4-0aaaa2362788.pdf

OECD countries:
- https://www.oecd.org/corporate/State-Support-to-the-Air-Transport-Sector-Monitoring-Developments-Related-to-the-COVID-19-Crisis.pdf

*/