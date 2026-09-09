import { FinalAssessmentQuestion } from '../../types';
import { SECTION_1_QUANTITATIVE } from './section1Quantitative';
import { SECTION_2_REASONING } from './section2Reasoning';
import { SECTION_3_CS_CORE } from './section3CsCore';
import { SECTION_4_DSA } from './section4Dsa';
import { SECTION_5_VERBAL_SITUATIONAL } from './section5VerbalSituational';

export const FINAL_ASSESSMENT_TOTAL_QUESTIONS = 250;
export const FINAL_ASSESSMENT_DURATION_MINUTES = 90;
export const FINAL_ASSESSMENT_DURATION_SECONDS = 90 * 60; // 5400 seconds

export const FINAL_ASSESSMENT_QUESTIONS: FinalAssessmentQuestion[] = [
  ...SECTION_1_QUANTITATIVE,
  ...SECTION_2_REASONING,
  ...SECTION_3_CS_CORE,
  ...SECTION_4_DSA,
  ...SECTION_5_VERBAL_SITUATIONAL,
];

export interface FinalAssessmentSectionMeta {
  id: string;
  name: string;
  startQuestion: number;
  endQuestion: number;
  total: number;
  color: string;
  description: string;
}

export const FINAL_ASSESSMENT_SECTIONS: FinalAssessmentSectionMeta[] = [
  {
    id: 'sec-1',
    name: 'Advanced Quantitative Aptitude',
    startQuestion: 1,
    endQuestion: 50,
    total: 50,
    color: 'emerald',
    description: 'Number Theory, Modular Arithmetic, Probability Distributions, Combinatorics, Work-Time, Advanced Geometry'
  },
  {
    id: 'sec-2',
    name: 'Logical & Algorithmic Reasoning',
    startQuestion: 51,
    endQuestion: 100,
    total: 50,
    color: 'blue',
    description: 'Binary Logic, Knights & Knaves, Syllogisms, Matrix Deductions, Input-Output State Machines, Spatial 3D'
  },
  {
    id: 'sec-3',
    name: 'CS Core & Systems Engineering',
    startQuestion: 101,
    endQuestion: 150,
    total: 50,
    color: 'purple',
    description: 'Virtual Memory, Inodes, B+ Trees, ACID, Two-Phase Locking, TCP Congestion Control, QUIC, MESI Cache'
  },
  {
    id: 'sec-4',
    name: 'DSA & Algorithmic Complexity',
    startQuestion: 151,
    endQuestion: 200,
    total: 50,
    color: 'amber',
    description: 'Red-Black Trees, Segment Trees, Held-Karp TSP, Tarjan SCC, Monotonic Stacks, KMP, Max-Flow Dinic, NP-Complete'
  },
  {
    id: 'sec-5',
    name: 'Verbal, Architecture & Situational',
    startQuestion: 201,
    endQuestion: 250,
    total: 50,
    color: 'rose',
    description: 'Distributed Sagas, Circuit Breakers, PKCE OAuth2, Blameless SRE Postmortems, Event Sourcing, RFC Grammar'
  }
];

export const getSectionByQuestionIndex = (index: number): FinalAssessmentSectionMeta => {
  const qNum = index + 1;
  const section = FINAL_ASSESSMENT_SECTIONS.find(s => qNum >= s.startQuestion && qNum <= s.endQuestion);
  return section || FINAL_ASSESSMENT_SECTIONS[0];
};
