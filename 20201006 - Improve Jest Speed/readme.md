```
//Run the test cases across multiple iterations
// const { exec } = require('child_process');
// async function main() {
//   const scenarios = [2, 4, 6, 8];
//   const iterCount = 10;
//   let output = [];
//   for (let i = 1; i <= iterCount; i++) {
//     for (let numWorkers of scenarios) {
//       console.log(`Running scenario ${numWorkers} workers | Iteration: ${i} `);
//       let { duration } = await runTest(numWorkers);
//       output.push({ numWorkers, duration });
//       console.log(
//         `Completed scenario ${numWorkers} workers | Iteration: ${i} | Completed in ${duration} seconds `
//       );
//     }
//   }
//   console.log(JSON.stringify(output, null, 2));
// }
// /**
//  *
//  * @param {number} numWorkers
//  */
// async function runTest(numWorkers) {
//   /** @type {string} */
//   let testOutput = await new Promise((resolve, reject) => {
//     exec(`yarn jest --maxWorkers=${numWorkers}`, (err, stdOut, stdErr) => {
//       err ? reject(stdErr) : resolve(stdOut);
//     });
//   });
//   const durationRegex = /Done in (.+)s/g;
//   const matches = durationRegex.exec(testOutput);
//   const duration = parseFloat(matches[1]);
//   return {
//     duration,
//   };
// }

// main().then((d) => console.log('done'));

//Tabulate
let data = [
  {
    numWorkers: 2,
    duration: 44.7,
  },
  {
    numWorkers: 4,
    duration: 47.15,
  },
  {
    numWorkers: 6,
    duration: 48.57,
  },
  {
    numWorkers: 8,
    duration: 53.9,
  },
  {
    numWorkers: 2,
    duration: 38.58,
  },
  {
    numWorkers: 4,
    duration: 36.18,
  },
  {
    numWorkers: 6,
    duration: 42.43,
  },
  {
    numWorkers: 8,
    duration: 51.23,
  },
  {
    numWorkers: 2,
    duration: 37.72,
  },
  {
    numWorkers: 4,
    duration: 36.77,
  },
  {
    numWorkers: 6,
    duration: 44.05,
  },
  {
    numWorkers: 8,
    duration: 52.44,
  },
  {
    numWorkers: 2,
    duration: 39.63,
  },
  {
    numWorkers: 4,
    duration: 39.38,
  },
  {
    numWorkers: 6,
    duration: 43.93,
  },
  {
    numWorkers: 8,
    duration: 52.18,
  },
  {
    numWorkers: 2,
    duration: 38.83,
  },
  {
    numWorkers: 4,
    duration: 31.5,
  },
  {
    numWorkers: 6,
    duration: 38.09,
  },
  {
    numWorkers: 8,
    duration: 42.51,
  },
  {
    numWorkers: 2,
    duration: 36.17,
  },
  {
    numWorkers: 4,
    duration: 33.03,
  },
  {
    numWorkers: 6,
    duration: 36.93,
  },
  {
    numWorkers: 8,
    duration: 42.46,
  },
  {
    numWorkers: 2,
    duration: 33.85,
  },
  {
    numWorkers: 4,
    duration: 31.29,
  },
  {
    numWorkers: 6,
    duration: 37.01,
  },
  {
    numWorkers: 8,
    duration: 42.8,
  },
  {
    numWorkers: 2,
    duration: 34.88,
  },
  {
    numWorkers: 4,
    duration: 31.72,
  },
  {
    numWorkers: 6,
    duration: 37.25,
  },
  {
    numWorkers: 8,
    duration: 42.31,
  },
  {
    numWorkers: 2,
    duration: 35.68,
  },
  {
    numWorkers: 4,
    duration: 30.78,
  },
  {
    numWorkers: 6,
    duration: 36.7,
  },
  {
    numWorkers: 8,
    duration: 42.53,
  },
  {
    numWorkers: 2,
    duration: 34.2,
  },
  {
    numWorkers: 4,
    duration: 31.38,
  },
  {
    numWorkers: 6,
    duration: 40.15,
  },
  {
    numWorkers: 8,
    duration: 54.31,
  },
];

const index = {};
for (let stat of data) {
  let { numWorkers, duration } = stat;
  const numWorkerStats = index[numWorkers] || { runs: null, averageDuration: null };
  if (numWorkerStats.runs == null) {
    numWorkerStats.runs = 1;
    numWorkerStats.averageDuration = duration;
  } else {
    const durationTotal = numWorkerStats.runs * numWorkerStats.averageDuration;
    numWorkerStats.runs += 1;
    numWorkerStats.averageDuration = (durationTotal + duration) / numWorkerStats.runs;
  }
  index[numWorkers] = numWorkerStats;
}
console.log(JSON.stringify(index, null, 2));
```