/**
 * Difference chart d3js serie for ExtJs 4
 *
 * http://jsfiddle.net/hrabinowitz/aZZSF/49/
 */

    'use strict';

    return {
        extend: 'Ext.chart.series.Series',

        type: 'd3difference',

        alias: 'series.d3difference',

        /**
         * @cfg {String} label properties
         */
        xField: 'date',

        /**
         * @cfg {String} label properties
         */
        yField1: 'New York',

        /**
         * @cfg {String} label properties
         */
        yField2: 'San Francisco',

        constructor: function constructor(config) {
            var self = this;

            if (!d3) {
                throw ('D3 library does not defined');
            }
            self.callParentMethod(constructor, arguments);

            self.chart.getChartStore().on('datachange', self.updateChart, self);
        },

        /**
         * Draw series for the current chart
         */
        drawSeries: function () {
            var self = this;

            var width = 500, // chart.width,
               height = 330; // chart.height;
            var svg = d3.select('#' + self.chart.getId() + ' svg')
                .attr('width', width)
                .attr('height', height)
                .append("g");

            self.chartEl = svg;
            self.updateChart();
        },

        /**
         * Update created pie chart
         */
        updateChart: function () {
            var self = this,
                store = self.chart.getChartStore();

            var fillFromStore = function(i) {
                var item = store.getAt(i);
                return {
                    x: item.get(self.xField),
                    y1: item.get(self.yField1),
                    y2: item.get(self.yField2)
                };
            };//
            var storeData = d3.range(store.getCount()).map(fillFromStore);

            var width = 500, // chart.width,
                height = 330; // chart.height;
            var xScale = d3.time.scale().range([0, width]);

            var yScale = d3.scale.linear().range([height, 0]);
            // draw a line for New York data
            var lineNY = d3.svg.area()
                //.interpolate("basis")
                .interpolate("linear")
                .x(function (d) { return xScale(d.x); })
                .y(function (d) { return yScale(d.y2); });

            // console.log('self.xField--------------:', self.xField);
            // draw a blue line for SF data.  This is not done in Bostock's version.
            // while his version looks cuter, it unfairly discriminates against the SF
            // data by giving it no line.
            var lineSF = d3.svg.area()
                //.interpolate("basis")
                .interpolate("linear")
                .x(function (d) { return xScale(d.x); })
                .y(function (d) { return yScale(d.y1); });

            var area = d3.svg.area()
               //.interpolate("basis")
               .interpolate("linear")
               .x(function (d) { return xScale(d.x); })
               .y(function (d) { return yScale(d.y2); });

            xScale.domain(d3.extent(storeData, function (d) { return d.x; }));

            yScale.domain([
              d3.min(storeData, function (d) { return Math.min(d.y2, d.y1); }),
              d3.max(storeData, function (d) { return Math.max(d.y2, d.y1); })
            ]);

            self.chartEl.datum(storeData);

            // i think this is defining a clipPath named 'clip-below' as the
            // horizontal line at the bottom of the graph
            self.chartEl.append("clipPath")
                .attr("id", "clip-below")
                .append("path")
                .attr("d", area.y0(height));

            // i think this is defining a clipPath named 'clip-above' as the
            // horizontal line at the top of the graph
            self.chartEl.append("clipPath")
                .attr("id", "clip-above")
                .append("path")
                .attr("d", area.y0(0));

            // i think this is the area below SF values and above NY values.
            // This is the light blue area.  i.e. "winter"
            self.chartEl.append("path")
                .attr("class", "area above")
                .attr("clip-path", "url(#clip-above)")
                .attr("d", area.y0(function (d) { return yScale(d.y1); }));

            // I think this is the area below NY values and above SF values.
            // This is the light brown area.  i.e. "summer"
            self.chartEl.append("path")
                .attr("class", "area below")
                .attr("clip-path", "url(#clip-below)")
                .attr("d", area);

            // brown line for NY data
            self.chartEl.append("path")
                .attr("class", "lineNY")
                .attr("d", lineNY);

            // blue line for SF data
            self.chartEl.append("path")
                .attr("class", "lineSF")
                .attr("d", lineSF);

            self.fireEvent('chartUpdated', self);
        },

        /**
        * Remove chart
        */
        d3RemoveCircles: function () {
            var self = this;

        }
    };
}()));
