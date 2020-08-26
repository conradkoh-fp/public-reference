# API Error Guidelines
Guidelines here have been adapted from [Microsoft API Guidelines](https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md)


## Proposal
1. Code for ServerError must be defined and conform to a pre-determined list of server error codes
    1. ALL error codes here MUST be handled by the client
    1. Modification to this considered a breaking change (as clients might not have been modified to handle them)
1. Use details to represent 1 - * relation (such as form errors caused by a bad field)
2. Use innerError to represent a 1 - 1 relation with nesting for more details
3. To display more customised error messages where they have occurred, traverse the following and pick the deepest message available
    1. innerError to get more detailed error message to be displayed to a user on a page level
    2. details -> innererror to get per field error messages first, and then traverse inner error of details to get custom errors
4. Localization keys will be derived from either error code or inner error code where inner error code should take precedence. This will be done by the front-end.

### To Do
1. Confirm finalised set of universal error codes - Jeffrey
2. Come up with deals API specific inner error codes - Jeffrey
3. Figure out what exactly is the convention for mapping the error codes to localised keys - Conrad