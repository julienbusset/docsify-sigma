# Graph in 400px x 300px , colors coded on 3 digits
## Code
```html
<div class="docsify-sigma" container-width="400px" container-height="300px" min-node-size=10 max-node-size=20 edges-size=20 edges-color="#f00"></div>
```
## Rendered
<div class="docsify-sigma" container-width="400px" container-height="300px" min-node-size=10 max-node-size=20 edges-size=20 edges-color="#f00"></div>

## Validation
<button id="test-button" type="button" class="primary">Run Tests</button>
| Test | Expect | Rendered | Validate |
|------|--------|----------|:--------:|
| Rendering | <img id="expected-image1" class="test-image" src="images/graph_400_300.png" width="100%" height="auto"/> | what's above | with your eyes |
| Width | <span id="expected-width"></span><br> | <span id="tested-width"></span><br> | <span id="compared-width"></span> |
| Height | <span id="expected-height"></span> | <span id="tested-height"></span> | <span id="compared-height"></span> |

<script>
    function runTests() {
        console.log("Running tests…");
        let docsigma = document.getElementsByClassName("docsify-sigma")[0];
        let expimage = document.getElementById("expected-image1");
        
        document.getElementById("tested-width").innerHTML = docsigma.offsetWidth;
        document.getElementById("expected-width").innerHTML = "400";
        validate(docsigma.offsetWidth, 400, "compared-width");

        document.getElementById("tested-height").innerHTML = docsigma.offsetHeight;
        document.getElementById("expected-height").innerHTML = "300";
        validate(docsigma.offsetHeight, 300, "compared-height");
        console.log("Tests completed! Check the results.");
    }
    
    function validate(firstValue, secondValue, resultFieldId) {
        document.getElementById(resultFieldId).innerHTML = Math.abs(firstValue - secondValue) <= 1 ? "✅" : "❌";
    }
    
    document.getElementById("test-button").addEventListener("click", runTests);
</script>

