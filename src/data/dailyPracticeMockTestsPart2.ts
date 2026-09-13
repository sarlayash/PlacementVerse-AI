import { FaangMockTest, FaangQuestion } from '../types';

export const DAILY_MOCK_4_QUESTIONS: FaangQuestion[] = [
  {
    id: 'dm4-q1',
    testId: 'daily-practice-mock-4',
    section: 'Sentence Correction & Grammar Precision',
    companyTag: 'McKinsey & Co / Bain Communications',
    question: 'Identify the grammatically correct sentence adhering to formal corporate syntax:',
    options: [
      'Neither the project manager nor the senior database administrators were informed about the unexpected migration schedule until late Friday.',
      'Neither the project manager nor the senior database administrators was informed about the unexpected migration schedule until late Friday.',
      'Neither the project manager or the senior database administrators were informed about the unexpected migration schedule until late Friday.',
      'Neither the project manager nor the senior database administrators has been informed about the unexpected migration schedule until late Friday.'
    ],
    correctIndex: 0,
    explanation: 'With correlative conjunctions "neither... nor", the verb agrees in number with the subject closest to it (proximity rule). Here, "the senior database administrators" is plural, so the plural verb "were informed" is required.',
    shortcutOrInsight: 'Rule of Proximity: In "neither... nor", the verb must match the subject closer to it in position.',
    difficulty: 'Medium'
  },
  {
    id: 'dm4-q2',
    testId: 'daily-practice-mock-4',
    section: 'Vocabulary in Executive Context',
    companyTag: 'Goldman Sachs Strategy / BCG',
    question: 'Choose the word that best completes the sentence: "The CFO emphasized that the quarterly revenue growth, while commendable, was largely _______ due to a single non-recurring government subsidy rather than sustainable operational expansion."',
    options: [
      'adventitious',
      'ubiquitous',
      'immutable',
      'pernicious'
    ],
    correctIndex: 0,
    explanation: '"Adventitious" means occurring by chance or accident from an external source rather than by inherent nature or design. In corporate finance, adventitious gains refer to windfall or non-recurring items that do not reflect core operational strength.',
    shortcutOrInsight: '"Adventitious" = happening by chance or external circumstance rather than inherent design.',
    difficulty: 'Hard'
  },
  {
    id: 'dm4-q3',
    testId: 'daily-practice-mock-4',
    section: 'Para Jumbles & Cohesive Flow',
    companyTag: 'TCS Digital / Infosys Verbal',
    question: 'Arrange the sentences into a logically coherent paragraph:\n(1) Consequently, technical debt accumulated across sprint cycles without adequate documentation.\n(2) The engineering division prioritized rapid market launch above long-term architectural stability.\n(3) This velocity initially delighted product stakeholders and secured seed funding.\n(4) However, when customer acquisition surged tenfold, the unscalable microservices began suffering catastrophic latency degradation.',
    options: [
      '2 -> 3 -> 1 -> 4',
      '2 -> 1 -> 3 -> 4',
      '3 -> 2 -> 4 -> 1',
      '1 -> 4 -> 2 -> 3'
    ],
    correctIndex: 0,
    explanation: 'Statement 2 introduces the premise (prioritizing rapid launch). Statement 3 describes the immediate positive outcome (delighted stakeholders). Statement 1 presents the hidden consequence (accumulating technical debt). Statement 4 provides the climax/turn ("However, when customer acquisition surged tenfold... latency degradation").',
    shortcutOrInsight: 'Cause (2) -> Immediate Effect (3) -> Hidden Consequence (1) -> Turning Point/Climax (4).',
    difficulty: 'Medium'
  },
  {
    id: 'dm4-q4',
    testId: 'daily-practice-mock-4',
    section: 'Subjunctive Mood & Formal Directives',
    companyTag: 'Amazon Corporate / Google People Operations',
    question: 'Select the sentence that correctly employs the formal subjunctive mood for corporate directives:',
    options: [
      'The audit committee insisted that the lead architect submit all security access logs before authorization is granted.',
      'The audit committee insisted that the lead architect submits all security access logs before authorization is granted.',
      'The audit committee insisted that the lead architect submitted all security access logs before authorization is granted.',
      'The audit committee insisted that the lead architect is submitting all security access logs before authorization is granted.'
    ],
    correctIndex: 0,
    explanation: 'Verbs of demand, recommendation, or necessity (insist, demand, recommend, mandate) take the subjunctive mood with the base form of the verb without "to" or "-s" (e.g. "that he submit", not "submits" or "submitted").',
    shortcutOrInsight: 'Subjunctive Mandate: "insist/demand that [subject] + [base verb]" (e.g., submit, be, provide).',
    difficulty: 'Hard'
  },
  {
    id: 'dm4-q5',
    testId: 'daily-practice-mock-4',
    section: 'Critical Reading & Logical Flaw Identification',
    companyTag: 'Microsoft Strategic Consulting',
    question: 'Read the statement: "Company X switched all 500 developers to an AI-assisted IDE last month. Over the same month, total commits to the master repository increased by 45%. Therefore, the AI IDE directly caused a 45% increase in developer productivity."\nWhich of the following points out the most critical flaw in this reasoning?',
    options: [
      'It conflates raw commit quantity with true developer productivity, ignoring code quality, refactoring frequency, lines of code per commit, and potential end-of-quarter release deadlines driving higher commit volume.',
      'It assumes AI IDEs are only useful for junior developers.',
      'It fails to mention the cost of AI software licenses.',
      'It does not specify which operating systems the developers used.'
    ],
    correctIndex: 0,
    explanation: 'The argument commits two classic logical fallacies: (1) False equivalence / proxy metric fallacy: more commits does not equate to higher productivity or value, and (2) Post hoc ergo propter hoc / omitted variable bias: the increase in commits may have coincided with sprint deadlines, automated formatting bots, or smaller commit hygiene.',
    shortcutOrInsight: 'Proxy Metric Fallacy: Commits ≠ Productivity. Correlative timing does not establish exclusive causation.',
    difficulty: 'Medium'
  },
  {
    id: 'dm4-q6',
    testId: 'daily-practice-mock-4',
    section: 'Idiomatic Corporate Expressions',
    companyTag: 'Deloitte Leadership / Accenture',
    question: 'In corporate negotiations, what does the idiom "to hold all the aces" mean?',
    options: [
      'To possess all significant strategic advantages or leverage in a discussion, leaving the counterparty with very little bargaining power',
      'To cheat by concealing private financial records from auditors',
      'To resign from a project leadership position abruptly',
      'To gamble company treasury assets on risky derivative stocks'
    ],
    correctIndex: 0,
    explanation: 'In corporate discussions, "holding all the aces" means having all the cards, leverage, or distinct competitive advantages in a negotiation.',
    shortcutOrInsight: '"Hold all the aces" = having decisive leverage and complete strategic advantage in negotiation.',
    difficulty: 'Easy'
  },
  {
    id: 'dm4-q7',
    testId: 'daily-practice-mock-4',
    section: 'Executive Email Etiquette & Conciseness',
    companyTag: 'Google Executive Staff / Apple Leadership',
    question: 'Which of the following email openers exhibits the highest standard of executive conciseness (BLUF - Bottom Line Up Front)?',
    options: [
      'Action Required: Please approve the attached $25,000 cloud compute budget increase by 5 PM today to prevent service throttling during Monday\'s marketing campaign.',
      'I am writing this email to kindly inform you that due to some recent events that happened over the weekend regarding marketing, we might need some extra money if possible.',
      'Hope you had a wonderful weekend and the weather is nice over there; we had a meeting earlier today about various things and wanted to bring up budgets.',
      'Per my previous email of two weeks ago which went unanswered, as you might recall, our cloud servers are running very slow so please read this.'
    ],
    correctIndex: 0,
    explanation: 'BLUF (Bottom Line Up Front) demands immediate clarity: states the action required, exact figure ($25,000), the deadline (5 PM today), and the specific business consequence of inaction (prevent service throttling during Monday campaign).',
    shortcutOrInsight: 'BLUF Principle: Action + Scope + Deadline + Consequence in the very first sentence.',
    difficulty: 'Easy'
  },
  {
    id: 'dm4-q8',
    testId: 'daily-practice-mock-4',
    section: 'Tone & De-escalation in Client Communications',
    companyTag: 'Salesforce Client Success / Stripe',
    question: 'A critical enterprise client sends an angry email claiming your API outage caused a $100,000 loss during Black Friday. Which response de-escalates the tension most professionally while safeguarding legal liability?',
    options: [
      '"We recognize the critical nature of this incident and sincerely understand your frustration regarding the disruption to your operations. Our senior incident commander has isolated the root cause, deployed a permanent fix, and our leadership team is available to review our detailed incident post-mortem with your executives today at 2 PM."',
      '"Our terms of service clearly state that we provide 99.9% uptime and we are not liable for incidental business losses, so please read section 4 of your contract."',
      '"It wasn\'t our fault; AWS had an internal DNS routing breakdown across the entire East region, so you should contact AWS support directly."',
      '"We did not notice any downtime on our dashboards, so the problem must have been on your internal client integration code."'
    ],
    correctIndex: 0,
    explanation: 'Effective executive de-escalation: (1) acknowledges customer impact with empathy without admitting premature legal liability, (2) demonstrates immediate containment and resolution, and (3) offers direct executive-level engagement and a transparent post-mortem.',
    shortcutOrInsight: 'De-escalation: Empathize with impact -> State concrete containment -> Offer executive-level accountability.',
    difficulty: 'Medium'
  },
  {
    id: 'dm4-q9',
    testId: 'daily-practice-mock-4',
    section: 'Cross-Cultural Corporate Communication',
    companyTag: 'Cognizant Global Delivery / Infosys US',
    question: 'When communicating project roadblocks across geographically dispersed global teams with low-context vs high-context cultural backgrounds, what practice guarantees alignment?',
    options: [
      'Documenting all verbal decisions in writing with explicit ownership names, unambiguous numerical dates (e.g. "Oct 15, 2026" rather than "10/11/26"), and quantifiable acceptance criteria',
      'Relying solely on informal WhatsApp voice notes',
      'Using localized slang and regional sports metaphors in Slack channels',
      'Assuming silence on a video call indicates enthusiastic agreement from all attendees'
    ],
    correctIndex: 0,
    explanation: 'Global teams span cultures with different communication norms (e.g., reluctance to contradict superiors directly). Explicit written follow-ups, unambiguous date formats (preventing US MM/DD vs International DD/MM confusion), and clear deliverables prevent misunderstandings.',
    shortcutOrInsight: 'Global Alignment: Explicit written summaries + Named single-threaded owners + Unambiguous date formatting.',
    difficulty: 'Easy'
  },
  {
    id: 'dm4-q10',
    testId: 'daily-practice-mock-4',
    section: 'Active Listening & Stakeholder Management',
    companyTag: 'Atlassian Product Management / Adobe',
    question: 'During a sprint planning meeting, a lead engineer expresses reluctance: "Every time we ship this checkout module without refactoring the legacy ORM layer, we spend the entire next week firefighting support tickets." How should the product manager respond demonstrating active listening?',
    options: [
      '"It sounds like the technical instability of the ORM layer is imposing high post-release firefighting overhead; let\'s scope dedicated refactoring story points into this sprint alongside feature work to protect our sprint velocity."',
      '"We don\'t have time for refactoring because marketing already announced the launch date."',
      '"You complain about the ORM every sprint; let\'s just work overtime next week to fix the bugs."',
      '"Support tickets are customer support\'s problem, not engineering\'s concern."'
    ],
    correctIndex: 0,
    explanation: 'Active listening mirrors the underlying concern ("instability of the ORM is creating firefighting overhead") and integrates the engineer\'s technical feedback into actionable project balance (allocating refactoring points to protect sprint velocity).',
    shortcutOrInsight: 'Active Listening: Paraphrase core pain point + Propose collaborative operational compromise.',
    difficulty: 'Medium'
  }
];

