{
  function docsifySigma(hook, vm) {
    const scriptSigmaImport = document.createElement("script");
    scriptSigmaImport.src = "https://cdnjs.cloudflare.com/ajax/libs/sigma.js/3.0.3/sigma.min.js";
    scriptSigmaImport.id = "sigma-import-script";
    const scriptGraphologyImport = document.createElement("script");
    scriptGraphologyImport.src = "https://cdn.jsdelivr.net/npm/graphology@0.26.0/dist/graphology.umd.min.js";
    scriptGraphologyImport.id = "graphology-import-script"
    
    // Invoked one time when docsify script is initialized
    hook.init(() => {
      // ...
    });

    // Invoked one time when the docsify instance has mounted on the DOM
    hook.mounted(() => {
      // ...
    });

    // Invoked on each page load before new markdown is transformed to HTML.
    // Supports asynchronous tasks (see beforeEach documentation for details).
    hook.beforeEach(markdown => {
      // ...
      return markdown;
    });

    // Invoked on each page load after new markdown has been transformed to HTML.
    // Supports asynchronous tasks (see afterEach documentation for details).
    hook.afterEach((html, next) => {
      const graphsCount = (html.match(/class="docsify-sigma"/g) || []).length;

      if (graphsCount > 0) {
        const loadSigmaPromise = new Promise (resolve => {
          document.head.appendChild(scriptSigmaImport).addEventListener('load', resolve, { once: true });
        });
        const loadGraphologyPromise = new Promise (resolve => {
          document.head.appendChild(scriptGraphologyImport).addEventListener('load', resolve, { once: true });
        });
        const loadGraphPromise = fetch('graphe.json').then(response => response.json());
        
        try {
          fetchData(loadSigmaPromise, loadGraphologyPromise, loadGraphPromise);
          console.log("devrait attendre");
        } catch (e) {
          console.error("erreur : ", e);
        } finally {
          next(html);
        }
      } else {
        return html;
      }
        
      async function fetchData(loadSigmaPromise, loadGraphologyPromise, loadGraphPromise) {
        const [loadSigma, loadGraphology, loadGraph] = await Promise.all([
          loadSigmaPromise,
          loadGraphologyPromise,
          loadGraphPromise,
        ]).then(([resSigma, resGraphology, resFetchGraph]) => {
          html.replace("sigma", "toto");
          html = html.replace(/<div[^class]+class="docsify-sigma"[^>]+>/g, "$&" + JSON.stringify(resFetchGraph));
          next(html);
        })
      };
/*
      async function displayGraph(dataset) {
        console.log("dataset");
        console.log(dataset);

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
        console.log("ici");
        console.log(graph);

      
        console.log("là");
        
        // Afficher le graphe avec Sigma.js
        console.log("html : " + html);
        const newDiv = document.createElement("div");
        newDiv.innerHTML = html;
        newDiv.style.width = "100%";
        document.body.appendChild(newDiv);
        console.log(document);
//        const sigmaContainer = document.getElementsByClassName("docsify-sigma")[0];
        const sigmaContainer = newDiv;
        console.log(sigmaContainer);
        const sigmaInstance = new Sigma(graph, sigmaContainer);
        
        next(html);
      };*/
    });

    // Invoked on each page load after new HTML has been appended to the DOM
    hook.doneEach(() => {
      const sigmaContainers = document.getElementsByClassName("docsify-sigma");
      const sigmaContainer = sigmaContainers[0];
      sigmaContainer.style.visibility = "hidden";
      console.log("maintenant");

      console.log(JSON.parse(sigmaContainer.innerHTML));
      const dataset = JSON.parse(sigmaContainer.innerHTML);
      sigmaContainer.innerHTML = "";
      sigmaContainer.style.visibility = "";
      sigmaContainer.style.width = "800px";
      sigmaContainer.style.height = "800px";

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
      console.log("ici");
      console.log(graph);
       
      // Afficher le graphe avec Sigma.js
      const sigmaInstance = new Sigma(graph, sigmaContainer);
    });

    // Invoked one time after rendering the initial page
    hook.ready(() => {
      // ...
    });
  }

  // Add plugin to docsify's plugin array
  window.$docsify = window.$docsify || {};
  $docsify.plugins = [docsifySigma, ($docsify.plugins || [])];
}
