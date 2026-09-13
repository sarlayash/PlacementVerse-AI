import { FaangMockTest, FaangQuestion } from '../types';

// ============================================================================
// 6. C & LOW-LEVEL SYSTEMS PROGRAMMING (TIER-3 / ELITE) (10 MCQs)
// Linux eBPF, Lock-Free Concurrency, SIMD Vectorization, Cache Line False Sharing & Linker Internals
// ============================================================================
export const C_TIER3_QUESTIONS: FaangQuestion[] = [
  {
    id: 'c3-q1',
    testId: 'mock-c-programming-tier3',
    section: 'Cache Coherency & Concurrency',
    companyTag: 'Intel Architecture Labs / Jane Street Systems',
    question: 'In multi-threaded C systems programming, what is "False Sharing", and how is it eliminated in high-throughput lock-free ring buffers?',
    options: [
      'Two threads running on separate CPU cores concurrently modify independent variables that happen to reside on the same L1/L2 cache line (typically 64 bytes), causing the MESI cache coherency protocol to repeatedly invalidate and bounce the line; eliminated by padding variables with `alignas(64)` or `__attribute__((aligned(64)))`',
      'Two threads share a pointer that points to unallocated stack memory',
      'The compiler generates duplicate symbol tables during the linking phase',
      'Threads read from uninitialized registers when switching hardware interrupts'
    ],
    correctIndex: 0,
    explanation: 'Modern CPUs maintain cache coherency at the granularity of cache lines (usually 64 bytes) using protocols like MESI/MOESI. When Thread A on Core 0 modifies variable X and Thread B on Core 1 modifies variable Y, if X and Y share a 64-byte line, each write invalidates the other core\'s cache line, causing devastating cache line bouncing. Padding data structures to 64-byte boundaries ensures each thread\'s frequently written fields occupy distinct cache lines.',
    shortcutOrInsight: 'False Sharing: Independent variables on the same 64-byte cache line cause MESI bouncing. Fix: `alignas(64)`.',
    difficulty: 'Very Hard'
  },
  {
    id: 'c3-q2',
    testId: 'mock-c-programming-tier3',
    section: 'Compiler Optimization & Strict Aliasing',
    companyTag: 'GCC / Clang Compiler Team',
    question: 'Under C99/C11 ISO standards, what does the "Strict Aliasing Rule" specify, and why does dereferencing `float *f = (float*)&my_uint32; *f = 1.0f;` invoke Undefined Behavior (UB)?',
    options: [
      'The compiler assumes pointers of different types (excluding `char*`) never point to the same memory location, permitting aggressive instruction reordering and register caching; casting a pointer across incompatible types violates this and causes optimizer miscompilations (correct idiom: `memcpy` or union with compiler support)',
      'Floats and integers use different byte endians on modern CPUs',
      'The OS kernel aborts any program that casts pointers to floats',
      'Strict aliasing requires all C variables to be defined in header files'
    ],
    correctIndex: 0,
    explanation: 'ISO C strict aliasing allows the optimizer to assume that writes through a `float*` cannot change the value read through a `uint32_t*`. If code casts between these pointers, the compiler might reorder the reads/writes or assume a cached register value is still valid, producing wrong results under `-O2` or `-O3`. The safe, standard-compliant way to perform type punning in C is `memcpy(&f, &u, sizeof(f))`, which compilers optimize to a no-op register move.',
    shortcutOrInsight: 'Strict Aliasing: Compilers assume distinct type pointers never alias. Violating this with type punning breaks under -O3. Use `memcpy`.',
    difficulty: 'Very Hard'
  },
  {
    id: 'c3-q3',
    testId: 'mock-c-programming-tier3',
    section: 'SIMD Intrinsics & Vectorization',
    companyTag: 'NVIDIA Driver Core / Citadel Low-Latency',
    question: 'Given an array of single-precision floating point numbers, how does AVX2 SIMD intrinsic instruction `_mm256_fmadd_ps(a, b, c)` improve both performance and numerical accuracy?',
    options: [
      'It performs fused multiply-add `(a * b) + c` simultaneously across eight 32-bit float lanes in a single 256-bit register with a single rounding step instead of two separate roundings, increasing precision and doubling FPU throughput',
      'It runs the calculation on a remote GPU server over PCIe',
      'It rounds every floating point number to the nearest prime integer',
      'It executes in software emulation inside the Linux kernel'
    ],
    correctIndex: 0,
    explanation: 'AVX2/FMA registers are 256 bits wide, holding 8 single-precision floats. `_mm256_fmadd_ps` computes `(a * b) + c` in a single CPU cycle across all 8 lanes. Crucially, Fused Multiply-Add (FMA) does not round the intermediate multiplication before adding `c`, which eliminates one rounding error, providing higher mathematical precision alongside 8x parallel hardware throughput.',
    shortcutOrInsight: 'FMA Advantage: Single instruction computes 8 floats simultaneously with 1 rounding operation instead of 2.',
    difficulty: 'Hard'
  },
  {
    id: 'c3-q4',
    testId: 'mock-c-programming-tier3',
    section: 'Memory Allocators & Heap Internals',
    companyTag: 'Jemalloc / Meta Systems Infrastructure',
    question: 'Why do high-concurrency memory allocators (e.g. jemalloc, tcmalloc) avoid using a single global `pthread_mutex` around the `malloc()` heap and instead implement thread-local arenas (Thread-Caching)?',
    options: [
      'A global mutex causes catastrophic lock contention across dozens of CPU cores; thread-local arenas allow each thread to satisfy allocations from small object bin caches lock-free without central locks',
      'Thread-local arenas eliminate the operating system page table',
      '`pthread_mutex` cannot be linked into C applications compiled with GCC',
      'Thread-local arenas prevent all memory leaks automatically'
    ],
    correctIndex: 0,
    explanation: 'In multi-core systems, thousands of threads calling `malloc()` and `free()` concurrently would spend 90% of their execution time stalled waiting for a single heap lock. Modern allocators assign threads to independent memory arenas and maintain thread-local caches (tcaches). Small allocations are serviced from thread-local bins without atomic instructions or locks.',
    shortcutOrInsight: 'Jemalloc Architecture: Thread-local size-class bins allow small allocations to complete lock-free with zero cross-core contention.',
    difficulty: 'Hard'
  },
  {
    id: 'c3-q5',
    testId: 'mock-c-programming-tier3',
    section: 'Linux eBPF & Kernel Verifier',
    companyTag: 'Isovalent / Cloudflare Kernel Engineering',
    question: 'What is the primary function of the Linux kernel eBPF Verifier when an engineer loads a C eBPF tracing program via the `bpf()` syscall?',
    options: [
      'It performs static analysis on the eBPF bytecode to prove that the program contains no unbounded loops, never dereferences dangling or out-of-bounds pointers, initializes all register states, and will reliably terminate without hanging or crashing the kernel',
      'It compiles the C code directly into Python scripts',
      'It checks if the user has paid for an enterprise Linux support license',
      'It transmits the source code to an external cloud database for review'
    ],
    correctIndex: 0,
    explanation: 'The kernel verifier simulates all possible execution paths of the eBPF program before loading it into kernel memory. It ensures: (1) The program terminates (no infinite loops, bounded loop iterations), (2) Memory access is strictly within allowed packet/stack bounds, (3) Registers are initialized before use, and (4) It does not access restricted kernel structures.',
    shortcutOrInsight: 'eBPF Verifier Invariant: Proves termination, type safety, and bounded memory access before bytecode execution inside the kernel.',
    difficulty: 'Hard'
  },
  {
    id: 'c3-q6',
    testId: 'mock-c-programming-tier3',
    section: 'Atomic Memory Orders & Acquire/Release',
    companyTag: 'Apple Silicon Kernel / ARM Architecture',
    question: 'In C11 `<stdatomic.h>`, when publishing a message payload pointer `data` to a consumer thread using an atomic flag `ready`, which pair of memory orders is minimal and mathematically sufficient on weakly-ordered architectures (such as ARM64)?',
    options: [
      'Producer: `atomic_store_explicit(&ready, 1, memory_order_release)`; Consumer: `atomic_load_explicit(&ready, memory_order_acquire)`',
      'Producer: `memory_order_relaxed`; Consumer: `memory_order_relaxed`',
      'Producer: `memory_order_consume`; Consumer: `memory_order_seq_cst`',
      'Atomic memory orders are only supported in C++, not in C'
    ],
    correctIndex: 0,
    explanation: 'On weakly ordered architectures (ARM, POWER), CPU cores and compiler optimizers reorder memory operations. `memory_order_release` prevents prior writes (like initializing `data`) from being reordered AFTER the store to `ready`. `memory_order_acquire` prevents subsequent reads (reading `data`) from being reordered BEFORE the load from `ready`. This creates a synchronized-with relationship without the heavy bus-locking overhead of `memory_order_seq_cst`.',
    shortcutOrInsight: 'Acquire-Release Pair: Release ensures prior writes are visible; Acquire ensures subsequent reads see those writes. Zero unnecessary fences.',
    difficulty: 'Very Hard'
  },
  {
    id: 'c3-q7',
    testId: 'mock-c-programming-tier3',
    section: 'Linker Symbols & ELF Relocation',
    companyTag: 'Red Hat Linux Core Tools',
    question: 'In an ELF (Executable and Linkable Format) binary, what is the difference between the Global Offset Table (GOT) and the Procedure Linkage Table (PLT) in Position Independent Executables (PIE)?',
    options: [
      'The PLT contains small trampoline stubs that jump to addresses resolved dynamically by the linker; the GOT is a table of absolute addresses (data pointers and function targets) populated by the dynamic linker (`ld-linux.so`) at load/runtime, enabling position independence without modifying code pages',
      'The GOT stores function names in plain text while the PLT encrypts them',
      'The PLT is stored on disk while the GOT is created in CPU registers',
      'The GOT is only used on 32-bit Windows binaries'
    ],
    correctIndex: 0,
    explanation: 'Position Independent Executables (PIE) must run at any random virtual address without code rewriting. When calling a shared library function (e.g. `printf`), code calls a stub in the PLT (read-only executable code). The PLT jumps through the GOT (read-write data table). On the first call, the dynamic linker resolves the function\'s actual virtual address and writes it into the GOT entry for subsequent direct calls.',
    shortcutOrInsight: 'ELF Dynamic Linking: PLT (Code Trampoline) -> GOT (Pointer Table). The dynamic linker updates GOT at runtime for ASLR compatibility.',
    difficulty: 'Hard'
  },
  {
    id: 'c3-q8',
    testId: 'mock-c-programming-tier3',
    section: 'Signals & Reentrancy',
    companyTag: 'Linux Kernel Documentation Team',
    question: 'Why is calling `printf()` or `malloc()` strictly forbidden inside a POSIX signal handler in C?',
    options: [
      'Both functions are non-reentrant: they acquire internal locks and manipulate global heap data structures; if a signal interrupts a thread that already holds that lock, invoking them inside the handler causes an unrecoverable self-deadlock',
      '`printf()` requires root user permissions that signals do not possess',
      'Signals only support sending integers to stderr',
      'Operating systems crash if signals execute for more than 1 nanosecond'
    ],
    correctIndex: 0,
    explanation: 'POSIX specifies a limited list of "async-signal-safe" functions (e.g. `write()`, `_exit()`). `malloc()` and `printf()` maintain internal state protected by mutexes. If a thread is interrupted by a signal while holding the heap lock, calling `malloc()` inside the signal handler tries to acquire the same lock, resulting in an immediate and permanent deadlock.',
    shortcutOrInsight: 'Signal Safety: Never call malloc() or printf() in signal handlers; they use non-reentrant locks and will self-deadlock. Use `write()` instead.',
    difficulty: 'Medium'
  },
  {
    id: 'c3-q9',
    testId: 'mock-c-programming-tier3',
    section: 'VFS & Direct I/O',
    companyTag: 'ScyllaDB Core Engineering',
    question: 'When opening a file with `O_DIRECT` in Linux C systems programming, what strict hardware alignment constraints must the application satisfy when calling `write()` or `read()`?',
    options: [
      'The user-space memory buffer address, the file offset, and the transfer length must all be integer multiples of the underlying block device\'s physical or logical sector size (typically 512 or 4096 bytes)',
      'The buffer must be allocated on the stack and cannot exceed 100 bytes',
      'The file name must be written in all-caps uppercase characters',
      'Direct I/O requires disabling hardware interrupts on the storage controller'
    ],
    correctIndex: 0,
    explanation: '`O_DIRECT` bypasses the Linux page cache, initiating direct DMA (Direct Memory Access) transfers between user memory and the NVMe/disk controller. Because hardware controllers operate in discrete sector blocks, the memory buffer address (allocated via `posix_memalign`), the file offset, and the read/write byte count must all be aligned to the block size (512 or 4096 bytes); otherwise, `read()` / `write()` returns `EINVAL`.',
    shortcutOrInsight: 'O_DIRECT Alignment: Buffer address, file offset, and transfer size must all be strictly aligned to sector boundaries (typically 4096 bytes).',
    difficulty: 'Hard'
  },
  {
    id: 'c3-q10',
    testId: 'mock-c-programming-tier3',
    section: 'Variable Length Arrays (VLAs) & Security',
    companyTag: 'Linux Kernel Hardening Project (KSPP)',
    question: 'Why did the Linux Kernel Project completely eradicate Variable Length Arrays (VLAs, e.g., `int arr[n];`) from the entire kernel source tree?',
    options: [
      'VLAs generate dynamic stack adjustments (`sub rsp, rax`) without compiler bounds checks, introducing severe stack-clash security vulnerabilities and potential kernel stack overflows in limited 8KB/16KB kernel stack frames',
      'VLAs cannot be compiled by GCC on x86 architectures',
      'VLAs cause memory leaks because stack frames cannot be popped',
      'VLAs are only allowed in C++ and not part of the C99 standard'
    ],
    correctIndex: 0,
    explanation: 'In the Linux kernel, each thread has a tiny, fixed-size stack (typically 8KB on 32-bit and 16KB on 64-bit). A VLA whose size depends on runtime parameters can easily exhaust this space, smashing through the stack guard page into adjacent kernel structures. Furthermore, dynamic stack pointer arithmetic impedes compiler optimizations and security canary instrumentation.',
    shortcutOrInsight: 'VLA Elimination: Dynamic stack allocations in kernel space cause silent stack overflows and security vulnerabilities. Use fixed buffers or kmalloc.',
    difficulty: 'Medium'
  }
];

