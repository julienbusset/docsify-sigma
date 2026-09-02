# Big graph
## Code
```html
<div class="docsify-sigma" graph-data-url="graphs/dataset.json" container-width="100%" container-height="70vh"></div>
```
## Rendered
[A cartography of Wikipedia pages around data visualization](https://github.com/jacomyal/sigma.js/blob/main/packages/demo/public/dataset.json)

*2085 nodes, 5409 edges*

<div class="docsify-sigma" graph-data-url="graphs/dataset.json" container-width="100%" container-height="70vh"></div>

## Validation
<button id="test-button" type="button" class="primary">Run Tests</button>
| Test | Expect | Rendered | Validate |
|------|--------|----------|:--------:|
| Rendering | <img id="expected-image1" class="test-image" src="images/big_graph.png" width="100%" height="auto"/> | what's above | with your eyes |
| Width | <span id="expected-width"></span><br> | <span id="tested-width"></span><br> | <span id="compared-width"></span> |
| Height | <span id="expected-height"></span> | <span id="tested-height"></span> | <span id="compared-height"></span> |

<script>
    function runTests() {
        console.log("Running tests…");
        let docsigma = document.getElementsByClassName("docsify-sigma")[0];
        let expimage = document.getElementById("expected-image1");
        
        document.getElementById("tested-width").innerHTML = docsigma.offsetWidth;
        document.getElementById("expected-width").innerHTML = docsigma.parentElement.clientWidth;
        validate(docsigma.offsetWidth, docsigma.parentElement.clientWidth, "compared-width");

        document.getElementById("tested-height").innerHTML = docsigma.offsetHeight;
        document.getElementById("expected-height").innerHTML = 0.7 * window.innerHeight;
        validate(docsigma.offsetHeight, 0.7 * window.innerHeight, "compared-height");
        console.log("Tests completed! Check the results.");
    }
    
    function validate(firstValue, secondValue, resultFieldId) {
        document.getElementById(resultFieldId).innerHTML = Math.abs(firstValue - secondValue) <= 1 ? "✅" : "❌";
    }
    
    document.getElementById("test-button").addEventListener("click", runTests);
</script>

