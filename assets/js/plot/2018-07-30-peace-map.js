// "Source: Institute for Economics and Peace. Learn more at economicsandpeace.org and visionofhumanity.org".
// get suffix for numbers
function getNumSuffix(n) {
    digits = n.toString().split('');
    last = digits.pop();
    if (digits.pop() == 1) {
        return "th";
    }
    switch(last) {
        case "1":
            return "st";
        case "2":
            return "nd";
        case "3":
            return "rd";
        default:
            return "th";
    }
}

// parse the date / time
var parseTime = d3.timeParse("%Y");

// resize
function resize() {
    currDim = d3.select(".map-container").node().getBoundingClientRect();
    projection
        .scale(mapScale * d3.max([currDim.width, 400]))
        .translate([currDim.width*mapOffset.x, currDim.height*mapOffset.y]);
    path.projection(projection);
    mapC.attr("d", path);
    mapR.attr("d", path);
    drawlegend();
}

// buttons
function changeYear(year) {
    document.getElementById('year-value').value=year;
    yearSlider.value = year;
    toggleDisplay();
}

function nextYear() {
    var year = +yearSlider.value;
    changeYear(year + 1);
}

function prevYear() {
    var year = +yearSlider.value;
    changeYear(year - 1);
}

function toggleDisplay() {
    diffToggle.disabled = true;
    regionToggle.disabled = true;
    prev.disabled = true;
    next.disabled = true;
    // setTimeout(redraw, 200);
    redraw();
}
var next = document.getElementById("next-year"),
   prev = document.getElementById("prev-year")
   diffToggle = document.getElementById("diff-toggle"),
   regionToggle = document.getElementById("region-toggle"),
   yearSlider = document.getElementById("year-slider");

var widthFull = 1600,
   aspectRatio = 0.45,
   mapOffset = {x: 0.475, y: 0.57},
   mapScale = 0.185,
   legendDim = {height: 10, width: 150, x: 0.05, y: 0.7},
   opacityAlt = 0.7,
   defColDomain = [5,0],
   altColDomain = [1.5,-1.5],
   color = d3.scaleQuantile()
       .domain(defColDomain)
       .range([
           d3.rgb("rgb(100, 200, 100)"),
           d3.rgb("rgb(110, 200, 110)"),
           d3.rgb("rgb(120, 200, 120)"),
           d3.rgb("rgb(130, 200, 130)"),
           d3.rgb("rgb(140, 200, 140)"),
           d3.rgb("rgb(150, 200, 150)"),
           d3.rgb("rgb(160, 200, 160)"),
           d3.rgb("rgb(170, 200, 170)"),
           d3.rgb("rgb(180, 200, 180)"),
           d3.rgb("rgb(190, 200, 190)"),
           d3.rgb("rgb(200, 200, 200)"),
           d3.rgb("rgb(200, 190, 190)"),
           d3.rgb("rgb(200, 180, 180)"),
           d3.rgb("rgb(200, 170, 170)"),
           d3.rgb("rgb(200, 160, 160)"),
           d3.rgb("rgb(200, 150, 150)"),
           d3.rgb("rgb(200, 140, 140)"),
           d3.rgb("rgb(200, 130, 130)"),
           d3.rgb("rgb(200, 120, 120)"),
           d3.rgb("rgb(200, 110, 110)"),
           d3.rgb("rgb(200, 100, 100)")
       ]),
   colorAlt = '#f0f0f0',
   startYear = 2008
   currYear = 2018;

var detailCols = [
       'Access to Small Arms',
       'Armed Services Personnel Rate',
       'Deaths from External Conflict',
       'Deaths from Internal Conflict',
       'External Conflicts Fought',
       'External Peace',
       'Homicide Rate',
       'Incarceration Rate',
       'Intensity of Internal Conflict',
       'Internal Conflicts Fought',
       'Internal Peace',
       'Militarisation',
       'Military Expenditure (%GDP)',
       'Neighbouring Countries Relations',
       'Nuclear and Heavy Weapons',
       'Ongoing Conflict',
       'Overall Score',
       'Perceptions of Criminality',
       'Police Rate',
       'Political Instability',
       'Political Terror Scale',
       'Refugees and IDPs',
       'Safety & Security',
       'Terrorism Impact',
       'UN Peacekeeping Funding',
       'Violent Crime',
       'Violent Demonstrations',
       'Weapons Exports',
       'Weapons Imports'
   ];

