# 4 graphs, various options
## Code
```html
<div class="docsify-sigma" container-width="80%" container-height="70vh" min-node-size=5 max-node-size=30 edges-size=10 edges-color="#35E02F"></div>
<div class="docsify-sigma"></div>
<div class="docsify-sigma" graph-data-url="graphs/dataset.json" container-width="100%" container-height="70vh"></div>
<div class="docsify-sigma" container-width="400px" container-height="300px" min-node-size=10 max-node-size=20 edges-size=20 edges-color="#f00"></div>
```
## Rendered
<div class="docsify-sigma" container-width="80%" container-height="70vh" min-node-size=5 max-node-size=30 edges-size=10 edges-color="#35E02F"></div>
<div class="docsify-sigma"></div>
<div class="docsify-sigma" graph-data-url="graphs/dataset.json" container-width="100%" container-height="70vh"></div>
<div class="docsify-sigma" container-width="400px" container-height="300px" min-node-size=10 max-node-size=20 edges-size=20 edges-color="#f00"></div>

## Validation
<button id="test-button" type="button" class="primary" disabled>Run Tests</button>

The 4 graphs are identical to those in the other pages.

| Test | Expect | Rendered | Validate |
|------|--------|----------|:--------:|
| All graphs rendered | 4 graphs that look the same as they appear in the other pages | what's above | with your eyes |

<!--
<script>
    function runTests() {
        console.log("Running tests…");
        let docsigma = document.getElementsByClassName("docsify-sigma")[0];
        let expimage = document.getElementById("expected-image1");
        
        document.getElementById("tested-width").innerHTML = docsigma.offsetWidth;
        document.getElementById("expected-width").innerHTML = 0.8 * docsigma.parentElement.clientWidth;
        validate(docsigma.offsetWidth, 0.8 * docsigma.parentElement.clientWidth, "compared-width");

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
-->
