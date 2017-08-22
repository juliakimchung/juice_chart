let margin5 = { top: 120, right: 10, bottom:100, left: 10},
    width5 = 1500 - margin5.right -margin5.left,
	  height5 = 750 -margin5.top - margin5.bottom;
//the g element is used as a container for grouping objects.
let svg5 = d3.select('body')
		.append('svg')
		.attr({
			'width': width5 +margin5.right +margin5.left,
			'height': height5 +margin5.top +margin5.bottom
		})
		.append("g")
			.attr("transform", "translate(" +margin5.left + "," + margin5.right + ")");


//define the x and y scales

let xScale5 = d3.scale.ordinal()
		.rangeRoundBands([0, width5], 0.2, 0.2);

let yScale5 = d3.scale.linear()
		.range([height5, 10]);

	//define axis

let xAxis5 = d3.svg.axis()
		.scale(xScale5)
		.orient('bottom');

let yAxis5 = d3.svg.axis()
		.scale(yScale5)
		.orient("left")

d3.csv("juice.csv", function(error, data){
		if(error) console.log("Error: data not loaded");
		console.log("data from juice.csv", data);
		data.forEach(function(d) {
			d.Name =  d.Name;
			d.Calorie = +d.Calorie;
			console.log("d.Calorie", d.Calorie);
		});
		data.sort(function(a,b){
			return b.Calorie - a.Calorie;
		});

		xScale5.domain(data.map(function(d) {
			return d.Name;
		}));
		yScale5.domain([0, d3.max(data, function(d){
			return d.Calorie;
		})]);


// draw the bars
		svg5.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
			.attr('height', 0)
			.attr('y', height5)
			.transition().duration(3000)
			.delay(function(d, i){return i + 200;})
			.attr({
				'x': function(d){
						return xScale5(d.Name);},
				'y': function (d) {
						return yScale5(d.Calorie);},
				'width': xScale5.rangeBand(),
				'height': function(d){ return height5 - yScale5(d.Calorie);}
			})
			.style('fill', function(d, i){ return '#159E31'});
			
		//label the bars

		svg5.selectAll('text')
			.data(data)
			.enter()
			.append('text')
			.text(function(d){ return d.Calorie})
			.attr('x', function(d){return xScale5(d.Name) + xScale5.rangeBand()/2;})
			.attr('y', function(d) {return yScale5(d.Calorie) + 20;})
			.style('fill', 'white')
			.style('text-anchor', 'middle')
			.style('font-size', '10px');
		//draw the xAxis
		svg5.append('g')	
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,'+ height5 + ')')
			.call(xAxis5)
			.selectAll('text')
			.attr('transform', "rotate(-80)")
			.attr('dx', '-.8em')
			.attr('dy', '.25em')
			.style('text-anchor', 'end')
			.style('font-size', '12px');

		svg5.append('g')
			.attr('class', 'y axis')
			.call(yAxis5)
			.style('font-size', '15px')

		svg5.append("text")
        .attr("x", (width5 / 2))             
        .attr("y",80 - (margin5.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "22px") 
        .style("text-decoration", "underline")  
        .text("Average-Calorie by the Juice Name");
});