export const DAILY_MOCK_5_QUESTIONS: FaangQuestion[] = [
  {
    id: 'dm5-q1',
    testId: 'daily-practice-mock-5',
    section: 'Ownership & Blameless Post-Mortem',
    companyTag: 'Amazon Leadership Principles / Google SRE',
    question: 'You accidentally pushed a configuration flag to production that triggered a 15-minute outage for 5,000 active users. Your manager has not yet noticed. What is the most principled immediate action?',
    options: [
      'Immediately revert the change, notify the on-call incident channel and your manager with the exact timeline and impact, and draft a blameless post-mortem detailing how the pipeline failed to catch the misconfiguration and what guardrails will prevent recurrence.',
      'Quickly revert the change and remain silent unless someone specifically questions you during the weekly standup.',
      'Blame the QA team for failing to test the configuration flag in the staging environment.',
      'Submit a secret hotfix commit labeled "Minor typo fix" to obscure the root cause in the Git history.'
    ],
    correctIndex: 0,
    explanation: 'Demonstrating extreme ownership and Google SRE post-mortem culture means admitting mistakes proactively, containing user impact immediately, and focusing on systemic prevention (why did CI allow this?) rather than personal blame or concealment.',
    shortcutOrInsight: 'Extreme Ownership: Revert immediately -> Over-communicate impact -> Lead blameless systemic fix.',
    difficulty: 'Easy'
  },
  {
    id: 'dm5-q2',
    testId: 'daily-practice-mock-5',
    section: 'Conflict Resolution & Peer Disagreements',
    companyTag: 'Meta Behavioral / Microsoft HR',
    question: 'You and a senior peer disagree sharply on whether to use GraphQL or REST for a new service. Discussions in PR comments have become tense and circular. How do you resolve this impasse professionally?',
    options: [
      'Schedule a 30-minute 1-on-1 alignment session, establish objective technical evaluation criteria (latency, caching, schema evolution, team learning curve), build small prototypes of both, and escalate to the Tech Lead for a binding decision if criteria remain split.',
      'Rally your teammates in a private Slack channel to downvote the peer\'s proposal.',
      'Stop communicating with the peer and refuse to work on the project until they concede.',
      'Escalate to the VP of Engineering immediately complaining that your peer is uncooperative.'
    ],
    correctIndex: 0,
    explanation: 'Professional disagreement resolution moves from emotionally charged public comments to high-bandwidth 1-on-1 dialogue, grounds debates in objective technical trade-off matrices, utilizes rapid prototyping to collect empirical data, and respects clean escalation paths.',
    shortcutOrInsight: 'Conflict Matrix: Move offline to 1-on-1 -> Define objective trade-offs -> Prototype -> Escalate cleanly if unresolved.',
    difficulty: 'Medium'
  },
  {
    id: 'dm5-q3',
    testId: 'daily-practice-mock-5',
    section: 'Unrealistic Deadlines & Scope Management',
    companyTag: 'Apple Engineering Leadership / Stripe',
    question: 'Your engineering manager commits the team to delivering a complex payment integration in 3 weeks, which your engineering estimates prove requires at least 6 weeks of high-quality work. How do you handle this situation?',
    options: [
      'Present a transparent breakdown of engineering tasks with time estimates, demonstrate the 3-week capacity gap, and propose a phased MVP approach (e.g. deliver core credit card payments in 3 weeks, deferring Apple Pay and subscription recurring billing to Phase 2).',
      'Say nothing, work 16-hour days including weekends, and hope everything finishes on time.',
      'Walk out of the meeting and refuse to work on the project.',
      'Secretly disable all unit tests and security checks to push code out in 3 weeks.'
    ],
    correctIndex: 0,
    explanation: 'Never make silent commitments or compromise engineering safety. The mature engineering approach presents empirical data showing the gap and offers constructive trade-offs (scope pruning / phased deliverables) so leadership can make informed business decisions.',
    shortcutOrInsight: 'Scope Negotiation: Don\'t just say "No" — provide data-backed estimates and offer a phased MVP delivery option.',
    difficulty: 'Medium'
  },
  {
    id: 'dm5-q4',
    testId: 'daily-practice-mock-5',
    section: 'Inclusive Leadership & Junior Mentorship',
    companyTag: 'Google Culture / LinkedIn Engineering',
    question: 'During a design review meeting, you notice that a quiet junior engineer who spent two weeks researching a caching system is repeatedly talked over and interrupted by more vocal senior peers. What should you do?',
    options: [
      'Politely intervene by saying: "I\'d like to pause for a moment and hear from Priya, as she spent the last two weeks benchmarking Redis and Memcached specifically for this architecture; Priya, what were your findings?"',
      'Stay out of the conversation because junior engineers should learn to fight for their own voice.',
      'Send a private message to the junior engineer after the meeting saying "Too bad you didn\'t speak up."',
      'Interrupt the speakers by yelling at them that they are being rude and unprofessional.'
    ],
    correctIndex: 0,
    explanation: 'Inclusive engineering allies actively create space for less vocal teammates, especially those with primary domain knowledge. Respectfully redirecting the floor gives credit where due and improves overall team design decisions.',
    shortcutOrInsight: 'Allyship: Politely pause the conversation and invite the quiet subject-matter expert to share their domain data.',
    difficulty: 'Easy'
  },
  {
    id: 'dm5-q5',
    testId: 'daily-practice-mock-5',
    section: 'Ethics & User Privacy Safeguards',
    companyTag: 'Apple Privacy / Meta Integrity',
    question: 'A product manager asks you to log unmasked user credit card numbers and full social security numbers in plaintext server debug logs to make it easier to troubleshoot failed checkout requests. How do you respond?',
    options: [
      'Firmly refuse citing PCI-DSS compliance and GDPR/privacy regulations, explain the severe legal and financial risks of exposing plaintext credentials in logs, and propose tokenized transaction IDs and masked logs (e.g. `****1234`) as a compliant alternative.',
      'Implement the plaintext logging since product managers outrank software engineers.',
      'Log the credit card numbers but save them in a hidden folder on your personal laptop.',
      'Resign immediately without discussing the issue with anyone.'
    ],
    correctIndex: 0,
    explanation: 'Engineers have an ethical and legal obligation to uphold data security and compliance (PCI-DSS, HIPAA, GDPR). The correct response refuses the non-compliant request clearly, cites the regulatory mandate, and provides a secure architectural solution (tokenization/masking).',
    shortcutOrInsight: 'Regulatory Compliance: Never compromise PCI-DSS/GDPR. Reject plaintext PII logging and offer tokenized debugging.',
    difficulty: 'Easy'
  },
  {
    id: 'dm5-q6',
    testId: 'daily-practice-mock-5',
    section: 'Dealing with Ambiguity & Lack of Specs',
    companyTag: 'Amazon Principles (Are Right, A Lot) / Netflix',
    question: 'You are assigned a ticket: "Improve customer search latency." There are no requirements, no latency targets, no logs mentioned, and the assigner is on a 2-week vacation. How do you proceed?',
    options: [
      'Inspect production APM metrics (Datadog/CloudWatch) to establish baseline P50/P95/P99 latency, identify the slowest queries, write a 1-page proposal outlining the top 2 bottlenecks and projected improvements, share it with the team in Slack, and begin working on the highest-confidence fix.',
      'Close the ticket with the comment "Not enough information provided; reopening when you return."',
      'Wait two weeks for the assigner to return before touching any code.',
      'Completely rewrite the entire search database engine from scratch without measuring anything.'
    ],
    correctIndex: 0,
    explanation: 'Thriving in ambiguity is a core senior placement trait. When specs are missing, high-performing engineers measure the status quo, form hypotheses, document a lightweight proposal for transparency, and proceed with incremental, low-risk, high-value improvements.',
    shortcutOrInsight: 'Ambiguity Playbook: Measure baseline metrics -> Formulate hypothesis -> Document 1-pager -> Execute iterative fix.',
    difficulty: 'Hard'
  },
  {
    id: 'dm5-q7',
    testId: 'daily-practice-mock-5',
    section: 'Receiving Critical Feedback & Growth Mindset',
    companyTag: 'Microsoft Growth Mindset / Google Reviews',
    question: 'In your first quarter performance review, your manager points out that while your code output is high, your pull requests are too large (1,000+ lines) and frequently block peer reviewers for days. How do you react?',
    options: [
      'Accept the constructive feedback with gratitude, ask for specific examples of how the manager prefers PRs structured, and commit to decomposing future features into atomic PRs of <300 lines with clear test coverage and context.',
      'Become defensive and argue that large PRs prove you work harder than your colleagues who only submit 100-line changes.',
      'Stop writing code and submit only 1-line changes for the rest of the year to be passive-aggressive.',
      'Complain to HR that your manager is micromanaging your pull request sizes.'
    ],
    correctIndex: 0,
    explanation: 'A growth mindset embraces constructive feedback as actionable guidance. Acknowledging the reviewer burden, seeking clarification on best practices, and adopting atomic PR hygiene (<300 lines) demonstrates professional maturity and teamwork.',
    shortcutOrInsight: 'Growth Mindset: Acknowledge constructive feedback -> Clarify expectations -> Adopt atomic workflow improvements.',
    difficulty: 'Easy'
  },
  {
    id: 'dm5-q8',
    testId: 'daily-practice-mock-5',
    section: 'Burnout & Prioritization Under Pressure',
    companyTag: 'Stripe Engineering / Shopify Leadership',
    question: 'You are balancing three competing high-priority deadlines for different stakeholders, your backlog is overwhelming, and you feel physical burnout symptoms. What is the most effective approach?',
    options: [
      'Schedule an urgent 15-minute sync with your direct manager, present the list of competing priorities with estimated time investments, and request assistance in rank-ordering the tasks and renegotiating or delegating non-critical commitments.',
      'Keep working through the night every day without informing anyone until you collapse or make a catastrophic production error.',
      'Select one task at random and ignore the other two stakeholders indefinitely.',
      'Call in sick for two weeks without notifying your team of ongoing deadlines.'
    ],
    correctIndex: 0,
    explanation: 'Engineers manage capacity collaboratively with management. Proactively surfacing competing demands allows managers to exercise trade-offs, shield developers from burnout, and reset stakeholder expectations gracefully.',
    shortcutOrInsight: 'Capacity Management: Escalate priority conflicts early with a transparent task matrix; let managers align stakeholder expectations.',
    difficulty: 'Medium'
  },
  {
    id: 'dm5-q9',
    testId: 'daily-practice-mock-5',
    section: 'Cross-Functional Collaboration with Sales & Design',
    companyTag: 'Airbnb Product / Figma Engineering',
    question: 'A UI/UX designer creates a visually stunning animation for a mobile screen that will take 4 weeks of custom canvas rendering to implement and could cause frame rate drops on low-end Android devices. How do you collaborate?',
    options: [
      'Praise the visual vision, demonstrate the technical and performance constraints on lower-end devices with real device profiles, and collaborate on a lightweight CSS/Lottie animation alternative that delivers 90% of the aesthetic experience in 3 days of development.',
      'Flatly reject the design in a public channel calling it ridiculous and impossible.',
      'Silently ignore the design file and build a plain white box with black text.',
      'Spend 8 weeks building the animation regardless of battery and performance impact.'
    ],
    correctIndex: 0,
    explanation: 'Cross-functional engineering excellence respects design intent while upholding technical realism. Collaborating on high-impact, performance-friendly compromises preserves relationships, protects device performance, and saves sprint cycles.',
    shortcutOrInsight: 'Design-Eng Synergy: Validate the visual goal -> Share performance data -> Propose a 90% aesthetic compromise in 10% of the effort.',
    difficulty: 'Medium'
  },
  {
    id: 'dm5-q10',
    testId: 'daily-practice-mock-5',
    section: 'Integrity in Interviewing & Candidate Evaluation',
    companyTag: 'Google Hiring Committee / FAANG Bar Raiser',
    question: 'You are interviewing a candidate for a software engineer role who is an alumnus of your alma mater college. During the interview, you discover they struggle with basic binary search and system design. How should you write your evaluation?',
    options: [
      'Write an objective, evidence-based assessment detailing their performance against the standard rubric, quoting their actual code and reasoning, and submit an honest hire/no-hire recommendation free from affinity bias.',
      'Give them a top-tier recommendation because they attended your university and you want your alumni network to expand.',
      'Intentionally give them a negative score on unrelated topics to make sure they are rejected.',
      'Ask another engineer to interview them again without submitting any feedback.'
    ],
    correctIndex: 0,
    explanation: 'Bar-raiser integrity requires evaluating candidates strictly against universal rubrics without affinity bias (alma mater, background, mutual friends). Submitting factual quotes and code evidence ensures fair, meritocratic hiring standards.',
    shortcutOrInsight: 'Hiring Integrity: Calibrate against objective rubric criteria with concrete evidence, rejecting alma mater and affinity biases.',
    difficulty: 'Easy'
  }
];

