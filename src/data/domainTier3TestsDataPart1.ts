import { FaangMockTest, FaangQuestion } from '../types';

// ============================================================================
// 1. DBMS & DISTRIBUTED NEWSQL ARCHITECTURE (TIER-3 / ELITE) (10 MCQs)
// Distributed Sharding, Paxos Consensus, Hybrid Logical Clocks, MVCC Vacuuming, Columnar Parquet & Jepsen Verification
// ============================================================================
export const DBMS_TIER3_QUESTIONS: FaangQuestion[] = [
  {
    id: 'dbms3-q1',
    testId: 'mock-dbms-sql-tier3',
    section: 'Distributed Consensus & Clocks',
    companyTag: 'Google Spanner / CockroachDB Labs',
    question: 'How does Google Spanner\'s TrueTime API guarantee Strict Serializable (External Consistency) without inter-datacenter communication for read transactions?',
    options: [
      'By utilizing atomic clocks and GPS receivers with a bounded uncertainty window ε (typically <7ms), and enforcing a "commit-wait" delay of 2ε before releasing commit timestamps so no subsequent read can see past timestamps',
      'By electing a single global master node in Iowa that timestamps all database writes and reads synchronously',
      'By synchronizing node clocks over NTP protocol every 50 microseconds using hardware interrupts',
      'By discarding time-based orderings and relying entirely on Lamport logical timestamps for read queries'
    ],
    correctIndex: 0,
    explanation: 'Spanner uses TrueTime which returns [t.earliest, t.latest] with bounded drift ε. To ensure external consistency, transaction T1 must choose a commit timestamp s ≥ t1.latest, and Spanner enforces a commit-wait rule: the coordinator waits until TrueTime.now().earliest > s (a wait of ~2ε) before committing. This guarantees that any transaction T2 started after T1 finished will definitively receive a timestamp s2 > s1, enabling lock-free snapshot reads at any timestamp across continents.',
    shortcutOrInsight: 'TrueTime Commit-Wait: Wait out the uncertainty window (2ε) so absolute time strictly equals causal order across all datacenters.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dbms3-q2',
    testId: 'mock-dbms-sql-tier3',
    section: 'Storage Internals & MVCC',
    companyTag: 'PostgreSQL Global Development / AWS Aurora',
    question: 'In PostgreSQL\'s multi-version concurrency control (MVCC) implementation, why does table bloat occur under heavy write/update workloads, and how does `VACUUM FULL` fundamentally differ from standard `VACUUM`?',
    options: [
      'Updates create new row versions (dead tuples) on disk; standard VACUUM marks dead tuple space as reusable in the Free Space Map (FSM) without releasing disk pages to the OS, whereas VACUUM FULL rewrites the entire table into a new file, reclaiming OS disk space but holding an AccessExclusiveLock',
      'Standard VACUUM deletes the table schema and recreates indexes, while VACUUM FULL only empties the transaction log (WAL)',
      'Table bloat is caused by index leaf splits; standard VACUUM shrinks indexes while VACUUM FULL ignores them',
      'PostgreSQL does not store dead tuples on disk; bloat refers only to WAL logs filling the disk partition'
    ],
    correctIndex: 0,
    explanation: 'In Postgres, UPDATE writes a brand new tuple with new xmin/xmax headers. When old tuples are no longer visible to any active transaction snapshot, they become dead tuples. Standard autovacuum cleans these pointers and updates the Free Space Map so future INSERTs/UPDATEs can reuse those blocks, but OS file size rarely shrinks. `VACUUM FULL` physically copies only live tuples to a brand-new data file and repacks it, releasing physical disk space to the OS, but it requires an exclusive lock that blocks all reads and writes.',
    shortcutOrInsight: 'Standard VACUUM = in-place reuse via Free Space Map (non-blocking). VACUUM FULL = complete table rewrite returning OS blocks (exclusive table lock).',
    difficulty: 'Very Hard'
  },
  {
    id: 'dbms3-q3',
    testId: 'mock-dbms-sql-tier3',
    section: 'Columnar Query Execution',
    companyTag: 'Snowflake / ClickHouse / Databricks',
    question: 'Why do analytical columnar engines (ClickHouse, Snowflake, DuckDB) execute vectorized filters (`WHERE status = 1 AND amount > 500`) order-of-magnitude faster than row-oriented RDBMSs?',
    options: [
      'They load contiguous fixed-width columnar data directly into CPU L1/L2 caches and apply SIMD (Single Instruction Multiple Data) register instructions (e.g. AVX-512) over arrays of 1024 values per batch without per-tuple virtual function call overhead',
      'Columnar engines store data in uncompressed plain ASCII text, avoiding decompression latency',
      'They bypass the operating system filesystem and stream queries directly into GPU VRAM over Wi-Fi',
      'Columnar databases only support 1000 rows maximum, keeping all data in registers'
    ],
    correctIndex: 0,
    explanation: 'Row-store engines process data tuple-by-tuple (Volcano iterator model), incurring virtual function dispatch and bad CPU cache locality because irrelevant columns are brought into cache lines. Vectorized columnar engines process batches of columnar data (e.g. 1024 or 2048 values) in tight loops, maximizing CPU instruction cache efficiency and enabling SIMD vectorization to evaluate predicates in parallel.',
    shortcutOrInsight: 'Vectorized Execution = Columnar contiguous RAM layout + Batch processing + SIMD AVX instructions + Zero virtual function call per row.',
    difficulty: 'Hard'
  },
  {
    id: 'dbms3-q4',
    testId: 'mock-dbms-sql-tier3',
    section: 'Distributed Sharding & Routing',
    companyTag: 'Citadel Securities / Stripe DB Infra',
    question: 'When implementing consistent hashing with virtual nodes (vnodes) for a distributed database ring of N physical storage nodes, what is the primary benefit of virtual nodes?',
    options: [
      'They balance key distribution uniformly across the ring, mitigate hotspot skews, and ensure that when a physical node fails, its workload is distributed proportionally across all remaining nodes rather than overwhelming its single immediate successor',
      'They encrypt every SQL query using dynamic RSA keys before routing',
      'They guarantee zero disk write latency by replicating writes exclusively to RAM',
      'They eliminate the need for replication factors in Cassandra and DynamoDB'
    ],
    correctIndex: 0,
    explanation: 'In simple consistent hashing, each node has 1 point on the hash ring. Non-uniform hash distributions cause severe data imbalances (hotspots), and when a node crashes, all of its keys shift onto its immediate clockwise successor, potentially cascading failures. Virtual nodes (assigning 100-500 vnodes per physical machine) ensure uniform statistical distribution of keys and spread the load across the entire cluster during node additions or removals.',
    shortcutOrInsight: 'Virtual Nodes (vnodes): Eliminate hot-spots on the hash ring and disperse failover load evenly to all surviving nodes.',
    difficulty: 'Hard'
  },
  {
    id: 'dbms3-q5',
    testId: 'mock-dbms-sql-tier3',
    section: 'Isolation Anomaly Verification',
    companyTag: 'Jepsen Distributed Systems Analysis',
    question: 'Which specific anomaly demonstrates that Snapshot Isolation (SI) does NOT provide full Serializability (Serializable Isolation), and how does it manifest in concurrent banking or medical on-call schedules?',
    options: [
      'Write Skew: Two concurrent transactions read overlapping datasets, verify invariant (e.g., at least one doctor on call: Alice and Bob), and then make disjoint updates (Alice goes off call in T1, Bob goes off call in T2) violating the global invariant because neither saw the other\'s uncommitted write',
      'Dirty Read: Reading uncommitted data that is subsequently rolled back',
      'Lost Update: Two transactions overwrite the exact same row simultaneously without lock checks',
      'Read Skew: Reading an inconsistent state during a single table scan'
    ],
    correctIndex: 0,
    explanation: 'Snapshot Isolation guarantees that each transaction sees a consistent snapshot taken at start time, preventing Dirty Reads, Non-Repeatable Reads, and Phantoms for single rows. However, when two transactions read overlapping data sets but write to disjoint keys (T1 updates Alice, T2 updates Bob), both commit successfully under first-committer-wins rule, yet the resulting state violates the business constraint. This is classic "Write Skew". Serializable Snapshot Isolation (SSI) detects such dangerous rw-antidependency cycles.',
    shortcutOrInsight: 'Write Skew = Read overlapping data, write to disjoint keys, violate cross-row constraint under Snapshot Isolation.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dbms3-q6',
    testId: 'mock-dbms-sql-tier3',
    section: 'SQL Window Internals & Aggregation',
    companyTag: 'Goldman Sachs Core Technology',
    question: 'Given a trade execution table `Trades(account_id, trade_time, volume)`, what is the exact semantic difference between `ROWS BETWEEN 5 PRECEDING AND CURRENT ROW` versus `RANGE BETWEEN INTERVAL \'5 MINUTE\' PRECEDING AND CURRENT ROW`?',
    options: [
      '`ROWS` counts physical row offsets regardless of timestamp ties or gaps (exactly 6 rows total), whereas `RANGE` evaluates logical value boundaries along the order expression (`trade_time`), encompassing all rows within the 5-minute temporal window including duplicate timestamps',
      '`ROWS` executes in O(N^2) time while `RANGE` executes in O(1) time',
      '`RANGE` only works on integer primary keys and cannot accept timestamp intervals',
      '`ROWS` requires an index while `RANGE` requires a full table partition scan'
    ],
    correctIndex: 0,
    explanation: 'In SQL window specifications, `ROWS` defines the sliding frame by physical row count (5 preceding rows + current row = at most 6 rows). `RANGE` defines the frame logically by value offset relative to the ORDER BY expression value. In time-series analytics, `RANGE BETWEEN INTERVAL \'5 MINUTE\' PRECEDING AND CURRENT ROW` includes every row whose timestamp is within 5 minutes of current row\'s timestamp, irrespective of how many rows exist in that interval.',
    shortcutOrInsight: 'Window Frames: ROWS = Physical count of rows. RANGE = Logical value distance along the ordered dimension.',
    difficulty: 'Hard'
  },
  {
    id: 'dbms3-q7',
    testId: 'mock-dbms-sql-tier3',
    section: 'B-Tree Locking Protocols',
    companyTag: 'Oracle Storage Kernel / MySQL InnoDB',
    question: 'Why do database index engines implement "Crabbing" (latch crabbing / lock coupling) during B+ Tree traversal instead of holding a shared lock on the root node until leaf insertion completes?',
    options: [
      'Crabbing traverses the tree by acquiring a latch on a child node, verifying that the child cannot split or merge, and immediately releasing the parent latch before descending, maximizing concurrency on tree upper levels',
      'Crabbing converts all tree nodes into doubly-linked lists on disk during writes',
      'Crabbing disables concurrency entirely and forces single-threaded execution',
      'Crabbing is an automated backup algorithm used only during nightly database shutdowns'
    ],
    correctIndex: 0,
    explanation: 'Holding a latch on the root node throughout leaf insertion would serialize all concurrent searches and updates across the entire database. Latch crabbing allows a writer to acquire the parent latch, then the child latch. If the child is "safe" (will not split because it has space), the writer can safely release the parent latch, freeing the upper levels for concurrent queries.',
    shortcutOrInsight: 'Latch Crabbing: Parent locked -> Child locked -> Child confirmed safe -> Parent latch released immediately.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dbms3-q8',
    testId: 'mock-dbms-sql-tier3',
    section: 'Distributed Replication Protocols',
    companyTag: 'Amazon DynamoDB / Apache Cassandra',
    question: 'In a distributed leaderless database (Dynamo model) with replication factor N = 3, read quorum R = 2, and write quorum W = 2, what condition guarantees strong consistency (strict read-your-writes), and what is the role of Read Repair?',
    options: [
      'R + W > N guarantees that the read set and write set must overlap by at least one replica containing the latest timestamp/version; Read Repair detects version discrepancies during client reads and asynchronously writes back the latest version to stale nodes',
      'R + W must equal N / 2, and Read Repair formats the disk on failed nodes',
      'Strong consistency requires W = 3 at all times, making R = 1 redundant',
      'Leaderless architectures cannot provide consistency under any quorum configuration'
    ],
    correctIndex: 0,
    explanation: 'By the Pigeonhole Principle, if R + W > N (here 2 + 2 = 4 > 3), every read quorum of size R will intersect with every write quorum of size W in at least one replica node. The client inspects version numbers (vector clocks or Lamport timestamps) from the replicas and returns the highest version. When discrepancies exist, Read Repair updates the lagging nodes with the latest data.',
    shortcutOrInsight: 'Quorum Invariant: R + W > N guarantees intersection of at least one node with the latest committed write.',
    difficulty: 'Medium'
  },
  {
    id: 'dbms3-q9',
    testId: 'mock-dbms-sql-tier3',
    section: 'Cost-Based Query Optimization',
    companyTag: 'Microsoft SQL Server Optimizer Team',
    question: 'When generating query plans for complex queries with 15+ table joins, why do modern query optimizers transition from dynamic programming (System-R algorithm) to Genetic Algorithms or Memo-based rule transformations (Cascades framework)?',
    options: [
      'The search space of possible join orders grows factorially O((2n-2)! / (n-1)!) as a Catalan number; dynamic programming exhausts memory and execution time, whereas Cascades and Genetic heuristics search the combinatorial space efficiently',
      'System-R cannot evaluate inner joins with integer keys',
      'Modern SQL prohibits queries with more than 5 tables',
      'Dynamic programming causes deadlocks in the query cache'
    ],
    correctIndex: 0,
    explanation: 'Join order enumeration is NP-hard. For n tables, the number of bushy join trees is (2n-2)! / (n-1)!. For n=15, this exceeds 10^10 plans. System-R dynamic programming works well up to ~8-10 tables. For larger join graphs, production optimizers switch to rule-based extensible search frameworks (like Volcano/Cascades) with memoization, branch-and-bound pruning, or randomized genetic search.',
    shortcutOrInsight: 'Join Search Explosion: Catalan number scaling forces optimizers to use Memoization (Cascades) and heuristic pruning beyond 10 tables.',
    difficulty: 'Hard'
  },
  {
    id: 'dbms3-q10',
    testId: 'mock-dbms-sql-tier3',
    section: 'Log Compaction & LSM Tuning',
    companyTag: 'RocksDB Team / ByteDance Infra',
    question: 'In Leveled Compaction of an LSM-Tree storage engine (e.g., RocksDB), what is the key invariant maintained across all SSTables within Level L (where L ≥ 1) that does NOT hold in Level 0 (L0)?',
    options: [
      'In Level L (L ≥ 1), key ranges of all SSTables are strictly non-overlapping, whereas in Level 0, SSTables are flushed directly from MemTable and can have overlapping key ranges',
      'Level L tables are stored in RAM while Level 0 is stored on NVMe flash',
      'Level L tables store uncompressed data while Level 0 tables are encrypted with AES-256',
      'Level 0 SSTables are sorted in reverse chronological order while Level L is unsorted'
    ],
    correctIndex: 0,
    explanation: 'When in-memory MemTables fill up, they are written sequentially to L0 as independent SSTables. Because each flush reflects an arbitrary time window of keys, different L0 SSTables routinely overlap in key ranges (requiring point lookups to search ALL L0 files). In contrast, compaction into Level 1 and higher merges files so that within any level L ≥ 1, each SSTable covers a distinct, disjoint key range, enabling fast binary search among SSTable metadata.',
    shortcutOrInsight: 'LSM Compaction Rule: L0 files have overlapping key ranges; Level 1+ files have strictly partitioned, non-overlapping key ranges.',
    difficulty: 'Hard'
  }
];

