import { FaangMockTest, FaangQuestion } from '../types';

// ============================================================================
// 8. JAVA & JVM ENTERPRISE ARCHITECTURE (TIER-2) (10 MCQs)
// Project Reactor, GraalVM Native Images, ZGC Tuning, Saga Pattern & Distributed Locks
// ============================================================================
export const JAVA_TIER2_QUESTIONS: FaangQuestion[] = [
  {
    id: 'java2-q1',
    testId: 'mock-java-programming-tier2',
    section: 'Reactive Streams & Project Reactor',
    companyTag: 'Netflix Cloud Architecture / Spring Core',
    question: 'In Spring WebFlux and Project Reactor, what happens if an unhandled blocking I/O call (e.g. `Thread.sleep()` or legacy JDBC `DriverManager.getConnection()`) is executed inside a `Mono.map()` on an Elastic/Netty EventLoop thread?',
    options: [
      'It starves the small, fixed Netty EventLoop thread pool (typically equal to CPU core count), causing severe latency spikes or complete throughput freezing for hundreds of concurrent reactive requests',
      'The JVM automatically spawns 1,000 new operating system threads to compensate',
      'Spring WebFlux automatically converts the blocking call into an asynchronous non-blocking promise',
      'The Java compiler refuses to compile any code containing `map()`'
    ],
    correctIndex: 0,
    explanation: 'Reactive servers like Netty allocate a tiny number of EventLoop worker threads (e.g., 2x CPU cores) to service thousands of non-blocking connections. Blocking an EventLoop thread halts event processing for all connections assigned to that thread. Any blocking operation must be explicitly offloaded to a dedicated worker scheduler using `.subscribeOn(Schedulers.boundedElastic())`.',
    shortcutOrInsight: 'Reactive Invariant: Never block the EventLoop! Always offload legacy blocking I/O to `Schedulers.boundedElastic()`.',
    difficulty: 'Very Hard'
  },
  {
    id: 'java2-q2',
    testId: 'mock-java-programming-tier2',
    section: 'Modern JVM Garbage Collection',
    companyTag: 'Oracle Java Platform Group',
    question: 'How does the Z Garbage Collector (ZGC) in modern JDK 21+ achieve sub-millisecond maximum GC pause times even on multi-terabyte heaps?',
    options: [
      'By performing virtually all GC phases (marking, relocation, reference processing) concurrently with application threads using Colored Pointers and Load Barriers',
      'By keeping all objects permanently on the thread stack and never allocating to heap memory',
      'By deleting all objects older than 5 seconds unconditionally',
      'By pausing the CPU hardware for 10 nanoseconds during every allocation'
    ],
    correctIndex: 0,
    explanation: 'ZGC is a low-latency, scalable garbage collector. Its peak pause times are consistently under 1 millisecond regardless of heap size (from 16MB to 16TB). It achieves this by performing mark and compaction relocation phases concurrently with running Java threads, using 64-bit colored pointers (metadata bits stored in reference addresses) and JIT-compiled load barriers that patch references on-the-fly.',
    shortcutOrInsight: 'ZGC Core Mechanism: Colored Pointers + Concurrent Relocation with Load Barriers = Sub-millisecond pauses on terabyte heaps.',
    difficulty: 'Hard'
  },
  {
    id: 'java2-q3',
    testId: 'mock-java-programming-tier2',
    section: 'Distributed Transactions & Microservices',
    companyTag: 'Uber Payments / Amazon Core Commerce',
    question: 'In microservice architectures where 2PC is unviable across distributed boundaries, how does the "Saga Pattern" maintain data consistency across multi-service workflows?',
    options: [
      'By executing a sequence of local transactions where each step updates data within a single service and publishes an event; if a step fails, compensating transactions are executed in reverse order to undo prior committed changes',
      'By locking all microservice databases in a single global distributed mutex',
      'By rolling back database disks using hourly snapshot restores',
      'By converting all HTTP requests into synchronous database triggers'
    ],
    correctIndex: 0,
    explanation: 'Distributed 2PC does not scale across microservices due to tight coupling and lock retention. The Saga Pattern decomposes a distributed transaction into a series of local transactions coordinated via Orchestration (central orchestrator) or Choreography (event-driven). If a step fails (e.g. payment decline), the saga triggers explicit Compensating Transactions (e.g. unreserve inventory).',
    shortcutOrInsight: 'Saga Pattern: Forward local transactions + Compensating rollback transactions. Essential for distributed microservice consistency.',
    difficulty: 'Hard'
  },
  {
    id: 'java2-q4',
    testId: 'mock-java-programming-tier2',
    section: 'AOT Compilation & GraalVM',
    companyTag: 'Red Hat Quarkus / Spring Boot 3 Team',
    question: 'What is the primary constraint of GraalVM Native Image Ahead-of-Time (AOT) compilation under the "Closed-World Assumption"?',
    options: [
      'All bytecode, classes, dynamic proxies, and reflection accesses must be discoverable or explicitly configured at build time, meaning unconfigured dynamic class loading via `Class.forName()` fails at runtime',
      'Java code cannot contain any integer arithmetic',
      'The application must run strictly inside a 32-bit container',
      'Garbage collection is completely disabled in native images'
    ],
    correctIndex: 0,
    explanation: 'GraalVM Native Image analyzes reachable code statically at build time to produce a standalone platform binary with sub-50ms startup time and low memory footprint. Under the Closed-World Assumption, anything not reachable or registered in `reachability-metadata.json` (such as reflective calls, JNI, or dynamic proxies) is stripped away and will throw `ClassNotFoundException` at runtime.',
    shortcutOrInsight: 'GraalVM Closed-World: Fast startup + tiny memory, but requires explicit reflection & proxy metadata for dynamic libraries.',
    difficulty: 'Hard'
  },
  {
    id: 'java2-q5',
    testId: 'mock-java-programming-tier2',
    section: 'Java Virtual Threads (Project Loom)',
    companyTag: 'Oracle JDK Engineering Team',
    question: 'In Java 21 Virtual Threads (`Thread.ofVirtual()`), what occurs under the hood when a virtual thread performs a blocking socket read (`InputStream.read()`)?',
    options: [
      'The JVM unmounts the virtual thread from its underlying carrier OS platform thread (ForkJoinPool worker); the carrier thread continues executing other virtual threads while the blocking socket waits in epoll/kqueue',
      'The carrier OS thread is permanently suspended until data arrives',
      'The socket read throws an `InterruptedException` immediately',
      'A new operating system kernel thread is spawned for every byte received'
    ],
    correctIndex: 0,
    explanation: 'Virtual threads decouple Java threads from OS kernel threads. A million virtual threads run on a few dozen Carrier Threads. When a virtual thread performs a blocking operation in standard Java libraries (I/O, locks), the runtime catches this, saves its call stack to heap memory, unmounts it from the carrier thread, and registers the fd with an internal poller (`epoll`). When data arrives, it remounts.',
    shortcutOrInsight: 'Virtual Threads (Loom): Blocking operations unmount from carrier threads. Enables simple synchronous code with massive asynchronous scalability.',
    difficulty: 'Hard'
  },
  {
    id: 'java2-q6',
    testId: 'mock-java-programming-tier2',
    section: 'Distributed Locking with Redis & Redisson',
    companyTag: 'Stripe Global Payments Infrastructure',
    question: 'Why is a naive `SETNX lock_key token EX 30` in Redis insufficient for safe distributed locking in Java without a "Lock Watchdog" (as implemented in Redisson)?',
    options: [
      'If a business process takes longer than 30 seconds due to a JVM GC pause or slow database query, the lock expires automatically in Redis, allowing another thread to acquire the lock and cause split-brain data corruption; Redisson\'s watchdog periodically extends lock lease time until release',
      'Redis does not support key expiration in production',
      '`SETNX` can only be executed by superuser accounts',
      'Redis keys can only store positive numeric integers'
    ],
    correctIndex: 0,
    explanation: 'If a node acquires a lock with a fixed TTL and is frozen by a Stop-the-World GC pause or network stall, the TTL expires. Node B then acquires the same lock. When Node A wakes up, both believe they own the lock! Redisson solves this with a Lock Watchdog: a background timer that continuously extends the lock expiration while the holding thread is actively executing, releasing it only upon explicit completion or node crash.',
    shortcutOrInsight: 'Distributed Lock Safety: Use Redisson Watchdog to extend lock lease during long operations, preventing premature TTL expiration.',
    difficulty: 'Very Hard'
  },
  {
    id: 'java2-q7',
    testId: 'mock-java-programming-tier2',
    section: 'Java Concurrency & False Sharing',
    companyTag: 'LMAX Disruptor Architecture',
    question: 'How does the LMAX Disruptor high-throughput messaging ring buffer achieve 20+ million operations per second in Java without lock contention?',
    options: [
      'By using a pre-allocated circular array buffer with cache-line padding (`@Contented` / long padding) to prevent false sharing, and coordination via single-writer atomic memory sequences without locks',
      'By writing all messages to the local hard drive as raw binary files',
      'By disabling type checking in the Java Virtual Machine',
      'By transmitting messages over UDP multicast across motherboard circuits'
    ],
    correctIndex: 0,
    explanation: 'The LMAX Disruptor eliminates queue lock contention and cache misses through three key design principles: (1) Pre-allocated ring buffer array (zero runtime GC allocation), (2) Cache line padding around sequence numbers (preventing False Sharing between CPU L1/L2 caches), and (3) Memory barrier sequence sequencing without locks or CAS loops.',
    shortcutOrInsight: 'Disruptor Principles: Pre-allocation (no GC) + Cache-line padding (no false sharing) + Atomic sequence barriers (no lock contention).',
    difficulty: 'Very Hard'
  },
  {
    id: 'java2-q8',
    testId: 'mock-java-programming-tier2',
    section: 'Spring Boot 3 Security & OAuth2 Resource Servers',
    companyTag: 'Okta / Spring Security Core',
    question: 'When configuring a stateless Spring Boot 3 Resource Server with JWT authentication, which bean configuration ensures that roles contained in custom JWT claims (`roles: ["ADMIN"]`) are properly mapped to Spring Security authorities (`ROLE_ADMIN`)?',
    options: [
      'A custom `JwtAuthenticationConverter` configured with a `JwtGrantedAuthoritiesConverter` that sets authority prefix to `ROLE_` and authorities claim name to `roles`',
      '`@EnableAutoSecurity(roles = "all")`',
      '`SecurityContextHolder.setMasterUser("admin")`',
      'Adding the `@CrossOrigin("*")` annotation to every controller'
    ],
    correctIndex: 0,
    explanation: 'By default, Spring Security maps the `scope` or `scp` claim with prefix `SCOPE_`. If an Identity Provider (Keycloak, Auth0, Okta) embeds roles in `realm_access.roles` or `roles`, you must configure a `JwtAuthenticationConverter` whose `JwtGrantedAuthoritiesConverter` extracts the custom array and applies the standard `ROLE_` prefix required by `@PreAuthorize("hasRole(\'ADMIN\')")`.',
    shortcutOrInsight: 'JWT Role Mapping: Custom `JwtAuthenticationConverter` bridges identity token claims to Spring Security `GrantedAuthority` collections.',
    difficulty: 'Medium'
  },
  {
    id: 'java2-q9',
    testId: 'mock-java-programming-tier2',
    section: 'JMM Happens-Before & Volatile',
    companyTag: 'Java Language Specification Committee',
    question: 'Under the Java Memory Model (JMM), what does the "Volatile Variable Rule" state regarding memory visibility between two threads?',
    options: [
      'A write to a volatile variable happens-before every subsequent read of that same volatile variable, ensuring that all writes performed by thread A prior to the volatile write are visible to thread B after its volatile read',
      'Volatile variables are cached exclusively in GPU registers',
      'Volatile variables cannot be read by more than one thread per minute',
      'Volatile prevents the garbage collector from reclaiming the object'
    ],
    correctIndex: 0,
    explanation: 'The Volatile Variable Rule establishes a happens-before order: a write to a `volatile` field synchronizes-with all subsequent reads of that field. Crucially, by transitivity, any variables modified by Thread A prior to setting the volatile flag are flushed to main memory and guaranteed visible to Thread B once it reads the volatile flag.',
    shortcutOrInsight: 'Volatile Happens-Before: Write volatile -> Read volatile flushes all previous thread memory writes across the memory barrier.',
    difficulty: 'Hard'
  },
  {
    id: 'java2-q10',
    testId: 'mock-java-programming-tier2',
    section: 'High-Performance Java Serialization',
    companyTag: 'Apache Kafka / gRPC Java Team',
    question: 'Why do high-throughput distributed systems (Kafka, gRPC) strictly reject standard Java Object Serialization (`java.io.Serializable`) in production?',
    options: [
      'Java serialization has massive CPU and bandwidth overhead (serializes full class metadata and package hierarchies), is language-locked, and has a catastrophic history of remote code execution (RCE) gadget vulnerabilities; Protobuf/Avro provides compact, schema-validated, cross-language binary encoding',
      'Java serialization only works on Windows 95',
      '`Serializable` can only serialize arrays of length 10 or less',
      'Java serialization deletes the original object from RAM upon serialization'
    ],
    correctIndex: 0,
    explanation: 'Standard `Serializable` is notoriously slow, serializes class signatures and verbose descriptors, and is the primary vector for arbitrary code execution via deserialization gadget chains (Apache Commons Collections exploit). Modern systems use compact binary formats (Protobuf, Avro, Kryo) that serialize only schema-defined bytes with zero metadata overhead.',
    shortcutOrInsight: 'Serialization Best Practice: Replace standard Java `Serializable` with Protocol Buffers or Avro for security, performance, and cross-platform compatibility.',
    difficulty: 'Medium'
  }
];

