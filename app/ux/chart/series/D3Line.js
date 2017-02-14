Ext.define('Sandbox.ux.chart.series.D3Line', (function () {
    'use strict';

    return {
        extend: 'Ext.chart.series.Series',

        type: 'd3line',

        alias: 'series.d3line',

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

            var fillFromStore = function (i) {
                var item = store.getAt(i);
                return {
                    x: item.get(self.xField),
                    y: (item.get(self.yField))
                };
            };
            var storeData = d3.range(store.getCount()).map(fillFromStore);

            var line = d3.svg.line()
                .x(function (d) { return (d.x); })
                .y(function (d) { return (d.y); });
            self.chartEl.append("path")
                .datum(storeData)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attr("class", "line-12903")
                .attr("d", line);
        }
    };
}()));
