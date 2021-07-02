// Finds new svg width & height
// Update x & y scales with newWidth and newHeight
// Update d3 components using same scales

function render() {
    // Grabbing the div that our svg is inside of
    // and asking it how wide it is
    // "hey <svg> that is really a <g>, go through
    // your parents until you find a div"
​
    const svgContainer = svg.node().closest('div')
    const svgWidth = svgContainer.offsetWidth
    const svgHeight = height + margin.top + margin.bottom
​
    const actualSvg = d3.select(svg.node().closest('svg'))
    actualSvg.attr('width', svgWidth).attr('height', svgHeight)
​
    // This what we really want: newWidth and newHeight
​
    const newWidth = svgWidth - margin.left - margin.right
    const newHeight = svgHeight - margin.top - margin.bottom
​
    // reset your scales
    yPositionScale.range([newHeight, 0])
    xPositionScale.range([0, newWidth])
​
    // refresh your axises
    svg.select('.x-axis').call(xAxis)
    svg.select('.y-axis').call(yAxis)
​
    // Find everything that needs to be updated (e.g. widths)
    // and update them!
​
    d3.selectAll(".line").attr("d", newline);
​
    d3.selectAll('.bar')
        .attr("x", function(d) { return xPositionScale(d.date); })
        .attr("width", xPositionScale.bandwidth())
​
    // if the svgWidth is very small, we need to move some of our annotations:
    if (svgWidth <400){
​
        d3.select(".caseAnno").attr('text-anchor', 'start')
​
        d3.selectAll('.anno').style('text-anchor', function(d){ return "end" })

    }
​
}
​
// When the window resizes, run the function
// that redraws everything
window.addEventListener('resize', render)
// And now that the page has loaded, let's just try
// to do it once before the page has resized
render()
