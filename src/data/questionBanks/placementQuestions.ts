import { Difficulty } from '../../types';
import { RawQuestion } from './quantQuestions';

export const PLACEMENT_QUESTIONS: Record<string, {
  easy: RawQuestion[];
  medium: RawQuestion[];
  hard: RawQuestion[];
  boss: RawQuestion[];
}> = {
  'ATS Resume': {
    easy: [
      {
        question: 'What does "ATS" stand for in modern campus recruitment and corporate hiring pipelines?',
        options: [
          'Applicant Tracking System',
          'Automated Technical Screener',
          'Application Testing Server',
          'Advanced Talent Sourcing'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'ATS stands for Applicant Tracking System, enterprise software utilized by HR departments to collect, sort, scan, and rank job applications.',
        companyTag: 'TCS NQT'
      },
      {
        question: 'Which file format is widely recommended for ATS compliance in campus placement drives?',
        options: [
          'Clean, single-column text-based PDF or standard .docx',
          'High-resolution Photoshop PSD or PNG image',
          'HTML file with embedded JavaScript scripts',
          'Compressed .zip archive containing multiple folders'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'ATS parsers struggle with images, canvas elements, and multi-column tables. Text-searchable PDFs and Word docs ensure flawless parsing.',
        companyTag: 'Infosys'
      },
      {
        question: 'What is the recommended ideal length for an undergraduate campus placement resume in India?',
        options: [
          'Strictly 1 single page',
          '3 to 4 pages detailing every school project',
          'As long as possible with 10+ pages',
          'Half a page with only contact info'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Recruiters spend an average of 6-7 seconds on initial resume review. A concise, dense, single-page resume is the global standard for undergraduates.',
        companyTag: 'Wipro'
      },
      {
        question: 'Why should you avoid putting crucial contact information inside the header or footer of a Microsoft Word resume file?',
        options: [
          'Many legacy ATS parsers completely ignore or fail to parse text located in document headers and footers',
          'It takes up too much printer ink',
          'It slows down internet transfer speed',
          'It triggers antivirus firewalls'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'Standard ATS document extractors often strip out headers and footers, resulting in missing email and phone details.',
        companyTag: 'Cognizant'
      },
      {
        question: 'What constitutes an effective email address on a placement resume?',
        options: [
          'firstname.lastname@gmail.com (Professional with full name)',
          'cool_gamer_boy_99@hotmail.com',
          'hacker_king_420@yahoo.com',
          'anonymous_ninja@protonmail.com'
        ],
        correctIndex: 0,
        difficulty: 'Easy',
        explanation: 'A clean professional email handle reflects serious professional intent and avoids spam filtering.',
        companyTag: 'Capgemini'
      }
    ],
    medium: [
      {
        question: 'According to Google famous XYZ resume bullet formula, how should every engineering project bullet point be constructed?',
        options: [
          'Accomplished [X], as measured by [Y], by doing [Z]',
          'Worked on [X] using [Y] whenever required [Z]',
          'Responsible for [X] and learned [Y] during college [Z]',
          'Assisted team with [X] while attending classes [Y] and [Z]'
        ],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Google\'s XYZ formula ("Accomplished [X], as measured by [Y], by doing [Z]") directly highlights quantifiable business or technical impact.',
        companyTag: 'Google'
      },
      {
        question: 'Which of the following bullet points demonstrates the highest impact on an SDE resume?',
        options: [
          '"Architected a Redis caching layer, slashing database p95 query latency by 42% across 15,000 daily active users."',
          '"Helped with backend database work and studied Redis caching."',
          '"Responsible for writing backend queries in Python and SQL."',
          '"Was a hard-working developer in our college capstone project."'
        ],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Quantified results (Redis caching layer, 42% latency reduction, 15k DAU) prove verifiable competency to hiring managers.',
        companyTag: 'Amazon'
      },
      {
        question: 'How does an ATS evaluate "Keyword Density" when screening resumes against a Job Description (JD)?',
        options: [
          'It checks for contextual presence of key skills, frameworks, and tools listed in the JD (e.g. Docker, TypeScript, Microservices)',
          'It counts how many times the word "hardworking" is repeated',
          'It prefers resumes with invisible white-font keywords hidden in margins',
          'It ranks resumes purely based on the candidate college ranking'
        ],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'ATS algorithms match candidate vocabulary against required competencies specified in the role job description.',
        companyTag: 'Accenture'
      },
      {
        question: 'What happens if a candidate uses "white font keyword stuffing" (hiding 50 keywords in 1pt white font in the resume background)?',
        options: [
          'Modern ATS parsers convert text to flat plaintext, exposing the cheat to human recruiters and resulting in immediate blacklisting',
          'It guarantees an instant interview callback at Tier 1 tech firms',
          'It improves ATS score by 200%',
          'The document file size gets reduced by half'
        ],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'White-text tricks are easily caught because parsers extract all raw text into unformatted strings where the spam is glaringly visible.',
        companyTag: 'Microsoft'
      },
      {
        question: 'Which visual elements are known to break standard ATS parsing algorithms?',
        options: [
          'Complex multi-column tables, skill rating progress bars (e.g. "Java 4/5 stars"), and embedded graphic icons',
          'Standard bullet points (•)',
          'Bold section headers like "EDUCATION" and "PROJECTS"',
          'Standard chronological date notations (e.g. Aug 2023 - Present)'
        ],
        correctIndex: 0,
        difficulty: 'Medium',
        explanation: 'Graphic skill bars and tables confuse OCR/text readers, often merging separate text blocks into unreadable garbled strings.',
        companyTag: 'Deloitte'
      }
    ],
    hard: [
      {
        question: 'When tailoring a single resume for both a "Backend Engineer" role and a "Full Stack Developer" role, what is the best strategy?',
        options: [
          'Maintain targeted versions of your resume emphasizing backend API scaling/databases for the former, and frontend UI/system integration for the latter',
          'Submit a generic 10-page document covering everything',
          'Never customize your resume for specific job descriptions',
          'Change your degree name to match the job title'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Customized resumes that align 75%+ with the target role keyword taxonomy rank in the top percentile of ATS score brackets.',
        companyTag: 'Amazon SDE'
      },
      {
        question: 'In modern algorithmic resume parsing (e.g. Workday, Greenhouse, Taleo), how are "Action Verbs" categorized?',
        options: [
          'High-value leadership and engineering verbs ("Spearheaded", "Engineered", "Optimized", "Refactored") score higher than passive verbs ("Assisted", "Handled", "Worked on")',
          'All verbs are assigned identical weight',
          'Only nouns are evaluated by ATS algorithms',
          'Adjectives are prioritized over verbs'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Leading ATS engines utilize Natural Language Processing (NLP) models trained to score strong action-oriented verbs demonstrating ownership.',
        companyTag: 'Google'
      },
      {
        question: 'A candidate has an employment gap or prolonged backlog clearance period during engineering. How should this be handled on the resume and during interviews?',
        options: [
          'Be transparent, account for the timeframe with productive upskilling/certifications/open-source contributions, and emphasize resilient comeback',
          'Forge fake startup employment certificates with family phone numbers',
          'Leave the dates completely blank on all previous experience',
          'Blame college professors and university management aggressively'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Background verification (BGV) checks detect fabricated work history immediately. Authentic resilience and documented upskilling build deep recruiter trust.',
        companyTag: 'TCS Digital'
      },
      {
        question: 'Which of the following GitHub repository link practices creates the most positive impression on an ATS and hiring manager?',
        options: [
          'A clean hyperlink to a GitHub profile featuring a well-structured README, live deployment demo links, and active commit activity',
          'A link to an empty repository with 0 commits',
          'A repository with 50 forked projects without any personal code changes',
          'A zip file link hosted on an unverified third-party file sharing site'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Recruiters check GitHub to verify coding cadence, documentation hygiene (README), and architecture quality.',
        companyTag: 'Microsoft'
      }
    ],
    boss: [
      {
        question: '[Amazon SDE Round 1] An Amazon Bar Raiser examines your resume project section. Which project description demonstrates the Amazon Leadership Principle "Deliver Results"?',
        options: [
          '"Owned the distributed event broker end-to-end; despite 2 upstream team blockers, delivered 3 weeks ahead of peak Prime Day with 99.999% uptime."',
          '"Tried my best to write some code but other teams did not cooperate."',
          '"Wrote nice documentation and attended all agile standup meetings."',
          '"Hoped the project would succeed after graduation."'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: '"Deliver Results" means overcoming obstacles, demonstrating relentless ownership, and driving mission-critical projects over the finish line.',
        companyTag: 'Amazon'
      },
      {
        question: '[Google Technical Round] If an ATS utilizes BERT-based semantic embeddings to compare resume text with Job Descriptions, how does it evaluate synonyms (e.g. "PostgreSQL" vs "Relational SQL database")?',
        options: [
          'Transformer embeddings map semantically related technologies close to each other in vector space, rewarding conceptual relevance even with slight phrasing differences',
          'It rejects the resume immediately if the exact string does not match character-by-character',
          'It marks PostgreSQL as an invalid keyword',
          'It converts all tech terms to uppercase only'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Modern neural ATS parsers use contextual vector embeddings (Cosine Similarity in high-dimensional embedding space) to recognize related tech stacks.',
        companyTag: 'Google'
      },
      {
        question: '[TCS Digital Advanced] In corporate background verification (BGV) for Tier-1 IT companies, which discrepancy leads to immediate revocation of an offer letter?',
        options: [
          'Discrepancy in 10th/12th/B.Tech percentage or falsified graduation year (>2% variance)',
          'Typo in a hobby description',
          'Font size being 10pt instead of 11pt',
          'Listing 3 projects instead of 4'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Academic marks and date discrepancies violate strict compliance declarations signed during campus onboarding.',
        companyTag: 'TCS Digital'
      },
      {
        question: '[Infosys InfyTQ Critical Round] What is the optimal section ordering on a college fresher resume?',
        options: [
          'Header -> Education -> Technical Skills -> Projects -> Work Experience/Internships -> Certifications & Achievements',
          'Hobbies -> References -> Education -> Skills',
          'Objective paragraph -> High School details -> Projects',
          'Family background -> Primary school marks -> Hobbies'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'For freshers, Education and Technical Skills establish baseline eligibility, followed immediately by high-impact technical projects.',
        companyTag: 'Infosys'
      },
      {
        question: '[Deloitte Strategy Track] A management consulting resume focuses on "Commercial Value". How should a student app project be framed for a consulting role?',
        options: [
          '"Engineered an automated campus mess ticketing app adopted by 3,200 students, reducing daily food wastage by 18% and saving ₹1.2 Lakhs monthly."',
          '"Built a React app with 4 buttons and 2 forms."',
          '"Used Java and HTML to make a website for college mess."',
          '"Participated in coding challenge with friends."'
        ],
        correctIndex: 0,
        difficulty: 'Hard',
        explanation: 'Translating technical implementations into business metrics (users adopted, wastage reduced, monetary savings) appeals directly to consulting recruiters.',
        companyTag: 'Deloitte'
      }
    ]
  }
};
