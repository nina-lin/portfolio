let svg, allData, simulation, nodes, breakpoint = 400, index = 0;

//SVG 
const margin = {left: 0, top: 0, bottom: 20, right: 0},
      width = window.innerWidth - margin.left - margin.right,
      height = width < breakpoint ? 450 : 600;

//BUCKETS
const categories = ['Aborto','Cambio Climático','Crimen','Democracia','La Economía','El Ambiente','Política de Armas','Inmigración','Leyes Laborales','Partido Afiliación','Salud Pública','Justicia Social','Servicios Sociales','Impuestos', 'Otro'],
      age = ['18 - 25','26 - 40','41 - 60','60+'],
      party = ['Demócrata','Republicano','Independiente','Otro','No Decirlo'];

const palette = ['#6767ad', '#fbbe98', '#fbe2c6', '#f596a8', '#cddbcd', '#eef1b7', '#afced0', '#8bb9c9', '#cecece', '#6a8ecc', '#dae8b3', '#7c5ea1', '#a866a3', '#b1bbcd', '#77c0d3'],
      agePalette = ['#fed5b4', '#EF7C8E','#74BDCB', '#5F7288'], 
      partyPalette = ['#74BDCB', '#EF7C8E', '#EFE7BC', '#67595E', '#C8C8C8'] 

//SCALES
let categoryColorScale = d3.scaleOrdinal(categories, palette),
    partyColorScale = d3.scaleOrdinal(party, partyPalette),
    ageColorScale = d3.scaleOrdinal(age, agePalette);

let partyXscale = d3.scalePoint().domain(party).range([50, width * .85 ]).padding(.5)
    issuesYscale = d3.scalePoint().domain(categories.reverse()).range([height * .95, height * .02]).padding(.5);

//INITIAL FORCES
let radius = width < breakpoint ? 4 : 6,
    theForce = width < breakpoint ? 5 : 7, 
    forceStr = width < breakpoint ? .01 : .1, 
    linkDist = width < breakpoint ? 2 : 3,
    radiusSmall = width < breakpoint ? 2 : 3;

//TEXT
const stepperText = document.getElementById('stepperText');

//DATA 
let survey = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR3IukLyqXZ_4bnEVLIBRgaX1eJb10eaFOWu0Ffu1dUPhfYFVtj0SaLt969YW0JFN1ijb1vYP6PgI86/pub?gid=432473675&single=true&output=csv',
    map = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json',
    cities = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR3IukLyqXZ_4bnEVLIBRgaX1eJb10eaFOWu0Ffu1dUPhfYFVtj0SaLt969YW0JFN1ijb1vYP6PgI86/pub?gid=1884632123&single=true&output=csv';

Promise.all([
  d3.csv(survey, d => {
    return {
      Vote: d.vote,
      Issues: d.issues,
      Party: d.party,
      Age: d.age,
      ZipCode: d.zip,
      Latitude: +d.lat,
      Longitude: +d.long,
      xIndex: +d.xIndex
    };
  }), 
  d3.json(map), 
  d3.csv(cities)
]).then(data => {
  allData = data[0];
  usMap = data[1];
  usCities = data[2];

  setTimeout(draw(), 1000)

  // render();
})