// ============================================================================
// 9. PYTHON & DISTRIBUTED SYSTEMS INTERNALS (TIER-2) (10 MCQs)
// Asyncio Event Loops, UVloop, C-Extensions, Zero-Copy Bytes & Ray Distributed Clusters
// ============================================================================
export const PYTHON_TIER2_QUESTIONS: FaangQuestion[] = [
  {
    id: 'py2-q1',
    testId: 'mock-python-programming-tier2',
    section: 'Asyncio Internals & UVloop',
    companyTag: 'FastAPI / Sanic Core Engineering',
    question: 'Why does replacing Python\'s default `asyncio` event loop with `uvloop` (written in Cython on top of `libuv`) increase network I/O throughput by 2x to 4x?',
    options: [
      'uvloop utilizes the high-performance C library libuv (powering Node.js), implementing zero-copy memory transfers, optimized epoll/kqueue multiplexing, and C-level callback dispatch that bypasses pure-Python event loop overhead',
      'uvloop disables Python\'s garbage collection permanently',
      'uvloop runs Python code on remote quantum servers',
      'uvloop converts Python into compiled Fortran at runtime'
    ],
    correctIndex: 0,
    explanation: 'Python\'s standard `asyncio` event loop is implemented in pure Python, incurring substantial object allocation and dispatch overhead on every socket event. `uvloop` is a drop-in C-extension replacement written in Cython over `libuv`. It handles polling, buffering, and scheduling directly in C, bringing Python I/O performance on par with Go and Node.js.',
    shortcutOrInsight: 'uvloop Power: `uvloop.install()` replaces pure-Python asyncio event loop with libuv in C, maximizing throughput.',
    difficulty: 'Hard'
  },
  {
    id: 'py2-q2',
    testId: 'mock-python-programming-tier2',
    section: 'Zero-Copy Memory & Memoryview',
    companyTag: 'PyTorch Core / NumPy Infrastructure',
    question: 'How does Python\'s `memoryview` object enable zero-copy data slicing and processing of massive binary files or tensor buffers?',
    options: [
      'It wraps an underlying C-contiguous buffer conforming to the Python Buffer Protocol (PEP 3118), allowing slicing without duplicating bytes in memory, simply tracking pointer offsets and strides',
      'It creates an encrypted copy of the array on the swap disk',
      'It converts binary bytes into JSON strings automatically',
      'It compresses data using gzip in real time'
    ],
    correctIndex: 0,
    explanation: 'Standard Python slicing (`data[1000:2000]`) on `bytes` creates a brand-new heap-allocated copy of the data. Slicing a 1GB byte buffer 10 times allocates 10GB of RAM! A `memoryview(data)` exposes the C buffer directly: slicing `mv[1000:2000]` returns a new view referencing the same memory location with modified offset and length, achieving true zero-copy processing.',
    shortcutOrInsight: 'Zero-Copy Python: `memoryview` + Buffer Protocol allows slicing and network socket transmission without copying memory buffers.',
    difficulty: 'Hard'
  },
  {
    id: 'py2-q3',
    testId: 'mock-python-programming-tier2',
    section: 'Distributed Computing with Ray',
    companyTag: 'OpenAI / Anyscale Ray Architecture',
    question: 'In Ray distributed computing for AI and parallel processing, what is the architectural difference between a Ray "Task" (`@ray.remote` on a function) and a Ray "Actor" (`@ray.remote` on a class)?',
    options: [
      'A Task is a stateless, pure function executed on any worker node across the cluster; an Actor is a stateful service instantiated on a dedicated worker process that sequentially processes method invocations maintaining internal mutable state',
      'Tasks can only run on CPU, while Actors run on GPU',
      'Actors are only used for graphic rendering in games',
      'Tasks can only execute once per calendar month'
    ],
    correctIndex: 0,
    explanation: 'In Ray: (1) Tasks are stateless remote functions scheduled dynamically across cluster nodes with inputs and outputs stored in the Plasma shared-memory object store. (2) Actors are stateful worker processes that preserve state across remote method calls (e.g. keeping a 40GB LLM weights tensor loaded in GPU VRAM between inference requests).',
    shortcutOrInsight: 'Ray Primitives: Task = Stateless parallel function; Actor = Stateful microservice with persistent in-memory state.',
    difficulty: 'Medium'
  },
  {
    id: 'py2-q4',
    testId: 'mock-python-programming-tier2',
    section: 'CPython Garbage Collection & Cycles',
    companyTag: 'Instagram / Meta Python Performance Team',
    question: 'Why does Python maintain a cyclic generational garbage collector (`gc` module) in addition to its primary reference counting mechanism, and how did Instagram improve web server memory footprint regarding GC?',
    options: [
      'Reference counting cannot detect reference cycles (e.g. object A references B, and B references A); Instagram disabled cyclic GC in pre-forked web worker processes (`gc.disable()`) to prevent copy-on-write page dirties from duplicating shared memory pages across workers',
      'Reference counting only works for string variables',
      'Instagram replaced Python\'s memory manager with Windows Notepad',
      'The cyclic GC deletes variables that have not been read for 24 hours'
    ],
    correctIndex: 0,
    explanation: 'Reference counting instantly deallocates objects when ref count reaches 0, but fails on circular graphs (`a.self = a`). The cyclic GC periodically walks generations to find isolated unreachable cycles. In multi-process Gunicorn/uWSGI workers, GC head pointer modifications dirty Linux Copy-on-Write (CoW) memory pages. Instagram famously called `gc.disable()` after server boot, saving 30% RAM across thousands of servers.',
    shortcutOrInsight: 'Python GC & CoW: Cyclic GC handles circular references. In pre-forked multi-worker architectures, GC writes can break Linux Copy-on-Write page sharing.',
    difficulty: 'Very Hard'
  },
  {
    id: 'py2-q5',
    testId: 'mock-python-programming-tier2',
    section: 'Metaclasses & Dynamic Class Creation',
    companyTag: 'Pydantic / Django ORM Core Team',
    question: 'In Python object-oriented architecture, what is the exact execution role of `__new__` vs `__init__` in a custom `Metaclass(type)`?',
    options: [
      '`__new__` creates and allocates the actual class object in memory, receiving the class name, bases, and attribute dictionary before the class exists; `__init__` initializes the newly created class instance',
      '`__new__` is only called when an instance of the class is deleted',
      '`__init__` compiles the Python code into C++ source code',
      'Metaclasses cannot define `__new__`'
    ],
    correctIndex: 0,
    explanation: 'Classes in Python are instances of metaclasses (`type`). In a metaclass, `def __new__(mcs, name, bases, attrs)` is called to allocate the class object before it is created. Frameworks like Django ORM and Pydantic intercept `attrs` in `__new__` to inspect field descriptors, validate type annotations, and rewrite class attributes before instantiating the class via `type.__new__()`.',
    shortcutOrInsight: 'Metaclass Lifecycle: `__new__` allocates the class object itself (can modify class dictionary); `__init__` configures it after creation.',
    difficulty: 'Hard'
  },
  {
    id: 'py2-q6',
    testId: 'mock-python-programming-tier2',
    section: 'Cython & C-Extension Optimization',
    companyTag: 'SciPy / NumPy High-Performance Core',
    question: 'When writing high-performance numerical routines in Cython, which directive is required to release Python\'s Global Interpreter Lock (GIL) and enable true multi-core parallel processing across threads with OpenMP?',
    options: [
      'Annotating functions with `nogil` and executing computation blocks inside `with nogil:`, ensuring that no Python objects (`PyObject*`) or Python C-API calls are touched inside the block',
      '`import multi_core_cpu`',
      '`#pragma disable_gil` in the header comments',
      '`os.environ["GIL"] = "0"`'
    ],
    correctIndex: 0,
    explanation: 'In Cython, the `with nogil:` context manager drops the Python GIL. Inside this block, threads can execute pure C-level arithmetic and parallel loops (`cython.parallel.prange`) across all CPU cores simultaneously via OpenMP. However, any interaction with Python objects (strings, dicts, exceptions) re-acquires the GIL or triggers a compiler error.',
    shortcutOrInsight: 'Cython Multi-Core: `with nogil:` releases the GIL for raw C data types and arrays, unlocking full CPU core parallelism.',
    difficulty: 'Hard'
  },
  {
    id: 'py2-q7',
    testId: 'mock-python-programming-tier2',
    section: 'Descriptors & Attribute Access Protocol',
    companyTag: 'Python Language Architecture',
    question: 'What is the precedence order when accessing an attribute `obj.x` in Python?',
    options: [
      '1. Data Descriptor with `__set__` or `__delete__` in class MRO -> 2. Instance dictionary `obj.__dict__` -> 3. Non-Data Descriptor (`__get__` only, like methods) -> 4. Class dictionary -> 5. `__getattr__` fallback',
      '1. `__getattr__` -> 2. Global variables -> 3. Local variables',
      '1. Instance dictionary -> 2. Data Descriptor -> 3. System environment variables',
      '1. Text files in directory -> 2. Memory heap'
    ],
    correctIndex: 0,
    explanation: 'Python\'s attribute lookup protocol (`__getattribute__`) is strictly defined: (1) Data descriptors (implementing `__set__`) take absolute precedence over the instance dictionary `__dict__`. (2) If no data descriptor matches, Python looks up `obj.__dict__`. (3) If not found, it checks Non-Data Descriptors (like `@property` without setter, or methods). (4) Class dictionary. (5) `__getattr__()` if defined.',
    shortcutOrInsight: 'Attribute Lookup Hierarchy: Data Descriptor > Instance `__dict__` > Non-Data Descriptor > Class `__dict__` > `__getattr__`.',
    difficulty: 'Very Hard'
  },
  {
    id: 'py2-q8',
    testId: 'mock-python-programming-tier2',
    section: 'Memory Profiling & Slots',
    companyTag: 'Reddit Infrastructure / DoorDash Core',
    question: 'Why does adding `__slots__ = (\'id\', \'timestamp\', \'value\')` to a Python class reduce memory consumption by up to 70% when instantiating millions of telemetry objects?',
    options: [
      'It prevents Python from creating a dynamic `__dict__` and `__weakref__` hash table for every single instance, storing attributes in a compact, fixed-size C array pointer structure instead',
      'It converts all string values into single-character abbreviations',
      'It deletes the class from disk after instantiation',
      'It compresses each object using Brotli compression in RAM'
    ],
    correctIndex: 0,
    explanation: 'By default, every Python class instance contains an internal `__dict__` dictionary to allow adding arbitrary attributes dynamically. A dictionary has significant memory overhead (~150 to 300 bytes per instance). `__slots__` tells CPython to allocate a fixed C struct array of descriptors, saving hundreds of megabytes when managing millions of small objects.',
    shortcutOrInsight: 'Memory Optimization: Use `__slots__` for lightweight data-holder classes instantiated in high volumes to eliminate per-instance `__dict__` overhead.',
    difficulty: 'Medium'
  },
  {
    id: 'py2-q9',
    testId: 'mock-python-programming-tier2',
    section: 'Asyncio Concurrency Hazards',
    companyTag: 'Stripe Python API Reliability',
    question: 'In concurrent `asyncio` code, what is the cause of race conditions when multiple coroutines access shared state without a lock, despite Python executing on a single OS thread under the GIL?',
    options: [
      'Cooperative multitasking yields execution at any `await` expression; if a coroutine modifies part of shared state, yields at an `await`, another coroutine can read or modify the intermediate state before the first coroutine resumes',
      'The CPU hardware executes multiple instructions simultaneously at the electrical level',
      'Asyncio automatically creates 50 background POSIX threads',
      'Variables in asyncio are shared across different physical computers'
    ],
    correctIndex: 0,
    explanation: 'Even on a single thread under the GIL, asyncio is non-preemptive cooperative multitasking. State interleaving occurs at yield points. If coroutine A computes `val = state.val`, then executes `await fetch_db()`, coroutine B can run and change `state.val`. When coroutine A resumes and executes `state.val = val + 1`, it overwrites coroutine B\'s updates! `asyncio.Lock()` is required around async critical sections.',
    shortcutOrInsight: 'Async Race Conditions: Interleaving occurs across `await` boundary points. Protect multi-step asynchronous transactions with `asyncio.Lock`.',
    difficulty: 'Hard'
  },
  {
    id: 'py2-q10',
    testId: 'mock-python-programming-tier2',
    section: 'Context Managers & Generator Internals',
    companyTag: 'Python Software Foundation',
    question: 'In Python\'s `@contextlib.contextmanager` decorator, what happens if an unhandled exception is raised inside the caller\'s `with` block?',
    options: [
      'The exception is re-raised inside the generator at the point of the `yield` statement; if the generator has a `try...finally` block, the `finally` executes, ensuring resource cleanup before the exception propagates up',
      'The generator immediately crashes without executing any cleanup code',
      'Python ignores the exception and continues executing the next line',
      'The context manager converts the exception into a string return value'
    ],
    correctIndex: 0,
    explanation: 'When using `@contextmanager`, the generator yields once. If an exception occurs inside the `with` block, the context manager catches it and calls `generator.throw(type, val, tb)`. This raises the exact exception at the `yield` point. Wrapping `yield` in `try...finally` ensures that cleanup code in `finally` is guaranteed to execute even when unexpected exceptions occur.',
    shortcutOrInsight: 'Context Manager Invariant: Always wrap the `yield` inside `try...finally` to ensure resources (connections, files) are closed during caller exceptions.',
    difficulty: 'Medium'
  }
];