export const DAILY_PRACTICE_PART2_MOCK_TESTS: FaangMockTest[] = [
  {
    id: 'daily-practice-mock-4',
    title: 'Daily Practice Mock 4: Executive Business Communication & Verbal Mastery',
    subtitle: '10 High-Yield MCQs • 20 Minutes • BLUF Emails, Grammar Precision, Subjunctive Mood & De-escalation',
    category: 'DAILY PRACTICE',
    companyTier: 'Tier-1 Campus Recruitment & Corporate Consulting',
    companies: ['McKinsey', 'Goldman Sachs', 'Amazon', 'Deloitte'],
    scheduledDate: 'Daily Practice • Slot D (Executive Communications & Verbal Precision)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'daily-practice-champion-4',
    badgeRewardName: 'Executive Communication & Verbal Ace',
    badgeIcon: '🗣️',
    badgeGradient: 'from-amber-500 via-orange-600 to-rose-950',
    certificateTitle: 'Executive Business Communication & Verbal Mastery Credential',
    description: 'A polished 20-minute executive communication and verbal precision crucible evaluating BLUF email structure, correlative subject-verb agreement, subjunctive directives, client de-escalation, and cross-cultural clarity.',
    syllabusHighlights: [
      'Correlative Subject-Verb Agreement ("neither... nor" Proximity Rule)',
      'High-Finance Contextual Vocabulary ("Adventitious" Windfall Gains)',
      'Logical Para Jumble Sequencing & Hidden Debt Transitions',
      'Formal Subjunctive Mood Directives ("insist that [subject] + base verb")',
      'Proxy Metric Fallacies & Conflating Commits with Developer Value',
      'BLUF (Bottom Line Up Front) Executive Email Framing',
      'Client Escalation Containment & Cross-Cultural Alignment'
    ],
    questions: DAILY_MOCK_4_QUESTIONS
  },
  {
    id: 'daily-practice-mock-5',
    title: 'Daily Practice Mock 5: HR Situational Judgment & Behavioral Leadership',
    subtitle: '10 High-Yield MCQs • 20 Minutes • Blameless Post-Mortems, Conflict Resolution, Ethics & Inclusion',
    category: 'DAILY PRACTICE',
    companyTier: 'Tier-1 FAANG Behavioral & Bar Raiser Recruitment',
    companies: ['Google SRE', 'Amazon Bar Raiser', 'Apple', 'Meta Integrity'],
    scheduledDate: 'Daily Practice • Slot E (Behavioral Leadership & Situational Judgment)',
    durationMinutes: 20,
    totalQuestions: 10,
    marksPerQuestion: 4,
    negativeMark: 1,
    passingPercentage: 60,
    badgeRewardId: 'daily-practice-champion-5',
    badgeRewardName: 'Behavioral Leadership & HR Crucible Champion',
    badgeIcon: '🤝',
    badgeGradient: 'from-emerald-500 via-teal-600 to-slate-950',
    certificateTitle: 'HR Situational Judgment & Behavioral Leadership Credential',
    description: 'An essential behavioral and situational judgment assessment covering extreme ownership, blameless post-mortems, conflict resolution matrices, ambiguous project leadership, PCI-DSS compliance integrity, and inclusive mentoring.',
    syllabusHighlights: [
      'Extreme Ownership & SRE Blameless Outage Post-Mortems',
      'Technical Disagreement De-escalation & Trade-Off Matrices',
      'Capacity Negotiation: Data-Backed Phased MVP Scoping vs Overwork',
      'Inclusive Engineering Allyship: Elevating Quiet Domain Experts',
      'Data Privacy Integrity: Rejecting Plaintext PII/PCI-DSS Logging',
      'Thriving in Ambiguity: APM Latency Baselines & 1-Page Proposals',
      'Growth Mindset Acceptance of Critical Code Review Feedback',
      'Bar-Raiser Interview Integrity: Eliminating Affinity & Alma Mater Bias'
    ],
    questions: DAILY_MOCK_5_QUESTIONS
  }
];
