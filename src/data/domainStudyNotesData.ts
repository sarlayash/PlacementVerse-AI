export interface DomainFormulaOrQuery {
  title: string;
  codeOrFormula: string;
  language: string;
  explanation: string;
  useCase: string;
}

export interface DomainInterviewPitfall {
  trap: string;
  whyCandidatesFail: string;
  correctResponse: string;
}

export interface DomainCoreTopicNote {
  title: string;
  summary: string;
  deepDive: string[];
  keyTerms: string[];
}

export interface DomainStudyNote {
  id: string;
  domainName: string;
  category: 'Enterprise Domains' | 'Programming Languages' | 'Algorithms & Core' | 'General Placement';
  icon: string;
  tagline: string;
  estimatedReadTime: string;
  level: string;
  testId: string; // Linking to mock test in FAANG_MOCK_TESTS
  badgeId: string; // Linking to badge in badgesData
  overview: string;
  keyArchitecturalNotes: DomainCoreTopicNote[];
  formulasAndSyntax: DomainFormulaOrQuery[];
  interviewPitfalls: DomainInterviewPitfall[];
  quickRevisionSummary: string[];
}

export const DOMAIN_STUDY_NOTES: DomainStudyNote[] = [
  // 1. DBMS & SQL Architecture
  {
    id: 'dbms-sql',
    domainName: 'DBMS & SQL Architecture',
    category: 'Enterprise Domains',
    icon: '🗄️',
    tagline: 'Relational Theory, ACID Transactions, WAL Recovery, B+ Trees & Query Optimization',
    estimatedReadTime: '12 min',
    level: 'Hard (High-Bar)',
    testId: 'mock-dbms-sql',
    badgeId: 'dbms-master',
    overview: 'Database Management Systems underpin enterprise scale software. Mastery requires moving beyond basic CRUD into storage engine internals, indexing mechanics, recovery algorithms (ARIES/WAL), transaction isolation anomalies, and formal relational normalization (3NF vs BCNF).',
    keyArchitecturalNotes: [
      {
        title: 'Transaction ACID & Write-Ahead Logging (WAL)',
        summary: 'Transactions provide Atomicity, Consistency, Isolation, and Durability. Durability and Atomicity are strictly enforced via the Write-Ahead Logging protocol.',
        deepDive: [
          'The fundamental rule of WAL: Any log record describing a database page change MUST be flushed to stable storage before the dirty page itself is written to disk.',
          'In ARIES recovery: Analysis Pass reconstructs the transaction table and dirty page table. Redo Pass rolls forward from the oldest uncheckpointed dirty page (repeating history). Undo Pass scans backward, rolling back uncommitted active transactions using Compensation Log Records (CLRs).',
          'CLRs prevent cascading aborts and guarantee idempotency even if recovery crashes mid-way.'
        ],
        keyTerms: ['WAL Protocol', 'ARIES Algorithm', 'Dirty Page Table', 'Compensation Log Record (CLR)', 'Idempotency']
      },
      {
        title: 'B+ Tree Indexing vs Hash Indexing',
        summary: 'B+ Trees are the universal standard for disk-oriented RDBMS indices (PostgreSQL, MySQL InnoDB, Oracle) due to shallow depth and range scan efficiency.',
        deepDive: [
          'Unlike standard B-Trees where keys and data records exist in both internal and leaf nodes, B+ Trees store data records (or pointers) EXCLUSIVELY in leaf nodes.',
          'All leaf nodes are connected via a doubly linked list, enabling O(log N + K) range scans without tree traversals.',
          'High fanout (typically 100 to 200 children per node) keeps tree height to 3-4 levels for billions of records, requiring only 3-4 I/O disk page reads.'
        ],
        keyTerms: ['B+ Tree Fanout', 'Leaf Node Doubly Linked List', 'Clustered vs Secondary Index', 'Composite Index Column Order']
      },
      {
        title: 'ANSI SQL Isolation Levels & Concurrency Anomalies',
        summary: 'Isolation levels trade off concurrency throughput against consistency anomalies (Dirty Read, Non-Repeatable Read, Phantom Read, Serialization Anomaly).',
        deepDive: [
          'Read Uncommitted: Prone to Dirty Reads (reading uncommitted writes).',
          'Read Committed: Eliminates Dirty Reads using short-lived read locks or snapshot reads at statement start.',
          'Repeatable Read: Eliminates Dirty Reads and Non-Repeatable Reads. In standard 2PL, requires shared locks until transaction end; in MVCC (Postgres/InnoDB), uses a single snapshot taken at transaction start.',
          'Serializable: Complete isolation preventing Phantom Reads and Write Skew using strict 2-Phase Locking (SS2PL) or Serializable Snapshot Isolation (SSI).'
        ],
        keyTerms: ['Dirty Read', 'Non-Repeatable Read', 'Phantom Read', 'Write Skew', 'MVCC (Multi-Version Concurrency Control)']
      }
    ],
    formulasAndSyntax: [
      {
        title: 'Window Function: Dense Ranking across Departments',
        codeOrFormula: `SELECT employee_id, department_id, salary,
       DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank_in_dept
FROM employees
WHERE is_active = TRUE;`,
        language: 'sql',
        explanation: 'DENSE_RANK() produces ranks without gaps (1, 2, 2, 3), partitioned per department.',
        useCase: 'Used in FAANG SQL screenings to find the N-th highest earner per department without correlated subquery overhead.'
      },
      {
        title: 'Recursive CTE for Hierarchical Organization Chart',
        codeOrFormula: `WITH RECURSIVE OrgChart AS (
  SELECT emp_id, manager_id, name, 1 AS depth
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.emp_id, e.manager_id, e.name, o.depth + 1
  FROM employees e
  INNER JOIN OrgChart o ON e.manager_id = o.emp_id
)
SELECT * FROM OrgChart ORDER BY depth, emp_id;`,
        language: 'sql',
        explanation: 'Anchor member retrieves root executives; recursive member joins children iteratively until leaf employees are traversed.',
        useCase: 'BOM (Bill of Materials), category taxonomy trees, and organizational reporting hierarchy traversal.'
      }
    ],
    interviewPitfalls: [
      {
        trap: 'Confusing 3NF with BCNF functional dependencies.',
        whyCandidatesFail: 'Assuming any table in 3NF is automatically in BCNF.',
        correctResponse: 'BCNF requires that for EVERY functional dependency X → Y, X MUST be a superkey. In 3NF, Y is also permitted to be a prime attribute (part of a candidate key). BCNF eliminates all redundancy but does not always preserve functional dependencies.'
      },
      {
        trap: 'Claiming MVCC completely eliminates locks in write transactions.',
        whyCandidatesFail: 'Candidates think MVCC means "never locking anything".',
        correctResponse: 'MVCC allows readers to never block writers, and writers never block readers. However, concurrent writers modifying the SAME row must acquire exclusive row-level write locks to prevent conflicting overwrites.'
      }
    ],
    quickRevisionSummary: [
      'WAL invariant: Log written to disk BEFORE dirty data page writes.',
      'B+ Tree stores records strictly in linked leaves; internal nodes only store navigation keys.',
      'BCNF: For every X → Y, X must be a superkey. 3NF allows Y to be a prime attribute.',
      'MVCC creates row versions; dead tuples require VACUUM / garbage collection.',
      'Deadlocks are resolved using Wait-For Graph cycle detection or Wait-Die / Wound-Wait timestamps.'
    ]
  },

  // 2. Advanced Excel & Analytics Modeling
  {
    id: 'excel-analytics',
    domainName: 'Advanced Excel & Analytics Modeling',
    category: 'Enterprise Domains',
    icon: '📊',
    tagline: 'Dynamic Array Engine, XLOOKUP, Multi-Condition SUMPRODUCT, Solver LP & Power Query',
    estimatedReadTime: '11 min',
    level: 'Hard (Enterprise Corporate)',
    testId: 'mock-excel-analytics',
    badgeId: 'excel-master',
    overview: 'Modern Microsoft Excel is a full calculation and data modeling platform. Enterprise corporate roles require mastery of the calculation engine, dynamic array spill behavior, multi-condition boolean arithmetic, sensitivity modeling, and ETL Power Query M-code.',
    keyArchitecturalNotes: [
      {
        title: 'Modern Calculation Engine & Dynamic Arrays (#SPILL!)',
        summary: 'Excel 365 introduced dynamic arrays, eliminating legacy CSE (Ctrl+Shift+Enter) formulas. Formulas returning multiple cells automatically spill into adjacent cells.',
        deepDive: [
          'A formula returning multiple values spills into neighboring blank cells denoted by the blue bounding box.',
          'If ANY cell in the spill range contains text, numbers, formatting formulas, or merged cells, Excel returns a #SPILL! error immediately.',
          'The Spill Operator (#): Referencing the top-left cell followed by # (e.g. =SUM(A2#)) references the entire dynamic spill range dynamically as it expands or contracts.'
        ],
        keyTerms: ['Dynamic Array Engine', '#SPILL! Error', 'Spill Operator (#)', 'FILTER, UNIQUE, SORT, SEQUENCE']
      },
      {
        title: 'XLOOKUP Architecture vs VLOOKUP / INDEX-MATCH',
        summary: 'XLOOKUP replaces VLOOKUP and HLOOKUP, defaulting to exact match and bidirectional column retrieval.',
        deepDive: [
          'XLOOKUP requires lookup_value, lookup_array, and return_array. It never requires a column index number, making it immune to column insertions/deletions.',
          'Supports reverse search (search from last item using search_mode = -1), binary search on sorted data (search_mode = 2), and wildcard matching (match_mode = 2).',
          'Native `if_not_found` argument replaces cumbersome nested IFERROR(VLOOKUP(...)) wrappers.'
        ],
        keyTerms: ['XLOOKUP', 'Lookup Array Separation', 'Reverse Search', 'Binary Search Match Mode']
      },
      {
        title: 'Boolean Array Arithmetic with SUMPRODUCT',
        summary: 'SUMPRODUCT performs array multiplications and sums without requiring array formula brackets, evaluating complex AND/OR logic via boolean coercion.',
        deepDive: [
          'The double unary operator (--) coerces TRUE/FALSE boolean evaluation arrays into numerical 1s and 0s: --(A2:A100="North") yields an array of {1;0;1;...}.',
          'AND conditions are evaluated via multiplication: (Range1=Criteria1) * (Range2=Criteria2).',
          'OR conditions are evaluated via addition: (Range1=Criteria1) + (Range2=Criteria2).'
        ],
        keyTerms: ['Double Unary Operator (--)', 'Boolean Array Coercion', 'Cross-Table Conditional Aggregation']
      }
    ],
    formulasAndSyntax: [
      {
        title: 'Multi-Condition Dynamic Filtering & Sorting',
        codeOrFormula: `=SORT(FILTER(A2:D100, (C2:C100="Finance") * (D2:D100>=50000), "No Records Found"), 4, -1)`,
        language: 'excel',
        explanation: 'Filters A2:D100 for rows where Column C is Finance AND Column D >= 50,000, then sorts descending by Column 4.',
        useCase: 'Executive KPI reporting dashboards with real-time reactive filtering.'
      },
      {
        title: 'Bidirectional Multi-Criteria XLOOKUP',
        codeOrFormula: `=XLOOKUP(1, (DeptRange="Engineering") * (RoleRange="Architect"), SalaryRange, "Not Found", 0)`,
        language: 'excel',
        explanation: 'Evaluates boolean multiplication array where both conditions equal 1, retrieving the corresponding salary without helper columns.',
        useCase: 'Two-dimensional composite key lookups in HR compensation modeling.'
      }
    ],
    interviewPitfalls: [
      {
        trap: 'Not knowing how to resolve a #SPILL! error in an automated sheet.',
        whyCandidatesFail: 'Assuming the formula syntax is invalid or corrupted.',
        correctResponse: 'Clear any obstruction in the projected output rectangle. Even an invisible space character or a merged cell will block the spill engine.'
      },
      {
        trap: 'Using VLOOKUP for right-to-left lookups without understanding column index limitation.',
        whyCandidatesFail: 'Attempting to use negative index numbers in VLOOKUP.',
        correctResponse: 'VLOOKUP cannot search to the left of the lookup column. Use XLOOKUP or INDEX(array, MATCH(...)) instead.'
      }
    ],
    quickRevisionSummary: [
      'XLOOKUP separates lookup array from return array, preventing column insertion bugs.',
      '#SPILL! occurs when any non-empty or merged cell obstructs the dynamic array destination.',
      'SUMPRODUCT with double unary (--) coerces booleans into 1s and 0s for lightning fast multi-criteria sums.',
      'Power Query M-code transforms data upstream, keeping Excel workbook memory lean.',
      'Solver Simplex LP is used for linear optimization; GRG Nonlinear for smooth curves.'
    ]
  },

  // 3. Power BI & DAX Intelligence
  {
    id: 'powerbi-dax',
    domainName: 'Power BI & DAX Intelligence',
    category: 'Enterprise Domains',
    icon: '📈',
    tagline: 'DAX Context Transition, CALCULATE Modifiers, Star Schema & VertiPaq Compression',
    estimatedReadTime: '13 min',
    level: 'Hard (Architect Level)',
    testId: 'mock-powerbi-dax',
    badgeId: 'powerbi-master',
    overview: 'Power BI Enterprise analytics demands mastering the DAX formula engine, row context vs filter context, Context Transition via CALCULATE, VertiPaq column-store data compression, Star Schema modeling, and Dynamic Row-Level Security.',
    keyArchitecturalNotes: [
      {
        title: 'DAX Context Transition (The Foundation of DAX)',
        summary: 'Context Transition occurs when CALCULATE (or a measure reference) is executed inside an existing Row Context (such as SUMX, FILTER, or calculated columns).',
        deepDive: [
          'Row Context iterates row by row and only knows about values in the CURRENT row. It does NOT filter other tables or measures.',
          'When CALCULATE is invoked inside a Row Context, it takes ALL column values of the current row and transforms them into an equivalent Filter Context.',
          'Crucial Rule: Referencing ANY DAX measure inside an iterator implicitly wraps it in an invisible CALCULATE(), triggering Context Transition automatically!'
        ],
        keyTerms: ['Row Context', 'Filter Context', 'Context Transition', 'Implicit CALCULATE() in Measures']
      },
      {
        title: 'CALCULATE Filter Modifiers (ALL, KEEPFILTERS, REMOVEFILTERS)',
        summary: 'CALCULATE is the only DAX function capable of creating, modifying, overriding, or removing existing Filter Contexts.',
        deepDive: [
          'Standard CALCULATE filter arguments OVERRIDE existing filter context on the specified column.',
          'KEEPFILTERS preserves the existing filter context and applies an intersection (AND) instead of replacing the filter.',
          'ALL() removes all filter context from specified columns or tables, commonly used to compute percentage-of-total denominators: [Total Sales] / CALCULATE([Total Sales], ALL(Products)).',
          'REMOVEFILTERS() is syntactic sugar for ALL() when used as a filter argument.'
        ],
        keyTerms: ['CALCULATE', 'ALL', 'REMOVEFILTERS', 'KEEPFILTERS', 'Filter Overwrite']
      },
      {
        title: 'Star Schema vs Snowflake Schema & VertiPaq Engine',
        summary: 'Star Schemas (1 Fact Table surrounded by 1-to-many Dimension Tables) are the cardinal best practice for Power BI data modeling.',
        deepDive: [
          'VertiPaq is an in-memory columnar database. It compresses data using Dictionary Encoding, Value Encoding, and Run-Length Encoding (RLE).',
          'High cardinality columns (like GUIDs or timestamps with seconds) destroy compression efficiency. Always split datetime into separate Date and Time columns.',
          'Bidirectional cross-filtering introduces ambiguity, circular relationships, and massive performance degradation. Prefer single-direction relationships with CROSSFILTER() measure overrides.'
        ],
        keyTerms: ['Star Schema', 'VertiPaq Columnar Engine', 'Run-Length Encoding (RLE)', 'Column Cardinality', 'Bidirectional Cross-Filtering Hazards']
      }
    ],
    formulasAndSyntax: [
      {
        title: 'Year-over-Year (YoY) Sales Growth Measure',
        codeOrFormula: `YoY Sales Growth % = 
VAR CurrentYearSales = [Total Revenue]
VAR PriorYearSales = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR('DimDate'[Date]))
RETURN
DIVIDE(CurrentYearSales - PriorYearSales, PriorYearSales, 0)`,
        language: 'dax',
        explanation: 'Uses SAMEPERIODLASTYEAR time intelligence with DIVIDE function to safely prevent divide-by-zero errors.',
        useCase: 'Executive financial reporting and corporate performance boards.'
      },
      {
        title: 'Dynamic Row-Level Security (RLS) Predicate',
        codeOrFormula: `'DimEmployee'[EmailAddress] = USERPRINCIPALNAME()`,
        language: 'dax',
        explanation: 'Evaluates against the Microsoft Entra / Azure AD identity of the viewing user in Power BI Service.',
        useCase: 'Restricting sales executives to view only their own team accounts.'
      }
    ],
    interviewPitfalls: [
      {
        trap: 'Using a calculated column instead of a DAX measure for aggregations.',
        whyCandidatesFail: 'Thinking calculated columns and measures are interchangeable.',
        correctResponse: 'Calculated columns are computed during data refresh and stored in memory, consuming RAM. Measures are calculated dynamically on-the-fly in response to slicer filter context, using zero persistent storage.'
      },
      {
        trap: 'Not knowing what happens when a measure is evaluated inside a calculated column.',
        whyCandidatesFail: 'Forgetting Context Transition.',
        correctResponse: 'The measure is wrapped in an implicit CALCULATE, turning every column in the current row into a filter context. If not handled carefully, it can cause unexpected table scans.'
      }
    ],
    quickRevisionSummary: [
      'Context Transition: CALCULATE converts Row Context into Filter Context.',
      'Measures inside iterators are implicitly wrapped in CALCULATE().',
      'Star Schema is optimal for Power BI VertiPaq columnar compression.',
      'DIVIDE(A, B, alternate) handles division by zero gracefully without throwing errors.',
      'Dynamic RLS leverages USERPRINCIPALNAME() in Power BI Service.'
    ]
  },

  // 4. Ethical Hacking & Penetration Testing
  {
    id: 'ethical-hacking',
    domainName: 'Ethical Hacking & Penetration Testing',
    category: 'Enterprise Domains',
    icon: '⚔️',
    tagline: 'Nmap Scanning, Blind SQLi, Stored XSS, SSRF IMDSv2, BOLA/IDOR & Buffer Overflows',
    estimatedReadTime: '14 min',
    level: 'Hard (Offensive Security)',
    testId: 'mock-ethical-hacking',
    badgeId: 'ethical-hacking-master',
    overview: 'Ethical Hacking and Red Team operations simulate adversary tactics (MITRE ATT&CK) to identify security flaws before malicious actors exploit them. Key competencies span recon, web application vulnerability exploitation (OWASP Top 10), binary exploitation, and privilege escalation.',
    keyArchitecturalNotes: [
      {
        title: 'Reconnaissance & Port Scanning (Nmap Mechanics)',
        summary: 'Stealth port scanning allows identifying active services, OS versions, and firewall filtering states.',
        deepDive: [
          'TCP SYN Scan (-sS): Known as "Half-Open" scanning. Sends a SYN packet. If the target responds with SYN/ACK, the port is open; the scanner immediately sends a RST packet without completing the 3-way handshake, avoiding socket connection logging on legacy systems.',
          'TCP Connect Scan (-sT): Completes full 3-way handshake (SYN → SYN/ACK → ACK). Used when raw socket permissions (root/Administrator) are unavailable.',
          'UDP Scanning (-sU): Relies on ICMP Port Unreachable (Type 3, Code 3) messages. Slower due to ICMP rate-limiting on target OS kernels.'
        ],
        keyTerms: ['TCP SYN Stealth Scan (-sS)', '3-Way Handshake', 'RST Packet', 'Banner Grabbing', 'Nmap Scripting Engine (NSE)']
      },
      {
        title: 'OWASP Top 10 Web Exploitation (SQLi, XSS, SSRF)',
        summary: 'Web applications represent the primary external attack surface. Understanding injection vectors is essential for penetration testers.',
        deepDive: [
          'SQL Injection (SQLi): Classical In-band, Error-based, Blind Boolean-based (true/false binary search inference), and Time-based (using pg_sleep() or WAITFOR DELAY). Defended with Parameterized Queries / Prepared Statements.',
          'Cross-Site Scripting (XSS): Stored (persisted in DB), Reflected (executed via URL parameters), and DOM-based (client-side JS sink like innerHTML). Defended via context-aware output encoding and Content Security Policy (CSP).',
          'Server-Side Request Forgery (SSRF): Forcing the server to make unauthorized requests to internal network assets (e.g. AWS Metadata service at 169.254.169.254). Defended by requiring session tokens in IMDSv2.'
        ],
        keyTerms: ['Blind SQLi', 'Stored XSS vs Reflected XSS', 'DOM-based XSS', 'SSRF', 'AWS IMDSv2 Tokenized Headers']
      },
      {
        title: 'API Security: BOLA / IDOR Vulnerabilities',
        summary: 'Broken Object Level Authorization (BOLA), historically known as Insecure Direct Object References (IDOR), is the #1 API vulnerability.',
        deepDive: [
          'Occurs when an API endpoint accepts an arbitrary user-supplied identifier (e.g., GET /api/users/1042/payroll) without verifying that the authenticated caller owns or has rights to record 1042.',
          'Defended by enforcing object-level authorization checks in middleware or using cryptographically signed references or random UUIDv4 identifiers paired with session claim validation.'
        ],
        keyTerms: ['BOLA (Broken Object Level Authorization)', 'IDOR', 'UUIDv4', 'Session Claim Verification']
      }
    ],
    formulasAndSyntax: [
      {
        title: 'Nmap Comprehensive Service & Vulnerability Scan Command',
        codeOrFormula: `nmap -sS -sV -sC -O -T4 -p- 10.10.14.25 -oA full_scan_results`,
        language: 'bash',
        explanation: 'Runs TCP SYN stealth scan (-sS), service versions (-sV), default NSE scripts (-sC), OS detection (-O), all 65535 ports (-p-) at speed T4.',
        useCase: 'Initial enumeration phase of penetration testing engagements.'
      },
      {
        title: 'Blind SQLi Time-Based Inference Payload',
        codeOrFormula: `admin' AND (SELECT CASE WHEN (ASCII(SUBSTRING(password,1,1))=97) THEN pg_sleep(5) ELSE pg_sleep(0) END FROM users WHERE username='admin')--`,
        language: 'sql',
        explanation: 'Forces a 5-second database response delay if the first letter of the admin password is "a" (ASCII 97), leaking data byte-by-byte.',
        useCase: 'Extracting data through non-verbose, blind database endpoints.'
      }
    ],
    interviewPitfalls: [
      {
        trap: 'Assuming parameterized queries can be bypassed with URL encoding.',
        whyCandidatesFail: 'Not understanding that parameterized queries separate code from data at the database parser level.',
        correctResponse: 'Prepared statements treat all user input strictly as literal parameter data, regardless of encoding or malicious characters. The SQL parser never executes user data as SQL commands.'
      },
      {
        trap: 'Confusing Authentication with Authorization in BOLA/IDOR.',
        whyCandidatesFail: 'Thinking a valid JWT token prevents IDOR.',
        correctResponse: 'Authentication verifies identity (who you are). Authorization verifies access (what you are allowed to see). A valid user can authenticate properly, then exploit BOLA to access another user\'s private records.'
      }
    ],
    quickRevisionSummary: [
      'Nmap -sS sends SYN and resets with RST on SYN-ACK to avoid completing connection.',
      'Blind SQLi infers data via boolean true/false responses or time delays (pg_sleep).',
      'SSRF targets internal endpoints like cloud metadata (169.254.169.254); mitigated by IMDSv2.',
      'BOLA/IDOR: API fails to verify if the authenticated user has permission for the requested object ID.',
      'Buffer Overflow overwrites the Instruction Pointer (EIP/RIP) to redirect control flow.'
    ]
  },

  // 5. Cyber Security & Defensive Architecture
  {
    id: 'cyber-security',
    domainName: 'Cyber Security & Defensive Architecture',
    category: 'Enterprise Domains',
    icon: '🛡️',
    tagline: 'Asymmetric Cryptography, TLS 1.3 PFS, OAuth 2.0 PKCE, Zero Trust ZTA & MITRE ATT&CK',
    estimatedReadTime: '13 min',
    level: 'Hard (Defense & Enterprise GRC)',
    testId: 'mock-cyber-security',
    badgeId: 'cyber-security-master',
    overview: 'Defensive Cyber Security and Security Architecture safeguard enterprise digital estates against advanced persistent threats (APTs). Core pillars encompass applied cryptography, protocol security (TLS 1.3 / OAuth 2.0 PKCE), Zero Trust Architecture (NIST SP 800-207), and Threat Modeling.',
    keyArchitecturalNotes: [
      {
        title: 'Asymmetric Cryptography & Digital Signatures',
        summary: 'Asymmetric public-key cryptography (RSA, ECC / ECDSA) provides confidentiality, authenticity, and non-repudiation.',
        deepDive: [
          'Confidentiality: Plaintext is encrypted with the recipient\'s PUBLIC key. Only the recipient\'s PRIVATE key can decrypt it.',
          'Digital Signatures: A cryptographic hash of the message is encrypted with the sender\'s PRIVATE key. Anyone can verify the signature using the sender\'s PUBLIC key.',
          'Non-Repudiation: The sender cannot deny authoring the message because only their private key could have produced the valid signature.'
        ],
        keyTerms: ['Public Key vs Private Key', 'Digital Signatures', 'ECDSA / Ed25519', 'Non-Repudiation', 'PKI (Public Key Infrastructure)']
      },
      {
        title: 'TLS 1.3 & Perfect Forward Secrecy (PFS)',
        summary: 'TLS 1.3 is the modern transport layer standard, drastically reducing latency and deprecating vulnerable cryptographic primitives.',
        deepDive: [
          'Deprecated RSA key exchange in favor of Ephemeral Diffie-Hellman (ECDHE).',
          'Perfect Forward Secrecy (PFS): Even if an adversary records encrypted network traffic for years and later steals the server\'s private key, they CANNOT decrypt historical recorded sessions because session keys are ephemeral and discarded.',
          'Reduced handshake to 1-RTT (and 0-RTT resumption), eliminating obsolete ciphers (RC4, 3DES, CBC mode ciphers).'
        ],
        keyTerms: ['TLS 1.3', 'Perfect Forward Secrecy (PFS)', 'ECDHE Key Exchange', '1-RTT Handshake', 'AEAD Ciphers']
      },
      {
        title: 'OAuth 2.0 PKCE (Proof Key for Code Exchange)',
        summary: 'PKCE (RFC 7636) prevents authorization code interception attacks on public clients (Single Page Apps, Mobile Apps).',
        deepDive: [
          'Public clients cannot safely store a client_secret because client-side source code is inspectable by users or reverse-engineered.',
          'PKCE Workflow: The client generates a high-entropy cryptographically random `code_verifier`. It computes `code_challenge = BASE64URL(SHA256(code_verifier))`.',
          'The client sends the challenge in the auth request. When redeeming the authorization code at the token endpoint, it provides the original plain `code_verifier`. The authorization server hashes it and matches against the stored challenge before issuing tokens.'
        ],
        keyTerms: ['OAuth 2.0 Authorization Code Flow', 'PKCE', 'Code Verifier vs Code Challenge', 'Public vs Confidential Clients']
      }
    ],
    formulasAndSyntax: [
      {
        title: 'NIST Zero Trust Architecture (ZTA) Principles',
        codeOrFormula: `Rule 1: Never Trust, Always Verify.
Rule 2: Assume Breach at all times.
Rule 3: Enforce Least Privilege Access (Just-In-Time, Just-Enough).
Rule 4: Dynamic Policy Engine evaluates context (Device Health + Location + MFA + Behavior) on EVERY request.`,
        language: 'text',
        explanation: 'NIST SP 800-207 framework eliminating the traditional castle-and-moat perimeter security model.',
        useCase: 'Modern enterprise identity and access management architecture.'
      },
      {
        title: 'OpenSSL Command to Verify TLS Certificate Chain & Expiry',
        codeOrFormula: `openssl s_client -connect api.enterprise.com:443 -servername api.enterprise.com -showcerts </dev/null | openssl x509 -noout -dates -subject -issuer`,
        language: 'bash',
        explanation: 'Connects via TLS with SNI, extracts the leaf certificate, and outputs valid dates, subject identity, and issuing CA.',
        useCase: 'Validating PKI certificate rotation and preventing expired certificate outages.'
      }
    ],
    interviewPitfalls: [
      {
        trap: 'Saying a digital signature is created by encrypting the document with the recipient\'s public key.',
        whyCandidatesFail: 'Reversing public and private key roles in encryption vs signing.',
        correctResponse: 'A digital signature is created by hashing the document and encrypting that hash with the SENDER\'S PRIVATE KEY. The recipient decrypts the signature with the sender\'s public key to verify integrity.'
      },
      {
        trap: 'Thinking base64 encoding provides encryption or obfuscation.',
        whyCandidatesFail: 'Confusing encoding formats with cryptographic encryption.',
        correctResponse: 'Base64 is an encoding scheme for binary-to-text representation. It contains zero keys and zero security; anyone can decode base64 instantaneously without a secret.'
      }
    ],
    quickRevisionSummary: [
      'Digital signatures use the sender\'s private key to sign and public key to verify.',
      'TLS 1.3 enforces Perfect Forward Secrecy via ECDHE, discarding session keys after use.',
      'OAuth 2.0 PKCE protects public clients against authorization code interception without a client secret.',
      'Zero Trust: Never trust, always verify; evaluate continuous device and identity context.',
      'AES-GCM provides Authenticated Encryption with Associated Data (AEAD), ensuring confidentiality and integrity.'
    ]
  },

  // 6. C & Systems Programming
  {
    id: 'c-programming',
    domainName: 'C & Systems Programming',
    category: 'Programming Languages',
    icon: '💻',
    tagline: 'Pointers, Memory Layout, Struct Padding, Preprocessor Directives & POSIX APIs',
    estimatedReadTime: '12 min',
    level: 'Hard (Systems Engineering)',
    testId: 'mock-c-programming',
    badgeId: 'c-master',
    overview: 'C provides direct hardware access and deterministic memory control. Systems roles at Qualcomm, NVIDIA, Apple, and Google require deep understanding of pointer arithmetic, struct padding alignment, stack vs heap, undefined behavior, and POSIX system call mechanics.',
    keyArchitecturalNotes: [
      {
        title: 'Memory Layout of a C Program',
        summary: 'Understanding the virtual address space segments is fundamental to writing stable systems code.',
        deepDive: [
          'Text Segment: Executable machine code instructions (read-only to prevent self-modifying code).',
          'Data Segment: Initialized global and static variables with non-zero values.',
          'BSS Segment: Block Started by Symbol. Holds uninitialized global and static variables, zero-filled by the OS loader.',
          'Heap: Dynamically allocated memory via malloc()/calloc()/realloc(), growing upwards toward high memory addresses.',
          'Stack: Local variables and function activation records (stack frames), growing downwards toward low memory addresses.'
        ],
        keyTerms: ['Text Segment', 'Data Segment', 'BSS', 'Stack Frame', 'Virtual Memory Space']
      },
      {
        title: 'Structure Padding & Memory Alignment',
        summary: 'CPUs access memory faster when multi-byte data types are aligned to memory addresses that are multiples of their size.',
        deepDive: [
          'On 64-bit systems, char is 1 byte, int is 4 bytes, double/pointer is 8 bytes.',
          'A struct containing `char c; int i; double d;` will have 3 bytes of padding inserted between c and i, and no padding between i and d, totaling 1 + 3 + 4 + 8 = 16 bytes.',
          'Struct total size must also be a multiple of the largest member alignment. #pragma pack(1) forces packing, trading execution speed for space.'
        ],
        keyTerms: ['Memory Alignment', 'Struct Padding', 'Natural Word Size', '#pragma pack(1)', 'Cache Line Alignment']
      }
    ],
    formulasAndSyntax: [
      {
        title: 'Safe Dynamic Allocation with Double Pointer Matrix',
        codeOrFormula: `int **matrix = (int **)malloc(rows * sizeof(int *));
for (int i = 0; i < rows; i++) {
  matrix[i] = (int *)malloc(cols * sizeof(int));
}
// Freeing order: inner arrays first, then outer
for (int i = 0; i < rows; i++) free(matrix[i]);
free(matrix);`,
        language: 'c',
        explanation: 'Allocates an array of pointer rows, followed by contiguous integer column blocks. Freeing must always occur in reverse order.',
        useCase: 'Dynamically sized 2D matrices in systems simulation and matrix computations.'
      }
    ],
    interviewPitfalls: [
      {
        trap: 'Returning a pointer to a local stack variable from a function.',
        whyCandidatesFail: 'Not understanding stack frame deallocation upon function return.',
        correctResponse: 'Local variables exist only in the function stack frame. When the function returns, that stack frame is popped and invalidated. Dereferencing the returned pointer invokes Undefined Behavior. Allocate on the heap via malloc() or pass a caller-allocated buffer.'
      }
    ],
    quickRevisionSummary: [
      'Uninitialized globals/statics reside in BSS and are zero-initialized by the OS.',
      'Struct padding aligns members to natural CPU boundaries to maximize bus throughput.',
      'sizeof(pointer) is always 8 bytes on a 64-bit architecture regardless of data type pointed to.',
      'free() does not set the pointer to NULL; manual assignment to NULL prevents dangling pointer bugs.'
    ]
  },

  // 7. C++ & Object-Oriented Engineering
  {
    id: 'cpp-programming',
    domainName: 'C++ & High-Performance Engineering',
    category: 'Programming Languages',
    icon: '⚙️',
    tagline: 'Vtables, Move Semantics (rvalues), RAII, Smart Pointers & Template Metaprogramming',
    estimatedReadTime: '13 min',
    level: 'Hard (Systems & High-Frequency)',
    testId: 'mock-cpp-programming',
    badgeId: 'cpp-master',
    overview: 'Modern C++ (C++11 through C++20) provides zero-cost abstractions, deterministic resource management through RAII, value semantics, move constructors, and compile-time template metaprogramming.',
    keyArchitecturalNotes: [
      {
        title: 'Virtual Table (Vtable) & Dynamic Dispatch Mechanics',
        summary: 'How C++ implements polymorphism without runtime reflection.',
        deepDive: [
          'If a class has at least one virtual function, the compiler inserts a hidden pointer called vptr into each object instance.',
          'The vptr points to a static table of function pointers called the Vtable (one vtable per polymorphic class).',
          'Virtual function calls invoke `vptr->vtable[index]()`, introducing a tiny indirection cost (~1-2 CPU cache lookups).',
          'Crucial Rule: Base classes with virtual methods MUST have a `virtual ~Base() = default;` virtual destructor to prevent undefined behavior when deleting derived objects through a base pointer.'
        ],
        keyTerms: ['Vtable', 'vptr', 'Dynamic Dispatch', 'Virtual Destructor', 'Override Keyword']
      },
      {
        title: 'Move Semantics & Rvalue References (&&)',
        summary: 'C++11 introduced rvalue references to eliminate expensive deep copies when transferring ownership from temporary objects.',
        deepDive: [
          'An lvalue has an identifiable memory address (e.g., named variables). An rvalue is a temporary object that will expire at the end of the expression.',
          'std::move() does NOT move anything by itself; it is an unconditional static cast that converts an lvalue into an rvalue reference (T&&).',
          'Move constructors steal raw pointers from the source object and reset the source pointer to nullptr, performing transfers in O(1) time without heap allocations.'
        ],
        keyTerms: ['std::move()', 'Rvalue References (T&&)', 'Move Constructor', 'Copy Elision (RVO/NRVO)']
      }
    ],
    formulasAndSyntax: [
      {
        title: 'RAII Custom Resource Wrapper with Smart Pointers',
        codeOrFormula: `std::unique_ptr<FILE, decltype(&fclose)> safeFile(fopen("audit.log", "r"), &fclose);
if (safeFile) {
  // Read file safely
}
// fclose() is guaranteed to be called automatically even if exceptions are thrown!`,
        language: 'cpp',
        explanation: 'Demonstrates custom deleter in std::unique_ptr ensuring deterministic cleanup with zero resource leaks.',
        useCase: 'Exception-safe file and socket handle management.'
      }
    ],
    interviewPitfalls: [
      {
        trap: 'Omitting a virtual destructor in a polymorphic base class.',
        whyCandidatesFail: 'Thinking destructors are inherited and cleaned up automatically.',
        correctResponse: 'Deleting a derived class object through a Base* pointer without a virtual destructor results in Undefined Behavior; the derived class destructor will NEVER run, leaking derived member resources.'
      }
    ],
    quickRevisionSummary: [
      'Base classes with virtual functions must always define a virtual destructor.',
      'std::move is an unconditional cast to an rvalue reference; it doesn\'t move bytes itself.',
      'std::unique_ptr has zero memory overhead over a raw pointer; std::shared_ptr has a control block for ref counts.',
      'RAII ties resource lifespan strictly to object lifespan.'
    ]
  },

  // 8. Java & JVM Enterprise Architecture
  {
    id: 'java-programming',
    domainName: 'Java & JVM Enterprise Architecture',
    category: 'Programming Languages',
    icon: '☕',
    tagline: 'JVM Memory (Metaspace, Eden), G1/ZGC, Happens-Before, Virtual Threads & Concurrency',
    estimatedReadTime: '13 min',
    level: 'Hard (Enterprise Backend)',
    testId: 'mock-java-programming',
    badgeId: 'java-master',
    overview: 'Java powers global banking and enterprise cloud backends. Core mastery involves JVM memory layout (Eden, Survivor, Tenured, Metaspace), garbage collection algorithms (G1, ZGC), Java Memory Model (JMM) happens-before rules, and modern Virtual Threads (Project Loom).',
    keyArchitecturalNotes: [
      {
        title: 'JVM Memory Architecture & Generational GC',
        summary: 'Generational garbage collection relies on the Weak Generational Hypothesis: most objects die young.',
        deepDive: [
          'Heap is split into Young Generation (Eden + Survivor S0/S1) and Old / Tenured Generation.',
          'New objects are allocated in Eden. When Eden fills, a Minor GC moves surviving objects to Survivor space.',
          'Objects that survive multiple GC cycles (default tenuring threshold: 15) are promoted to the Old Generation.',
          'Metaspace (Java 8+) stores class metadata in native off-heap memory, replacing the prone-to-OOM PermGen.'
        ],
        keyTerms: ['Eden Space', 'Survivor Spaces', 'Tenured Generation', 'Metaspace', 'Stop-The-World (STW)']
      },
      {
        title: 'Java Memory Model (JMM) & `volatile` Keyword',
        summary: 'JMM defines how threads interact through memory and establishes happens-before consistency guarantees.',
        deepDive: [
          'The `volatile` keyword guarantees Visibility: Writes to a volatile variable are immediately flushed to main memory, and reads always invalidate CPU cache and read from main memory.',
          'Volatile prevents instruction reordering via memory fences (LoadLoad, StoreStore barriers).',
          'Crucial Distinction: `volatile` does NOT guarantee Atomicity! `count++` on a volatile variable is NOT thread-safe because it is three operations (read-modify-write). Use `AtomicInteger` instead.'
        ],
        keyTerms: ['Happens-Before Relationship', 'volatile', 'Memory Barriers', 'AtomicInteger (CAS)', 'Thread Visibility']
      }
    ],
    formulasAndSyntax: [
      {
        title: 'Thread-Safe Lazy Singleton (Double-Checked Locking)',
        codeOrFormula: `public class ConnectionPool {
  private static volatile ConnectionPool instance;
  private ConnectionPool() {}

  public static ConnectionPool getInstance() {
    if (instance == null) {
      synchronized (ConnectionPool.class) {
        if (instance == null) {
          instance = new ConnectionPool();
        }
      }
    }
    return instance;
  }
}`,
        language: 'java',
        explanation: 'Volatile is required to prevent instruction reordering where instance is assigned memory before constructor initialization finishes.',
        useCase: 'Resource-intensive thread-safe singletons in enterprise microservices.'
      }
    ],
    interviewPitfalls: [
      {
        trap: 'Claiming volatile count++ is thread-safe.',
        whyCandidatesFail: 'Assuming volatile implies atomic increments.',
        correctResponse: 'Volatile only guarantees thread visibility and prevents reordering. Increments consist of read, increment, and write. Two concurrent threads can both read the same value, resulting in lost updates. Use AtomicInteger (using hardware CAS) or synchronized blocks.'
      }
    ],
    quickRevisionSummary: [
      'Metaspace lives in native memory and auto-resizes; PermGen is removed in Java 8+.',
      'volatile guarantees visibility and prevents reordering, but NEVER guarantees atomicity.',
      'equals() and hashCode() contract: If a.equals(b) is true, their hashCode() MUST be identical.',
      'Virtual Threads (Java 21) are lightweight user-mode threads managed by the JVM, not OS kernel threads.'
    ]
  },

  // 9. Python & AI Systems Engineering
  {
    id: 'python-programming',
    domainName: 'Python & AI Systems Engineering',
    category: 'Programming Languages',
    icon: '🐍',
    tagline: 'CPython GIL, Generators, Closures, Metaclasses, Asyncio & Vectorization',
    estimatedReadTime: '11 min',
    level: 'Hard (AI & Backend Engineering)',
    testId: 'mock-python-programming',
    badgeId: 'python-master',
    overview: 'Python powers AI and data engineering. Senior engineers must understand CPython internals, the Global Interpreter Lock (GIL), late-binding closure traps, mutable default arguments, C3 linearization in multiple inheritance, and memory management through reference counting with generational cyclic GC.',
    keyArchitecturalNotes: [
      {
        title: 'CPython Global Interpreter Lock (GIL)',
        summary: 'The GIL is a mutex that prevents multiple native threads from executing Python bytecode simultaneously.',
        deepDive: [
          'Why the GIL exists: Simplifies CPython memory management and protects C extension libraries from thread-safety race conditions.',
          'Impact on Multi-threading: For CPU-bound tasks, Python multi-threading runs on a single CPU core and can even run SLOWER than single-threaded code due to thread contention overhead.',
          'Workarounds: Use `multiprocessing` to spawn separate processes with independent memory spaces and GILs, or use compiled extensions (NumPy, PyTorch, Cython) that release the GIL during heavy numerical computations.'
        ],
        keyTerms: ['GIL', 'Reference Counting', 'CPU-bound vs I/O-bound', 'multiprocessing vs threading']
      },
      {
        title: 'Mutable Default Arguments Trap',
        summary: 'In Python, default parameter expressions are evaluated ONCE when the function definition is executed, NOT at invocation time.',
        deepDive: [
          'Defining `def append_item(item, lst=[])` binds `lst` to a single persistent list object in memory.',
          'Subsequent calls that do not provide `lst` will mutate the same object across calls, causing subtle shared-state bugs.',
          'Standard Fix: Always use `lst=None` as the default argument and initialize `if lst is None: lst = []` inside the function body.'
        ],
        keyTerms: ['Mutable Default Trap', 'Function Object Attributes', 'Late-Binding Closures']
      }
    ],
    formulasAndSyntax: [
      {
        title: 'Memory-Efficient Streaming Generator with Yield',
        codeOrFormula: `def stream_large_dataset(filepath, batch_size=1024):
    with open(filepath, 'r', encoding='utf-8') as f:
        batch = []
        for line in f:
            batch.append(line.strip())
            if len(batch) == batch_size:
                yield batch
                batch = []
        if batch:
            yield batch`,
        language: 'python',
        explanation: 'Generates chunks lazily without loading multi-gigabyte files into RAM, keeping memory footprint constant at O(1).',
        useCase: 'ETL pipelines and feeding batches into PyTorch / TensorFlow AI training loops.'
      }
    ],
    interviewPitfalls: [
      {
        trap: 'Late-binding closures in list comprehensions creating lambdas.',
        whyCandidatesFail: 'Expecting `[lambda: i for i in range(5)]` to output 0, 1, 2, 3, 4.',
        correctResponse: 'Python closures bind to variable names, not values at creation time. When the lambdas are later called, `i` has completed the loop and equals 4 for all of them! Fix with default argument capture: `[lambda i=i: i for i in range(5)]`.'
      }
    ],
    quickRevisionSummary: [
      'GIL restricts multi-threaded execution of Python bytecode to one thread at a time per process.',
      'Default arguments are evaluated once at function creation: never use mutable defaults like [] or {}.',
      'Python memory: Reference counting handles instant cleanup; generational GC handles cyclic references.',
      'C3 Linearization guarantees deterministic Method Resolution Order (MRO) in multiple inheritance.'
    ]
  },

  // 10. Data Structures & Algorithms
  {
    id: 'dsa-algorithms',
    domainName: 'Data Structures & Algorithms',
    category: 'Algorithms & Core',
    icon: '👑',
    tagline: 'AVL Rotations, Bellman-Ford, DSU Inverse Ackermann, Monotonic Stacks & DP',
    estimatedReadTime: '15 min',
    level: 'Titan (High-Bar Algorithms)',
    testId: 'mock-dsa-algorithms',
    badgeId: 'dsa-master',
    overview: 'High-bar technical interviews at Google, Meta, and Amazon probe deep algorithmic mechanics: amortized time complexities, self-balancing tree invariants, dynamic programming states, disjoint set unions, and graph shortest path edge cases.',
    keyArchitecturalNotes: [
      {
        title: 'Disjoint Set Union (DSU) & Inverse Ackermann α(N)',
        summary: 'DSU maintains a partition of elements into disjoint subsets with near-constant amortized time complexity.',
        deepDive: [
          'Path Compression: During `find(x)`, make every visited node point directly to the root, flattening the tree structure.',
          'Union by Rank/Size: Attach the shallower tree under the root of the deeper tree during `union(x, y)`.',
          'Combining both optimizations yields an amortized time complexity per operation of O(α(N)), where α is the Inverse Ackermann function. For any universe-scale N (< 10^80), α(N) ≤ 4, making it effectively O(1).'
        ],
        keyTerms: ['DSU', 'Path Compression', 'Union by Rank', 'Inverse Ackermann α(N)', 'Kruskal\'s MST']
      },
      {
        title: 'Monotonic Stack / Queue Mechanics',
        summary: 'Monotonic data structures maintain elements in strictly increasing or decreasing order to answer range queries in linear time.',
        deepDive: [
          'Next Greater Element: Push elements onto a decreasing stack. When a larger incoming element arrives, it resolves the next greater element for all smaller items on the stack.',
          'Sliding Window Maximum: A double-ended queue (deque) stores indices of useful elements in monotonically decreasing order of value, enabling O(N) sliding window max queries instead of O(N log K).'
        ],
        keyTerms: ['Monotonic Stack', 'Sliding Window Deque', 'Next Greater Element', 'Largest Rectangle in Histogram']
      }
    ],
    formulasAndSyntax: [
      {
        title: 'Disjoint Set Union (DSU) with Path Compression & Union by Rank',
        codeOrFormula: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x]) # Path compression
        return self.parent[x]

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry: return False
        if self.rank[rx] < self.rank[ry]: rx, ry = ry, rx
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]: self.rank[rx] += 1
        return True`,
        language: 'python',
        explanation: 'Provides O(α(N)) operations for graph connectivity and cycle detection in undirected networks.',
        useCase: 'Kruskal Minimum Spanning Tree, Social Graph Circles, and Island connectivity.'
      }
    ],
    interviewPitfalls: [
      {
        trap: 'Claiming Dijkstra algorithm works with negative edge weights.',
        whyCandidatesFail: 'Assuming Dijkstra works for all graphs as long as there are no negative cycles.',
        correctResponse: 'Dijkstra assumes that adding an edge to a path never decreases total cost (greedy property). With negative edges, an already visited node could achieve a shorter distance later. Use Bellman-Ford or SPFA instead.'
      }
    ],
    quickRevisionSummary: [
      'DSU with path compression and union by rank achieves O(α(N)) near-constant time.',
      'Dijkstra fails on graphs with negative edge weights; Bellman-Ford detects negative weight cycles in O(V × E).',
      'AVL Trees maintain balance factor in {-1, 0, +1}; require double rotations (LR/RL) for zig-zag imbalances.',
      'Monotonic Stack solves Next Greater Element and Histogram Rectangle problems in strict O(N) linear time.'
    ]
  }
];
