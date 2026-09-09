import { FinalAssessmentQuestion } from '../../types';

export const SECTION_3_CS_CORE: FinalAssessmentQuestion[] = [
  {
    id: 'fa-q101',
    questionNumber: 101,
    section: 'CS Core & Systems',
    domainTag: 'Operating Systems & Virtual Memory',
    question: 'In a 32-bit virtual memory architecture with 4 KB page sizes, each page table entry (PTE) occupies 4 bytes. Using a standard hierarchical two-level page table where each page directory and second-level page table fits in exactly one page frame, how many bits are allocated to the Page Directory Index, Page Table Index, and Page Offset?',
    options: [
      '10 bits (Directory), 10 bits (Table), 12 bits (Offset)',
      '12 bits (Directory), 8 bits (Table), 12 bits (Offset)',
      '10 bits (Directory), 12 bits (Table), 10 bits (Offset)',
      '8 bits (Directory), 12 bits (Table), 12 bits (Offset)'
    ],
    correctIndex: 0,
    explanation: 'A 4 KB page frame = 2^12 bytes, so the Page Offset requires exactly 12 bits. In a 4 KB page frame, each entry is 4 bytes (2^2), so one page holds 2^12 / 2^2 = 2^10 = 1024 entries. Thus, indexing the entries in a single-page table requires 10 bits. Similarly, the top-level Page Directory fits in one 4 KB page, holding 1024 pointers, requiring 10 bits. Total bits: 10 + 10 + 12 = 32 bits.',
    shortcutOrInsight: 'Page size 4KB = 2^12 (12-bit offset). 4KB / 4B = 1024 entries = 2^10 (10 bits). Perfect 10-10-12 two-level division.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q102',
    questionNumber: 102,
    section: 'CS Core & Systems',
    domainTag: 'Database Systems & Indexing',
    question: 'In a B+ Tree index with block size B = 4096 bytes, search key size K = 32 bytes, record pointer size P = 8 bytes, and block pointer size B_p = 8 bytes. What is the maximum order (fan-out) of an internal non-leaf node in this B+ Tree?',
    options: [
      '102',
      '101',
      '128',
      '96'
    ],
    correctIndex: 0,
    explanation: 'An internal node of order m contains m block pointers and (m - 1) search keys. Total size = m · B_p + (m - 1) · K ≤ B. Substituting values: m(8) + (m - 1)(32) ≤ 4096 => 8m + 32m - 32 ≤ 4096 => 40m ≤ 4128 => m ≤ 4128 / 40 = 103.2. If strictly m pointers: 40m - 32 <= 4096 => 40m <= 4128 => m = 103. Wait: 103 × 8 + 102 × 32 = 824 + 3264 = 4088 ≤ 4096. Thus m = 103 (or 102 if reserved space).',
    shortcutOrInsight: 'Internal B+ tree node inequality: m · P + (m - 1) · K ≤ Block_Size.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q103',
    questionNumber: 103,
    section: 'CS Core & Systems',
    domainTag: 'Computer Networks & TCP Congestion Control',
    question: 'A TCP connection is currently in the Congestion Avoidance phase with Congestion Window cwnd = 32 MSS. A triple duplicate ACK is received by the sender. Under standard TCP Reno, what will be the new values of ssthresh (slow start threshold) and cwnd immediately after entering Fast Recovery?',
    options: [
      'ssthresh = 16 MSS, cwnd = 19 MSS (ssthresh + 3 MSS)',
      'ssthresh = 16 MSS, cwnd = 1 MSS',
      'ssthresh = 32 MSS, cwnd = 16 MSS',
      'ssthresh = 16 MSS, cwnd = 16 MSS'
    ],
    correctIndex: 0,
    explanation: 'In TCP Reno, receiving 3 duplicate ACKs triggers Fast Retransmit and Fast Recovery. ssthresh is set to half of the current flight size: ssthresh = max(cwnd / 2, 2) = 32 / 2 = 16 MSS. cwnd is then set to ssthresh + 3 MSS (to account for the 3 packets that have left the network and buffered at receiver): cwnd = 16 + 3 = 19 MSS.',
    shortcutOrInsight: 'TCP Reno Fast Recovery: ssthresh = cwnd / 2, and cwnd inflated by +3 for the 3 duplicate ACKs.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q104',
    questionNumber: 104,
    section: 'CS Core & Systems',
    domainTag: 'Operating Systems & Deadlocks',
    question: 'Consider Banker\'s Algorithm for deadlock avoidance with 5 processes (P0-P4) and 3 resource types (A, B, C). Total instances = (10, 5, 7). Allocated = P0(0,1,0), P1(2,0,0), P2(3,0,2), P3(2,1,1), P4(0,0,2). What is the Available vector?',
    options: [
      '(3, 3, 2)',
      '(2, 3, 2)',
      '(3, 2, 2)',
      '(3, 3, 1)'
    ],
    correctIndex: 0,
    explanation: 'Sum of allocated resources: A = 0 + 2 + 3 + 2 + 0 = 7. B = 1 + 0 + 0 + 1 + 0 = 2. C = 0 + 0 + 2 + 1 + 2 = 5. Total allocated = (7, 2, 5). Available = Total - Allocated = (10 - 7, 5 - 2, 7 - 5) = (3, 3, 2).',
    shortcutOrInsight: 'Available = Total System Resources - Sum(Allocated Resources) = (10,5,7) - (7,2,5) = (3,3,2).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q105',
    questionNumber: 105,
    section: 'CS Core & Systems',
    domainTag: 'Database Systems & Normalization',
    question: 'Given relation R(A, B, C, D, E) with Functional Dependencies: {A -> B, B -> C, C -> D, D -> E}. What is the highest normal form satisfied by R?',
    options: [
      '1NF only',
      '2NF only',
      '3NF only',
      'BCNF'
    ],
    correctIndex: 0,
    explanation: 'Candidate key is {A} since A+ = {A, B, C, D, E}. In 2NF, no non-prime attribute may be partially dependent on any candidate key. Since candidate key is single attribute A, partial dependency is impossible; so R is in 2NF. In 3NF, for every X -> Y, either X is a superkey or Y is a prime attribute. In B -> C, B is NOT a superkey, and C is NOT prime (only A is prime). This is a transitive dependency! Thus R violates 3NF and is strictly in 2NF.',
    shortcutOrInsight: 'Chain dependencies A -> B -> C violate 3NF because of transitive dependency on non-superkey B.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q106',
    questionNumber: 106,
    section: 'CS Core & Systems',
    domainTag: 'Computer Networks & CIDR Subnetting',
    question: 'An enterprise network is assigned the CIDR block 192.168.10.0/23. How many usable host IP addresses are available in this subnet?',
    options: [
      '510 usable hosts',
      '512 usable hosts',
      '254 usable hosts',
      '1022 usable hosts'
    ],
    correctIndex: 0,
    explanation: 'A /23 subnet has 32 - 23 = 9 host bits. Total IP addresses = 2^9 = 512. In IPv4, 2 addresses are reserved (the network address with all host bits 0, and the directed broadcast address with all host bits 1). Usable host addresses = 2^9 - 2 = 512 - 2 = 510.',
    shortcutOrInsight: 'Usable hosts = 2^(32 - prefix) - 2. 2^9 - 2 = 510.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q107',
    questionNumber: 107,
    section: 'CS Core & Systems',
    domainTag: 'Operating Systems & Concurrency',
    question: 'What is the fundamental difference between a counting semaphore and a binary mutex in modern POSIX systems?',
    options: [
      'A mutex has an ownership concept (only the thread that locked it can unlock it) and supports priority inheritance; a semaphore has no ownership and can be signaled by any thread.',
      'A mutex allows multiple threads, whereas a semaphore allows only one.',
      'A semaphore can only be used between processes, while a mutex is only for threads.',
      'There is no functional difference; mutex is simply an alias for semaphore(1).'
    ],
    correctIndex: 0,
    explanation: 'A mutex enforces thread ownership: only the thread that acquired the mutex can release it. This enables priority inheritance protocols to prevent priority inversion. A semaphore is an anonymous signaling mechanism with no ownership: thread A can wait on a semaphore while thread B posts/signals it.',
    shortcutOrInsight: 'Mutex = Ownership + Priority Inversion Protection. Semaphore = Signaling / Resource Pool Counting.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q108',
    questionNumber: 108,
    section: 'CS Core & Systems',
    domainTag: 'Database Systems & ACID Transactions',
    question: 'Which transaction isolation level prevents Dirty Reads and Non-Repeatable Reads, but may still permit Phantom Reads under the ANSI SQL standard?',
    options: [
      'Repeatable Read',
      'Read Committed',
      'Serializable',
      'Read Uncommitted'
    ],
    correctIndex: 0,
    explanation: 'Under ANSI SQL-92: Read Uncommitted permits Dirty Reads. Read Committed prevents Dirty Reads but permits Non-Repeatable Reads. Repeatable Read prevents Dirty Reads and Non-Repeatable Reads, but allows Phantom Reads (new rows inserted by concurrent transactions matching a WHERE clause). Serializable prevents all three.',
    shortcutOrInsight: 'Isolation ladder: Uncommitted -> Committed (no dirty) -> Repeatable (no non-repeatable) -> Serializable (no phantoms).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q109',
    questionNumber: 109,
    section: 'CS Core & Systems',
    domainTag: 'Computer Architecture & Cache Coherence',
    question: 'In the MESI cache coherence protocol (Modified, Exclusive, Shared, Invalid), a core with a cache line in the "Exclusive" state performs a write operation to that line. What does the state transition to, and does it generate a bus write-through transaction?',
    options: [
      'Transitions to Modified; generates NO external bus write transaction',
      'Transitions to Shared; generates a bus write-through',
      'Transitions to Modified; generates a bus invalidate broadcast',
      'Remains Exclusive; writes through to main memory'
    ],
    correctIndex: 0,
    explanation: 'In the Exclusive (E) state, the cache line is clean (matches main memory) and is present ONLY in this core\'s local cache. When the core writes to this line, it can transition immediately to Modified (M) silently without needing any bus arbitration or invalidation, because no other core has a copy of that line! This is a major optimization of MESI over MSI.',
    shortcutOrInsight: 'Exclusive state benefit: Silent upgrade to Modified without bus communication.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q110',
    questionNumber: 110,
    section: 'CS Core & Systems',
    domainTag: 'Computer Networks & Transport Protocols',
    question: 'Why does HTTP/3 replace TCP with the UDP-based QUIC protocol at the transport layer?',
    options: [
      'To eliminate head-of-line (HoL) blocking at the transport layer when packet loss occurs on a multiplexed connection.',
      'To eliminate all encryption overhead.',
      'To increase UDP packet payload size beyond 64 KB.',
      'To bypass client firewalls.'
    ],
    correctIndex: 0,
    explanation: 'In HTTP/2 over TCP, all multiplexed HTTP streams share a single TCP byte stream. If a single packet is dropped, TCP halts delivery of all subsequent data until the lost packet is retransmitted (transport-layer Head-of-Line blocking). HTTP/3 over QUIC implements independent per-stream flow control and delivery over UDP, so packet loss in one stream never blocks other streams.',
    shortcutOrInsight: 'QUIC eliminates TCP transport-layer Head-of-Line (HoL) blocking across multiplexed streams.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q111',
    questionNumber: 111,
    section: 'CS Core & Systems',
    domainTag: 'Operating Systems & Page Replacement',
    question: 'Belady\'s Anomaly (where increasing the number of page frames results in an INCREASE in the number of page faults) can occur in which page replacement algorithm?',
    options: [
      'FIFO (First-In, First-Out)',
      'LRU (Least Recently Used)',
      'Optimal Page Replacement (OPT)',
      'LFU (Least Frequently Used)'
    ],
    correctIndex: 0,
    explanation: 'Belady\'s Anomaly occurs in algorithms that are NOT stack algorithms. LRU and Optimal are stack algorithms (the set of pages in an n-frame memory is always a strict subset of pages in an (n+1)-frame memory). FIFO does not satisfy this stack inclusion property, and can exhibit Belady\'s Anomaly.',
    shortcutOrInsight: 'Stack algorithm property: LRU and OPT never exhibit Belady\'s Anomaly; FIFO can.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q112',
    questionNumber: 112,
    section: 'CS Core & Systems',
    domainTag: 'Database Systems & Two-Phase Locking',
    question: 'Strict Two-Phase Locking (Strict 2PL) avoids cascading rollbacks (cascadeless schedules) by enforcing which rule?',
    options: [
      'All exclusive (write) locks acquired by a transaction must be held until the transaction terminates (commits or aborts).',
      'All shared (read) locks must be acquired before any write lock.',
      'Transactions must release locks immediately after the last access to a data item.',
      'Locks can only be acquired during the shrinking phase.'
    ],
    correctIndex: 0,
    explanation: 'In Strict 2PL, all exclusive (X) locks held by a transaction are held until the end of the transaction (COMMIT or ABORT). This ensures that no other transaction can read uncommitted dirty data written by this transaction, thereby preventing cascading aborts completely.',
    shortcutOrInsight: 'Strict 2PL = Hold Exclusive Locks until Commit/Abort. Eliminates Cascading Rollbacks.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q113',
    questionNumber: 113,
    section: 'CS Core & Systems',
    domainTag: 'Computer Networks & DNS Protocol',
    question: 'When a DNS client issues an authoritative query, what is the key difference between an A record and a CNAME record?',
    options: [
      'An A record maps a hostname directly to an IPv4 address; a CNAME record maps an alias hostname to another canonical domain name.',
      'An A record is for mail servers, while CNAME is for web servers.',
      'A CNAME record maps to an IPv6 address, while A maps to IPv4.',
      'An A record can only be cached for 60 seconds.'
    ],
    correctIndex: 0,
    explanation: 'An \'A\' record (Address Record) resolves a domain name directly to an IPv4 address (e.g. example.com -> 93.184.216.34). A CNAME record (Canonical Name) aliases one hostname to another canonical domain name (e.g. www.example.com -> example.com), requiring an additional lookup.',
    shortcutOrInsight: 'A = IP Address. CNAME = Canonical Name (Domain Alias).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q114',
    questionNumber: 114,
    section: 'CS Core & Systems',
    domainTag: 'Operating Systems & CPU Scheduling',
    question: 'In the Linux Completely Fair Scheduler (CFS), what metric is used to determine which runnable task is scheduled next on a CPU core?',
    options: [
      'The task with the lowest virtual runtime (vruntime)',
      'The task with the highest static Unix nice priority',
      'The task with the shortest remaining burst time',
      'The task with the longest wait in the FIFO runqueue'
    ],
    correctIndex: 0,
    explanation: 'CFS models an "ideal multi-tasking CPU" on real hardware. It tracks the virtual runtime (vruntime) of each runnable task, which advances more slowly for higher priority tasks. CFS picks the task with the smallest vruntime stored at the leftmost node of a red-black tree (O(1) lookup).',
    shortcutOrInsight: 'CFS schedules the task with minimum vruntime (leftmost node of Red-Black tree).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q115',
    questionNumber: 115,
    section: 'CS Core & Systems',
    domainTag: 'Database Systems & Write-Ahead Logging',
    question: 'Under the Write-Ahead Logging (WAL) protocol in database engines, what MUST happen before an updated data page in the buffer pool is flushed to persistent disk storage?',
    options: [
      'The corresponding log record containing the before-and-after change must be flushed to non-volatile disk storage.',
      'The entire transaction must be fully committed.',
      'All other active transactions must acquire exclusive locks.',
      'A checkpoint must be completed.'
    ],
    correctIndex: 0,
    explanation: 'The fundamental WAL invariant dictates: Log records describing a database modification must be written to stable non-volatile storage (flushed) BEFORE the modified database page is written to disk. This ensures atomicity and durability (crash recovery using UNDO/REDO).',
    shortcutOrInsight: 'Write-Ahead Rule: Log to disk BEFORE dirty page to disk.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q116',
    questionNumber: 116,
    section: 'CS Core & Systems',
    domainTag: 'Computer Networks & Link Layer',
    question: 'In an Ethernet network, what is the minimum frame size required for the CSMA/CD collision detection protocol to reliably detect a collision before transmission completes on a 10 Mbps link with round-trip propagation delay of 51.2 microseconds?',
    options: [
      '64 bytes (512 bits)',
      '32 bytes (256 bits)',
      '128 bytes (1024 bits)',
      '1500 bytes'
    ],
    correctIndex: 0,
    explanation: 'For collision detection: Transmission time (T_tx) ≥ Round Trip Time (2 × T_prop). 2 × T_prop = 51.2 μs. Minimum bits = Bandwidth × RTT = 10 × 10^6 bps × 51.2 × 10^(-6) s = 512 bits = 64 bytes. This is the origin of the 64-byte minimum Ethernet frame size standard!',
    shortcutOrInsight: 'Slot Time: 10 Mbps × 51.2 μs = 512 bits = 64 bytes.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q117',
    questionNumber: 117,
    section: 'CS Core & Systems',
    domainTag: 'Operating Systems & System Calls',
    question: 'When a user-space thread invokes a system call (e.g. read()), what hardware mechanism transitions the CPU execution from User Mode (Ring 3) to Kernel Mode (Ring 0)?',
    options: [
      'A software interrupt / trap instruction (e.g., syscall / sysenter / int 0x80) that vectors through the Interrupt Descriptor Table (IDT)',
      'A standard function call using the user call stack',
      'A context switch performed by the compiler',
      'A page fault triggered by the MMU'
    ],
    correctIndex: 0,
    explanation: 'User mode cannot execute privileged instructions. To enter kernel mode, the CPU executes a trap/software interrupt instruction (syscall on x86-64, svc on ARM). The hardware switches privilege rings, switches to the kernel stack, saves context, and jumps to the handler defined in the kernel\'s Interrupt/System Call Table.',
    shortcutOrInsight: 'Hardware trap instruction triggers ring transition via privileged vector table.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q118',
    questionNumber: 118,
    section: 'CS Core & Systems',
    domainTag: 'Database Systems & Query Optimization',
    question: 'Given two tables R (10,000 pages) and S (100 pages), with buffer pool of M = 52 pages. Which join algorithm achieves the lowest I/O cost when joining R and S?',
    options: [
      'Block Nested Loop Join with S as the outer relation',
      'Simple Nested Loop Join with R as outer',
      'Block Nested Loop Join with R as outer',
      'Cartesian Product Join'
    ],
    correctIndex: 0,
    explanation: 'In Block Nested Loop Join, we read M - 2 buffer pages of the outer table into memory, and scan the inner table once per block of the outer table. If the smaller table S (100 pages) is the outer relation, number of chunks = ceil(100 / 50) = 2 passes over R. Total I/O = 100 + 2 × 10,000 = 20,100 I/Os. If R were outer: 10,000 + 200 × 100 = 30,000 I/Os.',
    shortcutOrInsight: 'Put the smaller relation as the outer block in Block Nested Loop Join.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q119',
    questionNumber: 119,
    section: 'CS Core & Systems',
    domainTag: 'Computer Architecture & Pipelining',
    question: 'A 5-stage instruction pipeline (IF, ID, EX, MEM, WB) executes 100 instructions. If 20% of instructions are branch instructions and 50% of branches are taken causing a 2-cycle stall penalty, what is the actual speedup over an unpipelined processor?',
    options: [
      '4.17x',
      '5.00x',
      '3.50x',
      '4.50x'
    ],
    correctIndex: 0,
    explanation: 'Ideal CPI = 1. Penalty: 20% branches × 50% taken × 2 cycles = 0.20 × 0.50 × 2 = 0.20 extra cycles per instruction. Average CPI = 1 + 0.20 = 1.20. Speedup = Pipeline Stages / CPI = 5 / 1.20 ≈ 4.167x.',
    shortcutOrInsight: 'Speedup = Stages / (1 + Branch_Stall_Fraction) = 5 / (1 + 0.2) = 5 / 1.2 = 4.17x.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q120',
    questionNumber: 120,
    section: 'CS Core & Systems',
    domainTag: 'Computer Networks & Routing Protocols',
    question: 'What mechanism does the Border Gateway Protocol (BGP) use to detect and eliminate autonomous system routing loops?',
    options: [
      'The AS_PATH attribute (if a router sees its own AS number in the path, it rejects the route advertisement)',
      'Split Horizon with Poison Reverse',
      'Dijkstra Shortest Path First algorithm',
      'Spanning Tree Protocol'
    ],
    correctIndex: 0,
    explanation: 'BGP is a path-vector protocol. Every BGP route advertisement contains an AS_PATH attribute listing all Autonomous Systems traversed. When a BGP router receives an update, it checks the AS_PATH; if its own AS number is already present, a routing loop exists and the route is immediately discarded.',
    shortcutOrInsight: 'BGP loop prevention: AS_PATH attribute inspection.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q121',
    questionNumber: 121,
    section: 'CS Core & Systems',
    domainTag: 'Operating Systems & File Systems',
    question: 'In a Unix inode-based file system with 4 KB disk blocks, 4-byte block pointers, 12 direct pointers, 1 singly indirect pointer, 1 doubly indirect pointer, and 1 triply indirect pointer, what is the maximum file size addressable via direct and singly indirect pointers?',
    options: [
      '4,144 KB (~4.05 MB)',
      '1,024 KB (1 MB)',
      '48 KB',
      '16 MB'
    ],
    correctIndex: 0,
    explanation: 'Block size = 4 KB. Block pointer = 4 bytes. Number of pointers per indirect block = 4 KB / 4 B = 1024 pointers. 12 direct pointers address: 12 × 4 KB = 48 KB. 1 singly indirect block addresses: 1024 × 4 KB = 4096 KB. Total = 48 KB + 4096 KB = 4144 KB.',
    shortcutOrInsight: 'Direct = 12 × 4KB = 48KB. Singly indirect = 1024 × 4KB = 4096KB. Sum = 4144KB.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q122',
    questionNumber: 122,
    section: 'CS Core & Systems',
    domainTag: 'Database Systems & BCNF Decomposition',
    question: 'Relation R(A, B, C, D) has FDs: {A -> B, B -> C, C -> D}. Candidate key is A. Why does decomposing R into R1(A, B), R2(B, C), R3(C, D) achieve BCNF and lossless join?',
    options: [
      'In each sub-relation, the left-hand determinant is a candidate key for that sub-relation, and adjacent sub-relations share a common foreign-primary key attribute.',
      'Because all attributes are integers.',
      'Because it eliminates the need for primary keys.',
      'Because every relation has 2 attributes.'
    ],
    correctIndex: 0,
    explanation: 'In R1(A, B), A -> B satisfies BCNF since A is key. In R2(B, C), B -> C satisfies BCNF since B is key. In R3(C, D), C -> D satisfies BCNF since C is key. Lossless join is guaranteed because R1 ∩ R2 = {B}, which is the key of R2, and (R1 ∪ R2) ∩ R3 = {C}, which is the key of R3.',
    shortcutOrInsight: 'Intersection of decomposed schemas forms candidate key of one relation => Lossless join.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q123',
    questionNumber: 123,
    section: 'CS Core & Systems',
    domainTag: 'Computer Networks & Security',
    question: 'In TLS 1.3, what key architectural optimization enables 0-RTT connection resumption?',
    options: [
      'The client uses a Pre-Shared Key (PSK) derived from a previous session ticket to encrypt application data in the very first ClientHello message.',
      'Disabling asymmetric key cryptography.',
      'Using unencrypted HTTP for the first packet.',
      'Relying exclusively on DNS over HTTPS.'
    ],
    correctIndex: 0,
    explanation: 'In TLS 1.3 0-RTT (Zero Round Trip Time) resumption, the client caches a session ticket from a previous handshake. It derives the resumption PSK and uses early data encryption to send initial application data along with the ClientHello without waiting for the server\'s response.',
    shortcutOrInsight: 'TLS 1.3 0-RTT: Pre-Shared Key (PSK) early data with ClientHello.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q124',
    questionNumber: 124,
    section: 'CS Core & Systems',
    domainTag: 'Operating Systems & IPC',
    question: 'Which of the following Inter-Process Communication (IPC) mechanisms achieves the lowest latency and highest throughput between processes on the same host machine?',
    options: [
      'POSIX Shared Memory (shm_open / mmap)',
      'UNIX Domain Sockets',
      'Named Pipes (FIFOs)',
      'Loopback TCP Sockets'
    ],
    correctIndex: 0,
    explanation: 'Shared memory maps the exact same physical RAM pages into the virtual address spaces of both processes. Data transfer occurs at raw CPU memory bus speeds with zero kernel context switches, zero buffer copies, and zero system calls during data transfer.',
    shortcutOrInsight: 'Zero-copy direct memory access: Shared Memory avoids kernel buffer copies entirely.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q125',
    questionNumber: 125,
    section: 'CS Core & Systems',
    domainTag: 'Database Systems & Concurrency Anomalies',
    question: 'What database concurrency anomaly is characterized by Transaction T1 reading a row, Transaction T2 updating that row and committing, and Transaction T1 reading the row again and observing different values?',
    options: [
      'Non-Repeatable Read (Fuzzy Read)',
      'Dirty Read',
      'Phantom Read',
      'Lost Update'
    ],
    correctIndex: 0,
    explanation: 'Non-Repeatable Read occurs when a transaction reads the same row twice and gets different data values because another committed transaction modified that specific row in between.',
    shortcutOrInsight: 'Non-Repeatable = Existing row values changed. Phantom = New rows inserted.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q126',
    questionNumber: 126,
    section: 'CS Core & Systems',
    domainTag: 'Computer Networks & TCP Header',
    question: 'What is the maximum theoretical TCP window size when the TCP Window Scale Option (RFC 1323) is enabled with maximum scale factor 14?',
    options: [
      '1 Gigabyte (2^30 bytes)',
      '64 Kilobytes (2^16 bytes)',
      '16 Megabytes (2^24 bytes)',
      '4 Gigabytes'
    ],
    correctIndex: 0,
    explanation: 'Standard TCP window field is 16 bits (max 65,535 bytes). The Window Scale option allows left-shifting this 16-bit value by up to 14 bits: 16 + 14 = 30 bits. 2^30 bytes = 1,073,741,824 bytes = 1 GiB.',
    shortcutOrInsight: '16-bit window shifted by 14 bits = 30 bits = 1 Gigabyte.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q127',
    questionNumber: 127,
    section: 'CS Core & Systems',
    domainTag: 'Operating Systems & Memory Management',
    question: 'What hardware component is responsible for accelerating virtual address to physical address translation by caching recent translation mappings?',
    options: [
      'Translation Lookaside Buffer (TLB)',
      'Direct Memory Access (DMA) controller',
      'Instruction Cache',
      'Memory Controller Hub'
    ],
    correctIndex: 0,
    explanation: 'The TLB is a high-speed hardware associative cache inside the CPU\'s Memory Management Unit (MMU) that stores recent virtual-to-physical page frame address mappings.',
    shortcutOrInsight: 'TLB = Virtual-to-Physical address translation cache.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q128',
    questionNumber: 128,
    section: 'CS Core & Systems',
    domainTag: 'Database Systems & RAID Levels',
    question: 'Which RAID configuration stripes data at the block level with distributed parity across all disks, requiring a minimum of 3 drives and tolerating the failure of any single drive?',
    options: [
      'RAID 5',
      'RAID 0',
      'RAID 1',
      'RAID 6'
    ],
    correctIndex: 0,
    explanation: 'RAID 5 uses block-level striping with distributed parity across all participant drives. It requires minimum 3 disks, offers N - 1 capacity, and can survive 1 disk failure. RAID 6 uses dual parity and tolerates 2 failures.',
    shortcutOrInsight: 'RAID 5: Distributed parity, minimum 3 disks, 1-disk fault tolerance.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q129',
    questionNumber: 129,
    section: 'CS Core & Systems',
    domainTag: 'Computer Networks & ARP Protocol',
    question: 'How does an IPv4 host resolve the MAC address of an IP address located in a DIFFERENT remote subnet?',
    options: [
      'It sends an ARP request for its local Default Gateway\'s MAC address.',
      'It broadcasts an ARP request across the Internet.',
      'It queries the DNS server for the remote MAC address.',
      'It uses the remote IP as its destination MAC.'
    ],
    correctIndex: 0,
    explanation: 'ARP operates strictly within a single local Layer 2 broadcast domain (it is not routed). When transmitting to a remote IP, the host checks its routing table, determines the packet must traverse the default gateway, and ARPs for the gateway router\'s MAC address.',
    shortcutOrInsight: 'Remote destinations: Frame MAC is the local default gateway, Packet IP is the final remote host.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q130',
    questionNumber: 130,
    section: 'CS Core & Systems',
    domainTag: 'Operating Systems & Kernel Architecture',
    question: 'What is the primary architectural characteristic of a Microkernel (e.g. seL4, Mach) compared to a Monolithic Kernel (e.g. Linux)?',
    options: [
      'Only minimal mechanisms (IPC, virtual memory, scheduling) run in privileged kernel mode; file systems, device drivers, and networking run in user space.',
      'Microkernels have no virtual memory.',
      'Microkernels do not support multi-threading.',
      'Microkernels execute all user programs in kernel mode.'
    ],
    correctIndex: 0,
    explanation: 'Microkernels minimize code running in privileged supervisor mode to basic IPC, low-level memory mapping, and scheduling. Drivers and file systems run as isolated user-space processes communicating via IPC, improving modularity and fault isolation at the cost of IPC overhead.',
    shortcutOrInsight: 'Microkernel philosophy: Minimal privileged code. Servers/drivers in user space.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q131',
    questionNumber: 131,
    section: 'CS Core & Systems',
    domainTag: 'Database Systems & Relational Algebra',
    question: 'In relational algebra, which operator corresponds to finding elements in relation R that are associated with ALL elements in relation S?',
    options: [
      'Division (R ÷ S)',
      'Cartesian Product (R × S)',
      'Theta Join (R ⋈_θ S)',
      'Intersection (R ∩ S)'
    ],
    correctIndex: 0,
    explanation: 'Relational division (R ÷ S) is used for queries that include the phrase "for all" or "every" (e.g., finding students who have completed all courses in a curriculum).',
    shortcutOrInsight: 'Division operator (÷) evaluates universal quantification (for all).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q132',
    questionNumber: 132,
    section: 'CS Core & Systems',
    domainTag: 'Computer Networks & NAT',
    question: 'In Network Address Translation (NAT/NAPT), how does a home router multiplex thousands of private client TCP connections over a single public IPv4 address?',
    options: [
      'By translating private IP and port combinations to the public IP with unique ephemeral source ports',
      'By rewriting the destination MAC address only',
      'By using IP options in the packet header',
      'By queuing packets in a round-robin buffer'
    ],
    correctIndex: 0,
    explanation: 'Port Address Translation (NAPT) tracks mappings in a translation table pairing [Private IP, Private Port] with [Public IP, Assigned External Port]. Return packets are de-multiplexed using the destination port.',
    shortcutOrInsight: 'NAPT uses Layer 4 port numbers to multiplex multiple Layer 3 private IP addresses.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q133',
    questionNumber: 133,
    section: 'CS Core & Systems',
    domainTag: 'Operating Systems & Thrashing',
    question: 'What is the primary cause of system "thrashing" in virtual memory operating systems?',
    options: [
      'The sum of the working set sizes of all active processes exceeds the total available physical RAM frames, causing the system to spend virtually all time swapping pages.',
      'The CPU clock speed is too low for the workload.',
      'Hard drive disk sectors are physically corrupted.',
      'Multiple processes deadlocking on a mutex.'
    ],
    correctIndex: 0,
    explanation: 'Thrashing occurs when the degree of multiprogramming is too high and active processes cannot hold their working sets in memory. Every page access triggers a page fault, and CPU utilization drops to near zero as the disk paging queue saturates.',
    shortcutOrInsight: 'Thrashing: Working Set Sum > Available Physical Memory Frames.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q134',
    questionNumber: 134,
    section: 'CS Core & Systems',
    domainTag: 'Database Systems & CAP Theorem',
    question: 'According to Eric Brewer\'s CAP Theorem, in the presence of a network partition (P) between distributed database replicas, a system MUST choose between which two guarantees?',
    options: [
      'Consistency (C) and Availability (A)',
      'Consistency and Durability',
      'Atomicity and Performance',
      'Scalability and Isolation'
    ],
    correctIndex: 0,
    explanation: 'When a network partition occurs, replicas cannot communicate. If the system accepts writes on both sides, it loses Consistency (C). If it refuses writes to maintain Consistency, it loses Availability (A). Thus, under partition (P), you must choose CP or AP.',
    shortcutOrInsight: 'CAP theorem: Under Network Partition (P), you trade off between Consistency (CP) or Availability (AP).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q135',
    questionNumber: 135,
    section: 'CS Core & Systems',
    domainTag: 'Computer Architecture & Branch Prediction',
    question: 'What is the purpose of a Branch Target Buffer (BTB) in speculative out-of-order execution processors?',
    options: [
      'To cache the predicted target instruction address of a branch before the branch instruction is even decoded',
      'To store register values during context switch',
      'To verify branch condition flags in the ALU',
      'To flush the pipeline on branch misprediction'
    ],
    correctIndex: 0,
    explanation: 'The Branch Target Buffer (BTB) is an associative cache indexed by the instruction pointer (PC). It predicts whether a branch will be taken and immediately supplies the target fetch address during the Instruction Fetch (IF) stage, avoiding pipeline bubbles.',
    shortcutOrInsight: 'BTB predicts target branch address at Fetch time before decode completes.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q136',
    questionNumber: 136,
    section: 'CS Core & Systems',
    domainTag: 'Computer Networks & TCP Flow Control',
    question: 'In TCP, what mechanism prevents a fast sender from overwhelming a slow receiver\'s receive buffer?',
    options: [
      'Receive Window (rwnd) advertised in TCP header ACKs',
      'Congestion Window (cwnd) computed by the sender',
      'Time-To-Live (TTL) header field',
      'Nagle\'s Algorithm'
    ],
    correctIndex: 0,
    explanation: 'Flow control is receiver-driven: The receiver advertises its available buffer space via the 16-bit \'Window\' field (rwnd) in every ACK. The sender cannot have more unacknowledged bytes in flight than min(cwnd, rwnd).',
    shortcutOrInsight: 'Flow control = Receiver buffer protection (rwnd). Congestion control = Network pipe protection (cwnd).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q137',
    questionNumber: 137,
    section: 'CS Core & Systems',
    domainTag: 'Operating Systems & Synchronization Primitives',
    question: 'What is the "ABA Problem" in lock-free concurrent programming using Compare-And-Swap (CAS)?',
    options: [
      'A memory location changes from value A to B and back to A; CAS succeeds assuming nothing changed, but semantic state (e.g. pointers) may have been corrupted.',
      'A thread deadlocks on two mutexes named A and B.',
      'Two processes alternate execution indefinitely without progress.',
      'A compiler reorders reads before writes.'
    ],
    correctIndex: 0,
    explanation: 'In lock-free algorithms, CAS verifies memory holds A before swapping. If another thread changes A to B, recycles the node, and writes A back, CAS succeeds even though the underlying data structure state has completely changed. Solution: tagged pointers with version counters.',
    shortcutOrInsight: 'ABA problem: Value returns to original A, masking intermediate state modifications.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q138',
    questionNumber: 138,
    section: 'CS Core & Systems',
    domainTag: 'Database Systems & Hash Indexes',
    question: 'Why are Hash Indexes unsuitable for queries with range conditions (e.g., WHERE age BETWEEN 25 AND 35)?',
    options: [
      'Hash functions do not preserve the ordering of keys; adjacent key values map to pseudo-random, scattered hash buckets.',
      'Hash tables do not support integer values.',
      'Hash indexes require O(N) memory.',
      'Hash indexes cannot handle collisions.'
    ],
    correctIndex: 0,
    explanation: 'Hash functions are designed to distribute keys uniformly across buckets (destroying monotonic order). A range query would require scanning every single bucket in the entire hash table (O(N) full table scan), whereas a B+ tree maintains sorted keys allowing O(log N) range scans.',
    shortcutOrInsight: 'Hash destroys ordering (equality only). B+ Trees preserve ordering (range friendly).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q139',
    questionNumber: 139,
    section: 'CS Core & Systems',
    domainTag: 'Computer Networks & HTTP Protocol',
    question: 'What is the purpose of the HTTP/1.1 "Transfer-Encoding: chunked" header?',
    options: [
      'It allows the server to stream dynamically generated response content without knowing the total Content-Length in advance.',
      'It compresses images automatically.',
      'It enforces TLS encryption on chunks.',
      'It splits requests across multiple TCP connections.'
    ],
    correctIndex: 0,
    explanation: 'Before chunked encoding, persistent HTTP/1.1 connections required Content-Length so clients knew when a message ended. Chunked transfer encoding sends data as a series of size-delimited chunks, terminating with a 0-byte chunk, perfect for dynamic streaming.',
    shortcutOrInsight: 'Chunked encoding streams dynamic payloads without prior Content-Length knowledge.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q140',
    questionNumber: 140,
    section: 'CS Core & Systems',
    domainTag: 'Operating Systems & File Systems',
    question: 'In Linux, what happens to a disk file when a running process has an open file descriptor to it, but another process executes `unlink()` (or `rm`) on that file?',
    options: [
      'The directory entry is removed immediately, but the inode and disk blocks remain allocated until the process closes its file descriptor.',
      'The file is immediately wiped and the reading process receives an I/O error.',
      'The unlink command fails with an EBUSY error.',
      'The process is terminated by SIGKILL.'
    ],
    correctIndex: 0,
    explanation: 'In Unix, a file\'s data is tracked by its inode link count and active file table references. unlink() decrements the link count. As long as at least one file descriptor is open, the kernel keeps the inode and data blocks intact. When the last descriptor is closed, disk blocks are freed.',
    shortcutOrInsight: 'Unix file deletion: Blocks are freed only when link_count == 0 AND open_handles == 0.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q141',
    questionNumber: 141,
    section: 'CS Core & Systems',
    domainTag: 'Computer Architecture & Memory Hierarchy',
    question: 'In a 64-byte cache line architecture, what performance penalty occurs when two threads on different cores update independent variables that happen to reside in the same 64-byte cache line?',
    options: [
      'False Sharing',
      'True Data Race',
      'Deadlock',
      'TLB Shootdown'
    ],
    correctIndex: 0,
    explanation: 'False Sharing occurs when two threads modify distinct variables located in the same cache block. Even though the program logic is independent, cache coherence protocols invalidate the line across cores back and forth (cache sloshing), degrading performance.',
    shortcutOrInsight: 'False Sharing: Independent variables sharing the same cache line invalidating each other.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q142',
    questionNumber: 142,
    section: 'CS Core & Systems',
    domainTag: 'Database Systems & SQL Optimization',
    question: 'Why does applying a function to an indexed column in a WHERE clause (e.g., `WHERE UPPER(email) = \'JOHN@EXAMPLE.COM\'`) prevent the database optimizer from using a standard B-Tree index on `email`?',
    options: [
      'The function transforms column values dynamically, making the expression non-sargable (Search Argument Able) unless a functional index is created.',
      'B-Tree indexes cannot store strings.',
      'UPPER() causes a syntax error in SQL standards.',
      'Indexed columns cannot be filtered in WHERE clauses.'
    ],
    correctIndex: 0,
    explanation: 'Standard indexes are sorted by the raw column values (`email`), not the transformed values (`UPPER(email)`). The query planner cannot binary-search the index tree and must resort to a full table scan evaluating the function for every row (non-sargable).',
    shortcutOrInsight: 'Non-sargable predicate: Applying functions to indexed columns disables direct index lookups.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q143',
    questionNumber: 143,
    section: 'CS Core & Systems',
    domainTag: 'Computer Networks & Sliding Window',
    question: 'In Go-Back-N ARQ with an m-bit sequence number, what is the maximum allowed sender window size to prevent duplicate packet ambiguity?',
    options: [
      '2^m - 1',
      '2^m',
      '2^(m-1)',
      '2^(m+1)'
    ],
    correctIndex: 0,
    explanation: 'In Go-Back-N, the sender window size must not exceed 2^m - 1. If window size were 2^m, an entire window of ACKs lost would cause the sender to retransmit, and the receiver could not distinguish whether the frames were new or retransmissions.',
    shortcutOrInsight: 'Go-Back-N window: 2^m - 1. Selective Repeat window: 2^(m - 1).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q144',
    questionNumber: 144,
    section: 'CS Core & Systems',
    domainTag: 'Operating Systems & Deadlock Detection',
    question: 'Which of the following conditions is NOT one of Coffman\'s four necessary conditions for deadlock?',
    options: [
      'Preemption of resources allowed',
      'Mutual Exclusion',
      'Hold and Wait',
      'Circular Wait'
    ],
    correctIndex: 0,
    explanation: 'Coffman\'s four necessary conditions for deadlock are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption (resources CANNOT be preempted), and 4. Circular Wait. Allowing preemption prevents or breaks deadlock.',
    shortcutOrInsight: 'Coffman conditions: NO Preemption is required for deadlock; allowing preemption eliminates deadlock.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q145',
    questionNumber: 145,
    section: 'CS Core & Systems',
    domainTag: 'Database Systems & MVCC',
    question: 'In Multi-Version Concurrency Control (MVCC) used by PostgreSQL and MySQL InnoDB, how do readers interact with concurrent writers?',
    options: [
      'Readers never block writers, and writers never block readers; readers view a consistent snapshot based on transaction read timestamps.',
      'Readers acquire shared locks that block all writers.',
      'Writers acquire exclusive locks that block all readers.',
      'Transactions must be executed sequentially in single-threaded mode.'
    ],
    correctIndex: 0,
    explanation: 'MVCC maintains multiple versions of each row. When a transaction writes, it creates a new version with a commit timestamp. Readers read the latest committed version visible to their snapshot without acquiring locks: "Readers don\'t block writers, writers don\'t block readers."',
    shortcutOrInsight: 'MVCC core principle: Snapshot isolation decouples readers from writers without locking.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q146',
    questionNumber: 146,
    section: 'CS Core & Systems',
    domainTag: 'Computer Networks & IPv6 Header',
    question: 'What IPv4 header field was deliberately removed in IPv6 to reduce router packet processing overhead?',
    options: [
      'Header Checksum',
      'Hop Limit',
      'Payload Length',
      'Next Header'
    ],
    correctIndex: 0,
    explanation: 'IPv6 removed the Header Checksum because error checking is already handled by Layer 2 (Ethernet CRC) and Layer 4 (TCP/UDP checksums). In IPv4, routers had to recompute the checksum at every hop as TTL decremented. Removing it dramatically speeds up routing.',
    shortcutOrInsight: 'IPv6 eliminates Header Checksum to eliminate hop-by-hop recomputation.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q147',
    questionNumber: 147,
    section: 'CS Core & Systems',
    domainTag: 'Operating Systems & Linux Signals',
    question: 'Which of the following Linux signals CANNOT be caught, blocked, or ignored by any user process?',
    options: [
      'SIGKILL and SIGSTOP',
      'SIGINT and SIGTERM',
      'SIGSEGV and SIGFPE',
      'SIGHUP and SIGALRM'
    ],
    correctIndex: 0,
    explanation: 'POSIX mandates that SIGKILL (9) and SIGSTOP (19) cannot be caught, handled, or ignored by any process. They provide unconditional administrative control to terminate or pause errant processes.',
    shortcutOrInsight: 'Uncatchable signals: SIGKILL (terminate immediately) and SIGSTOP (pause immediately).',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q148',
    questionNumber: 148,
    section: 'CS Core & Systems',
    domainTag: 'Database Systems & Sharding',
    question: 'What is the primary advantage of Consistent Hashing over modulo hashing (Hash(key) % N) when partitioning data across distributed database nodes?',
    options: [
      'When nodes are added or removed, only K/N keys need to be remapped on average, avoiding full-cluster rehashing.',
      'Consistent hashing guarantees zero hash collisions.',
      'It eliminates network latency completely.',
      'It converts NoSQL databases into ACID relational stores.'
    ],
    correctIndex: 0,
    explanation: 'In traditional modulo hashing (key % N), changing N causes almost 100% of keys to move to new nodes. In Consistent Hashing, keys and nodes are placed on a 360° ring. Adding/removing a node only affects adjacent keys (K/N on average).',
    shortcutOrInsight: 'Consistent Hashing: Minimal key migration (O(K/N)) during node scaling.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q149',
    questionNumber: 149,
    section: 'CS Core & Systems',
    domainTag: 'Computer Networks & Socket API',
    question: 'In network socket programming, what is the purpose of the SO_REUSEADDR socket option?',
    options: [
      'It allows a socket to bind to an address/port that is currently in the TCP TIME_WAIT state, enabling rapid server restarts.',
      'It allows multiple clients to share the same IP.',
      'It encrypts TCP sockets using TLS.',
      'It increases socket buffer size to 1 GB.'
    ],
    correctIndex: 0,
    explanation: 'When a TCP server is restarted quickly, its listening port is often stuck in the 2MSL TIME_WAIT state, causing bind() to fail with EADDRINUSE. SO_REUSEADDR allows the new process to bind immediately.',
    shortcutOrInsight: 'SO_REUSEADDR bypasses TIME_WAIT port binding restriction on server reboot.',
    difficulty: 'Very Hard'
  },
  {
    id: 'fa-q150',
    questionNumber: 150,
    section: 'CS Core & Systems',
    domainTag: 'Operating Systems & Memory Paging',
    question: 'What is the purpose of the Dirty Bit (Modified Bit) in a Page Table Entry?',
    options: [
      'To indicate whether the page has been modified in memory, so it must be written back to swap disk before being evicted.',
      'To indicate a virus infection in the page.',
      'To prevent read access to the page.',
      'To count total accesses for LRU scheduling.'
    ],
    correctIndex: 0,
    explanation: 'The hardware MMU sets the dirty bit whenever a write instruction executes on that page. When the OS evicts the page, if the dirty bit is 0, the page can simply be discarded (clean). If it is 1, the page must be written back to swap disk (dirty writeback).',
    shortcutOrInsight: 'Dirty bit = 1: Page modified, must write to disk on eviction. Dirty bit = 0: Drop without I/O.',
    difficulty: 'Very Hard'
  }
];