// ============================================================================
// 7. C++ & HIGH-PERFORMANCE LOW-LATENCY SYSTEMS (TIER-3 / ELITE) (10 MCQs)
// C++20/23 Concepts, Coroutines, Sub-Microsecond Lockless Queues, SFINAE to Requires & Cache-Warm Order Books
// ============================================================================
export const CPP_TIER3_QUESTIONS: FaangQuestion[] = [
  {
    id: 'cpp3-q1',
    testId: 'mock-cpp-programming-tier3',
    section: 'Low-Latency Trading Architecture',
    companyTag: 'Citadel Securities / Jump Trading',
    question: 'In ultra-low latency C++ electronic trading engines (sub-microsecond order processing), why are dynamic polymorphic virtual function calls (`virtual void on_order(...)`) systematically eliminated from the hot path?',
    options: [
      'Virtual calls require vtable pointer dereferencing which creates indirect branches that thwart CPU branch predictors and cause CPU instruction cache misses; replaced at compile-time by CRTP (Curiously Recurring Template Pattern) or C++20 concepts',
      'Virtual functions are not supported when compiling with `-O3`',
      'Vtables consume 50 gigabytes of RAM in C++20',
      'Virtual functions cause the operating system to context-switch to kernel space'
    ],
    correctIndex: 0,
    explanation: 'A virtual function call involves: (1) loading the object\'s vptr, (2) indexing into the vtable array, and (3) executing an indirect call (`call [rax+offset]`). This prevents inlining, flushes CPU speculative execution pipelines on branch mispredicts, and dirties the instruction cache. HFT systems use static polymorphism (CRTP or C++20 concepts), enabling full function inlining into a single contiguous block of assembly.',
    shortcutOrInsight: 'Zero-Cost Static Polymorphism: Eliminate indirect vtable calls in hot paths using CRTP or Concepts for 100% inlined assembly.',
    difficulty: 'Very Hard'
  },
  {
    id: 'cpp3-q2',
    testId: 'mock-cpp-programming-tier3',
    section: 'C++20 Coroutines Architecture',
    companyTag: 'Microsoft DirectX / Meta Folly Async',
    question: 'What are the three core customizable components required by the C++20 Coroutines specification for a custom asynchronous type `MyTask<T>`?',
    options: [
      'A `promise_type` (handling return values, exceptions, and initial/final suspensions), an `Awaiter` (implementing `await_ready`, `await_suspend`, and `await_resume`), and a coroutine handle (`std::coroutine_handle<promise_type>`)',
      'A thread pool, a mutex, and a condition variable',
      'A class inheriting from `std::thread` and implementing `run()`',
      'A lambda expression returning `std::future<T>`'
    ],
    correctIndex: 0,
    explanation: 'C++20 coroutines are stackless and compiler-synthesized. The compiler looks for `MyTask::promise_type`, which dictates how the coroutine starts (`initial_suspend`), returns (`return_value`/`return_void`), and halts. Any `co_await` operand must provide an Awaiter interface (`await_ready`, `await_suspend`, `await_resume`). The coroutine frame is manipulated via `std::coroutine_handle`.',
    shortcutOrInsight: 'C++20 Coroutine Triad: `promise_type` (lifecycle) + `Awaiter` (suspension protocol) + `coroutine_handle` (resumption handle).',
    difficulty: 'Very Hard'
  },
  {
    id: 'cpp3-q3',
    testId: 'mock-cpp-programming-tier3',
    section: 'C++20 Concepts vs SFINAE',
    companyTag: 'Bloomberg Quant Platform',
    question: 'How does C++20 `requires` clauses and Concepts fundamentally improve over C++11 `std::enable_if` SFINAE templates for template metaprogramming?',
    options: [
      'Concepts are evaluated directly by the compiler frontend as first-class boolean constraints, providing readable compiler diagnostics, short-circuit constraint subsumption ordering, and orders-of-magnitude faster build times compared to recursively instantiating SFINAE template types',
      'Concepts allow C++ code to run in browser JavaScript engines',
      'Concepts convert all templates into dynamic runtime pointers',
      'SFINAE is prohibited in all modern C++ compilers'
    ],
    correctIndex: 0,
    explanation: 'SFINAE (Substitution Failure Is Not An Error) using `std::enable_if` abuses template type deduction to remove overloads, resulting in unreadable 10-page compiler error dumps and slow compile times due to AST template bloating. C++20 Concepts make semantic requirements explicit (`template <typename T> requires std::integral<T>`), support natural overloading based on specificity (subsumption rules), and produce concise compiler error messages.',
    shortcutOrInsight: 'Concepts over SFINAE: Clear compilation diagnostics, mathematical constraint subsumption, and drastically faster build times.',
    difficulty: 'Hard'
  },
  {
    id: 'cpp3-q4',
    testId: 'mock-cpp-programming-tier3',
    section: 'Lock-Free Queues & Circular Buffers',
    companyTag: 'Two Sigma / DRW Trading',
    question: 'In a single-producer single-consumer (SPSC) lock-free ring buffer in C++, why is it safe to use `memory_order_relaxed` when updating the producer\'s local write index, while `memory_order_release` is strictly required when publishing it to the consumer?',
    options: [
      'The producer is the sole thread that writes to the write index, so local operations have no inter-thread data races; `memory_order_release` is necessary when publishing so the consumer\'s acquire load sees all buffer item writes that preceded the index update',
      'The consumer automatically locks the CPU bus during reads',
      '`memory_order_relaxed` is forbidden on multi-socket servers',
      'The write index is stored in a hardware register that cannot be corrupted'
    ],
    correctIndex: 0,
    explanation: 'In SPSC queues, only 1 thread modifies the write pointer. Therefore, private arithmetic on the index cannot race. However, before the producer makes the new write index visible to the consumer, it must ensure that the actual payload data written into the buffer slots is committed to memory. A store with `memory_order_release` establishes the necessary synchronization barrier.',
    shortcutOrInsight: 'SPSC Queues: Relaxed for thread-private operations; Release store when publishing indices across thread boundaries.',
    difficulty: 'Very Hard'
  },
  {
    id: 'cpp3-q5',
    testId: 'mock-cpp-programming-tier3',
    section: 'Move Semantics & RVO / NRVO',
    companyTag: 'Apple CoreOS / LLVM Engineering',
    question: 'Under C++17 Guaranteed Copy Elision (P0135R1) and Named Return Value Optimization (NRVO), what is the performance pitfall of explicitly writing `return std::move(my_local_object);` at the end of a function?',
    options: [
      'It forcibly turns the object into an rvalue reference, disabling Named Return Value Optimization (NRVO) and forcing a move constructor call instead of constructing the object directly in-place in the caller\'s stack frame (zero-copy)',
      'It causes a compilation error because `std::move` cannot be used with local variables',
      'It automatically deallocates the object before the caller receives it',
      'It converts the object to a heap allocation'
    ],
    correctIndex: 0,
    explanation: 'With NRVO, modern compilers construct the local variable directly inside the memory storage provided by the caller\'s stack frame (zero copy, zero move). When you explicitly write `return std::move(x);`, you prevent the compiler from performing NRVO because the return type is an rvalue expression rather than a simple identifier, forcing an unnecessary move construction.',
    shortcutOrInsight: 'Return Value Trap: Never write `return std::move(local);`! It pessimizes NRVO into a move construction.',
    difficulty: 'Hard'
  },
  {
    id: 'cpp3-q6',
    testId: 'mock-cpp-programming-tier3',
    section: 'C++23 `std::expected` & Error Handling',
    companyTag: 'Tesla Autopilot Systems',
    question: 'Why do safety-critical, real-time autonomous systems (e.g. automotive avionics) prefer `std::expected<T, E>` over traditional C++ exceptions (`try / catch / throw`)?',
    options: [
      'Exceptions introduce non-deterministic execution times due to stack unwinding table lookups and can trigger dynamic memory allocation (`malloc`) during exception creation; `std::expected` encapsulates success or error in a deterministic, cache-local stack union',
      '`std::expected` automatically retries failed network calls',
      'C++ exceptions are disabled in all Linux kernels',
      '`std::expected` eliminates the need to check error codes'
    ],
    correctIndex: 0,
    explanation: 'In real-time safety-critical software (MISRA C++ / ISO 26262), all execution paths must have deterministic, bounded execution times. Throwing an exception requires the runtime to traverse DWARF unwind tables and potentially allocate memory for the exception object. `std::expected<T, E>` stores either `T` or `E` in an in-place variant union, enabling fast, deterministic monadic error handling (`and_then`, `or_else`).',
    shortcutOrInsight: 'Deterministic Safety: `std::expected` provides monadic error propagation with zero heap allocations and bounded O(1) runtime.',
    difficulty: 'Hard'
  },
  {
    id: 'cpp3-q7',
    testId: 'mock-cpp-programming-tier3',
    section: 'Memory Model & Dekker Algorithm',
    companyTag: 'C++ Standards Committee (WG21)',
    question: 'On an x86_64 CPU (which enforces TSO - Total Store Order), which specific memory access reordering is physically permitted by hardware and requires an explicit `mfence` or `lock` prefix to prevent?',
    options: [
      'Store-Load reordering: A CPU core can buffer a store in its private Store Buffer while simultaneously executing a subsequent load from a different memory location that hits its L1 cache',
      'Store-Store reordering: Stores can be written out of sequence to RAM',
      'Load-Load reordering: Earlier loads can execute after later loads',
      'Load-Store reordering: A load can be delayed past a subsequent store'
    ],
    correctIndex: 0,
    explanation: 'x86_64 hardware provides strong memory consistency (TSO): it never reorders Load-Load, Load-Store, or Store-Store operations. However, to maximize instruction pipelining, modern x86 CPUs feature store buffers. If a core executes a Store followed by a Load from a different address, the load can complete from cache before the buffered store drains to the L1 cache. This Store-Load reordering breaks classic Dekker/Peterson lock algorithms without a memory fence.',
    shortcutOrInsight: 'x86 Hardware Reordering: The only hardware reordering permitted on x86 is Store-Load (due to the FIFO store buffer).',
    difficulty: 'Very Hard'
  },
  {
    id: 'cpp3-q8',
    testId: 'mock-cpp-programming-tier3',
    section: 'Custom Allocators & PMR (Polymorphic Memory Resources)',
    companyTag: 'Electronic Arts / Frostbite Engine',
    question: 'In game engines and low-latency systems, how does C++17 `std::pmr::monotonic_buffer_resource` accelerate container allocations (`std::pmr::vector`)?',
    options: [
      'It satisfies allocations by incrementing an offset pointer within a pre-allocated contiguous memory buffer (bump-pointer allocation) in O(1) time without individual tracking, and frees the entire buffer all at once upon destruction',
      'It compresses memory vectors using zlib compression in the background',
      'It offloads container memory to virtual cloud instances',
      'It converts vectors into linked lists on the stack'
    ],
    correctIndex: 0,
    explanation: '`std::pmr::monotonic_buffer_resource` is a fast bump-pointer (arena) allocator. Individual calls to `allocate()` simply increment an internal pointer within a stack or pre-reserved memory chunk, taking ~2-3 CPU instructions with zero locking. Deallocations are no-ops; the entire block is reclaimed simultaneously when the arena is destroyed at the end of the game frame.',
    shortcutOrInsight: 'PMR Arena Allocator: Bump-pointer allocation takes O(1) single-cycle pointer increments; bulk deallocation reclaims the entire frame.',
    difficulty: 'Hard'
  },
  {
    id: 'cpp3-q9',
    testId: 'mock-cpp-programming-tier3',
    section: 'Constexpr Metaprogramming & Compile-Time Evaluation',
    companyTag: 'Google DeepMind Systems',
    question: 'What is the primary capability added by C++20 `consteval` (immediate functions) compared to standard `constexpr` functions?',
    options: [
      '`consteval` strictly mandates that every invocation of the function MUST produce a compile-time constant expression; if it cannot be evaluated at compile time, the compiler issues a compilation error, eliminating accidental fallback to runtime execution',
      '`consteval` compiles code exclusively into GPU shaders',
      '`consteval` allows dynamic heap allocations that persist forever in the operating system',
      '`consteval` disables all compiler optimizations for that function'
    ],
    correctIndex: 0,
    explanation: 'A `constexpr` function CAN be evaluated at compile-time, but if called with non-constant runtime arguments, the compiler silently generates a standard runtime function call. `consteval` guarantees that the function is an "immediate function": it MUST evaluate at compile time. If any invocation cannot be resolved at compile time, compilation fails immediately.',
    shortcutOrInsight: 'consteval vs constexpr: `consteval` guarantees 100% compile-time execution; zero possibility of runtime fallback.',
    difficulty: 'Medium'
  },
  {
    id: 'cpp3-q10',
    testId: 'mock-cpp-programming-tier3',
    section: 'Type Erasure & Performance',
    companyTag: 'Adobe Photoshop Core Architecture',
    question: 'How does a high-performance type erasure pattern (such as Sean Parent\'s Concept-Model idiom or `std::function` small-buffer optimization) avoid heap allocations for small callable objects?',
    options: [
      'By maintaining an internal fixed-size storage buffer (typically 16-32 bytes, Small Buffer Optimization / SBO) and placement-newing small functor objects directly inside that buffer, falling back to dynamic `malloc` only when the object size exceeds the buffer threshold',
      'By compressing the machine code of the lambda using gzip',
      'By running all function calls inside a Linux virtual machine',
      'By converting all class members into static global variables'
    ],
    correctIndex: 0,
    explanation: 'Small Buffer Optimization (SBO) reserves a small internal byte array inside the wrapper object. If the erased type\'s size and alignment fit within the buffer (e.g. standard function pointers, simple lambdas capturing 1-2 pointers), it uses placement-new directly into the buffer, completely avoiding the expensive heap allocation and cache miss of `new`.',
    shortcutOrInsight: 'SBO in Type Erasure: In-place buffer avoids heap allocation for small objects, preserving cache locality.',
    difficulty: 'Hard'
  }
];

