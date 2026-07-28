# docsify-sigma
Visualize a graph in your docsify project using [Sigma.js](https://www.sigmajs.org/) and [Graphology](https://graphology.github.io/).

## Current versions of dependencies
- Sigma.js: 3.0.3
- Graphology: 0.26.0

## Graphs supported
In this version of the plugin, only the graphs in this JSON format are parsed:
{
  "nodes": [
    { "key": "page11", "label": "Le titre", "cluster": "0", "x": 643.8, "y": -770.3, "size": 28 }
    ...
  ],
  "edges": [
    ["page11", "page12"],
    ...
  ],
  "clusters": [
    { "key": "0", "color": "#6c3e81", "clusterLabel": "Le phénomène" }
    ...
  ]
}

## How to use
Put this line in your md file:
<div class="docsify-sigma" graph-data-url="path/to/graph.json"></div>