var regions = [
   {properties: {SUBREGION: 'Eastern Africa'}},
   {properties: {SUBREGION: 'Western Asia'}},
   {properties: {SUBREGION: 'South-Eastern Asia'}},
   {properties: {SUBREGION: 'South America'}},
   {properties: {SUBREGION: 'Southern Europe'}},
   {properties: {SUBREGION: 'Melanesia'}},
   {properties: {SUBREGION: 'Central Asia'}},
   {properties: {SUBREGION: 'Micronesia'}},
   {properties: {SUBREGION: 'Caribbean'}},
   {properties: {SUBREGION: 'Polynesia'}},
   {properties: {SUBREGION: 'Northern America'}},
   {properties: {SUBREGION: 'Western Africa'}},
   {properties: {SUBREGION: 'Northern Europe'}},
   {properties: {SUBREGION: 'Eastern Europe'}},
   {properties: {SUBREGION: 'Northern Africa'}},
   {properties: {SUBREGION: 'Eastern Asia'}},
   {properties: {SUBREGION: 'Western Europe'}},
   {properties: {SUBREGION: 'Southern Africa'}},
   {properties: {SUBREGION: 'Southern Asia'}},
   {properties: {SUBREGION: 'Middle Africa'}},
   {properties: {SUBREGION: 'Central America'}},
   {properties: {SUBREGION: 'Australia and New Zealand'}}
];

var svg = d3.select(".map-container")
       .append("svg")
       .attr("width", widthFull)
       .attr("height", aspectRatio*widthFull)
       .attr("preserveAspectRatio", "xMinYMin meet")
       .attr("viewBox", "0 0 1600 720")
       .classed("svg-content-responsive", true),
   ocean = svg.append("rect")
       .attr("width", widthFull)
       .attr("height", aspectRatio*widthFull)
       .attr("class", "ocean")
       .on("click", hideDetail),
   map = svg.append("g"),
   currDim = d3.select(".map-container").node().getBoundingClientRect(),
   projection = d3
       .geoNaturalEarth1()
       .scale(mapScale * d3.max([currDim.width, 400]))
       .translate([currDim.width*mapOffset.x, currDim.height*mapOffset.y]),
   path = d3.geoPath()
       .projection(projection);

// enable zooming
var zoom = d3.zoom()
   .scaleExtent([1, 10])
   .translateExtent([[0,0],[widthFull, widthFull*aspectRatio]]);
function zoomed() {
 map.attr("transform", d3.event.transform);
}
svg.call(zoom.on("zoom", zoomed));


// add legend
var lgnd = svg.append("g")
       .attr("class", "legend"),
   lgndScale = d3.scaleLinear()
       .domain(defColDomain)
       .range([0, legendDim.height]),
   lgndAxis = d3.axisRight()
       .scale(lgndScale)
       .tickValues([]),
   gradient = lgnd.append("defs")
       .append("svg:linearGradient")
       .attr("id", "gradient")
       .attr("x1", "0%")
       .attr("y1", "0%")
       .attr("x2", "100%")
       .attr("y2", "0%")
       .attr("spreadMethod", "pad");
d3.range(5).forEach(function(i) {
   gradient.append('stop')
       .attr('offset', (i*20) + "%")
       .attr('stop-color', color(i))
       .attr('stop-opacity', opacityAlt);
});

function drawlegend() {
   lgnd.select("g").remove();

   lgnd.attr('transform', 'translate('
       + (currDim.width*legendDim.x) + ','
       + (currDim.height*legendDim.y) + ')'
   );

   var inner = lgnd.append("g");

   inner.append('rect')
       .attr('width', legendDim.width)
       .attr('height', legendDim.height)
       .style('fill', 'url(#gradient)');

   lgndTick = inner.append("g")
       .attr("class", "legend axis")
       .attr("transform", "translate(" + legendDim.width + ", 0)")
       .call(lgndAxis);

   inner.append("text")
       .attr("x", legendDim.width*0.5)
       .attr("y", "-1.5em")
       .attr("text-anchor", "middle")
       .text("GPI");

   inner.append("text")
       .attr("class", "label")
       .attr("x", legendDim.width)
       .attr("y", "-.5em")
       .attr("text-anchor", "end")
       .style("fill", color(5))
       .text("High");

   inner.append("text")
       .attr("class", "label")
       .attr("x", 0)
       .attr("y", "-.5em")

       .style("fill", color(0))
       .text("Low");

   inner.append("text")
       .attr("class", "subtext")
       .attr("y", legendDim.height + 5)
       .attr("alignment-baseline", "hanging")
       .text("Lower GPI indicates higher level of peace.");
}

drawlegend();

var gpi,
   diff
   handleMouseOver = true;

