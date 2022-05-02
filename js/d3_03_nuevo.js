

let dataset = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5,
    8, 9, 7, 9, 3, 2, 3, 8, 4, 6,
    2, 6, 4, 3, 3, 8, 3, 2, 7, 9,
    5, 10, 2, 8, 8, 4, 1, 9, 7, 1];

// Dimensiones del svg
const WIDTH = 800;
const HEIGHT = 500;

// márgenes de la visualización
const margin = {
  top: 70,
  bottom: 70,
  right: 30,
  left: 30,
};

// Agrego el svg a la página y le entrego su ancho y alto
const svgTrabajo = d3.select('body')
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT);

// Definimos un contenedor donde estará la visualización
const contenedor = svgTrabajo
.append("g")
.attr("transform", `translate(${margin.left} ${margin.top})`);


// Escala eje X
const escalaX = d3
  .scaleBand()
  .domain(dataset.map((_, index) => index))
  .rangeRound([0, WIDTH-margin.right - margin.left])
  .padding(0.1);

const ejeX = d3.axisBottom(escalaX);

svgTrabajo.append("g")
  .attr("transform", `translate(${margin.left}, ${HEIGHT - margin.bottom})`)
  .call(ejeX);


// Eje Y
const maxValue = d3.max(dataset);

const escalaY = d3
  .scaleLinear()
  .domain([0, maxValue])
  .range([HEIGHT- margin.top - margin.bottom, 0]);

const ejeY = d3.axisLeft(escalaY);

svgTrabajo.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .call(ejeY);

function numberColor(digit){
  if (digit <= 3){
    return 'red';
  }
  else if (digit <= 6){
    return 'blue';
  }
  else{
    return 'green';
  }
};

contenedor
  .selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('width', escalaX.bandwidth())
  .attr('height', (d) => HEIGHT - margin.top - margin.bottom - escalaY(d))
  .attr('x', (d, index) => escalaX(index))
  .attr('y', (d) => escalaY(d))
  .attr('fill', (d) => numberColor(d));

  

