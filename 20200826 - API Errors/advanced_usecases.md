### Example: Invalid deal type provided
Scenario:

1. Incorrect server was provided
1. Show list of available deal type options

## Representation 1
Payload:
``` json
{
    "error": "bad_argument",
    "message": "Bad Argument",
    "target": "dealType",
    "innererror": {
        "code": "invalid_value",
        "message": "Invalid value",
        "target": "dealType",
        "data": {
            "dealTypesEnum": ["fixed", "percentage"]
        }
    }
}

```
Interface: 
``` typescript
export interface ServerError {
	code: ErrorCode //language indepdendent code, human readable, addition to this considered a breaking change
	message: string
	target?: string //the "target" of the error (?) - seems to specify WHERE the error has occurred (such as a property)
	details?: ServerError[]
	innererror?: InnerError
}

export interface InnerError {
    code?: string,
    message?: string, 
    target?: string,
    innererror?: InnerError
}
```


## Representation 2
Payload:
``` json
{
    "error": "bad_argument",
    "message": "Bad Argument",
    "target": "dealType",
    "innererror": {
        "code": "invalid_value",
        "message": "Invalid value",
        "target": "dealType",
        "dealTypesEnum": ["fixed", "percentage"]
    }
}
```

Interface: 
``` typescript
export interface ServerError {
	code: ErrorCode //language indepdendent code, human readable, addition to this considered a breaking change
	message: string
	target?: string //the "target" of the error (?) - seems to specify WHERE the error has occurred (such as a property)
	details?: ServerError[]
	innererror?: any
}
```

# Analysis
We favor Representation 1 over Representation 2 of the data structure, as `InnerError` is not technically of type `any` (or `map[string]interface{}` in go).

If we use the type `any` we lose compile time validation of the `innererror` property.

For example, using Representation 2, the following error is valid according to the type definitions, but invalid when we actually evaluate the structure.
```json
{
    "error": "bad_argument",
    "message": "Bad Argument",
    "target": "dealType",
    "innererror": "An error has occured" //Bsaed on our structure, innererror is supposed to be a string if the property exists
}
```

## Causes
This problem is caused when we allow arbitrary keys to be inserted into the `innererror` property. This forces us to convert `innererror` into type `any`.

## Proposed solution
We can encapsulate unstructured data in a data property of `innererror`. The new interface will be declared as such
```typescript
export interface InnerError {
    code?: string,
    message?: string, 
    target?: string,
    innererror?: InnerError,
    data?: any
}
```
Any other possibly unstrucured data can be provided via the data property instead. However, as this is unstructured, it should be used sparingly. The compiler cannot gurantee that the interface of this object will be of a stable interface. Thus, to ensure that consumers have a stable interface to consume, properties entered here MUST be governed by the testing of the contracts.