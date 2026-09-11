import { FaangMockTest, FaangQuestion } from '../types';

// ============================================================================
// 1. DBMS & ENTERPRISE SQL MOCK TEST (10 MCQs)
// ACID, Normalization, B+ Trees, Isolation Levels, 2PL, Hash Joins, Window Functions
// ============================================================================
export const DBMS_MOCK_QUESTIONS: FaangQuestion[] = [
  {
    id: 'dbms-q1',
    testId: 'mock-dbms',
    section: 'Database Systems Architecture',
    companyTag: 'Oracle / Amazon RDS',
    question: 'In Write-Ahead Logging (WAL) and the ARIES recovery algorithm, which principle dictates when dirty pages can be written to disk versus when log records must be flushed?',
    options: [
      'A dirty data page may be flushed to disk only after the corresponding log record recording the update has been flushed to non-volatile storage (WAL protocol)',
      'Log records and data pages must always be flushed simultaneously in a single atomic operating system write call',
      'Data pages are continuously written to disk, and log records are generated in memory and saved only during checkpoint intervals',
      'The transaction commit record can be written to disk before previous undo/redo log entries are saved'
    ],
    correctIndex: 0,
    explanation: 'The fundamental Write-Ahead Logging (WAL) invariant states: (1) Before a dirty database buffer page can be written to disk, all log records detailing updates to that page must be flushed to stable storage (WAL protocol for Steal policy). (2) A transaction is not committed until all of its log records (including the commit record) are forced to stable storage (Force protocol).',
    shortcutOrInsight: 'WAL Rule: Log flushes precede Data Page flushes. ARIES guarantees Atomicity and Durability even under sudden power loss.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dbms-q2',
    testId: 'mock-dbms',
    section: 'Database Systems Architecture',
    companyTag: 'Microsoft SQL Server Team',
    question: 'Given a relational schema R(A, B, C, D, E) with functional dependencies: F = { A -> BC, CD -> E, B -> D, E -> A }. What is the highest normal form satisfied by schema R?',
    options: [
      '3NF (Third Normal Form)',
      'BCNF (Boyce-Codd Normal Form)',
      '2NF (Second Normal Form)',
      '1NF only'
    ],
    correctIndex: 0,
    explanation: 'Find candidate keys: (A)+ = {A,B,C,D,E} -> A is a candidate key. Since E -> A, (E)+ = {E,A,B,C,D} -> E is a key. Since CD -> E, (CD)+ = {C,D,E,A,B} -> CD is a key. Since B -> D, (BC)+ = {B,C,D,E,A} -> BC is a key. Candidate keys: {A, E, CD, BC}. Prime attributes: {A, B, C, D, E}. Because every attribute in R is a prime attribute (part of some candidate key), 3NF condition (for every X -> Y, either X is superkey or Y is prime) is trivially satisfied for all FDs! However, for B -> D, B is not a superkey, so BCNF is violated. Thus, highest normal form is 3NF.',
    shortcutOrInsight: 'If ALL attributes in a relation are prime attributes, the relation is GUARANTEED to be in 3NF, but not necessarily BCNF.',
    difficulty: 'Hard'
  },
  {
    id: 'dbms-q3',
    testId: 'mock-dbms',
    section: 'Database Systems Architecture',
    companyTag: 'Google Spanner / CockroachDB',
    question: 'Why do production relational database storage engines (such as MySQL InnoDB and PostgreSQL) overwhelmingly utilize B+ Trees rather than standard B-Trees for disk-backed indexing?',
    options: [
      'B+ Tree internal nodes store only keys (not full data records), maximizing node fanout and minimizing I/O depth, while doubly-linked leaf nodes enable O(log N + K) range scans without tree traversals',
      'B+ Trees guarantee that search operations run in strict O(1) time complexity by employing dynamic hash tables at internal nodes',
      'Standard B-Trees require O(N^2) memory during balance rebalancing and cannot be partitioned across multiple disk blocks',
      'B+ Trees completely eliminate the need for write locks during concurrency transactions'
    ],
    correctIndex: 0,
    explanation: 'In a B+ Tree, internal nodes store only routing keys and page pointers, which allows much higher fanout (e.g. 500-1000 keys per 16KB page) and keeps the tree shallow (typically height 3-4 for billions of rows). Data records or row pointers reside exclusively in leaf nodes, which are linked together in a bidirectional sequential list, making range queries (BETWEEN x AND y) lightning fast without recurring parent traversals.',
    shortcutOrInsight: 'B+ Tree advantage: Maximum fanout -> lowest disk I/O depth; chained leaves -> sequential disk-speed range scans.',
    difficulty: 'Hard'
  },
  {
    id: 'dbms-q4',
    testId: 'mock-dbms',
    section: 'Database Systems Architecture',
    companyTag: 'Stripe Database Reliability',
    question: 'In the ANSI SQL-92 standard isolation levels, which concurrency anomaly can occur under "REPEATABLE READ" isolation but is strictly prevented under "SERIALIZABLE" isolation?',
    options: [
      'Phantom Read (a transaction executes a range query twice and sees newly inserted or deleted rows committed by another concurrent transaction)',
      'Dirty Read (reading uncommitted data from a transaction that later rolls back)',
      'Non-Repeatable Read (reading the same row twice and observing updated attribute values committed by another transaction)',
      'Dirty Write (overwriting uncommitted updates from another transaction)'
    ],
    correctIndex: 0,
    explanation: 'Under Repeatable Read, row-level shared locks prevent existing rows from being modified or deleted by concurrent transactions (preventing Non-Repeatable Reads). However, predicate/range locks are not acquired on the gaps between rows, allowing concurrent transactions to insert new rows that match the query predicate (Phantom Reads). Serializable isolation eliminates Phantom Reads using gap locks, next-key locks, or serialization graphs.',
    shortcutOrInsight: 'Anomaly Hierarchy: Dirty Read -> Non-Repeatable Read -> Phantom Read -> Serialization Anomaly (Write Skew).',
    difficulty: 'Medium'
  },
  {
    id: 'dbms-q5',
    testId: 'mock-dbms',
    section: 'Database Systems Architecture',
    companyTag: 'Salesforce Core Infrastructure',
    question: 'Under the Strict Two-Phase Locking (Strict 2PL) protocol, what is the exact rule governing the release of acquired locks?',
    options: [
      'All exclusive (X) locks acquired by a transaction must be held until the transaction completes (commits or aborts)',
      'Both shared (S) and exclusive (X) locks must be released immediately after each SQL statement finishes execution',
      'Exclusive locks can be released anytime during the shrinking phase as long as no new locks are requested',
      'Shared locks must be held until the end of the transaction, but exclusive locks can be downgraded immediately'
    ],
    correctIndex: 0,
    explanation: 'Basic 2PL guarantees conflict serializability, but allows cascading aborts if transactions read data unlocked by uncommitted transactions. Strict 2PL requires that all exclusive (X) locks must be retained until the transaction terminates (Commit/Abort). Rigorous 2PL requires holding BOTH shared (S) and exclusive (X) locks until the transaction terminates.',
    shortcutOrInsight: 'Strict 2PL = Hold X-locks until Commit/Abort -> completely eliminates cascading rollbacks and guarantees recoverability.',
    difficulty: 'Hard'
  },
  {
    id: 'dbms-q6',
    testId: 'mock-dbms',
    section: 'Database Systems Architecture',
    companyTag: 'Snowflake / Databricks',
    question: 'When an enterprise SQL query optimizer evaluates an equality join (`A.id = B.id`) between relation A (10,000,000 unindexed rows) and relation B (20,000 rows), which join algorithm is generally selected as the most efficient?',
    options: [
      'Hash Join (Build an in-memory hash table on the smaller relation B, then probe it with relation A in a single streaming pass)',
      'Block Nested Loop Join (Iterating through all blocks of A and scanning all blocks of B repeatedly)',
      'Sort-Merge Join without indexes (Sorting 10 million rows on disk then merging)',
      'Cartesian Product Join with client-side filter evaluation'
    ],
    correctIndex: 0,
    explanation: 'A Hash Join is optimal for equi-joins between a large relation and a smaller relation without indexes. Phase 1 (Build): The optimizer loads the smaller relation B (20,000 rows) into an in-memory hash table keyed by join attribute. Phase 2 (Probe): The large relation A is streamed once; for each tuple, the hash table is probed in O(1) time. Total cost is O(|A| + |B|).',
    shortcutOrInsight: 'Hash Join rule: Build on the smaller table (fits in work_mem/RAM), probe with the large table. O(M + N) runtime.',
    difficulty: 'Medium'
  },
  {
    id: 'dbms-q7',
    testId: 'mock-dbms',
    section: 'Database Systems Architecture',
    companyTag: 'Uber Data Engineering OA',
    question: 'Given salaries: `[100000, 90000, 90000, 80000]`. What will be the outputs of `DENSE_RANK()`, `RANK()`, and `ROW_NUMBER()` for the salary `80000` when ordered by salary descending?',
    options: [
      'DENSE_RANK = 3, RANK = 4, ROW_NUMBER = 4',
      'DENSE_RANK = 4, RANK = 3, ROW_NUMBER = 4',
      'DENSE_RANK = 3, RANK = 3, ROW_NUMBER = 4',
      'DENSE_RANK = 4, RANK = 4, ROW_NUMBER = 3'
    ],
    correctIndex: 0,
    explanation: 'Row 1 (100000): DENSE_RANK = 1, RANK = 1, ROW_NUMBER = 1. Rows 2 & 3 (90000): DENSE_RANK = 2, RANK = 2, ROW_NUMBER = 2 & 3. Row 4 (80000): DENSE_RANK assigns the next consecutive integer (3). RANK skips positions for ties (1, 2, 2 -> next is 4). ROW_NUMBER strictly assigns unique sequence (4). Therefore: DENSE_RANK = 3, RANK = 4, ROW_NUMBER = 4.',
    shortcutOrInsight: 'Window Function Ranking: DENSE_RANK leaves NO gaps after ties (1, 2, 2, 3). RANK leaves gaps (1, 2, 2, 4).',
    difficulty: 'Medium'
  },
  {
    id: 'dbms-q8',
    testId: 'mock-dbms',
    section: 'Database Systems Architecture',
    companyTag: 'Amazon AWS Aurora',
    question: 'In transaction concurrency, how does the timestamp-based "Wound-Wait" deadlock prevention scheme handle a conflict where transaction T1 requests a lock currently held by transaction T2?',
    options: [
      'If T1 is older than T2 (Timestamp(T1) < Timestamp(T2)), T1 preempts (wounds) T2 and forces T2 to abort and rollback; otherwise, T1 waits',
      'If T1 is older than T2, T1 is forced to abort and restart with a new timestamp',
      'Both transactions enter a shared wait queue until a background graph cycle detector detects deadlock',
      'T1 always acquires the lock and T2 is placed in suspended hibernation without rolling back'
    ],
    correctIndex: 0,
    explanation: 'Wound-Wait is a preemptive deadlock prevention scheme based on transaction timestamps (lower timestamp = older/higher priority). If older T1 requests a resource held by younger T2, T1 "wounds" T2, causing T2 to abort and restart. If younger T1 requests a resource held by older T2, T1 waits. Because older transactions never wait for younger transactions, cycles cannot form, eliminating deadlocks entirely.',
    shortcutOrInsight: 'Wound-Wait: Older preempts (wounds) younger; younger waits for older. Wait-Die: Older waits; younger dies (aborts).',
    difficulty: 'Very Hard'
  },
  {
    id: 'dbms-q9',
    testId: 'mock-dbms',
    section: 'Database Systems Architecture',
    companyTag: 'Google Cloud Spanner',
    question: 'The PACELC theorem expands on the classic CAP theorem. What does the "ELC" portion of PACELC describe in distributed database architecture?',
    options: [
      'Else (when there is no network partition), the system must choose between Latency (L) and Consistency (C)',
      'Error Logging Consistency, ensuring log streams remain idempotent across network switches',
      'Elastic Linearized Consensus, managing dynamic quorum allocation under node failures',
      'Eventual Locking Coordination, transitioning between 2-Phase Commit and Paxos'
    ],
    correctIndex: 0,
    explanation: 'PACELC theorem states: If there is a Partition (P), trade off Availability (A) versus Consistency (C); Else (E), trade off Latency (L) versus Consistency (C). Even in 100% healthy network conditions without partitions, a distributed system cannot achieve zero latency while simultaneously maintaining strong consistency across geographically replicated nodes.',
    shortcutOrInsight: 'PACELC = If Partition: [A vs C]; Else (normal operation): [Latency vs Consistency]. Systems like Dynamo choose PA/EL; Spanner chooses PC/EC.',
    difficulty: 'Hard'
  },
  {
    id: 'dbms-q10',
    testId: 'mock-dbms',
    section: 'Database Systems Architecture',
    companyTag: 'MongoDB / PostgreSQL Core',
    question: 'In physical database storage engines using the "slotted-page" architecture, where do tuple records and slot pointer arrays grow from within a single disk page?',
    options: [
      'Slot array grows from page header forward (left to right), while actual tuple records are written from the end of the page backward (right to left)',
      'Both slot arrays and tuple records grow from the beginning of the page in contiguous forward blocks',
      'Tuple records are stored in external overflow blocks while the slotted page holds only 64-bit memory addresses',
      'The entire page is organized as a linked list of single-byte character arrays'
    ],
    correctIndex: 0,
    explanation: 'In the classic slotted-page architecture (used by Postgres, SQLite, and InnoDB), the page header contains an array of slot pointers growing forward from the start of the page. The actual variable-length row records are allocated from the bottom of the page backward. The free space resides in the middle. When free space shrinks below the size of a new record plus slot entry, the page is full.',
    shortcutOrInsight: 'Slotted Page Layout: Headers/pointers grow downwards from top; row data grows upwards from bottom; free space is in between.',
    difficulty: 'Hard'
  }
];

