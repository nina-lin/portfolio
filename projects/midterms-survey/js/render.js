// This function assumes that you have a variable called svg that contains your svg
// Your svg must be contained in a div with width set to 100%
function render() {
    // This is all boilerplate. Do not change until *update* 
    // Grabbing the div that our svg is inside of
    // and asking it how wide it is
    // "hey <svg> that is really a <g>, go through
    // your parents until you find a div"

    const svgContainer = svg.node().closest('div')
    const svgWidth = svgContainer.offsetWidth
    const svgHeight = height + margin.top + margin.bottom

    const actualSvg = d3.select(svg.node().closest('svg'))
    actualSvg.attr('width', svgWidth).attr('height', svgHeight)

    // This what we really want: newWidth and newHeight

    const newWidth = svgWidth - margin.left - margin.right
    const newHeight = svgHeight - margin.top - margin.bottom

    // UPDATE

    // reset your scales
    ageXscale.range([0, newWidth])
    partyXscale.range([0, newWidth])
    issuesYscale.range([newHeight * .9, 0])

    // refresh your axises 

    d3.select('.graphTicks').call(yAxis)

    // Update widths

    // d3.selectAll(".line").attr("d", newline);

    // d3.selectAll('.bar')
    //     .attr("x", function(d) { return xPositionScale(d.date); })
    //     .attr("width", xPositionScale.bandwidth())

    
        
    // }

}

// When the window resizes, run the function
// that redraws everything
window.addEventListener('resize', render)
// And now that the page has loaded, let's just try
// to do it once before the page has resized
render()