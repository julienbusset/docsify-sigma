# docsify-sigma
Visualize a graph in your docsify project using [Sigma.js](https://www.sigmajs.org/) and [Graphology](https://graphology.github.io/).

## Current versions of dependencies
- Sigma.js: 4.0.0-beta.5
- Graphology: 0.26.0

Note: Sigma.js v4 is chosen rather than v3.0.3 because it's far better documented.

## Graphs supported
In this version of the plugin, only the graphs with this JSON structure are parsed:
```json
{
  "nodes": [
    { "key": "page11", "label": "Le titre", "cluster": "0", "x": 643.8, "y": -770.3, "score": 28 }
    ...
  ],
  "edges": [
    ["page11", "page12"],
    ...
  ],
  "clusters": [
    { "key": "0", "color": "#6c3e81", "clusterLabel": "my favorite cluster" }
    ...
  ]
}
```

## How to use

### Quick start
Put this line in your md file:
```html
<div class="docsify-sigma" graph-data-url="path/to/graph.json"></div>
```
where `path/to/graph.json` is the path to your graph file.

If no `graph-data-url` attribute is specified, then it's default value is `graph.json`. It means that if you don't tell where the file is, then it will assumes that it's in the same directory and named `graph.json`.

You can put several graphs: just put one line for each graph.

### Customization
You can add attributes to customize the graph. If omitted or incorrect, the default value is used.

Don't forget the quotes for values with letters or symbols. For numeric only values, don't use quotes.

To use the attribute `attribute-name` with the value `"value"`, do this:
```html
<div class="docsify-sigma" graph-data-url="path/to/graph.json" attribute-name="value"></div>
```

**List of attributes**
| Attribute name | What for | Format | Default value | Exemples | Related doc |
|----------------|----------|--------|---------------|----------|------------|
| container-width | Adjust the width of the graph container | `"n%"` with n between 0 and 100<br> or `"npx"` with n an integer | `"100%"` | `container-width="75%"`<br>`container-width="500px"` | n/a |
| container-height | Adjust the height of the graph container | `"nvh"` with n between 0 and 100 (vh stands for "percentage of viewport height")<br> or `"npx"` with n an integer | `"50vh"` | `container-width="70vh"`<br>`container-width="300px"` | n/a |
| min-node-size | Minimum size of a node, for automatic node size adjustment | integer | `10` | `min-node-size=20` | n/a |
| max-node-size | Maximum size of a node, for automatic node size adjustment | integer | `50` | `max-node-size=150` | n/a |
| edges-size | Thickness of edges | integer | `1` | `edges-size=50` | n/a |
| edges-color | Color of edges | `"#xxx"` or `"#xxxxxx"` with xxx or xxxxxx the HTML color code on 3 or 6 hexadecimal digits | `"#ccc"` | `edges-color="#111"`<br>`edges-color="#F08080"` | n/a |

**Exemple**
```html
<div class="docsify-sigma" graph-data-url="path/to/graph.json" edges-size=10 container-height="70vh"></div>
```

