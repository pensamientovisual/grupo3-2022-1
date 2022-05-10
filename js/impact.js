(async () => {
  const topology = await fetch(
    "https://code.highcharts.com/mapdata/custom/world.topo.json"
  ).then((response) => response.json());

  Highcharts.getJSON(
    window.location.href + "/data/impact.json",
    function (data) {
      Highcharts.mapChart("impact_container", {
        chart: {
          borderWidth: 1,
          map: topology,
        },

        title: {
          text: "Impacto económico en la actividad aérea por Covid",
        },

        legend: {
          enabled: false,
        },

        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: "bottom",
          },
        },

        series: [
          {
            name: "Countries",
            color: "#E0E0E0",
            enableMouseTracking: false,
          },
          {
            type: "mapbubble",
            name: "Perdida económica",
            joinBy: ["iso-a3", "code3"],
            data: data,
            minSize: "10%",
            maxSize: "20%",
            tooltip: {
              pointFormat: "{point.region} {point.z} Mil Millones USD",
            },
          },
        ],
      });
    }
  );
})();