// ============================================================================
// 2. ADVANCED EXCEL & FINANCIAL MODELING (TIER-3 / ELITE) (10 MCQs)
// LAMBDA Recursion, Monte Carlo Simulations, M-Code Mashup Engine, Two-Way Data Tables & Financial Structuring
// ============================================================================
export const EXCEL_TIER3_QUESTIONS: FaangQuestion[] = [
  {
    id: 'excel3-q1',
    testId: 'mock-excel-analytics-tier3',
    section: 'Dynamic Array & Functional LAMBDA',
    companyTag: 'Goldman Sachs Investment Banking / Morgan Stanley M&A',
    question: 'How do you construct a recursive LAMBDA in modern Excel 365 to reverse a text string without VBA or helper columns?',
    options: [
      'Define a named formula `REVSTR = LAMBDA(s, IF(LEN(s)<=1, s, RIGHT(s,1) & REVSTR(LEFT(s, LEN(s)-1))))` and invoke `=REVSTR(A1)`',
      'Use `=REVERSE(A1)` which is a native function in Excel 2010',
      'Apply `=INDEX(SORTBY(MID(A1, SEQUENCE(LEN(A1)), 1), -1))` directly',
      'Use `=VLOOKUP(A1, REVERSE_TABLE, 2, FALSE)`'
    ],
    correctIndex: 0,
    explanation: 'Excel 365 LAMBDAs support first-class recursion if the formula is defined in the Name Manager under the exact name referenced in its body. The base case checks `IF(LEN(s)<=1, s, ...)`. The recursive step takes the last character `RIGHT(s,1)` and appends the recursive evaluation of the remaining substring `REVSTR(LEFT(s, LEN(s)-1))`.',
    shortcutOrInsight: 'Excel Turing Completeness: Named LAMBDA with base-case check enables true functional recursion directly on grid cells.',
    difficulty: 'Very Hard'
  },
  {
    id: 'excel3-q2',
    testId: 'mock-excel-analytics-tier3',
    section: 'Financial Engineering & DCF Valuation',
    companyTag: 'J.P. Morgan Private Equity',
    question: 'In corporate Leveraged Buyout (LBO) and DCF modeling, why is the `XIRR` and `XNPV` function pair universally mandated over standard `IRR` and `NPV`?',
    options: [
      '`XIRR` and `XNPV` accept exact arbitrary calendar dates for each cash flow, accommodating leap years and irregular transaction timings, whereas standard `NPV` assumes strictly uniform periodic intervals and incorrectly discounts the initial period 0 cash outflow',
      '`XNPV` automatically converts currencies using real-time FX rates from the Federal Reserve',
      'Standard `NPV` has a hardcoded limit of 100 rows of cash flows',
      '`XIRR` guarantees an analytical solution without iterative numerical approximations'
    ],
    correctIndex: 0,
    explanation: 'Classic `=NPV(rate, value1, value2...)` in Excel assumes every cash flow occurs at the end of equal-length periods (e.g. exactly 1 year apart), and discounting starts at t=1 (period 0 must be added outside the function). `XNPV(rate, values, dates)` calculates exact daily discounting: `values / (1 + rate)^((date - date0)/365)`. Similarly, `XIRR` handles irregular funding rounds and exits on exact dates.',
    shortcutOrInsight: 'M&A Rule: Never use NPV for non-uniform timeline deals. XNPV/XIRR calculate exact day-count discounting.',
    difficulty: 'Hard'
  },
  {
    id: 'excel3-q3',
    testId: 'mock-excel-analytics-tier3',
    section: 'Sensitivity & What-If Analysis',
    companyTag: 'McKinsey & Company Corporate Finance',
    question: 'When setting up a Two-Way Sensitivity Data Table (`Data -> What-If Analysis -> Data Table`) evaluating Project NPV across 5 WACC scenarios and 5 Terminal Growth scenarios, what must be placed in the top-left intersection cell of the table matrix?',
    options: [
      'A direct cell reference (`=B15`) pointing to the primary output formula being analyzed (e.g., the NPV calculation)',
      'The average WACC percentage formatted as a decimal',
      'The text label "Sensitivity Matrix"',
      'A `=SUM()` formula encompassing the row and column variable headers'
    ],
    correctIndex: 0,
    explanation: 'In Excel Two-Way Data Tables, the top-left cell of the matrix MUST contain the formula or a direct link (`=B15`) to the model output cell being recalculated. The column input cell corresponds to the vertical parameter list and the row input cell corresponds to the horizontal parameter list. Excel repeatedly injects the variable values and populates the table via internal iterative recalculation.',
    shortcutOrInsight: 'Two-Way Data Table Rule: Top-left cell = Formula link to target KPI. Row input = Column header variable; Column input = Row header variable.',
    difficulty: 'Medium'
  },
  {
    id: 'excel3-q4',
    testId: 'mock-excel-analytics-tier3',
    section: 'Power Query & Advanced M-Code',
    companyTag: 'BlackRock Data Operations',
    question: 'In Power Query M-Code, what is the architectural difference between `Table.Buffer(Source)` and a standard lazy transformation step?',
    options: [
      '`Table.Buffer` forcibly evaluates the table immediately and pins the entire dataset into RAM, preventing subsequent query steps from re-evaluating external data sources or re-triggering expensive database queries in loop operations',
      '`Table.Buffer` writes the table directly to the host operating system pagefile on SSD',
      '`Table.Buffer` disables all column filters and type casting',
      '`Table.Buffer` exports the data into an external Microsoft Access database'
    ],
    correctIndex: 0,
    explanation: 'Power Query is lazy by default: steps are not computed until needed, and steps that loop or join can inadvertently cause the Mashup Engine to requery external databases multiple times. `Table.Buffer()` forces immediate execution of the current state and caches the table in local memory, vastly accelerating subsequent lookups, joins, or row-by-row transformations.',
    shortcutOrInsight: 'Power Query Optimization: Use Table.Buffer() on dimension/lookup tables before executing nested loops or heavy merges to prevent query re-evaluation.',
    difficulty: 'Hard'
  },
  {
    id: 'excel3-q5',
    testId: 'mock-excel-analytics-tier3',
    section: 'Dynamic Matrix & Vector Math',
    companyTag: 'Citadel Quant Research',
    question: 'Given an array of asset weights in `A1:A5` and an asset covariance matrix in `C1:G5`, which single Excel 365 formula computes the total portfolio variance `w^T * Σ * w`?',
    options: [
      '`=MMULT(MMULT(TRANSPOSE(A1:A5), C1:G5), A1:A5)`',
      '`=SUMPRODUCT(A1:A5, C1:G5)`',
      '`=COVARIANCE.P(A1:A5, C1:G5)`',
      '`=MATRIX.MULT(A1:A5, C1:G5)`'
    ],
    correctIndex: 0,
    explanation: 'Portfolio variance in matrix algebra is computed as the product of row vector `w^T` (1x5), covariance matrix `Σ` (5x5), and column vector `w` (5x1). In Excel, `TRANSPOSE(A1:A5)` produces a 1x5 array. Inner `MMULT(TRANSPOSE(A1:A5), C1:G5)` yields a 1x5 result vector. Outer `MMULT(..., A1:A5)` multiplies this 1x5 vector by the 5x1 column vector, producing the exact scalar portfolio variance.',
    shortcutOrInsight: 'Matrix Portfolio Variance: Double MMULT with TRANSPOSE executes `w^T * Σ * w` in a single vectorized calculation.',
    difficulty: 'Very Hard'
  },
  {
    id: 'excel3-q6',
    testId: 'mock-excel-analytics-tier3',
    section: 'Circular References & Debt Sweeps',
    companyTag: 'Evercore Restructuring & LBO',
    question: 'Why do sophisticated investment banking financial models intentionally contain circular references between Interest Expense, Cash Balance, and Debt Revolver, and how is stability managed?',
    options: [
      'Average cash balance determines interest earned, which determines net income, ending cash, and the need for revolver borrowing; stability is managed by enabling "Iterative Calculation" with Maximum Iterations (e.g. 100) and Maximum Change (0.001), supplemented by a "Circuit Breaker" toggle switch',
      'Circular references are always accidental errors and indicate a broken workbook that cannot be saved',
      'Excel automatically sends email alerts to auditors whenever a circular loop is saved',
      'Circular references are required by SEC regulations to randomize corporate earnings reports'
    ],
    correctIndex: 0,
    explanation: 'In dynamic LBO and project finance models, ending cash is needed to calculate average debt/cash balances, which generate interest income/expense, which in turn recalculates net income and ending cash. To solve this simultaneous equation, modelers enable "Iterative Calculations" in Excel Options and include a boolean "Circular Breaker" cell (`IF(Circuit_Breaker=1, 0, Calculated_Interest)`) to break the loop if divergence occurs.',
    shortcutOrInsight: 'LBO Circularity: Iterative calculation solves the mutual dependency between interest expense and revolver balance; a breaker switch prevents `#NUM!` crashes.',
    difficulty: 'Very Hard'
  },
  {
    id: 'excel3-q7',
    testId: 'mock-excel-analytics-tier3',
    section: 'Dynamic Scanning & Running Accumulators',
    companyTag: 'Amazon Corporate Analytics',
    question: 'How does the Excel 365 helper function `SCAN(initial_value, array, lambda)` fundamentally differ from `REDUCE(initial_value, array, lambda)`?',
    options: [
      '`SCAN` outputs an array containing every intermediate accumulator value (such as a running cumulative sum or compound interest trajectory), whereas `REDUCE` collapses the entire array and outputs only the single final aggregated scalar',
      '`SCAN` only works on text strings while `REDUCE` only works on numbers',
      '`REDUCE` sorts the array in descending order before applying the lambda',
      '`SCAN` is limited to arrays with fewer than 10 rows'
    ],
    correctIndex: 0,
    explanation: 'Both `SCAN` and `REDUCE` iteratively apply a two-argument lambda `LAMBDA(accumulator, current_value, ...)` across an input array. `REDUCE` returns only the single final value of the accumulator. `SCAN` returns an array of identical shape to the input, displaying the accumulator\'s state at every successive step (e.g., `=SCAN(0, A1:A10, LAMBDA(acc, val, acc + val))` produces a running total column).',
    shortcutOrInsight: 'Excel Functional Arrays: REDUCE collapses to 1 scalar; SCAN yields the full array of running intermediate accumulations.',
    difficulty: 'Medium'
  },
  {
    id: 'excel3-q8',
    testId: 'mock-excel-analytics-tier3',
    section: 'Monte Carlo Simulation',
    companyTag: 'Bridgewater Associates Risk Management',
    question: 'How do risk analysts generate normally distributed random variables with mean μ and standard deviation σ in an Excel Monte Carlo simulation?',
    options: [
      '`=NORM.INV(RAND(), μ, σ)`',
      '`=NORM.DIST(RAND(), μ, σ, TRUE)`',
      '`=RANDBETWEEN(μ - σ, μ + σ)`',
      '`=STDEV.S(RANDARRAY(1000, 1, μ, σ))`'
    ],
    correctIndex: 0,
    explanation: 'The Box-Muller / Inverse Transform Sampling technique generates random variables from a target distribution by taking uniform random numbers U ~ [0,1) via `RAND()` and feeding them into the inverse cumulative distribution function (quantile function). In Excel, `NORM.INV(probability, mean, standard_dev)` maps uniform probabilities to exact Gaussian random variates.',
    shortcutOrInsight: 'Inverse CDF Method: Feed RAND() into NORM.INV() to generate normally distributed Monte Carlo stochastic variates.',
    difficulty: 'Medium'
  },
  {
    id: 'excel3-q9',
    testId: 'mock-excel-analytics-tier3',
    section: 'Data Model & Relationships',
    companyTag: 'Deloitte Enterprise Technology',
    question: 'In an Excel Power Pivot Data Model, what dangerous modeling defect is created if a user creates bidirectional cross-filtering between two Fact tables through a shared Dimension table without role-playing dimensions?',
    options: [
      'Ambiguous filter paths that can cause circular relationship errors, incorrect aggregation results, and severe Cartesian product memory spikes',
      'The Excel file automatically downgrades to .XLS format',
      'All dates in the model are converted to Unix timestamps',
      'Excel deletes the Power Pivot model without warning'
    ],
    correctIndex: 0,
    explanation: 'Cross-filtering bidirectionally across multiple fact tables through shared dimensions creates ambiguous paths in the DAX semantic graph. The engine cannot determine which path to follow to propagate filters, leading to unpredictable totals, unexpected cross-fact filtering, and potential calculation loops.',
    shortcutOrInsight: 'Tabular Architecture: Maintain strict 1-to-many single-directional filtering from Dimension to Fact. Use USERELATIONSHIP() for inactive paths.',
    difficulty: 'Hard'
  },
  {
    id: 'excel3-q10',
    testId: 'mock-excel-analytics-tier3',
    section: 'Advanced Error Handling & Validation',
    companyTag: 'PwC Forensic Accounting',
    question: 'In forensic financial audits, why is `=AGGREGATE(9, 6, Range)` preferred over `=SUBTOTAL(9, Range)` or `=SUM(Range)`?',
    options: [
      '`AGGREGATE` with function code 9 (SUM) and option 6 specifically ignores error values (`#N/A`, `#VALUE!`, `#DIV/0!`) while continuing to sum all valid numbers, preventing a single corrupted cell from propagating errors across the entire reporting sheet',
      '`AGGREGATE` automatically verifies vendor bank accounts against fraud databases',
      '`SUBTOTAL` cannot calculate sums on ranges larger than 100 cells',
      '`AGGREGATE` converts all negative amounts to zero'
    ],
    correctIndex: 0,
    explanation: 'Standard `=SUM()` immediately halts and returns an error if even a single cell contains `#N/A` or `#DIV/0!`. `SUBTOTAL` can ignore hidden rows or other nested subtotals, but it still fails on cell errors. `AGGREGATE(9, 6, Range)` evaluates SUM (code 9) while option 6 explicitly instructs Excel to ignore error values, ensuring clean rollup reporting.',
    shortcutOrInsight: 'Forensic Accounting: AGGREGATE(9, 6, ...) sums valid numbers while ignoring nested errors and hidden rows.',
    difficulty: 'Hard'
  }
];