function fillmap() {
   if(regionToggle.checked) {
       mapR
           .style("fill", function(d) {
               score = diffToggle.checked?
                   (d.score[startYear]==null)?null:d.score[yearSlider.value] - d.score[startYear]:
                   d.score[yearSlider.value];
               return (score!=null && d.active)?color(score):colorAlt;
           })
           .style("stroke", "#ffffff");
   } else {
       mapC
           .style("fill", function(d) {
               score = diffToggle.checked?
                   (d.score[startYear]==null)?null:d.score[yearSlider.value] - d.score[startYear]:
                   d.score[yearSlider.value];
               return (score!=null && d.active)?color(score):colorAlt;
           })
           .style("stroke", "#ffffff");
   }
}

function hideDetail() {
   detailBox.lower();
   // color map
   mapR.each(function(d) {
       d.active = true;
   });
   mapC.each(function(d) {
       d.active = true;
   });
   fillmap();

   handleMouseOver = true;
   detailBox.style("opacity", 0);
   plot01.selectAll("*").remove();
   plot02.selectAll("*").remove();
}

function redraw() {
   hideDetail();
   if(diffToggle.checked) {
       color.domain(altColDomain);
   } else {
       color.domain(defColDomain);
   }

   // color map
   mapR.each(function(d) {
       d.active = true;
   });
   mapC.each(function(d) {
       d.active = true;
   });
   fillmap();

   // reorder maps
   if(regionToggle.checked) {
       mapC.style("opacity", 0);
       d3.select(".regions").raise();
       mapR.style("opacity", 1);
   } else {
       mapR.style("opacity", 0);
       d3.select(".countries").raise();
       mapC.style("opacity", 1);
   }

   // re-enable widgets
   diffToggle.disabled = false;
   regionToggle.disabled = false;
   if(yearSlider.value == startYear) {
       next.disabled = false;
   } else if(yearSlider.value == currYear) {
       prev.disabled = false;
   } else {
       prev.disabled = false;
       next.disabled = false;
   }
}

d3.json('/assets/data/countries_50m.topojson').then(function(data){

   countries = topojson.feature(data, data.objects.countries).features.filter(
       function(g) { return (g.properties.GU_A3 == "GRL" || g.properties.GU_A3 == "ATA")?false:true;}
   );
   boundaries = topojson.mesh(
               data, data.objects.countries, function(a, b) { return a !== b; }
   );

   regions.forEach(function(d){
       // console.log(d.properties.SUBREGION);
       d.type = "Feature";
       d.geometry = topojson.merge(
           data, data.objects.countries.geometries.filter(function(g){
               return (g.properties.GU_A3 == "GRL")
                   ?false:g.properties.SUBREGION == d.properties.SUBREGION;
       }));
   })

   d3.csv('/assets/data/2018-07-30-gpi.csv').then(function(_gpi){
       gpi = _gpi;
       gpi.forEach(function(d){
           var first = gpi.filter(function(g) {
                   return g.GU_A3 == d.GU_A3 && g.Year == startYear;
               })[0].Score;
           d.diff = (first==0)?null:(d.Score - first);
       });
       var sorted = {};
       for(i = startYear; i <= currYear; i ++) {
           sorted[i] = gpi.filter(function(g) {
               return g.Year == i;
           }).map(function(g) { return (g.diff==null)?null:g.diff; });
           sorted[i].sort(function(a, b){ return a - b; });
       }
       gpi.forEach(function(d){
           d.diff_rank = sorted[d.Year].indexOf(d.diff) + 1;
       });
       x.domain(d3.extent(gpi, function(d) { return parseTime(d.Year); }));

       mapR = map
           .append("g")
           .attr("id", "regions")
           .attr("class", "map regions")
           .selectAll(".region")
           .data(regions, function(d) {
               d.active = true;
               d.name = d.properties.SUBREGION;
               d.score = {};
               d.diff = {};
               d.detail = {};
               for(year = startYear; year <= currYear; year++){
                   var selected = gpi.filter(function(g){
                       return (g.SUBREGION == d.properties.SUBREGION) && (g.Year == year);
                   })
                   d.score[year] = d3.mean(selected, function(s) {return (s.Score==null)?null:s.Score; });
                   d.diff[year] = d.score[year] - d.score[startYear];
                   d.detail[year] = {};
                   detailCols.forEach(function(c) {
                       d.detail[year][c] = d3.mean(selected, function(s) {return (s[c]==null)?null:s[c]; });
                   });
               }
           })
           .enter()
           .append("path")
           .attr("class", "region")
           .style("fill", colorAlt)
           .attr("d", path)
           .style("opacity", 0)
           .on("mouseover", mouseoverHandler)
           .on("mouseout", mouseoutHandler)
           .on("click", clickHandler);
       mapR
           .append("title")
           .text(function(d) { return d.name; });

       mapC = map
           .append("g")
           .attr("id", "countries")
           .attr("class", "map countries")
           .selectAll(".country")
           .data(countries, function(d) {
               var selected = gpi.filter(function(g) {
                       return (g.GU_A3 == d.properties.GU_A3)
                   });
               d.active = true;
               d.name = d.properties.NAME_LONG;
               d.score = {};
               d.rank = {};
               d.diff = {};
               d.diff_rank = {};
               d.detail = {};
               selected.forEach(function(s) {
                   d.score[s.Year] = (s.Score==0)?null:s.Score;
                   d.rank[s.Year] = (s.Rank==0)?null:s.Rank;
                   d.diff[s.Year] = (s.diff==null)?null:s.diff;
                   d.diff_rank[s.Year] = (s.diff_rank==null)?null:s.diff_rank;
                   d.detail[s.Year] = {};
                   detailCols.forEach(function(c) {
                       d.detail[s.Year][c] = (s[c]==null)?null:s[c];
                   });
               });
           })
           .enter()
           .append("path")
           .attr("class", "country")
           .attr("d", path)
           .style("fill", colorAlt)
           .on("mouseover", mouseoverHandler)
           .on("mouseout", mouseoutHandler)
           .on("click", clickHandler);
       mapC
           .append("title")
           .text(function(d) { return d.name; });

       function clickHandler(d) {
           highlight(d3.select(this));
           handleMouseOver = false;
           detailBox.style("opacity", 1);
           detailBox.raise();
           detail
               .html("<h1>" + d.name + "</h1><p>Hover over details to see trend for each category.<br/>Lower GPI indicates higher level of peace.</p>")
           drawline(d);
           drawbar(d);
       }

       function mouseoverHandler() {
           if (handleMouseOver){
               highlight(d3.select(this));
           }
       }

       function mouseoutHandler() {
           if (handleMouseOver){
               mapR.each(function(d) {
                   d.active = true;
               });
               mapC.each(function(d) {
                   d.active = true;
               });
               fillmap();
           }
       }

       function highlight(selected) {
           mapR.each(function(d) {
               d.active = false;
           });
           mapC.each(function(d) {
               d.active = false;
           });
           selected.each(function(d) {
               d.active = true;
           });
           fillmap();
       }

       fillmap();

       window.addEventListener("resize", function(){
           resize();
       });
   });
});

