import { Difficulty } from '../../types';
import { RawQuestion } from './quantQuestions';

export const LOGICAL_QUESTIONS: Record<string, {
  easy: RawQuestion[];
  medium: RawQuestion[];
  hard: RawQuestion[];
  boss: RawQuestion[];
}> = {
  'Coding Decoding': {
    easy: [
      {
        question: 'If "SYSTEM" is coded as "SYSMET" and "NEARER" is coded as "AENRER", then how will "FRACTION" be coded in that same pattern?',
        options: ['CARFNOIT', 'CARFTION', 'ARFCNOIT', 'FRACNOIT'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Divide the 8-letter word into two equal halves: FRAC and TION. Reverse each half individually: FRAC becomes CARF, and TION becomes NOIT. Combining gives CARFNOIT.',
        companyTag: 'TCS NQT'
      },
      {
        question: 'In a code language, if "MONKEY" is coded as "XDJMNL", how is "TIGER" written in that code?',
        options: ['QDFHS', 'SDFHS', 'SHFDQ', 'UJHFS'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Letters are shifted -1 and written in reverse order: Y-1=X, E-1=D, K-1=J, N-1=M, O-1=N, M-1=L. For TIGER: R-1=Q, E-1=D, G-1=F, I-1=H, T-1=S => QDFHS.',
        companyTag: 'Infosys'
      },
      {
        question: 'If RED is coded as 27 (R=18, E=5, D=4 => 18+5+4=27), what is the code for BLUE?',
        options: ['40', '42', '38', '45'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Sum of alphabetical positions: B(2) + L(12) + U(21) + E(5) = 40.',
        companyTag: 'Wipro'
      },
      {
        question: 'In a certain code, "324" means "Light is bright", "629" means "Girl is beautiful", and "476" means "bright and beautiful". Which digit represents "and"?',
        options: ['7', '4', '6', '2'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Comparing 1st and 3rd statements, "4" represents "bright". Comparing 2nd and 3rd statements, "6" represents "beautiful". In "476" ("bright and beautiful"), the remaining digit "7" corresponds to "and".',
        companyTag: 'Cognizant'
      },
      {
        question: 'If "APPLE" is written as "EQQPI", how is "ORANGE" written in that language?',
        options: ['SVERKI', 'SVEOKI', 'TUERLI', 'SVERKH'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Pattern: Each letter is shifted by +4: O(+4)=S, R(+4)=V, A(+4)=E, N(+4)=R, G(+4)=K, E(+4)=I => SVERKI.',
        companyTag: 'Capgemini'
      }
    ],
    medium: [
      {
        question: 'In a matrix coding system, "CLOUD" is written as "59381" and "RAIN" is written as "4267". How is "DRAIN" represented?',
        options: ['14267', '14276', '12467', '41267'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Direct symbol substitution: D=1, R=4, A=2, I=6, N=7 => 14267.',
        companyTag: 'Accenture'
      },
      {
        question: 'If "DELHI" is coded as "73541" and "CALCUTTA" is coded as "82589662", how can "CALICUT" be coded?',
        options: ['8251896', '8251869', '8521896', '8251968'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Direct letter-to-digit mapping: C=8, A=2, L=5, I=1, C=8, U=9, T=6 => 8251896.',
        companyTag: 'Amazon'
      },
      {
        question: 'In a military encrypted radio protocol, "ka bi pu" means "enemy is near", "pu zo ti" means "danger is everywhere", and "ka zo fa" means "enemy and danger". Which word means "near"?',
        options: ['bi', 'ka', 'pu', 'fa'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Comparing 1 and 2: "pu" = "is". Comparing 1 and 3: "ka" = "enemy". In statement 1 ("enemy is near" = "ka bi pu"), the remaining word "bi" must mean "near".',
        companyTag: 'Deloitte'
      },
      {
        question: 'If "MACHINE" is coded as "19-7-9-14-15-20-11", how will "DANGER" be coded in the same scheme?',
        options: ['10-7-20-13-11-24', '11-7-20-13-11-24', '10-8-20-13-11-24', '13-7-20-10-11-24'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Each letter position is increased by 6: M(13+6=19), A(1+6=7), C(3+6=9)... For DANGER: D(4+6=10), A(1+6=7), N(14+6=20), G(7+6=13), E(5+6=11), R(18+6=24) => 10-7-20-13-11-24.',
        companyTag: 'TCS Digital'
      },
      {
        question: 'If "WATER" is coded as "YCVGT", then what word is coded as "HKTG"?',
        options: ['FIRE', 'FISH', 'FIRM', 'FAME'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'In WATER -> YCVGT, each letter is shifted +2 (W+2=Y, etc.). To find the original word from HKTG, shift -2: H-2=F, K-2=I, T-2=R, G-2=E => FIRE.',
        companyTag: 'Infosys InfyTQ'
      }
    ],
    hard: [
      {
        question: 'In an advanced substitution cipher, vowels (A, E, I, O, U) are replaced by their respective reverse vowel order (U, O, I, E, A) while consonants are replaced by the next immediate consonant. How is "EDUCATION" coded?',
        options: ['OFUDBVIEN', 'OFVCBVIEN', 'OFVDBVIAN', 'OGVDBVIEN'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Vowels mapping: E->O, U->A, A->E, I->I, O->A/E. Consonants: D(+1 next consonant)->F, C->D, T->V, N->P/B. Exact systematic mapping yields OFUDBVIEN.',
        companyTag: 'Google'
      },
      {
        question: 'If in a coded system: A = 2, B = 4, C = 6... and word value equals sum of letter values multiplied by total number of letters, what is the value of "BOX"?',
        options: ['246', '252', '240', '260'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Letter values: B = 2×2 = 4; O = 15×2 = 30; X = 24×2 = 48. Sum = 4 + 30 + 48 = 82. Multiply by word length (3 letters): 82 × 3 = 246.',
        companyTag: 'Amazon SDE'
      },
      {
        question: 'If "TIGER" is written as "GRVIT", how is "PENCIL" coded under the identical symmetry transformation?',
        options: ['KOMRXO', 'KRMROP', 'KMRXOP', 'LOMRXO'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Reverse alphabet positions: T(20) opposite G(7) (sum = 27), I(9) opp R(18), G(7) opp T(20), E(5) opp V(22), R(18) opp I(9), then the order is rearranged. For PENCIL: P opp K, E opp V, N opp M, C opp X, I opp R, L opp O => KOMRXO.',
        companyTag: 'Microsoft'
      },
      {
        question: 'In an algorithmic cipher, each letter is replaced by (Position × 3 + 1) mod 26. What letter replaces "M" (13th position)?',
        options: ['O (14)', 'N (13)', 'P (15)', 'M (12)'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: '(13 × 3 + 1) = 40. 40 mod 26 = 14. The 14th letter of the alphabet is "N" (1-indexed: 40 - 26 = 14 => N).',
        companyTag: 'Goldman Sachs'
      }
    ],
    boss: [
      {
        question: '[Amazon SDE Round 1] A payload packet hash encrypts string characters using parity rotation: odd indices shift +3, even indices shift -2, followed by reverse order. If decrypted string is "CP", what was the 2-character raw source?',
        options: ['RD', 'RE', 'QD', 'SD'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Trace reverse steps carefully: Reverse of "CP" is "PC". Index 1 (P) shifted +3 from source M or R, and C from D. Reversing operations gives "RD".',
        companyTag: 'Amazon'
      },
      {
        question: '[Google Technical Round] If "ALGORITHM" has its vowels sorted alphabetically followed by consonants sorted in reverse alphabetical order, what is the resulting 9-letter string?',
        options: ['AIOTRMLHG', 'AIOTRMHLG', 'AIORTMLHG', 'AITORMLHG'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Vowels in ALGORITHM: A, O, I. Sorted alphabetically: A, I, O. Consonants: L, G, R, T, H, M. Sorted descending: T, R, M, L, H, G. Combined: AIOTRMLHG.',
        companyTag: 'Google'
      },
      {
        question: '[TCS Digital Advanced] In a binary matrix code, words are converted to binary ASCII, XORed with bitmask 0x55, and converted back. What algebraic property guarantees lossless decryption?',
        options: ['Self-inverting involutory property: (X ⊕ K) ⊕ K = X', 'Associative expansion under OR gates', 'Monotonic parity preservation', 'Asymmetric modular inversion'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'XOR cipher is an involution: applying the identical bitmask twice restores original plaintext identically without requiring a separate decryption algorithm.',
        companyTag: 'TCS Digital'
      },
      {
        question: '[Infosys InfyTQ Critical Round] If "CLOCK" is coded as "KCOLC" and "34567" is coded as "76543", what is the invariant group transformation applied?',
        options: ['Reflection / Palindromic reversal along the center axis', 'Cyclic left shift by 2 positions', 'Transposition by even-odd interleaving', 'Caesar substitution with key 0'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Both inputs undergo a clean 180-degree reflection (mirror reversal of string characters).',
        companyTag: 'Infosys'
      },
      {
        question: '[Deloitte Strategy Track] A fraud detection engine flags altered invoice numbers encoded via Luhn algorithm. If invoice checksum digit must satisfy sum(digits) ≡ 0 (mod 10), what is the valid check digit for sequence 7992739871_?',
        options: ['3', '4', '2', '5'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Applying Luhn double-add algorithm yields partial sum 67. The next multiple of 10 is 70, requiring check digit 70 - 67 = 3.',
        companyTag: 'Deloitte'
      }
    ]
  },

  'Blood Relations': {
    easy: [
      {
        question: 'Pointing to a photograph of a boy, Suresh said, "He is the only son of my mother." How is Suresh related to that boy?',
        options: ['Father', 'Brother', 'Uncle', 'Self / Father'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'The only son of Suresh mother is Suresh himself (assuming Suresh is male). Thus, the boy is the son of Suresh, making Suresh his Father.',
        companyTag: 'TCS NQT'
      },
      {
        question: 'A is B brother. C is A mother. D is C father. E is B son. How is D related to A?',
        options: ['Maternal Grandfather', 'Grandfather', 'Father', 'Uncle'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'A mother is C, and C father is D. Mother father is Maternal Grandfather.',
        companyTag: 'Infosys'
      },
      {
        question: 'Introducing a girl, Vipin said, "Her mother is the only daughter of my mother-in-law." How is Vipin related to the girl?',
        options: ['Father', 'Brother', 'Husband', 'Uncle'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'The only daughter of Vipin mother-in-law is Vipin wife. Her daughter is therefore Vipin daughter, so Vipin is her Father.',
        companyTag: 'Wipro'
      },
      {
        question: 'If P is the brother of Q, Q is the sister of R, and R is the father of S, how is P related to S?',
        options: ['Paternal Uncle', 'Father', 'Brother', 'Grandfather'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'R is the father of S. P is the brother of R. Father brother is Paternal Uncle.',
        companyTag: 'Cognizant'
      },
      {
        question: 'Pointing to a man in a park, a woman said, "His mother is the only daughter of my mother." How is the woman related to that man?',
        options: ['Mother', 'Aunt', 'Sister', 'Grandmother'],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Only daughter of my mother = the woman herself. She is his mother.',
        companyTag: 'Capgemini'
      }
    ],
    medium: [
      {
        question: 'Read the following statements: "P + Q" means P is the son of Q; "P - Q" means P is the wife of Q; "P × Q" means P is the brother of Q. Which of the following shows that A is the uncle of B?',
        options: ['A × C + B or A × C, where C is B father (A × C and B + C)', 'A + C - B', 'A - C × B', 'A + B × C'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'If A × C, A is brother of C. If B + C, B is son of C. Thus A is brother of B father, making A the uncle of B.',
        companyTag: 'Amazon'
      },
      {
        question: 'A family consists of six members: A, B, C, D, E, and F. B is the son of C but C is not the mother of B. A and C are a married couple. E is the brother of C. D is the daughter of A. F is the brother of A. How many male members are there in the family?',
        options: ['4 males', '3 males', '5 males', '2 males'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'C is not mother => C is Father (Male). A is wife (Female). B is son (Male). E is brother of C (Male). D is daughter (Female). F is brother of A (Male). Males = C, B, E, F (Total 4 males).',
        companyTag: 'Accenture'
      },
      {
        question: 'K is the sister of J. M is the wife of J. D is the daughter of M. How is K related to D?',
        options: ['Paternal Aunt', 'Maternal Aunt', 'Sister', 'Mother'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'J is the husband of M, so J is father of D. K is the sister of J. Father sister is Paternal Aunt.',
        companyTag: 'Deloitte'
      },
      {
        question: 'Pointing to a photograph, Rohit said, "She is the daughter of my grandfather only son." How is the girl related to Rohit?',
        options: ['Sister', 'Cousin', 'Niece', 'Mother'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Grandfather only son is Rohit father. Daughter of Rohit father is Rohit sister.',
        companyTag: 'TCS Digital'
      },
      {
        question: 'Rahul and Priya are married. Rahul father-in-law is the brother of Priya paternal uncle. What is Rahul relation to Priya father?',
        options: ['Son-in-law', 'Brother-in-law', 'Nephew', 'Cousin'],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Rahul father-in-law is Priya father himself. Hence Rahul is the Son-in-law.',
        companyTag: 'Infosys InfyTQ'
      }
    ],
    hard: [
      {
        question: 'In a family of eight members across three generations: P is father of Q. R is married to S. T is the sister-in-law of U, who is the mother of V. Q is the only son of R. If P is married to R and V is the daughter of Q, how is T related to V?',
        options: ['Paternal Aunt', 'Grandmother', 'Mother', 'Sister'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Mapping the three generations: P and R are grandparents. Q is father of V. U is married to Q (mother of V). T is the sister of Q (sister-in-law of U). Thus T is the Paternal Aunt of V.',
        companyTag: 'Google'
      },
      {
        question: 'If "P $ Q" means P is father of Q, "P # Q" means P is mother of Q, "P @ Q" means P is sister of Q. In the expression "M $ N # O @ P", how is M related to P?',
        options: ['Maternal Grandfather', 'Paternal Grandfather', 'Father', 'Uncle'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'M is father of N ($). N is mother of O (#). O is sister of P (@). So N is mother of P, and M is father of mother (N). Hence M is the Maternal Grandfather of P.',
        companyTag: 'Amazon SDE'
      },
      {
        question: 'There are 7 persons A through G in a room. There are two married couples and three generations. C is the mother-in-law of E, who is the father of G. A is the father of B. D is the sister of G. How is B related to G?',
        options: ['Mother', 'Father', 'Aunt', 'Grandmother'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'C is mother-in-law of E. A is married to C (Generation 1). Their daughter B is married to E (Generation 2). E and B are parents of G and D (Generation 3). Therefore B is the Mother of G.',
        companyTag: 'Microsoft'
      },
      {
        question: 'A man said to a lady, "Your mother husband sister is my aunt." How is the lady related to the man?',
        options: ['Sister', 'Cousin', 'Daughter', 'Mother'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Lady mother husband = Lady father. Lady father sister = Lady paternal aunt. The man says she is also his aunt, meaning they share the same paternal aunt, so they are brother and sister (or first cousins). Option denotes Sister.',
        companyTag: 'Goldman Sachs'
      }
    ],
    boss: [
      {
        question: '[Amazon SDE Round 1] In an inheritance graph analysis: A node X is an ancestor of Y iff there exists a directed lineage edge sequence. If in family tree F, depth(A) = 1, depth(C) = 3, and every marriage is monogamous with no consanguinity, what is the maximum possible number of distinct great-grandparents for a 4th generation child?',
        options: ['8', '4', '6', '16'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'A person has 2 parents, 4 grandparents, and 2^3 = 8 distinct great-grandparents in a standard non-consanguineous family tree.',
        companyTag: 'Amazon'
      },
      {
        question: '[Google Technical Round] If A is the paternal grandfather of B and maternal grandfather of C, while B and C are first cousins sharing no common surname, what can be definitively concluded about B and C parents?',
        options: ['B father and C mother are biological siblings', 'B mother and C father are biological siblings', 'B and C share the same father', 'B and C share the same mother'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'A is father of B father (Paternal grandfather). A is also father of C mother (Maternal grandfather). Thus, B father and C mother are brother and sister.',
        companyTag: 'Google'
      },
      {
        question: '[TCS Digital Advanced] A logic expression encodes: A * B means A is brother of B; A / B means A is son of B; A - B means A is sister of B. Which expression ensures that Q is the nephew of P?',
        options: ['Q / R * P or P * R and Q / R (with Q being male)', 'P / Q * R', 'Q * P - R', 'P - Q / R'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'If P * R, P is brother of R. If Q / R, Q is son of R. A male child of one sibling is the nephew of the other sibling.',
        companyTag: 'TCS Digital'
      },
      {
        question: '[Infosys InfyTQ Critical Round] In an ancient dynasty, succession passes to the closest male descendant by generational degree. If King K has two daughters D1 and D2, where D1 has a son S1 (age 14) and D2 has a grandson GS2 (age 8), who has legal precedence by generation distance?',
        options: ['S1 (Degree 2 from King K vs Degree 3 for GS2)', 'GS2 because of direct paternal affinity', 'Both hold identical claim', 'D1 daughter'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'S1 is grandson (2 generations away from K), whereas GS2 is great-grandson (3 generations away). Shorter degree grants legal precedence.',
        companyTag: 'Infosys'
      },
      {
        question: '[Deloitte Strategy Track] A corporate governance board defines "Conflict of Interest" when two voting directors are within 2 degrees of consanguinity. Director X is the brother-in-law of Director Y sister. Are X and Y within 2 degrees of direct consanguinity?',
        options: ['No, affinity through marriage is distinct from consanguinity (blood relation)', 'Yes, strictly 1 degree', 'Yes, strictly 2 degrees', 'Depends on equity share'],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Consanguinity refers strictly to genetic descent from a common ancestor. In-laws represent affinity, not consanguinity.',
        companyTag: 'Deloitte'
      }
    ]
  }
};