// ============================================================================
// 3. POWER BI & DAX INTELLIGENCE (TIER-3 / ELITE) (10 MCQs)
// DirectLake Architecture, Calculation Groups, Expanded Tables, XMLA Endpoints & Advanced Virtual Relationship Modifiers
// ============================================================================
export const POWERBI_TIER3_QUESTIONS: FaangQuestion[] = [
  {
    id: 'pbi3-q1',
    testId: 'mock-powerbi-dax-tier3',
    section: 'DirectLake & Microsoft Fabric Architecture',
    companyTag: 'Microsoft Fabric Core Engineering',
    question: 'How does the "DirectLake" mode in Microsoft Fabric and Power BI Premium fundamentally surpass both "DirectQuery" and "Import" modes for enterprise lakehouses?',
    options: [
      'It reads Delta-Parquet files natively directly from OneLake storage into the VertiPaq memory cache without executing intermediate SQL query translation (DirectQuery) and without requiring scheduled data copy/refresh jobs (Import)',
      'It loads all Power BI reports directly into the client\'s web browser GPU memory',
      'It eliminates the need for DAX by forcing all calculations into Python code',
      'It permanently caches all queries in Microsoft Excel spreadsheets'
    ],
    correctIndex: 0,
    explanation: 'Import mode provides ultra-fast in-memory VertiPaq performance, but requires data duplication and latency-heavy scheduled refresh. DirectQuery queries source databases on the fly, introducing translation latency and slow SQL execution. DirectLake bridges this by loading parquet column chunks directly from OneLake storage into the VertiPaq engine on-demand without data movement or query translation.',
    shortcutOrInsight: 'DirectLake Innovation = Import-level VertiPaq speed directly on Delta Lake storage with zero refresh latency.',
    difficulty: 'Very Hard'
  },
  {
    id: 'pbi3-q2',
    testId: 'mock-powerbi-dax-tier3',
    section: 'Expanded Tables & Context Transition',
    companyTag: 'Enterprise DNA / MAQ Software',
    question: 'In DAX tabular modeling theory, what is an "Expanded Table", and why does using an entire table parameter inside `CALCULATETABLE` or `FILTER` often cause unexpected filter overwrite bugs?',
    options: [
      'An expanded table includes not only the base table\'s columns but also all columns from every table on the 1-side of existing relationships; filtering an expanded table inadvertently places filters on all related lookup dimensions, clearing existing dimension filters',
      'Expanded tables are virtual tables created exclusively during matrix visual exports',
      'Expanded tables only exist in DirectQuery and disappear in Import mode',
      'Expanded tables duplicate all rows for each visual measure'
    ],
    correctIndex: 0,
    explanation: 'In the Tabular model, every table is conceptually expanded to include all related tables reachable via many-to-one relationships. When you write `CALCULATE([Sales], FILTER(Sales, ...))`, you pass the expanded `Sales` table to the filter context, which inadvertently overwrites existing active filter contexts on Product, Customer, and Date dimensions. Best practice is to filter specific individual columns: `FILTER(ALL(Sales[Category]), ...)`.',
    shortcutOrInsight: 'DAX Rule: Filter columns, not entire expanded tables! Filtering entire fact tables wipes out active dimension context.',
    difficulty: 'Very Hard'
  },
  {
    id: 'pbi3-q3',
    testId: 'mock-powerbi-dax-tier3',
    section: 'Calculation Groups & Precedence',
    companyTag: 'Slalom Consulting / Avanade',
    question: 'When implementing Time Intelligence using Calculation Groups in Tabular Editor, what is the role of "Precedence", and how does it prevent mathematical errors when combining Currency Conversion with Year-to-Date (YTD) logic?',
    options: [
      'Precedence defines the execution order when multiple calculation items apply simultaneously; setting Currency Conversion to a higher precedence ensures the YTD sum is calculated first in local currency before being converted at the appropriate exchange rate',
      'Precedence determines which user role can access the Power BI workspace',
      'Precedence controls the visual rendering order in Power BI Mobile layouts',
      'Precedence is an automatic cache cleaning frequency measured in seconds'
    ],
    correctIndex: 0,
    explanation: 'When multiple Calculation Groups (e.g. "Time Intelligence" and "Currency Conversion") affect the same cell, DAX must decide which calculation item wraps the other. Precedence is an integer property. The calculation item with the higher precedence wraps the calculation item with the lower precedence (`CALCULATE(HigherPrecedence, LowerPrecedence)`). In financial models, summing YTD sales first and then applying currency conversion requires higher precedence on Currency Conversion.',
    shortcutOrInsight: 'Calculation Group Precedence: Higher number executes OUTSIDE (wraps around) lower number calculations.',
    difficulty: 'Hard'
  },
  {
    id: 'pbi3-q4',
    testId: 'mock-powerbi-dax-tier3',
    section: 'Virtual Relationships & Granularity',
    companyTag: 'Amazon AWS Analytics',
    question: 'When analyzing budget targets recorded at Month-level granularity against actual sales recorded at Day-level granularity, which DAX pattern correctly applies the Month filter to Budgets without creating physical bi-directional relationships?',
    options: [
      '`CALCULATE([Budget Amount], TREATAS(VALUES(\'Date\'[YearMonth]), \'Budget\'[YearMonth]))`',
      '`CALCULATE([Budget Amount], ALL(\'Date\'))`',
      '`CALCULATE([Budget Amount], CROSSFILTER(\'Date\'[Date], \'Budget\'[Date], Both))`',
      '`SUMX(\'Budget\', [Budget Amount] / 30)`'
    ],
    correctIndex: 0,
    explanation: 'When dimensions and facts share different granularities, creating a physical relationship between Date (Day) and Budget (Month) is invalid or forces many-to-many ambiguity. `TREATAS` applies the currently filtered values of `Date[YearMonth]` directly as an active virtual filter context on `Budget[YearMonth]` with high internal VertiPaq efficiency, avoiding the overhead of physical relationships.',
    shortcutOrInsight: 'TREATAS: Injects virtual lineage and filter context across tables of mismatched granularities without physical schema links.',
    difficulty: 'Hard'
  },
  {
    id: 'pbi3-q5',
    testId: 'mock-powerbi-dax-tier3',
    section: 'Incremental Refresh & Partitioning',
    companyTag: 'Walmart Global Tech',
    question: 'How does Power BI configure Incremental Refresh for a 500-million row fact table, and what is the mandatory requirement for the parameters in Power Query?',
    options: [
      'Two DateTime parameters named `RangeStart` and `RangeEnd` must be defined in Power Query and used to filter the date column; Power BI Service automatically partitions historical data into immutable year/month partitions and refreshes only the dynamic active window',
      'The source database must be configured with an Excel driver',
      'The fact table must be converted to a CSV file and stored in SharePoint',
      'Parameters must be named `StartDate` and `EndDate` and formatted as text'
    ],
    correctIndex: 0,
    explanation: 'Power BI Incremental Refresh strictly requires two parameters of type DateTime with exact case-sensitive names: `RangeStart` and `RangeEnd`. When published to the service, the service automatically splits the table into historical archived partitions (which are never re-queried, saving hours of processing) and active sliding partitions that refresh during scheduled runs.',
    shortcutOrInsight: 'Incremental Refresh Invariant: Parameters must be exact DateTime named `RangeStart` and `RangeEnd` with query folding enabled.',
    difficulty: 'Hard'
  },
  {
    id: 'pbi3-q6',
    testId: 'mock-powerbi-dax-tier3',
    section: 'VertiPaq Engine Optimization',
    companyTag: 'SQLBI / Tabular Optimizer Labs',
    question: 'When optimizing a bloated Power BI data model using DAX Studio and VertiPaq Analyzer, which column characteristic is the single greatest contributor to high RAM consumption?',
    options: [
      'High Cardinality (number of distinct unique values, such as timestamps with milliseconds or unique GUID IDs), which inflates dictionary size and breaks run-length encoding (RLE) compression',
      'The number of rows in the table (regardless of column contents)',
      'The font formatting applied to column headers in report view',
      'Using integer data types instead of text strings'
    ],
    correctIndex: 0,
    explanation: 'VertiPaq column storage relies on dictionary encoding, bit-packing, and Run-Length Encoding (RLE). A high-cardinality column (like a DateTime down to seconds, or a GUID transaction ID) has millions of unique values. This generates a massive hash dictionary and destroys RLE compression efficiency. Splitting DateTime into separate Date and Hour columns routinely reduces model size by 80-90%.',
    shortcutOrInsight: 'VertiPaq Golden Rule: Cardinality kills performance! Split Date and Time, remove GUIDs, and drop unneeded high-cardinality columns.',
    difficulty: 'Medium'
  },
  {
    id: 'pbi3-q7',
    testId: 'mock-powerbi-dax-tier3',
    section: 'Row-Level Security (RLS) & Performance',
    companyTag: 'Target Corporate Security / CIBC',
    question: 'Why does implementing Dynamic Row-Level Security (RLS) with bidirectional relationships across multiple dimension tables cause severe report visual slowdowns across large user bases?',
    options: [
      'Dynamic RLS injects complex subquery filters into every visual query and disables the VertiPaq internal memory query cache for users, forcing complete engine re-evaluations under active user identity contexts',
      'RLS converts all database queries to plain text HTTP GET requests',
      'Power BI limits RLS to 5 users total per capacity',
      'RLS requires visual reports to re-render in 30fps video format'
    ],
    correctIndex: 0,
    explanation: 'In standard Power BI, identical visual queries from different users hit the VertiPaq aggregate memory cache for instant retrieval. When RLS is applied, queries are evaluated under the caller\'s specific security filter context (e.g. `USERPRINCIPALNAME()`). The engine cannot reuse the global cache across different users, and bidirectional filter paths compound the complexity of every single visual query.',
    shortcutOrInsight: 'RLS Architecture: RLS disables shared memory query caching. Keep RLS filter rules on small, 1-to-many dimensions to maintain speed.',
    difficulty: 'Hard'
  },
  {
    id: 'pbi3-q8',
    testId: 'mock-powerbi-dax-tier3',
    section: 'Composite Models & Aggregations',
    companyTag: 'Uber Freight Analytics',
    question: 'In Power BI Composite Models, what is an "Aggregation Table", and how does the engine decide between routing a DAX measure to the in-memory Import aggregation versus the underlying DirectQuery source?',
    options: [
      'An Aggregation Table stores pre-aggregated data (e.g. Sales by Month and Store) in fast Import memory; if a report visual requests metrics at or above that granularity, the engine automatically hits the cache, only falling back to DirectQuery for raw transaction-level drillthroughs',
      'An Aggregation table is a temporary table created in browser local storage',
      'Aggregation tables require users to manually select between cache or live data via slicers',
      'Aggregation tables only work on static Excel workbooks'
    ],
    correctIndex: 0,
    explanation: 'User-defined aggregations in Composite Models allow trillions of source rows to remain in cloud data warehouses (Snowflake, BigQuery) while common high-level queries (summaries by month, region, category) are served from in-memory Import aggregation tables. The query optimizer transparently rewrites queries to hit the aggregation table if compatible; users never know whether data came from cache or DirectQuery.',
    shortcutOrInsight: 'Automatic Aggregations: Power BI serves high-level queries from lightning-fast VertiPaq cache and falls back to DirectQuery only for granular row details.',
    difficulty: 'Hard'
  },
  {
    id: 'pbi3-q9',
    testId: 'mock-powerbi-dax-tier3',
    section: 'Context Transition Hazards in Iterators',
    companyTag: 'Cognizant / Infosys BI Architecture',
    question: 'What happens when a naked measure `[Total Sales]` is referenced inside an iterator function such as `SUMX(Customer, [Total Sales])`?',
    options: [
      'DAX automatically wraps the measure in an implicit `CALCULATE()`, triggering Context Transition that converts the current row context of `Customer` into an equivalent filter context, which can cause quadratic slowdowns if executed over millions of rows',
      'DAX throws a syntax compilation error because measures cannot be nested inside iterators',
      'The measure evaluates only once for the first row and repeats that value for all rows',
      'The row context is destroyed and all customer filters are completely cleared'
    ],
    correctIndex: 0,
    explanation: 'In DAX, every measure reference is implicitly wrapped in `CALCULATE()`. Inside an iterator like `SUMX(Customer, [Total Sales])`, this triggers Context Transition on every single row: the current row\'s attributes become filter context. While intended, doing this over millions of rows forces millions of separate filter context calculations, causing massive performance degradation.',
    shortcutOrInsight: 'Context Transition in Iterators: `[Measure]` inside `SUMX` = implicit `CALCULATE()`. Over large tables, use pre-calculated columns or vectorized DAX.',
    difficulty: 'Very Hard'
  },
  {
    id: 'pbi3-q10',
    testId: 'mock-powerbi-dax-tier3',
    section: 'XMLA Endpoints & ALM Toolkit',
    companyTag: 'Accenture Cloud Solutions',
    question: 'Why do enterprise Power BI development teams utilize XMLA Endpoints and ALM Toolkit for model deployment rather than uploading `.PBIX` files through the web portal?',
    options: [
      'XMLA read/write endpoints permit code-first schema deployment, differential partition deployments, automated CI/CD pipeline integration via Tabular Model Scripting Language (TMSL), and granular Git version control without uploading giant data binaries',
      'XMLA endpoints automatically convert Power BI models into Oracle databases',
      'Uploading PBIX files is prohibited by Microsoft security terms',
      'XMLA endpoints eliminate the requirement for Power BI Premium licensing'
    ],
    correctIndex: 0,
    explanation: 'Enterprise semantic models in Power BI Premium act as Analysis Services tabular databases accessible via XMLA endpoints. This allows DevOps teams to use tools like ALM Toolkit, Tabular Editor, and Git to deploy schema-only changes (TMDL/TMSL metadata) in seconds, trigger partition-level refreshes, and merge branch pull requests without uploading gigabyte-sized `.pbix` binaries.',
    shortcutOrInsight: 'Enterprise BI CI/CD: XMLA endpoints decouple data from metadata, enabling automated schema deployments and Git version control.',
    difficulty: 'Medium'
  }
];

