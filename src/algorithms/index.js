
import * as fibBF from './fibonacci/bruteForce.js';
import * as fibMemo from './fibonacci/memoized.js';
import * as fibTab from './fibonacci/tabulation.js';
import * as fibSO from './fibonacci/spaceOptimized.js';
import { meta as fibMeta } from './fibonacci/meta.js';

import * as ksBF from './knapsack/bruteForce.js';
import * as ksMemo from './knapsack/memoized.js';
import * as ksTab from './knapsack/tabulation.js';
import * as ksSO from './knapsack/spaceOptimized.js';
import { meta as ksMeta } from './knapsack/meta.js';

import * as ccBF from './coinChange/bruteForce.js';
import * as ccMemo from './coinChange/memoized.js';
import * as ccTab from './coinChange/tabulation.js';
import * as ccSO from './coinChange/spaceOptimized.js';
import { meta as ccMeta } from './coinChange/meta.js';

import * as lcsBF from './lcs/bruteForce.js';
import * as lcsMemo from './lcs/memoized.js';
import * as lcsTab from './lcs/tabulation.js';
import * as lcsSO from './lcs/spaceOptimized.js';
import { meta as lcsMeta } from './lcs/meta.js';

import * as edBF from './editDistance/bruteForce.js';
import * as edMemo from './editDistance/memoized.js';
import * as edTab from './editDistance/tabulation.js';
import * as edSO from './editDistance/spaceOptimized.js';
import { meta as edMeta } from './editDistance/meta.js';

import * as lisBF from './lis/bruteForce.js';
import * as lisMemo from './lis/memoized.js';
import * as lisTab from './lis/tabulation.js';
import * as lisSO from './lis/spaceOptimized.js';
import { meta as lisMeta } from './lis/meta.js';

import * as mcmBF from './mcm/bruteForce.js';
import * as mcmMemo from './mcm/memoized.js';
import * as mcmTab from './mcm/tabulation.js';
import * as mcmSO from './mcm/spaceOptimized.js';
import { meta as mcmMeta } from './mcm/meta.js';

import * as psBF from './partitionSubset/bruteForce.js';
import * as psMemo from './partitionSubset/memoized.js';
import * as psTab from './partitionSubset/tabulation.js';
import * as psSO from './partitionSubset/spaceOptimized.js';
import { meta as psMeta } from './partitionSubset/meta.js';

import * as edropBF from './eggDrop/bruteForce.js';
import * as edropMemo from './eggDrop/memoized.js';
import * as edropTab from './eggDrop/tabulation.js';
import * as edropSO from './eggDrop/spaceOptimized.js';
import { meta as edropMeta } from './eggDrop/meta.js';

import * as ppBF from './palindromePartition/bruteForce.js';
import * as ppMemo from './palindromePartition/memoized.js';
import * as ppTab from './palindromePartition/tabulation.js';
import * as ppSO from './palindromePartition/spaceOptimized.js';
import { meta as ppMeta } from './palindromePartition/meta.js';

import * as tspBF from './tsp/bruteForce.js';
import * as tspMemo from './tsp/memoized.js';
import * as tspTab from './tsp/tabulation.js';
import * as tspSO from './tsp/spaceOptimized.js';
import { meta as tspMeta } from './tsp/meta.js';

const STEP_CAP = 5000;

function capped(runFn, input) {
  const { result, steps } = runFn(input);
  const truncated = steps.length > STEP_CAP;
  return { result, steps: steps.slice(0, STEP_CAP), truncated, totalSteps: steps.length };
}

