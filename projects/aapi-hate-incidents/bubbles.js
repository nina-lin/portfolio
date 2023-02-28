(function() {
  // var width = 1200,
  //   height = 1200;

  var width = window.innerWidth,
  innerRadius = Math.min(width,height)/3,
  outerRadius = innerRadius + 30;

  // Desktop & iPad Pro Settings
  if (window.matchMedia("(min-width: 771px)").matches) { 
    // var height = window.innerHeight - 80
    var height = window.innerHeight - 100
  }

  // iPad & Tablet
  if ( (window.matchMedia("(min-width: 500px)").matches) && (window.matchMedia("(max-width: 770px)").matches) ) {
    var height = 600
  }

  // Mobile 
  if ( (window.matchMedia("(min-width: 0px)").matches) && (window.matchMedia("(max-width: 499px)").matches) ) {
    var height = 650
  }

  var svg = d3.select("#chart")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g")
    .attr("transform", "translate(0,0)")

    // Images in Circles
    var defs = svg.append("defs");

    defs
      .append("pattern")
      .attr("id", "test-img")
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("patternContentUnits", "objectBoundingBox")
      .append("image")
      .attr("height", 1)
      .attr("width", 1)
      .attr("preserveAspectRatio", "none")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr("xlink:href", "images/default.jpeg");


    // Modal Window
    var modal = document.getElementById('myModal');

    window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none"
      }
    }

    // Scales
    var ageRange = ["0-17", "18-25", "26-35", "36-45", "46-60", "61+", ""]
    var colorRange = d3.scaleOrdinal().domain(ageRange)
        .range(["#E3E4E5","#F4E29D", "#EECE8E", "#5B7398", "#8EAEBA", "#818283", "#D9D9D9"]) // For strokes around circles representing age range
  

  // Responsive Variables
  var radius = 16
  var forceCollide = d3.forceCollide(radius+10)
  
  // Tablet: 768
  // Mobile: 460
  
  // Desktop & iPad Pro Settings
  if (window.matchMedia("(min-width: 771px)").matches) { 
    console.log("desktop")
    var radius = 16
    var forceCollide = d3.forceCollide(radius+10)

    // Desktop Elderly
    var forceX = d3.forceX(function(d) {
      if(d.age_range === '61+') {
        return width - width/4
      }
      else {
        return 300
      }
    }).strength(0.3)


    // Desktop Type
    var forceY = d3.forceY(function(d) {
      if(d.Type === 'Physical') {
        return 200
      }
      else {
        return 650
      }
    }
    ).strength(0.3)
    //Split End
  }

  // iPad & Tablet
  if ( (window.matchMedia("(min-width: 500px)").matches) && (window.matchMedia("(max-width: 770px)").matches) ) {
    console.log("tablet")
    var radius = 10
    var forceCollide = d3.forceCollide(radius+5)

    // Tablet Elderly
    var forceX = d3.forceX(function(d) {
      if(d.age_range === '61+') {
        return width - 200
      }
      else {
        return 200
      }
    }).strength(0.3)


    // Tablet Type
    var forceY = d3.forceY(function(d) {
      if(d.Type === 'Physical') {
        return 300
      }
      else {
        return 600
      }
    }
    ).strength(0.3)
    //Split End
  }

  // Mobile 
  if ( (window.matchMedia("(min-width: 0px)").matches) && (window.matchMedia("(max-width: 499px)").matches) ) {
    console.log("mobile")
    var radius = 7
    var forceCollide = d3.forceCollide(radius+5)

    // Mobile Elderly
    var forceX = d3.forceX(function(d) {
      if(d.age_range === '61+') {
        return 300
      }
      else {
        return 100
      }
    }).strength(0.3)


    // Mobile Type
    var forceY = d3.forceY(function(d) {
      if(d.Type === 'Physical') {
        return 100
      }
      else {
        return 400
      }
    }
    ).strength(0.3)
    //Split End
  }


  //simulation is a collection of forces on where we want our circles to go and interact
    var simulation = d3.forceSimulation()
       .force("x", d3.forceX(width / 2).strength(0.05)) // how hard to push the circles - side to side 0.05
       .force("y", d3.forceY(height / 2).strength(0.05)) // how hard to push the circles - up and down 0.05
       .force("collide", forceCollide) // radius of circle should match

    // D3 Tip
    var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function (d) {
            return "Age Range: " + d.age_range + "</br> Location: " + d.location; // + d.short_description
        });
    svg.call(tool_tip);

    // Parse dataset
    d3.queue()
    .defer(d3.csv, "https://docs.google.com/spreadsheets/d/e/2PACX-1vRKfmtp67TdquSHomdMjxaiVL3Wd_glXS2GEukCBYu8ChfuXQZzEzWBKpVmHZ01hH9u2NM4xZanyU4S/pub?gid=1252345117&single=true&output=csv")
    .await(ready)

    function ready (error, datapoints) {
      
      // 61+ Count
      var countObj = 0

      datapoints.forEach(function(d) {
          var ageCount = d.age_range;
          if(ageCount === "61+") {
              countObj += 1
          } else {
              //pass
          }
      });
      //console.log("61+ Entries:", countObj)

      // Physical + Verbal Count
      var physCount = 0
      var verbCount = 0

      datapoints.forEach(function(d) {
          var assault = d.Type;
          if(assault === "Physical") {
              physCount += 1
          } 
          if(assault === "Verbal") {
            verbCount += 1
          } 
          else {
              //pass
          }
      });
      
      //console.log("Physical Entries:", physCount)
      //console.log("Verbal Entries:", verbCount)

      // Pulling in images
      defs.selectAll(".img-pattern")
        .data(datapoints)
        .enter().append("pattern")
        .attr("class", "img-pattern")
        .attr("id", function(d) {
          return d.id
        })
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
        .attr("xlink:href", function(d) {
          return d.image_path
        });

      // Creating bubbles
      var circles = svg.selectAll(".person")
        .data(datapoints)
        .enter().append("circle")
        .attr("class", function(d) {
          return "person " + "p" + d.Year
        })
        .attr("r", radius)
        .attr("fill", function(d) {
          return "url(#" + d.id + ")"
        }) // fill in images
        .attr("stroke", d=>colorRange(d.age_range))
        .style("stroke-width", 3)
        .attr("cx", 600) //circle position
        .attr("cy", 600) //circle position
        .on('click', function(d) {
          console.log(d) // see who is who
        })
        .on('mouseover', tool_tip.show)
        .on('mouseout', tool_tip.hide)
        .on('click', function(d) {
          d3.select(".infobox .desc").text(d['short_description'])
          d3.select(".infobox .link").html("<a href='" +d.link+ "' target='_blank'>Read More</a>")
          $("#myModal").show()
        })

        // Drop Down
        function dropdownChange() {
          var year = document.getElementById("year").value

          if(year === "all")    {
            d3.selectAll('.person')
              .transition()
              .duration(1000)
              .attr("r", radius)
          }

          if(year === "2006")    {
            d3.selectAll('.person')
              .transition()
              .duration(1000)
              .attr("r", 0)

            d3.selectAll('.p2006')
              .transition()
              .duration(1000)
              .attr("r", radius)
          }

          if(year === "2015")    {
            d3.selectAll('.person')
              .transition()
              .duration(1000)
              .attr("r", 0)

            d3.selectAll('.p2015')
              .transition()
              .duration(1000)
              .attr("r", radius)
          }

          if(year === "2016")    {
            d3.selectAll('.person')
              .transition()
              .duration(1000)
              .attr("r", 0)

            d3.selectAll('.p2016')
              .transition()
              .duration(1000)
              .attr("r", radius)
          }

          if(year === "2017")    {
            d3.selectAll('.person')
              .transition()
              .duration(1000)
              .attr("r", 0)

            d3.selectAll('.p2017')
              .transition()
              .duration(1000)
              .attr("r", radius)
          }

          if(year === "2018")    {
            d3.selectAll('.person')
              .transition()
              .duration(1000)
              .attr("r", 0)

            d3.selectAll('.p2018')
              .transition()
              .duration(1000)
              .attr("r", radius)
          }

          if(year === "2019")    {
            d3.selectAll('.person')
              .transition()
              .duration(1000)
              .attr("r", 0)

            d3.selectAll('.p2019')
              .transition()
              .duration(1000)
              .attr("r", radius)
          }

          if(year === "2020")    {
            d3.selectAll('.person')
              .transition()
              .duration(1000)
              .attr("r", 0)

            d3.selectAll('.p2020')
              .transition()
              .duration(1000)
              .attr("r", radius)
          }

          if(year === "2021")    {
            d3.selectAll('.person')
              .transition()
              .duration(1000)
              .attr("r", 0)

            d3.selectAll('.p2021')
              .transition()
              .duration(1000)
              .attr("r", radius)
          }

          if(year === "2022")    {
            d3.selectAll('.person')
              .transition()
              .duration(1000)
              .attr("r", 0)

            d3.selectAll('.p2022')
              .transition()
              .duration(1000)
              .attr("r", radius)
          }
      }
  
      document.getElementById("year").addEventListener("change", dropdownChange);

      // Buttons
      
      // Elderly
      d3.select("#elderly").on('click', function() {
        simulation
          .force("x", forceX)
          .alphaTarget(0.1) // needs this when changing simulation force
          .alphaDecay(0.1) // This number needs to be tuned to prevent jitters, trial and error
          .velocityDecay(0.6) // This number needs to be tuned to prevent jitters, trial and error
          .restart()

        // Desktop & iPad Pro Settings
        if (window.matchMedia("(min-width: 771px)").matches) { 
          svg.append("text")
          .data(datapoints)
          .attr("class", "text-annotation")
          .attr("x", width / 2)
          .attr("y", 106)
          //.attr("dy", "-100px")
          .attr("dx", "220px")
          .style("fill", "#eeeeee")
          .style("font-size", "20px")
          .text("Elderly ("+countObj+")")

          svg.append("text")
          .data(datapoints)
          .attr("class", "text-annotation")
          .attr("x", width / 2)
          .attr("y", height / 4)
          .attr("dy", "-100px")
          .attr("dx", "-100px")
          .style("fill", "#eeeeee")
          .style("font-size", "20px")
          .text("Total Incidents ("+physCount+")")
        }

        // iPad & Tablet
        if ( (window.matchMedia("(min-width: 500px)").matches) && (window.matchMedia("(max-width: 770px)").matches) ) {
          svg.append("text")
          .data(datapoints)
          .attr("class", "text-annotation")
          .attr("x", width / 2)
          .attr("y", height / 2)
          .attr("dy", "-40px")
          .attr("dx", "270px")
          .style("fill", "#eeeeee")
          .style("font-size", "20px")
          .text("Elderly ("+countObj+")")

          svg.append("text")
          .data(datapoints)
          .attr("class", "text-annotation")
          .attr("x", width / 2)
          .attr("y", height / 4)
          .attr("dy", "-100px")
          .attr("dx", "-100px")
          .style("fill", "#eeeeee")
          .style("font-size", "20px")
          .text("Total Incidents ("+physCount+")")
        }

        // Mobile 
        if ( (window.matchMedia("(min-width: 0px)").matches) && (window.matchMedia("(max-width: 499px)").matches) ) {
          svg.append("text")
          .data(datapoints)
          .attr("class", "text-annotation")
          .attr("x", width / 2)
          .attr("y", height / 2)
          .attr("dy", "150px")
          .attr("dx", "60px")
          .style("fill", "#eeeeee")
          .style("font-size", "20px")
          .text("Elderly ("+countObj+")")

          svg.append("text")
          .data(datapoints)
          .attr("class", "text-annotation")
          .attr("x", width / 2)
          .attr("y", height / 2)
          .attr("dy", "-300px")
          .attr("dx", "-90px")
          .style("fill", "#eeeeee")
          .style("font-size", "20px")
          .text("Total Incidents ("+physCount+")")
        }

  
      })

      // All
      d3.select("#all").on('click', function() {
        simulation
          .force("x", d3.forceX(width / 2).strength(0.05))
          .force("y", d3.forceY(height / 2).strength(0.05))
          .alphaTarget(0.2) // needs this when changing simulation force
          .alphaDecay(0.1) // This number needs to be tuned to prevent jitters, trial and error
          .velocityDecay(0.6) // This number needs to be tuned to prevent jitters, trial and error
          .restart()

          d3.selectAll(".text-annotation").remove()
      })

      // D3 Force
      simulation.nodes(datapoints) //d3 force feed data
        .on('tick', ticked)

      function ticked() {
        circles
        .attr("cx", function(d) {
          return d.x
        })
        .attr("cy", function(d) {
          return d.y
        })
      }

      setTimeout(() => { document.getElementById("all").click() }, 1000); // Handles circle alignment just in case 

    }

})();