// ============================================================================
// 10. ADVANCED ALGORITHMS & FLOW NETWORKS (TIER-2) (10 MCQs)
// Dinic Maximum Flow, Segment Trees with Lazy Propagation, Treaps & Centroid Decomposition
// ============================================================================
export const DSA_TIER2_QUESTIONS: FaangQuestion[] = [
  {
    id: 'dsa2-q1',
    testId: 'mock-dsa-algorithms-tier2',
    section: 'Network Flow Algorithms',
    companyTag: 'Google Core Search Ranking / Codeforces 2400+',
    question: 'In Dinic\'s algorithm for computing Maximum Bipartite Matching and General Maximum Flow, what is the asymptotic time complexity on a unit network (where every edge capacity is 1)?',
    options: [
      'O(E * sqrt(V))',
      'O(V^2 * E)',
      'O(V * E^2)',
      'O(E * log V)'
    ],
    correctIndex: 0,
    explanation: 'On general networks with arbitrary capacities, Dinic\'s algorithm runs in O(V^2 * E). However, on unit networks (where all edge capacities are 1, such as in bipartite matching), the number of phases is bounded by O(sqrt(V)), and each phase takes O(E) using blocking flows with DFS and current-arc pointers, giving a total time complexity of O(E * sqrt(V)).',
    shortcutOrInsight: 'Dinic on Unit Networks: O(E * sqrt(V)). Bipartite matching with Dinic matches the Hopcroft-Karp bound while being much more general.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dsa2-q2',
    testId: 'mock-dsa-algorithms-tier2',
    section: 'Advanced Range Query Trees',
    companyTag: 'Meta Hackercup / Codeforces Div 1',
    question: 'When implementing a Segment Tree supporting both Range Addition updates and Range Sum queries, what is the primary purpose of "Lazy Propagation"?',
    options: [
      'To postpone updating child nodes during range updates by storing pending increments in a lazy tag array, ensuring that range updates execute in O(log N) rather than O(N) time',
      'To delete unused nodes from memory when array values are zero',
      'To convert the segment tree into a balanced AVL tree automatically',
      'To sort the original array in O(1) time'
    ],
    correctIndex: 0,
    explanation: 'Without lazy propagation, updating a range [L, R] would require traversing down to every individual leaf in the range, costing O(N) worst-case. Lazy propagation stores the delta in a `lazy[node]` tag on the highest canonical segment covering the subrange. The tag is only pushed down to child nodes when a subsequent query or update needs to inspect those specific children.',
    shortcutOrInsight: 'Lazy Propagation Rule: Defer pushing updates to children until strictly visited by subsequent queries. Guarantees O(log N) range updates.',
    difficulty: 'Hard'
  },
  {
    id: 'dsa2-q3',
    testId: 'mock-dsa-algorithms-tier2',
    section: 'Randomized Balanced Trees',
    companyTag: 'Two Sigma / Jane Street Algorithms',
    question: 'In a Treap (Tree + Heap) data structure, how does the structure maintain O(log N) expected height without complex AVL or Red-Black rotation cases?',
    options: [
      'Each node maintains a key satisfying Binary Search Tree (BST) ordering, and a randomly assigned priority satisfying Min-Heap ordering; simple tree rotations on insertion and deletion preserve both invariants simultaneously',
      'By rebuilding the entire tree from scratch after every 10 operations',
      'By storing all data in a 1D hash table',
      'By sorting nodes alphabetically based on memory address'
    ],
    correctIndex: 0,
    explanation: 'A Treap is a Cartesian Tree: (Key, Priority). The keys satisfy the BST property (Left.key < Node.key < Right.key) and the priorities satisfy Heap property (Node.priority <= Children.priority). Because priorities are chosen uniformly at random upon node creation, the resulting tree has the exact distribution of a randomized BST, giving O(log N) height with overwhelming probability.',
    shortcutOrInsight: 'Treap Beauty: BST on keys + Heap on random priorities. Rotation logic is trivial compared to Red-Black or Splay trees.',
    difficulty: 'Hard'
  },
  {
    id: 'dsa2-q4',
    testId: 'mock-dsa-algorithms-tier2',
    section: 'Tree Decompositions',
    companyTag: 'Google Code Jam Finals',
    question: 'What is the fundamental property of the "Centroid" of a tree with N vertices, and why does Centroid Decomposition yield an O(N log N) divide-and-conquer tree structure?',
    options: [
      'Removing the centroid leaves connected components, each having size at most N / 2; recursively decomposing on centroids produces a tree hierarchy of depth at most O(log N)',
      'The centroid is always vertex number 1',
      'The centroid is connected to every single other node by a direct edge',
      'Removing the centroid converts the tree into a directed acyclic graph'
    ],
    correctIndex: 0,
    explanation: 'Every tree has at least one centroid: a node whose removal splits the tree into subtrees, none of which exceeds size floor(N/2). By finding the centroid in O(N) using DFS, solving paths passing through it, and recursively decomposing each subtree, the recursion depth is strictly bounded by log2(N), leading to O(N log N) path counting and tree distance algorithms.',
    shortcutOrInsight: 'Centroid Property: Max child subtree size <= N/2. Bounded recursion depth log2(N) for tree divide-and-conquer.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dsa2-q5',
    testId: 'mock-dsa-algorithms-tier2',
    section: 'String Algorithms & Automata',
    companyTag: 'Bioinformatics / Genome Search Systems',
    question: 'In the Aho-Corasick string matching algorithm, what do the "failure links" represent, and what is the total time complexity to find all occurrences of K patterns in text of length N?',
    options: [
      'Failure links point to the longest proper suffix of the current node\'s string that is also a valid prefix in the Trie (analogous to the KMP π table); total search time is O(N + total occurrences)',
      'Failure links trigger error messages when misspelled words are detected',
      'Search time is O(N * K^2)',
      'Failure links force the algorithm to restart search from the first character of the text'
    ],
    correctIndex: 0,
    explanation: 'Aho-Corasick constructs a Trie of all dictionary patterns augmented with "suffix/failure links" built via BFS. If a character mismatch occurs during text streaming, the automaton follows the failure link to the longest matching suffix prefix without rescanning text. Searching a text of length N takes strictly linear O(N + Z) time where Z is the number of pattern occurrences.',
    shortcutOrInsight: 'Aho-Corasick: Multi-pattern KMP on a Trie. Linear O(N + Matches) time across thousands of simultaneous keywords.',
    difficulty: 'Hard'
  },
  {
    id: 'dsa2-q6',
    testId: 'mock-dsa-algorithms-tier2',
    section: 'Dynamic Programming Optimization',
    companyTag: 'Uber Route Optimization / Competitive Programming',
    question: 'Under what mathematical condition is the Convex Hull Trick (CHT) or Li Chao Tree applicable to optimize dynamic programming transitions of the form `dp[i] = min_{j < i} (dp[j] + m_j * x_i + c_j)` from O(N^2) to O(N log N) or O(N)?',
    options: [
      'The transition expresses `dp[i]` as the lower envelope of a set of linear functions `f_j(x) = m_j * x + c_j` evaluated at query point `x_i`',
      'All matrix dimensions must be powers of 2',
      'The values of `x_i` must be negative square roots',
      'The cost function must be randomly generated'
    ],
    correctIndex: 0,
    explanation: 'The transition `dp[i] = min_j (m_j * x_i + (dp[j] + c_j))` evaluates multiple lines `y = m*x + c` at point `x = x_i`. Rather than testing every previous `j` (O(N)), the lines are maintained in a convex hull lower envelope. If slopes `m_j` are sorted, a deque achieves amortized O(1) per query (O(N) total). If slopes or queries are arbitrary, a Li Chao Tree achieves O(N log N).',
    shortcutOrInsight: 'Convex Hull Trick: Optimizes DP states that evaluate minimums over families of linear functions y = mx + c.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dsa2-q7',
    testId: 'mock-dsa-algorithms-tier2',
    section: 'Graph Minimum Spanning Trees & DSU',
    companyTag: 'Amazon Infrastructure Network Planning',
    question: 'When implementing Disjoint Set Union (DSU) with both "Union by Rank/Size" and "Path Compression", what is the amortized time complexity per operation in terms of the Inverse Ackermann function α(N)?',
    options: [
      'O(α(N)), which is practically constant (< 5) for any conceivable value of N up to the number of atoms in the observable universe',
      'O(log N)',
      'O(sqrt(N))',
      'O(1) strictly non-amortized'
    ],
    correctIndex: 0,
    explanation: 'Tarjan proved that DSU combining both Path Compression (`parent[x] = find(parent[x])`) and Union by Rank/Size achieves an amortized time complexity of O(α(N)) per operation. Since the Ackermann function grows extraordinarily fast, its inverse α(N) <= 4 for all N <= 10^80 (the estimated count of atoms in the universe), rendering it practically instantaneous.',
    shortcutOrInsight: 'DSU Amortization: Path Compression + Union by Rank = O(alpha(N)) practically constant time.',
    difficulty: 'Medium'
  },
  {
    id: 'dsa2-q8',
    testId: 'mock-dsa-algorithms-tier2',
    section: 'Heavy-Light Decomposition (HLD)',
    companyTag: 'Atlassian Jira Hierarchy / Competitive Programming',
    question: 'In Heavy-Light Decomposition (HLD) of a tree, an edge to child `v` is designated "Heavy" if `size(v) >= size(u) / 2`. How many distinct light edges can exist on any path from the root to any leaf in a tree with N vertices?',
    options: [
      'At most O(log2 N) light edges, meaning any tree path decomposes into at most O(log N) contiguous heavy paths that can be queried on a Segment Tree in O(log^2 N) time',
      'At most 2 light edges',
      'Exactly N / 2 light edges',
      'O(sqrt(N)) light edges'
    ],
    correctIndex: 0,
    explanation: 'Each time a path traverses a "light edge" from parent `u` to child `v`, the size of the remaining subtree drops by at least half (`size(v) < size(u)/2`). Therefore, any path from root to leaf can traverse at most log2(N) light edges. This decomposes arbitrary tree paths into at most log2(N) linear chains, enabling sub-millisecond path queries using standard segment trees.',
    shortcutOrInsight: 'HLD Principle: Path size halves on each light edge -> At most log2(N) heavy chain hops from root to leaf.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dsa2-q9',
    testId: 'mock-dsa-algorithms-tier2',
    section: 'Number Theoretic Algorithms',
    companyTag: 'RSA Cryptography / Algorithmic Core',
    question: 'What is the asymptotic time complexity of computing the modular inverse `a^(-1) mod m` using the Extended Euclidean Algorithm when `gcd(a, m) = 1`?',
    options: [
      'O(log(min(a, m))) steps (Lamé\'s Theorem)',
      'O(m) linear scans',
      'O(a^2) multiplications',
      'O(sqrt(m)) trials'
    ],
    correctIndex: 0,
    explanation: 'The Extended Euclidean algorithm computes integers `x, y` such that `a*x + m*y = gcd(a, m) = 1`. In modulo `m`, `a*x ≡ 1 (mod m)`, so `x` is the modular inverse. By Lamé\'s Theorem, the number of division steps is at most 5 times the number of digits in the smaller number, giving logarithmic O(log(min(a, m))) time complexity.',
    shortcutOrInsight: 'Modular Inverse Complexity: O(log M) via Extended Euclidean Algorithm. Vastly faster than Fermat\'s Little Theorem when M is composite.',
    difficulty: 'Medium'
  },
  {
    id: 'dsa2-q10',
    testId: 'mock-dsa-algorithms-tier2',
    section: 'Geometric Algorithms',
    companyTag: 'Robotics Path Planning / Autonomous Navigation',
    question: 'In Graham\'s Scan algorithm for finding the 2D Convex Hull of N points, what geometric calculation determines whether three consecutive points `p1`, `p2`, `p3` make a counter-clockwise ("left turn") or clockwise ("right turn")?',
    options: [
      'The sign of the 2D vector cross product `(p2.x - p1.x)*(p3.y - p1.y) - (p2.y - p1.y)*(p3.x - p1.x)`: positive indicates a left turn (counter-clockwise)',
      'The dot product of vectors p1 and p3',
      'The Manhattan distance between p1 and p2',
      'The ratio of their Euclidean coordinates'
    ],
    correctIndex: 0,
    explanation: 'The orientation of triplet (p1, p2, p3) is determined by the 2D cross product of vectors (p2 - p1) and (p3 - p1), which equals twice the signed area of the triangle. If the value is positive, p3 lies to the left (counter-clockwise turn); if negative, it lies to the right (clockwise turn); if zero, the points are collinear.',
    shortcutOrInsight: '2D Orientation Test: Cross product sign determines left/right turns with pure integer arithmetic, avoiding floating-point trigonometry errors.',
    difficulty: 'Medium'
  }
];