// ============================================================================
// 2. ADVANCED EXCEL & ANALYTICS MODELING MOCK TEST (10 MCQs)
// XLOOKUP, Dynamic Arrays, SUMPRODUCT, Power Query, Financial Models, Solver
// ============================================================================
export const EXCEL_MOCK_QUESTIONS: FaangQuestion[] = [
  {
    id: 'excel-q1',
    testId: 'mock-excel',
    section: 'Advanced Excel & Business Modeling',
    companyTag: 'Goldman Sachs / McKinsey Modeling',
    question: 'What is the primary architectural advantage of `XLOOKUP` over `VLOOKUP` and how does `XLOOKUP` behave by default regarding match mode and lookup direction?',
    options: [
      'XLOOKUP defaults to exact match (match_mode = 0), can search from right-to-left without column index numbers, and does not break when columns are inserted or deleted',
      'XLOOKUP defaults to approximate match and requires the lookup array to be pre-sorted in ascending order',
      'XLOOKUP can only return numbers and cannot handle text strings or dates',
      'XLOOKUP requires wrapping inside an array formula using Ctrl+Shift+Enter in all versions of Excel'
    ],
    correctIndex: 0,
    explanation: 'Unlike VLOOKUP (which defaults to approximate match and requires static numeric column indices that break upon column insertion), XLOOKUP: (1) Defaults to exact match, (2) Accepts separate lookup and return ranges, allowing leftward lookups, (3) Supports reverse search (bottom-to-top), and (4) Includes built-in if_not_found error handling.',
    shortcutOrInsight: 'XLOOKUP syntax: =XLOOKUP(val, lookup_arr, return_arr, [if_not_found], [match_mode: 0=exact], [search_mode: 1=first-to-last, -1=last-to-first]).',
    difficulty: 'Medium'
  },
  {
    id: 'excel-q2',
    testId: 'mock-excel',
    section: 'Advanced Excel & Business Modeling',
    companyTag: 'J.P. Morgan Financial Analyst OA',
    question: 'In modern dynamic array Excel, you enter `=FILTER(A2:C100, B2:B100="Finance")` into cell E2. The cell immediately displays the `#SPILL!` error. What is the root cause and remedy?',
    options: [
      'One or more non-empty cells exist in the intended output spill range (E2 through G...); clear or delete the obstructing content to allow the array to expand',
      'The FILTER function cannot filter text criteria and only accepts boolean integers',
      'The formula must be confirmed by pressing Ctrl+Alt+Delete',
      'The source range contains blank rows which causes the calculation engine to abort'
    ],
    correctIndex: 0,
    explanation: 'The `#SPILL!` error in Excel Dynamic Arrays occurs when the calculated output range is obstructed by non-empty cells (data, formulas, formatting, or invisible spaces). Excel displays a dashed border indicating the needed range. Clearing the obstructing cells immediately allows the array to spill seamlessly.',
    shortcutOrInsight: '#SPILL! = Output path blocked. Clean the bounding box of cells below and to the right of the anchor formula.',
    difficulty: 'Medium'
  },
  {
    id: 'excel-q3',
    testId: 'mock-excel',
    section: 'Advanced Excel & Business Modeling',
    companyTag: 'Deloitte Corporate Finance',
    question: 'You need to calculate total revenue for rows where Region is "North" OR Product is "Tech". Why does `=SUMIFS(Revenue, Region, "North", Product, "Tech")` fail to give the correct result, and which formula correctly computes it?',
    options: [
      'SUMIFS strictly evaluates criteria with boolean AND logic; you should use `=SUMPRODUCT(((Region="North") + (Product="Tech") > 0) * Revenue)`',
      'SUMIFS cannot evaluate text criteria longer than 4 characters',
      'SUMIFS requires the sum range to be the last argument in modern Excel',
      'SUMIFS returns only median values when multiple conditions are provided'
    ],
    correctIndex: 0,
    explanation: '`SUMIFS` inherently applies boolean AND logic across its multiple criteria pairs (every condition must be met). To compute an OR condition, addition in array context functions as OR: `(Region="North") + (Product="Tech")`. Testing `> 0` prevents double counting records where both conditions are true. `SUMPRODUCT` then multiplies by `Revenue` and sums the array.',
    shortcutOrInsight: 'Array Math: `*` represents boolean AND; `+` represents boolean OR. Use `SUMPRODUCT((Cond1 + Cond2 > 0) * Range)` for OR aggregations.',
    difficulty: 'Hard'
  },
  {
    id: 'excel-q4',
    testId: 'mock-excel',
    section: 'Advanced Excel & Business Modeling',
    companyTag: 'KPMG Advisory Modeling',
    question: 'In project timeline planning, which function calculates the exact number of working days between Start_Date and End_Date while specifying that Friday and Saturday are the custom weekend days (common in Middle Eastern projects)?',
    options: [
      '`=NETWORKDAYS.INTL(Start_Date, End_Date, 7, Holidays)` or using weekend string `"0000110"`',
      '`=WORKDAY(Start_Date, End_Date, -2)`',
      '`=DAYS360(Start_Date, End_Date, TRUE)`',
      '`=DATEDIF(Start_Date, End_Date, "WD")`'
    ],
    correctIndex: 0,
    explanation: '`NETWORKDAYS.INTL` allows custom weekend configurations either via weekend codes (where code `7` represents Friday & Saturday) or via a 7-character binary mask string starting on Monday (`"0000110"`: Mon-Thu=0, Fri-Sat=1, Sun=0). It accurately factors in specified holiday arrays.',
    shortcutOrInsight: 'NETWORKDAYS.INTL weekend string: 7 characters (Mon to Sun). `1` = day off/weekend, `0` = workday.',
    difficulty: 'Medium'
  },
  {
    id: 'excel-q5',
    testId: 'mock-excel',
    section: 'Advanced Excel & Business Modeling',
    companyTag: 'PwC Data Analytics',
    question: 'In an Excel Pivot Table, what is the critical mathematical distinction between a "Calculated Field" and a "Calculated Item"?',
    options: [
      'A Calculated Field performs arithmetic on the SUM of the underlying data fields (`SUM(Price) * SUM(Qty)`), whereas a Calculated Item creates a new virtual member within an existing field that operates on individual record rows',
      'Calculated Fields only work with text concatenation while Calculated Items work with numbers',
      'Calculated Fields require SQL queries while Calculated Items are VBA macros',
      'There is no distinction; they are interchangeable terminology in modern Excel'
    ],
    correctIndex: 0,
    explanation: 'In classic Pivot Tables: A Calculated Field generates a new metric by evaluating formulas against the aggregated totals of other fields (e.g. `Price * Quantity` computes `Sum(Price) * Sum(Quantity)`, which is mathematically different from weighted average revenue!). A Calculated Item inserts a new calculated category row/column within an existing dimension field.',
    shortcutOrInsight: 'Pivot Trap: Calculated Field does SUM(A) * SUM(B), NOT SUM(A * B). For row-level multiplication, add a helper column in the source data or use Power Pivot Data Model.',
    difficulty: 'Hard'
  },
  {
    id: 'excel-q6',
    testId: 'mock-excel',
    section: 'Advanced Excel & Business Modeling',
    companyTag: 'Bain & Company Strategy',
    question: 'When configuring Excel Solver to find an optimal product mix that maximizes operating profit subject to machine hour and labor constraints where all decision variables must be non-negative integers, which solving method must be selected?',
    options: [
      'Simplex LP (Linear Programming) with integer constraints on decision variables',
      'GRG Nonlinear',
      'Evolutionary Algorithm without bounds',
      'Goal Seek iterative reverse single-cell calculation'
    ],
    correctIndex: 0,
    explanation: 'When both objective and constraint formulas are strictly linear combinations of decision variables (e.g., `Profit = 50*A + 80*B`, `Hours = 2*A + 4*B <= 100`), the "Simplex LP" engine is mathematically guaranteed to find the global optimum efficiently. Integer constraints make it an Integer Linear Program (ILP), which Solver handles using branch-and-bound on the Simplex simplex tableau.',
    shortcutOrInsight: 'Linear constraints & linear objective = Simplex LP. Nonlinear/curves (e.g. Price elasticity) = GRG Nonlinear. Discontinuous (IF/LOOKUP) = Evolutionary.',
    difficulty: 'Hard'
  },
  {
    id: 'excel-q7',
    testId: 'mock-excel',
    section: 'Advanced Excel & Business Modeling',
    companyTag: 'Amazon Operations Analytics',
    question: 'What is the performance advantage of using the `LET()` function in complex corporate Excel models, such as `=LET(x, VLOOKUP(A2, LargeTable, 5, 0), IF(ISBLANK(x), "N/A", x * 1.18))`?',
    options: [
      'It assigns intermediate calculation results to local variables, preventing expensive redundant recalculations of the lookup formula and dramatically speeding up workbook calculation trees',
      'It encrypts the formula so other workbook viewers cannot see company proprietary logic',
      'It converts standard Excel calculations into GPU-accelerated C++ binaries',
      'It forces the formula to execute on the Microsoft Azure cloud'
    ],
    correctIndex: 0,
    explanation: 'Without `LET()`, Excel evaluates the exact same lookup expression twice: once inside `ISBLANK(VLOOKUP(...))` and a second time in `VLOOKUP(...) * 1.18`. With `LET(var, expr, result)`, the expression is evaluated exactly ONCE in memory, assigned to variable `x`, and reused, cutting execution time and eliminating formula duplication.',
    shortcutOrInsight: 'LET function = Declare local variable once, reuse multiple times. Improves calculation speed and eliminates giant nested spaghetti formulas.',
    difficulty: 'Medium'
  },
  {
    id: 'excel-q8',
    testId: 'mock-excel',
    section: 'Advanced Excel & Business Modeling',
    companyTag: 'Morgan Stanley Quant Risk',
    question: 'Why do Wall Street modeling guidelines strictly ban or discourage the use of `OFFSET()` and `INDIRECT()` in massive institutional financial models?',
    options: [
      'They are "Volatile" functions that force the entire workbook calculation dependency tree to recalculate on EVERY single user edit, destroying performance in large models; `INDEX()` should be used instead',
      'They truncate numbers to 4 decimal places and lose floating-point precision',
      'They are deprecated legacy functions from Excel 97 that are disabled in 64-bit Office',
      'They can only reference cells in closed external workbooks'
    ],
    correctIndex: 0,
    explanation: 'Excel maintains a directed acyclic graph (DAG) of cell dependencies to perform smart, minimal recalculations. Volatile functions (`OFFSET`, `INDIRECT`, `TODAY`, `NOW`, `RAND`) trigger recalculation of themselves and all downstream dependents on EVERY worksheet action (even formatting a cell or typing elsewhere). Replacing `OFFSET()` with non-volatile `INDEX()` preserves minimal recalculation.',
    shortcutOrInsight: 'OFFSET is volatile (slows workbook to a crawl). INDEX is non-volatile and can return cell references dynamically (e.g. `A1:INDEX(A:A, 10)`).',
    difficulty: 'Hard'
  },
  {
    id: 'excel-q9',
    testId: 'mock-excel',
    section: 'Advanced Excel & Business Modeling',
    companyTag: 'EY Technology Risk',
    question: 'You want to highlight entire rows across columns A to G when the status in column E equals "Overdue" (starting from row 2). Which conditional formatting formula and reference style must be applied to range `$A$2:$G$100`?',
    options: [
      '`=$E2="Overdue"` (Absolute column $E, relative row 2)',
      '`=E2="Overdue"` (Relative column E, relative row 2)',
      '`=$E$2="Overdue"` (Absolute column $E, absolute row $2)',
      '`=E$2="Overdue"` (Relative column E, absolute row $2)'
    ],
    correctIndex: 0,
    explanation: 'In conditional formatting applied across multiple columns `$A$2:$G$100`, Excel evaluates the formula for every cell in the range. To ensure that cell B2, C2, D2, etc. all check the value in column E (rather than shifting to look at F, G, etc.), column E must be locked with `$E`. The row number must remain relative (`2`) so that row 3 checks `$E3`, row 4 checks `$E4`, etc.',
    shortcutOrInsight: 'Highlighting entire rows: Lock column, free the row -> `=$E2="Target"`. Highlighting entire columns: Lock row, free the column -> `=A$1="Target"`.',
    difficulty: 'Medium'
  },
  {
    id: 'excel-q10',
    testId: 'mock-excel',
    section: 'Advanced Excel & Business Modeling',
    companyTag: 'Accenture Strategy & Data',
    question: 'In Power Query (M Language), what is the purpose of the "Unpivot Other Columns" transformation when preparing sales data formatted with months spread across columns (Jan, Feb, Mar...)?',
    options: [
      'It transforms wide crosstab dimensional columns into normalized attribute-value row pairs (creating an "Attribute" column for Month and a "Value" column for Amount), optimal for database and Pivot Table ingestion',
      'It deletes all rows that contain zero values across the entire dataset',
      'It creates an MDX cube query that exports the table directly into SQL Server',
      'It inverts the matrix diagonally like a linear algebra transpose without headers'
    ],
    correctIndex: 0,
    explanation: 'Raw human-friendly reports are often "wide" (pivoted), with dates or months as column headers. Relational databases and BI models require "tall/tidy" data where each column represents a single variable and each row represents an observation. "Unpivot Other Columns" preserves key identification columns and normalizes repeating metric columns into Attribute-Value pairs.',
    shortcutOrInsight: 'Power Query Rule: Select key ID columns -> Right-click -> "Unpivot Other Columns". Converts wide reporting sheets into tall database facts.',
    difficulty: 'Medium'
  }
];

