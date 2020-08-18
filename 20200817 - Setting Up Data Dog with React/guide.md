# Setting up data dog monitoring

## Data Dog Initialization
Create a new client token and get the application id from Data Dog. This step should yield the `REACT_DATADOG_APP_ID` and `REACT_DATADOG_APP_CLIENT_TOKEN` variables

## React configuration (Data Dog Browser Rum @ v1.12.7)

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
  service: "Vendor Portal", //Update this to the correct service name
  datacenter: Datacenter.EU, //Update this to the relevant datacenter
  sampleRate: 100,
  trackInteractions: true, //Automatically track user interactions. Refer to official documentation for more info
  silentMultipleInit: true, //Fail silently in the event that rum is initialized multiple times
});
```

### Others
For more information on datadog rum and the available flags, refer to their [official documentation](https://docs.datadoghq.com/real_user_monitoring/browser/?tab=us)