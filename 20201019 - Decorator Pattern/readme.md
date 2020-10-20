# Decorator Pattern
## Definition
In object-oriented programming, the decorator pattern is a design pattern that allows behavior to be added to an individual object, dynamically, without affecting the behavior of other objects from the same class. - Wikipedia

# Example: Implementing a logger for the Deal Service
## Negative Demonstration
Suppose we have an existing implementation of a deal service. We would like to implement a feature to do some level of debugging to see how long it takes the `getDeals` function to execute

```typescript
//Before 
class DealService {
    async getDeals() {
        return [{ dealType: 'free-delivery' }];
    }
    async createDeal(deal: any) {
        await fetch('/deals', deal);
    }
}
//After
class DealService {
    private _log: (d: string) => void
    constructor(logger: (d: string) => void) {
        this._log = logger;
    }
    async getDeals() {
        this._log('getDeals started: ', startTime);
        let result = [{ dealType: 'free-delivery' }];
        this._log('getDeals completed: ', endTime);
        this._log('getDeals time taken: ', (endTime - startTime) / 1000, 'seconds');
    }
    async createDeal(deal: any) {
        await fetch('/deals', deal);
    }
}
```
The are a couple of problems with this solution. Firstly, to enable logging we will need to modify all places that are constructing `DealService` to include a logger. This is less than ideal if there are a large number of places that this is being created.

Also, in applying SOLID priciples, this violates
1. Single Responsibility Principle - DealService is not also responsible for logging
2. Open closed principle - Deal Service has been modified


## Using decorators to avoid this problem
### Decorating an instance of the class
```typescript
class DealService {
  async getDeals() {
    return [{ dealType: 'free-delivery' }];
  }
  async createDeal() {
    await fetch('/deals', deal);
  }
}

function applyDealServiceLogger(d: DealService, log: (...v: any[]) => void): DealService {
  const innerDealService = d;
  const wrapper = new Proxy(innerDealService, {
    get: (t, property, receiver) => {
      if (property === 'getDeals') {
        return async () => {
          const startTime = new Date().getTime();
          log('getDeals started: ', startTime);
          let result = await d.getDeals();
          const endTime = new Date().getTime();
          log('getDeals completed: ', endTime);
          log('getDeals time taken: ', (endTime - startTime) / 1000, 'seconds');
          return result;
        };
      }
    },
  });
  return wrapper;
}

async function main() {
    let svc = new DealService();
    svc = applyDealServiceLogger(svc, console.log);
    let deals = await svc.getDeals();
    console.log(deals);
    console.log('done')
}
main()

```

## Decorator pattern vs Inheritance
WHen attempting to add behavior without modifying an existing class, the first thought that comes to mind can be to use inheritance. The key difference here is that decorators add behavior to instances of objects, while inheritance modifies the prototype or the class itself.

In a language such as Javascript, it is easy to access and modify classes during runtime as well, which allows some neat tricks to add behavior and functionality. Since the class prototype is accessible, we are able to write a function to create a class that adds functionality to all methods of a class.

# Bonus
Goal: Implement a higher order function that takes in a class, and returns another class that has the same behavior, but with logging attached to all methods of the class.

Since in Javascript, classes are objects (progrmaming objects), metaprogramming + decorator pattern = 🤯
```typescript
class DealService {
  private _name: string;
  constructor() {
    this._name = 'My Deal Service';
  }
  async getName() {
    return this._name;
  }
  async getDeals() {
    return [{ dealType: 'free-delivery' }];
  }
  async createDeals() {
  }
}

function withLogger(
  MyClass: new () => DealService,
  log: (...v: any[]) => void
): new () => DealService {
  const methodNames = Object.getOwnPropertyNames(MyClass.prototype);
  //Create a new instance inheriting from the class - note that this might break implementations that are using instanceof
  class MyClassWithLogger extends MyClass {}
  for (let methodName of methodNames) {
    if (methodName === 'constructor') {
      continue;
    }
    const originalImpl = MyClassWithLogger.prototype[methodName];
    //Decorate all methods with timing functionality
    //Important to use function here to ensure that `this` is bound correctly
    const loggedImpl = function(...p: any[]) {
      const startTime = new Date().getTime();
      log(`${methodName} started: `, startTime);
      let result = originalImpl.call(this, ...p);
      if (result instanceof Promise) {
        //If a promise is retuned, wait for the promise to complete before calling done
        return result.then((d) => {
          const endTime = new Date().getTime();
          log(`${methodName} completed: `, endTime);
          log(`${methodName} time taken: `, (endTime - startTime) / 1000, 'seconds');
          return d;
        });
      } else {
        const endTime = new Date().getTime();
        log(`${methodName} completed:`, endTime);
        log(`${methodName} time taken: `, (endTime - startTime) / 1000, 'seconds');
        return result;
      }
    };
    MyClassWithLogger.prototype[methodName] = loggedImpl;
  }
  return MyClassWithLogger;
}

function main() {
    let DealServiceWithLogger = withLogger(DealService, (...data: any[]) =>
    setLogData((prevData) => (prevData ? prevData + '\n' : '') + data.join(' '))
    );
    let svc = new DealServiceWithLogger();
    let deals = await svc.getDeals();
}
main()
```

The main benefit of doing something like this, is that you can decorate the export of a file if you need to enable some level of logging, without having to modify the code everywhere. However, it is important to note that we are bending the definitions of the decorator pattern here, 

In this example, we have deviated slightly from what the idea of the decorator pattern is. If we view classes as objects, as they rightfully are in this example, then no one can quite fault us yet.

Coming back to earth, one of the more common use cases of the decorator pattern is when you have numerous implementations of the same interface. The decorator pattern encourages you to think of using composition over inheritance and pushes the responsibility of modifying behaviors to the runtime instead, which in some cases, is exactly what we want.