// ============================================================================
// 3. POWER BI & DAX INTELLIGENCE MOCK TEST (10 MCQs)
// Context Transition, CALCULATE, Star Schema, USERELATIONSHIP, VertiPaq, RLS
// ============================================================================
export const POWER_BI_MOCK_QUESTIONS: FaangQuestion[] = [
  {
    id: 'pbi-q1',
    testId: 'mock-powerbi',
    section: 'Business Intelligence & DAX Modeling',
    companyTag: 'Microsoft Power BI Core',
    question: 'What fundamental DAX phenomenon occurs when `CALCULATE()` is evaluated in the context of a calculated column or an iterator like `SUMX()`?',
    options: [
      'Context Transition: CALCULATE converts the current Row Context into an equivalent Filter Context over all columns of the current row',
      'Context Inversion: CALCULATE invalidates all physical relationships between tables and performs cross joins',
      'Storage Fallback: CALCULATE forces the VertiPaq engine to unload from RAM into disk page files',
      'Dynamic Schema Compilation: CALCULATE recompiles the underlying DirectQuery SQL views'
    ],
    correctIndex: 0,
    explanation: 'Context Transition is one of the most vital principles of DAX: Whenever `CALCULATE()` (or any measure, since all measures are implicitly wrapped in `CALCULATE`) is invoked in the presence of an active Row Context, it automatically transforms that Row Context into an equivalent Filter Context that filters the table down to the exact row currently being iterated.',
    shortcutOrInsight: 'Golden Rule of DAX: `CALCULATE` turns Row Context into Filter Context. Calling a measure in a calculated column triggers Context Transition!',
    difficulty: 'Very Hard'
  },
  {
    id: 'pbi-q2',
    testId: 'mock-powerbi',
    section: 'Business Intelligence & DAX Modeling',
    companyTag: 'Amazon BI Engineering OA',
    question: 'You want to compute "% of Category Sales" in a matrix visual containing Category and Subcategory. Which DAX filter modifier ensures that filters on Subcategory are cleared while maintaining the filter on the current Category?',
    options: [
      '`ALLEXCEPT(Products, Products[Category])` or `ALL(Products[Subcategory])`',
      '`ALL(Products)`',
      '`ALLSELECTED(Products)`',
      '`KEEPFILTERS(Products[Category])`'
    ],
    correctIndex: 0,
    explanation: 'To calculate the subtotal for the current category, you must remove the filter applied by the Subcategory row header while keeping the filter on Category intact. `ALLEXCEPT(Table, ColumnToKeep)` strips all filters from `Table` EXCEPT the specified column. Alternatively, `ALL(Products[Subcategory])` specifically removes the filter from just Subcategory.',
    shortcutOrInsight: '`ALL(Table)` removes all filters from the table. `ALLEXCEPT(Table, Col)` removes all filters EXCEPT `Col`. `ALLSELECTED()` removes visual filters but respects external slicers.',
    difficulty: 'Hard'
  },
  {
    id: 'pbi-q3',
    testId: 'mock-powerbi',
    section: 'Business Intelligence & DAX Modeling',
    companyTag: 'Gartner BI Architecture',
    question: 'Why does official Microsoft Power BI enterprise guidance strongly caution against configuring "Both" (bi-directional) cross-filtering directions on table relationships unless strictly necessary?',
    options: [
      'It creates ambiguous filter paths in the data model, leads to unpredictable filter propagation across multiple dimensions, causes non-deterministic query results, and significantly degrades VertiPaq performance',
      'Power BI Service does not support bi-directional filtering in published cloud reports',
      'Bi-directional relationships automatically convert Import models into DirectQuery models',
      'It enforces case-sensitive string comparisons that crash visual renderings'
    ],
    correctIndex: 0,
    explanation: 'Bi-directional filtering allows filters from fact tables to propagate backward into dimension tables and into other fact tables. In complex schemas, this creates ambiguity (multiple filter paths between tables), triggering engine errors, slow queries, or silently incorrect visual numbers. Recommended practice is a pure Star Schema with single-direction (1-to-Many) relationships.',
    shortcutOrInsight: 'Model Best Practice: Keep cross-filter direction Single. If bi-directional behavior is needed for a single visual, activate it dynamically via `CROSSFILTER()` inside DAX.',
    difficulty: 'Hard'
  },
  {
    id: 'pbi-q4',
    testId: 'mock-powerbi',
    section: 'Business Intelligence & DAX Modeling',
    companyTag: 'Walmart Global Tech BI',
    question: 'In a Star Schema where `Sales` table has both `OrderDate` and `ShipDate` linked to `DimDate`, Power BI only allows one relationship to be Active. How do you calculate "Total Sales by Ship Date" without duplicating the Date table?',
    options: [
      '`Total Sales by Ship Date = CALCULATE([Total Sales], USERELATIONSHIP(Sales[ShipDate], DimDate[Date]))`',
      '`Total Sales by Ship Date = RELATEDTABLE(Sales[ShipDate])`',
      '`Total Sales by Ship Date = SWITCH(TRUE(), DimDate[Date] = Sales[ShipDate], [Total Sales])`',
      '`Total Sales by Ship Date = TREATAS(Sales[ShipDate], [Total Sales])`'
    ],
    correctIndex: 0,
    explanation: 'Role-playing dimensions can be modeled with inactive relationships. The `USERELATIONSHIP(FactCol, DimCol)` function in DAX tells `CALCULATE` to activate a specific inactive physical relationship for the duration of the measure evaluation while temporarily deactivating the default active relationship.',
    shortcutOrInsight: '`USERELATIONSHIP` enables inactive relationships dynamically inside `CALCULATE`. Perfect for multiple date roles (Order Date, Ship Date, Delivery Date).',
    difficulty: 'Medium'
  },
  {
    id: 'pbi-q5',
    testId: 'mock-powerbi',
    section: 'Business Intelligence & DAX Modeling',
    companyTag: 'Capgemini Data Practice',
    question: 'What is "Query Folding" in Power BI Power Query and why is it critical for enterprise ETL refresh performance?',
    options: [
      'Query Folding translates Power Query (M) transformation steps into a single native SQL query executed directly by the source database, utilizing database indexing and minimizing network data transfer',
      'It compresses report files into ZIP archives before publishing to the Power BI Service',
      'It folds multiple report pages into a single mobile dashboard layout',
      'It prevents users from downloading the underlying PBIX model file'
    ],
    correctIndex: 0,
    explanation: 'Query Folding is the ability of Power Query to convert ETL transformations (e.g. Filter rows, Group By, Join, Add Column) into native SQL statements executed on the source database engine. This offloads computation to powerful database servers and transfers only the filtered, aggregated dataset rather than millions of raw rows.',
    shortcutOrInsight: 'Query Folding rule: Always place foldable steps (filter, select columns, joins) at the beginning of the M script before non-foldable steps (custom R/Python scripts, index columns).',
    difficulty: 'Hard'
  },
  {
    id: 'pbi-q6',
    testId: 'mock-powerbi',
    section: 'Business Intelligence & DAX Modeling',
    companyTag: 'Uber Enterprise Analytics',
    question: 'How does the Power BI VertiPaq in-memory storage engine achieve extreme compression ratios (often 10x to 20x) on imported relational data?',
    options: [
      'Columnar storage orientation combined with Value Encoding, Dictionary (Hash) Encoding, Run-Length Encoding (RLE), and Bit-Packing',
      'GZIP compression applied to raw disk sectors during background scheduled refreshes',
      'Lossy downsampling of numeric floats into 8-bit integers',
      'Client-side browser IndexedDB caching with web worker compression'
    ],
    correctIndex: 0,
    explanation: 'VertiPaq stores data column-by-column rather than row-by-row. Because values in a single column share the same data type and high repetition, VertiPaq applies: (1) Dictionary Encoding (mapping distinct values to small integer IDs), (2) Run-Length Encoding (storing repeated values as value + count pairs), (3) Value Encoding (subtracting base offset), and (4) Bit-Packing.',
    shortcutOrInsight: 'VertiPaq optimization: Minimize high-cardinality columns (e.g. timestamps with seconds, UUIDs). Fewer distinct values = smaller dictionary = maximum compression.',
    difficulty: 'Very Hard'
  },
  {
    id: 'pbi-q7',
    testId: 'mock-powerbi',
    section: 'Business Intelligence & DAX Modeling',
    companyTag: 'Cisco Systems BI Infrastructure',
    question: 'To implement Dynamic Row-Level Security (RLS) where regional managers only see sales for their assigned territory, which DAX expression is placed on the security filter table?',
    options: [
      '`[UserPrincipalName] = USERPRINCIPALNAME()` or `[UserEmail] = USERNAME()`',
      '`[Region] = SELECTEDVALUE(Sales[Region])`',
      '`[UserRole] == "Admin"`',
      '`CALCULATE(COUNTROWS(Sales)) > 0`'
    ],
    correctIndex: 0,
    explanation: 'Dynamic RLS relies on the DAX functions `USERPRINCIPALNAME()` (returns user\'s login email in Power BI Service, e.g. `jane@company.com`) or `USERNAME()` (returns DOMAIN\\user in Desktop). By filtering an User-Security bridge table with `[UserPrincipalName] = USERPRINCIPALNAME()`, the active relationship automatically filters downstream fact tables to only authorized data rows.',
    shortcutOrInsight: 'Dynamic RLS: Map `USERPRINCIPALNAME()` to user security mapping table. Filter propagates automatically across 1-to-Many relationships.',
    difficulty: 'Medium'
  },
  {
    id: 'pbi-q8',
    testId: 'mock-powerbi',
    section: 'Business Intelligence & DAX Modeling',
    companyTag: 'Target Data Engineering',
    question: 'When should a data modeler write `SUMX(Sales, Sales[Quantity] * Sales[UnitPrice])` instead of creating a calculated column in the Sales table followed by `SUM()`?',
    options: [
      '`SUMX` computes the product row-by-row in temporary memory during query execution, avoiding persistent RAM storage overhead in the VertiPaq model caused by a calculated column',
      '`SUMX` can only operate on tables with fewer than 1,000 rows',
      'Calculated columns cannot be exported to Excel',
      '`SUMX` is an aggregator that executes strictly on the GPU'
    ],
    correctIndex: 0,
    explanation: 'Calculated columns are materialized into RAM and stored in the VertiPaq model, consuming permanent memory and increasing file size. A measure using an iterator like `SUMX(Table, Expression)` calculates the values dynamically at query time in CPU cache without wasting RAM on persistent storage. Measures are always preferred over calculated columns unless used as slicers.',
    shortcutOrInsight: 'Measure vs Calculated Column: Use Measures (`SUMX`) for metrics and aggregations (saves RAM). Use Calculated Columns only when values are needed as visual Slicers or Row headers.',
    difficulty: 'Medium'
  },
  {
    id: 'pbi-q9',
    testId: 'mock-powerbi',
    section: 'Business Intelligence & DAX Modeling',
    companyTag: 'Wipro Technologies BI',
    question: 'Why do DAX Time Intelligence functions like `SAMEPERIODLASTYEAR()`, `DATEADD()`, and `TOTALYTD()` produce blanks or errors if evaluated against a fact table date column directly?',
    options: [
      'Time Intelligence functions require a dedicated, marked "Date Table" containing a contiguous range of complete calendar dates with zero missing days and unique values',
      'Time Intelligence functions only support dates in the Gregorian year 2020 and above',
      'They cannot be evaluated in reports published to Azure cloud tenants',
      'Fact tables cannot have dates formatted as strings'
    ],
    correctIndex: 0,
    explanation: 'DAX Time Intelligence relies on strict date table rules: (1) Must contain a column of data type `date` or `date/time`, (2) Must contain unique values, (3) Must contain continuous, unbroken dates spanning the entire year range (no missing weekends, holidays, or business closures), and (4) Must be marked as a Date Table.',
    shortcutOrInsight: 'Date Table Rule: Always generate a dedicated Calendar table (`CALENDARAUTO()` or `CALENDAR()`) with unbroken dates and mark it as Date Table in Power BI.',
    difficulty: 'Medium'
  },
  {
    id: 'pbi-q10',
    testId: 'mock-powerbi',
    section: 'Business Intelligence & DAX Modeling',
    companyTag: 'Microsoft Power BI Performance',
    question: 'When profiling a sluggish Power BI visual using Performance Analyzer and DAX Studio, what do the "FE" (Formula Engine) and "SE" (Storage Engine) metrics signify?',
    options: [
      'SE (VertiPaq) queries data in multi-threaded in-memory C++ scans and is extremely fast; FE is single-threaded and executes complex DAX logic (e.g. IF, non-foldable iterators). High FE time indicates unoptimized DAX logic',
      'FE stands for Frontend CSS rendering while SE stands for SQL Endpoint',
      'SE runs in the user\'s local browser while FE runs on Microsoft Azure cloud GPUs',
      'High SE duration indicates a software bug in Power BI Desktop'
    ],
    correctIndex: 0,
    explanation: 'The VertiPaq architecture consists of two engines: Storage Engine (SE), which is multi-threaded, parallelized, in-memory, and lightning fast at scans, aggregations, and joins; and the Formula Engine (FE), which is single-threaded, interprets complex procedural DAX logic, and materializes intermediate tables. A performant DAX measure offloads >90% of execution to SE.',
    shortcutOrInsight: 'DAX Tuning: Aim for high SE % and low FE time. If FE time is high, rewrite DAX to eliminate nested iterators, complex callback loops, and large materialized tables.',
    difficulty: 'Very Hard'
  }
];