// ============================================================================
// 8. JAVA & JVM ENTERPRISE ARCHITECTURE (TIER-3 / ELITE) (10 MCQs)
// Project Loom Virtual Threads, Low-Pause ZGC Internals, GraalVM Native Image, JIT JFR Profiling & Unsafe/Foreign Memory
// ============================================================================
export const JAVA_TIER3_QUESTIONS: FaangQuestion[] = [
  {
    id: 'java3-q1',
    testId: 'mock-java-programming-tier3',
    section: 'Project Loom & Virtual Threads',
    companyTag: 'Netflix Streaming Platform / Spring Cloud Team',
    question: 'In Java 21 Project Loom, what constitutes "Thread Pinning", and how does it degrade application scalability when using virtual threads?',
    options: [
      'A virtual thread cannot unmount from its carrier platform thread when blocked on I/O if it is executing inside a `synchronized` block/method or native JNI call, temporarily exhausting the ForkJoinPool carrier thread workers',
      'A virtual thread is permanently pinned to a specific CPU core using taskset',
      'Thread pinning occurs when Java code uses `volatile` variables',
      'Thread pinning is an intentional feature that speeds up database transactions'
    ],
    correctIndex: 0,
    explanation: 'Virtual threads mount onto carrier platform threads. When a virtual thread performs blocking I/O (socket read), Loom unmounts it so the carrier thread can execute other virtual threads. However, if the blocking operation occurs inside a `synchronized` block or a native JNI frame, the virtual thread is "pinned" to the carrier thread, preventing the carrier thread from being released. The fix is replacing `synchronized` with `ReentrantLock`.',
    shortcutOrInsight: 'Loom Pinning: Synchronized blocks prevent virtual thread unmounting during blocking I/O. Use ReentrantLock instead.',
    difficulty: 'Very Hard'
  },
  {
    id: 'java3-q2',
    testId: 'mock-java-programming-tier3',
    section: 'ZGC & Low-Pause Garbage Collection',
    companyTag: 'Oracle Java Platform Group',
    question: 'How does the Generational Z Garbage Collector (ZGC) in modern JDKs maintain sub-millisecond stop-the-world (STW) pause times even across multi-terabyte heaps?',
    options: [
      'It performs all phase operations (marking, relocation, and pointer remapping) concurrently with application threads using Colored Pointers and Load Barriers, ensuring STW pauses only occur for brief root scanning phases (<1ms) independent of heap size',
      'It disables garbage collection completely and dumps old objects into swap memory',
      'It converts the Java heap into a static C-struct during application startup',
      'It runs exclusively on external GPU cards'
    ],
    correctIndex: 0,
    explanation: 'Traditional GCs pause application threads while relocating objects to update pointers. ZGC uses reference coloring (storing metadata bits inside the 64-bit object pointer itself) and Load Barriers. When an application thread reads an object reference pointing to a moved object, the JIT-injected load barrier intercepts the read, remaps the pointer in-flight, and updates the reference concurrently without stopping the world.',
    shortcutOrInsight: 'ZGC Secret: Colored pointers + JIT Load Barriers enable concurrent object relocation with sub-millisecond pauses.',
    difficulty: 'Very Hard'
  },
  {
    id: 'java3-q3',
    testId: 'mock-java-programming-tier3',
    section: 'GraalVM Native Image & Ahead-Of-Time (AOT)',
    companyTag: 'Quarkus / Red Hat Middleware',
    question: 'Why does deploying a Spring Boot 3 application as a GraalVM Native Image achieve 50ms startup times and 80% lower RSS memory, but break standard Java Dynamic Reflection unless explicitly configured?',
    options: [
      'GraalVM performs closed-world Ahead-Of-Time (AOT) compilation that strips away the JVM bytecode interpreter and dynamic classloader; any reflection, dynamic proxies, or serialization not declared in reflection-config.json metadata is pruned as dead code',
      'GraalVM converts Java bytecode into Python scripts that start faster',
      'GraalVM disables Spring dependency injection entirely',
      'Native images run without memory safety'
    ],
    correctIndex: 0,
    explanation: 'Standard HotSpot loads bytecodes dynamically at runtime, allowing arbitrary reflection. GraalVM Native Image utilizes a "Closed World Assumption": it analyzes all reachable code at build time and compiles it directly to machine code, stripping the interpreter, JIT compiler, and unused classes. Any reflection invoked at runtime on undeclared classes fails with `ClassNotFoundException` unless declared in reachability metadata.',
    shortcutOrInsight: 'Closed-World AOT: GraalVM strips unused code at build time. Dynamic reflection requires reachability JSON metadata.',
    difficulty: 'Hard'
  },
  {
    id: 'java3-q4',
    testId: 'mock-java-programming-tier3',
    section: 'Foreign Function & Memory API (FFM)',
    companyTag: 'Apache Arrow / Databricks Java Engine',
    question: 'How does Java 22\'s Foreign Function & Memory API (Project Panama, JEP 454) safely replace `sun.misc.Unsafe` for high-performance off-heap memory management?',
    options: [
      'It provides `MemorySegment` and `Arena` which offer spatial safety (strict boundary bounds-checking), temporal safety (deterministic deallocation with automatic prevention of use-after-free), and zero-cost off-heap access without invoking JNI overhead',
      'It stores all off-heap memory in browser cookies',
      'It disables garbage collection for the entire JVM instance',
      'It requires recompiling the Linux kernel before each JVM run'
    ],
    correctIndex: 0,
    explanation: '`sun.misc.Unsafe` gave raw pointer access but caused JVM crashes on out-of-bounds reads or use-after-free bugs. Panama\'s FFM API introduces `Arena` (managing lifecycle and deterministic lifetime) and `MemorySegment` (enforcing spatial boundaries, thread confinement, and automatic safety checks), allowing safe off-heap interop and direct C library invocations without slow JNI wrappers.',
    shortcutOrInsight: 'Project Panama FFM: Spatial and temporal safety for off-heap memory, replacing dangerous Unsafe and clunky JNI.',
    difficulty: 'Hard'
  },
  {
    id: 'java3-q5',
    testId: 'mock-java-programming-tier3',
    section: 'Java Memory Model (JMM) & Volatile Semantics',
    companyTag: 'Goldman Sachs Electronic Trading Platform',
    question: 'In the Java Memory Model (JSR-133), what hardware memory barriers (fences) are emitted by the HotSpot JIT compiler for a write to a `volatile` field on an x86 architecture?',
    options: [
      'A `StoreLoad` barrier (typically emitted as `lock addl [rsp], 0`) is placed immediately after the volatile write to prevent subsequent volatile/normal reads from being reordered with the volatile write',
      'A `LoadLoad` barrier is placed before every method call',
      'The JIT halts CPU execution for 10 milliseconds',
      'No barriers are ever needed because x86 has weak memory ordering'
    ],
    correctIndex: 0,
    explanation: 'Under JMM rules, a volatile write must be visible to all subsequent volatile reads across threads. On x86, StoreStore and LoadStore reorderings are impossible in hardware. However, x86 allows StoreLoad reordering (store buffer delay). Therefore, HotSpot emits a StoreLoad barrier (usually `lock addl` or `mfence`) right after the volatile store to drain the CPU store buffer before any subsequent load executes.',
    shortcutOrInsight: 'JMM on x86: Volatile write emits a StoreLoad barrier (`lock addl`) to prevent the store buffer from delaying writes past loads.',
    difficulty: 'Very Hard'
  },
  {
    id: 'java3-q6',
    testId: 'mock-java-programming-tier3',
    section: 'JIT Compiler Deoptimization & On-Stack Replacement',
    companyTag: 'Twitter VM Performance Team',
    question: 'What triggers the HotSpot C2 JIT compiler to "Deoptimize" compiled native machine code and fall back to the bytecode interpreter during execution?',
    options: [
      'An optimistic speculative assumption made during compilation (such as class hierarchy analysis assuming a method is monomorphic) is invalidated when a new class is loaded dynamically, or a branch profile is violated',
      'The CPU overheating beyond 80 degrees Celsius',
      'The application running for more than 24 hours continuously',
      'A garbage collection cycle collecting more than 100 objects'
    ],
    correctIndex: 0,
    explanation: 'C2 relies on optimistic profiling. For instance, if an interface has only one implementing class loaded, C2 inlines that method directly (Monomorphic Inlining). If the application dynamically loads a second implementation, that speculative assumption is violated. The JVM triggers a "deoptimization trap", transfers thread state back to the interpreter via On-Stack Replacement (OSR), and recompiles the method if needed.',
    shortcutOrInsight: 'JIT Deoptimization: Speculative assumptions (monomorphic calls) that get invalidated by class loading trigger immediate interpreter fallback.',
    difficulty: 'Hard'
  },
  {
    id: 'java3-q7',
    testId: 'mock-java-programming-tier3',
    section: 'High-Concurrency Ring Buffers',
    companyTag: 'LMAX Disruptor Architecture',
    question: 'How does the LMAX Disruptor high-throughput messaging framework achieve 10 million transactions per second in pure Java without using `java.util.concurrent.BlockingQueue`?',
    options: [
      'It uses a pre-allocated circular array with cache-line padded sequence counters, replaces locks with lock-free atomic compare-and-swap (CAS) memory barriers, and eliminates garbage collection by reusing mutable event objects in-place',
      'It bypasses the JVM and executes on FPGA hardware accelerators',
      'It uses multithreaded SQL queries inside SQLite',
      'It stores all events on local NVMe disk partitions'
    ],
    correctIndex: 0,
    explanation: '`BlockingQueue` relies on lock contention (`ReentrantLock`), queue node object creation on every push (triggering GC pressure), and false sharing. The Disruptor pre-allocates a fixed circular array of reusable event objects, tracks consumer/producer positions via cache-line padded 64-bit sequence counters, and coordinates processing using lock-free memory barriers, yielding microsecond latencies with zero GC.',
    shortcutOrInsight: 'Disruptor Pattern: Pre-allocated circular ring buffer + In-place object reuse + Cache-line padded sequence counters + Zero GC.',
    difficulty: 'Hard'
  },
  {
    id: 'java3-q8',
    testId: 'mock-java-programming-tier3',
    section: 'JFR (Java Flight Recorder) & Continuous Profiling',
    companyTag: 'Amazon Corretto Team',
    question: 'Why is Java Flight Recorder (JFR) safe to run continuously in mission-critical production environments (unlike traditional Java profiling agents)?',
    options: [
      'JFR is integrated directly into the JVM kernel, writing binary event buffers directly from native code with less than 1% CPU and memory overhead, without requiring bytecode instrumentation (BCI) that distorts JIT inlining',
      'JFR only records logs when the application is idle',
      'JFR profiles by taking screenshots of the server console',
      'JFR disables multithreading during profiling windows'
    ],
    correctIndex: 0,
    explanation: 'Traditional Java profilers (like old VisualVM or debug agents) instrument bytecodes, triggering thread safepoints and skewing JIT compiler inlining. JFR is baked natively into HotSpot. It writes circular native ring buffers with atomic operations, extracting CPU samples, allocation traces, and lock contention events with <1% overhead, making it standard for production observability.',
    shortcutOrInsight: 'JFR Production Safety: In-JVM native event emission ensures <1% overhead with zero bytecode instrumentation distortion.',
    difficulty: 'Medium'
  },
  {
    id: 'java3-q9',
    testId: 'mock-java-programming-tier3',
    section: 'Bytecode Manipulation & Instrumentation',
    companyTag: 'Byte Buddy / Datadog APM Agent',
    question: 'How do production APM agents (e.g. Datadog, Dynatrace, New Relic) intercept Java methods at runtime to inject distributed tracing headers without modifying application source code?',
    options: [
      'Using the Java Instrumentation API (`java.lang.instrument.Instrumentation`) and bytecode libraries (Byte Buddy / ASM) in a Java Agent to dynamically rewrite class bytecodes during `ClassFileTransformer` class loading',
      'By decompiling `.class` files back to Java, editing the text files, and recompiling with `javac`',
      'By executing Python wrappers around the JVM process',
      'By sniffing unencrypted network traffic with tcpdump'
    ],
    correctIndex: 0,
    explanation: 'Java APM agents specify a `-javaagent:agent.jar` flag. The agent hooks into the JVM via `java.lang.instrument.ClassFileTransformer`. As classes are loaded into the JVM, libraries like Byte Buddy or ASM intercept the raw bytecode stream, inject telemetry tracking bytecode around targeted methods (e.g. HTTP clients, JDBC queries), and return the instrumented bytecode to the JVM classloader.',
    shortcutOrInsight: 'Java Instrumentation: `ClassFileTransformer` + Byte Buddy modifies bytecodes in-memory during class loading for zero-code APM tracing.',
    difficulty: 'Hard'
  },
  {
    id: 'java3-q10',
    testId: 'mock-java-programming-tier3',
    section: 'Compressed OOPs & JVM Pointer Architecture',
    companyTag: 'Oracle HotSpot Architecture',
    question: 'Why does a 64-bit HotSpot JVM maintain high performance by enabling Compressed Ordinary Object Pointers (`-XX:+UseCompressedOops`), and why does this optimization break when the heap exceeds 32 GB?',
    options: [
      'Because all Java objects are aligned to 8-byte boundaries, the lowest 3 bits of every address are always zero; the JVM shifts 32-bit pointers by 3 bits to address up to 2^35 bytes (32 GB) of memory; heaps larger than 32 GB require full 64-bit pointers, increasing cache footprint',
      '32 GB is the maximum physical memory supported by Linux x86_64 CPUs',
      'Compressed OOPs uses ZIP compression which cannot compress more than 32 GB',
      'Pointers exceeding 32 GB cause memory leaks in the garbage collector'
    ],
    correctIndex: 0,
    explanation: 'On 64-bit systems, storing 64-bit object references consumes 50% more cache space than on 32-bit systems. With 8-byte object alignment, addresses always end in `000`. By storing the address shifted right by 3 bits, a 32-bit integer can address `2^32 * 8 = 32 GB`. If the heap is sized at 33 GB, the JVM is forced to abandon Compressed OOPs and use uncompressed 64-bit pointers, often causing a 33 GB heap to hold LESS usable data than a 31 GB heap due to pointer bloat.',
    shortcutOrInsight: 'The 32GB Heap Cliff: 8-byte alignment allows 32-bit pointers to address up to 32GB (via 3-bit shift). Crossing 32GB bloats all pointers to 64 bits.',
    difficulty: 'Hard'
  }
];