// ============================================================================
// 11. TALLY PRIME ADVANCED TAXATION & STATUTORY PAYROLL (TIER-2) (10 MCQs)
// TDS/TCS Return Filing, Payroll Attendance/Pay Heads, Multi-Currency & E-Way Bill
// ============================================================================
export const TALLY_TIER2_QUESTIONS: FaangQuestion[] = [
  {
    id: 'tally2-q1',
    testId: 'mock-tally-prime-tier2',
    section: 'Statutory Taxation: TDS & TCS Architecture',
    companyTag: 'Ernst & Young (EY) Corporate Tax / Big 4 Audit',
    question: 'In Tally Prime, when configuring a Vendor Ledger for Tax Deducted at Source (TDS) under Section 194C (Payments to Contractors), what occurs during payment voucher entry if the vendor\'s PAN is flagged as invalid or not provided?',
    options: [
      'Tally automatically deducts TDS at the mandatory higher punitive rate of 20% (under Section 206AA of the Income Tax Act) instead of the standard 1% or 2% rate',
      'Tally crashes and cancels the company ledger',
      'Tally stops deducting TDS completely',
      'Tally rounds down payment to zero rupees'
    ],
    correctIndex: 0,
    explanation: 'Under Section 206AA of the Indian Income Tax Act, if a payee fails to furnish a valid Permanent Account Number (PAN) to the deductor, tax must be deducted at higher of: (1) rate specified in relevant provision, (2) rates in force, or (3) 20%. Tally Prime\'s statutory engine enforces this automatically when "PAN Status" is set to "PAN Not Available" or invalid.',
    shortcutOrInsight: 'Section 206AA in Tally: Missing PAN triggers statutory 20% flat deduction rate automatically in payment vouchers.',
    difficulty: 'Hard'
  },
  {
    id: 'tally2-q2',
    testId: 'mock-tally-prime-tier2',
    section: 'Corporate Payroll & Statutory Deductions',
    companyTag: 'Deloitte Human Capital / Corporate Payroll Lead',
    question: 'When configuring the Employee Provident Fund (EPF) statutory Pay Head in Tally Prime, what is the statutory wage ceiling on Basic + DA for mandatory employer EPF contribution calculation under standard EPFO rules?',
    options: [
      '₹15,000 per month (mandatory 12% contribution with 8.33% directed to EPS up to ₹1,250 and remainder to EPF Account 1)',
      '₹50,000 per month',
      '₹5,000 per month',
      'There is no wage ceiling; 100% of any salary is contributed'
    ],
    correctIndex: 0,
    explanation: 'Under EPFO statutory provisions, the statutory ceiling wage for EPF applicability is ₹15,000/month. Employer contribution of 12% is split into 8.33% for Employee Pension Scheme (EPS) capped at ₹1,250 (8.33% of 15,000) and the remaining 3.67% goes to EPF Account 1. Tally Prime allows setting statutory computation limits on pay head slabs.',
    shortcutOrInsight: 'EPFO Ceiling in Tally: ₹15,000 statutory limit splits employer 12% into EPS (capped at ₹1,250) + EPF.',
    difficulty: 'Medium'
  },
  {
    id: 'tally2-q3',
    testId: 'mock-tally-prime-tier2',
    section: 'Multi-Currency & Forex Gain/Loss',
    companyTag: 'PwC International Trade Audit',
    question: 'How does Tally Prime account for foreign exchange fluctuations when an export sales invoice recorded at 1 USD = ₹82.00 is settled 30 days later at 1 USD = ₹83.50?',
    options: [
      'The bank receipt voucher records the actual rupee inflow; Tally computes the ₹1.50 per dollar difference and posts an unadjusted balance to the Forex Gain/Loss account via a Journal Voucher',
      'Tally rewrites the original invoice date and rate retroactively',
      'Tally rejects the payment because exchange rates must be constant',
      'The customer must pay in gold bullion'
    ],
    correctIndex: 0,
    explanation: 'When recording foreign currency invoices, Tally Prime tracks base currency and foreign currency values. When settled at a higher exchange rate, an unadjusted forex difference arises. By creating a Journal voucher and selecting "Forex Gain/Loss", Tally automatically identifies unadjusted foreign exchange variances and transfers them to the P&L account.',
    shortcutOrInsight: 'Forex Accounting: Sales at booking rate -> Receipt at realization rate -> Variance transferred to Forex Gain/Loss ledger.',
    difficulty: 'Hard'
  },
  {
    id: 'tally2-q4',
    testId: 'mock-tally-prime-tier2',
    section: 'Statutory E-Invoicing & E-Way Bill Integration',
    companyTag: 'KPMG Indirect Tax Automation',
    question: 'In Tally Prime\'s Connected GST Services, what cryptographic data is returned by the GST Invoice Registration Portal (IRP) upon successful online generation of an E-Invoice?',
    options: [
      'A 64-character alphanumeric Invoice Reference Number (IRN), an IRP Digital Signature, and a signed QR Code containing invoice summary data',
      'A 4-digit PIN sent via SMS to the accountant',
      'A PDF file password-protected with the company birthdate',
      'A physical rubber stamp mailed to the company office'
    ],
    correctIndex: 0,
    explanation: 'When Tally Prime transmits JSON payload to the NIC/E-Invoice IRP API, the portal validates the payload, generates a unique 64-character hash known as the IRN (Invoice Reference Number), cryptographically signs the invoice, and produces a Signed QR code. Tally saves the IRN and prints the official QR code directly on tax invoice PDFs.',
    shortcutOrInsight: 'E-Invoice Triad: 64-character IRN + Digital Signature + Machine-Readable Signed QR Code.',
    difficulty: 'Medium'
  },
  {
    id: 'tally2-q5',
    testId: 'mock-tally-prime-tier2',
    section: 'Job Costing & Cost Centers',
    companyTag: 'Larsen & Toubro (L&T) Project Accounting',
    question: 'How does configuring "Job Costing" in Tally Prime enable enterprise project tracking across multi-site construction contracts?',
    options: [
      'By linking Cost Centers to dedicated Job Work Locations and Godowns, enabling real-time generation of Job Work Analysis sheets tracking materials consumed, direct labor, and gross margins per specific contract',
      'By doubling the GST rate on all hardware items',
      'By preventing employees from logging in outside project hours',
      'By forcing all transactions to be recorded in US dollars'
    ],
    correctIndex: 0,
    explanation: 'Job Costing in Tally Prime links Cost Centers with Godowns/Sites. Material transfers via Stock Journals track goods issued to specific job sites, while payment and expense vouchers are allocated to the project Cost Center. The Job Work Analysis report yields instant revenue, material cost, and net profitability per contract.',
    shortcutOrInsight: 'Job Costing Architecture: Cost Centers + Dedicated Godowns + Stock Journals = Complete per-project P&L accountability.',
    difficulty: 'Hard'
  },
  {
    id: 'tally2-q6',
    testId: 'mock-tally-prime-tier2',
    section: 'Statutory TCS on Sale of Goods',
    companyTag: 'Tata Steel Commercial Accounts',
    question: 'Under Section 206C(1H) for Tax Collected at Source (TCS) on sale of goods in Tally Prime, what is the statutory turnover and receipt threshold that triggers TCS applicability?',
    options: [
      'Seller\'s business turnover exceeded ₹10 Crore in the preceding financial year, and aggregate sale consideration received from a single buyer exceeds ₹50 Lakhs in the current financial year',
      'Seller\'s turnover exceeds ₹1 Lakh',
      'Any cash sale exceeding ₹500',
      'TCS applies only to foreign multinational corporations'
    ],
    correctIndex: 0,
    explanation: 'Section 206C(1H) mandates TCS collection if: (1) The seller\'s total turnover from business exceeds ₹10 Crore in the immediately preceding financial year, and (2) The buyer pays consideration exceeding ₹50 Lakhs in the current fiscal year. Tally Prime tracks cumulative buyer receipts and prompts TCS deduction once the ₹50L threshold is crossed.',
    shortcutOrInsight: 'Section 206C(1H) Thresholds: Preceding year turnover > ₹10 Cr + Current year buyer receipt > ₹50 Lakhs.',
    difficulty: 'Hard'
  },
  {
    id: 'tally2-q7',
    testId: 'mock-tally-prime-tier2',
    section: 'Manufacturing Journal & Bill of Materials (BOM)',
    companyTag: 'Hero MotoCorp Component Assembly',
    question: 'In Tally Prime manufacturing operations, what is the role of a "Bill of Materials" (BOM) configured inside a Finished Goods stock item?',
    options: [
      'It predefines the exact list and quantities of raw materials, components, by-products, and scrap required to produce one unit of finished product during Manufacturing Journal voucher entry',
      'It acts as an insurance policy for warehouse fires',
      'It calculates employee monthly income tax',
      'It converts finished goods into raw materials when prices fall'
    ],
    correctIndex: 0,
    explanation: 'A Bill of Materials (BOM) specifies the standard recipe for manufacturing a finished good (e.g. 1 Electric Bike requires 1 Frame, 1 Battery, 2 Wheels). When entering a "Manufacturing Journal" voucher, specifying the finished quantity automatically calculates and consumes the exact required quantities of raw materials from designated godowns.',
    shortcutOrInsight: 'BOM in Tally: Finished product recipe. Automates raw material stock reductions and calculates cost of production per unit.',
    difficulty: 'Medium'
  },
  {
    id: 'tally2-q8',
    testId: 'mock-tally-prime-tier2',
    section: 'Bank Reconciliation (BRS) via Auto-Import',
    companyTag: 'HDFC Bank Corporate Treasury',
    question: 'When performing Automated Bank Reconciliation (Auto BRS) in Tally Prime by importing an electronic MT940 or Excel bank statement, on what criteria does Tally match bank transactions with company books?',
    options: [
      'Instrument Number (Cheque/UTR number), Transaction Date, and exact monetary amount, flagging unmatched entries for reconciliation adjustments',
      'The color of the bank\'s website logo',
      'The customer\'s credit score',
      'Random probability sampling'
    ],
    correctIndex: 0,
    explanation: 'Auto BRS in Tally Prime imports electronic bank statements (Excel, CSV, MT940 format). It automatically matches vouchers using Cheque Number/UTR, Value Date, and Amount. Matched transactions have their Bank Date updated instantly, while unmatched items remain pending for the accountant to investigate uncleared cheques or direct bank charges.',
    shortcutOrInsight: 'Auto BRS: Imports MT940/Excel -> Auto-matches UTR + Date + Amount -> Pinpoints uncredited cheques instantly.',
    difficulty: 'Medium'
  },
  {
    id: 'tally2-q9',
    testId: 'mock-tally-prime-tier2',
    section: 'Audit Trail & Edit Log Compliance',
    companyTag: 'Ministry of Corporate Affairs (MCA) Audit Compliance',
    question: 'Under the MCA statutory mandate for Indian companies, what permanent audit tracking feature does Tally Prime Edit Log enforce?',
    options: [
      'An immutable audit trail that logs every creation, modification, and deletion of vouchers, master records, and ledgers with exact timestamp and user ID, preventing edit history tampering or disabling',
      'It sends daily emails to the income tax department',
      'It deletes all records at the end of the fiscal year',
      'It blocks all users except the company CEO'
    ],
    correctIndex: 0,
    explanation: 'The Ministry of Corporate Affairs (MCA) mandates that companies maintain accounting software with an immutable audit trail (Edit Log). Tally Prime Edit Log records every single edit, alteration, and deletion of vouchers and masters, preserving the before-and-after values along with the username and timestamp, with no ability to turn the audit trail off.',
    shortcutOrInsight: 'MCA Edit Log Rule: Unalterable audit trail capturing timestamp, user ID, and before/after values for all ledger alterations.',
    difficulty: 'Hard'
  },
  {
    id: 'tally2-q10',
    testId: 'mock-tally-prime-tier2',
    section: 'Data Synchronization & Remote Tally',
    companyTag: 'Reliance Retail Branch Operations',
    question: 'When configuring Server-Client Data Synchronization in Tally Prime between regional branch showrooms and corporate headquarters, how are master ledger conflicts resolved?',
    options: [
      'Tally synchronizes XML packets over HTTP/HTTPS with configured conflict rules (e.g. Master records overwrite by source date or prioritize HQ server definitions), ensuring chart of accounts consistency',
      'By sending printed ledgers via courier express',
      'Tally merges both balances by adding them together',
      'The branch computer reformats its hard drive upon connection'
    ],
    correctIndex: 0,
    explanation: 'Tally Data Synchronization exchanges XML/SOAP packets between headquarters and branch offices over HTTP/HTTPS. When transactions or master ledgers are altered at both ends, the synchronization configuration rules (such as "Server Overwrite", "Client Overwrite", or "Highest Version Wins") ensure uniform ledger synchronization without data corruption.',
    shortcutOrInsight: 'Tally Sync Architecture: XML packets over secure HTTP with deterministic master conflict resolution policies.',
    difficulty: 'Hard'
  }
];

