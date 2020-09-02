# Contextual Field Names
Example:

```
Field: Password
Expected Error Message: "Password is required"
Lokalise Template Key: "field_required" | Value:  "{field} is required"
Loklaise Password Field: Key: "password_field_name" | Value: "Password"
Rendering Code: translate("field_required", { field: translate("password_field_name") })
```

Convention
``` typescript
type getError = (errorCode: string, targetPath: string, context: string ) => string
```
```
//Error code pattern
<error>__<code>__<targetpath>__<context>

//Example
    -> Function call: getError("NullValue", "dateRange.startDate", "dealform")
    -> Constructed key: error__NullValue__dateRange.startDate__dealform
```
Example API POST Request
```
{       
    "vendors": [
        "v8lm"
    ],
    "globalEntityId": "FP_SG",
    "dealType": "percentage",
    "discountValue": 2,
    "conditionType": "multiple_vendors",
    "mov": 5,
    "dateRange": {
        "startDate": "2022-08-01",
        "endDate": "2022-12-31",
    },
    "startHour": "00:00",
    "endHour": "23:59"    
}
```
Example API Error Response
```
{
    "code": "BadArgument",
    "target": "dateRange",
    "details": [
        {
            "code": "NullValue",
            "target": "startDate"
        }
    ]
}
```
Example Lokalise key configuration
```
error__NullValue__dateRange.startDate__dealform="Deal start date cannot be empty"
```
Example Frontend Code
```typescript
let errMsg = getError('NullValue', 'dateRange.startDate', "dealform");
```

## Future extensions
### Fallback mechanism

When unable to the literal key `error__<errorCode>__<targetPath>__<context>`, fallback to more generic error messages in the sequence

1. error__\<errorCode\>__\<targetPath\>
2. error__\<errorCode\>

### Blanket Target Path Matching

The goal of this is to apply the same string to multiple target paths. For example the key `error_<errorCode>__$any__<context>` should match all `targetPath` values. For example

```
Lokalise key / value: "error_NullValue__$any__dealform" = "{target} must be specified"
Function Call: getError('NullValue', 'dateRange.startDate', "dealform");
Result: "Start Date must be specified"
```

Key Resolution Sequence (Fallback + Blanket Target Path Matching):
```
error__NullValue__dateRange.startDate__dealform
error__NullValue__$any__dealform
error__NullValue__dateRange.startDate
error__NullValue
```

## Other Notes
Convention
```
Key: error__global__startDate__NullValue = 'Start Date error'
Key: error_dealform_startDate_NullValue = 'Deal Form Start Date Error'

translateErrorMessage('error', 'global', err.target, err.code); => Start date error
translateErrorMessage('error', 'dealform', err.target, err.code); => Start date error

getError("NullValue", "dateRange.startDate", "dealform")
getError("NullValue", "dateRange.startDate")
getError("NullValue")

error__NullValue__dateRange.startDate__dealform <- start with this
error__NullValue__$any__dealform
error__NullValue__dateRange.startDate
error__NullValue

//Error code
<error>__<code>__<targetpath>__<context>

"{target} is required" - Form 1
error_NullValue_?_form1

"Please fill in {target}" - Form 2
error_NullValue_?_form2

```