// ============================================================================
// 4. ETHICAL HACKING & PENETRATION TESTING MOCK TEST (10 MCQs)
// Nmap, SQLi, XSS, CSRF, SSRF, IDOR/BOLA, Buffer Overflows, SUID, WPA2
// ============================================================================
export const ETHICAL_HACKING_MOCK_QUESTIONS: FaangQuestion[] = [
  {
    id: 'hack-q1',
    testId: 'mock-ethical-hacking',
    section: 'Offensive Security & Red Teaming',
    companyTag: 'CrowdStrike / Mandiant Red Team',
    question: 'During network reconnaissance, what packet sequence defines an Nmap TCP SYN "Half-Open" Stealth Scan (`nmap -sS <target>`) against an open destination port?',
    options: [
      'Scanner sends [SYN] -> Target replies [SYN, ACK] -> Scanner sends [RST] immediately to terminate the handshake without completing a full TCP connection',
      'Scanner sends [SYN] -> Target replies [ACK] -> Scanner sends [FIN]',
      'Scanner sends [SYN] -> Target replies [SYN, ACK] -> Scanner sends [ACK] -> Scanner sends [GET / HTTP/1.1]',
      'Scanner sends [ACK] -> Target replies [RST] -> Scanner logs open port'
    ],
    correctIndex: 0,
    explanation: 'The TCP SYN scan (`-sS`) is called "half-open" because it never establishes a full 3-way handshake. The scanner sends a SYN. If the target port is open, it responds with SYN/ACK. Rather than sending the final ACK (which would alert application listeners and create connection logs), the scanner sends a RST (reset) packet, terminating the attempt immediately.',
    shortcutOrInsight: 'Nmap -sS: SYN -> SYN/ACK -> RST. Bypasses application connection logging because the socket is never accepted.',
    difficulty: 'Hard'
  },
  {
    id: 'hack-q2',
    testId: 'mock-ethical-hacking',
    section: 'Offensive Security & Red Teaming',
    companyTag: 'Offensive Security (OSCP)',
    question: 'A web application executes the query `SELECT * FROM products WHERE category = \'$input\'`. The input is vulnerable to SQL injection, but the application suppresses all database error messages and displays no reflected data. Which injection payload demonstrates a Time-based Blind SQLi verification in PostgreSQL?',
    options: [
      `' OR (SELECT 1 FROM pg_sleep(5))--`,
      `' UNION SELECT username, password FROM users--`,
      `' OR 1=1--`,
      `' DROP TABLE products;--`
    ],
    correctIndex: 0,
    explanation: 'When the application is completely silent (no errors, no reflected data, identical HTTP response bodies), attackers use Time-Based Blind SQL Injection. Injecting sleep functions (e.g. `pg_sleep(5)` in PostgreSQL, `WAITFOR DELAY \'0:0:5\'` in MSSQL, `sleep(5)` in MySQL) forces the server to pause. If the HTTP response arrives 5 seconds later, the vulnerability and boolean inferences are confirmed.',
    shortcutOrInsight: 'Blind SQLi: Boolean-based uses True/False page content differences. Time-based uses `sleep(N)` or `WAITFOR DELAY` to infer database data bit-by-bit.',
    difficulty: 'Medium'
  },
  {
    id: 'hack-q3',
    testId: 'mock-ethical-hacking',
    section: 'Offensive Security & Red Teaming',
    companyTag: 'Google Security / HackerOne',
    question: 'A security engineer discovers that an application sets session authentication cookies with the `HttpOnly` attribute flag. Which attack vector does `HttpOnly` directly prevent, and what threat remains viable?',
    options: [
      'It prevents JavaScript (XSS payloads) from accessing `document.cookie`, preventing direct credential theft; however, attackers can still perform actions on behalf of the victim via Cross-Site Scripting (XSS-driven session riding)',
      'It completely prevents all forms of Cross-Site Scripting (XSS) attacks entirely',
      'It prevents Man-in-the-Middle (MitM) packet sniffing over unencrypted Wi-Fi networks',
      'It prevents SQL Injection vulnerabilities on login forms'
    ],
    correctIndex: 0,
    explanation: 'The `HttpOnly` cookie flag instructs browser JavaScript engines (V8, SpiderMonkey) to block scripts from reading `document.cookie`. This prevents attackers from stealing the raw JWT or session token via XSS. However, the browser still automatically attaches the cookie to outgoing `fetch()` / `XMLHttpRequest` requests, allowing the attacker\'s XSS payload to perform arbitrary actions (session riding) as the user.',
    shortcutOrInsight: '`HttpOnly` blocks `document.cookie` theft, NOT XSS execution. `Secure` flag requires HTTPS. `SameSite` mitigates CSRF.',
    difficulty: 'Hard'
  },
  {
    id: 'hack-q4',
    testId: 'mock-ethical-hacking',
    section: 'Offensive Security & Red Teaming',
    companyTag: 'Palo Alto Networks / Unit 42',
    question: 'In Modern Cross-Site Request Forgery (CSRF) defense, how does setting the cookie attribute `SameSite=Strict` differ from `SameSite=Lax`?',
    options: [
      '`Strict` prevents the browser from sending the cookie in ANY cross-site request (even clicking a regular inbound link from an external website); `Lax` allows cookies on top-level safe GET navigations (e.g. following a link)',
      '`Strict` requires RSA-4096 cryptographic signatures on every HTTP payload',
      '`Lax` sends cookies on all cross-origin POST forms but blocks GET requests',
      '`Strict` blocks cookies on mobile browsers while allowing them on desktop'
    ],
    correctIndex: 0,
    explanation: '`SameSite=Strict` ensures cookies are NEVER sent in cross-site contexts, meaning if a logged-in user clicks a link to `bank.com` from `slack.com`, they will appear unauthenticated on initial navigation. `SameSite=Lax` (default in modern Chromium) allows cookies on top-level safe GET navigations (e.g. clicking a link), but blocks cookies on cross-site POST requests, `<iframe>` embeds, and AJAX.',
    shortcutOrInsight: '`SameSite=Strict`: Zero cross-origin cookie sharing. `SameSite=Lax`: Cookie sent on top-level link clicks (GET), but blocked on cross-origin POSTs.',
    difficulty: 'Hard'
  },
  {
    id: 'hack-q5',
    testId: 'mock-ethical-hacking',
    section: 'Offensive Security & Red Teaming',
    companyTag: 'AWS Security / Capital One Breach Case',
    question: 'In a Server-Side Request Forgery (SSRF) vulnerability on an Amazon Web Services (AWS) EC2 instance, what sensitive internal endpoint is targeted to extract temporary IAM credentials, and how does IMDSv2 mitigate this?',
    options: [
      'Target: `http://169.254.169.254/latest/meta-data/iam/security-credentials/<role>`; IMDSv2 requires a session token via `PUT` request with `X-aws-ec2-metadata-token-ttl-seconds` header, which standard SSRF cannot forge',
      'Target: `https://aws.amazon.com/login`; IMDSv2 enforces biometric authentication',
      'Target: `http://127.0.0.1:8080/admin/passwords`; IMDSv2 disables all local loopback interfaces',
      'Target: `http://localhost:3000/env`; IMDSv2 encrypts environment variables with KMS'
    ],
    correctIndex: 0,
    explanation: 'The AWS Link-Local metadata IP `169.254.169.254` serves instance metadata. In IMDSv1, a simple GET request (easily triggered via SSRF) returns the IAM role\'s secret keys. IMDSv2 requires a session-oriented flow: clients must first send a `PUT` request with a custom header (`X-aws-ec2-metadata-token-ttl-seconds: 21600`) to fetch a token, which standard SSRF vulnerabilities (typically limited to GET or lacking custom headers) cannot do.',
    shortcutOrInsight: 'AWS SSRF Target: 169.254.169.254 (Instance Metadata Service). IMDSv2 requires a `PUT` token exchange, neutralizing simple GET-based SSRF.',
    difficulty: 'Very Hard'
  },
  {
    id: 'hack-q6',
    testId: 'mock-ethical-hacking',
    section: 'Offensive Security & Red Teaming',
    companyTag: 'OWASP Top 10 API Security',
    question: 'A mobile banking API exposes endpoint `GET /api/v1/accounts/84920/transactions`. Changing the account ID in the URL to `84921` returns another customer\'s complete bank statement without error. What specific OWASP vulnerability is this?',
    options: [
      'Broken Object Level Authorization (BOLA) / Insecure Direct Object Reference (IDOR)',
      'Cross-Site Scripting (XSS)',
      'SQL Injection (SQLi)',
      'Broken Object Property Level Authorization (Mass Assignment)'
    ],
    correctIndex: 0,
    explanation: 'This is the #1 vulnerability on the OWASP API Security Top 10: Broken Object Level Authorization (BOLA), historically known as Insecure Direct Object Reference (IDOR). The application validates that the user is authenticated (valid JWT/session), but fails to verify whether the authenticated user has authorization to access the specific requested object ID (`84921`).',
    shortcutOrInsight: 'IDOR/BOLA: Authentication succeeds, but Authorization fails. The server trusts the client-provided database ID without verifying object ownership.',
    difficulty: 'Easy'
  },
  {
    id: 'hack-q7',
    testId: 'mock-ethical-hacking',
    section: 'Offensive Security & Red Teaming',
    companyTag: 'Defcon CTF / SANS Institute',
    question: 'In a classic x86 Linux stack buffer overflow vulnerability, what critical CPU register must the attacker overwrite to hijack execution flow, and what is the role of a "NOP Sled" (`\x90`)?',
    options: [
      'Register: EIP (Extended Instruction Pointer) / RIP; NOP Sled (`0x90` instructions) slides CPU execution smoothly into shellcode even if the exact target jump address varies slightly',
      'Register: EAX (Accumulator Register); NOP Sled flushes the CPU L1 data cache',
      'Register: ESP (Stack Pointer); NOP Sled encrypts the payload before kernel execution',
      'Register: CR3 (Control Register 3); NOP Sled overrides MMU page tables'
    ],
    correctIndex: 0,
    explanation: 'When writing beyond the boundary of a stack buffer, the payload overwrites local variables, saved frame pointer (EBP), and finally the saved return address (EIP on 32-bit, RIP on 64-bit). By pointing EIP into a sequence of NOP (`0x90` - No Operation) instructions, the CPU executes harmless no-ops until it reaches the malicious shellcode payload, providing tolerance against slight stack address shifts.',
    shortcutOrInsight: 'Stack Overflow: Buffer -> Saved EBP -> Saved EIP (Return Address). NOP sled (`\x90`) creates a landing strip for imprecise memory jumps.',
    difficulty: 'Very Hard'
  },
  {
    id: 'hack-q8',
    testId: 'mock-ethical-hacking',
    section: 'Offensive Security & Red Teaming',
    companyTag: 'Hashcat / John The Ripper Teams',
    question: 'How does introducing a unique, cryptographically random "Salt" prior to hashing user passwords completely neutralize precomputed "Rainbow Table" attacks?',
    options: [
      'Because every user has a distinct random salt appended to their password, precomputed lookup tables (rainbow tables) would have to be recalculated in their entirety for every individual user salt (2^128+ combinations), rendering precomputation mathematically infeasible',
      'Salts encrypt the password using asymmetric RSA-2048 keys',
      'Salts compress the password hash so it cannot be parsed by GPU cracking rigs',
      'Salts delete the cleartext password from RAM using kernel zeroization'
    ],
    correctIndex: 0,
    explanation: 'Rainbow tables rely on precomputing hash chains for common passwords. If 1,000 users have the password "Password123", unsalted SHA-256 produces the exact same hash for all 1,000. With a unique 128-bit salt per user: `Hash(Salt || Password)`, the resulting hashes are completely different for all 1,000 users, and precomputing tables for every possible salt is mathematically impossible.',
    shortcutOrInsight: 'Salt purpose: Defeats Rainbow Tables and ensures identical passwords produce totally different hashes. (Pepper adds an extra secret key; KDF like Argon2/Bcrypt adds computational work).',
    difficulty: 'Medium'
  },
  {
    id: 'hack-q9',
    testId: 'mock-ethical-hacking',
    section: 'Offensive Security & Red Teaming',
    companyTag: 'Red Team Operations (Linux)',
    question: 'An attacker gains low-privilege shell access on a Linux server and executes `find / -perm -u=s -type f 2>/dev/null`. Why are they searching for SUID (Set User ID) binaries, and how could `/usr/bin/find` with SUID root lead to instant privilege escalation?',
    options: [
      'SUID binaries execute with the permissions of the file owner (root) rather than the executing user; running `/usr/bin/find . -exec /bin/sh -p \\; -quit` spawns an interactive root shell',
      'SUID files contain unencrypted passwords in their filesystem inodes',
      'SUID binaries automatically disable SELinux kernel protections upon execution',
      'SUID binaries grant network socket listening privileges without port 1024 restrictions'
    ],
    correctIndex: 0,
    explanation: 'The SUID (SetUID) bit allows an executable to run with the permissions of the file owner (commonly `root`). If an administrative utility like `find`, `vim`, or `bash` has SUID enabled (octal 4000), a low-privilege user can leverage built-in execution flags (e.g. `find . -exec /bin/sh -p \\;`) to spawn a shell running with effective UID 0 (root). This is cataloged in GTFOBins.',
    shortcutOrInsight: 'GTFOBins: SUID bit (`chmod u+s`) executes as file owner. Misconfigured SUID on scripting or execution binaries = instant root shell.',
    difficulty: 'Hard'
  },
  {
    id: 'hack-q10',
    testId: 'mock-ethical-hacking',
    section: 'Offensive Security & Red Teaming',
    companyTag: 'Aircrack-ng / Wi-Fi Penetration',
    question: 'In Wi-Fi penetration testing against WPA2-PSK networks, what critical cryptographic handshake must be captured over the air, and what attack is sent to force client re-authentication?',
    options: [
      'Capture: EAPOL 4-Way Handshake (containing ANonce, SNonce, and MIC); Trigger: 802.11 Deauthentication frames sent to disconnect connected clients and capture the subsequent reconnect handshake',
      'Capture: WEP Initialization Vector (IV); Trigger: ARP flood injection',
      'Capture: WPS PIN exchange; Trigger: Pixie Dust offline integer factorization',
      'Capture: Beacon Frame timestamps; Trigger: Rogue DHCP pool exhaustion'
    ],
    correctIndex: 0,
    explanation: 'WPA2-PSK relies on the 4-Way Handshake to establish Pairwise Transient Keys (PTK) derived from the Pre-Shared Key (PSK). Attackers send spoofed 802.11 deauthentication packets (`aireplay-ng -0`) to disconnect a legitimate client. When the client automatically reconnects, the attacker captures the 4-way EAPOL handshake containing the cryptographic nonces and Message Integrity Code (MIC) for offline dictionary/brute-force cracking.',
    shortcutOrInsight: 'WPA2 Attack: Deauth packet -> capture 4-Way EAPOL Handshake -> crack offline via Hashcat (mode 22000) or Aircrack-ng without alerting the target AP.',
    difficulty: 'Hard'
  }
];