// Combine Part 2A Mock Tests
export const TIER2_MOCK_TESTS_PART2A: FaangMockTest[] = [
  {
    id: 'mock-java-programming-tier2',
    title: 'Spring Boot 3, Reactive Systems & JVM Tuning (Tier-2 Assessment)',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • Project Reactor, GraalVM AOT, ZGC Load Barriers & Redisson Watchdog',
    category: 'TECHNICAL CORE',
    companyTier: 'Tier-1 Enterprise Cloud Architecture & FinTech',
    companies: ['Netflix', 'Amazon', 'Oracle', 'Red Hat Quarkus'],
    scheduledDate: 'Tier-2 Assessment • Deep Systems Crucible (Java Enterprise)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'java-reactive-architect',
    badgeRewardName: 'Enterprise Java & Reactive Microservices Architect',
    badgeIcon: '☕',
    badgeGradient: 'from-amber-700 via-orange-900 to-slate-950',
    certificateTitle: 'Official Java Enterprise Cloud & Reactive Architecture Credential',
    description: 'An elite Java and cloud systems assessment probing Spring WebFlux Netty event loop starvation, ZGC colored pointers with load barriers, Saga distributed microservice transactions, GraalVM Closed-World AOT compilation, Virtual Threads (Project Loom) unmounting, Redisson distributed lock watchdogs, and LMAX Disruptor cache-line padding.',
    syllabusHighlights: [
      'Project Reactor: Avoiding Netty EventLoop Thread Starvation',
      'ZGC Concurrency: Colored Pointers & Sub-Millisecond Relocation',
      'Saga Pattern: Choreographed Compensation Rollback Workflows',
      'GraalVM Native Image: Closed-World Reflection Reachability Metadata',
      'Virtual Threads (Loom): Unmounting Carrier Threads on Blocking I/O',
      'Redisson Distributed Locks: Lock Watchdog Lease Auto-Extensions',
      'LMAX Disruptor: Cache-Line Padding & Lock-Free Atomic Sequences',
      'Java Memory Model (JMM): Volatile Happens-Before Transitivity'
    ],
    questions: JAVA_TIER2_QUESTIONS
  },
  {
    id: 'mock-python-programming-tier2',
    title: 'Python Production Internals & High-Throughput Engineering (Tier-2 Assessment)',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • Asyncio UVloop, PEP 3118 Memoryview, Ray Clusters & Cython nogil',
    category: 'TECHNICAL CORE',
    companyTier: 'Tier-1 AI Infrastructure & High-Scale Python Services',
    companies: ['OpenAI', 'Meta Instagram', 'FastAPI Core', 'Anyscale'],
    scheduledDate: 'Tier-2 Assessment • Deep Systems Crucible (Python Internals)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'python-throughput-architect',
    badgeRewardName: 'Python Distributed Systems & Internals Master',
    badgeIcon: '🐍',
    badgeGradient: 'from-emerald-800 via-teal-950 to-slate-950',
    certificateTitle: 'Official Python Production Internals & High-Throughput Credential',
    description: 'A deep Python systems examination covering uvloop C-level event loop acceleration, PEP 3118 zero-copy memoryviews, Ray Task vs Actor distributed state machines, CPython generational GC disabling in pre-forked workers, custom Metaclass __new__ attribute rewriting, Cython nogil OpenMP multi-core computing, and __slots__ memory optimizations.',
    syllabusHighlights: [
      'Asyncio UVloop: Replacing Python Event Loops with libuv C-Engines',
      'Zero-Copy Slicing: PEP 3118 memoryview & Buffer Protocol',
      'Ray Distributed AI: Remote Tasks vs Stateful Actor Processes',
      'CPython GC & Linux Copy-on-Write (CoW) Multi-Worker Optimization',
      'Metaclasses: Dynamic Class Generation via __new__ and __init__',
      'Cython High Performance: with nogil Multithreading & OpenMP prange',
      'Attribute Lookup Order: Data Descriptors vs Instance __dict__',
      'Memory Optimization: Eliminating Instance __dict__ with __slots__'
    ],
    questions: PYTHON_TIER2_QUESTIONS
  },
  {
    id: 'mock-dsa-algorithms-tier2',
    title: 'Advanced Competitive Programming & Flow Networks Crucible (Tier-2 Assessment)',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • Dinic Max Flow, Lazy Segment Trees, Treaps & Centroid Decomposition',
    category: 'TECHNICAL CORE',
    companyTier: 'Tier-1 Algorithmic Crucible & Competitive Programming',
    companies: ['Google Search', 'Meta Hackercup', 'Two Sigma', 'Codeforces Div 1'],
    scheduledDate: 'Tier-2 Assessment • Deep Systems Crucible (Advanced Algorithms)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'dsa-grandmaster',
    badgeRewardName: 'Algorithms & Flow Networks Grandmaster',
    badgeIcon: '🧠',
    badgeGradient: 'from-purple-800 via-indigo-950 to-slate-950',
    certificateTitle: 'Official Advanced Algorithms & Competitive Programming Credential',
    description: 'An extraordinary algorithmic crucible evaluating Dinic\'s algorithm O(E * sqrt(V)) unit network bounds, Lazy Propagation Segment Trees, Treap BST/Heap rotation mechanics, Tree Centroid Decomposition divide-and-conquer, Aho-Corasick linear multi-pattern matching, Convex Hull Trick lower envelope optimizations, and Heavy-Light Decomposition path logarithmic bounds.',
    syllabusHighlights: [
      'Dinic Network Flow: O(E * sqrt(V)) Unit Network Complexity Bounds',
      'Segment Trees with Lazy Propagation: Postponed Range Updates',
      'Treaps: BST Key Ordering + Random Heap Priority Rotations',
      'Centroid Decomposition: Subtree Size Halving & O(N log N) Paths',
      'Aho-Corasick Automaton: Failure Links & O(N) Multi-Pattern Searches',
      'Convex Hull Trick & Li Chao Tree Dynamic Programming Optimizations',
      'Disjoint Set Union (DSU): O(alpha(N)) Inverse Ackermann Bounds',
      'Heavy-Light Decomposition (HLD): Logarithmic Heavy Path Chain Hops'
    ],
    questions: DSA_TIER2_QUESTIONS
  },
  {
    id: 'mock-tally-prime-tier2',
    title: 'Tally Prime Advanced Statutory Taxation & Payroll Master (Tier-2 Assessment)',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • Section 206AA TDS, EPFO Wage Ceilings, Multi-Currency & E-Invoice IRN',
    category: 'ENTERPRISE DOMAINS',
    companyTier: 'Tier-1 Corporate Accounting & Big-4 Statutory Audit',
    companies: ['Ernst & Young', 'Deloitte', 'PwC', 'KPMG Indirect Tax'],
    scheduledDate: 'Tier-2 Assessment • Deep Systems Crucible (Corporate Accounting)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'tally-prime-taxation-expert',
    badgeRewardName: 'Tally Prime Statutory Taxation & Payroll Expert',
    badgeIcon: '📑',
    badgeGradient: 'from-emerald-700 via-green-950 to-slate-950',
    certificateTitle: 'Official Tally Prime Advanced Taxation & Corporate Payroll Credential',
    description: 'A master statutory corporate accounting assessment probing Section 206AA TDS punitive rates on invalid PANs, EPFO ₹15,000 statutory wage ceilings with EPS/EPF allocations, multi-currency Forex Gain/Loss journal entries, E-Invoice IRP 64-character IRN and QR code generation, Job Costing project analysis, Section 206C(1H) TCS thresholds, and MCA-mandated immutable Edit Log audit trails.',
    syllabusHighlights: [
      'Section 206AA TDS Enforcement: 20% Mandatory Punitive Rates',
      'Corporate Payroll: EPFO ₹15,000 Wage Ceiling & EPS 8.33% Capping',
      'Multi-Currency Export Accounting & Forex Gain/Loss Journal Vouchers',
      'Connected GST Services: E-Invoice IRP 64-Character IRN & Signed QR Codes',
      'Job Costing Architecture: Cost Centers + Multi-Site Godowns',
      'Section 206C(1H) TCS: ₹10 Cr Turnover & ₹50 Lakhs Buyer Thresholds',
      'Manufacturing Bill of Materials (BOM) & Finished Goods Costing',
      'MCA Statutory Compliance: Immutable Edit Log Audit Trail Tracking'
    ],
    questions: TALLY_TIER2_QUESTIONS
  }
];
