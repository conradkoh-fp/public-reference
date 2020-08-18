# Setting up data dog monitoring

## Data Dog Initialization
Create a new client token and get the application id from Data Dog. This step should yield the `REACT_DATADOG_APP_ID` and `REACT_DATADOG_APP_CLIENT_TOKEN` variables

## React configuration

1. Install the required dependencies in your React project

```sh
yarn add @datadog/browser-rum
```

2. Add the required environment variables

```
REACT_DATADOG_APP_ID=
REACT_DATADOG_APP_CLIENT_TOKEN=
```

3. Initialize Data Dog Rum. This should be done when your root component mounts

```javascript
import { Datacenter, datadogRum } from "@datadog/browser-rum";
datadogRum.init({
  applicationId: `${process.env.REACT_DATADOG_APP_ID}`,
  clientToken: `${process.env.REACT_DATADOG_APP_CLIENT_TOKEN}`,
  env: `${process.env.NODE_ENV}`,
  service: "Vendor OPS KPI", //Update this to the correct service name
  datacenter: Datacenter.EU, //Update this to the relevant datacenter
  sampleRate: 100,
  trackInteractions: true,
  silentMultipleInit: true,
});
datadogRum.addRumGlobalContext(
  "application_id",
  `${process.env.REACT_DATADOG_APP_ID}`
);
```