// ============================================================================
// 5. CYBER SECURITY & DEFENSIVE ARCHITECTURE MOCK TEST (10 MCQs)
// Cryptography, Zero Trust, Firewalls, OAuth/OIDC, SOC/SIEM, MITRE ATT&CK, PKI
// ============================================================================
export const CYBER_SECURITY_MOCK_QUESTIONS: FaangQuestion[] = [
  {
    id: 'cyber-q1',
    testId: 'mock-cyber-security',
    section: 'Information Security & Defensive Engineering',
    companyTag: 'Cloudflare / Google Security Engineering',
    question: 'How does modern asymmetric Public Key Cryptography achieve the property of "Non-Repudiation" for digital communications?',
    options: [
      'The sender signs a cryptographic hash of the message using their private key; anyone can verify the signature using the sender\'s public key, proving definitively that only the holder of the private key could have originated the message',
      'The sender encrypts the message with the receiver\'s public key, preventing third-party eavesdropping',
      'A trusted third-party proxy holds a shared AES-256 key and timestamps each packet header',
      'The network router appends its MAC address to the IP packet payload'
    ],
    correctIndex: 0,
    explanation: 'Non-repudiation prevents a sender from denying having sent a message. In digital signatures: (1) The sender computes a cryptographic digest of the message (e.g. SHA-256), (2) The sender encrypts the digest with their own PRIVATE key. (3) The receiver decrypts the signature using the sender\'s PUBLIC key and compares hashes. Because only the sender possesses their private key, only they could have generated the signature.',
    shortcutOrInsight: 'Encryption = Confidentiality (encrypt with receiver\'s public key). Digital Signature = Authenticity, Integrity & Non-Repudiation (sign with sender\'s private key).',
    difficulty: 'Medium'
  },
  {
    id: 'cyber-q2',
    testId: 'mock-cyber-security',
    section: 'Information Security & Defensive Engineering',
    companyTag: 'Apple Security / NSA Cryptographic Standard',
    question: 'Why is AES-GCM (Advanced Encryption Standard in Galois/Counter Mode) favored as the gold standard for modern symmetric data transport over AES-CBC?',
    options: [
      'AES-GCM is an Authenticated Encryption with Associated Data (AEAD) cipher that provides confidentiality and cryptographic integrity simultaneously in hardware-accelerated parallel execution, resisting padding oracle attacks',
      'AES-GCM uses 4096-bit prime numbers that cannot be factored by quantum computers',
      'AES-CBC requires an internet connection to contact a certificate authority for each block',
      'AES-GCM does not require an Initialization Vector (IV)'
    ],
    correctIndex: 0,
    explanation: 'AES-CBC (Cipher Block Chaining) only provides confidentiality; it requires a separate MAC (like HMAC-SHA256) to ensure integrity, and CBC mode is historically vulnerable to padding oracle attacks (e.g. POODLE). AES-GCM combines counter-mode encryption with universal Galois hashing, providing Authenticated Encryption with Associated Data (AEAD) in a single pass with native hardware instruction support (AES-NI/CLMUL).',
    shortcutOrInsight: 'AES-GCM = Confidentiality + Authentication (AEAD) in a single hardware-accelerated pass. Eliminates padding oracle vulnerabilities.',
    difficulty: 'Hard'
  },
  {
    id: 'cyber-q3',
    testId: 'mock-cyber-security',
    section: 'Information Security & Defensive Engineering',
    companyTag: 'Qualcomm / Signal Protocol',
    question: 'What is "Perfect Forward Secrecy" (PFS) in TLS 1.3 / HTTPS and what cryptographic key exchange algorithm guarantees it?',
    options: [
      'PFS ensures that even if a server\'s long-term private key is compromised in the future, past encrypted session traffic cannot be decrypted; achieved using Ephemeral Diffie-Hellman (ECDHE)',
      'PFS guarantees that passwords are never stored in plain text in memory caches',
      'PFS prevents quantum computers from breaking symmetric AES-128 keys',
      'PFS forces web browsers to update their root certificate bundles every 24 hours'
    ],
    correctIndex: 0,
    explanation: 'In legacy TLS using RSA key exchange, the pre-master secret was encrypted with the server\'s static public key; if an adversary recorded encrypted traffic and stole the server\'s private key 5 years later, they could decrypt all historical recordings! With Ephemeral Diffie-Hellman (ECDHE), every TLS session negotiates unique, short-lived ephemeral keypairs that are discarded immediately after session termination.',
    shortcutOrInsight: 'Perfect Forward Secrecy (PFS): Ephemeral keys discarded after each session. Compromising long-term server keys does NOT decrypt past recorded traffic.',
    difficulty: 'Hard'
  },
  {
    id: 'cyber-q4',
    testId: 'mock-cyber-security',
    section: 'Information Security & Defensive Engineering',
    companyTag: 'Check Point / Fortinet Engineering',
    question: 'How does a Stateful Packet Inspection (SPI) firewall fundamentally differ from a legacy Stateless Packet Filter (Access Control List)?',
    options: [
      'A stateful firewall tracks the operational state of active transport connections in a state table (e.g. TCP handshakes, sequence numbers); it automatically permits return traffic matching established outbound connections without requiring open inbound ports',
      'A stateful firewall operates exclusively at Layer 7 by inspecting HTTP JSON payloads',
      'Stateless filters can detect malware signatures while stateful firewalls cannot',
      'Stateful firewalls require all clients to run an installed kernel agent'
    ],
    correctIndex: 0,
    explanation: 'Stateless packet filters evaluate each packet in isolation against static rules based solely on IP addresses and ports (Layers 3 & 4), requiring permissive inbound rule openings for return traffic. A Stateful firewall maintains an in-memory state table tracking TCP connection phases (SYN, ESTABLISHED, FIN) and automatically allows inbound packets that belong to valid, initiated outbound connections.',
    shortcutOrInsight: 'Stateful Firewall: Remembers who started the conversation! Permitted outbound connections automatically allow corresponding return replies.',
    difficulty: 'Medium'
  },
  {
    id: 'cyber-q5',
    testId: 'mock-cyber-security',
    section: 'Information Security & Defensive Engineering',
    companyTag: 'Okta / Auth0 Identity Systems',
    question: 'Why does OAuth 2.0 mandate the use of "PKCE" (Proof Key for Code Exchange) for Single Page Applications (React/Vite) and Mobile Apps implementing the Authorization Code Flow?',
    options: [
      'Public clients (SPAs/Mobile apps) cannot securely maintain a confidential `client_secret` in client-side code; PKCE dynamically generates a cryptographic `code_verifier` and `code_challenge` pair to prevent authorization code interception attacks',
      'PKCE speeds up token verification by eliminating SSL/TLS overhead',
      'PKCE replaces JWT tokens with symmetric cookies',
      'PKCE is required only when authenticating hardware smartcards'
    ],
    correctIndex: 0,
    explanation: 'In traditional Authorization Code Flow, an authorization code is returned to the browser/app and exchanged for a token along with a `client_secret`. Because SPAs and mobile apps run on untrusted user devices, any embedded `client_secret` can be extracted via DevTools or decompilation. PKCE (RFC 7636) dynamically generates a secret `code_verifier` and hashed `code_challenge` per request, proving that the caller requesting the token is the same entity that initiated the authorization.',
    shortcutOrInsight: 'PKCE = Proof Key for Code Exchange. Protects public clients (mobile, SPA) by replacing static client secrets with dynamic cryptographically hashed challenges.',
    difficulty: 'Hard'
  },
  {
    id: 'cyber-q6',
    testId: 'mock-cyber-security',
    section: 'Information Security & Defensive Engineering',
    companyTag: 'Microsoft Cybersecurity Solutions',
    question: 'What is the core philosophical tenet of the NIST SP 800-207 "Zero Trust Architecture" (ZTA)?',
    options: [
      '"Never Trust, Always Verify": No implicit trust is granted to assets or user accounts based solely on physical or network location (e.g. being inside the corporate internal network or VPN perimeter); every access request is authenticated, authorized, and encrypted continuously',
      'All internal employee machines are blocked from accessing the public internet',
      'Firewalls and perimeter defenses are dismantled entirely in favor of biometric door locks',
      'Users must re-type their password every 5 minutes during active sessions'
    ],
    correctIndex: 0,
    explanation: 'Traditional perimeter ("castle-and-moat") security assumed that anything inside the internal corporate network was trusted. Zero Trust rejects this: an attacker who breaches the perimeter (via phishing or compromised VPN) has zero implicit access. Every request must be verified based on user identity, device posture, location, and micro-segmented service-to-service authorization.',
    shortcutOrInsight: 'Zero Trust Tenet: "Never trust, always verify." Perimeter location provides zero privilege. Enforces micro-segmentation and least privilege continuous verification.',
    difficulty: 'Easy'
  },
  {
    id: 'cyber-q7',
    testId: 'mock-cyber-security',
    section: 'Information Security & Defensive Engineering',
    companyTag: 'Splunk / IBM QRadar SOC',
    question: 'In a modern Security Operations Center (SOC), what role does the "MITRE ATT&CK" framework play in threat detection and SIEM log correlation?',
    options: [
      'It provides a comprehensive, globally-accessible knowledge base of real-world adversary tactics, techniques, and procedures (TTPs) across the entire cyber attack lifecycle to map detection coverage and identify security blind spots',
      'It is an automated worm that penetrates corporate networks to test firewall speeds',
      'It is a compliance checklist mandated strictly for credit card processing under PCI-DSS',
      'It replaces antivirus software with machine learning kernel drivers'
    ],
    correctIndex: 0,
    explanation: 'The MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) framework classifies adversary behaviors into 14 sequential tactics (from Reconnaissance and Initial Access to Persistence, Privilege Escalation, Lateral Movement, and Exfiltration). SOC teams map their SIEM alert rules and EDR detections against ATT&CK matrices to measure real defensive posture.',
    shortcutOrInsight: 'MITRE ATT&CK: A taxonomy of adversary techniques (TTPs). Used to validate SIEM detection coverage and emulate real-world adversary paths.',
    difficulty: 'Medium'
  },
  {
    id: 'cyber-q8',
    testId: 'mock-cyber-security',
    section: 'Information Security & Defensive Engineering',
    companyTag: 'Mandiant Incident Response',
    question: 'According to NIST SP 800-61 Incident Handling guidelines, what must be executed immediately during the "Containment" phase upon discovering a ransomware infection spreading across internal domain hosts?',
    options: [
      'Isolate infected endpoints from the network (physically or via VLAN/EDR quarantine) to stop lateral movement, preserve volatile memory for forensics, before proceeding to Eradication and Recovery',
      'Immediately format all hard drives and reinstall operating systems from clean media',
      'Contact the attackers immediately to negotiate cryptocurrency ransoms',
      'Power off the entire data center generator immediately'
    ],
    correctIndex: 0,
    explanation: 'NIST incident response phases: Preparation -> Detection & Analysis -> Containment, Eradication & Recovery -> Post-Incident Activity. Containment is vital to stop the spread (e.g. isolating machines from the network). Powering down or wiping machines destroys valuable volatile memory (RAM forensics containing encryption keys and injected processes).',
    shortcutOrInsight: 'Incident Handling Rule: Contain before Eradicate! Isolate network connectivity to stop lateral infection, but keep machine running to capture RAM memory forensics.',
    difficulty: 'Medium'
  },
  {
    id: 'cyber-q9',
    testId: 'mock-cyber-security',
    section: 'Information Security & Defensive Engineering',
    companyTag: 'Palo Alto Networks Architecture',
    question: 'What is the purpose of a "Demilitarized Zone" (DMZ) in enterprise network security architecture?',
    options: [
      'A physical or logical subnetwork that exposes an organization\'s external-facing services (e.g. Web servers, Mail gateways) to the untrusted internet, while isolating the internal corporate network (intranet/databases) behind strict inner firewalls',
      'An encrypted hard drive partition where administrative passwords are archived',
      'A private VPN tunnel that connects remote employees without authentication',
      'A server room equipped with biometric scanners and EMP shielding'
    ],
    correctIndex: 0,
    explanation: 'A DMZ sits as an intermediate buffer between the public untrusted internet and the private corporate intranet. External users can access DMZ servers (public HTTP/DNS/Mail). However, if an external web server in the DMZ is compromised, the inner firewall blocks the attacker from freely pivoting into the internal database and Active Directory network.',
    shortcutOrInsight: 'DMZ Architecture: Public Web/Mail sits in DMZ. Inner firewall strictly prevents DMZ servers from initiating connections into the private internal database network.',
    difficulty: 'Easy'
  },
  {
    id: 'cyber-q10',
    testId: 'mock-cyber-security',
    section: 'Information Security & Defensive Engineering',
    companyTag: 'Let\'s Encrypt / DigiCert PKI',
    question: 'In Public Key Infrastructure (PKI) and X.509 certificate revocation checking, how does "OCSP Stapling" improve upon traditional Online Certificate Status Protocol (OCSP)?',
    options: [
      'The web server periodically fetches and cryptographically caches a timestamped OCSP response from the CA, "stapling" it directly to the TLS handshake; this eliminates client latency and preserves user privacy by preventing the CA from monitoring which websites the client visits',
      'OCSP Stapling eliminates the need for Certificate Authorities completely',
      'It embeds the server\'s private key inside the DNS record',
      'It requires the user to install a browser extension to validate certificates'
    ],
    correctIndex: 0,
    explanation: 'In standard OCSP, when a client connects to `example.com`, the client must pause and make a separate HTTP connection to the Certificate Authority (CA) to check if the cert is revoked. This: (1) Leaks client browsing history to the CA (privacy concern), (2) Adds latency, and (3) Breaks if the CA OCSP server is offline. With OCSP Stapling (RFC 6066), the server itself periodically queries the CA, caches the signed response, and sends (staples) it to the client in the TLS handshake.',
    shortcutOrInsight: 'OCSP Stapling: Server fetches & staples the CA\'s signed revocation status directly into the TLS handshake. Faster, offline-resilient, and 100% private for clients.',
    difficulty: 'Hard'
  }
];

