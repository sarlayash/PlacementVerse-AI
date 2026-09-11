import { FaangMockTest, FaangQuestion } from '../types';

// ============================================================================
// C LANGUAGE MOCK TEST: 10 HIGH-YIELD TECHNICAL MCQs
// Memory allocation, pointers, preprocessor, struct alignment & undefined behavior
// ============================================================================
export const C_MOCK_QUESTIONS: FaangQuestion[] = [
  {
    id: 'c-q1',
    testId: 'mock-c-programming',
    section: 'C Systems Programming',
    companyTag: 'Qualcomm / Texas Instruments',
    question: 'Consider the following C declaration:\n```c\nint *(*f[5])(int, char* (*)(int));\n```\nWhat is the exact syntactic meaning of this declaration according to the C clockwise/spiral rule?',
    options: [
      'f is an array of 5 pointers to functions that take an int and a function pointer (which takes an int and returns a char*) and return a pointer to int',
      'f is a function taking an array of 5 pointers to int and returning a pointer to char',
      'f is a pointer to an array of 5 functions each returning an int pointer',
      'f is an array of 5 functions taking an int and returning a pointer to a function returning char*'
    ],
    correctIndex: 0,
    explanation: 'Using the clockwise/spiral rule: start at identifier `f`. Step 1: `f[5]` -> f is an array of 5... Step 2: `*` -> pointers to... Step 3: `(...)` -> functions taking (int, char* (*)(int))... Step 4: `int *` -> returning pointer to int.',
    shortcutOrInsight: 'Spiral Rule: [5] binds before * inside parentheses: `(*f[5])` means an array of 5 pointers to functions.',
    difficulty: 'Very Hard'
  },
  {
    id: 'c-q2',
    testId: 'mock-c-programming',
    section: 'C Systems Programming',
    companyTag: 'Intel / Cisco OA',
    question: 'On a standard 64-bit x86_64 architecture with default 8-byte boundary alignment, what is the value of `sizeof(struct Packet)`?\n```c\nstruct Packet {\n    char flag;\n    int id;\n    short code;\n    double timestamp;\n};\n```',
    options: [
      '15 bytes',
      '24 bytes',
      '16 bytes',
      '32 bytes'
    ],
    correctIndex: 1,
    explanation: 'Alignment rules: `char flag` (1 byte) + 3 bytes padding (to align int to 4-byte boundary) = 4 bytes. `int id` (4 bytes) = 8 bytes. `short code` (2 bytes) + 6 bytes padding (to align double to 8-byte boundary) = 16 bytes. `double timestamp` (8 bytes) = 24 bytes. Total size = 24 bytes, which is a multiple of the largest member alignment (8 bytes).',
    shortcutOrInsight: 'Rule of largest primitive member: Largest member is double (8 bytes). Therefore total struct size must be an exact multiple of 8 bytes.',
    difficulty: 'Very Hard'
  },
  {
    id: 'c-q3',
    testId: 'mock-c-programming',
    section: 'C Systems Programming',
    companyTag: 'NVIDIA Firmware OA',
    question: 'What is the output of the following C snippet on standard GCC/Clang?\n```c\nint a[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\nint *p = (int*)(a + 1);\nprintf("%d, %d", *p, *(p + 2));\n```',
    options: [
      '4, 6',
      '2, 4',
      '4, 5',
      '1, 3'
    ],
    correctIndex: 0,
    explanation: '`a` is a 2D array of type `int[3][3]`. The expression `a + 1` performs pointer arithmetic at the row level, moving by `sizeof(int[3]) = 3 * sizeof(int)` bytes, pointing to the second row `{4, 5, 6}`. Casting to `(int*)` points directly to element 4. Therefore, `*p = 4`, and `*(p + 2)` skips 2 integers to point to element 6.',
    shortcutOrInsight: '2D array arithmetic: `a + 1` advances by an entire sub-array row (`sizeof(int) * 3`), so `*p` is `a[1][0] = 4` and `*(p+2)` is `a[1][2] = 6`.',
    difficulty: 'Hard'
  },
  {
    id: 'c-q4',
    testId: 'mock-c-programming',
    section: 'C Systems Programming',
    companyTag: 'Samsung R&D',
    question: 'What is the output of the following C code demonstrating preprocessor macro expansion?\n```c\n#define SQUARE(x) x * x\nint main() {\n    int a = 3;\n    int res = SQUARE(a + 2);\n    printf("%d", res);\n    return 0;\n}\n```',
    options: [
      '25',
      '11',
      '16',
      '15'
    ],
    correctIndex: 1,
    explanation: 'C preprocessor macros perform literal textual substitution without evaluation. `SQUARE(a + 2)` expands directly into `a + 2 * a + 2`. Substituting `a = 3`: `3 + 2 * 3 + 2 = 3 + 6 + 2 = 11`. To evaluate to 25, the macro definition would need parentheses: `#define SQUARE(x) ((x) * (x))`.',
    shortcutOrInsight: 'Textual replacement trap: Multiplication has higher precedence than addition, so `3 + 2 * 3 + 2 = 11`.',
    difficulty: 'Hard'
  },
  {
    id: 'c-q5',
    testId: 'mock-c-programming',
    section: 'C Systems Programming',
    companyTag: 'Broadcom OA',
    question: 'What will happen when executing the following snippet?\n```c\nchar *str1 = "PlacementReady";\nchar str2[] = "PlacementReady";\nstr1[0] = \'p\';\nstr2[0] = \'p\';\n```',
    options: [
      'Both string modifications succeed without issue',
      'str1[0] = \'p\' triggers a Segmentation Fault (SIGSEGV) because string literals reside in read-only memory',
      'str2[0] = \'p\' triggers a Segmentation Fault because character arrays are immutable in C',
      'Compile-time syntax error on line 3'
    ],
    correctIndex: 1,
    explanation: 'In C, `char *str1 = "PlacementReady"` points to a string literal stored in the read-only `.rodata` text segment. Attempting to write to read-only memory invokes undefined behavior and typically causes a segmentation fault (`SIGSEGV`). In contrast, `char str2[]` allocates a mutable copy of the string on the runtime stack, so modifying `str2[0]` is completely valid.',
    shortcutOrInsight: 'Pointer to literal vs Stack Array: `char *s = "..."` is read-only; `char s[] = "..."` is allocated on the stack and mutable.',
    difficulty: 'Very Hard'
  },
  {
    id: 'c-q6',
    testId: 'mock-c-programming',
    section: 'C Systems Programming',
    companyTag: 'Arm Semiconductor',
    question: 'Which of the following bitwise expressions checks if an unsigned integer `n > 0` is a power of 2 in strictly O(1) time?',
    options: [
      '(n & (n - 1)) == 0',
      '(n | (n - 1)) == 0',
      '(n ^ (n - 1)) == 0',
      '(n & (n + 1)) == 0'
    ],
    correctIndex: 0,
    explanation: 'A power of 2 in binary has exactly one bit set (e.g. 8 is `1000₂`). Subtracting 1 flips that bit and sets all lower bits to 1 (e.g. 7 is `0111₂`). Performing bitwise AND between `n` and `n - 1` clears the lowest set bit, leaving 0 if and only if `n` had exactly one set bit.',
    shortcutOrInsight: 'Kernighan bit trick: `n & (n - 1)` strips the lowest set bit. If the result is 0 for `n > 0`, it is an exact power of 2.',
    difficulty: 'Medium'
  },
  {
    id: 'c-q7',
    testId: 'mock-c-programming',
    section: 'C Systems Programming',
    companyTag: 'Bosch Engineering',
    question: 'What does the `volatile` keyword specifically instruct the C compiler to do?',
    options: [
      'Allocate the variable strictly inside CPU registers for maximum speed',
      'Prevent compiler optimization and force every read and write to access the exact physical memory address',
      'Ensure atomic thread-safe synchronization across multithreaded CPU cores',
      'Make the variable constant and read-only throughout program execution'
    ],
    correctIndex: 1,
    explanation: 'The `volatile` keyword tells the compiler that the value of the variable may be modified by factors external to the current code (e.g., hardware registers, memory-mapped I/O, or interrupt service routines). It inhibits optimizations such as caching the value in a register or eliding redundant reads/writes, forcing direct memory dereferences.',
    shortcutOrInsight: '`volatile` = No compiler caching! It guarantees direct memory loads and stores, essential for MMIO and embedded ISR flags.',
    difficulty: 'Hard'
  },
  {
    id: 'c-q8',
    testId: 'mock-c-programming',
    section: 'C Systems Programming',
    companyTag: 'Qualcomm Embedded',
    question: 'What is the output of the following pointer arithmetic in C?\n```c\nint arr[] = {10, 20, 30, 40, 50};\nint *ptr = arr;\nprintf("%d", *ptr++);\nprintf("%d", *++ptr);\n```',
    options: [
      '10 30',
      '10 20',
      '20 30',
      '10 40'
    ],
    correctIndex: 0,
    explanation: '`*ptr++` evaluates to `*ptr` (which is 10) due to postfix increment, and then increments `ptr` to point to 20. Then `*++ptr` applies prefix increment first: `ptr` moves from 20 to 30, and dereferences to 30. The printed output is 10 followed by 30.',
    shortcutOrInsight: 'Postfix `*ptr++` yields current value then advances. Prefix `*++ptr` advances first then yields new element (10 then 30).',
    difficulty: 'Hard'
  },
  {
    id: 'c-q9',
    testId: 'mock-c-programming',
    section: 'C Systems Programming',
    companyTag: 'Oracle C Core Engine',
    question: 'What is the consequence of calling `free(ptr)` twice on the same dynamically allocated memory block without reassigning `ptr` to `NULL`?',
    options: [
      'The second call silently succeeds without doing anything',
      'Double Free vulnerability leading to memory heap corruption and undefined behavior',
      'The operating system automatically terminates the process with error code 0',
      'Compiler error at build time'
    ],
    correctIndex: 1,
    explanation: 'Freeing an already freed memory block is known as a "Double Free". It corrupts the internal heap metadata structures (such as freelists or bin pointers) maintained by `malloc/free`, leading to crashes, heap exploitation vulnerabilities, and undefined behavior.',
    shortcutOrInsight: 'Always assign `ptr = NULL;` immediately after `free(ptr);` because `free(NULL)` is a safe no-op defined by the C standard.',
    difficulty: 'Medium'
  },
  {
    id: 'c-q10',
    testId: 'mock-c-programming',
    section: 'C Systems Programming',
    companyTag: 'Microchip Technology',
    question: 'What is the difference between `const int *p` and `int * const p` in C?',
    options: [
      '`const int *p` denotes a pointer to constant integer (the value cannot be changed via p), while `int * const p` denotes a constant pointer (the pointer cannot point elsewhere)',
      'They are identical in C syntax and semantics',
      '`const int *p` is a constant pointer, while `int * const p` is a pointer to constant data',
      '`int * const p` stores the pointer in flash memory, whereas `const int *p` stores it in RAM'
    ],
    correctIndex: 0,
    explanation: 'Read right-to-left: `const int *p` -> p is a pointer to int which is const (data is read-only via p). `int * const p` -> p is a const pointer to int (the address stored in p cannot be modified, but the integer data at that address can be mutated).',
    shortcutOrInsight: 'Read right-to-left: `* const` means constant pointer; `const int *` means pointer to constant int.',
    difficulty: 'Medium'
  }
];

