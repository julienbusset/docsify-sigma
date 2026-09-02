# Purpose
This is a regression test kit to verify that the pushed modifications keep the plugin working. The results should be pushed as a pull request comment.

This kit must be adapted to the modifications done on the plugin within the pushed modifications.

For more general information about the plugin, check [README.md](https://github.com/julienbusset/docsify-sigma) at the root of the repo.

# Instructions to execute the tests
There are 5 test categories, each on a separate page. The links to the 5 pages are in the sidebar.
In each pages, there are 3 sections:
| Section | Code | Rendered | Validation |
|--------:|------|----------|------------|
|**Content**| Shows the code of what is tested. | Shows what is tested | Shows what is measured (by itself or by yourself) and compares it to what is expected. |

The 'Validation' section contains a "Run Tests" button: click it to run the automated measures, then check everything is validated. The precision is accurate to within 1 pixel.

Wether everything is validated or not, you can add a report to your pull request. For each test page, once the tests have runned, copy the content of the 'Validation' section and paste it in the report with the test title. For exemple, something like this is great:
```markdown
## Test default
| Test | Expect | Rendered | Validate |
|------|--------|----------|----------|
| Rendering | *image* | what's above | with your eyes: OK |
| Width | 538 | 538 | ✅ |
| Height | 187 | 187 | ✅ |
…
```
That renders like this:
## Test default
| Test | Expect | Rendered | Validate |
|------|--------|----------|----------|
| Rendering | *image* | what's above | with your eyes: OK |
| Width | 538 | 538 | ✅ |
| Height | 187 | 187 | ✅ |
…
