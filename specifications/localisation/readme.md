# Localisation

## Recursive processing

Max Depth: 10

Allowed Characters: Alphabets, numbers, delimited by underscores

# Examples

Review the following examples to ensure that

1. All supported old use cases have been accounted for and are tested
1. All supported new cases have been considered and are working as intended
1. All edge cases and specified behavior should be tested

### **Existing Valid Behavior**

Example Config:

```json
{
  "vendor_performane": "Vendor Performance",
  "vendor_performance[FP_SG]": "Vendor Performance Singapore",
  "vendor_performance_survey": "Click here to go to {link}"
}
```

Expected Outputs:

```
translate("vendor_performance") => "Vendor Performance"
translate("vendor_performance", null, "FP_SG") => "Vendor Performance Singapore"
translate("vendor_performance_survey", { link: "https://foodpanda.sg/survey" }) => "Click here to go to https://foodpanda.sg/survey"
```

### **New Recursive Implementation (1 level)**

Example Config:

```json
{
  "vendor_performance_survey_link": "https://foodpanda.sg/survey",
  "vendor_performance_survey": "Click here to go to {vendor_performance_survey_link}"
}
```

Expected Outputs:

```
translate("vendor_performance_survey") => "Click here to go to https://foodpanda.sg/survey"
```

### **New Recursive Implementation (1 level, sub key support)**

Example Config:

```json
{
  "vendor_performance_survey2": "Click here to go to {vendor_performance_survey_link2}",
  "vendor_performance_survey_link2": "https://foodpanda.sg/global/survey",
  "vendor_performance_survey_link2[FP_SG]": "https://foodpanda.sg/singapore/survey",
  "vendor_performance_survey_link2[FP_MY]": "https://foodpanda.sg/malaysia/survey"
}
```

Expected Outputs:

```json
translate("vendor_performance_survey2") => "Click here to go to https://foodpanda.sg/global/survey"

translate("vendor_performance_survey2", null, "FP_SG") => "Click here to go to https://foodpanda.sg/singapore/survey"

translate("vendor_performance_survey2", null, "FP_MY") => "Click here to go to https://foodpanda.sg/malaysia/survey"

```

## Miscellaneous specified behavior

1. Processing variables from the global store. e.g. `"vendor_performance_closed_on_monday": "Vendor closed on {global.days_long.monday}"`
1. Overriding of global variables.

<br/>
<br/>

## **Error Examples**

### Circular References

```json
{
  "cycle_vendor_name": "{cycle_vendor_owner_name}",
  "cycle_vendor_owner_name": "{cycle_vendor_name}"
}
```

### Too deep nesting (currently limited at depth 10)

```json
{
  "deep_item_root": "{deep_item_1}",
  "deep_item_1": "{deep_item_2}",
  "deep_item_2": "{deep_item_3}",
  "deep_item_3": "{deep_item_4}",
  "deep_item_4": "{deep_item_5}",
  "deep_item_5": "{deep_item_6}",
  "deep_item_6": "{deep_item_7}",
  "deep_item_7": "{deep_item_8}",
  "deep_item_8": "{deep_item_9}",
  "deep_item_9": "{deep_item_10}",
  "deep_item_10": "{deep_item_11}",
  "deep_item_11": "My Value!"
}
```

### To be confirmed
1. What is the expected behavior when a key fails to load
1. If we throw an exception, will that be too severe?
1. If we don't throw an exception, how will we detect any errors that might have occurred in our configuration?

### Other Challenges
1. Current specification around 'Read More' text being based on characters and trimming is no longer possible. Propose to do by single line instead.