// ============================================================================
// C++ LANGUAGE MOCK TEST: 10 HIGH-YIELD TECHNICAL MCQs
// Modern C++ (C++11 to C++20), RAII, Smart Pointers, Move Semantics, SFINAE & STL
// ============================================================================
export const CPP_MOCK_QUESTIONS: FaangQuestion[] = [
  {
    id: 'cpp-q1',
    testId: 'mock-cpp-programming',
    section: 'Modern C++ Systems',
    companyTag: 'Bloomberg Core Engineering',
    question: 'What is the primary difference between `std::move` and `std::forward` in modern C++?',
    options: [
      '`std::move` unconditionally casts its argument to an rvalue reference, while `std::forward` conditionally casts to an rvalue reference only if the original argument was an rvalue (perfect forwarding)',
      '`std::move` physically copies data into registers, while `std::forward` allocates dynamic heap memory',
      '`std::move` destroys the source object, while `std::forward` keeps both copies synchronized',
      '`std::forward` can only be used with primitive integers, while `std::move` operates on classes'
    ],
    correctIndex: 0,
    explanation: '`std::move(x)` is an unconditional static_cast: `static_cast<std::remove_reference_t<T>&&>(x)`. `std::forward<T>(x)` preserves the original value category (lvalue or rvalue) of the template parameter `T`, enabling perfect forwarding inside generic template functions.',
    shortcutOrInsight: '`std::move` is an unconditional rvalue cast; `std::forward` is a conditional cast that preserves the exact lvalue/rvalue type.',
    difficulty: 'Very Hard'
  },
  {
    id: 'cpp-q2',
    testId: 'mock-cpp-programming',
    section: 'Modern C++ Systems',
    companyTag: 'Google C++ Core',
    question: 'Why should a base class intended for polymorphic usage always have a `virtual` destructor in C++?',
    options: [
      'To prevent object slicing when passing derived objects by value',
      'To ensure that deleting a derived object through a base class pointer invokes the derived class destructor, preventing resource leaks and undefined behavior',
      'To allow the base class to be instantiated as an abstract class',
      'To force the compiler to place the object entirely in heap memory'
    ],
    correctIndex: 1,
    explanation: 'If a derived class object is deleted via a pointer to its base class (`Base *p = new Derived(); delete p;`), and `Base` does not have a virtual destructor, the C++ standard states the behavior is undefined. The derived destructor will not execute, leaking any derived-specific resources (file descriptors, allocated buffers).',
    shortcutOrInsight: 'Virtual destructor rule: If any method in your class is virtual, its destructor MUST be virtual.',
    difficulty: 'Hard'
  },
  {
    id: 'cpp-q3',
    testId: 'mock-cpp-programming',
    section: 'Modern C++ Systems',
    companyTag: 'Uber Systems Engineering',
    question: 'What will happen when you execute the following C++ code?\n```cpp\nstd::shared_ptr<int> sp1 = std::make_shared<int>(100);\nstd::weak_ptr<int> wp = sp1;\nsp1.reset();\nif (auto sp2 = wp.lock()) {\n    std::cout << *sp2;\n} else {\n    std::cout << "Expired";\n}\n```',
    options: [
      'Prints "100"',
      'Prints "Expired"',
      'Throws `std::bad_weak_ptr` exception',
      'Segmentation fault'
    ],
    correctIndex: 1,
    explanation: '`std::weak_ptr` observes a `shared_ptr` without incrementing its strong reference count. Calling `sp1.reset()` reduces the strong reference count to 0, destroying the managed integer. Calling `wp.lock()` returns an empty `shared_ptr` because the resource is expired, leading into the `else` branch which prints "Expired".',
    shortcutOrInsight: '`wp.lock()` returns an empty `shared_ptr` if strong ref count is 0, avoiding dangling dereferences.',
    difficulty: 'Hard'
  },
  {
    id: 'cpp-q4',
    testId: 'mock-cpp-programming',
    section: 'Modern C++ Systems',
    companyTag: 'Microsoft Windows Core',
    question: 'How does C++ solve the "Diamond Problem" of multiple inheritance (where Class D inherits from B and C, which both inherit from A)?',
    options: [
      'By using `virtual` base inheritance (`class B : virtual public A`) so that only a single shared instance of A is created in D',
      'By declaring all member variables in A as `static`',
      'By overriding the copy constructor in Class D',
      'C++ prohibits multiple inheritance and forces interfaces'
    ],
    correctIndex: 0,
    explanation: 'Virtual inheritance (`virtual public Base`) ensures that only one shared sub-object of the common base class `A` is included in the most derived class `D`, eliminating duplicate member ambiguity and layout bloat.',
    shortcutOrInsight: 'Virtual base classes ensure a single unified base sub-object is instantiated in diamond inheritance hierarchies.',
    difficulty: 'Medium'
  },
  {
    id: 'cpp-q5',
    testId: 'mock-cpp-programming',
    section: 'Modern C++ Systems',
    companyTag: 'DE Shaw / Tower Research',
    question: 'What causes iterator invalidation in a `std::vector<int>` during an `emplace_back` or `push_back` operation?',
    options: [
      'Any insertion always invalidates all iterators regardless of capacity',
      'When the current `size()` exceeds `capacity()`, triggering re-allocation of a larger heap block and moving all elements to the new address',
      'Only iterators pointing to elements before the insertion point are invalidated',
      'Vector iterators never get invalidated because vector is contiguous'
    ],
    correctIndex: 1,
    explanation: 'When `vector::size() == vector::capacity()`, inserting a new element triggers reallocation. A new contiguous memory block (typically 1.5x or 2x size) is allocated, existing elements are moved/copied, and the old buffer is deallocated. Any existing pointers, references, or iterators pointing into the old buffer become dangling and invalid.',
    shortcutOrInsight: '`reserve(N)` prevents vector iterator invalidation by pre-allocating sufficient capacity ahead of time.',
    difficulty: 'Hard'
  },
  {
    id: 'cpp-q6',
    testId: 'mock-cpp-programming',
    section: 'Modern C++ Systems',
    companyTag: 'Meta C++ Infra',
    question: 'What is the meaning of the `noexcept` specifier in a move constructor in C++?',
    options: [
      'It informs the compiler and standard containers (like `std::vector`) that the move constructor will never throw an exception, allowing `std::vector` to safely use move operations instead of copying during reallocations',
      'It disables stack unwinding across the entire operating system',
      'It prevents any variables within the constructor from being modified',
      'It converts runtime errors into compilation warnings'
    ],
    correctIndex: 0,
    explanation: 'Standard library containers guarantee the strong exception guarantee. If a move constructor is not marked `noexcept`, `std::vector` during reallocation will fall back to calling the copy constructor to ensure no state is lost if an exception occurs mid-move. Marking it `noexcept` unlocks high-performance move optimizations.',
    shortcutOrInsight: 'Always mark move constructors `noexcept` so `std::vector` can move rather than copy during reallocation.',
    difficulty: 'Very Hard'
  },
  {
    id: 'cpp-q7',
    testId: 'mock-cpp-programming',
    section: 'Modern C++ Systems',
    companyTag: 'Palantir Technologies',
    question: 'In modern C++ RAII (Resource Acquisition Is Initialization), which construct is preferred over `new` and `delete` for exclusive resource ownership?',
    options: [
      '`std::auto_ptr`',
      '`std::unique_ptr` with `std::make_unique`',
      '`malloc` and `free`',
      '`std::vector<void*>`'
    ],
    correctIndex: 1,
    explanation: '`std::unique_ptr` provides zero-overhead, move-only exclusive ownership of heap resources. When the `unique_ptr` leaves scope, its destructor automatically frees the managed resource. `std::make_unique` (C++14) guarantees exception safety and avoids naked `new` expressions.',
    shortcutOrInsight: 'Modern C++ idiom: Zero naked `new`/`delete`; use `std::make_unique` for unique ownership.',
    difficulty: 'Medium'
  },
  {
    id: 'cpp-q8',
    testId: 'mock-cpp-programming',
    section: 'Modern C++ Systems',
    companyTag: 'Adobe Systems',
    question: 'What is the acronym SFINAE in C++ template metaprogramming?',
    options: [
      'Substitution Failure Is Not An Error',
      'Standard Function Interface Native Application Engine',
      'Static Functional Iteration Named Algorithm Environment',
      'Synchronous File Input Native Architecture Execution'
    ],
    correctIndex: 0,
    explanation: 'SFINAE stands for "Substitution Failure Is Not An Error". If an invalid type or expression occurs during template argument deduction and substitution for an overload, the compiler does not emit a compile error; instead, it simply discards that candidate overload and continues searching other overloads.',
    shortcutOrInsight: 'SFINAE enables `std::enable_if` and type traits to enable or disable function templates based on compile-time type properties.',
    difficulty: 'Very Hard'
  },
  {
    id: 'cpp-q9',
    testId: 'mock-cpp-programming',
    section: 'Modern C++ Systems',
    companyTag: 'Apple Silicon Architecture',
    question: 'What is the time complexity of lookup, insertion, and deletion in a `std::map` versus a `std::unordered_map` in C++?',
    options: [
      '`std::map` is O(log n) (implemented via Red-Black Tree); `std::unordered_map` has average O(1) time (implemented via Hash Table)',
      '`std::map` is O(1); `std::unordered_map` is O(log n)',
      'Both have identical O(n) average complexity',
      '`std::map` is O(n); `std::unordered_map` is O(1)'
    ],
    correctIndex: 0,
    explanation: '`std::map` is an ordered associative container backed by a self-balancing binary search tree (typically Red-Black Tree), ensuring guaranteed O(log n) search, insert, and delete. `std::unordered_map` is backed by a chained hash table with average O(1) time complexity (worst case O(n) on hash collision clustering).',
    shortcutOrInsight: 'Ordered keys? -> `std::map` (O(log n)). Speed priority with good hash? -> `std::unordered_map` (avg O(1)).',
    difficulty: 'Medium'
  },
  {
    id: 'cpp-q10',
    testId: 'mock-cpp-programming',
    section: 'Modern C++ Systems',
    companyTag: 'Amazon AWS SDE',
    question: 'What does the `constexpr` keyword indicate when applied to a C++ function?',
    options: [
      'The function must be evaluated exclusively at runtime with constant CPU clocks',
      'The function can be evaluated at compile time if all its arguments are compile-time constants, enabling zero-runtime-overhead computations',
      'The function can never return an integer',
      'The function is executed in a detached background thread'
    ],
    correctIndex: 1,
    explanation: '`constexpr` specifies that the value of an object or the return value of a function can be evaluated at compile-time when constant expressions are passed as arguments. This allows array dimension sizing, static assertions, and lookup table calculations to occur during compilation.',
    shortcutOrInsight: '`constexpr` enables compile-time evaluation, shifting runtime calculations into the compilation phase.',
    difficulty: 'Medium'
  }
];

