# Graph with all default options
## Code
```html
<div class="docsify-sigma"></div>
```
## Rendered
<div class="docsify-sigma"></div>

## Validation
<button id="test-button" type="button" class="primary">Run Tests</button>
| Test | Expect | Rendered | Validate |
|------|--------|----------|:--------:|
| Rendering | <img id="expected-image1" class="test-image" src="images/graph_squared.png" width="100%" height="auto"/> | what's above | with your eyes |
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
        document.getElementById("expected-height").innerHTML = 0.5 * window.innerHeight;
        validate(docsigma.offsetHeight, 0.5 * window.innerHeight, "compared-height");
        console.log("Tests completed! Check the results.");
    }
    
    function validate(firstValue, secondValue, resultFieldId) {
        document.getElementById(resultFieldId).innerHTML = Math.abs(firstValue - secondValue) <= 1 ? "✅" : "❌";
    }
    
    document.getElementById("test-button").addEventListener("click", runTests);
</script>