// detail map
// draw minimap
var plotWidth = 400,
    plotHeight = 300,
    plotWidth02 = 300,
    plotHeight02 = 300,
    plotMargin = {left: 80, top: 20, right: 240, bottom: 50},
    plotPadding = {left: 10, top: 15, right: 20, bottom: 10}
    diffYDomain = [4, -1];

var detailBox = d3.select(".details")
        .style("opacity", 0),
    detail = detailBox.append("div"),
    detailPlots = detailBox.append("div").attr("class", "mini-plots-container"),
    plot01 = detailPlots.append("svg")
        .attr("class", "mini-plot")
        .attr("width", (plotWidth + plotMargin.left + plotMargin.right + plotPadding.left + plotPadding.right))
        .attr("height", (plotHeight + plotMargin.top + plotMargin.bottom + plotPadding.top + plotPadding.bottom)),
    plot02 = detailPlots.append("svg")
        .attr("class", "mini-plot")
        .attr("width",  (plotWidth02 + plotMargin.left + plotMargin.left + plotPadding.left + plotPadding.right))
        .attr("height", (plotHeight02 + plotMargin.top + plotMargin.bottom + plotPadding.top + plotPadding.bottom));

// set the ranges
var tt = 600,
    x = d3.scaleTime()
        .range([0, plotWidth]),
    y = d3.scaleLinear()
        .range([0, plotHeight]),
    linePlotAxisX = d3.axisBottom(x).tickValues([parseTime(startYear), parseTime(currYear)])
    x02= d3.scaleLinear()
        .range([plotWidth02, 0]),
    y02 = d3.scaleBand()
        .range([0, plotHeight02])
        .domain(detailCols)
        .padding(0.5);

// define the line
var line = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); });