// ============================================================================
// JAVA LANGUAGE MOCK TEST: 10 HIGH-YIELD TECHNICAL MCQs
// JVM internals, Garbage Collection, Multithreading, Collections & Modern Java
// ============================================================================
export const JAVA_MOCK_QUESTIONS: FaangQuestion[] = [
  {
    id: 'java-q1',
    testId: 'mock-java-programming',
    section: 'Java Enterprise Systems',
    companyTag: 'Goldman Sachs Java Core',
    question: 'How does Java 8+ `HashMap` handle bucket collisions when the number of key-value nodes in a single bucket reaches the TREEIFY_THRESHOLD (8)?',
    options: [
      'It converts the linked list bucket into a balanced Red-Black Tree (TreeNode) in O(log n) time, provided table capacity is at least 64',
      'It doubles the entire JVM heap space instantly',
      'It throws a `ConcurrentModificationException`',
      'It replaces the oldest entry using an LRU eviction strategy'
    ],
    correctIndex: 0,
    explanation: 'In Java 8+, when a `HashMap` bucket length reaches 8 (`TREEIFY_THRESHOLD`) and total table capacity is at least 64 (`MIN_TREEIFY_CAPACITY`), the linked list is transformed into a balanced Red-Black Tree. This reduces worst-case collision lookup complexity from O(n) down to O(log n), defending against hash collision DDoS attacks.',
    shortcutOrInsight: 'Treeify threshold = 8 (converts list to Red-Black Tree in O(log n)). Untreeify threshold = 6 (converts back to list).',
    difficulty: 'Very Hard'
  },
  {
    id: 'java-q2',
    testId: 'mock-java-programming',
    section: 'Java Enterprise Systems',
    companyTag: 'Morgan Stanley Core Java',
    question: 'What guarantees does the `volatile` keyword provide in Java multi-threaded memory models?',
    options: [
      'Atomicity of compound operations (like `count++`) and mutual exclusion locks',
      'Visibility (any write to a volatile variable is immediately flushed to main memory and visible to all threads) and happens-before instruction ordering (prevents compiler reordering)',
      'Thread serialization and deadlock prevention',
      'Automatic garbage collection suppression'
    ],
    correctIndex: 1,
    explanation: 'In the Java Memory Model (JMM), `volatile` guarantees visibility (all reads/writes go directly to main memory, bypassing CPU L1/L2 caches) and prevents instruction reordering around volatile read/write barriers. Crucially, it does NOT guarantee atomicity for non-atomic operations such as `i++`. For atomicity, `AtomicInteger` or `synchronized` is required.',
    shortcutOrInsight: '`volatile` = Visibility + Happens-Before Ordering. It does NOT make `count++` atomic!',
    difficulty: 'Hard'
  },
  {
    id: 'java-q3',
    testId: 'mock-java-programming',
    section: 'Java Enterprise Systems',
    companyTag: 'Amazon Java Backend',
    question: 'What is the output of the following Java snippet regarding the String Constant Pool?\n```java\nString s1 = "Placement";\nString s2 = "Placement";\nString s3 = new String("Placement");\nSystem.out.println((s1 == s2) + " " + (s1 == s3) + " " + (s1.equals(s3)));\n```',
    options: [
      'true false true',
      'true true true',
      'false false true',
      'true false false'
    ],
    correctIndex: 0,
    explanation: '`s1` and `s2` refer to string literals stored in the String Constant Pool in the JVM Metaspace/Heap, so `s1 == s2` evaluates to `true` (same reference). `s3` is created using `new String(...)`, which explicitly allocates a new distinct object on the Java heap, so `s1 == s3` is `false`. However, `.equals()` compares character content, which is identical, so `s1.equals(s3)` is `true`.',
    shortcutOrInsight: '`==` compares memory references; `.equals()` compares content. String literals share constant pool entries.',
    difficulty: 'Medium'
  },
  {
    id: 'java-q4',
    testId: 'mock-java-programming',
    section: 'Java Enterprise Systems',
    companyTag: 'Walmart Global Tech',
    question: 'What is "Type Erasure" in Java Generics?',
    options: [
      'The process where the JVM deletes unreferenced classes during garbage collection',
      'The mechanism by which generic type information (e.g. `List<String>`) is enforced at compile-time and then removed/erased from the bytecode, replacing types with raw types (`Object` or bounds)',
      'The conversion of primitive data types into their respective Wrapper classes',
      'An error caused by casting between incompatible generic interfaces'
    ],
    correctIndex: 1,
    explanation: 'Java implemented Generics in Java 5 with backward compatibility in mind. The Java compiler performs strict type checking during compilation, inserts explicit casts into bytecode, and then "erases" type parameters, replacing them with their upper bound (or `Object`). Consequently, `List<Integer>` and `List<String>` share the exact same runtime class (`List.class`).',
    shortcutOrInsight: 'Type Erasure ensures backward compatibility: Generics exist at compile-time; at runtime bytecode sees raw types.',
    difficulty: 'Hard'
  },
  {
    id: 'java-q5',
    testId: 'mock-java-programming',
    section: 'Java Enterprise Systems',
    companyTag: 'Oracle Server Technologies',
    question: 'In Java Garbage Collection, which memory region in the JVM Heap is responsible for surviving objects that have cleared multiple minor GC collection cycles?',
    options: [
      'Eden Space',
      'Survivor Space (S0/S1)',
      'Tenured / Old Generation',
      'Metaspace'
    ],
    correctIndex: 2,
    explanation: 'In generational garbage collection: Newly allocated objects reside in the Young Generation\'s Eden space. Surviving minor collections, they move between Survivor spaces (S0 and S1). Once an object survives a specific aging threshold (default tenuring threshold is typically 15), it is promoted to the Tenured (Old) Generation.',
    shortcutOrInsight: 'Object lifecycle: Eden -> Survivor (S0/S1) -> Tenured / Old Generation (after crossing age threshold).',
    difficulty: 'Hard'
  },
  {
    id: 'java-q6',
    testId: 'mock-java-programming',
    section: 'Java Enterprise Systems',
    companyTag: 'JPMorgan Chase',
    question: 'What interface must a custom resource implement to be eligible for automatic closure in Java\'s `try-with-resources` construct?',
    options: [
      '`java.lang.AutoCloseable` (or `java.io.Closeable`)',
      '`java.io.Serializable`',
      '`java.lang.Cloneable`',
      '`java.lang.Runnable`'
    ],
    correctIndex: 0,
    explanation: 'Java 7 introduced `try-with-resources`. Any resource declared in the try parentheses must implement `java.lang.AutoCloseable` (which defines `void close() throws Exception`). The JVM automatically invokes `.close()` when exiting the try block, even if an exception is thrown.',
    shortcutOrInsight: 'Try-with-resources requires `AutoCloseable` to guarantee deterministic resource deallocation without manual finally blocks.',
    difficulty: 'Medium'
  },
  {
    id: 'java-q7',
    testId: 'mock-java-programming',
    section: 'Java Enterprise Systems',
    companyTag: 'Adobe Java Services',
    question: 'What happens when a static method in a parent class is declared with the exact same signature in a child class in Java?',
    options: [
      'The parent method is polymorphically overridden',
      'The parent method is hidden ("Method Hiding"), resolved at compile-time based on reference type, not runtime object type',
      'A compile-time error is thrown',
      'The child method is ignored and the parent method is always called'
    ],
    correctIndex: 1,
    explanation: 'Static methods belong to the class rather than instance objects. When a subclass defines a static method with the same signature as a superclass static method, it is "Method Hiding", NOT method overriding. The method called is determined statically at compile time by the reference type.',
    shortcutOrInsight: 'Static methods CANNOT be overridden; they are hidden. Method resolution depends on reference type.',
    difficulty: 'Hard'
  },
  {
    id: 'java-q8',
    testId: 'mock-java-programming',
    section: 'Java Enterprise Systems',
    companyTag: 'Salesforce Core Architecture',
    question: 'What is the key difference between intermediate and terminal operations in the Java 8 Stream API?',
    options: [
      'Intermediate operations are executed immediately, while terminal operations are deferred',
      'Intermediate operations are lazy and return a new Stream without executing until a terminal operation is invoked to produce a non-stream result or side-effect',
      'Intermediate operations modify the backing source collection in-place',
      'Streams cannot chain multiple intermediate operations'
    ],
    correctIndex: 1,
    explanation: 'Java Streams are pipeline-based and lazily evaluated. Intermediate operations (like `.filter()`, `.map()`, `.sorted()`) do not process any data when called; they construct a query pipeline. Data traversal only commences when a terminal operation (such as `.collect()`, `.forEach()`, `.count()`, `.findFirst()`) is triggered.',
    shortcutOrInsight: 'Stream pipeline: Intermediate operations are lazy blueprints; terminal operations initiate execution.',
    difficulty: 'Medium'
  },
  {
    id: 'java-q9',
    testId: 'mock-java-programming',
    section: 'Java Enterprise Systems',
    companyTag: 'Uber Mobility Platform',
    question: 'Why must `equals()` and `hashCode()` always be overridden together according to the official Java contract?',
    options: [
      'If two objects are equal according to `equals()`, they MUST produce the exact same integer from `hashCode()`, otherwise hash-based collections (`HashMap`, `HashSet`) will fail to find existing keys',
      'The compiler will reject the file if only one method is declared',
      '`hashCode()` returns the object\'s 64-bit physical memory address',
      'Overriding both allows objects to be cloned automatically'
    ],
    correctIndex: 0,
    explanation: 'The `java.lang.Object` contract stipulates: If `o1.equals(o2)` is true, then `o1.hashCode() == o2.hashCode()` must be strictly true. Violating this breaks hash tables: when retrieving `map.get(key)`, the key may be hashed to a different bucket than where it was originally stored, returning `null` even though the key exists.',
    shortcutOrInsight: 'Equals-HashCode Contract: Equal objects must have equal hash codes; unequal hash codes guarantee unequal objects.',
    difficulty: 'Hard'
  },
  {
    id: 'java-q10',
    testId: 'mock-java-programming',
    section: 'Java Enterprise Systems',
    companyTag: 'Cisco Core Networking',
    question: 'What is the purpose of the Java `Record` feature introduced in Java 14+?',
    options: [
      'To provide a concise syntax for declaring immutable data carrier classes with auto-generated constructor, getters, `equals()`, `hashCode()`, and `toString()`',
      'To record audio streams for multimedia streaming',
      'To persist data directly into relational database tables without an ORM',
      'To replace Java interfaces with dynamic traits'
    ],
    correctIndex: 0,
    explanation: '`record Point(int x, int y) {}` defines a transparent, immutable data carrier. The Java compiler automatically synthesizes private final fields, canonical constructor, accessor methods (`x()`, `y()`), `equals()`, `hashCode()`, and `toString()`, drastically cutting boilerplate.',
    shortcutOrInsight: 'Java Records = Immutable data transfer objects with zero boilerplate constructors, accessors, and hashing.',
    difficulty: 'Medium'
  }
];