function draw(){

  let svg = d3.select('#viz')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('opacity', 1)

  let legendSVG = d3.select('#legend').append('svg')
    .attr('width', document.querySelector('#legend').getBoundingClientRect())
    .attr('height', document.querySelector('#legend').getBoundingClientRect())

  simulation = d3.forceSimulation(allData) 

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  initDraw();
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  simulation.on('tick', () => {
    nodes
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
  })

  nodes = svg.selectAll('.nodes')
    .data(allData).enter()
    .append('circle').classed('nodes', true)
      .style('fill', d => ageColorScale(d.Age))
      .attr('r', radius)
      .attr('opacity', 1)

  //Create map legend 
  legend = legendSVG.selectAll('markers')
    .data(categories.reverse()).enter().append('g')
    .classed('markers', true)
      .attr('transform', (d, i) => {
        if (width < breakpoint) {
          xOffset = (i % 4) * 88
          yOffset = Math.floor(i / 4) * 18
        } else {
          xOffset = (i % 8) * 100
          yOffset = Math.floor(i / 8) * 16
        }
        return 'translate(' + xOffset + ',' + yOffset+ ')'
      })
  
  legend.append('circle')
    .attr('cx', 5)
    .attr('cy', 5)
    .attr('r', radius - 1)
    .style('fill', d => categoryColorScale(d))
  
  legend.append('text').classed('legendLabel', true)
    .attr('x', 15)
    .attr('y', '0.8em')
    .text(d => d)

  //Tooltips
  svg.selectAll('.nodes')
    .on('mouseover', mouseOver)
    .on('mouseout', mouseOut)

  function mouseOver(d){
    d3.select('#tooltip')
    .style('left', (d3.event.pageX - 55) + 'px')
    .style('top', (d3.event.pageY < height / 2) ? (d3.event.pageY + 20) + 'px' : (d3.event.pageY - 230) + 'px')
      .style('display', 'inline-block')
      .html(`<p><strong class='tipColor'>Principal preocupación:</strong><br> ${d.Issues}</p>
      <p><strong class='tipColor'>Político afiliación:</strong><br> ${d.Party}</p>
      <p><strong class='tipColor'>Tienes:</strong><br> ${d.Age}</p>`)
      
    d3.select(this)
      .transition('mouseover').duration(100)
      .attr('opacity', 1)
  }

  function mouseOut(d){
    d3.select('#tooltip')
      .style('display', 'none')

    d3.select(this)
      .transition('mouseout').duration(100)
      .attr('opacity', 0.8)
      .attr('stroke-width', 0)
  }

  xtalk.signalIframe();

} 

function initDraw(){
  document.querySelector('#leftnav').setAttribute('disabled', true)

  simulation
    .force('charge', d3.forceManyBody().strength(forceStr))
    .force('x', d3.forceX(width / 2))
    .force('y', d3.forceY(height / 2))
    .force('collide', d3.forceCollide(theForce).iterations(5))
    .alpha(linkDist) 

    stepperText.innerHTML = `<strong>Nosotros preguntamos – tú respondiste.</strong> Más de 600 lectores de Telemundo y NBC opinaron sobre la principal razón para votar este año. <br><br><em></em>Haga clic o coloque el cursor sobre cada respuesta para ver más.</em>`
}

//REVERT TO INIT
function revertToInit(){
  document.querySelector('#leftnav').setAttribute('disabled', true)

  let svg = d3.select('#viz').select('svg')

  //Reset graph space
  svg.selectAll('g, text').remove();

  //Draw
  svg.selectAll('.nodes')
    .transition(500).duration(300).delay(10)
    .style('fill', d => ageColorScale(d.Age))
    .attr('r', radius)

  simulation
    .force('charge', d3.forceManyBody().strength(forceStr))
    .force('x', d3.forceX(width / 2))
    .force('y', d3.forceY(height / 2))
    .force('collide', d3.forceCollide(theForce).iterations(5))
    
  simulation.alpha(linkDist).restart()

  stepperText.innerHTML = `<strong>Nosotros preguntamos – tú respondiste.</strong> Más de 600 lectores de Telemundo y NBC opinaron sobre la principal razón para votar este año. <br><br><em></em>Haga clic o coloque el cursor sobre cada respuesta para ver más.</em>`
}

//QUAD GROUP
function draw1(){
  let svg = d3.select('#viz').select('svg')

  //Reset graph space
  svg.selectAll('g').remove();

  //Draw
  let agePositions = {'18 - 25': [width * .25, height * .25],
                      '26 - 40': [width * .75, height * .25],
                      '41 - 60': [width * .25, height * .75],
                      '60+': [width * .75, height * .75]}

  svg.selectAll('.nodes')
    .transition(1000).duration(300).delay(10)
    .style('fill', d => ageColorScale(d.Age))
    .attr('r', radius)

  theForce = width < breakpoint ? 4 : 6, 
  forceStr = width < breakpoint ? .01 : .1, 
  linkDist = width < breakpoint ? 1 : 2;

  simulation
    .force('charge', d3.forceManyBody().strength(forceStr))
    .force('x', d3.forceX(d => agePositions[d.Age][0])) 
    .force('y', d3.forceY(d => agePositions[d.Age][1]))  
    .force('collide', d3.forceCollide(theForce).iterations(5))
    
  simulation.alpha(linkDist).restart()

  //Group Labels
  svg.selectAll('.labelText')
      .data(age).enter()
      .append('text')
      .attr('class', 'labelText')
      .attr('x', d => agePositions[d][0])
      .attr('y', d => agePositions[d][1] + height * .23)
      .raise()

  svg.selectAll('.labelText')
    .html(d => d)

  stepperText.innerHTML = `Los lectores que planeaban votar este año eran en su mayoría votantes mayores: los que tenían entre <strong style="color: #74BDCB">41 y 60 años</strong> constituían el 44% de los votantes que planeaban acudir a las urnas este año. <strong style="color: #5F7288">Los jubilados</strong> (o sus allegados) constituían otro tercio.`
}