// ============================================================================
// 9. PYTHON & AI SYSTEMS PRODUCTION INTERNALS (TIER-3 / ELITE) (10 MCQs)
// Python 3.13 Free-Threaded (No-GIL), C-API C-Extensions, Cython Memoryviews, High-Throughput AsyncIO & PyTorch Kernels
// ============================================================================
export const PYTHON_TIER3_QUESTIONS: FaangQuestion[] = [
  {
    id: 'py3-q1',
    testId: 'mock-python-programming-tier3',
    section: 'Python 3.13 Free-Threaded Architecture (No-GIL)',
    companyTag: 'Meta Python Runtime / CPython Core',
    question: 'How does CPython 3.13\'s experimental free-threaded build (PEP 703 - Disabling the Global Interpreter Lock) maintain thread safety for Python objects without the global lock?',
    options: [
      'By replacing global locks with mimalloc thread-local arenas, biased reference counting, and immortal/deferred reference counting combined with per-object fine-grained locks',
      'By running every Python thread inside a separate Docker container',
      'By converting all Python dictionaries to read-only SQLite databases',
      'By executing Python bytecode on the GPU exclusively'
    ],
    correctIndex: 0,
    explanation: 'Under PEP 703, removing the GIL means concurrent threads can mutate objects and their reference counts simultaneously. To avoid catastrophic atomic increment overhead on every single access, CPython 3.13 uses: (1) biased reference counting (the creating thread modifies local counters without atomics), (2) immortal objects (static strings/constants skip refcounting), and (3) thread-safe mimalloc memory pools with fine-grained mutexes.',
    shortcutOrInsight: 'PEP 703 No-GIL: Biased reference counting + Immortal objects + Mimalloc arenas allow multi-threaded Python without atomic bottlenecks.',
    difficulty: 'Very Hard'
  },
  {
    id: 'py3-q2',
    testId: 'mock-python-programming-tier3',
    section: 'Cython & Typed Memoryviews',
    companyTag: 'Citadel Quantitative Research',
    question: 'In Cython numerical computing, why is indexing a 2D typed memoryview `double[:, :] arr` inside a `nogil` loop orders-of-magnitude faster than accessing a NumPy array via Python slicing?',
    options: [
      'Typed memoryviews access the underlying C-contiguous raw data buffer via direct pointer arithmetic without acquiring the GIL, without creating intermediate Python slice objects, and without invoking Python C-API overhead',
      'Cython runs memoryviews on FPGA hardware chips',
      'NumPy arrays are stored on disk while memoryviews are stored in registers',
      'Typed memoryviews automatically calculate matrix inversions'
    ],
    correctIndex: 0,
    explanation: 'Standard Python indexing `arr[i, j]` creates Python integer objects, performs bounds checks through Python C-API calls, and acquires the GIL. A Cython typed memoryview (`double[:, :]`) extracts the raw C data pointer and stride array once; inside `with nogil:`, indexing translates directly into raw pointer math `*(data + i*stride0 + j*stride1)` compiling to a single CPU assembly instruction.',
    shortcutOrInsight: 'Cython nogil Memoryviews: Direct C pointer arithmetic over raw buffer memory with zero Python runtime and zero GIL contention.',
    difficulty: 'Hard'
  },
  {
    id: 'py3-q3',
    testId: 'mock-python-programming-tier3',
    section: 'CPython Memory & Small Object Allocator (PyMalloc)',
    companyTag: 'Instagram / Meta Server Optimization',
    question: 'Why does Python\'s `sys.getsizeof()` frequently report surprising memory sizes (e.g. 28 bytes for an integer and 50 bytes for an empty string), and how does PyMalloc manage memory under 512 bytes?',
    options: [
      'Every Python object requires a `PyObject` header containing an 8-byte reference count (`ob_refcnt`) and an 8-byte type pointer (`ob_type`); PyMalloc manages allocations ≤512 bytes by organizing memory into 256KB Arenas, 4KB Pools, and fixed Size-Class Bins to prevent heap fragmentation',
      'Python encrypts all variables with AES-128 in RAM',
      'Empty strings store the entire Unicode character database in private fields',
      'Python allocates 1MB minimum for every variable on the stack'
    ],
    correctIndex: 0,
    explanation: 'In CPython, everything is a boxed heap object. Even the simplest integer contains `ob_refcnt` (8 bytes), `ob_type` (8 bytes), and digit array fields. To prevent glibc `malloc` fragmentation from millions of tiny objects, PyMalloc allocates 256KB Arenas carved into 4KB Pools. Each pool handles a specific size class (multiples of 8 bytes up to 512 bytes) using fast singly-linked free lists.',
    shortcutOrInsight: 'PyObject Overhead + PyMalloc: 16-byte object header on every value. PyMalloc pools allocations ≤512 bytes into size-class bins to stop fragmentation.',
    difficulty: 'Hard'
  },
  {
    id: 'py3-q4',
    testId: 'mock-python-programming-tier3',
    section: 'AsyncIO Internals & Event Loop Latency',
    companyTag: 'FastAPI / Uvicorn Core Team',
    question: 'When building ultra-high-throughput asynchronous services in Python (e.g., FastAPI with Uvicorn), why does replacing the default `asyncio` event loop with `uvloop` routinely double or triple request throughput?',
    options: [
      '`uvloop` is a drop-in replacement implemented in Cython on top of Node.js\'s battle-tested C library `libuv`, optimizing epoll/kqueue polling, socket read buffers, and task scheduling at native C speed with minimal Python interpreter overhead',
      '`uvloop` automatically translates Python code into Go binaries',
      '`uvloop` bypasses the Linux networking stack entirely',
      '`uvloop` compresses HTTP responses with Brotli compression by default'
    ],
    correctIndex: 0,
    explanation: 'CPython\'s default `asyncio` event loop is implemented largely in pure Python on top of the `selectors` module, incurring high per-event Python interpreter dispatch overhead. `uvloop` wraps `libuv` (the C engine powering Node.js) via Cython, moving callback queues, timers, and I/O polling into optimized C structures, matching the performance of Go and Node network stacks.',
    shortcutOrInsight: 'uvloop: High-performance C `libuv` bindings replace pure Python event loop scheduling, cutting per-request dispatch latency by 70%.',
    difficulty: 'Medium'
  },
  {
    id: 'py3-q5',
    testId: 'mock-python-programming-tier3',
    section: 'Custom C-Extensions & Reference Leaks',
    companyTag: 'OpenAI Triton & PyTorch Team',
    question: 'When writing a custom C-Extension using the Python C-API (`#include <Python.h>`), what disastrous defect occurs if a developer calls `PyTuple_SetItem(tuple, 0, py_val)` and subsequently calls `Py_DECREF(py_val)`?',
    options: [
      'A dangling pointer / use-after-free bug: `PyTuple_SetItem` "steals" the reference to `py_val`; calling `Py_DECREF` decrements the count prematurely, causing the underlying object to be deallocated while still referenced by the tuple',
      'A memory leak because the reference count is incremented twice',
      'The tuple is converted to a dictionary in memory',
      'A compiler error because `PyTuple_SetItem` only accepts C integers'
    ],
    correctIndex: 0,
    explanation: 'Most Python C-API functions take a "borrowed" reference and increment it if they keep it. However, `PyTuple_SetItem` and `PyList_SetItem` are famous exceptions: they "steal" a reference (taking ownership of the reference without incrementing it). If you manually call `Py_DECREF(py_val)` after inserting it, you decrement an un-incremented reference, prematurely freeing `py_val` and corrupting memory.',
    shortcutOrInsight: 'Python C-API Reference Stealing: `PyTuple_SetItem` steals the reference! Never `Py_DECREF` an object passed to it.',
    difficulty: 'Very Hard'
  },
  {
    id: 'py3-q6',
    testId: 'mock-python-programming-tier3',
    section: 'PyTorch Custom CUDA Kernels',
    companyTag: 'NVIDIA AI / PyTorch Core',
    question: 'Why do deep learning engineers write custom PyTorch operators in OpenAI Triton rather than raw CUDA C++ for custom attention and normalization layers?',
    options: [
      'Triton automatically handles GPU block scheduling, shared memory (SRAM) tiling, memory coalescing, and tensor core synchronization at compile-time while allowing engineers to write Python code operating on blocked tensor tiles',
      'Triton compiles Python code into Java bytecode that executes on GPUs',
      'Triton eliminates the need for NVIDIA GPUs, running on standard CPUs',
      'CUDA C++ is deprecated by NVIDIA'
    ],
    correctIndex: 0,
    explanation: 'Writing raw CUDA C++ requires manually managing thread warps, shared memory bank conflicts, cooperative thread block loading, and hardware synchronization barriers. OpenAI Triton abstracts thread-level management: developers program at the block/tile level in Python, and Triton\'s compiler optimizes register allocation, SRAM caching, and hardware tensor-core instructions automatically.',
    shortcutOrInsight: 'Triton vs CUDA: Triton automates SRAM tiling and warp memory coalescing from Python, yielding hand-tuned CUDA speed with 10x less code.',
    difficulty: 'Hard'
  },
  {
    id: 'py3-q7',
    testId: 'mock-python-programming-tier3',
    section: 'Garbage Collection & Generational GC Tuning',
    companyTag: 'DoorDash Engineering / Instagram Engineering',
    question: 'Why did Instagram famous disable Python\'s cyclic garbage collector (`gc.disable()`) on their Django production web worker processes?',
    options: [
      'Django workers use a prefork multi-process architecture (uWSGI / Gunicorn); cyclic GC collections mutate object headers (`gc_refs`), dirtying physical memory pages and destroying Linux Copy-on-Write (CoW) page sharing across child processes, inflating RAM consumption by hundreds of megabytes',
      'Disabling GC prevents Python web workers from ever crashing',
      'Cyclic GC causes 10-second stop-the-world freezes on every HTTP request',
      'Python GC cannot collect dictionaries with string keys'
    ],
    correctIndex: 0,
    explanation: 'In prefork servers, the master process loads all modules and application code before fork()-ing worker processes. Under Linux CoW, workers share the master\'s physical RAM pages until a write occurs. When Python\'s cyclic GC runs, it alters the bidirectional linked-list pointers in object headers to calculate cycles, which copies those memory pages into every child process. Disabling cyclic GC (relying purely on reference counting for short-lived request objects) preserves CoW sharing.',
    shortcutOrInsight: 'Copy-on-Write Preservation: Disabling cyclic GC in prefork architectures prevents GC header mutations from dirtying shared parent pages.',
    difficulty: 'Very Hard'
  },
  {
    id: 'py3-q8',
    testId: 'mock-python-programming-tier3',
    section: 'Metaclasses & Dynamic Class Construction',
    companyTag: 'Pydantic Core / Django ORM',
    question: 'In Python, what is the exact difference between `__new__` and `__init__` in a custom Metaclass (`class Meta(type):`)?',
    options: [
      '`__new__` is called before the class object itself is created in memory, receiving the class name, bases, and attribute dictionary, allowing modification of the class structure before instantiation; `__init__` is called after the class object has already been instantiated by `type` to initialize it',
      '`__new__` creates instances of the class, while `__init__` destroys them',
      '`__new__` only runs in Python 2, while `__init__` runs in Python 3',
      'There is no difference; they are aliases for the same method'
    ],
    correctIndex: 0,
    explanation: 'A metaclass is the class of a class. When Python executes a `class Foo:` block, it invokes the metaclass\'s `__new__(cls, name, bases, dct)`. Because `__new__` physically constructs and returns the new `type` object, it can modify methods, inject field descriptors (like Pydantic/Django), or enforce architectural rules. `__init__` runs subsequently to configure the created class object.',
    shortcutOrInsight: 'Metaclass Lifecycle: `__new__` creates the class object (enabling schema rewriting); `__init__` initializes the created class object.',
    difficulty: 'Hard'
  },
  {
    id: 'py3-q9',
    testId: 'mock-python-programming-tier3',
    section: 'Descriptior Protocol & Weak References',
    companyTag: 'SQLAlchemy Core Team',
    question: 'How does an attribute access `obj.x` resolve through Python\'s descriptor protocol when `x` is defined as a "Data Descriptor" (defining both `__get__` and `__set__`) versus when `x` is in `obj.__dict__`?',
    options: [
      'A Data Descriptor takes absolute precedence over `obj.__dict__`: Python invokes `type(obj).__dict__[\'x\'].__get__(obj, type(obj))` even if a key named `\'x\'` exists in `obj.__dict__`',
      '`obj.__dict__` always overrides all descriptors unconditionally',
      'Python throws an `AttributeError` if a descriptor shares a name with an instance attribute',
      'The descriptor is called only when `obj.__dict__` is completely empty'
    ],
    correctIndex: 0,
    explanation: 'Python attribute lookup order is strictly defined: (1) Data descriptors (defining both `__get__` and `__set__`) defined on the class or its MRO, (2) Instance dictionary `obj.__dict__`, (3) Non-data descriptors (defining only `__get__`, like regular methods), (4) Class dictionary, and (5) `__getattr__`. Because data descriptors take precedence over `__dict__`, frameworks like SQLAlchemy and Pydantic can intercept all writes and reads reliably.',
    shortcutOrInsight: 'Descriptor Precedence: Data Descriptors (__get__ AND __set__) override instance `__dict__`! Non-data descriptors do not.',
    difficulty: 'Hard'
  },
  {
    id: 'py3-q10',
    testId: 'mock-python-programming-tier3',
    section: 'Profiling & Low-Overhead Sampling',
    companyTag: 'Uber Engineering / Datadog Pyroscope',
    question: 'Why do production Python continuous profiling tools (e.g. Py-Spy, Pyroscope) inspect process memory from an external process via `process_vm_readv` rather than using Python\'s native `sys.setprofile()` or `sys.settrace()`?',
    options: [
      '`sys.settrace()` invokes a Python callback on every single bytecode instruction or function call, adding 10x-50x runtime slowdown and altering application timing; out-of-process sampling reads CPython `_PyThreadState` structs asynchronously with <1% overhead and zero runtime code modification',
      '`sys.setprofile()` cannot capture functions that take keyword arguments',
      'External profilers require root passwords while `sys.settrace` requires a hardware dongle',
      '`sys.settrace()` is disabled in production Linux environments'
    ],
    correctIndex: 0,
    explanation: '`sys.settrace()` and `cProfile` are deterministic in-process hooks that serialize and monitor every function entry and exit, adding massive overhead that distorts real-world latencies. Out-of-process sampling profilers (like Py-Spy) run in a separate process, read the target Python process\'s memory via the Linux `process_vm_readv` syscall, parse the CPython thread state and call stack pointers, and record samples with virtually zero performance impact.',
    shortcutOrInsight: 'Zero-Overhead Profiling: Out-of-process stack sampling (Py-Spy) reads thread structs via OS syscalls, avoiding `settrace()` 10x slowdowns.',
    difficulty: 'Hard'
  }
];