// ============================================================================
// PYTHON LANGUAGE MOCK TEST: 10 HIGH-YIELD TECHNICAL MCQs
// Memory model, GIL, Metaclasses, Generators, Decorators, Closures & Dunder Methods
// ============================================================================
export const PYTHON_MOCK_QUESTIONS: FaangQuestion[] = [
  {
    id: 'py-q1',
    testId: 'mock-python-programming',
    section: 'Python Systems & AI',
    companyTag: 'Google DeepMind / Meta AI',
    question: 'What is the danger of using a mutable default argument (such as a list or dictionary) in a Python function definition?\n```python\ndef append_item(val, target_list=[]):\n    target_list.append(val)\n    return target_list\n```',
    options: [
      'The default list is instantiated only once when the function is defined, persisting modifications across all subsequent calls that omit the argument',
      'It triggers a syntax error in Python 3',
      'Python creates a deep copy of the list on every function invocation',
      'The garbage collector clears the default argument after every call'
    ],
    correctIndex: 0,
    explanation: 'In Python, default arguments are evaluated once at module load time when the `def` statement executes, not each time the function is called. The default `target_list` object is bound to the function\'s `__defaults__` tuple. Calling `append_item(1)` then `append_item(2)` returns `[1, 2]`. The idiomatic fix is `def append_item(val, target_list=None): if target_list is None: target_list = []`.',
    shortcutOrInsight: 'Mutable Default Argument Trap: Default arguments are evaluated ONCE at function definition. Always use `None` as default.',
    difficulty: 'Very Hard'
  },
  {
    id: 'py-q2',
    testId: 'mock-python-programming',
    section: 'Python Systems & AI',
    companyTag: 'OpenAI Core Infra',
    question: 'What is the Global Interpreter Lock (GIL) in standard CPython, and what is its consequence on multithreaded CPU-bound tasks?',
    options: [
      'It is a mutex that prevents multiple native OS threads from executing Python bytecode simultaneously, meaning CPU-bound multithreaded tasks do not achieve multi-core parallel speedup',
      'It prevents Python from connecting to databases across the internet',
      'It is a security mechanism that encrypts local Python source files',
      'It guarantees that Python dictionaries never suffer hash collisions'
    ],
    correctIndex: 0,
    explanation: 'The CPython Global Interpreter Lock (GIL) protects CPython\'s non-thread-safe memory management (such as reference counting). Because only one thread can hold the GIL at any instant, CPU-bound Python threads run sequentially on a single core. To achieve true multi-core parallelism for CPU-bound tasks, developers use the `multiprocessing` module, C extensions, or Python 3.13 free-threaded builds.',
    shortcutOrInsight: 'GIL consequence: Python threads work great for I/O-bound tasks, but CPU-bound tasks require `multiprocessing` for multi-core scaling.',
    difficulty: 'Hard'
  },
  {
    id: 'py-q3',
    testId: 'mock-python-programming',
    section: 'Python Systems & AI',
    companyTag: 'Netflix Streaming Data',
    question: 'What is the memory and evaluation difference between a List Comprehension `[x*x for x in range(1000000)]` and a Generator Expression `(x*x for x in range(1000000))` in Python?',
    options: [
      'The list comprehension allocates all 1,000,000 computed items immediately in memory (O(n) space), while the generator expression yields items lazily on-demand using O(1) auxiliary memory',
      'The generator expression evaluates faster because it runs on GPU hardware',
      'The list comprehension is lazy, whereas the generator expression is eager',
      'They produce identical bytecode and occupy identical RAM'
    ],
    correctIndex: 0,
    explanation: 'List comprehensions eagerly create and populate an entire list object in memory, demanding substantial RAM for large collections. Generator expressions return a generator iterator object that computes each value on-the-fly via the iterator protocol (`__next__`), maintaining O(1) memory overhead regardless of input size.',
    shortcutOrInsight: 'Generators evaluate lazily on-demand with O(1) memory; list comprehensions compute eagerly with O(N) space.',
    difficulty: 'Medium'
  },
  {
    id: 'py-q4',
    testId: 'mock-python-programming',
    section: 'Python Systems & AI',
    companyTag: 'Stripe Engineering',
    question: 'What is the output of the following closure in Python?\n```python\ndef multiplier_factory():\n    return [lambda x: i * x for i in range(4)]\n\nfunctions = multiplier_factory()\nprint([f(2) for f in functions])\n```',
    options: [
      '[6, 6, 6, 6]',
      '[0, 2, 4, 6]',
      '[0, 1, 2, 3]',
      '[2, 4, 6, 8]'
    ],
    correctIndex: 0,
    explanation: 'Python closures are late-binding: the variable `i` inside the lambda is looked up in the surrounding scope when the function is called, not when it is defined. By the time the loop completes in `multiplier_factory()`, `i` has reached its final value of 3. Thus, all 4 lambdas evaluate `3 * 2 = 6`, yielding `[6, 6, 6, 6]`. To bind early, default args are used: `lambda x, i=i: i * x`.',
    shortcutOrInsight: 'Late-binding closures: Lambda variables look up values at call-time. Fix with default arguments: `lambda x, i=i: i * x`.',
    difficulty: 'Very Hard'
  },
  {
    id: 'py-q5',
    testId: 'mock-python-programming',
    section: 'Python Systems & AI',
    companyTag: 'Databricks Spark Engine',
    question: 'What is the distinction between `__new__` and `__init__` in Python object construction?',
    options: [
      '`__new__` is the static method that actually allocates and returns the new class instance, while `__init__` initializes the created instance with attributes',
      '`__init__` allocates the memory, and `__new__` destroys it upon garbage collection',
      '`__new__` is only used for dictionary keys, whereas `__init__` is for lists',
      '`__new__` is invoked after `__init__` finishes execution'
    ],
    correctIndex: 0,
    explanation: '`__new__(cls, ...)` is the true constructor in Python: it is responsible for creating and returning a new instance of the class `cls`. Once the instance is created, Python automatically passes it as `self` to `__init__(self, ...)`, which serves as an initializer. Overriding `__new__` is necessary when customizing immutable types (like `tuple` or `str`) or implementing Singleton patterns.',
    shortcutOrInsight: '`__new__` creates and returns the instance object; `__init__` receives the created instance and initializes its state.',
    difficulty: 'Hard'
  },
  {
    id: 'py-q6',
    testId: 'mock-python-programming',
    section: 'Python Systems & AI',
    companyTag: 'Spotify Machine Learning',
    question: 'Which built-in Python module provides a C-level hash table counter for frequency tracking and multiset operations?',
    options: [
      '`collections.Counter`',
      '`itertools.count`',
      '`functools.lru_cache`',
      '`math.fsum`'
    ],
    correctIndex: 0,
    explanation: '`collections.Counter` is a subclass of `dict` specifically engineered for tallying hashable objects. It returns 0 for missing keys rather than raising `KeyError`, and supports arithmetic operations like union, intersection, and addition.',
    shortcutOrInsight: 'Use `collections.Counter` for O(N) frequency counts and multi-set operations.',
    difficulty: 'Medium'
  },
  {
    id: 'py-q7',
    testId: 'mock-python-programming',
    section: 'Python Systems & AI',
    companyTag: 'LinkedIn Backend',
    question: 'What is the purpose of the `functools.wraps` decorator when writing custom function decorators in Python?',
    options: [
      'It copies original function metadata (such as `__name__`, `__doc__`, and `__annotations__`) to the wrapper function, preventing introspection breakdown',
      'It converts the decorator into C bytecode for faster execution',
      'It ensures the decorated function can only be executed once',
      'It enforces static type checking at runtime'
    ],
    correctIndex: 0,
    explanation: 'When wrapping a function with a decorator, the returned wrapper function typically replaces the original function\'s `__name__` and `__doc__` with those of the wrapper. Applying `@functools.wraps(func)` preserves the original function\'s identity, docstrings, and signatures, which is vital for debugging, logging, and documentation tools.',
    shortcutOrInsight: 'Always decorate wrappers with `@functools.wraps(func)` to preserve function metadata.',
    difficulty: 'Hard'
  },
  {
    id: 'py-q8',
    testId: 'mock-python-programming',
    section: 'Python Systems & AI',
    companyTag: 'Uber AI / PyTorch Team',
    question: 'What is the behavior of the `is` operator compared to the `==` operator in Python?',
    options: [
      '`is` checks identity (whether two variables refer to the exact same memory address in RAM), while `==` checks equality of values',
      '`is` checks value equality; `==` checks reference identity',
      'Both operators are strictly synonymous in Python 3',
      '`is` can only be used with Boolean variables'
    ],
    correctIndex: 0,
    explanation: '`a is b` evaluates to `id(a) == id(b)` (identity check: they are the exact same object in memory). `a == b` invokes the object\'s `__eq__()` method to determine if the values represented by the objects are logically equal. For singleton objects like `None`, idiomatic Python mandates `x is None`.',
    shortcutOrInsight: '`is` tests object identity (`id(a) == id(b)`); `==` tests semantic value equality (`a.__eq__(b)`).',
    difficulty: 'Medium'
  },
  {
    id: 'py-q9',
    testId: 'mock-python-programming',
    section: 'Python Systems & AI',
    companyTag: 'Airbnb Engineering',
    question: 'What methods must a Python class implement to support the context manager protocol (`with` statement)?',
    options: [
      '`__enter__` and `__exit__`',
      '`__open__` and `__close__`',
      '`__start__` and `__stop__`',
      '`__before__` and `__after__`'
    ],
    correctIndex: 0,
    explanation: 'The Python context management protocol mandates two dunder methods: `__enter__(self)` (executed upon entering the `with` block, its return value bound to the `as` target) and `__exit__(self, exc_type, exc_val, exc_tb)` (executed upon exiting, handling cleanup and exception suppression).',
    shortcutOrInsight: 'Context manager protocol: `__enter__` acquires resources, `__exit__` guarantees deterministic cleanup.',
    difficulty: 'Medium'
  },
  {
    id: 'py-q10',
    testId: 'mock-python-programming',
    section: 'Python Systems & AI',
    companyTag: 'Meta Python Infrastructure',
    question: 'What is the Method Resolution Order (MRO) algorithm utilized by modern Python to handle multiple inheritance hierarchies?',
    options: [
      'C3 Linearization',
      'Depth-First Search with Left-to-Right Priority',
      'Dijkstra\'s Shortest Path',
      'Breadth-First Search with Right-to-Left Priority'
    ],
    correctIndex: 0,
    explanation: 'Python 2.3+ utilizes the C3 Linearization algorithm to determine the Method Resolution Order (MRO). C3 guarantees monotonicity (subclasses precede superclasses) and preserves local precedence order across multiple inheritance hierarchies without ambiguity.',
    shortcutOrInsight: 'Python uses C3 Linearization to compute MRO, inspectable at runtime via `ClassName.__mro__`.',
    difficulty: 'Very Hard'
  }
];