//BARS
function draw2(){

  let svg = d3.select('#viz').select('svg');

  //Reset graph space
  svg.selectAll('g, text').remove();
  
  //Draw
  let yAxis = d3.axisLeft(issuesYscale)(svg.append('g').attr('transform', 'translate(90,20)').classed('graphTicks', true));

  svg.selectAll('.nodes')
    .transition(5000).duration(300).delay(10)
    .style('fill', d => ageColorScale(d.Age))
    .attr('r', radiusSmall)

  theForce = width < breakpoint ? 2 : 3,
  forceStr = width < breakpoint ? .01 : .1, 
  linkDist = width < breakpoint ? 1 : 2;

  viewParameter = width < breakpoint ? 1.2 : 2.6;

  simulation
    .force('charge', d3.forceManyBody().strength(forceStr))
    .force('center', null)
    .force('x', d3.forceX(d => { return d.xIndex * viewParameter + 100; }))
    .force('y', d3.forceY(d => issuesYscale(d.Issues) + 15))
    .force('collide', d3.forceCollide(theForce))
    .alpha(linkDist).restart()


  stepperText.innerHTML = `Las principales preocupaciones de los votantes por edad fueron la economía para los votantes de <strong style="color: #ffcdb7">18 a 25 años</strong> y de <strong style="color: #EF7C8E">26 a 40 años</strong>, mientras que los votantes de <strong style="color: #74BDCB">41 a 60</strong> y de <strong style="color: #5F7288">60 años</strong> en adelante se preocuparon más por la integridad electoral.`

}

//GRID GROUPS
function draw3(){

  let svg = d3.select('#viz').select('svg')

  //Reset graph space
  svg.selectAll('g').remove();
  d3.select('#zoomPanel').selectAll('div').style('opacity', 0)
  d3.select('#svgContainer').selectAll('g').style('opacity', 0);
  d3.select('#legend').style('height', 0)

  //Reset & disable zoom 
  let zoom = d3.zoom()
    .on('zoom', function() {
      svg.selectAll('.nodes')
        .attr('transform', d3.event.transform)
        .attr('r', radiusSmall)
        .style('stroke-width', 1 / d3.event.transform.k)
  })
  svg.transition().duration(300).call(zoom.transform, d3.zoomIdentity)
  svg.on('.zoom', null)

  //Draw
  let xAxis = d3.axisTop(partyXscale)(svg.append('g').attr('transform', 'translate(30,30)').classed('graphTicks', true));
  let yAxis = d3.axisLeft(issuesYscale)(svg.append('g').attr('transform', 'translate(90,20)').classed('graphTicks', true));

  svg.selectAll('.nodes')
   .transition().duration(300).delay(10)
   .style('fill', d => categoryColorScale(d.Issues))
   .attr('r', radiusSmall)

  theForce = width < breakpoint ? 2 : 3,
  forceStr = width < breakpoint ? .01 : .1, 
  linkDist = width < breakpoint ? 1 : 2;

  simulation
    .force('charge', d3.forceManyBody().strength(forceStr))
    .force('x', d3.forceX(d => partyXscale(d.Party) + 30))
    .force('y', d3.forceY(d => issuesYscale(d.Issues) + 15))
    .force('collide', d3.forceCollide(theForce))
    .alpha(linkDist).restart()

  stepperText.innerHTML = `Los principal problema de los republicanos es la economía, mientras que para los demócratas el aborto y la integridad electoral. A los votantes independientes y no identificados les preocupa la integridad electoral y la economía.`

}

