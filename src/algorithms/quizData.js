export const quizData = {
  fibonacci: [
    {
      q: 'What is the base case for Fibonacci?',
      options: ['dp[0]=0, dp[1]=1', 'dp[0]=1, dp[1]=1', 'dp[0]=0, dp[1]=0', 'dp[0]=1, dp[1]=2'],
      a: 0,
      exp: 'Fibonacci starts with 0 and 1.',
    },
    {
      q: 'What is the recurrence relation for the nth Fibonacci number?',
      options: ['dp[i] = dp[i-1] * dp[i-2]', 'dp[i] = dp[i-1] + dp[i-2]', 'dp[i] = dp[i-1] + i', 'dp[i] = dp[i-1] - dp[i-2]'],
      a: 1,
      exp: 'Each number is the sum of the two preceding ones.',
    },
    {
      q: 'What is the time complexity of memoized Fibonacci?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(2^n)'],
      a: 2,
      exp: 'We compute each state from 0 to n exactly once, so it is O(n).',
    },
    {
      q: 'What is the space complexity of tabulation Fibonacci without space optimization?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
      a: 2,
      exp: 'An array of size n+1 is created, taking O(n) space.',
    },
    {
      q: 'How many previous states do you need to keep track of for Space Optimized Fibonacci?',
      options: ['0', '1', '2', 'n'],
      a: 2,
      exp: 'Only dp[i-1] and dp[i-2] are needed to compute dp[i].',
    }
  ],
  knapsack: [
    {
      q: 'Is the 0/1 Knapsack problem greedy or DP?',
      options: ['Greedy', 'Dynamic Programming', 'Both', 'Neither'],
      a: 1,
      exp: '0/1 Knapsack requires DP because greedy choices (like value/weight ratio) can fail.',
    },
    {
      q: 'In the 2D DP table dp[i][w], what does i represent?',
      options: ['Current weight', 'Total value', 'Items considered up to index i', 'Remaining capacity'],
      a: 2,
      exp: 'i represents considering items from index 0 to i.',
    },
    {
      q: 'What happens if we choose to EXCLUDE the current item i?',
      options: ['dp[i][w] = dp[i-1][w]', 'dp[i][w] = dp[i][w-1]', 'dp[i][w] = 0', 'dp[i][w] = dp[i-1][w-weight[i]]'],
      a: 0,
      exp: 'If we exclude it, the value is just the best value using previous items for the same capacity.',
    },
    {
      q: 'Can 0/1 Knapsack be space-optimized to a 1D array?',
      options: ['No, we need the whole matrix', 'Yes, by iterating capacity backwards', 'Yes, by iterating capacity forwards', 'Only if weights are sorted'],
      a: 1,
      exp: 'Iterating capacity backwards prevents using the same item multiple times in the same step.',
    },
    {
      q: 'What is the time complexity of Knapsack DP?',
      options: ['O(N * W)', 'O(N + W)', 'O(N^2)', 'O(2^N)'],
      a: 0,
      exp: 'We fill a table of size N (items) by W (capacity), taking O(1) per cell.',
    }
  ],
  coinChange: [
    {
      q: 'In Coin Change (minimum coins), what is the initial value for the DP array (except index 0)?',
      options: ['0', '-1', 'Infinity', 'amount + 1'],
      a: 2,
      exp: 'We initialize with Infinity (or amount+1) because we are searching for a minimum.',
    },
    {
      q: 'What is the base case dp[0]?',
      options: ['0', '1', 'Infinity', '-1'],
      a: 0,
      exp: 'It takes 0 coins to make an amount of 0.',
    },
    {
      q: 'If we use a coin of denomination C, the transition is dp[a] = min(dp[a], ?)',
      options: ['dp[a-C]', 'dp[a-C] + 1', 'dp[a-1] + C', 'dp[a] + 1'],
      a: 1,
      exp: 'We take the optimal way to make (a-C) and add 1 (the current coin).',
    },
    {
      q: 'Why can Coin Change be solved with a 1D array easily?',
      options: ['Coins are sorted', 'It is an unbounded knapsack problem', 'Coins cannot be reused', 'The problem is greedy'],
      a: 1,
      exp: 'Because it is unbounded (coins can be reused), we can iterate forwards and just use the 1D amount state.',
    },
    {
      q: 'If the amount cannot be made, what does the algorithm return?',
      options: ['0', 'Infinity', '-1', 'amount'],
      a: 2,
      exp: 'Typically we check if dp[amount] is still Infinity, and return -1.',
    }
  ],
  lcs: [
    {
      q: 'What does LCS stand for?',
      options: ['Longest Common String', 'Lowest Common Substring', 'Longest Common Subsequence', 'Length of Common Sequence'],
      a: 2,
      exp: 'Longest Common Subsequence.',
    },
    {
      q: 'If s1[i] == s2[j], what is the transition?',
      options: ['dp[i][j] = dp[i-1][j-1] + 1', 'dp[i][j] = max(dp[i-1][j], dp[i][j-1])', 'dp[i][j] = 0', 'dp[i][j] = dp[i-1][j-1]'],
      a: 0,
      exp: 'We found a match, so we add 1 to the LCS of the prefixes before this character.',
    },
    {
      q: 'If s1[i] != s2[j], what is the transition?',
      options: ['dp[i][j] = dp[i-1][j-1] + 1', 'dp[i][j] = max(dp[i-1][j], dp[i][j-1])', 'dp[i][j] = 0', 'dp[i][j] = min(dp[i-1][j], dp[i][j-1])'],
      a: 1,
      exp: 'We take the max of either skipping the character in s1 or skipping the character in s2.',
    },
    {
      q: 'What are the base cases for LCS?',
      options: ['dp[0][j] = 1', 'dp[i][j] = i+j', 'dp[0][j] = 0 and dp[i][0] = 0', 'dp[i][i] = 1'],
      a: 2,
      exp: 'An empty string has an LCS of 0 with any other string.',
    },
    {
      q: 'How many rows are needed for space optimized LCS?',
      options: ['1', '2', '3', 'N'],
      a: 1,
      exp: 'We only need the current row and the previous row (or just a 1D array with a previous variable).',
    }
  ],
  editDistance: [
    {
      q: 'Which three operations are allowed in standard Edit Distance?',
      options: ['Insert, Delete, Swap', 'Insert, Delete, Replace', 'Insert, Delete, Copy', 'Replace, Swap, Copy'],
      a: 1,
      exp: 'Standard Levenshtein distance allows Insert, Delete, and Replace.',
    },
    {
      q: 'If s1[i] == s2[j], what is the cost?',
      options: ['1', '0', '-1', 'Infinity'],
      a: 1,
      exp: 'No edit is needed, cost is 0.',
    },
    {
      q: 'What does dp[i][j-1] + 1 represent?',
      options: ['Insertion', 'Deletion', 'Replacement', 'Match'],
      a: 0,
      exp: 'It represents inserting the j-th character of s2 into s1.',
    },
    {
      q: 'What is the base case dp[i][0]?',
      options: ['0', 'i', 'Infinity', '-1'],
      a: 1,
      exp: 'Transforming a string of length i to an empty string takes i deletions.',
    },
    {
      q: 'What is the time complexity?',
      options: ['O(N+M)', 'O(N*M)', 'O(max(N,M))', 'O(N^2 * M^2)'],
      a: 1,
      exp: 'We fill a 2D table of size N*M.',
    }
  ],
  lis: [
    {
      q: 'What does LIS stand for?',
      options: ['Lowest Integer Sum', 'Longest Increasing Subsequence', 'Longest Increasing Substring', 'Last Increasing Sequence'],
      a: 1,
      exp: 'Longest Increasing Subsequence.',
    },
    {
      q: 'In the standard O(N^2) DP, what does dp[i] store?',
      options: ['The LIS ending exactly at index i', 'The LIS in the prefix up to i', 'The length of the string', 'The max value up to i'],
      a: 0,
      exp: 'dp[i] stores the length of the LIS that ends exactly at element arr[i].',
    },
    {
      q: 'What is the initial value of all dp[i]?',
      options: ['0', '1', '-1', 'Infinity'],
      a: 1,
      exp: 'Every element alone is an increasing subsequence of length 1.',
    },
    {
      q: 'How is the O(N log N) space-optimized version implemented?',
      options: ['Using a Segment Tree', 'Using Patience Sorting (Binary Search)', 'Using a Hash Map', 'It cannot be done'],
      a: 1,
      exp: 'We maintain "tails" or patience piles and use binary search to update them.',
    },
    {
      q: 'If arr[i] > arr[j] for j < i, the transition is:',
      options: ['dp[i] = dp[j] + 1', 'dp[i] = max(dp[i], dp[j] + 1)', 'dp[i] = dp[i-1] + 1', 'dp[i] = max(dp[i], arr[j])'],
      a: 1,
      exp: 'We take the max of the current LIS ending at i, or extending the LIS ending at j.',
    }
  ],
  mcm: [
    {
      q: 'In Matrix Chain Multiplication, what does the input array [10, 30, 5, 60] represent?',
      options: ['3 matrices: 10x30, 30x5, 5x60', '4 matrices', 'Dimensions of a single matrix', 'Cost of multiplying'],
      a: 0,
      exp: 'An array of size N represents N-1 matrices, where matrix i has dimensions arr[i-1] x arr[i].',
    },
    {
      q: 'What is the cost to multiply an (A x B) matrix by a (B x C) matrix?',
      options: ['A + B + C', 'A * B * C', 'A * C', 'B * C'],
      a: 1,
      exp: 'It requires A * B * C scalar multiplications.',
    },
    {
      q: 'What is the base case dp[i][i]?',
      options: ['1', 'Infinity', '0', 'arr[i]'],
      a: 2,
      exp: 'Multiplying a single matrix costs 0.',
    },
    {
      q: 'What is the time complexity of the MCM DP?',
      options: ['O(N^2)', 'O(N^3)', 'O(N log N)', 'O(2^N)'],
      a: 1,
      exp: 'We loop over length, start index i, and split point k, resulting in O(N^3).',
    },
    {
      q: 'What loop structure is used in the Tabulation approach?',
      options: ['Iterate i from 0 to n, then j from i to n', 'Iterate length from 2 to n, then i, then j', 'Iterate j then i', 'Only one loop is needed'],
      a: 1,
      exp: 'We must build solutions for smaller chain lengths before larger ones.',
    }
  ],
  partitionSubset: [
    {
      q: 'What must be true about the sum of the array for Partition Equal Subset Sum to be possible?',
      options: ['It must be prime', 'It must be even', 'It must be a power of 2', 'It must be odd'],
      a: 1,
      exp: 'If the sum is odd, it cannot be divided into two equal integer halves.',
    },
    {
      q: 'If the total sum is S, what is the target sum for our Knapsack-like DP?',
      options: ['S', 'S / 2', 'S * 2', '0'],
      a: 1,
      exp: 'We just need to find a subset that sums exactly to S/2.',
    },
    {
      q: 'What are the values in the DP table?',
      options: ['Integers representing max value', 'Booleans (True/False)', 'Indices', 'Differences'],
      a: 1,
      exp: 'dp[sum] is True if a subset with that sum exists, False otherwise.',
    },
    {
      q: 'What is the base case?',
      options: ['dp[0] = False', 'dp[0] = True', 'dp[S/2] = True', 'dp[1] = True'],
      a: 1,
      exp: 'A sum of 0 is always possible (empty subset).',
    },
    {
      q: 'When space optimizing to 1D, how must we iterate the inner target loop?',
      options: ['Forwards (0 to target)', 'Backwards (target to 0)', 'It does not matter', 'By powers of 2'],
      a: 1,
      exp: 'Backwards, so we do not reuse the same array element multiple times (0/1 Knapsack style).',
    }
  ],
  eggDrop: [
    {
      q: 'In the Egg Drop problem, what does dp[e][f] represent?',
      options: ['Number of eggs broken', 'Minimum trials in worst case for e eggs and f floors', 'Maximum floors tested', 'Probability of breaking'],
      a: 1,
      exp: 'It represents the minimum number of trials needed in the worst-case scenario.',
    },
    {
      q: 'What if we only have 1 egg (e=1) and f floors?',
      options: ['We need 1 trial', 'We need log(f) trials', 'We need f trials', 'It is impossible'],
      a: 2,
      exp: 'With 1 egg, we must test every floor linearly from bottom to top, taking f trials worst-case.',
    },
    {
      q: 'What if we have e eggs and 1 floor?',
      options: ['0 trials', '1 trial', 'e trials', 'e/2 trials'],
      a: 1,
      exp: 'It always takes exactly 1 trial to test 1 floor.',
    },
    {
      q: 'When we drop an egg from floor k, what is the transition?',
      options: ['1 + max(dp[e-1][k-1], dp[e][f-k])', '1 + min(dp[e-1][k-1], dp[e][f-k])', 'dp[e-1][k-1] + dp[e][f-k]', '1 + dp[e-1][f-1]'],
      a: 0,
      exp: '1 trial + WORST case of (egg breaks -> check k-1 floors below with e-1 eggs) OR (egg survives -> check f-k floors above with e eggs).',
    },
    {
      q: 'How can the Tabulation approach be optimized from O(E * F^2)?',
      options: ['Using Binary Search for the split point k', 'Using a HashMap', 'It cannot be optimized', 'Using Bitmasking'],
      a: 0,
      exp: 'Because dp[e-1][k-1] is increasing and dp[e][f-k] is decreasing, we can use binary search to find the optimal k, reducing time to O(E * F log F).',
    }
  ],
  palindromePartition: [
    {
      q: 'What does Palindrome Partitioning seek to minimize?',
      options: ['The length of palindromes', 'The number of palindromes', 'The number of cuts to split the string into palindromes', 'The number of characters'],
      a: 2,
      exp: 'We want the minimum number of cuts so that every substring is a palindrome.',
    },
    {
      q: 'If the entire string s[0..i] is a palindrome, how many cuts are needed?',
      options: ['1', '0', 'i', 'Infinity'],
      a: 1,
      exp: 'If it is already a palindrome, 0 cuts are needed.',
    },
    {
      q: 'What does dp[i] typically store in the 1D approach?',
      options: ['Min cuts for prefix s[0..i]', 'Is it a palindrome? (Boolean)', 'Max palindrome length', 'Index of the first cut'],
      a: 0,
      exp: 'dp[i] stores the minimum cuts for the prefix ending at i.',
    },
    {
      q: 'How is the Space Optimized approach usually implemented for this problem?',
      options: ['Dropping a dimension in a 2D array', 'Expand Around Center', 'Using bitwise XOR', 'Using a Segment Tree'],
      a: 1,
      exp: 'We expand around every possible center character(s) and update the 1D dp array, removing the need for a 2D isPalindrome table.',
    },
    {
      q: 'What is the time complexity of the Expand Around Center DP?',
      options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(N^3)'],
      a: 2,
      exp: 'We consider 2N-1 centers, and expand outwards taking up to O(N) time each, so O(N^2).',
    }
  ],
  tsp: [
    {
      q: 'What is the time complexity of Brute Force TSP for N cities?',
      options: ['O(N^2)', 'O(2^N)', 'O(N!)', 'O(N^3)'],
      a: 2,
      exp: 'Brute force checks all permutations of N cities, which is O(N!).',
    },
    {
      q: 'How does Bitmask DP improve TSP?',
      options: ['It uses greedy heuristics', 'It reduces time to O(N^2 * 2^N)', 'It runs in O(N^3)', 'It only finds an approximate solution'],
      a: 1,
      exp: 'By memoizing over the visited mask and current city, we reduce O(N!) to O(N^2 * 2^N).',
    },
    {
      q: 'What does the bitmask represent?',
      options: ['The edge weights', 'The set of visited cities', 'The path taken in order', 'The next city to visit'],
      a: 1,
      exp: 'Each bit in the mask represents whether a specific city has been visited (1) or not (0).',
    },
    {
      q: 'If N=4, what is the mask value when all cities are visited?',
      options: ['4', '8', '15', '16'],
      a: 2,
      exp: '1111 in binary is 15. (or 2^4 - 1).',
    },
    {
      q: 'What happens when mask == (1 << n) - 1?',
      options: ['Return 0', 'Return distance from current city back to the start city', 'Return Infinity', 'End the program'],
      a: 1,
      exp: 'We have visited all cities, so we must pay the cost to return to the starting city (usually 0).',
    }
  ],
};