// ============================================================================
// 10. DATA STRUCTURES & ALGORITHMS (TIER-3 / ELITE) (10 MCQs)
// Heavy-Light Decomposition, Centroid Decomposition, Suffix Automata, Treaps, Push-Relabel Maximum Flow & Dynamic Connectivity
// ============================================================================
export const DSA_TIER3_QUESTIONS: FaangQuestion[] = [
  {
    id: 'dsa3-q1',
    testId: 'mock-dsa-algorithms-tier3',
    section: 'Advanced Tree Decompositions',
    companyTag: 'Google Code Jam / Citadel Quantitative Systems',
    question: 'In Heavy-Light Decomposition (HLD) of a tree with N vertices, what property guarantees that any simple path between any two vertices u and v crosses at most O(log N) distinct heavy chains?',
    options: [
      'A heavy edge is defined to point to the child with the strictly largest subtree size; whenever an edge to a light child is traversed, the subtree size decreases by at least half (≤ size / 2), bounding the number of light edges on any path to at most log2(N)',
      'The tree is automatically rebalanced into a complete binary search tree during DFS',
      'All paths are mapped to linear arrays using Breadth-First Search (BFS)',
      'Heavy-Light Decomposition only works on trees with height ≤ 10'
    ],
    correctIndex: 0,
    explanation: 'In HLD, each non-leaf node selects the child with the largest subtree size as its "heavy" child (connected by a heavy edge). The remaining edges are "light". Because a light child\'s subtree cannot exceed half of its parent\'s subtree, following a light edge at least cuts the remaining subtree size in half. Therefore, any root-to-node path can contain at most floor(log2 N) light edges, allowing any tree path query to be mapped into at most O(log N) contiguous intervals on a Segment Tree in O(log^2 N) time.',
    shortcutOrInsight: 'HLD Principle: Light edge traversal cuts subtree size in half -> at most O(log N) chain transitions on any tree path.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dsa3-q2',
    testId: 'mock-dsa-algorithms-tier3',
    section: 'String Automata & Advanced Text Processing',
    companyTag: 'Jane Street / Meta Core Algorithms',
    question: 'Why is a Suffix Automaton (SAM) computationally superior to a Suffix Tree for processing substrings of a string of length N?',
    options: [
      'A Suffix Automaton represents all 2^N substrings using the minimal deterministic finite automaton (DFA) with at most 2N-1 states and 3N-4 transitions, constructed in strictly linear O(N) time and space with significantly lower constant memory overhead than suffix trees',
      'Suffix Automata store strings in uncompressed binary format on disk',
      'Suffix Trees have O(N^2) query time for substring search',
      'Suffix Automata only support English alphabet characters from A to Z'
    ],
    correctIndex: 0,
    explanation: 'A Suffix Automaton is the smallest DFA recognizing all suffixes of a string. While a Suffix Tree explicitly builds a tree of branch nodes and edge substrings, a Suffix Automaton merges right-equivalence classes (endpos sets), guaranteeing at most 2N - 1 states and 3N - 4 transitions. It can be constructed in linear O(N) time and answers distinct substring counts, k-th lexicographical substring lookups, and smallest cyclic shifts in optimal time.',
    shortcutOrInsight: 'Suffix Automaton: Minimal DFA of suffixes. Exactly ≤ 2N-1 states and linear O(N) memory, outperforming Suffix Trees in cache density.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dsa3-q3',
    testId: 'mock-dsa-algorithms-tier3',
    section: 'Balanced Search & Randomized Trees',
    companyTag: 'Palantir Core Algorithms',
    question: 'How does an Implicit Cartesian Tree / Treap support range reverse operations (`reverse(l, r)` in an array) in O(log N) time without rebuilding the tree?',
    options: [
      'By using node subtree sizes as implicit array indices, splitting the treap at indices l-1 and r into three treaps, toggling a lazy `reversed` boolean flag on the target middle subtree root, and swapping left/right child pointers during lazy propagation on subsequent tree traversals',
      'By sorting the array using quicksort on every reverse command',
      'By converting the Treap to an AVL tree and rotating the root node',
      'By reversing the physical pointers in an underlying C array'
    ],
    correctIndex: 0,
    explanation: 'In an implicit treap, the BST key is the implicit 1-based index (computed dynamically as `size(node.left) + 1`). To reverse the range `[l, r]`, the tree is split into `T1` (< l), `T2` (range `[l, r]`), and `T3` (> r). Toggling a `lazy_rev` flag on `T2`\'s root swaps its left and right children when traversed, achieving range reversal in O(log N) time via push-down lazy propagation.',
    shortcutOrInsight: 'Implicit Treap Lazy Reversal: Split range [l, r] -> toggle lazy reverse flag on root -> swap children during push-down. O(log N).',
    difficulty: 'Very Hard'
  },
  {
    id: 'dsa3-q4',
    testId: 'mock-dsa-algorithms-tier3',
    section: 'Maximum Flow & Network Optimization',
    companyTag: 'Google Optimization / Akamai CDN Routing',
    question: 'Why does the Push-Relabel (Preflow-Push) maximum flow algorithm with Highest-Label selection heuristic achieve O(V^2 * sqrt(E)) time complexity, vastly outperforming Edmonds-Karp O(V * E^2)?',
    options: [
      'It relaxes the conservation of flow constraint during execution, maintaining excess flow (preflow) at vertices and pushing excess locally to neighbors with strictly lower distance labels, avoiding the overhead of searching for global augmenting paths across the entire graph in each step',
      'It solves maximum flow using linear programming simplex on a GPU',
      'It assumes all edge capacities are equal to 1',
      'It only operates on directed acyclic graphs (DAGs)'
    ],
    correctIndex: 0,
    explanation: 'Augmenting path algorithms (Ford-Fulkerson, Edmonds-Karp) require finding a complete s-t path across the residual network for every augmentation. Push-Relabel maintains a height/distance label for every vertex and pushes excess flow locally along admissible downhill edges (`height(u) == height(v) + 1`). Discharging vertices with the highest label first bounds nonsaturating pushes, yielding O(V^2 * sqrt(E)) worst-case runtime.',
    shortcutOrInsight: 'Push-Relabel Advantage: Local operations (push & relabel) eliminate the need to find global s-t paths in residual networks.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dsa3-q5',
    testId: 'mock-dsa-algorithms-tier3',
    section: 'Divide & Conquer on Trees',
    companyTag: 'Two Sigma Quantitative Research',
    question: 'In Centroid Decomposition of a tree with N vertices, what is the maximum possible depth of the resulting Centroid Tree, and how does it enable efficient path-length queries?',
    options: [
      'The depth is at most O(log2 N); a centroid vertex is guaranteed to divide the tree such that no remaining connected component exceeds size N/2, allowing all tree paths passing through the centroid to be counted in O(subtree_size) time at each level',
      'The depth is O(N) in the worst case if the tree is a line graph',
      'Centroid decomposition converts any tree into a complete graph with N(N-1)/2 edges',
      'The depth is always exactly 2'
    ],
    correctIndex: 0,
    explanation: 'Every tree has at least one centroid: a node whose removal splits the tree into subtrees, none of which exceeds size N/2. By recursively picking the centroid as the root of the decomposed tree, the depth of the centroid tree is mathematically bounded by floor(log2 N). Any simple path in the original tree passes through the Lowest Common Ancestor (LCA) in the Centroid Tree, enabling divide-and-conquer path counting in O(N log N) total time.',
    shortcutOrInsight: 'Centroid Decomposition Invariant: Tree size halves at each recursive level -> Centroid Tree depth is strictly O(log N).',
    difficulty: 'Very Hard'
  },
  {
    id: 'dsa3-q6',
    testId: 'mock-dsa-algorithms-tier3',
    section: 'Computational Geometry & Convexity',
    companyTag: 'Tesla Full Self-Driving / Waymo Perception',
    question: 'How does Andrew\'s Monotone Chain algorithm compute the 2D Convex Hull of N points in optimal O(N log N) time, and how is orientation evaluated?',
    options: [
      'Points are sorted by x-coordinate (breaking ties by y); upper and lower hulls are constructed independently in linear time by maintaining a monotonic stack and popping points that create a non-left turn (evaluated via the 2D cross product `(B.x - A.x)*(C.y - A.y) - (B.y - A.y)*(C.x - A.x) <= 0`)',
      'By projecting all points onto a 3D sphere and finding the tangent plane',
      'By checking all N^3 possible triangles in brute force',
      'By connecting all adjacent points with Bezier curves'
    ],
    correctIndex: 0,
    explanation: 'Andrew\'s Monotone Chain sorts points by x-coordinate in O(N log N). It then builds the lower hull and upper hull using a stack. For each point C, it checks whether the vector cross product of AB and BC is positive (counter-clockwise / left turn). If the cross product is ≤ 0 (clockwise or collinear), point B cannot be on the strictly convex boundary and is popped from the stack. Each point is pushed and popped at most once, yielding O(N) scanning time.',
    shortcutOrInsight: 'Monotone Chain: Sort points by X -> 2D vector cross product determines left vs right turn -> stack maintains hull in O(N) time.',
    difficulty: 'Hard'
  },
  {
    id: 'dsa3-q7',
    testId: 'mock-dsa-algorithms-tier3',
    section: 'Dynamic Programming on Trees & Rerooting',
    companyTag: 'Microsoft Algorithm Research',
    question: 'When solving the "Tree Rerooting DP" technique (calculating a metric such as sum of distances from every vertex to all other vertices for all N vertices), what reduces the complexity from O(N^2) to optimal O(N)?',
    options: [
      'Running an initial post-order DFS to compute sub-tree solutions rooted arbitrarily at node 1, followed by a second pre-order DFS where the root state is dynamically transitioned to each neighbor in O(1) time by adding/subtracting component contributions',
      'Running Dijkstra\'s algorithm from every single vertex in parallel',
      'Converting the tree into an adjacency matrix and calculating matrix multiplication',
      'Using memoization on an all-pairs Floyd-Warshall table'
    ],
    correctIndex: 0,
    explanation: 'Brute-force calculating all-pairs tree metrics requires N separate traversals (O(N^2)). The Tree Rerooting technique uses 2 DFS passes: (1) Bottom-up DFS computes subtree sizes and distances for an arbitrary root (node 1). (2) Top-down DFS calculates the answer for child `v` when moving root from parent `u`: `ans[v] = ans[u] - size[v] + (N - size[v])`. This O(1) delta transition solves all N vertices in O(N) total time.',
    shortcutOrInsight: 'Tree Rerooting: 1st DFS computes bottom-up subtree values; 2nd DFS updates neighbor answers in O(1) time via parent delta math.',
    difficulty: 'Hard'
  },
  {
    id: 'dsa3-q8',
    testId: 'mock-dsa-algorithms-tier3',
    section: 'Dynamic Connectivity & Offline Queries',
    companyTag: 'Citadel Quant Platform',
    question: 'How does the "Offline Dynamic Connectivity" algorithm answer connectivity queries on a graph undergoing dynamic edge additions and deletions in O(Q log Q log V) time?',
    options: [
      'By treating time as a Segment Tree over the Q queries, placing each edge\'s active lifespan interval `[t_add, t_delete]` into O(log Q) segment tree nodes, and executing a DFS traversal over the segment tree using a Disjoint Set Union (DSU) with Rollback (undo stack)',
      'By recomputing Breadth-First Search from scratch after every single graph update',
      'By calculating the eigenvalues of the graph Laplacian matrix',
      'By converting the graph into a directed acyclic graph using topological sort'
    ],
    correctIndex: 0,
    explanation: 'Fully dynamic online connectivity is complex. If queries are known offline, time intervals [1, Q] form a Segment Tree. An edge existing from time `t1` to `t2` is added to O(log Q) canonical segment tree nodes. A DFS traverses the tree: entering a node applies edges to a DSU with rollback (without path compression, using union-by-rank so changes can be popped from a stack). Exiting a node undoes those operations, achieving O(Q log Q log V) time.',
    shortcutOrInsight: 'Offline Dynamic Connectivity: Segment Tree over time + DSU with Rollback stack allows undoing edge insertions in O(log V) time.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dsa3-q9',
    testId: 'mock-dsa-algorithms-tier3',
    section: 'Range Queries & Square Root Decomposition',
    companyTag: 'Codeforces Grandmaster Crucible',
    question: 'How does Mo\'s Algorithm answer Q offline range frequency queries on an array of length N in optimal O((N + Q) * sqrt(N)) time?',
    options: [
      'It partitions the array into blocks of size B = sqrt(N), sorts queries primarily by `left / B` and secondarily by `right` (with odd/even zigzag optimization), allowing the two sliding pointers (L, R) to transition between consecutive queries with at most O(sqrt(N)) total movements per query',
      'It creates sqrt(N) copies of the entire array in RAM',
      'It applies fast Fourier transforms over the query indices',
      'It solves queries in parallel using multithreaded binary search'
    ],
    correctIndex: 0,
    explanation: 'Mo\'s algorithm orders queries so that the two pointers [L, R] move minimally. Sorting queries by `(L / B, R)` ensures that within each block of L, R moves monotonically from 0 to N (taking O(N) steps per block * sqrt(N) blocks = O(N sqrt N)). L never moves more than B steps between adjacent queries in the same block (taking O(Q sqrt N) steps). Adding and removing single elements takes O(1), yielding O((N + Q) sqrt N).',
    shortcutOrInsight: 'Mo\'s Ordering: Sort queries by `(L / sqrt(N), R)`. Right pointer sweeps monotonically while Left pointer jiggles at most sqrt(N) steps.',
    difficulty: 'Hard'
  },
  {
    id: 'dsa3-q10',
    testId: 'mock-dsa-algorithms-tier3',
    section: 'Number Theoretic Transforms & Fast Multiplication',
    companyTag: 'Anthropic AI / Cryptographic Hardware Design',
    question: 'Why is the Number Theoretic Transform (NTT) preferred over the standard Fast Fourier Transform (FFT) for polynomial multiplication in competitive programming and post-quantum cryptographic schemes (such as Kyber/Dilithium)?',
    options: [
      'NTT operates over a finite field arithmetic modulo a prime `P = c * 2^k + 1` using primitive roots of unity instead of complex floating-point numbers `e^(2πi/n)`, completely eliminating floating-point precision loss, rounding errors, and CPU floating-point latency',
      'NTT can multiply polynomials of infinite degree in O(1) time',
      'FFT cannot be executed on 64-bit processors',
      'NTT does not require divide-and-conquer recursion'
    ],
    correctIndex: 0,
    explanation: 'Standard FFT uses complex numbers `cos(θ) + i sin(θ)`. For large coefficients or modulo arithmetic (e.g. modulo 998244353), floating-point round-off errors corrupt the final integer result. NTT replaces complex roots of unity with the primitive roots of unity in a Galois field `GF(P)` where `P` is an NTT-friendly prime (`998244353 = 119 * 2^23 + 1`), guaranteeing 100% exact integer arithmetic.',
    shortcutOrInsight: 'NTT Advantage: Discrete roots of unity in finite fields modulo P guarantee exact integer calculations with zero floating-point drift.',
    difficulty: 'Very Hard'
  }
];