// ============================================================================
// 4. ETHICAL HACKING & ADVANCED RED TEAMING (TIER-3 / ELITE) (10 MCQs)
// Active Directory Kerberoasting, EDR Unhooking, CI/CD Pipeline Poisoning, Kernel Exploitation & Cloud IAM Escalation
// ============================================================================
export const ETHICAL_HACKING_TIER3_QUESTIONS: FaangQuestion[] = [
  {
    id: 'hack3-q1',
    testId: 'mock-ethical-hacking-tier3',
    section: 'Active Directory Exploitation',
    companyTag: 'Mandiant / CrowdStrike Red Team',
    question: 'How does a Kerberoasting attack operate against a Microsoft Active Directory domain, and why does it require zero administrative privileges to initiate?',
    options: [
      'Any valid authenticated domain user can request a Kerberos Ticket Granting Service (TGS) ticket for any Service Principal Name (SPN); the ticket is encrypted with the service account\'s NTLM password hash, allowing the attacker to extract and crack it offline with Hashcat',
      'The attacker floods the Domain Controller with SMB packets to force an unauthenticated administrator password reset',
      'It exploits a buffer overflow in Kerberos port 88 to write executable shellcode into domain memory',
      'It requires the attacker to physically steal the NTDS.dit file from the server rack'
    ],
    correctIndex: 0,
    explanation: 'Kerberos allows any authenticated domain user (even low-privilege guest/contractor accounts) to query LDAP for accounts with registered SPNs (e.g. `MSSQLSvc/host.corp.com`) and request a TGS ticket. The ticket payload is encrypted with the service account\'s secret key (derived from its password). The attacker extracts the ticket from memory (using Mimikatz or Rubeus) and conducts offline dictionary/brute-force attacks without generating alerts on the domain controller.',
    shortcutOrInsight: 'Kerberoasting: Legitimate TGS requests for SPNs -> Extract encrypted ticket -> Crack service password offline with zero DC alert noise.',
    difficulty: 'Very Hard'
  },
  {
    id: 'hack3-q2',
    testId: 'mock-ethical-hacking-tier3',
    section: 'EDR Evasion & Windows Internals',
    companyTag: 'SentinelOne Research / Palo Alto Unit 42',
    question: 'How do sophisticated malware and offensive implants bypass modern Endpoint Detection and Response (EDR) user-mode API hooking in `ntdll.dll`?',
    options: [
      'By reading `ntdll.dll` directly from disk into memory to replace hooked memory bytes (unhooking), or by executing direct/indirect syscalls with dynamic SSN (System Service Number) resolution (e.g., Hell\'s Gate / Halos Gate) to jump straight into kernel mode',
      'By encrypting the executable with a password that the EDR cannot decrypt',
      'By changing the file extension from `.exe` to `.pdf` before launching',
      'By running the payload inside an unprivileged guest browser window'
    ],
    correctIndex: 0,
    explanation: 'EDR agents inject a DLL into user processes and overwrite the start of critical NT API functions in `ntdll.dll` (like `NtAllocateVirtualMemory`) with a `JMP` instruction to inspect arguments. Advanced operators bypass this by either (1) restoring the clean `.text` section from disk (unhooking) or (2) reading the SSN directly from unhooked neighboring stubs and issuing `syscall` instructions directly, bypassing user-mode EDR inspection entirely.',
    shortcutOrInsight: 'EDR Bypass: Direct Syscalls (Hell\'s Gate) and DLL Unhooking bypass user-mode trampolines and transition directly to the kernel.',
    difficulty: 'Very Hard'
  },
  {
    id: 'hack3-q3',
    testId: 'mock-ethical-hacking-tier3',
    section: 'Cloud IAM & AWS Lateral Movement',
    companyTag: 'AWS Security / Netflix Cloud Defense',
    question: 'An attacker discovers SSRF on an EC2 instance. The instance metadata service uses IMDSv2. If the application forwards arbitrary HTTP headers but strips custom headers, why does IMDSv2 successfully thwart the credential theft?',
    options: [
      'IMDSv2 requires initiating a `PUT` request with a mandatory `X-aws-ec2-metadata-token-ttl-seconds` header to obtain a session token, which must be passed in subsequent `GET` requests; basic SSRF primitives limited to GET requests or unable to inject custom headers cannot acquire the token',
      'IMDSv2 encrypts all metadata credentials with the AWS root master password',
      'IMDSv2 completely blocks all HTTP access and allows only SSH connections',
      'IMDSv2 requires biometric fingerprint confirmation from the AWS console'
    ],
    correctIndex: 0,
    explanation: 'IMDSv1 allowed simple `GET http://169.254.169.254/latest/meta-data/iam/security-credentials/role`, making it trivial to exploit via basic SSRF. IMDSv2 is session-oriented: the client MUST send a `PUT` request with `X-aws-ec2-metadata-token-ttl-seconds: 21600` to retrieve a cryptographically signed session token. Most common SSRF bugs cannot issue PUT requests or inject custom request headers, neutralizing the vector.',
    shortcutOrInsight: 'IMDSv2 Defense: Token acquisition requires a PUT request with custom TTL header, rendering standard GET-based SSRF vectors powerless.',
    difficulty: 'Hard'
  },
  {
    id: 'hack3-q4',
    testId: 'mock-ethical-hacking-tier3',
    section: 'CI/CD Supply Chain Poisoning',
    companyTag: 'SolarWinds Post-Incident Red Team',
    question: 'In GitHub Actions CI/CD workflows, how does an "Untrusted Pull Request to `pull_request_target`" vulnerability lead to repository secret theft and arbitrary code execution in production?',
    options: [
      '`pull_request_target` triggers in the context of the base branch and has read/write access to repository secrets and write permissions; if the workflow checks out untrusted code from the fork (`github.event.pull_request.head.sha`) and executes `npm install` or scripts, the attacker\'s code runs with full repository secrets',
      'It forces GitHub servers to email the administrator\'s SSH key to the committer',
      '`pull_request_target` disables Git commit signing across the entire organization',
      'It allows attackers to clone private repositories without any token authentication'
    ],
    correctIndex: 0,
    explanation: 'Standard `pull_request` runs with restricted permissions and no secrets access. In contrast, `pull_request_target` runs in the context of the main target branch and has access to repository secrets. If a developer mistakenly checks out the PR\'s head commit (`actions/checkout` with `ref: ${{ github.event.pull_request.head.sha }}`) and executes build scripts, malicious code submitted by an external attacker executes in an environment with full production secrets.',
    shortcutOrInsight: 'CI/CD Security: Never check out untrusted fork code inside `pull_request_target` workflows that hold secret tokens.',
    difficulty: 'Very Hard'
  },
  {
    id: 'hack3-q5',
    testId: 'mock-ethical-hacking-tier3',
    section: 'Binary Exploitation & Memory Safety',
    companyTag: 'Google Project Zero',
    question: 'When exploiting a stack-based buffer overflow on a modern Linux x86_64 binary compiled with `NX` (No-Execute) and `ASLR` (Address Space Layout Randomization) enabled, what technique is required to achieve arbitrary code execution?',
    options: [
      'Return-Oriented Programming (ROP) to chain together existing code snippets ("gadgets") ending in `ret` instructions, combined with an initial memory leak to calculate the randomized libc base address',
      'Injecting NOP-sled shellcode directly onto the stack and jumping to the stack pointer ($rsp)',
      'Overwriting the BIOS boot sector via raw pointer arithmetic',
      'Disabling the CPU arithmetic logic unit using an invalid opcode exception'
    ],
    correctIndex: 0,
    explanation: 'NX prevents executing shellcode on the stack/heap. ASLR randomizes the base addresses of the stack, heap, and libraries. To bypass NX, attackers use ROP: chaining small instructions ("gadgets") already present in executable text segments. To bypass ASLR, operators first leak a known pointer (e.g. `puts` GOT address) to calculate the randomized libc base offset (`Base = Leaked_Address - Static_Symbol_Offset`).',
    shortcutOrInsight: 'Binary Exploit Flow: Memory Leak -> Calculate Libc Base -> Construct ROP Chain -> Invoke system("/bin/sh").',
    difficulty: 'Very Hard'
  },
  {
    id: 'hack3-q6',
    testId: 'mock-ethical-hacking-tier3',
    section: 'Active Directory Certificate Services (ADCS)',
    companyTag: 'SpecterOps / Certified Pre-Owned Research',
    question: 'In Active Directory Certificate Services (ADCS) exploitation (ESC1 vulnerability), what specific misconfiguration in a Certificate Template allows any standard domain user to escalate directly to Domain Admin?',
    options: [
      'The template grants `Enrollee Supplies Subject` (`CT_FLAG_ENROLLEE_SUPPLIES_SUBJECT`), requires no manager approval, and specifies an Extended Key Usage (EKU) supporting Client Authentication (e.g., Smart Card Logon or PKINIT)',
      'The certificate template uses an MD5 cryptographic signature hash',
      'The CA server has its firewall port 443 closed',
      'The domain controller clock is synchronized via NTP instead of GPS'
    ],
    correctIndex: 0,
    explanation: 'ESC1 occurs when an enterprise CA publishes a template with: (1) Client Authentication EKU, (2) low-privileged enrollment permissions, (3) no manager approval, and critically (4) `ENROLLEE_SUPPLIES_SUBJECT` set to True. An attacker can enroll for a certificate while specifying the SAN (Subject Alternative Name) as the Domain Administrator (`altName: administrator@corp.com`), receiving a valid certificate used to request a Kerberos TGT for the admin.',
    shortcutOrInsight: 'ADCS ESC1 Trap: Low-privilege enrollment + Client Auth EKU + Enrollee Supplies Subject = Instant Domain Compromise.',
    difficulty: 'Very Hard'
  },
  {
    id: 'hack3-q7',
    testId: 'mock-ethical-hacking-tier3',
    section: 'Web Application Advanced Attacks',
    companyTag: 'PortSwigger Web Security Research',
    question: 'How does HTTP Request Smuggling (CL.TE or TE.CL desynchronization) compromise front-end reverse proxies (e.g., Cloudflare, NGINX) and back-end application servers?',
    options: [
      'Discrepancies in how the front-end proxy and back-end server parse `Content-Length` versus `Transfer-Encoding: chunked` headers cause the back-end to treat the trailing boundary of a request as the start of the next user\'s request, poisoning request pipelines',
      'It injects SQL syntax into the SSL certificate handshake',
      'It causes the proxy to delete its routing table and forward all packets to the dark web',
      'It forces browsers to execute Cross-Site Scripting inside WebSocket payloads'
    ],
    correctIndex: 0,
    explanation: 'RFC 2616 specifies that if both Content-Length and Transfer-Encoding are present, Transfer-Encoding should take precedence. However, subtle parsing bugs (e.g., obfuscating `Transfer-Encoding: xchunked`) cause one server to prioritize Content-Length while the other prioritizes Transfer-Encoding. Unprocessed bytes remain in the back-end TCP socket buffer and prepend themselves to the next incoming user request.',
    shortcutOrInsight: 'Request Smuggling: Parser discrepancy in CL vs TE headers leads to TCP socket boundary desynchronization and request hijacking.',
    difficulty: 'Hard'
  },
  {
    id: 'hack3-q8',
    testId: 'mock-ethical-hacking-tier3',
    section: 'Lateral Movement & Pass-the-Hash',
    companyTag: 'Microsoft Threat Intelligence Center (MSTIC)',
    question: 'Why does the "Pass-the-Hash" (PtH) technique work over NTLMv2 authentication without ever requiring the adversary to crack the plaintext password?',
    options: [
      'The NTLM authentication challenge-response protocol utilizes the cryptographic hash of the password as the actual shared secret key for HMAC computation; the plaintext password is never required by the authentication protocol',
      'NTLM sends the password in plaintext over port 445',
      'Active Directory converts hashes to plaintext automatically when requested by local admin accounts',
      'Pass-the-Hash is an exploit in Microsoft Office macro engines'
    ],
    correctIndex: 0,
    explanation: 'In the NTLM challenge-response handshake, the server sends a random 8-byte challenge. The client computes the response by encrypting the challenge using the NTLM hash of the password as the DES/HMAC key. Because the plaintext password is mathematically irrelevant to this handshake, an attacker with the NTLM hash can impersonate the user natively across SMB, RPC, and WMI.',
    shortcutOrInsight: 'Pass-the-Hash: The NTLM hash IS the secret key in the challenge-response protocol; no plaintext needed.',
    difficulty: 'Medium'
  },
  {
    id: 'hack3-q9',
    testId: 'mock-ethical-hacking-tier3',
    section: 'Linux Privilege Escalation',
    companyTag: 'Offensive Security (OSCP/OSCE)',
    question: 'An unprivileged Linux user executes `sudo -l` and discovers: `(ALL : ALL) NOPASSWD: /usr/bin/find`. How does the attacker instantly escalate to an interactive root shell?',
    options: [
      '`sudo find . -exec /bin/sh \\; -quit`',
      '`sudo find --admin --password=root`',
      '`sudo find / -name root.txt`',
      '`sudo find --kill -9 1`'
    ],
    correctIndex: 0,
    explanation: 'Under GTFOBins principles, commands run via `sudo` inherit root privileges. The GNU `find` binary features an `-exec` parameter that executes arbitrary operating system commands as the executing user. Invoking `sudo find . -exec /bin/sh \\; -quit` launches a root shell (`/bin/sh`) immediately and exits the search.',
    shortcutOrInsight: 'GTFOBins: Binary sudo permissions with execution flags (find -exec, vim, less, awk) grant immediate root escalation.',
    difficulty: 'Medium'
  },
  {
    id: 'hack3-q10',
    testId: 'mock-ethical-hacking-tier3',
    section: 'Wireless & Hardware Physical Attacks',
    companyTag: 'Hak5 / DEF CON Red Team Village',
    question: 'In WPA2/WPA3-Enterprise networks utilizing 802.1X EAP-PEAP authentication, how does an "Evil Twin" rogue Access Point capture employee domain credentials?',
    options: [
      'By broadcasting the corporate SSID with higher signal strength and presenting a self-signed or untrusted certificate; misconfigured client devices without strict CA certificate validation connect and submit their inner MSCHAPv2 challenge-response hashes to the attacker',
      'By sending de-authentication frames that extract the router\'s master private key',
      'By cracking AES-CCMP encryption keys in real-time using rainbow tables',
      'By disabling WPA3 SAE dragonfly handshakes with high-frequency radio jamming'
    ],
    correctIndex: 0,
    explanation: 'EAP-PEAP wraps the inner authentication (typically EAP-MSCHAPv2) in an outer TLS tunnel. If the client device does not strictly validate the RADIUS server\'s SSL certificate and domain name, the client blindly accepts the rogue AP\'s TLS tunnel. The rogue AP then requests the MSCHAPv2 authentication handshake, capturing the domain username, challenge, and response for offline cracking.',
    shortcutOrInsight: 'Rogue AP Attack: Without strict RADIUS server certificate pinning on client endpoints, EAP-PEAP inner MSCHAPv2 hashes are captured.',
    difficulty: 'Hard'
  }
];