// ============================================================================
// DSA MOCK TEST: 10 HIGH-YIELD TECHNICAL MCQs
// Advanced Data Structures, Trees, Graphs, Dynamic Programming & Amortized Complexity
// ============================================================================
export const DSA_MOCK_QUESTIONS: FaangQuestion[] = [
  {
    id: 'dsa-q1',
    testId: 'mock-dsa-algorithms',
    section: 'Data Structures & Algorithms',
    companyTag: 'Google SWE OA',
    question: 'In a self-balancing AVL Tree, what rotation sequence is required to restore balance when an insertion occurs into the right subtree of the left child of a node (Left-Right imbalance)?',
    options: [
      'Left rotation on the left child, followed by Right rotation on the unbalanced parent node (LR Double Rotation)',
      'Right rotation on the left child, followed by Left rotation on the parent',
      'Single Left rotation on the parent node',
      'Single Right rotation on the parent node'
    ],
    correctIndex: 0,
    explanation: 'An AVL tree Left-Right (LR) imbalance occurs when node P has balance factor +2 and its left child L has balance factor -1. Resolution requires a double rotation: First perform a Left Rotation on child L to convert the configuration into a Left-Left (LL) case, and then perform a Right Rotation on parent P.',
    shortcutOrInsight: 'LR imbalance fix: Rotate child Left -> converts to LL -> Rotate parent Right.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dsa-q2',
    testId: 'mock-dsa-algorithms',
    section: 'Data Structures & Algorithms',
    companyTag: 'Amazon SDE II',
    question: 'What is the tightest time complexity to find the Shortest Path from a single source to all vertices in a directed graph with V vertices and E edges containing negative edge weights but no negative-weight cycles?',
    options: [
      'O(V · E) using the Bellman-Ford Algorithm',
      'O(E + V log V) using Dijkstra\'s Algorithm with Fibonacci Heap',
      'O(V^3) using Floyd-Warshall Algorithm',
      'O(V + E) using Breadth-First Search'
    ],
    correctIndex: 0,
    explanation: 'Dijkstra\'s algorithm fails when negative edge weights are present because its greedy assumption (that a finalized distance is optimal) is invalidated. The Bellman-Ford algorithm relaxes all E edges (V - 1) times, correctly computing single-source shortest paths in O(V · E) time and detecting negative cycles.',
    shortcutOrInsight: 'Negative edge weights? Dijkstra is INVALID. Use Bellman-Ford in O(V · E) time.',
    difficulty: 'Hard'
  },
  {
    id: 'dsa-q3',
    testId: 'mock-dsa-algorithms',
    section: 'Data Structures & Algorithms',
    companyTag: 'Microsoft OA',
    question: 'In the Disjoint Set Union (DSU / Union-Find) data structure, what is the nearly constant amortized time complexity per operation when both Path Compression and Union by Rank (or Size) are implemented?',
    options: [
      'O(α(N)), where α is the Inverse Ackermann Function (practically ≤ 4 for all universe sizes)',
      'O(log N)',
      'O(1) strict worst-case',
      'O(N)'
    ],
    correctIndex: 0,
    explanation: 'Tarjan proved that combining Path Compression with Union by Rank yields an amortized time complexity of O(α(N)) per operation, where α(N) is the inverse Ackermann function. For any conceivable input size (even N = 10^80, the number of atoms in the observable universe), α(N) < 5.',
    shortcutOrInsight: 'DSU with rank + path compression = O(α(N)) amortized time (effectively O(1)).',
    difficulty: 'Hard'
  },
  {
    id: 'dsa-q4',
    testId: 'mock-dsa-algorithms',
    section: 'Data Structures & Algorithms',
    companyTag: 'Meta Core Infra',
    question: 'What is the time complexity to build a Binary Min-Heap of N arbitrary elements using the bottom-up `heapify` (sift-down) algorithm compared to inserting elements one by one?',
    options: [
      'O(N) for bottom-up heapify vs O(N log N) for N sequential insertions',
      'O(N log N) for both methods',
      'O(N^2) for heapify vs O(N) for insertions',
      'O(log N) for both methods'
    ],
    correctIndex: 0,
    explanation: 'Bottom-up heap construction runs sift-down starting from non-leaf nodes at level (N/2 down to 1). The sum of heights across all nodes is Σ (h · N / 2^(h+1)) = N · Σ (h / 2^(h+1)), which converges mathematically to O(N). In contrast, inserting N elements one-by-one into an initially empty heap incurs O(N log N) worst-case time.',
    shortcutOrInsight: 'Building a heap bottom-up takes linear O(N) time because the majority of nodes are near the leaves with tiny heights.',
    difficulty: 'Very Hard'
  },
  {
    id: 'dsa-q5',
    testId: 'mock-dsa-algorithms',
    section: 'Data Structures & Algorithms',
    companyTag: 'Uber Dispatch Routing',
    question: 'Which algorithmic paradigm and data structure should be used to solve the "Sliding Window Maximum" problem for an array of size N and window size K in strict O(N) total time?',
    options: [
      'Monotonic Deque (Double-Ended Queue) storing indices with elements in decreasing order',
      'Min-Heap priority queue of size K in O(N log K) time',
      'Nested loops comparing elements in O(N · K) time',
      'Binary Search Tree storing window elements in O(N log K) time'
    ],
    correctIndex: 0,
    explanation: 'A monotonic decreasing deque maintains candidate maximums for the current sliding window. As the window moves: (1) evict indices that fell out of window range from the front, (2) pop smaller elements from the back before pushing the new element, and (3) the maximum element is always at the front in O(1). Since each index is pushed and popped at most once, total time across all N elements is strictly O(N).',
    shortcutOrInsight: 'Sliding window extrema -> Monotonic Deque provides strict linear O(N) execution.',
    difficulty: 'Hard'
  },
  {
    id: 'dsa-q6',
    testId: 'mock-dsa-algorithms',
    section: 'Data Structures & Algorithms',
    companyTag: 'Apple CoreOS',
    question: 'How does Kahn\'s Algorithm perform Topological Sorting on a Directed Acyclic Graph (DAG)?',
    options: [
      'It computes the in-degree of all vertices, enqueues all vertices with in-degree 0, and repeatedly dequeues a vertex while decrementing the in-degree of its neighbors and enqueuing new 0 in-degree vertices',
      'It performs Depth-First Search and inserts vertices into a queue in pre-order traversal',
      'It sorts vertices alphabetically and removes back-edges',
      'It calculates the minimum spanning tree using Kruskal\'s algorithm'
    ],
    correctIndex: 0,
    explanation: 'Kahn\'s algorithm is a BFS-based topological sorting approach: Compute in-degree for all V vertices. Push vertices with in-degree 0 to a queue. While queue is non-empty, pop vertex U, append to sorted list, and decrement in-degree for all adjacent vertices V. If a neighbor\'s in-degree drops to 0, push it. If output contains fewer than V vertices, a cycle exists.',
    shortcutOrInsight: 'Kahn\'s BFS: In-degree array + Queue. If processed vertices < V, the graph contains a cycle.',
    difficulty: 'Hard'
  },
  {
    id: 'dsa-q7',
    testId: 'mock-dsa-algorithms',
    section: 'Data Structures & Algorithms',
    companyTag: 'Goldman Sachs Strats',
    question: 'What is the primary recurrence relation for the 0/1 Knapsack Problem with weights `w[]`, values `v[]`, item count `n`, and capacity `W`?',
    options: [
      'dp[i][j] = max(dp[i-1][j], v[i-1] + dp[i-1][j - w[i-1]]) for j >= w[i-1]',
      'dp[i][j] = dp[i-1][j] + dp[i][j - w[i-1]]',
      'dp[i][j] = min(dp[i-1][j], v[i-1] + dp[i][j - w[i-1]])',
      'dp[i][j] = dp[i-1][j - 1] * v[i-1]'
    ],
    correctIndex: 0,
    explanation: 'At item `i` and remaining weight capacity `j`: We have two choices: Exclude item `i` -> value is `dp[i-1][j]`. Include item `i` (if `w[i-1] <= j`) -> value is `v[i-1] + dp[i-1][j - w[i-1]]`. Taking the maximum between these two states yields `dp[i][j] = max(dp[i-1][j], v[i-1] + dp[i-1][j - w[i-1]])`.',
    shortcutOrInsight: '0/1 Knapsack: `dp[i][j] = max(exclude, include)` where include looks up `dp[i-1][j - w[i-1]]`.',
    difficulty: 'Medium'
  },
  {
    id: 'dsa-q8',
    testId: 'mock-dsa-algorithms',
    section: 'Data Structures & Algorithms',
    companyTag: 'LinkedIn Search Systems',
    question: 'What is the time complexity of searching for a word of length L in a Trie (Prefix Tree) containing N total words?',
    options: [
      'O(L), strictly dependent on word length and independent of the total number of words N',
      'O(N · L)',
      'O(log N)',
      'O(N + L)'
    ],
    correctIndex: 0,
    explanation: 'In a Trie, traversing each character of a query string requires following a single pointer in a child array or map in O(1) time. For a string of length L, exactly L steps are performed. Hence search complexity is O(L), completely independent of how many millions of other words N are stored.',
    shortcutOrInsight: 'Trie search time = O(L) where L is string length. Extremely efficient for autocomplete and dictionary lookups.',
    difficulty: 'Medium'
  },
  {
    id: 'dsa-q9',
    testId: 'mock-dsa-algorithms',
    section: 'Data Structures & Algorithms',
    companyTag: 'Netflix Recommendation Alg',
    question: 'What is the amortized cost per append operation in a dynamic array (like `std::vector` in C++ or `list` in Python) that doubles its capacity whenever it becomes full?',
    options: [
      'O(1) amortized time, although individual worst-case resizing takes O(N)',
      'O(N) amortized time',
      'O(log N) amortized time',
      'O(N^2) amortized time'
    ],
    correctIndex: 0,
    explanation: 'Using the accounting/aggregate method: When resizing from size N to 2N, N copies are made. But this resizing happens only after N insertions. Distributing the cost of copying over the preceding N insertions adds at most 2 to 3 units of work per append. Thus, the amortized cost per append operation is strictly O(1).',
    shortcutOrInsight: 'Geometric array doubling guarantees O(1) amortized time per append.',
    difficulty: 'Hard'
  },
  {
    id: 'dsa-q10',
    testId: 'mock-dsa-algorithms',
    section: 'Data Structures & Algorithms',
    companyTag: 'Google Core Search',
    question: 'Which algorithm finds the K-th smallest element in an unsorted array of size N in expected O(N) average time without sorting the entire array?',
    options: [
      'Quickselect (Hoare\'s Selection Algorithm)',
      'Merge Sort',
      'Binary Search on indices',
      'Heap Sort'
    ],
    correctIndex: 0,
    explanation: 'Quickselect uses the partitioning logic of Quicksort. It selects a pivot, partitions the array, and inspects the pivot index. Unlike Quicksort which recurses on both halves (O(N log N)), Quickselect recurses on only the half containing the K-th index: T(N) = T(N/2) + O(N). Summing N + N/2 + N/4 + ... gives O(N) expected linear time.',
    shortcutOrInsight: 'Quickselect finds K-th order statistic in expected O(N) average time by pruning half the partition on each step.',
    difficulty: 'Hard'
  }
];

