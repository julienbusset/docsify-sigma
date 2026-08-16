{
  const docsidom = window.Docsify.dom;
  
  function docsifySigma(hook, vm) {
    const scriptSigmaImport = docsidom.create("script");
    scriptSigmaImport.src = "https://cdnjs.cloudflare.com/ajax/libs/sigma.js/3.0.3/sigma.min.js";
//    scriptSigmaImport.src = "https://cdnjs.cloudflare.com/ajax/libs/sigma.js/4.0.0-beta.2/sigma.min.js";
    scriptSigmaImport.id = "sigma-import-script";

    const scriptGraphologyImport = docsidom.create("script");
    scriptGraphologyImport.src = "https://cdn.jsdelivr.net/npm/graphology@0.26.0/dist/graphology.umd.min.js";
    scriptGraphologyImport.id = "graphology-import-script"

    
    // Invoked on each page load before new markdown is transformed to HTML.
    // Supports asynchronous tasks (see beforeEach documentation for details).
    hook.beforeEach(markdown => {
      const sigmaContainers = docsidom.findAll(".docsify-sigma");
      if (sigmaContainers[0] !== undefined) {
          sigmaContainers[0].remove();
      }
      return markdown;
    });

    // Invoked on each page load after new markdown has been transformed to HTML.
    // Supports asynchronous tasks (see afterEach documentation for details).
    hook.afterEach((html, next) => {
      const graphsCount = (html.match(/class="docsify-sigma"/g) || []).length;

      if (graphsCount > 0) {
        let loadSigmaPromise = new Promise (resolve => {
          docsidom.on(docsidom.appendTo(docsidom.head, scriptSigmaImport), 'load', resolve);
        });
        
        let loadGraphologyPromise = new Promise (resolve => {
          docsidom.on(docsidom.appendTo(docsidom.head, scriptGraphologyImport), 'load', resolve);
        });
        // Si les deux ont déjà été chargés, il faut résoudre manuellement les promesses
        if (typeof window.Sigma !== 'undefined') {
            loadSigmaPromise = Promise.resolve();
        }
        if (typeof window.graphology !== 'undefined') {
            loadGraphologyPromise = Promise.resolve();
        }

        const loadGraphPromise = window.Docsify.get('graphe.json');
 
        Promise.all([
          loadSigmaPromise,
          loadGraphologyPromise,
          loadGraphPromise,
        ]).then(([resSigma, resGraphology, resFetchGraph]) => {
          html = html.replace(/<div[^class]+class="docsify-sigma"[^>]+>/g, "$&" + resFetchGraph);
          next(html);
        });
      } else {
        next(html);
      }
    });

    // Invoked on each page load after new HTML has been appended to the DOM
    hook.doneEach(() => {
      const sigmaContainers = docsidom.findAll(".docsify-sigma");
      if (sigmaContainers[0] !== undefined) {
          const sigmaContainer = sigmaContainers[0];
          sigmaContainer.style.visibility = "hidden";

          const string = sigmaContainer.innerHTML;
          const dataset = JSON.parse(sigmaContainer.textContent);
          docsidom.setHTML(sigmaContainer, "");
          sigmaContainer.style.visibility = "";
          sigmaContainer.style.width = "100%";
          sigmaContainer.style.height = "50vh";

          const clustersByKey = Object.fromEntries(dataset.clusters.map((c) => [c.key, c]));

          const graph = new graphology.Graph();

          for (const node of dataset.nodes) {
            const cluster = clustersByKey[node.cluster];
            graph.addNode(node.key, {
              label: node.label,
              x: node.x,
              y: node.y,
              color: cluster?.color ?? "#999",
              size: node.size,
            });
          }

          for (const [source, target] of dataset.edges) {
            if (graph.hasNode(source) && graph.hasNode(target) && !graph.hasEdge(source, target)) {
              graph.addEdge(source, target);
            }
          }

          // Afficher le graphe avec Sigma.js
          const sigmaInstance = new Sigma(graph, sigmaContainer, {
            autoRescale: true,
            labelColor: { attribute: "color" },
          });
      }
    });
  }

  // Add plugin to docsify's plugin array
  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [].concat(docsifySigma, $docsify.plugins);
}