function drawline(d) {
    plot01.selectAll("*").remove();
    var t = d3.transition().duration(tt).ease(d3.easeQuadOut);
    var selected = d3.entries(d.score),
        ref = gpi.filter(function(g) {
            return g.GU_A3 == "AVG";
        }),
        linePlotAxisY = d3
            .axisLeft(y)
            .tickValues(defColDomain)
            .tickFormat(d3.format("d")),
        title = "GPI by Year";
    y.domain(defColDomain);
    selected.forEach(function(s) {
        s.date = parseTime(s.key);
        s.value = (s.value==null)?null:+s.value;
    });

    ref.forEach(function(r) {
        r.date = parseTime(r.Year);
        r.value = +r.Score;
    });

    if(diffToggle.checked) {
        y.domain(diffYDomain);
        linePlotAxisY
            .tickValues(diffYDomain)
            .tickFormat(d3.format("+.0%"));
        selected.forEach(function(s) {
            s.value = (s.value==null)?null:s.value/d.score[startYear] - 1;
        });
        year0 = (ref.filter(function(r) { return r.Year == startYear; })[0].value);
        ref.forEach(function(r) {
            r.value =(r.value/year0) - 1;
        });
        title = "% Change by Year";
    }

    var y2 = y(selected.filter(function(s) {
            return s.key == currYear;
        })[0].value) +
        (30 *
            ((ref.filter(function(r) {
                return r.Year == currYear
            })[0].value < selected.filter(function(s) {
                return s.key == currYear;
            })[0].value)?-1:1)
        );

    // plot title
    plot01.append("g")
        .attr("transform", "translate(" + (plotMargin.left) + ","+ plotMargin.top + ")")
        .attr("class", "title")
        .append("text")
        .text(title);
    // x axis
    plot01.append("g")
        .attr("transform", "translate(" + (plotMargin.left + plotPadding.left) + "," + (plotHeight + plotMargin.top + plotPadding.top + plotPadding.bottom) + ")")
        .attr("class", "axis x")
        .call(linePlotAxisX)
        .append("text")
        .attr("class", "label")
        .attr("x", plotWidth/2)
        .attr("y", "1.7em")
        .text("Year");
    // y axis
    plot01.append("g")
        .attr("transform", "translate("+ (plotMargin.left) + "," + (plotMargin.top + plotPadding.top) + ")")
        .attr("class", "axis y")
        .call(linePlotAxisY)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("x", -1*plotHeight/2)
        .attr("dx", "0.7em")
        .attr("y", "-2.5em")
        .style("text-anchor", "end")
        .text("GPI");
    // Add reference line and circles
    var refLine = plot01.append("g")
        .attr("width", plotWidth)
        .attr("height", plotHeight)
        .attr("transform", "translate(" + (plotMargin.left + plotPadding.left) + "," + (plotMargin.top + plotPadding.top) + ")")
        .attr("class", "mini-plot ref");
    refLine
        .append("path")
        .data([ref])
        .attr("class", "line")
        .attr("d", line);
    refLine
        .selectAll("circle")
        .data(ref)
        .enter().append("circle")
        .attr("class", "circle")
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.value); })
        .style("fill", function(d) { return color(d.value); })
        .append("title")
        .text(function(s) { return "Year: " + s.Year + "\nGPI: " + (diffToggle.checked?d3.format("+.2%")(s.value):d3.format(".2f")(s.value)); });

    // Add country line and cirlces
    var linePlot = plot01.append("g")
        .attr("width", plotWidth)
        .attr("height", plotHeight)
        .attr("transform", "translate(" + (plotMargin.left + plotPadding.left) + "," + (plotMargin.top + plotPadding.top) + ")")
        .attr("class", "mini-plot");
    linePlot
        .append("path")
        .data([selected.filter(function(d) { return d.value!=null; })])
        .attr("class", "line")
        .attr("d", line);
    linePlot
        .selectAll("circle")
        .data(selected.filter(function(d) { return d.value!=null; }))
        .enter().append("circle")
        .attr("class", "circle")
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.value); })
        .style("fill", function(d) { return color(d.value); })
        .append("title")
        .text(function(s) { return "Year: " + s.key + "\nGPI: " + (diffToggle.checked?d3.format("+.2%")(s.value):d3.format(".2f")(s.value)); });
    // Add legends
    var legendArea = plot01.append("g")
        .attr("class", "legend")
        .attr("width", 30)
        .attr("height", 40)
        .attr("transform", "translate(" +  (plotMargin.left + plotPadding.left) + "," + (plotMargin.top + plotPadding.top) + ")");
    var legendAreaRef = legendArea
        .append("g")
        .attr("class", "mini-plot ref")
        .attr("transform", "translate(0,15)");
    legendAreaRef
        .append("line")
        .attr("class", "line")
        .attr("x1", 0)
        .attr("x2", 30)
        .attr("y1", 0)
        .attr("y2", 0);
    legendAreaRef
        .append("text")
        .attr("class", "label")
        .attr("dx", 35)
        .text("Global Average");
    var legendAreaMain = legendArea
        .append("g")
        .attr("class", "mini-plot");
    legendAreaMain
        .append("line")
        .attr("class", "line")
        .attr("x1", 0)
        .attr("x2", 30)
        .attr("y1", 0)
        .attr("y2", 0);
    legendAreaMain
        .append("text")
        .attr("class", "label")
        .attr("dx", 35)
        .text(d.name);

    // add texts
    linePlot.append("line")
        .attr("class", "description")
        .datum(selected.filter(function(s){ return s.key == currYear; })[0])
        .attr("x1", function(s) { return x(s.date) + 7; })
        .attr("y1", function(s) { return y(s.value); })
        .attr("x2", function(s) { return x(s.date) + 7; })
        .attr("y2", function(s) { return y(s.value); })
        .transition(t)
        .attr("x2", plotWidth + 30)
        .attr("y2", y2);
    descText = linePlot.append("text")
        .datum(selected.filter(function(s){ return s.key == currYear; })[0])
        .attr("class", "description")
        .attr("x", plotWidth + 30)
        .attr("y", y2 - (regionToggle.checked?0:15))
        .attr("dy", "0.5em")
        .style("opacity", 0)
        .style("fill", function(s) { return color(s.value); })
        .text(function(s) {
            if(diffToggle.checked){
                return "Change in GPI: " + d3.format("+,.3f")(d.diff[currYear]);
            } else {
                return "GPI: " + d3.format(".2f")(s.value);
            }
        });

    // add ranking only for countries
    if(!regionToggle.checked) {
        descText.append("tspan")
            .attr("class", "rank")
            .attr("dy", "10")
            .attr("x", plotWidth + 30)
            .style("fill", function(s) { return color(s.value); })
            .text(function(s) {
                if(diffToggle.checked){
                    return d3.format(",d")(d.diff_rank[currYear]);
                } else {
                    return d3.format(",d")(d.rank[currYear]);
                }
            });
        descText.append("tspan")
            .text(function(s) {
                if(diffToggle.checked){
                    return getNumSuffix(d.diff_rank[currYear]);
                } else {
                    return getNumSuffix(d.rank[currYear]);
                }
            })
            .style("fill", function(s) { return color(s.value); });
        descText.append("tspan")
            .attr("dx", 5)
            .text(diffToggle.checked?"in making":"peaceful")
            .style("fill", function(s) { return color(s.value); });
        descText.append("tspan")
            .attr("dx", diffToggle.checked?"-4.5em":"-4.0em")
            .attr("dy", "1.1em")
            .text(diffToggle.checked?"progress":"nation")
            .style("fill", function(s) { return color(s.value); });
        descText.append("tspan")
            .attr("dx", diffToggle.checked?"-4.1em":"-3.0em")
            .attr("dy", "1.1em")
            .text(diffToggle.checked?"toward":"in 2018.")
            .style("fill", function(s) { return color(s.value); });
        if(diffToggle.checked) {
            descText.append("tspan")
                .attr("dx", diffToggle.checked?"-3.3em":"-3.0em")
                .attr("dy", "1.1em")
                .text("peace by 2018.")
                .style("fill", function(s) { return color(s.value); });
        }
    }
    descText
        .transition(t)
        .style("opacity", 1);
}