// ============================================================================
// 6. ENTERPRISE DOMAINS & SECURITY SPRINT (10 MCQs)
// High-Yield 10-Question Comprehensive Assessment across all 5 Domains
// (2 DBMS, 2 Excel, 2 Power BI, 2 Ethical Hacking, 2 Cyber Security)
// ============================================================================
export const ENTERPRISE_DOMAINS_SPRINT_QUESTIONS: FaangQuestion[] = [
  // DBMS 1 & 2
  DBMS_MOCK_QUESTIONS[0], // WAL & ARIES
  DBMS_MOCK_QUESTIONS[3], // Isolation Levels & Phantom Reads
  // EXCEL 1 & 2
  EXCEL_MOCK_QUESTIONS[0], // XLOOKUP vs VLOOKUP
  EXCEL_MOCK_QUESTIONS[2], // SUMPRODUCT Boolean Array OR
  // POWER BI 1 & 2
  POWER_BI_MOCK_QUESTIONS[0], // Context Transition in CALCULATE
  POWER_BI_MOCK_QUESTIONS[2], // Star Schema vs Bi-directional cross filtering
  // ETHICAL HACKING 1 & 2
  ETHICAL_HACKING_MOCK_QUESTIONS[0], // Nmap TCP SYN Stealth Half-Open
  ETHICAL_HACKING_MOCK_QUESTIONS[4], // AWS SSRF & IMDSv2
  // CYBER SECURITY 1 & 2
  CYBER_SECURITY_MOCK_QUESTIONS[0], // Asymmetric Non-Repudiation
  CYBER_SECURITY_MOCK_QUESTIONS[4], // OAuth 2.0 PKCE for SPAs
];

