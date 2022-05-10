// Codigo hecho en base a la demo de Highcharts de mapa global con tooltip: 
// https://stackoverflow.com/questions/8110832/plot-data-on-world-country-map
// https://www.highcharts.com/demo/maps/tooltip

(async () => {

    const topology = await fetch(
        'https://code.highcharts.com/mapdata/custom/world.topo.json'
    ).then(response => response.json());

    Highcharts.getJSON(window.location.href + "/data/spendings.json", function (data) {

        // Initialize the chart
        Highcharts.mapChart('gastoGob', {

            chart: {
                map: topology
            },

            title: {
                text: undefined
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            legend: {
                title: {
                    text: 'Gasto estatal en aerolineas (MM)',
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
                min: 0,
                max: 20,
                type: 'linear',
                stops: [
                    [0, '#82b2ff'],
                    [0.6, '#2a78f5']
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
            },
            {
                allAreas: false,
                showInLegend: true,
                name: "Gasto no disponible/encontrado/tiene",
                joinBy: ['iso-a3', 'code3'],
                color: '#e0e0e0',
            },]
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