// ============================================================================
// EXPORT ALL 5 TIER-3 TESTS FOR PART 2A
// ============================================================================
export const TIER3_MOCK_TESTS_PART2A: FaangMockTest[] = [
  {
    id: 'mock-c-programming-tier3',
    title: 'Linux eBPF Tracing, Lockless Memory Allocators & Cache Padding (Tier-3 Elite Assessment)',
    subtitle: '10 High-Bar Technical MCQs • 20 Minutes • False Sharing, Strict Aliasing UB, AVX2 FMA, eBPF Verifier & ELF Dynamic Linking',
    category: 'TECHNICAL CORE',
    companyTier: 'Tier-1 Elite Systems & Low-Level Infrastructure',
    companies: ['Intel Labs', 'Jane Street', 'NVIDIA Drivers', 'Red Hat'],
    scheduledDate: 'Tier-3 Elite Crucible • Slot C-3 (Low-Level Systems & Kernel Interop)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'c-tier3-master',
    badgeRewardName: 'Systems Software & Kernel Verification Titan',
    badgeIcon: '⚙️',
    badgeGradient: 'from-blue-600 via-slate-800 to-slate-950',
    certificateTitle: 'Elite C Systems & Kernel Engineering Credential',
    description: 'A relentless low-level systems engineering assessment testing cache-line false sharing mitigation, strict aliasing violations, AVX2 FMA single-cycle intrinsics, Linux eBPF kernel verifier mechanics, and async-signal-safe reentrancy constraints.',
    syllabusHighlights: [
      'MESI Cache Coherency False Sharing & 64-Byte alignas Padding',
      'C99 Strict Aliasing UB & Safe Type Punning with memcpy',
      'AVX2 SIMD `_mm256_fmadd_ps` Fused Multiply-Add Operations',
      'Jemalloc / TCMalloc Thread-Local Arena Bin Allocators',
      'Linux eBPF Kernel Static Analysis & Termination Proofs',
      'C11 `<stdatomic.h>` Acquire-Release Synchronization Pairs',
      'ELF Relocation: Dynamic Linker GOT vs PLT Trampoline Mechanics',
      'O_DIRECT Sector Alignment DMA Constraints & POSIX Signal Reentrancy'
    ],
    questions: C_TIER3_QUESTIONS
  },
  {
    id: 'mock-cpp-programming-tier3',
    title: 'C++23 Metaprogramming, Coroutines & Sub-Microsecond High-Frequency Trading (Tier-3 Elite Assessment)',
    subtitle: '10 High-Bar Technical MCQs • 20 Minutes • Static Polymorphism CRTP, C++20 Coroutines, SPSC Lockless Queues & x86 TSO StoreLoad',
    category: 'TECHNICAL CORE',
    companyTier: 'Tier-1 Elite Low-Latency Financial Engineering & Core C++',
    companies: ['Citadel', 'Jump Trading', 'Two Sigma', 'Bloomberg'],
    scheduledDate: 'Tier-3 Elite Crucible • Slot CPP-3 (Ultra-Low Latency C++ Architecture)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'cpp-tier3-master',
    badgeRewardName: 'Ultra-Low Latency C++ & High-Frequency Architect',
    badgeIcon: '⚡',
    badgeGradient: 'from-blue-700 via-indigo-900 to-slate-950',
    certificateTitle: 'Elite C++ High-Performance Systems Credential',
    description: 'A masterclass examination for high-frequency trading and systems developers testing static polymorphism CRTP over vtables, C++20 coroutine promise/awaiter mechanics, SPSC lockless memory ordering, x86 TSO store buffer StoreLoad reordering, and PMR monotonic arenas.',
    syllabusHighlights: [
      'Eliminating Hot-Path Vtables via CRTP & C++20 Static Concepts',
      'C++20 Coroutine Triad: promise_type, Awaiter & coroutine_handle',
      'C++20 Concepts Subsumption Overloading vs SFINAE enable_if',
      'SPSC Lock-Free Circular Buffers: Relaxed Local vs Release Publishing',
      'Pessimization of NRVO via Redundant `return std::move(local)`',
      'Real-Time Determinism: `std::expected` vs DWARF Exception Unwinding',
      'x86_64 TSO Hardware Memory Model & Store-Load Store Buffer Delays',
      'PMR `std::pmr::monotonic_buffer_resource` Bump-Pointer Arenas'
    ],
    questions: CPP_TIER3_QUESTIONS
  },
  {
    id: 'mock-java-programming-tier3',
    title: 'Project Loom Virtual Threads, GraalVM Native Image & Low-Pause ZGC Internals (Tier-3 Elite Assessment)',
    subtitle: '10 High-Bar Technical MCQs • 20 Minutes • Carrier Pinning, Generational ZGC Colored Pointers, Panama FFM & LMAX Disruptor',
    category: 'TECHNICAL CORE',
    companyTier: 'Tier-1 Enterprise Systems & JVM Architecture',
    companies: ['Netflix', 'Oracle Java Group', 'Goldman Sachs', 'Amazon Corretto'],
    scheduledDate: 'Tier-3 Elite Crucible • Slot JAVA-3 (Enterprise JVM Core Architecture)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'java-tier3-master',
    badgeRewardName: 'Enterprise JVM & Virtual Thread Systems Architect',
    badgeIcon: '☕',
    badgeGradient: 'from-orange-600 via-red-800 to-slate-950',
    certificateTitle: 'Elite Enterprise Java & JVM Systems Credential',
    description: 'An industry-grade JVM architectural assessment evaluating Project Loom carrier thread pinning hazards, Generational ZGC colored pointer load barriers, GraalVM Closed-World AOT compilation, Project Panama FFM off-heap safety, and LMAX Disruptor ring buffer mechanics.',
    syllabusHighlights: [
      'Project Loom Virtual Thread Carrier Pinning under Synchronized Blocks',
      'Generational ZGC Reference Coloring & JIT Load Barrier Mechanics',
      'GraalVM Closed-World AOT Compilation & Reachability Metadata',
      'Project Panama Foreign Function & Memory (FFM) Off-Heap Arenas',
      'Java Memory Model (JMM) Volatile StoreLoad Barrier Emission on x86',
      'HotSpot C2 JIT Deoptimization & On-Stack Replacement (OSR) Traps',
      'LMAX Disruptor Lock-Free Sequence Padding & Zero-GC Event Buffers',
      'Continuous Production Profiling via Native Java Flight Recorder (JFR)'
    ],
    questions: JAVA_TIER3_QUESTIONS
  },
  {
    id: 'mock-python-programming-tier3',
    title: 'Python 3.13 Free-Threaded (No-GIL), C-Extensions & High-Throughput Async Systems (Tier-3 Elite Assessment)',
    subtitle: '10 High-Bar Technical MCQs • 20 Minutes • PEP 703 Biased Refcounts, Cython nogil, PyMalloc Pools, uvloop & Triton Kernels',
    category: 'TECHNICAL CORE',
    companyTier: 'Tier-1 Elite AI Platform & Python Core Engineering',
    companies: ['Meta Python Runtime', 'OpenAI', 'Citadel Quants', 'FastAPI'],
    scheduledDate: 'Tier-3 Elite Crucible • Slot PY-3 (Production Python Runtime & AI Systems)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'python-tier3-master',
    badgeRewardName: 'Python Systems & High-Throughput Runtime Architect',
    badgeIcon: '🐍',
    badgeGradient: 'from-emerald-600 via-teal-900 to-slate-950',
    certificateTitle: 'Elite Production Python & AI Systems Credential',
    description: 'An elite CPython runtime and AI systems examination exploring PEP 703 free-threaded no-GIL internals, Cython nogil memoryview optimizations, C-API reference stealing hazards, PyMalloc 512-byte size class pools, and OpenAI Triton kernel generation.',
    syllabusHighlights: [
      'Python 3.13 PEP 703 Biased & Immortal Reference Counting (No-GIL)',
      'Cython `double[:, :]` Typed Memoryviews inside `with nogil:` Blocks',
      'CPython PyObject 16-Byte Headers & PyMalloc 256KB Arena Pools',
      'High-Throughput Uvicorn Serving via C-Based `uvloop` Event Loops',
      'Python C-API Reference Stealing Hazards in `PyTuple_SetItem`',
      'OpenAI Triton Python Block-Level Automatic SRAM Tiling',
      'Copy-on-Write (CoW) Preservation via Cyclic GC Disabling in Prefork Workers',
      'Out-of-Process Stack Profiling via Linux `process_vm_readv` (Py-Spy)'
    ],
    questions: PYTHON_TIER3_QUESTIONS
  },
  {
    id: 'mock-dsa-algorithms-tier3',
    title: 'Heavy-Light Decomposition, Centroid Trees, Suffix Automata & Push-Relabel Maximum Flow (Tier-3 Elite Assessment)',
    subtitle: '10 High-Bar Technical MCQs • 20 Minutes • HLD Logarithmic Light Edges, Suffix Automaton DFA, Treap Range Reversals & NTT',
    category: 'TECHNICAL CORE',
    companyTier: 'Tier-1 Elite Competitive Programming & Algorithmic Engineering',
    companies: ['Google Code Jam', 'Jane Street', 'Two Sigma', 'Palantir'],
    scheduledDate: 'Tier-3 Elite Crucible • Slot DSA-3 (Ultra-Hard Algorithmic Engineering)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'dsa-tier3-master',
    badgeRewardName: 'Grandmaster Algorithmic Systems Architect',
    badgeIcon: '👑',
    badgeGradient: 'from-purple-700 via-pink-800 to-slate-950',
    certificateTitle: 'Elite Data Structures & Competitive Algorithms Credential',
    description: 'The pinnacle of computer science algorithmic assessment testing Heavy-Light Decomposition subtree bounds, Suffix Automaton minimal DFAs, Implicit Treap lazy reverse rotations, Push-Relabel maximum flow local discharges, and Number Theoretic Transforms.',
    syllabusHighlights: [
      'Heavy-Light Decomposition Light Child Subtree Halving Invariant',
      'Suffix Automaton Minimal DFA States (≤ 2N-1) & Linear Construction',
      'Implicit Treap Range Reversals via Subtree Swap Lazy Propagation',
      'Push-Relabel (Preflow-Push) Maximum Flow Local Node Discharges',
      'Centroid Decomposition Recursive Subtree Halving Depth Invariant (≤ log N)',
      'Andrew\'s Monotone Chain 2D Convex Hull Vector Cross Products',
      'Tree Rerooting Dynamic Programming in Two Linear DFS Passes',
      'Offline Dynamic Connectivity via Time Segment Tree & DSU Rollback Stack'
    ],
    questions: DSA_TIER3_QUESTIONS
  }
];