// ============================================================================
// 5. CYBER SECURITY & DEFENSIVE ARCHITECTURE (TIER-3 / ELITE) (10 MCQs)
// Post-Quantum Cryptography, NIST SP 800-207 Zero Trust, Cloud SIEM Detection Engineering, eBPF Threat Hunting & Supply Chain Governance
// ============================================================================
export const CYBER_SECURITY_TIER3_QUESTIONS: FaangQuestion[] = [
  {
    id: 'sec3-q1',
    testId: 'mock-cyber-security-tier3',
    section: 'Post-Quantum Cryptography (PQC)',
    companyTag: 'NIST Cryptographic Standards / Cloudflare Security',
    question: 'Why does Shor\'s Algorithm on a sufficiently powerful quantum computer break RSA and Elliptic Curve Cryptography (ECC), and which mathematical hardness problem underpins NIST\'s primary PQC standard (ML-KEM / Kyber)?',
    options: [
      'Shor\'s Algorithm finds the period of a function in polynomial time, solving discrete logarithms and integer factorization; ML-KEM is based on the hardness of the Module Learning With Errors (M-LWE) problem in structured Euclidean lattices',
      'Shor\'s Algorithm conducts brute-force key guessing at light speed; ML-KEM uses SHA-3 hashing with 4096-bit salts',
      'Quantum computers break symmetric AES-256 instantly, while RSA-4096 is mathematically immune',
      'Shor\'s Algorithm only breaks DES and MD5; ECC is fully quantum-resistant'
    ],
    correctIndex: 0,
    explanation: 'RSA relies on integer factorization and ECC relies on discrete logarithms over elliptic curves. Shor\'s quantum algorithm solves both problems in polynomial time O((log N)^3), rendering current public-key infrastructure obsolete. NIST selected ML-KEM (derived from CRYSTALS-Kyber) based on the Module Learning With Errors (M-LWE) problem over polynomial rings, which is believed to be NP-hard even for quantum computers.',
    shortcutOrInsight: 'Quantum Threat: Shor\'s algorithm destroys RSA/ECC via period-finding; PQC replaces it with Lattice-based cryptography (M-LWE).',
    difficulty: 'Very Hard'
  },
  {
    id: 'sec3-q2',
    testId: 'mock-cyber-security-tier3',
    section: 'Zero Trust Architecture (ZTA)',
    companyTag: 'NIST SP 800-207 / Google BeyondCorp',
    question: 'According to NIST SP 800-207 Zero Trust Architecture, what is the exact functional relationship between the Policy Decision Point (PDP) and the Policy Enforcement Point (PEP)?',
    options: [
      'The PDP (composed of Policy Engine and Policy Administrator) evaluates dynamic contextual telemetry (device health, user identity, threat intel) and decides whether to grant access; the PEP terminates the connection and applies the PDP\'s decision by granting, restricting, or terminating the session',
      'The PEP acts as an antivirus scanner while the PDP stores the corporate backup tapes',
      'The PDP and PEP are physical hardware firewall appliances installed at the perimeter network edge',
      'The PEP authorizes access unconditionally and notifies the PDP only after session completion'
    ],
    correctIndex: 0,
    explanation: 'Under NIST SP 800-207, the control plane is split into the Policy Decision Point (PDP) and Policy Enforcement Point (PEP). The PDP contains the Policy Engine (PE - brain evaluating rules against contextual signals) and Policy Administrator (PA - issues access commands). The PEP sits in the data path, intercepting and enforcing access decisions dynamically at the resource boundary.',
    shortcutOrInsight: 'NIST 800-207: PDP decides (evaluates dynamic contextual signals); PEP enforces (intercepts and gates traffic in the data path).',
    difficulty: 'Hard'
  },
  {
    id: 'sec3-q3',
    testId: 'mock-cyber-security-tier3',
    section: 'Detection Engineering & SIEM Analytics',
    companyTag: 'CrowdStrike Falcon OverWatch / Splunk',
    question: 'In modern Detection Engineering, what is the architectural difference between an Atomic Indicator of Compromise (IoC) detection and a Behavioral TTP (Tactics, Techniques, and Procedures) detection on the Pyramid of Pain?',
    options: [
      'Atomic IoCs (MD5 hashes, IP addresses) sit at the base of the pyramid and are trivial for adversaries to alter; Behavioral TTP detections (e.g. LSASS memory dumping, abnormal parent-child process relationships) sit at the apex and force attackers to completely re-engineer their tradecraft',
      'IoCs detect unknown zero-days while TTPs only detect historical malware from 1995',
      'Atomic IoCs require machine learning while TTPs use plain text regular expressions',
      'TTP detections are illegal under GDPR privacy regulations'
    ],
    correctIndex: 0,
    explanation: 'David Bianco\'s Pyramid of Pain demonstrates the cost inflicted on an adversary when their tools/indicators are detected. Hashes (Trivial) and IPs (Easy) are easily modified by recompiling code or rotating proxies. At the apex are TTPs (Tough): detecting the behavior (e.g. `lsass.exe` accessed by non-system binaries via `PROCESS_VM_READ`) breaks the attacker\'s entire methodology, forcing expensive redevelopment.',
    shortcutOrInsight: 'Pyramid of Pain: Hashes and IPs are trivial to rotate; detecting Behavioral TTPs causes maximum pain to threat actors.',
    difficulty: 'Hard'
  },
  {
    id: 'sec3-q4',
    testId: 'mock-cyber-security-tier3',
    section: 'Kernel Telemetry & eBPF Security',
    companyTag: 'Cilium / Datadog Security Labs',
    question: 'Why is eBPF (Extended Berkeley Packet Filter) increasingly preferred over traditional kernel modules (LKMs) or user-space audit daemons (`auditd`) for high-performance cloud-native threat monitoring?',
    options: [
      'eBPF runs verified sandboxed bytecode directly inside the Linux kernel at hook points without risk of kernel panic, capturing rich runtime context (syscalls, network socket lifecycles) with negligible CPU overhead and zero user-space context switching',
      'eBPF automatically replaces Linux kernel source code with Rust during boot',
      'eBPF is a hardware chip manufactured exclusively for Kubernetes servers',
      '`auditd` only supports 32-bit operating systems'
    ],
    correctIndex: 0,
    explanation: 'Traditional kernel modules risk crashing the kernel and are difficult to maintain across kernel updates. User-mode daemons like `auditd` incur severe context-switching overhead and can be overwhelmed or blinded by attackers. eBPF programs are verified by the kernel verifier before execution (guaranteeing memory safety and termination) and observe raw kernel events with sub-microsecond latency.',
    shortcutOrInsight: 'eBPF Advantage: Kernel verifier safety + In-kernel execution + Zero context switch + Deep contextual telemetry.',
    difficulty: 'Hard'
  },
  {
    id: 'sec3-q5',
    testId: 'mock-cyber-security-tier3',
    section: 'Hardware-Enforced Security & Enclaves',
    companyTag: 'Apple Platform Security / AWS Nitro Enclaves',
    question: 'How do Confidential Computing architectures (e.g., AWS Nitro Enclaves, AMD SEV-SNP, Intel SGX) protect data "in-use", and what role does Remote Attestation play?',
    options: [
      'Memory controllers encrypt CPU cache and RAM pages with hardware-managed keys so even root users or hypervisors cannot read plaintext memory; Remote Attestation provides a cryptographically signed hardware report proving the enclave\'s genuine origin and code measurement to external verifiers',
      'They physically disconnect the CPU from the motherboard during cryptographic operations',
      'Confidential computing eliminates the need for software code reviews',
      'Remote attestation transmits user passwords to the cloud vendor via SMS'
    ],
    correctIndex: 0,
    explanation: 'Data at rest is protected by disk encryption; data in transit is protected by TLS. Confidential Computing secures data in use (in CPU registers and RAM) by hardware memory encryption (e.g. AMD SEV-SNP). Remote Attestation allows a third party to verify a digital signature from the CPU hardware security module confirming that the enclave is executing the exact intended, un-tampered measurement hash before releasing secrets.',
    shortcutOrInsight: 'Confidential Computing: Data in-use memory encryption + Cryptographic Remote Attestation of enclave measurements.',
    difficulty: 'Very Hard'
  },
  {
    id: 'sec3-q6',
    testId: 'mock-cyber-security-tier3',
    section: 'Mutual TLS & Certificate Lifecycle',
    companyTag: 'Stripe Infrastructure Security',
    question: 'In an enterprise service mesh (e.g., Istio / Envoy), what prevents a compromised microservice with a stolen internal mTLS private key from impersonating other microservices across the cluster?',
    options: [
      'SPIFFE IDs embedded in the X.509 Subject Alternative Name (SAN) URI field bind the certificate strictly to a specific Service Account; authorization policies (AuthorizationPolicy) enforce fine-grained peer identity checks at each destination proxy',
      'Microservices do not use private keys; they use shared passwords stored in environment variables',
      'Internal mTLS certificates expire every 500 milliseconds',
      'The Linux kernel automatically deletes corrupted private keys'
    ],
    correctIndex: 0,
    explanation: 'In zero-trust service meshes, every workload receives a SPIFFE verifiable identity document (SVID) as an X.509 certificate. The SAN contains a URI like `spiffe://cluster.local/ns/prod/sa/payment-service`. The receiving Envoy sidecar proxy terminates TLS, inspects the client SPIFFE ID, and verifies against declarative authorization policies. Even if a pod\'s key is compromised, it can only impersonate its own specific identity.',
    shortcutOrInsight: 'SPIFFE/SPIRE: Cryptographically binds workload certificates to specific service accounts; peer proxies reject unauthorized identities.',
    difficulty: 'Hard'
  },
  {
    id: 'sec3-q7',
    testId: 'mock-cyber-security-tier3',
    section: 'Cryptographic Protocol Vulnerabilities',
    companyTag: 'OpenSSL Security Advisory',
    question: 'What is a "Bleichenbacher Padding Oracle Attack" against RSA PKCS#1 v1.5 encryption, and how did modern protocols neutralize it?',
    options: [
      'An attacker repeatedly submits modified ciphertexts to a server; by observing subtle timing differences or distinct error responses indicating whether decrypted data has valid PKCS#1 padding, the attacker recovers the plaintext without knowing the private key; neutralized by switching to RSA-OAEP or ECDHE',
      'It recovers the private key by measuring CPU heat with an infrared sensor',
      'It exploits a vulnerability in the USB keyboard controller',
      'It cracks RSA by generating random prime numbers in a while loop'
    ],
    correctIndex: 0,
    explanation: 'In 1998, Daniel Bleichenbacher demonstrated that if an RSA server reveals whether decrypted ciphertext adheres to the PKCS#1 v1.5 padding structure (`0x00 0x02 [non-zero bytes] 0x00 [data]`), the server acts as an adaptive chosen-ciphertext oracle. Within a few million queries, the attacker reconstructs the plaintext session key. Modern systems replaced it with RSA-OAEP (Optimal Asymmetric Encryption Padding) and eliminated RSA key exchange in TLS 1.3 in favor of ECDHE.',
    shortcutOrInsight: 'Bleichenbacher Oracle: Error feedback on PKCS#1 v1.5 padding reveals plaintext. TLS 1.3 completely removed RSA key exchange.',
    difficulty: 'Very Hard'
  },
  {
    id: 'sec3-q8',
    testId: 'mock-cyber-security-tier3',
    section: 'Software Supply Chain Security',
    companyTag: 'SLSA Framework / Google Open Source Security',
    question: 'What does SLSA (Supply-chain Levels for Software Artifacts) Level 3 compliance guarantee for an enterprise container build pipeline?',
    options: [
      'Builds run on an isolated, ephemeral, dedicated build platform where build steps cannot be tampered with by the project source code, and build provenance is non-falsifiable and cryptographically signed (e.g. via Sigstore Cosign)',
      'The software source code contains zero lines of JavaScript',
      'All developers write code exclusively on air-gapped laptops',
      'The application binary is guaranteed to have zero security vulnerabilities forever'
    ],
    correctIndex: 0,
    explanation: 'SLSA provides a framework for supply chain integrity. Level 3 requires: (1) Isolated build platforms (ephemeral containers where builds execute independently), (2) Source and build integrity, and (3) Non-falsifiable provenance: generated metadata recording exact repository commits, build parameters, and dependencies signed by an immutable builder key (e.g. GitHub Actions OIDC + Sigstore).',
    shortcutOrInsight: 'SLSA Level 3: Ephemeral isolated build runners + Non-falsifiable cryptographically signed build provenance.',
    difficulty: 'Hard'
  },
  {
    id: 'sec3-q9',
    testId: 'mock-cyber-security-tier3',
    section: 'Cloud Security Posture Management (CSPM)',
    companyTag: 'Wiz Research / Palo Alto Prisma Cloud',
    question: 'Why is an "Attack Path Analysis" graph engine superior to a traditional list of individual CVE vulnerabilities and misconfigurations in cloud environments?',
    options: [
      'It correlates toxic combinations: linking an exposed Internet-facing load balancer to an unpatched CVE on a VM that holds an over-privileged IAM instance profile with read access to an unencrypted S3 bucket holding PII, identifying true reachable risk versus isolated low-priority findings',
      'It automatically formats hard drives when vulnerabilities reach critical severity',
      'It replaces security analysts with static firewall rules',
      'It deletes AWS accounts with overdue security patches'
    ],
    correctIndex: 0,
    explanation: 'Traditional vulnerability scanners overwhelm teams with thousands of disconnected CVE alerts (e.g. an unpatched library in an isolated test environment with no credentials). Attack Path Analysis models the cloud environment as a directed graph (Identity, Network exposure, Vulnerability, Data). It surfaces the critical paths where an external attacker can chain weaknesses to compromise core business assets.',
    shortcutOrInsight: 'Toxic Combinations: Attack path graphs identify realistic exploitability chains (Internet Exposure -> CVE -> Cloud IAM -> Sensitive Data).',
    difficulty: 'Medium'
  },
  {
    id: 'sec3-q10',
    testId: 'mock-cyber-security-tier3',
    section: 'DNS Security & BGP Hijacking',
    companyTag: 'Cloudflare Zero Trust / Cisco Talos',
    question: 'How does Resource Public Key Infrastructure (RPKI) with Route Origin Authorization (ROA) protect global Internet traffic from malicious BGP route hijacking?',
    options: [
      'Regional Internet Registries (RIRs) issue cryptographically signed ROA certificates asserting which Autonomous System Number (ASN) is legitimately authorized to originate specific IP prefix routes, allowing BGP routers to drop invalid unauthorized route announcements',
      'It encrypts all BGP routing packets with AES-GCM across fiber cables',
      'It replaces IP addresses with blockchain wallet addresses',
      'It forces all internet traffic through a single global satellite proxy'
    ],
    correctIndex: 0,
    explanation: 'Border Gateway Protocol (BGP) historically trusted any route announcement, allowing rogue or accidental announcements to hijack traffic (redirecting cryptocurrency wallets or corporate traffic). RPKI binds IP address blocks to legitimate owner ASNs via Route Origin Authorizations (ROAs) signed by RIR cryptographic trust anchors. Internet routers validate incoming BGP updates and discard "Invalid" routes.',
    shortcutOrInsight: 'RPKI Defense: Cryptographically signs valid Origin ASNs for IP prefixes, dropping hijacked BGP route announcements.',
    difficulty: 'Hard'
  }
];