function drawbar(d) {
    plot02.selectAll("*").remove();
    var t = d3.transition().duration(tt).ease(d3.easeQuadOut);
    var selected = d3.entries(d.detail[yearSlider.value]),
        ref = d3.entries(gpi.filter(function(g) {
            return g.GU_A3 == "AVG" && g.Year == yearSlider.value;
        })[0]),
        barPlotAxisX = d3
            .axisBottom(x02)
            .tickValues(defColDomain)
            .tickFormat(d3.format("d"));

    x02.domain(defColDomain);

    // shift plot area to the right
    barPlot = plot02.append("g")
        .attr("class", "mini-plot")
        .attr("transform", "translate(" + (plotMargin.left*2 + plotPadding.left) + "," + (plotMargin.top + plotPadding.top) + ")");

    if(diffToggle.checked) {
        x02.domain(altColDomain);
        barPlotAxisX
            .tickValues(altColDomain)
            .tickFormat(d3.format("+.0%"));
        selected.forEach(function(s) {
            s.value = (s.value==null || d.detail[startYear][s.key]==null)?null:(s.value/d.detail[startYear][s.key] - 1);
        });
        year0 = (gpi.filter(function(g) {
            return g.GU_A3 == "AVG" && g.Year == startYear;
        })[0])
        ref.forEach(function(r) {
            r.value =(r.value/year0[r.key]) - 1;
        });
        barPlot.append("g")
            .attr("class", "axis y")
            .attr("transform", "translate(" + plotWidth02*0.5 + ",0)")
            .append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", plotHeight02);
    }

    // add title
    plot02.append("g")
        .attr("transform", "translate(" + (plotMargin.left*2) + ","+ plotMargin.top + ")")
        .attr("class", "title")
        .append("text")
        .text("Details for " + yearSlider.value);
    barPlot.append("g")
        .attr("class", "mini-plot ref")
        .selectAll(".bar")
        .data(ref.filter(function(r) {
            return detailCols.indexOf(r.key) > -1;
        })).enter().append("polygon")
        .attr("class", "bar")
        .attr("points", function(r) {
            y0 = y02(r.key);
            y1 = y02(r.key) + y02.bandwidth();
            x0 = diffToggle.checked?(plotWidth02*0.5):0;
            x1 = x02(r.value);
            return x0 + "," + y0 + " " +
                x1 + "," + y0 + " " +
                x1 + "," + y1 + " " +
                x0 + "," + y1;
        });
    // add axis
    plot02.append("g")
        .attr("class", "axis y")
        .attr("transform", "translate(" + (plotMargin.left*2) + "," + (plotMargin.top + plotPadding.top) + " )")
        .call(d3.axisLeft(y02));
    plot02.append("g")
        .attr("class", "axis y hidden")
        .attr("transform", "translate(0," + (plotMargin.top + plotPadding.top) + " )")
        .selectAll("rect")
        .data(selected.filter(function (s) {
            return detailCols.indexOf(s.key) > -1;
        })).enter()
        .append("rect")
        .attr("y", function(c) { return y02(c.key); })
        .attr("width", plotMargin.left*2)
        .attr("height", y02.bandwidth())
        // .style("stroke", "")
        .on("mouseover", addsubline)
        .on("mouseout", removesubline)
        .raise();
    plot02.append("g")
        .attr("class", "axis x")
        .attr("transform", "translate(" + (plotMargin.left*2 + plotPadding.left) + "," + (plotMargin.top + plotPadding.top + plotHeight02 + plotPadding.bottom) + " )")
        .call(barPlotAxisX);

    var peaks = barPlot.append("g")
        .attr("width", plotWidth)
        .attr("height", plotHeight)
        .attr("class", "mini-plot")
        .attr("transform", "translate(0," + y02.bandwidth()*0.5 + ")");
    var lines = peaks
            .selectAll(".line")
            .data(selected.filter(function (s) {
                return detailCols.indexOf(s.key) > -1;
            })).enter().append("line")
            .attr("class", "line")
            .style("stroke", function(s) { return color(s.value); })
            .attr("x1", diffToggle.checked?(plotWidth02*0.5):0)
            .attr("x2", diffToggle.checked?(plotWidth02*0.5):0)
            .attr("y1", function(s) { return y02(s.key); })
            .attr("y2", function(s) { return y02(s.key); })
            .on("mouseover", addsubline)
            .on("mouseout", removesubline);
    lines.transition(t)
        .attr("x2", function(s) { return x02(s.value); });
    lines.append("title")
        .text(function(s) { return diffToggle.checked?d3.format("+.2%")(s.value):d3.format(".2f")(s.value); });

    var circles = peaks
            .selectAll("circle")
            .data(selected.filter(function (d) {
                return detailCols.indexOf(d.key) > -1 && d.value <= x02.domain()[0] && d.value >= x02.domain()[1];
            })).enter()
            .append("circle")
            .attr("class", "circle")
            .style("fill", function(s) { return color(s.value); })
            .attr("cy", function(s) { return y02(s.key); })
            .attr("cx", diffToggle.checked?(plotWidth02*0.5):0)
            .on("mouseover", addsubline)
            .on("mouseout", removesubline);;
    circles.append("title")
        .text(function(s) { return diffToggle.checked?d3.format("+.2%")(s.value):d3.format(".2f")(s.value); });
    circles.transition(t)
        .attr("cx", function(s) { return x02(s.value); });

    // add arrows
    plot02.append("defs")
        .selectAll("marker")
        .data(selected.filter(function (d) {
            return detailCols.indexOf(d.key) > -1
            && d.value > x02.domain()[0] && d.value > x02.domain()[1];
        })).enter()
        .append("svg:marker")
        .attr("id", function(d,i) {return "arrow" + i;})
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 5)
        .attr("refY", 0)
        .attr("markerWidth", 4)
        .attr("markerHeight", 4)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("class","arrowHead")
        .style("fill", function(s) { return color(s.value); })
        .on("mouseover", addsubline)
        .on("mouseout", removesubline);
    var arrows = peaks
            .selectAll(".arrow")
            .data(selected.filter(function (d) {
                return detailCols.indexOf(d.key) > -1
                && d.value > x02.domain()[0] && d.value > x02.domain()[1];
            })).enter()
            .append("line")
            .attr("class", "arrow")
            .style("stroke", function(s) { return color(s.value); })
            .attr("marker-end", function(d,i) {return "url(#arrow" + i + ")"})
            .attr("x1", diffToggle.checked?(plotWidth02*0.5):0)
            .attr("x2", diffToggle.checked?(plotWidth02*0.5):0)
            .attr("y1", function(s) { return y02(s.key); })
            .attr("y2", function(s) { return y02(s.key); })
            .on("mouseover", addsubline)
            .on("mouseout", removesubline);
    arrows.append("title")
        .text(function(s) { return diffToggle.checked?d3.format("+.2%")(s.value):d3.format(".2f")(s.value); });
    arrows.transition(t)
        .attr("x1", function(s) { return x02(Math.sign(s.value)); })
        .attr("x2", function(s) { return x02(Math.sign(s.value)); });

    // Add legends
    var legendArea = plot02.append("g")
        .attr("class", "legend diff")
        .attr("width", 30)
        .attr("height", 40)
        .attr("transform", "translate(" +  (plotMargin.left*2 + plotWidth02 - 120) + "," + (plotPadding.top) + ")");
    var legendAreaRef = legendArea
        .append("g")
        .attr("class", "mini-plot ref")
        .attr("transform", "translate(0,15)");
    legendAreaRef
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", -0.7*y02.bandwidth())
        .attr("width", 30)
        .attr("height", y02.bandwidth());
    legendAreaRef
        .append("text")
        .attr("class", "label")
        .attr("dx", 35)
        .text("Global Average");
    var legendAreaMain = legendArea
        .append("g")
        .attr("class", "mini-plot");
    legendAreaMain
        .append("line")
        .attr("class", "line")
        .attr("x1", 0)
        .attr("x2", 30)
        .attr("y1", 0)
        .attr("y2", 0);
    legendAreaMain
        .append("circle")
        // .attr("class", "line")
        .attr("cx", 29)
        .attr("cy", 0)
        .attr("r", 3);
    legendAreaMain
        .append("text")
        .attr("class", "label")
        .attr("dx", 35)
        .text(d.name);

    function addsubline(f, i) {
        plot01.select(".ref").style("opacity", 0);
        plot01.select(".legend").select(".ref").select(".label").text(f.key);
        var id = "sub-line-" + i;
        var sub =  d3.entries(d.detail);
        sub.forEach(function(s) {
            s.date = parseTime(s.key);
            s.value = (s.value[f.key]==null)?null:+s.value[f.key];
        });

        if(diffToggle.checked) {
            year0 = (sub.filter(function(s) { return s.key == startYear; })[0].value);
            sub.forEach(function(s) {
                s.value = (s.value==null || year0==0)?null:s.value/year0 - 1;
            });
        }
        // Add country line and cirlces
        var linePlot = plot01.append("g")
            .attr("width", plotWidth)
            .attr("height", plotHeight)
            .attr("transform", "translate(" + (plotMargin.left + plotPadding.left) + "," + (plotMargin.top + plotPadding.top) + ")")
            .attr("class", "mini-plot sub-line")
            .attr("id", id);
        linePlot
            .append("path")
            .data([sub.filter(function(s) { return s.value!=null; })])
            .attr("class", "line")
            .attr("d", line);
        linePlot
            .selectAll("circle")
            .data(sub.filter(function(s) { return s.value!=null; }))
            .enter().append("circle")
            .attr("class", "circle")
            .attr("cx", function(s) { return x(s.date); })
            .attr("cy", function(s) { return y(s.value); })
            .style("fill", function(d) { return color(d.value); })
            .append("title")
            .text(function(s) { return "Year: " + s.key + "\nGPI: " + (diffToggle.checked?d3.format("+.2%")(s.value):d3.format(".2f")(s.value)); });
        linePlot.lower();

        lines.style("opacity", function(l) { return (l.key == f.key)?1:0.3; });
        circles.style("opacity", function(c) { return (c.key == f.key)?1:0.3; });
        arrows.style("opacity", function(a) { return (a.key == f.key)?1:0.3; });
    }

    function removesubline(f, i) {
        d3.select("#"+"sub-line-" + i).remove();
        plot01.selectAll(".ref").style("opacity", 1);
        plot01.select(".legend").select(".ref").select(".label").text("Global Average");
        lines.style("opacity", 1);
        circles.style("opacity", 1);
        arrows.style("opacity", 1);
    }
}
