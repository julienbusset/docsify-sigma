{
  const docsidom = window.Docsify.dom;
  
  function docsifySigma(hook, vm) {
    const scriptSigmaImport = docsidom.create("script");
    scriptSigmaImport.src = "https://cdnjs.cloudflare.com/ajax/libs/sigma.js/4.0.0-beta.5/sigma.min.js";
    scriptSigmaImport.id = "sigma-import-script";

    const scriptGraphologyImport = docsidom.create("script");
    scriptGraphologyImport.src = "https://cdn.jsdelivr.net/npm/graphology@0.26.0/dist/graphology.umd.min.js";
    scriptGraphologyImport.id = "graphology-import-script"

    
    // Invoked on each page load before new markdown is transformed to HTML.
    // Supports asynchronous tasks (see beforeEach documentation for details).
    hook.beforeEach(markdown => {
      const sigmaContainers = docsidom.findAll(".docsify-sigma");
      let i = 0;
      while (sigmaContainers[i] !== undefined) {
          sigmaContainers[i].remove();
          i++;
      }
      return markdown;
    });

    // Invoked on each page load after new markdown has been transformed to HTML.
    // Supports asynchronous tasks (see afterEach documentation for details).
    hook.afterEach((html, next) => {
      const graphs = html.match(/<div[^class]*class=["'][^"']*docsify-sigma[^"']*["'][^>]*>/g);

      if ((graphs || []).length > 0) {
        // Création de la liste des promises
        const promisesList = [];
      
        // Ajout et chargement des scripts pour Sigma et graphology   
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

        promisesList.push(loadSigmaPromise);
        promisesList.push(loadGraphologyPromise);

        // Récupération des graphes
        let i = 0;
        while (graphs[i] !== undefined) {
            let pathToGraph = graphs[i].match(/graph-data-url=["'][^"']*["']/g)[0].split(/["']/)[1];
            pathToGraph = (pathToGraph == (null || "")) ? 'graph.json' : pathToGraph;
            promisesList.push(window.Docsify.get(pathToGraph));
            i++;
        }
       
        Promise.all(promisesList).then((resList) => {
          for (let j = 1; j < resList.length; j++) {
              html = html.replace(/<div[^class]*class=["'][^"']*docsify-sigma[^"']*["'][^>]*>/g, function (match) {
                j++;
                return match + resList[j];
              });
          }
          next(html);
        });
      } else {
        next(html);
      }
    });

    // Invoked on each page load after new HTML has been appended to the DOM
    hook.doneEach(() => {
      const sigmaContainers = docsidom.findAll(".docsify-sigma");
      let i = 0;
      while (sigmaContainers[i] !== undefined) {
          console.log(sigmaContainers[i].innerHTML);
          const sigmaContainer = sigmaContainers[i];
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
              size: 3 * node.size,
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
            styles: {
              nodes: [
                Sigma.DEFAULT_STYLES.nodes,
                { 
                  labelColor: { attribute : "color" }
                },
              ],
            }
          });
          i++;
      }
    });
  }

  // Add plugin to docsify's plugin array
  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [].concat(docsifySigma, $docsify.plugins);
}
