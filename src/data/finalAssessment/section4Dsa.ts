import { FinalAssessmentQuestion } from '../../types';

export const SECTION_4_DSA: FinalAssessmentQuestion[] = [
  {
    id: 'fa-q151',
    questionNumber: 151,
    section: 'DSA & Algorithms',
    domainTag: 'Balanced Trees & Red-Black Invariants',
    question: 'In a valid Red-Black Tree, what is the maximum possible height of a tree containing n internal nodes, where black-height is bh(x)?',
    options: [
      '2 · log2(n + 1)',
      'log2(n)',
      '1.44 · log2(n + 2)',
      '3 · log2(n)'
    ],
    correctIndex: 0,
    explanation: 'By the properties of Red-Black Trees: A subtree rooted at x contains at least 2^(bh(x)) - 1 internal nodes. Since no two red nodes can be adjacent, at least half of the nodes on any simple path from root to leaf must be black, which means bh(root) ≥ h / 2. Therefore, n ≥ 2^(h/2) - 1 => n + 1 ≥ 2^(h/2) => h ≤ 2 · log2(n + 1).',
    shortcutOrInsight: 'Max height of Red-Black tree is 2 · log2(n + 1). Max height of AVL tree is ~1.44 · log2(n).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q152',
    questionNumber: 152,
    section: 'DSA & Algorithms',
    domainTag: 'Dynamic Programming & Bitmasking',
    question: 'The Traveling Salesperson Problem (TSP) on n vertices can be solved using the Held-Karp dynamic programming algorithm with state DP(mask, u). What is the exact time and space complexity of this algorithm?',
    options: [
      'Time: O(n^2 · 2^n), Space: O(n · 2^n)',
      'Time: O(n! · 2^n), Space: O(n^2)',
      'Time: O(2^n), Space: O(2^n)',
      'Time: O(n^3 · 2^n), Space: O(n^2 · 2^n)'
    ],
    correctIndex: 0,
    explanation: 'There are 2^n subsets of vertices (represented by bitmask) and n possible ending vertices u. Hence, there are n · 2^n states. For each state, we iterate over up to n possible previous vertices v to transition: DP(mask, u) = min_v (DP(mask \\ {u}, v) + cost(v, u)). Total operations = O(n) per state. Total Time = O(n^2 · 2^n). Space = O(n · 2^n).',
    shortcutOrInsight: 'Held-Karp TSP: n · 2^n states × n transitions = O(n^2 · 2^n) time.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q153',
    questionNumber: 153,
    section: 'DSA & Algorithms',
    domainTag: 'Graph Theory & Strongly Connected Components',
    question: 'Tarjan\'s algorithm for finding Strongly Connected Components (SCCs) in a directed graph G = (V, E) uses DFS traversal tracking `disc[u]` and `low[u]`. A node u is the root of an SCC when which condition evaluates to true?',
    options: [
      'disc[u] == low[u]',
      'disc[u] < low[u]',
      'disc[u] == low[u] + 1',
      'low[u] == 0'
    ],
    correctIndex: 0,
    explanation: 'In Tarjan\'s algorithm, disc[u] is the discovery timestamp of node u, and low[u] is the lowest discovery time reachable from u through its subtree and back-edges in the DFS stack. If low[u] == disc[u], no node in u\'s subtree has a back-edge to an ancestor of u. Thus, u is the root of an SCC, and popping nodes from the stack until u yields the complete SCC.',
    shortcutOrInsight: 'Tarjan\'s SCC root condition: disc[u] == low[u].',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q154',
    questionNumber: 154,
    section: 'DSA & Algorithms',
    domainTag: 'String Algorithms & KMP Prefix Function',
    question: 'What is the Knuth-Morris-Pratt (KMP) Longest Prefix Suffix (LPS / π) array value for the string "ABABACA"?',
    options: [
      '[0, 0, 1, 2, 3, 0, 1]',
      '[0, 1, 0, 1, 2, 0, 1]',
      '[0, 0, 1, 2, 0, 1, 2]',
      '[0, 1, 2, 3, 4, 0, 1]'
    ],
    correctIndex: 0,
    explanation: 'Trace prefix table:\ni=0: "A" -> 0\ni=1: "AB" -> 0\ni=2: "ABA" -> prefix "A" == suffix "A" -> 1\ni=3: "ABAB" -> "AB" == "AB" -> 2\ni=4: "ABABA" -> "ABA" == "ABA" -> 3\ni=5: "ABABAC" -> no match -> 0\ni=6: "ABABACA" -> "A" == "A" -> 1.\nArray = [0, 0, 1, 2, 3, 0, 1].',
    shortcutOrInsight: 'LPS array matching: Match lengths step up 1, 2, 3 on repeated ABAB pattern, reset to 0 at \'C\', then 1 at final \'A\'.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q155',
    questionNumber: 155,
    section: 'DSA & Algorithms',
    domainTag: 'Master Theorem & Recurrences',
    question: 'Using the Master Theorem, what is the asymptotic tight bound for the recurrence relation T(n) = 4T(n/2) + n^2 · log(n)?',
    options: [
      'Θ(n^2 · log^2(n))',
      'Θ(n^2 · log(n))',
      'Θ(n^2)',
      'Θ(n^3)'
    ],
    correctIndex: 0,
    explanation: 'Here a = 4, b = 2, f(n) = n^2 · log(n). Critical exponent log_b(a) = log_2(4) = 2. Notice that n^(log_b a) = n^2. Here f(n) = Θ(n^(log_b a) · log^k(n)) with k = 1. This matches the extended Case 2 of the Master Theorem! The solution is T(n) = Θ(n^(log_b a) · log^(k+1)(n)) = Θ(n^2 · log^2(n)).',
    shortcutOrInsight: 'Extended Master Theorem Case 2: When f(n) = n^(log_b a) · log^k(n), multiply by an extra log n factor.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q156',
    questionNumber: 156,
    section: 'DSA & Algorithms',
    domainTag: 'Segment Trees & Lazy Propagation',
    question: 'Why is Lazy Propagation required in a Segment Tree supporting range updates (e.g. adding val to all elements in range [L, R])?',
    options: [
      'It defers updates to child nodes until they are accessed, reducing range update time from O(N) to O(log N).',
      'It reduces tree memory from O(N) to O(1).',
      'It prevents integer overflow in segment sums.',
      'It converts the segment tree into a binary search tree.'
    ],
    correctIndex: 0,
    explanation: 'Without lazy propagation, updating a range [L, R] would require visiting every leaf node in that range, taking O(N) time. Lazy propagation tags internal nodes with pending updates and pushes them downward only when queries actually traverse those subtrees, guaranteeing O(log N) updates.',
    shortcutOrInsight: 'Lazy propagation transforms range update complexity from O(N) to O(log N).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q157',
    questionNumber: 157,
    section: 'DSA & Algorithms',
    domainTag: 'Graph Theory & Negative Cycles',
    question: 'How does the Bellman-Ford algorithm detect the presence of a negative-weight cycle reachable from source vertex s in a directed graph G = (V, E)?',
    options: [
      'If after |V| - 1 relaxation passes, any edge (u, v) can still be relaxed (dist[u] + weight(u, v) < dist[v]), a negative cycle exists.',
      'If any vertex has a negative in-degree.',
      'If Dijkstra\'s algorithm returns an empty queue.',
      'By running Kahn\'s topological sort.'
    ],
    correctIndex: 0,
    explanation: 'In a graph with no negative cycles, the shortest simple path contains at most |V| - 1 edges. Hence, |V| - 1 relaxation rounds suffice to find all shortest paths. If a further |V|-th relaxation round succeeds in reducing any distance, there must be a negative cycle endlessly reducing path weights.',
    shortcutOrInsight: 'Bellman-Ford: A relaxation on the |V|-th iteration proves a negative cycle exists.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q158',
    questionNumber: 158,
    section: 'DSA & Algorithms',
    domainTag: 'Fenwick Trees (Binary Indexed Tree)',
    question: 'In a Binary Indexed Tree (Fenwick Tree), what bitwise operation isolates the Least Significant Set Bit (LSB) of an integer index `i` to determine parent and range increments?',
    options: [
      'i & (-i)',
      'i | (-i)',
      'i ^ (i - 1)',
      '~i & i'
    ],
    correctIndex: 0,
    explanation: 'Using two\'s complement representation: -i = (~i + 1). The bitwise AND between i and its two\'s complement negation `i & (-i)` isolates the lowest 1-bit of i. For example, for i = 12 (binary 1100), -12 is ...11110100. 12 & (-12) = 00000100 (4).',
    shortcutOrInsight: 'LSB extraction formula: `i & (-i)`. Fundamental building block of BIT.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q159',
    questionNumber: 159,
    section: 'DSA & Algorithms',
    domainTag: 'Computational Complexity & NP-Completeness',
    question: 'According to the Cook-Levin Theorem, which problem was the first proven to be NP-Complete?',
    options: [
      'Boolean Satisfiability (SAT / 3-SAT)',
      'Traveling Salesperson Problem (TSP)',
      'Halting Problem',
      'Graph Coloring'
    ],
    correctIndex: 0,
    explanation: 'The Cook-Levin Theorem (1971) proved that the Boolean Satisfiability Problem (SAT) is NP-Complete by showing that any language in NP can be reduced in polynomial time to SAT via a non-deterministic Turing machine simulation.',
    shortcutOrInsight: 'Cook-Levin Theorem established Boolean SAT as the foundation of NP-Completeness.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q160',
    questionNumber: 160,
    section: 'DSA & Algorithms',
    domainTag: 'Shortest Paths & Data Structures',
    question: 'What is the optimal time complexity of Dijkstra\'s algorithm for a graph with V vertices and E edges when implemented using a Fibonacci Heap vs a Binary Min-Heap?',
    options: [
      'Fibonacci: O(E + V log V), Binary Heap: O(E log V)',
      'Fibonacci: O(V log E), Binary Heap: O(E log V)',
      'Fibonacci: O(E log V), Binary Heap: O(V^2)',
      'Fibonacci: O(V + E), Binary Heap: O(E log V)'
    ],
    correctIndex: 0,
    explanation: 'Dijkstra requires V extract-min operations and up to E decrease-key operations. In a Binary Heap, decrease-key takes O(log V), yielding O(V log V + E log V) = O(E log V). In a Fibonacci Heap, decrease-key has amortized O(1) time, yielding O(E · 1 + V log V) = O(E + V log V).',
    shortcutOrInsight: 'Fibonacci Heap achieves amortized O(1) decrease-key, optimizing Dijkstra to O(E + V log V).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q161',
    questionNumber: 161,
    section: 'DSA & Algorithms',
    domainTag: 'Monotonic Stack & Queue',
    question: 'Given an array of heights representing histogram bars, what is the time complexity of finding the largest rectangular area using a Monotonic Stack?',
    options: [
      'O(N) time and O(N) space',
      'O(N log N) time and O(1) space',
      'O(N^2) time and O(N) space',
      'O(N · K) time'
    ],
    correctIndex: 0,
    explanation: 'Using a monotonic increasing stack of indices, each bar is pushed onto the stack exactly once and popped at most once when a shorter bar is encountered. When popped, the width is (current_index - stack.peek() - 1), computing the maximal rectangle in linear O(N) total time.',
    shortcutOrInsight: 'Every element enters and leaves the stack at most once: strict O(N) amortized.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q162',
    questionNumber: 162,
    section: 'DSA & Algorithms',
    domainTag: 'Network Flow & Algorithms',
    question: 'What is the time complexity of Dinic\'s algorithm for finding Maximum Bipartite Matching on a unit-network bipartite graph with V vertices and E edges?',
    options: [
      'O(E · √V)',
      'O(V · E)',
      'O(V^2 · E)',
      'O(E · log V)'
    ],
    correctIndex: 0,
    explanation: 'On unit networks (where all edge capacities are 1 and each vertex has in-degree or out-degree 1, as in bipartite matching), Dinic\'s algorithm terminates in at most O(√V) phases, with each phase taking O(E) time via DFS blocking flows. Total time is O(E · √V) (equivalent to Hopcroft-Karp).',
    shortcutOrInsight: 'Dinic\'s on unit networks / bipartite matching runs in O(E · √V) time.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q163',
    questionNumber: 163,
    section: 'DSA & Algorithms',
    domainTag: 'Dynamic Programming & LIS',
    question: 'Patience Sorting computes the Longest Increasing Subsequence (LIS) of an array of length N by maintaining the smallest tail elements of all increasing subsequences found so far. What is the time complexity of this approach?',
    options: [
      'O(N · log N)',
      'O(N^2)',
      'O(N · log^2 N)',
      'O(N)'
    ],
    correctIndex: 0,
    explanation: 'The tails array is always strictly sorted. For each element x in the input array, we use binary search (`std::lower_bound` or `bisect_left`) to find the first tail ≥ x in O(log N) time and replace it, or append x if x is larger than all tails. Doing this for N elements takes O(N log N) time.',
    shortcutOrInsight: 'Tails array + binary search (lower_bound) yields O(N log N) LIS.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q164',
    questionNumber: 164,
    section: 'DSA & Algorithms',
    domainTag: 'Trie & Prefix Trees',
    question: 'What is the primary advantage of a Compressed Trie (Radix Tree / Patricia Trie) over a standard Trie?',
    options: [
      'Chains of single-child nodes are merged into single edges containing substring labels, saving substantial memory.',
      'It supports O(1) searches instead of O(L).',
      'It does not require character comparisons.',
      'It balances itself like an AVL tree.'
    ],
    correctIndex: 0,
    explanation: 'A standard Trie can waste memory on long paths with non-branching single children (in-degree 1, out-degree 1). A Radix Tree compresses these linear chains into a single edge containing the concatenated substring, bounding total nodes to at most 2K for K stored keys.',
    shortcutOrInsight: 'Radix Tree compresses unary paths into composite edge substrings.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q165',
    questionNumber: 165,
    section: 'DSA & Algorithms',
    domainTag: 'Bridges & Articulation Points',
    question: 'In an undirected connected graph G = (V, E), an edge (u, v) in a DFS tree is a Bridge (cut-edge) if and only if which condition holds?',
    options: [
      'low[v] > disc[u]',
      'low[v] ≥ disc[u]',
      'low[v] == disc[u]',
      'low[u] == disc[v]'
    ],
    correctIndex: 0,
    explanation: 'In DFS tree traversal of an undirected graph: low[v] > disc[u] means that there is NO back-edge from any descendant of v to u or any ancestor of u. Removing edge (u, v) completely disconnects the subtree rooted at v from the rest of the graph, making it a Bridge. (Note: For articulation point, condition is low[v] ≥ disc[u]).',
    shortcutOrInsight: 'Bridge condition: low[v] > disc[u]. Articulation point condition: low[v] ≥ disc[u] (for non-root).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q166',
    questionNumber: 166,
    section: 'DSA & Algorithms',
    domainTag: 'Dynamic Programming & Matrix Chain Multiplication',
    question: 'Given matrices A1 (10×30), A2 (30×5), and A3 (5×60). What is the minimum number of scalar multiplications required to compute the product A1 · A2 · A3?',
    options: [
      '4,500',
      '27,000',
      '18,000',
      '7,500'
    ],
    correctIndex: 0,
    explanation: 'Two parenthesizations:\nCase 1: (A1 · A2) · A3: Multiplications = 10×30×5 + 10×5×60 = 1,500 + 3,000 = 4,500.\nCase 2: A1 · (A2 · A3): Multiplications = 30×5×60 + 10×30×60 = 9,000 + 18,000 = 27,000.\nMinimum scalar multiplications = min(4500, 27000) = 4,500.',
    shortcutOrInsight: 'Matrix Chain DP: 10×30×5 + 10×5×60 = 1500 + 3000 = 4500.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q167',
    questionNumber: 167,
    section: 'DSA & Algorithms',
    domainTag: 'Graph Theory & Topological Sort',
    question: 'Why does Kahn\'s Algorithm for Topological Sorting fail to produce an ordering when a directed graph contains a cycle?',
    options: [
      'Nodes in a directed cycle always have in-degree ≥ 1, so they can never enter the queue of zero-in-degree nodes.',
      'It encounters a stack overflow exception.',
      'It cannot handle negative edge weights.',
      'It only operates on binary trees.'
    ],
    correctIndex: 0,
    explanation: 'Kahn\'s algorithm repeatedly dequeues nodes with in-degree 0 and removes their outgoing edges. Every vertex in a directed cycle has at least one incoming edge belonging to the cycle; none of them can ever reach in-degree 0. The output array contains fewer than V nodes, signaling a cycle.',
    shortcutOrInsight: 'Kahn\'s cycle detection: Nodes in a cycle never reach in-degree 0.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q168',
    questionNumber: 168,
    section: 'DSA & Algorithms',
    domainTag: 'String Algorithms & Rabin-Karp',
    question: 'In the Rabin-Karp string search algorithm using rolling hash with modulo M, what is the probability of a spurious hash collision between two distinct random strings of length m assuming uniform hash distribution?',
    options: [
      '1 / M',
      '1 / 2^m',
      'm / M',
      '1 / (M · m)'
    ],
    correctIndex: 0,
    explanation: 'Under the assumption that the rolling polynomial hash function distributes strings uniformly across the M hash buckets, the probability that two distinct strings hash to the same bucket is exactly 1 / M.',
    shortcutOrInsight: 'Uniform hash collision probability is simply 1 / (Modulus M).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q169',
    questionNumber: 169,
    section: 'DSA & Algorithms',
    domainTag: 'AVL Tree & Rotations',
    question: 'In an AVL tree, an insertion is made into the left subtree of the right child of node X, causing X to become unbalanced with balance factor -2. What sequence of rotations restores AVL balance at node X?',
    options: [
      'Right-Left (RL) Double Rotation',
      'Left-Right (LR) Double Rotation',
      'Single Left (L) Rotation',
      'Single Right (R) Rotation'
    ],
    correctIndex: 0,
    explanation: 'Insertion into Right child\'s Left subtree (RL case) requires a Right rotation on the right child followed by a Left rotation on node X (Right-Left Double Rotation).',
    shortcutOrInsight: 'RL imbalance -> Right-Left double rotation.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q170',
    questionNumber: 170,
    section: 'DSA & Algorithms',
    domainTag: 'Amortized Complexity & Dynamic Array',
    question: 'When a dynamic array (like std::vector or ArrayList) doubles its capacity whenever it becomes full, what is the amortized cost of each append (push_back) operation using the Banker\'s / Accounting method?',
    options: [
      'O(1) amortized',
      'O(log N) amortized',
      'O(N) amortized',
      'O(1/N) amortized'
    ],
    correctIndex: 0,
    explanation: 'Charge $3 for each push_back: $1 pays for the actual insertion, $1 pays for moving this element during the next reallocation, and $1 pays for moving an earlier element that has exhausted its credit. Total charges = 3 = O(1) per element.',
    shortcutOrInsight: 'Capacity doubling amortizes resize copies to strictly O(1) per append.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q171',
    questionNumber: 171,
    section: 'DSA & Algorithms',
    domainTag: 'Graph Theory & Minimum Spanning Tree',
    question: 'Kruskal\'s algorithm finds a Minimum Spanning Tree (MST) in a connected, weighted graph with V vertices and E edges. What is its time complexity when using a Disjoint Set Union (DSU) with union by rank and path compression?',
    options: [
      'O(E · log E) or O(E · log V)',
      'O(V^2)',
      'O(E · α(V))',
      'O(V · log E)'
    ],
    correctIndex: 0,
    explanation: 'Sorting the E edges takes O(E log E) time. Since E ≤ V^2, log E ≤ 2 log V, so sorting is O(E log V). The DSU operations take O(E · α(V)) time, where α is the inverse Ackermann function (nearly constant ≤ 4). The edge sorting step dominates, giving O(E log E) = O(E log V).',
    shortcutOrInsight: 'Sorting edges dominates: O(E log E) = O(E log V). DSU operations are nearly linear O(E α(V)).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q172',
    questionNumber: 172,
    section: 'DSA & Algorithms',
    domainTag: 'Dynamic Programming & 0/1 Knapsack',
    question: 'In the classic 0/1 Knapsack problem with N items and maximum weight capacity W, how can the dynamic programming space complexity be optimized from O(N · W) to O(W)?',
    options: [
      'By iterating weights backwards from W down to weight[i] in a 1D DP array',
      'By iterating weights forwards from 0 up to W in a 1D DP array',
      'By using a min-heap',
      'By sorting items by value-to-weight ratio'
    ],
    correctIndex: 0,
    explanation: 'In 0/1 knapsack, each item can be picked at most once. DP state DP[w] depends on DP[w - weight[i]] from the PREVIOUS item iteration. Iterating backwards from W down to weight[i] ensures we use the previous item\'s values before overwriting them. (Forward iteration solves Unbounded Knapsack).',
    shortcutOrInsight: 'Backward iteration in 1D array guarantees 0/1 item usage (prevents duplicate picks).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q173',
    questionNumber: 173,
    section: 'DSA & Algorithms',
    domainTag: 'Bit Manipulation & Popcount',
    question: 'Brian Kernighan\'s algorithm counts the number of set bits (1s) in an integer n. How does each iteration clear the lowest set bit?',
    options: [
      'n = n & (n - 1)',
      'n = n & (-n)',
      'n = n ^ (n - 1)',
      'n = n >> 1'
    ],
    correctIndex: 0,
    explanation: 'Subtracting 1 from n flips all bits after the least significant set bit (including that bit itself). Taking n & (n - 1) sets that lowest set bit to 0 while leaving all higher bits untouched. It loops exactly k times where k is the number of set bits.',
    shortcutOrInsight: '`n & (n - 1)` clears the lowest set bit in O(1) bitwise step.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q174',
    questionNumber: 174,
    section: 'DSA & Algorithms',
    domainTag: 'Tree Traversal & Morris Inorder',
    question: 'Morris Inorder Traversal traverses a binary tree in O(N) time using O(1) additional memory space by establishing what temporary connections?',
    options: [
      'Threaded pointers from the rightmost node of the left subtree back to the current node',
      'Parent pointers in every node',
      'Circular doubly linked lists at leaf nodes',
      'Hash map of visited pointers'
    ],
    correctIndex: 0,
    explanation: 'Morris traversal utilizes the null right child of the in-order predecessor (the rightmost node in the current node\'s left subtree). It points that null right pointer back to the current node (creating a temporary thread), visits the left child, and later dismantles the thread upon returning.',
    shortcutOrInsight: 'Morris traversal creates and removes temporary predecessor threads for O(1) space traversal.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q175',
    questionNumber: 175,
    section: 'DSA & Algorithms',
    domainTag: 'Divide and Conquer & Closest Pair of Points',
    question: 'In the Divide-and-Conquer algorithm for finding the closest pair of points in a 2D plane in O(N log N) time, what is the maximum number of points in the opposite strip that need to be compared against each point?',
    options: [
      '7 (at most 7 or 8 points within a d × 2d bounding rectangle)',
      'All points in the strip',
      'N / 2 points',
      '2 points'
    ],
    correctIndex: 0,
    explanation: 'Any two points in the same half must be at least distance d apart. In a rectangle of dimensions d × 2d centered on the dividing line, geometric packing dictates that at most 8 points (or 6-7 strictly) can be placed without any two points in the same half being closer than d. Thus, inner loop executes in constant O(1) time.',
    shortcutOrInsight: 'Geometric packing bound: At most 7-8 points fit in the d × 2d strip comparison box.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q176',
    questionNumber: 176,
    section: 'DSA & Algorithms',
    domainTag: 'Shortest Paths & All-Pairs',
    question: 'What is the time complexity of the Floyd-Warshall algorithm for all-pairs shortest paths on a graph with V vertices?',
    options: [
      'Θ(V^3)',
      'Θ(V^2 · log V)',
      'Θ(V · E)',
      'Θ(V^4)'
    ],
    correctIndex: 0,
    explanation: 'Floyd-Warshall uses three nested loops over all vertices k, i, j from 1 to V, updating dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]). The 3 nested loops execute exactly V × V × V = V^3 iterations: Θ(V^3).',
    shortcutOrInsight: '3 nested loops over V vertices = Θ(V^3) time.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q177',
    questionNumber: 177,
    section: 'DSA & Algorithms',
    domainTag: 'Heaps & Selection',
    question: 'Quickselect finds the k-th smallest element in an unsorted array of length N. What are its average-case and worst-case time complexities?',
    options: [
      'Average: O(N), Worst-Case: O(N^2)',
      'Average: O(N log N), Worst-Case: O(N log N)',
      'Average: O(N), Worst-Case: O(N log N)',
      'Average: O(log N), Worst-Case: O(N)'
    ],
    correctIndex: 0,
    explanation: 'Quickselect partitions the array like Quicksort, but recurses only into the partition containing index k: N + N/2 + N/4 + ... = 2N = O(N) average time. If worst-case pivots are chosen consistently (e.g. sorted array with first element as pivot), it degrades to O(N^2).',
    shortcutOrInsight: 'Quickselect: Recursing into 1 half forms geometric sum N + N/2 + N/4 = O(N) average.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q178',
    questionNumber: 178,
    section: 'DSA & Algorithms',
    domainTag: 'Disjoint Set Union & Ackermann',
    question: 'Why is the amortized time complexity per operation in Disjoint Set Union (DSU) with Path Compression AND Union by Rank written as O(α(N))?',
    options: [
      'α(N) is the inverse Ackermann function, which grows so astonishingly slowly that α(N) < 5 for any practical input N ≤ 2^(2^65536).',
      'α(N) is equal to log2(N).',
      'α(N) is a linear function of tree height.',
      'Because Ackermann\'s function is polynomial.'
    ],
    correctIndex: 0,
    explanation: 'Tarjan proved that combining union by rank with path compression yields an amortized bound of O(α(N)) per find/union operation. The Ackermann function A(k, j) grows hyper-exponentially; its functional inverse α(N) never exceeds 4 for any value expressible in the observable universe.',
    shortcutOrInsight: 'Inverse Ackermann α(N) ≤ 4 for all universe-scale values of N.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q179',
    questionNumber: 179,
    section: 'DSA & Algorithms',
    domainTag: 'String Algorithms & Z-Algorithm',
    question: 'In the Z-Algorithm, what does the array value Z[i] represent for a string S of length n?',
    options: [
      'The length of the longest substring starting at index i that is also a prefix of S',
      'The number of distinct palindromes ending at i',
      'The hash value of substring S[0..i]',
      'The shortest unique suffix ending at i'
    ],
    correctIndex: 0,
    explanation: 'For a string S, Z[i] is the length of the longest common prefix between S and the suffix of S starting at index i. That is, S[0...Z[i]-1] == S[i...i+Z[i]-1].',
    shortcutOrInsight: 'Z[i] = Longest Common Prefix of S and S[i..n-1].',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q180',
    questionNumber: 180,
    section: 'DSA & Algorithms',
    domainTag: 'Dynamic Programming & Edit Distance',
    question: 'In the Levenshtein Distance DP table where D[i][j] is the edit distance between s1[1..i] and s2[1..j], what is the recurrence when s1[i] != s2[j]?',
    options: [
      '1 + min(D[i-1][j], D[i][j-1], D[i-1][j-1])',
      'min(D[i-1][j], D[i][j-1])',
      '1 + D[i-1][j-1]',
      'D[i-1][j] + D[i][j-1]'
    ],
    correctIndex: 0,
    explanation: 'When characters mismatch, we consider three valid unit-cost operations: deletion (D[i-1][j] + 1), insertion (D[i][j-1] + 1), and substitution (D[i-1][j-1] + 1). Taking the minimum yields 1 + min(D[i-1][j], D[i][j-1], D[i-1][j-1]).',
    shortcutOrInsight: 'Levenshtein mismatch recurrence: 1 + min(delete, insert, substitute).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q181',
    questionNumber: 181,
    section: 'DSA & Algorithms',
    domainTag: 'Computational Geometry & Convex Hull',
    question: 'What is the optimal time complexity of finding the Convex Hull of N points in 2D space using Graham Scan or Monotone Chain?',
    options: [
      'O(N · log N)',
      'O(N^2)',
      'O(N)',
      'O(N · log^2 N)'
    ],
    correctIndex: 0,
    explanation: 'Points are sorted by x-coordinate (or polar angle around a pivot) in O(N log N) time. The stack-based hull construction processes each point in O(1) amortized time using cross products to test for counterclockwise turns. Sorting dominates: O(N log N).',
    shortcutOrInsight: 'Sorting dominates Convex Hull: O(N log N) time. Linear scan follows.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q182',
    questionNumber: 182,
    section: 'DSA & Algorithms',
    domainTag: 'Data Structures & Bloom Filter',
    question: 'A Bloom filter uses m bits and k independent hash functions to store n items. What guarantee does a Bloom filter make regarding membership queries?',
    options: [
      'Zero false negatives (if it says an element is NOT present, it is guaranteed not present); false positives are possible.',
      'Zero false positives; false negatives are possible.',
      'Zero false positives and zero false negatives.',
      'It stores the exact key-value pairs without loss.'
    ],
    correctIndex: 0,
    explanation: 'A Bloom filter guarantees NO False Negatives: If any of the k hash bits is 0, the item was definitely never inserted. However, hash collisions can cause all k bits to be 1 for an uninserted item, producing False Positives.',
    shortcutOrInsight: 'Bloom filter: False positives possible, False negatives strictly impossible.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q183',
    questionNumber: 183,
    section: 'DSA & Algorithms',
    domainTag: 'Tree Algorithms & Lowest Common Ancestor',
    question: 'Using Binary Lifting with an ancestor table `up[node][i]`, what are the preprocessing time and query time for finding the Lowest Common Ancestor (LCA) in a tree with N nodes?',
    options: [
      'Preprocessing: O(N log N), Query: O(log N)',
      'Preprocessing: O(N), Query: O(N)',
      'Preprocessing: O(N^2), Query: O(1)',
      'Preprocessing: O(N log N), Query: O(1)'
    ],
    correctIndex: 0,
    explanation: 'Binary lifting computes 2^i-th ancestors up to i = ceil(log2 N). Precomputing the N × log N table takes O(N log N) time. To find LCA, nodes are brought to the same depth and jump up powers of 2 in O(log N) query time.',
    shortcutOrInsight: 'Binary lifting: O(N log N) preprocessing enables O(log N) LCA queries.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q184',
    questionNumber: 184,
    section: 'DSA & Algorithms',
    domainTag: 'Sorting Algorithms & Lower Bound',
    question: 'Why is the theoretical lower bound for any comparison-based sorting algorithm Ω(N · log N)?',
    options: [
      'A permutation tree for N elements has N! leaves; a binary decision tree of height h has at most 2^h leaves, so 2^h ≥ N! => h ≥ log2(N!) = Ω(N log N).',
      'Because comparison operations take O(log N) time.',
      'Because memory buses are 64-bit.',
      'Because quicksort partitions in two halves.'
    ],
    correctIndex: 0,
    explanation: 'Any comparison sort can be modeled as a binary decision tree where each leaf is a unique permutation of the input (N! leaves). A binary tree of height h has at most 2^h leaves. Therefore 2^h ≥ N!. By Stirling\'s approximation, log2(N!) = N log2(N) - N log2(e) = Ω(N log N).',
    shortcutOrInsight: 'Decision tree leaves: 2^h ≥ N! => h ≥ log(N!) = Ω(N log N).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q185',
    questionNumber: 185,
    section: 'DSA & Algorithms',
    domainTag: 'Graph Theory & Eulerian Path',
    question: 'In a connected directed graph G, what is the necessary and sufficient condition for the existence of an Eulerian Circuit?',
    options: [
      'Every vertex has in-degree equal to its out-degree (in_degree(v) == out_degree(v)).',
      'Every vertex has an even degree.',
      'The graph must be a DAG.',
      'The graph must be bipartite.'
    ],
    correctIndex: 0,
    explanation: 'For a directed graph to have an Eulerian circuit (a closed trail visiting every edge exactly once), it must be strongly connected (ignoring isolated vertices) and every vertex must satisfy in_degree(v) == out_degree(v).',
    shortcutOrInsight: 'Directed Eulerian Circuit: in_degree(v) == out_degree(v) for all v.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q186',
    questionNumber: 186,
    section: 'DSA & Algorithms',
    domainTag: 'Dynamic Programming & Digit DP',
    question: 'In Digit Dynamic Programming, what is the role of the boolean state flag `isTight` (or `tight`) in the memoization signature `dp(pos, count, isTight, isLeadingZero)`?',
    options: [
      'It tracks whether the prefix formed so far strictly matches the prefix of the upper bound number, restricting the range of digits available at current position.',
      'It checks for integer overflow.',
      'It terminates recursion when reaching negative numbers.',
      'It caches the primes.'
    ],
    correctIndex: 0,
    explanation: 'When generating numbers up to upper bound R, if isTight is true, the current digit can only range from 0 up to R[pos]. If isTight is false (we picked a strictly smaller digit earlier), the current digit can freely range from 0 to 9.',
    shortcutOrInsight: '`isTight` enforces upper bound constraints on digits at each positional place.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q187',
    questionNumber: 187,
    section: 'DSA & Algorithms',
    domainTag: 'Data Structures & Skip Lists',
    question: 'What is the average time complexity for Search, Insert, and Delete operations in a Skip List with randomization factor p = 1/2?',
    options: [
      'O(log N) for all three operations',
      'O(1) Search, O(log N) Insert',
      'O(log N) Search, O(N) Insert',
      'O(N) for all operations'
    ],
    correctIndex: 0,
    explanation: 'A Skip List maintains hierarchical linked lists with probabilistic levels. Searching drops down levels when the target is smaller, traversing on average 1/p steps per level. With O(log N) levels, Search, Insert, and Delete all operate in O(log N) expected time.',
    shortcutOrInsight: 'Skip list: Probabilistic alternative to balanced BST with O(log N) average operations.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q188',
    questionNumber: 188,
    section: 'DSA & Algorithms',
    domainTag: 'Dynamic Programming & Coin Change',
    question: 'You are given coins = [1, 2, 5] and amount = 5. How many distinct combinations of coins sum up to amount 5 (Unbounded Coin Change II)?',
    options: [
      '4 combinations',
      '9 combinations',
      '5 combinations',
      '6 combinations'
    ],
    correctIndex: 0,
    explanation: 'Combinations: 1) 5; 2) 2+2+1; 3) 2+1+1+1; 4) 1+1+1+1+1. Total = 4 combinations. (Permutations would be 9, but combinations ignore order: outer loop over coins, inner loop over amounts from coin to target).',
    shortcutOrInsight: 'Coin Change Combinations: Outer loop coins, inner loop amounts => 4 ways.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q189',
    questionNumber: 189,
    section: 'DSA & Algorithms',
    domainTag: 'Graph Theory & Max Flow Min Cut',
    question: 'The Max-Flow Min-Cut theorem states that in any flow network, the maximum value of an s-t flow is equal to:',
    options: [
      'The minimum capacity over all s-t cuts separating source s from sink t',
      'The sum of all edge capacities in the network',
      'The number of vertices minus 1',
      'The maximum capacity of any single path from s to t'
    ],
    correctIndex: 0,
    explanation: 'The Max-Flow Min-Cut theorem is a fundamental duality: The maximum amount of flow passing from source to sink is strictly equal to the minimum total capacity of the edges that, if removed, would disconnect the source from the sink.',
    shortcutOrInsight: 'Max Flow = Min Cut capacity.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q190',
    questionNumber: 190,
    section: 'DSA & Algorithms',
    domainTag: 'Bit Manipulation & XOR Trick',
    question: 'An array contains 2N + 2 numbers where every number appears exactly twice except TWO distinct numbers x and y which appear only once. What bit manipulation property isolates x and y?',
    options: [
      'Compute total XOR sum = x ^ y; find any set bit k in this XOR sum; partition the original array into two groups based on bit k and XOR each group separately.',
      'Sum all numbers and subtract array size.',
      'Multiply all elements modulo 2.',
      'Use a 64-bit mask.'
    ],
    correctIndex: 0,
    explanation: 'All duplicate numbers cancel out (a ^ a = 0), leaving XOR sum S = x ^ y. Because x != y, S has at least one set bit (say the k-th bit). This k-th bit MUST differ between x and y. Partitioning the array based on whether the k-th bit is set separates x and y into two distinct groups where all other pairs remain together in their respective groups. XORing each group reveals x and y in O(N) time and O(1) space!',
    shortcutOrInsight: 'Partition by lowest set bit of (x ^ y) isolates both unique numbers in O(N) time O(1) space.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q191',
    questionNumber: 191,
    section: 'DSA & Algorithms',
    domainTag: 'Tree Decomposition & Heavy-Light Decomposition',
    question: 'In Heavy-Light Decomposition (HLD) of a tree with N vertices, what is the maximum number of heavy paths traversed on any simple path between any two vertices?',
    options: [
      'O(log N)',
      'O(√N)',
      'O(N)',
      'O(log^2 N)'
    ],
    correctIndex: 0,
    explanation: 'A heavy edge connects a node to its child with the largest subtree size. When a path moves across a light edge, the subtree size at least halves. Therefore, any path between two vertices encounters at most O(log N) light edges, and thus at most O(log N) heavy path segments.',
    shortcutOrInsight: 'HLD guarantees any tree path is partitioned into at most O(log N) contiguous paths.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q192',
    questionNumber: 192,
    section: 'DSA & Algorithms',
    domainTag: 'String Algorithms & Manacher\'s Algorithm',
    question: 'Manacher\'s Algorithm finds the longest palindromic substring in a string of length N in what time and space complexity?',
    options: [
      'Time: O(N), Space: O(N)',
      'Time: O(N log N), Space: O(1)',
      'Time: O(N^2), Space: O(N)',
      'Time: O(N^2), Space: O(1)'
    ],
    correctIndex: 0,
    explanation: 'By inserting dummy delimiter characters (e.g. #a#b#a#) and using symmetry about the current center and right boundary R, Manacher\'s algorithm expands palindromes while advancing the center monotonically, achieving linear O(N) time and O(N) space.',
    shortcutOrInsight: 'Manacher\'s algorithm finds all palindromic radii in optimal linear O(N) time.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q193',
    questionNumber: 193,
    section: 'DSA & Algorithms',
    domainTag: 'Graph Theory & Bipartite Checking',
    question: 'A graph G is Bipartite (2-colorable) if and only if it satisfies which graph-theoretic condition?',
    options: [
      'It contains NO odd-length cycles',
      'It contains no even-length cycles',
      'It is a directed acyclic graph',
      'Every vertex has degree 2'
    ],
    correctIndex: 0,
    explanation: 'Konig\'s theorem states that a graph is bipartite if and only if it contains no odd cycle. If an odd cycle exists, alternating 2 colors along the cycle will inevitably assign the same color to adjacent vertices.',
    shortcutOrInsight: 'Bipartite equivalence: No odd cycles.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q194',
    questionNumber: 194,
    section: 'DSA & Algorithms',
    domainTag: 'Data Structures & Treap',
    question: 'A Treap is a binary tree where each node has a key and a randomly assigned priority. What properties does it simultaneously maintain?',
    options: [
      'Binary Search Tree (BST) property on keys, and Min/Max Heap property on priorities',
      'AVL height balance on keys',
      'B-Tree fanout on priorities',
      'Complete binary tree on both'
    ],
    correctIndex: 0,
    explanation: 'The name Treap is a portmanteau of Tree + Heap. It maintains the BST property for its search keys (left < root < right) and the Heap property for its randomly assigned priorities (parent has higher priority than children). This yields expected O(log N) height without complex rebalancing.',
    shortcutOrInsight: 'Treap = Tree (BST keys) + Heap (random priorities).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q195',
    questionNumber: 195,
    section: 'DSA & Algorithms',
    domainTag: 'Dynamic Programming & Tree DP',
    question: 'In the Tree Vertex Cover problem (finding the minimum number of vertices such that every edge is incident to at least one chosen vertex), what are the transitions for `dp[u][0]` (u not chosen) and `dp[u][1]` (u chosen)?',
    options: [
      'dp[u][0] = Σ dp[v][1]; dp[u][1] = 1 + Σ min(dp[v][0], dp[v][1])',
      'dp[u][0] = Σ dp[v][0]; dp[u][1] = 1 + Σ dp[v][1]',
      'dp[u][0] = min(dp[v][0]); dp[u][1] = max(dp[v][1])',
      'dp[u][0] = 0; dp[u][1] = |V|'
    ],
    correctIndex: 0,
    explanation: 'If vertex u is NOT chosen in the vertex cover (dp[u][0]), all its children v MUST be chosen to cover edge (u, v): dp[u][0] = Σ dp[v][1]. If vertex u IS chosen (dp[u][1]), edges to children are covered, so each child v may either be chosen or not: dp[u][1] = 1 + Σ min(dp[v][0], dp[v][1]).',
    shortcutOrInsight: 'If parent is skipped, all children must be picked. If parent is picked, children can be min(picked, unpicked).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q196',
    questionNumber: 196,
    section: 'DSA & Algorithms',
    domainTag: 'String Algorithms & Suffix Automaton',
    question: 'For a string of length N, what is the maximum number of states (vertices) and transitions (edges) in its Suffix Automaton (SAM)?',
    options: [
      'States ≤ 2N - 1, Transitions ≤ 3N - 4',
      'States ≤ N^2, Transitions ≤ N^2',
      'States ≤ N log N, Transitions ≤ N log N',
      'States ≤ 2^N, Transitions ≤ 2^N'
    ],
    correctIndex: 0,
    explanation: 'The Suffix Automaton is a compact directed acyclic word graph (DAWG) that recognizes all suffixes of a string. Blumer et al. proved that for a string of length N ≥ 2, the number of states is strictly bounded by 2N - 1 and transitions by 3N - 4, constructible in linear O(N) time.',
    shortcutOrInsight: 'Suffix Automaton has linear bounds: ≤ 2N - 1 states and ≤ 3N - 4 transitions.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q197',
    questionNumber: 197,
    section: 'DSA & Algorithms',
    domainTag: 'Computational Complexity & Reductions',
    question: 'To prove that problem B is NP-Hard via polynomial-time reduction from known NP-Hard problem A, what direction must the reduction proceed?',
    options: [
      'Reduce A to B in polynomial time (A ≤_p B)',
      'Reduce B to A in polynomial time (B ≤_p A)',
      'Prove B can be solved in polynomial time',
      'Show B is equivalent to sorting'
    ],
    correctIndex: 0,
    explanation: 'To prove B is at least as hard as A, you must show that if you had an oracle for B, you could solve known NP-Hard problem A in polynomial time: A ≤_p B. (Reducing B to A only proves that B is no harder than A).',
    shortcutOrInsight: 'Reduction direction for NP-Hardness: Known NP-Hard A ≤_p New Problem B.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q198',
    questionNumber: 198,
    section: 'DSA & Algorithms',
    domainTag: 'Algorithm Design & Sliding Window Maximum',
    question: 'What data structure achieves strict O(N) total time for finding the maximum element in all sliding windows of size k across an array of length N?',
    options: [
      'Monotonic Double-Ended Queue (Deque) storing indices in decreasing order of element values',
      'Binary Search Tree',
      'Max Heap (Priority Queue)',
      'Sorted Array'
    ],
    correctIndex: 0,
    explanation: 'A monotonic decreasing deque stores indices. For each element, elements smaller than it are popped from the back (they can never be the max). Indices outside the current window [i - k + 1, i] are popped from the front. Front element is always the window maximum. Each index is pushed and popped at most once: O(N) total time.',
    shortcutOrInsight: 'Monotonic deque yields O(N) total time for sliding window maximum.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q199',
    questionNumber: 199,
    section: 'DSA & Algorithms',
    domainTag: 'Graph Theory & Topological Kahn Invariant',
    question: 'Which graph representation allows finding all immediate predecessor (in-degree) and successor (out-degree) vertices of any vertex v in O(degree(v)) time with O(V + E) memory?',
    options: [
      'Adjacency List with dual forward and reverse lists',
      'Adjacency Matrix',
      'Incidence Matrix',
      'Edge List'
    ],
    correctIndex: 0,
    explanation: 'Maintaining two adjacency lists—one for outgoing edges and one for incoming edges—allows retrieving all predecessors in O(in_deg(v)) and all successors in O(out_deg(v)) while using compact O(V + E) memory.',
    shortcutOrInsight: 'Dual adjacency lists (forward + reverse) achieve O(deg) queries in O(V + E) space.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q200',
    questionNumber: 200,
    section: 'DSA & Algorithms',
    domainTag: 'Data Structures & Union-Find Cycle Detection',
    question: 'Why can the standard Disjoint Set Union (DSU) structure NOT be used directly to detect cycles in DIRECTED graphs?',
    options: [
      'In directed graphs, an edge (u, v) does not imply connectivity from v to u; two paths merging at a vertex (cross-edges) do not necessarily form a directed cycle.',
      'DSU only works with numbers under 100.',
      'DSU takes exponential time on directed graphs.',
      'Directed graphs cannot have cycles.'
    ],
    correctIndex: 0,
    explanation: 'In directed graphs, two paths originating from a source can converge on a single node (e.g. S -> A -> C and S -> B -> C). In undirected DSU, joining C to B when already in the same set would falsely detect a cycle, even though no directed cycle exists. Cycle detection in directed graphs requires DFS 3-color states (White, Gray, Black).',
    shortcutOrInsight: 'DSU detects undirected cycles. Directed cycle detection requires DFS back-edges (Gray nodes).',
    difficulty: 'Very Hard'
  }
];