//MAP VIEW
function draw4(){
  document.querySelector('#rightnav').setAttribute('disabled', true)

  simulation.stop();

  let svg = d3.select('#viz').select('svg')
  let legendSVG = d3.select('#legend').select('svg')

  svg.selectAll('g, .labelText').remove();

  //Draw base map
  let projection = d3.geoAlbersUsa()
                     .translate([width / 2, height / 2])
                     .scale(width * 1.2);
  
  let path = d3.geoPath(projection)

  let g = svg.append('g');

  g.append('path')
    .data([topojson.feature(usMap, usMap.objects.states)])
    .attr('d', path)
    .style('fill', '#c8c8c8')

  g.append('path')
    .datum(topojson.mesh(usMap, usMap.objects.states, (a, b) => a !== b))
    .attr('class', 'stateBorders')
    .attr('d', path)
    .style('fill', 'none')
    .style('stroke', '#ECECEC')

  //Map Legend
  d3.select('#svgContainer').selectAll('#legend, g').style('opacity', 1);

  d3.select('#legend').style('height', width < breakpoint ? 12 + '%' : 8 + '%')

  //Draw 
  svg.selectAll('.nodes')
    .raise() //Reorder SVG elements
    .transition()
    .attr('cx', d => projection([d.Longitude, d.Latitude])[0])
    .attr('cy', d => projection([d.Longitude, d.Latitude])[1])
    .attr('r', radius)

  //Append city markers
  mapMarkers = svg.selectAll('citylabel')
    .data(usCities).enter().append('g')
    .classed('citylabel', true)
    .raise()

  mapMarkers.append('text')
    .attr('x', d => projection([d.long, d.lat])[0])
    .attr('y', d => projection([d.long, d.lat])[1] * .98)
    .html(d => d['city-spanish'])

  mapMarkers.append('circle')
    .attr('cx', d => projection([d.long, d.lat])[0])
    .attr('cy', d => projection([d.long, d.lat])[1])
    .attr('r', 2)
    .style('fill', '#000')

  //Set map zoom parameters
  let zoom = d3.zoom()
    .scaleExtent([1, 15])
    .translateExtent([[0 ,0],[width, height]])
    .on('zoom', zoomed)

  function zoomed(){
    g.selectAll('path')
      .attr('transform', d3.event.transform)
      .style('stroke-width', d => 1 / d3.event.transform.k )

    svg.selectAll('circle')
      .attr('transform', d3.event.transform)
      .attr('r', d => radius / d3.event.transform.k )
      .style('stroke-width', 1 / d3.event.transform.k)

    mapMarkers.selectAll('text')
      .attr('transform', d3.event.transform)
      .style('font-size', .625 / d3.event.transform.k + .05 + 'rem')
      .style('stroke-width', 1 / d3.event.transform.k)

    mapMarkers.selectAll('circle')
      .attr('transform', d3.event.transform)
      .attr('r', d => 2.5 / d3.event.transform.k )
      .style('stroke-width', 1 / d3.event.transform.k)

    d3.select('#zoomPanel').select('#home').classed('active', true)
  }

  //on click -- use scaleBy()

  svg.call(zoom);

  //Zoom Reset
  d3.select('#zoomPanel').selectAll('div').style('opacity', 1)

  d3.select('#zoomPanel').select('#home').on('click', function(){
      d3.select(this).classed('active', false)

      g.selectAll('path').style('stroke-width', 1)

      svg.selectAll('circle')
        .attr('transform', d3.event.transform)
        .attr('r', radius)
    
      g.selectAll('path')
        .attr('transform', d3.event.transform)

      mapMarkers.selectAll('text')
        .attr('transform', d3.event.transform)
        .style('font-size', .625 + 'rem')

      mapMarkers.selectAll('circle')
        .attr('transform', d3.event.transform)
        .attr('r', 2)
  })


  stepperText.innerHTML = 'Acérquese a su región para ver los problemas más importantes para su comunidad.'
}

//NAVIGATION
let drawGraphs = [revertToInit, draw1, draw2, draw3, draw4]

function changeContent(){
  
  drawGraphs[index]();

  //Nav indicator
  let dotNavs = document.querySelectorAll('.dotNav')
  
  dotNavs.forEach((list, i) => { 
    list.classList.remove('active'); 
    if (i === index) { list.classList.add('active') }
  })

}

function previous(){
  document.querySelector('#rightnav').removeAttribute('disabled')

  if( index > 0 ){ index --; }

  changeContent(index);

  xtalk.signalIframe();
}

function next(){
  document.querySelector('#leftnav').removeAttribute('disabled')
  
  if( index < drawGraphs.length - 1 ){ index ++; }

  changeContent(index);

  xtalk.signalIframe();
}
