Running tests with different number of workers to determine the best configuration for speed on local machines
```
const { exec } = require('child_process');
async function main() {
  const scenarios = [2, 3, 4, 5, 6, 8];
  const iterCount = 10;
  let runStats = [];
  for (let i = 1; i <= iterCount; i++) {
    for (let numWorkers of scenarios) {
      console.log(`Running scenario ${numWorkers} workers | Iteration: ${i} `);
      let { duration } = await runTest(numWorkers);
      runStats.push({ numWorkers, duration });
      console.log(
        `Completed scenario ${numWorkers} workers | Iteration: ${i} | Completed in ${duration} seconds `
      );
    }
  }
  let dataTabulated = tabulateStats(runStats);
  console.log(JSON.stringify(dataTabulated, null, 2));
}
/**
 *
 * @param {number} numWorkers
 */
async function runTest(numWorkers) {
  await new Promise((resolve, reject) => {
    exec(`yarn jest --clearCache`, (err) => {
      err ? reject(err) : resolve();
    });
  });
  /** @type {string} */
  let testOutput = await new Promise((resolve, reject) => {
    exec(`yarn jest --maxWorkers=${numWorkers}`, (err, stdOut, stdErr) => {
      err ? reject(stdErr) : resolve(stdOut);
    });
  });
  const durationRegex = /Done in (.+)s/g;
  const matches = durationRegex.exec(testOutput);
  const duration = parseFloat(matches[1]);
  return {
    duration,
  };
}

main().then((d) => console.log('done'));

function tabulateStats(data) {
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
  return index;
}

```