// ============================================================================
// COMPLETE DOMAIN MOCK TESTS ARRAY (6 Distinct Mock Tests)
// ============================================================================
export const DOMAIN_MOCK_TESTS: FaangMockTest[] = [
  {
    id: 'mock-dbms',
    title: 'DBMS & Enterprise SQL Mock Test',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • ACID, B+ Trees, Normalization, 2PL & ARIES Recovery',
    category: 'ENTERPRISE DOMAINS',
    companyTier: 'Tier-1 Relational & Cloud Database Platforms',
    companies: ['Oracle', 'Amazon RDS', 'Snowflake', 'Microsoft SQL'],
    scheduledDate: 'Enterprise Domain Practice • Slot DB-1 (DBMS & SQL Core)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'dbms-master',
    badgeRewardName: 'DBMS & SQL Architect',
    badgeIcon: '🗄️',
    badgeGradient: 'from-blue-700 via-indigo-800 to-slate-950',
    certificateTitle: 'Official Relational Database Management Systems Credential',
    description: 'A comprehensive technical database crucible assessing Write-Ahead Logging (WAL), ARIES recovery, 3NF vs BCNF functional decomposition, B+ Tree fanout mechanics, ANSI isolation levels, Strict 2PL, Hash Joins, and Slotted-page storage architecture.',
    syllabusHighlights: [
      'Write-Ahead Logging (WAL) Protocol & ARIES Recovery Algorithm',
      'Functional Dependencies, Candidate Keys & BCNF Normalization',
      'B+ Tree Disk Indexing Fanout vs Doubly-Linked Sequential Leaf Scans',
      'ANSI SQL Isolation Levels: Dirty Reads, Non-repeatable Reads & Phantoms',
      'Strict Two-Phase Locking (Strict 2PL) & Cascading Abort Prevention',
      'In-Memory Hash Join Build/Probe Execution Strategy vs Sort-Merge',
      'DENSE_RANK(), RANK(), and ROW_NUMBER() Window Functions',
      'Distributed PACELC Theorem Trade-Offs & Slotted-Page Storage Layout'
    ],
    questions: DBMS_MOCK_QUESTIONS
  },
  {
    id: 'mock-excel',
    title: 'Advanced Excel & Analytics Modeling Mock Test',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • XLOOKUP, Dynamic Arrays, Solver & Power Query',
    category: 'ENTERPRISE DOMAINS',
    companyTier: 'Tier-1 Investment Banking & Strategic Consulting',
    companies: ['Goldman Sachs', 'McKinsey & Co', 'J.P. Morgan', 'Deloitte'],
    scheduledDate: 'Enterprise Domain Practice • Slot XL-2 (Advanced Excel & Modeling)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'excel-master',
    badgeRewardName: 'Excel Analytics Maestro',
    badgeIcon: '📊',
    badgeGradient: 'from-emerald-700 via-teal-800 to-slate-950',
    certificateTitle: 'Official Advanced Excel & Financial Modeling Credential',
    description: 'A rigorous corporate spreadsheet modeling assessment covering XLOOKUP search modes, Dynamic Array #SPILL! handling, SUMPRODUCT boolean matrix arithmetic, NETWORKDAYS.INTL custom weekend masks, PivotTable Calculated Fields vs Items, Simplex LP Solver, and Power Query unpivoting.',
    syllabusHighlights: [
      'XLOOKUP Exact Match Default & Reverse Search Direction',
      'Dynamic Array Formulas, Spill Ranges & #SPILL! Resolution',
      'Multi-Condition OR Aggregations via Boolean SUMPRODUCT Matrix Logic',
      'NETWORKDAYS.INTL Custom Binary Weekend Strings & EOMONTH',
      'PivotTable Calculated Fields (Sum of Fields) vs Calculated Items',
      'Solver Optimization Engines: Simplex LP vs GRG Nonlinear',
      'LET() and LAMBDA() Performance Optimization & Formula Trees',
      'Non-Volatile INDEX() vs Volatile OFFSET() Recalculation Overhead'
    ],
    questions: EXCEL_MOCK_QUESTIONS
  },
  {
    id: 'mock-powerbi',
    title: 'Power BI & DAX Intelligence Mock Test',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • Context Transition, Star Schema, VertiPaq & RLS',
    category: 'ENTERPRISE DOMAINS',
    companyTier: 'Tier-1 Enterprise Analytics & Cloud BI Platforms',
    companies: ['Microsoft Power BI', 'Amazon BI', 'Cisco Systems', 'Uber Data'],
    scheduledDate: 'Enterprise Domain Practice • Slot PBI-3 (Power BI & DAX Systems)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'powerbi-master',
    badgeRewardName: 'Power BI & DAX Specialist',
    badgeIcon: '📈',
    badgeGradient: 'from-amber-600 via-yellow-700 to-slate-950',
    certificateTitle: 'Official Power BI & DAX Business Intelligence Credential',
    description: 'An elite enterprise business intelligence assessment probing DAX Context Transition in CALCULATE, filter modifiers (ALL, ALLEXCEPT), Star Schema relationship directional hazards, USERELATIONSHIP role-playing dimensions, Power Query query folding pushdown, VertiPaq columnar compression, and Dynamic RLS.',
    syllabusHighlights: [
      'DAX Context Transition: Converting Row Context into Filter Context',
      'DAX Filter Modifiers: ALL(), ALLEXCEPT() and ALLSELECTED()',
      'Star Schema Best Practices vs Bi-Directional Cross-Filtering Ambiguities',
      'USERELATIONSHIP() Dynamic Inactive Relationship Activation',
      'Power Query M-Code Query Folding Source Pushdown Mechanics',
      'VertiPaq Storage Engine: Dictionary Encoding, RLE & Bit-Packing',
      'Dynamic Row-Level Security (RLS) with USERPRINCIPALNAME()',
      'Performance Profiling: Formula Engine (FE) vs Storage Engine (SE)'
    ],
    questions: POWER_BI_MOCK_QUESTIONS
  },
  {
    id: 'mock-ethical-hacking',
    title: 'Ethical Hacking & Penetration Testing Mock Test',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • Nmap SYN Scans, SQLi, XSS, SSRF, IDOR & SUID',
    category: 'ENTERPRISE DOMAINS',
    companyTier: 'Tier-1 Offensive Security & Red Team Consultancies',
    companies: ['CrowdStrike', 'Mandiant', 'Palo Alto Unit 42', 'HackerOne'],
    scheduledDate: 'Enterprise Domain Practice • Slot SEC-4 (Ethical Hacking & Red Team)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'ethical-hacking-master',
    badgeRewardName: 'Ethical Hacker & Red Team Specialist',
    badgeIcon: '⚔️',
    badgeGradient: 'from-rose-700 via-red-800 to-slate-950',
    certificateTitle: 'Official Ethical Hacking & Penetration Testing Credential',
    description: 'An offensive security examination testing TCP SYN stealth scans, Time-based Blind SQL Injection, XSS session riding vs HttpOnly cookie protections, SameSite CSRF mechanics, AWS IMDSv2 SSRF mitigation, BOLA/IDOR API flaws, x86 stack buffer overflows, and Linux SUID privilege escalation.',
    syllabusHighlights: [
      'Nmap TCP SYN Half-Open Stealth Scanning Packet Mechanics (-sS)',
      'Time-Based Blind SQLi payloads & Database Sleep Delay Inferences',
      'Cross-Site Scripting (XSS) Defenses & HttpOnly Cookie Boundaries',
      'SameSite=Strict vs SameSite=Lax Anti-CSRF Browser Policies',
      'Server-Side Request Forgery (SSRF) on AWS EC2 & IMDSv2 Token Defense',
      'Broken Object Level Authorization (BOLA/IDOR) on REST APIs',
      'Stack Buffer Overflows: EIP Overwrite, NOP Sleds & Shellcode Execution',
      'Linux SUID Privilege Escalation via GTFOBins & WPA2 4-Way Handshakes'
    ],
    questions: ETHICAL_HACKING_MOCK_QUESTIONS
  },
  {
    id: 'mock-cyber-security',
    title: 'Cyber Security & Defensive Architecture Mock Test',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • Cryptography, Zero Trust, Firewalls, OAuth PKCE & SIEM',
    category: 'ENTERPRISE DOMAINS',
    companyTier: 'Tier-1 Enterprise Cyber Defense & Cloud Infrastructure',
    companies: ['Cloudflare', 'Apple Security', 'Okta', 'Fortinet'],
    scheduledDate: 'Enterprise Domain Practice • Slot SEC-5 (Cyber Defense & Architecture)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'cyber-security-master',
    badgeRewardName: 'Cyber Defense & Security Architect',
    badgeIcon: '🛡️',
    badgeGradient: 'from-purple-700 via-indigo-900 to-slate-950',
    certificateTitle: 'Official Cyber Security & Enterprise Defense Credential',
    description: 'A defensive cyber architecture evaluation examining asymmetric digital signatures for non-repudiation, AES-256-GCM AEAD encryption, Ephemeral Diffie-Hellman Perfect Forward Secrecy (PFS), Stateful firewalls vs WAF, OAuth 2.0 PKCE flow, NIST SP 800-207 Zero Trust, MITRE ATT&CK, and OCSP Stapling.',
    syllabusHighlights: [
      'Asymmetric Digital Signatures, Digest Hashing & Non-Repudiation',
      'AES-GCM Authenticated Encryption with Associated Data (AEAD)',
      'TLS 1.3 Perfect Forward Secrecy (PFS) via Ephemeral ECDHE',
      'Stateful Packet Inspection (SPI) Firewalls vs Stateless Access Lists',
      'OAuth 2.0 Authorization Code Flow with PKCE for Public SPA Clients',
      'NIST SP 800-207 Zero Trust Architecture (ZTA) & Micro-Segmentation',
      'SOC SIEM Correlation & MITRE ATT&CK Enterprise Matrix Tactics',
      'NIST SP 800-61 Incident Response Isolation & OCSP Stapling in PKI'
    ],
    questions: CYBER_SECURITY_MOCK_QUESTIONS
  },
  {
    id: 'mock-enterprise-domains-sprint',
    title: 'Enterprise Domains & Security 10-MCQ Sprint',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • DBMS, Excel, Power BI, Ethical Hacking & Cyber Security',
    category: 'ENTERPRISE DOMAINS',
    companyTier: 'Tier-1 Polymath Assessment (All 5 Enterprise Domains)',
    companies: ['Microsoft', 'Amazon', 'CrowdStrike', 'Goldman Sachs'],
    scheduledDate: 'Enterprise Domain Practice • Slot DOM-6 (Comprehensive 5-Domain Sprint)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'domain-sprint-master',
    badgeRewardName: 'Enterprise Domain Polymath',
    badgeIcon: '🌐',
    badgeGradient: 'from-cyan-600 via-indigo-700 to-purple-950',
    certificateTitle: 'Official Enterprise Domains & Cyber Security Polymath Credential',
    description: 'The ultimate cross-domain sprint combining 2 flagship questions from each of the 5 key enterprise pillars: DBMS, Advanced Excel, Power BI, Ethical Hacking, and Cyber Security. Designed for high-performing technology consultants and systems architects.',
    syllabusHighlights: [
      'DBMS: Write-Ahead Logging & ANSI Isolation Level Anomalies',
      'Excel: XLOOKUP Defaults & SUMPRODUCT Boolean Multi-Condition Aggregations',
      'Power BI: DAX Context Transition in CALCULATE & Star Schema Hazards',
      'Ethical Hacking: Nmap TCP SYN Half-Open Scans & AWS IMDSv2 SSRF Defenses',
      'Cyber Security: Asymmetric Non-Repudiation & OAuth 2.0 PKCE for SPAs'
    ],
    questions: ENTERPRISE_DOMAINS_SPRINT_QUESTIONS
  }
];
