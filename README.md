# D3js Pie Chart for ExtJs 4

![Example pic](https://github.com/antonfisher/extjs-d3pie-chart/raw/master/docs/d3pie-example-1.png)

Demo: [http://antonfisher.com/extjs4-sandbox/](http://antonfisher.com/extjs4-sandbox/)

## How to use

1. Copy sass file `/sass/src/ux/chart/series/D3Pie.scss` to your project;

2. Copy js file `/app/ux/chart/series/D3Pie.js` to your project;

3. Change class name `'Sandbox.ux.chart.series.D3Pie'`;

4. Add requires:
  ```javascript
    requires: [
      ...
      'Sandbox.ux.chart.series.D3Pie'
    ]
  ```

5. Update chart config:

  ```javascript
  {
    xtype: 'chart'
    ...
    cls: 'ux-d3-pie',             // add css class for d3pie
    series: [
      {
        type: 'd3pie',            // change serie type
        angleField: 'value',
        radius: 90,
        donut: 60,
        label: {
          field: 'name',
          legendField: 'legend'
        }
      }
    ]
  }
  ```

6. Try to change some options.

## Options
|Option|Description|
|---|---|
| `radius: undefined` | {_Number_} pie radius ('_undefined_' for auto) |
| `donut: undefined` | {_Number_} donut radius ('_undefined_' for auto) |
| `centerX: undefined` | {_Number_} pie center _X_ coordinate ('_undefined_' for auto) |
| `centerY: undefined` | {_Number_} pie center _Y_ coordinate ('_undefined_' for auto) |
| `startAngle: 0` | {_Number_} the overall start angle of the pie |
| `endAngle: 2π` | {_Number_} the overall end angle of the pie |
| `labelTextOffset: 15` | {_Number_} labels offset |
| `angleField: 'value'` | {_String_} store property name for pie value |
| `label: {...}` | {_Object_} label properties |
| `showCenterTexts: false` | {_Boolean_} show center texts |
| `showLabels: false` | {_Boolean_} show labels |
| `showItemDescription: true` | {_Boolean_} show text description under value |
| `totalTitle: 'TOTAL'` | {_String_} total title |
| `noDataText: 'NO DATA'` | {_String_} no data text |
| `highlightStyle: 'opacity: 0.1'` | {_String_} highlight style for pie item's path |
| `unHighlightStyle: 'opacity: 1'` | {_String_} unhighlight style for pie item's path |
| `filterAngle: 0.25` | {_Number_} hide label when angle is less than this value |
| `border: 0` | {_Number_} pie border |
| `pathStrokeWidth: 1` | {_Number_} pie paths stroke width |
| `pathStrokeColor: '#ffffff'` | {_String_} pie paths stroke color |
| `borderColor: '#eeeeee'` | {_String_} pie border color (if _border_ property > 0) |
| `backgroundColor: '#ffffff'` | {_String_} pie background color |
| `emptyBackgroundColor: '#eeeeee'` | {_String_} empty pie background color |

__Note:__ Additionally `label` object may contain `legendField` field to show it in legend:
```javascript
label: {
  field: 'name',
  legendField: 'legend'
}
```

__Renderers:__
* `totalValueRenderer: function (totalValue, store) {...}` {_Function_} renderer for pie total value
* `itemValueRenderer: function (dataItem, totalValue, store) {...}` {_Function_} renderer for item value
* `itemDescriptionRenderer: function (dataItem, totalValue, store) {...}` {_Function_} renderer for pie item description

## Libraries:
* [ExtJs 4](http://www.sencha.com/products/extjs/)
* [d3js](http://d3js.org/)

## Thanks:
* [Stephen Boak (@sboak)](https://github.com/sboak) - [http://blog.stephenboak.com/2011/08/07/easy-as-a-pie.html](http://blog.stephenboak.com/2011/08/07/easy-as-a-pie.html)

## License
Copyright (c) 2014 Anton Fischer

MIT License. Free use and change.