// ============================================================================
// EXPORT ALL 5 TIER-3 TESTS FOR PART 1
// ============================================================================
export const TIER3_MOCK_TESTS_PART1: FaangMockTest[] = [
  {
    id: 'mock-dbms-sql-tier3',
    title: 'Distributed NewSQL, Sharding & MVCC Storage Internals (Tier-3 Elite Assessment)',
    subtitle: '10 High-Bar Technical MCQs • 20 Minutes • TrueTime, LSM Compaction, Vectorized SIMD, Paxos Consensus & Write Skew',
    category: 'ENTERPRISE DOMAINS',
    companyTier: 'Tier-1 Elite Distributed Systems & Storage Engines',
    companies: ['Google Spanner', 'Snowflake', 'CockroachDB', 'Citadel'],
    scheduledDate: 'Tier-3 Elite Crucible • Slot DBMS-3 (Distributed Systems Architecture)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'dbms-tier3-master',
    badgeRewardName: 'Distributed NewSQL & Storage Engine Titan',
    badgeIcon: '🏛️',
    badgeGradient: 'from-amber-500 via-purple-700 to-slate-950',
    certificateTitle: 'Elite Distributed Database Architecture Credential',
    description: 'The definitive Tier-3 master assessment evaluating Google Spanner TrueTime commit-wait invariants, LSM-Tree leveled compaction, vectorized query execution via SIMD AVX-512, consistent hashing virtual nodes, and serializable snapshot isolation anomalies.',
    syllabusHighlights: [
      'Google Spanner TrueTime Bounded Uncertainty (2ε Commit-Wait)',
      'PostgreSQL MVCC Dead Tuple Bloat & VACUUM FULL Table Rewrites',
      'ClickHouse / Snowflake Vectorized SIMD Columnar Execution',
      'Consistent Hashing Virtual Nodes (vnodes) & Load Rebalancing',
      'Snapshot Isolation Write Skew & SSI rw-Antidependency Graphs',
      'SQL Window Physical ROWS vs Logical Temporal RANGE Specifications',
      'B+ Tree Latch Crabbing Protocols for Ultra-High Concurrency',
      'Dynamo Consensus Quorum Invariants (R + W > N) & Read Repair'
    ],
    questions: DBMS_TIER3_QUESTIONS
  },
  {
    id: 'mock-excel-analytics-tier3',
    title: 'Financial Modeling, Monte Carlo & Dynamic Matrix LAMBDA (Tier-3 Elite Assessment)',
    subtitle: '10 High-Bar Technical MCQs • 20 Minutes • Recursive LAMBDA, XNPV/XIRR Day Counts, Power Query Buffers & LBO Circularity',
    category: 'ENTERPRISE DOMAINS',
    companyTier: 'Tier-1 Elite Quantitative Finance & M&A Modeling',
    companies: ['Goldman Sachs', 'J.P. Morgan', 'BlackRock', 'McKinsey'],
    scheduledDate: 'Tier-3 Elite Crucible • Slot EXCEL-3 (Financial Engineering & Analysis)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'excel-tier3-master',
    badgeRewardName: 'Quantitative Financial Modeling & LAMBDA Architect',
    badgeIcon: '📈',
    badgeGradient: 'from-emerald-600 via-teal-800 to-slate-950',
    certificateTitle: 'Elite Financial Modeling & Advanced Analytics Credential',
    description: 'An elite Wall Street standard modeling crucible testing recursive named LAMBDAs, precise day-count XIRR/XNPV structuring, Two-Way Data Table matrix sensitivity, Table.Buffer Power Query M-Code caching, and LBO iterative circularity breakers.',
    syllabusHighlights: [
      'Recursive Named LAMBDAs for In-Cell String/Array Reversal',
      'Exact Calendar Day-Count Discounting with XNPV & XIRR',
      'Two-Way Sensitivity Data Table Top-Left Matrix Formula Binding',
      'Power Query M-Code Table.Buffer Memory Caching Strategies',
      'Portfolio Variance Matrix Algebra via Double MMULT & TRANSPOSE',
      'LBO Debt Revolver Circular Reference Sweeps & Iterative Solvers',
      'Running Accumulator Vectors via SCAN vs REDUCE Aggregators',
      'Monte Carlo Stochastic Modeling with Inverse Gaussian NORM.INV'
    ],
    questions: EXCEL_TIER3_QUESTIONS
  },
  {
    id: 'mock-powerbi-dax-tier3',
    title: 'Enterprise DirectLake, Tabular Schema & Advanced DAX Crucible (Tier-3 Elite Assessment)',
    subtitle: '10 High-Bar Technical MCQs • 20 Minutes • DirectLake Fabric, Calculation Groups Precedence, Expanded Tables & TREATAS',
    category: 'ENTERPRISE DOMAINS',
    companyTier: 'Tier-1 Enterprise Analytics & Semantic Architecture',
    companies: ['Microsoft Fabric', 'Amazon AWS', 'Walmart Tech', 'Uber'],
    scheduledDate: 'Tier-3 Elite Crucible • Slot PBI-3 (Enterprise Semantic Modeling)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'powerbi-tier3-master',
    badgeRewardName: 'Enterprise DirectLake & Semantic Model Architect',
    badgeIcon: '⚡',
    badgeGradient: 'from-amber-600 via-rose-700 to-indigo-950',
    certificateTitle: 'Elite Power BI Enterprise Semantic Architecture Credential',
    description: 'A master tier DAX and semantic modeling evaluation covering Microsoft Fabric DirectLake zero-refresh latency, Calculation Group execution precedence, expanded table filter overwrite hazards, TREATAS virtual lineage, and VertiPaq dictionary compression.',
    syllabusHighlights: [
      'Microsoft Fabric DirectLake Native Delta-Parquet Memory Loading',
      'Expanded Table Filter Context Hazards & Dimension Invalidation',
      'Calculation Groups Multi-Layer Precedence Wrapping Architecture',
      'Virtual Relationship Lineage via TREATAS for Mismatched Granularity',
      'Case-Sensitive RangeStart / RangeEnd Incremental Refresh Partitions',
      'VertiPaq Dictionary Encoding & High-Cardinality Compression Killers',
      'Dynamic Row-Level Security (RLS) Cache Invalidation Hazards',
      'Composite Model User-Defined Aggregation Routing Optimization'
    ],
    questions: POWERBI_TIER3_QUESTIONS
  },
  {
    id: 'mock-ethical-hacking-tier3',
    title: 'Active Directory Kerberoasting, Kernel Exploits & Cloud PenTesting (Tier-3 Elite Assessment)',
    subtitle: '10 High-Bar Technical MCQs • 20 Minutes • Kerberoasting, EDR Direct Syscalls, ADCS ESC1, IMDSv2 & ROP Chains',
    category: 'ENTERPRISE DOMAINS',
    companyTier: 'Tier-1 Elite Offensive Security & Red Teaming',
    companies: ['CrowdStrike', 'Mandiant', 'Google Project Zero', 'Palo Alto'],
    scheduledDate: 'Tier-3 Elite Crucible • Slot HACK-3 (Advanced Red Teaming & Exploitation)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'ethical-hacking-tier3-master',
    badgeRewardName: 'Offensive Security Red Team Operator',
    badgeIcon: '🥷',
    badgeGradient: 'from-red-600 via-purple-900 to-slate-950',
    certificateTitle: 'Elite Offensive Security & Red Team Operator Credential',
    description: 'An elite red teaming examination testing unprivileged Active Directory Kerberoasting, EDR unhooking via direct syscalls (Hell\'s Gate), AWS IMDSv2 session token mechanics, CI/CD pull_request_target poisoning, and ROP chain memory execution.',
    syllabusHighlights: [
      'Active Directory TGS Kerberoasting & Offline Ticket Cracking',
      'User-Mode EDR Unhooking & Direct Syscalls (Hell\'s Gate / Halos Gate)',
      'AWS IMDSv2 PUT Session Token SSRF Neutralization Mechanisms',
      'GitHub Actions pull_request_target Context Secret Poisoning',
      'Stack Binary Exploitation: ASLR Leak + NX Bypass via ROP Chains',
      'Active Directory Certificate Services (ADCS) ESC1 Privilege Escalation',
      'HTTP Request Smuggling CL.TE / TE.CL Socket Desynchronization',
      'Pass-the-Hash NTLM Challenge-Response Protocol Impersonation'
    ],
    questions: ETHICAL_HACKING_TIER3_QUESTIONS
  },
  {
    id: 'mock-cyber-security-tier3',
    title: 'Post-Quantum Cryptography, Zero-Trust Enclaves & Cloud Threat Hunting (Tier-3 Elite Assessment)',
    subtitle: '10 High-Bar Technical MCQs • 20 Minutes • NIST ML-KEM, SP 800-207 PDP/PEP, eBPF Telemetry, Confidential Nitro & RPKI',
    category: 'ENTERPRISE DOMAINS',
    companyTier: 'Tier-1 Elite Cyber Defense & Threat Intelligence',
    companies: ['Cloudflare', 'NIST Standards', 'Apple Security', 'Cisco Talos'],
    scheduledDate: 'Tier-3 Elite Crucible • Slot SEC-3 (Defensive Cyber Architecture)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'cyber-security-tier3-master',
    badgeRewardName: 'Post-Quantum Defense & Zero Trust Architect',
    badgeIcon: '🛡️',
    badgeGradient: 'from-cyan-600 via-blue-900 to-purple-950',
    certificateTitle: 'Elite Cyber Security & Defensive Architecture Credential',
    description: 'A master defensive cyber architecture assessment evaluating NIST post-quantum ML-KEM lattice cryptography, NIST SP 800-207 PDP/PEP Zero Trust mechanics, eBPF in-kernel threat detection, confidential Nitro enclaves, and RPKI BGP route validation.',
    syllabusHighlights: [
      'Shor\'s Quantum Algorithm vs NIST ML-KEM Module-LWE Lattices',
      'NIST SP 800-207 Zero Trust PDP Engine vs PEP Enforcer Architecture',
      'Detection Engineering: Pyramid of Pain TTPs vs Atomic IoCs',
      'In-Kernel eBPF Sandboxed Telemetry vs Traditional LKMs / auditd',
      'Confidential Computing: Data In-Use Encryption & Remote Attestation',
      'Service Mesh SPIFFE ID Verification in Mutual TLS Handshakes',
      'Bleichenbacher RSA PKCS#1 v1.5 Padding Oracle Elimination in TLS 1.3',
      'SLSA Level 3 Non-Falsifiable Build Provenance & RPKI BGP Route Defense'
    ],
    questions: CYBER_SECURITY_TIER3_QUESTIONS
  }
];