export const registry = {
  fibonacci: {
    meta: fibMeta,
    bruteForce: (input) => capped(fibBF.run, input),
    memoized: (input) => capped(fibMemo.run, input),
    tabulation: (input) => capped(fibTab.run, input),
    spaceOptimized: (input) => capped(fibSO.run, input),
    code: { bruteForce: fibBF.code, memoized: fibMemo.code, tabulation: fibTab.code, spaceOptimized: fibSO.code },
  },
  knapsack: {
    meta: ksMeta,
    bruteForce: (input) => capped(ksBF.run, input),
    memoized: (input) => capped(ksMemo.run, input),
    tabulation: (input) => capped(ksTab.run, input),
    spaceOptimized: (input) => capped(ksSO.run, input),
    code: { bruteForce: ksBF.code, memoized: ksMemo.code, tabulation: ksTab.code, spaceOptimized: ksSO.code },
  },
  coinChange: {
    meta: ccMeta,
    bruteForce: (input) => capped(ccBF.run, input),
    memoized: (input) => capped(ccMemo.run, input),
    tabulation: (input) => capped(ccTab.run, input),
    spaceOptimized: (input) => capped(ccSO.run, input),
    code: { bruteForce: ccBF.code, memoized: ccMemo.code, tabulation: ccTab.code, spaceOptimized: ccSO.code },
  },
  lcs: {
    meta: lcsMeta,
    bruteForce: (input) => capped(lcsBF.run, input),
    memoized: (input) => capped(lcsMemo.run, input),
    tabulation: (input) => capped(lcsTab.run, input),
    spaceOptimized: (input) => capped(lcsSO.run, input),
    code: { bruteForce: lcsBF.code, memoized: lcsMemo.code, tabulation: lcsTab.code, spaceOptimized: lcsSO.code },
  },
  editDistance: {
    meta: edMeta,
    bruteForce: (input) => capped(edBF.run, input),
    memoized: (input) => capped(edMemo.run, input),
    tabulation: (input) => capped(edTab.run, input),
    spaceOptimized: (input) => capped(edSO.run, input),
    code: { bruteForce: edBF.code, memoized: edMemo.code, tabulation: edTab.code, spaceOptimized: edSO.code },
  },
  lis: {
    meta: lisMeta,
    bruteForce: (input) => capped(lisBF.run, input),
    memoized: (input) => capped(lisMemo.run, input),
    tabulation: (input) => capped(lisTab.run, input),
    spaceOptimized: (input) => capped(lisSO.run, input),
    code: { bruteForce: lisBF.code, memoized: lisMemo.code, tabulation: lisTab.code, spaceOptimized: lisSO.code },
  },
  mcm: {
    meta: mcmMeta,
    bruteForce: (input) => capped(mcmBF.run, input),
    memoized: (input) => capped(mcmMemo.run, input),
    tabulation: (input) => capped(mcmTab.run, input),
    spaceOptimized: (input) => capped(mcmSO.run, input),
    code: { bruteForce: mcmBF.code, memoized: mcmMemo.code, tabulation: mcmTab.code, spaceOptimized: mcmSO.code },
  },
  partitionSubset: {
    meta: psMeta,
    bruteForce: (input) => capped(psBF.run, input),
    memoized: (input) => capped(psMemo.run, input),
    tabulation: (input) => capped(psTab.run, input),
    spaceOptimized: (input) => capped(psSO.run, input),
    code: { bruteForce: psBF.code, memoized: psMemo.code, tabulation: psTab.code, spaceOptimized: psSO.code },
  },
  eggDrop: {
    meta: edropMeta,
    bruteForce: (input) => capped(edropBF.run, input),
    memoized: (input) => capped(edropMemo.run, input),
    tabulation: (input) => capped(edropTab.run, input),
    spaceOptimized: (input) => capped(edropSO.run, input),
    code: { bruteForce: edropBF.code, memoized: edropMemo.code, tabulation: edropTab.code, spaceOptimized: edropSO.code },
  },
  palindromePartition: {
    meta: ppMeta,
    bruteForce: (input) => capped(ppBF.run, input),
    memoized: (input) => capped(ppMemo.run, input),
    tabulation: (input) => capped(ppTab.run, input),
    spaceOptimized: (input) => capped(ppSO.run, input),
    code: { bruteForce: ppBF.code, memoized: ppMemo.code, tabulation: ppTab.code, spaceOptimized: ppSO.code },
  },
  tsp: {
    meta: tspMeta,
    bruteForce: (input) => capped(tspBF.run, input),
    memoized: (input) => capped(tspMemo.run, input),
    tabulation: (input) => capped(tspTab.run, input),
    spaceOptimized: (input) => capped(tspSO.run, input),
    code: { bruteForce: tspBF.code, memoized: tspMemo.code, tabulation: tspTab.code, spaceOptimized: tspSO.code },
  },
};

export const problemOrder = ['fibonacci', 'knapsack', 'coinChange', 'lcs', 'editDistance', 'lis', 'mcm', 'partitionSubset', 'eggDrop', 'palindromePartition', 'tsp'];