// ============================================================================
// MASTER DEFINITIONS OF THE 5 NEW PROGRAMMING MOCK TESTS
// ============================================================================
export const PROGRAMMING_MOCK_TESTS: FaangMockTest[] = [
  {
    id: 'mock-c-programming',
    title: 'C Programming Systems & Memory Crucible',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • Pointers, Memory Alignment, Structs & Undefined Behavior',
    category: 'TECHNICAL CORE',
    companyTier: 'Tier-1 Embedded & Systems',
    companies: ['Qualcomm', 'Intel', 'Texas Instruments', 'Cisco'],
    scheduledDate: 'Technical Practice • Slot C-1 (Hardware & Systems)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'c-master',
    badgeRewardName: 'C Systems Crucible Master',
    badgeIcon: '⚡',
    badgeGradient: 'from-blue-600 via-cyan-700 to-slate-950',
    certificateTitle: 'Official C Systems & Memory Architecture Credential',
    description: 'An authoritative 20-minute technical evaluation testing low-level pointer arithmetic, struct memory padding, preprocessor macro edge-cases, volatile keywords, and double-free heap management.',
    syllabusHighlights: [
      'Clockwise/Spiral Rule & Complex Function Pointer Parsing',
      '64-Bit Data Alignment & Struct Padding Math',
      '2D Array Row Arithmetic & Pointer Casting',
      'Preprocessor Macro Textual Substitution Traps',
      'Read-Only Memory Segments vs Stack Arrays (SIGSEGV)',
      'Bitwise O(1) Power-of-2 Detection (Kernighan Bit Manipulation)',
      'Volatile Keyword Semantics & Compiler Memory Barriers'
    ],
    questions: C_MOCK_QUESTIONS
  },
  {
    id: 'mock-cpp-programming',
    title: 'C++ Modern Systems & Architecture Mock Test',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • RAII, Smart Pointers, Move Semantics, SFINAE & STL',
    category: 'TECHNICAL CORE',
    companyTier: 'Tier-1 Systems & High-Frequency Trading',
    companies: ['Bloomberg', 'Google', 'Uber', 'Tower Research'],
    scheduledDate: 'Technical Practice • Slot CPP-2 (Modern Systems)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'cpp-master',
    badgeRewardName: 'C++ Modern Systems Architect',
    badgeIcon: '🛡️',
    badgeGradient: 'from-indigo-600 via-blue-700 to-purple-950',
    certificateTitle: 'Official C++ Modern Systems & RAII Credential',
    description: 'A deep-dive technical crucible testing Modern C++ features (C++11 through C++20), rvalue move semantics, perfect forwarding, smart pointer lifecycle, virtual base inheritance, and template metaprogramming.',
    syllabusHighlights: [
      'std::move vs std::forward Perfect Forwarding Invariants',
      'Virtual Destructors & Polymorphic Memory Safety',
      'std::shared_ptr vs std::weak_ptr Resource Expiration',
      'Diamond Multiple Inheritance & Virtual Base Classes',
      'Vector Reallocation & Iterator Invalidation Mechanics',
      'noexcept Move Constructors & Strong Exception Guarantees',
      'SFINAE Substitution Rules & Compile-Time Metaprogramming'
    ],
    questions: CPP_MOCK_QUESTIONS
  },
  {
    id: 'mock-java-programming',
    title: 'Java Enterprise & JVM Architecture Mock Test',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • JVM Internals, GC Generations, Concurrency & Streams',
    category: 'TECHNICAL CORE',
    companyTier: 'Tier-1 Enterprise & Fintech',
    companies: ['Goldman Sachs', 'Morgan Stanley', 'Amazon', 'Oracle'],
    scheduledDate: 'Technical Practice • Slot JAVA-3 (JVM & Enterprise)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'java-master',
    badgeRewardName: 'Java Enterprise & JVM Master',
    badgeIcon: '☕',
    badgeGradient: 'from-amber-600 via-red-700 to-orange-950',
    certificateTitle: 'Official Java Enterprise & JVM Architecture Credential',
    description: 'A rigorous evaluation covering HashMap Red-Black Tree threshold conversions, JMM volatile visibility barriers, String Constant Pool mechanics, Generics Type Erasure, and GC generational aging.',
    syllabusHighlights: [
      'HashMap Treeify (8) and Untreeify (6) Red-Black Tree Thresholds',
      'Java Memory Model (JMM) Volatile Visibility & Happens-Before',
      'String Constant Pool vs Heap Object References',
      'Generics Type Erasure & Bytecode Compilation Invariants',
      'Generational GC: Eden, Survivor (S0/S1), and Tenured Promotion',
      'AutoCloseable & Try-With-Resources Deterministic Cleanup',
      'Equals & HashCode Contract Violation in Hash Collections'
    ],
    questions: JAVA_MOCK_QUESTIONS
  },
  {
    id: 'mock-python-programming',
    title: 'Pythonic Computing & AI Systems Mock Test',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • GIL, Metaclasses, Closures, Generators & Dunder Methods',
    category: 'TECHNICAL CORE',
    companyTier: 'Tier-1 AI & Data Platforms',
    companies: ['Google DeepMind', 'Meta AI', 'OpenAI', 'Databricks'],
    scheduledDate: 'Technical Practice • Slot PY-4 (Python & AI Core)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'python-master',
    badgeRewardName: 'Pythonic & AI Engineering Master',
    badgeIcon: '🐍',
    badgeGradient: 'from-emerald-600 via-teal-700 to-slate-950',
    certificateTitle: 'Official Python Systems & Scientific Computing Credential',
    description: 'An advanced technical assessment probing Python execution internals, mutable default argument traps, Global Interpreter Lock (GIL) constraints, lazy generators, late-binding closures, and C3 MRO linearization.',
    syllabusHighlights: [
      'Mutable Default Arguments & Function __defaults__ Persistence',
      'CPython Global Interpreter Lock (GIL) Multithreading Constraints',
      'Lazy Generator Expressions vs Eager List Comprehensions',
      'Late-Binding Closures & Scope Variable Resolution',
      '__new__ Memory Allocation vs __init__ Object Initialization',
      'functools.wraps & Decorator Introspection Preservation',
      'C3 Linearization Algorithm for Method Resolution Order (MRO)'
    ],
    questions: PYTHON_MOCK_QUESTIONS
  },
  {
    id: 'mock-dsa-algorithms',
    title: 'Data Structures & Algorithms Titan Mock Test',
    subtitle: '10 High-Yield Technical MCQs • 20 Minutes • Trees, Graph Shortest Paths, DP & Amortized Complexity',
    category: 'TECHNICAL CORE',
    companyTier: 'Tier-1 FAANG & Elite Product Companies',
    companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
    scheduledDate: 'Technical Practice • Slot DSA-5 (Algorithms & Data Structures)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'dsa-master',
    badgeRewardName: 'DSA & Algorithmic Titan',
    badgeIcon: '👑',
    badgeGradient: 'from-purple-600 via-pink-600 to-indigo-950',
    certificateTitle: 'Official Data Structures & Algorithms Mastery Credential',
    description: 'The pinnacle computer science algorithmic challenge covering AVL rotation mechanics, Bellman-Ford negative edge-weight graph traversal, DSU Inverse Ackermann complexity, bottom-up linear heapify, and monotonic deques.',
    syllabusHighlights: [
      'AVL Tree Double Rotation (LR and RL) Balancing Sequence',
      'Single-Source Shortest Paths with Negative Edge Weights (Bellman-Ford)',
      'Disjoint Set Union (DSU) Inverse Ackermann O(α(N)) Amortized Cost',
      'Bottom-Up Heap Construction in Mathematical O(N) Time',
      'Monotonic Deque Linear O(N) Sliding Window Extremum',
      'Kahn\'s BFS Topological Sort & Cycle Detection in Directed Graphs',
      '0/1 Knapsack Dynamic Programming Recurrence Invariants',
      'Quickselect Expected Linear O(N) Order Statistic Selection'
    ],
    questions: DSA_MOCK_QUESTIONS
  }
];
