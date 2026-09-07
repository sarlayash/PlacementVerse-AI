import React, { useState, useRef } from 'react';
import { 
  Mail, Mic, MicOff, FileText, Share2, Sparkles, CheckCircle2, 
  AlertCircle, Copy, Check, Loader2, ArrowRight, Star, RefreshCw
} from 'lucide-react';
import { LearnerProfile } from '../types';
import { fireCelebrationConfetti } from '../services/storageService';

interface RealWorldTasksViewProps {
  profile: LearnerProfile;
  onUpdateProfile: (updated: LearnerProfile) => void;
}

export const RealWorldTasksView: React.FC<RealWorldTasksViewProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [activeTaskTab, setActiveTaskTab] = useState<'email' | 'gd' | 'resume' | 'linkedin'>('email');

  // Task 1: Email Writing State
  const [emailScenario, setEmailScenario] = useState('Follow-up with HR asking for interview feedback & status after Technical Round');
  const [emailText, setEmailText] = useState(
`Subject: Follow-up regarding Technical Interview Status - Software Engineer Role

Dear Hiring Manager,

Thank you for the opportunity to interview for the Software Engineer position on Tuesday. I truly enjoyed discussing the system architecture challenges with the engineering team.

I am writing to kindly inquire about the timeline for the next steps in the recruitment process. Please let me know if there are any additional details or references you require from my side.

Warm regards,
${profile.name || 'Learner'}
${profile.institute || 'National Engineering College'}`);
  const [emailEvaluating, setEmailEvaluating] = useState(false);
  const [emailResult, setEmailResult] = useState<any>(null);
  const [copiedPolishedEmail, setCopiedPolishedEmail] = useState(false);

  // Task 2: GD / Speech State
  const [gdTopic, setGdTopic] = useState('Will AI replace entry-level software developers in India, or empower them?');
  const [isRecording, setIsRecording] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState(
`Good morning distinguished panel and peers. While automation has indeed altered baseline coding tasks, historical precedent demonstrates that technology shifts developers to higher-order problem formulation and architecture. In Indian tech hubs, engineers leveraging generative AI will build faster, not be replaced.`);
  const [speechEvaluating, setSpeechEvaluating] = useState(false);
  const [speechResult, setSpeechResult] = useState<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  // Task 3: Resume ATS Reviewer State
  const [targetRole, setTargetRole] = useState('Software Engineer / SDE-1');
  const [resumeText, setResumeText] = useState(
`KAPIL | B.Tech Computer Science | National Engineering College | CGPA: 8.7/10
GitHub: github.com/kapil-dev | LinkedIn: linkedin.com/in/kapil-ready

TECHNICAL SKILLS:
Languages: Java, C++, TypeScript, JavaScript, Python
Web Tech: React.js, Next.js, Node.js, Express, Tailwind CSS
Databases: PostgreSQL, MongoDB, Redis
Tools: Git, Docker, Linux, Postman, Jest

EXPERIENCE & PROJECTS:
1. PlacementVerse AI Platform (Full-Stack Developer)
- Built an interactive placement preparation platform using React, Node.js and Gemini GenAI.
- Handled 200+ practice questions and real-time audio evaluation for mock interviews.
- Reduced API response latency by 35% using server caching and debounced state.

2. Campus Event Management Portal
- Developed student registration dashboard with QR code verification.
- Integrated PostgreSQL database handling 2,000+ registrations.

ACHIEVEMENTS & LEADERSHIP:
- Winner, Smart India Hackathon (College Internal Round)
- 400+ algorithmic questions solved on LeetCode (Knight badge)`);
  const [resumeEvaluating, setResumeEvaluating] = useState(false);
  const [resumeResult, setResumeResult] = useState<any>(null);

  // Task 4: LinkedIn Optimization State
  const [targetField, setTargetField] = useState('Software Engineering & AI');
  const [liHeadline, setLiHeadline] = useState(`Computer Science Student @ ${profile.institute || 'Engineering College'} | Aspiring Software Engineer | React & Node.js`);
  const [liAbout, setLiAbout] = useState(
`I am a passionate Computer Science student dedicated to solving complex problems through full-stack development and artificial intelligence. 

I enjoy building real-world applications with React, TypeScript, and modern backend architectures. Always eager to collaborate on high-impact software systems!`);
  const [liEvaluating, setLiEvaluating] = useState(false);
  const [liResult, setLiResult] = useState<any>(null);

  // Submit Email Writing
  const handleEvaluateEmail = async () => {
    setEmailEvaluating(true);
    try {
      const res = await fetch('/api/evaluate/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailContent: emailText, promptScenario: emailScenario }),
      });
      const data = await res.json();
      setEmailResult(data);

      // Award XP
      const updated = {
        ...profile,
        xp: profile.xp + 100,
        realWorldSubmissions: {
          ...profile.realWorldSubmissions,
          email: { score: data.overallScore, date: new Date().toISOString(), feedback: data.feedback },
        },
      };
      onUpdateProfile(updated);
      fireCelebrationConfetti();
    } catch (e) {
      console.error(e);
    } finally {
      setEmailEvaluating(false);
    }
  };

  // Recording handler for GD
  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        recorder.start();
        setIsRecording(true);
      } catch (err) {
        alert('Microphone permission not granted or not supported in this frame. You can type or edit your spoken transcript directly in the box below!');
        setIsRecording(false);
      }
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    }
  };

  // Submit GD Speech
  const handleEvaluateSpeech = async () => {
    setSpeechEvaluating(true);
    try {
      const res = await fetch('/api/evaluate/speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: speechTranscript, topic: gdTopic, durationSeconds: 45 }),
      });
      const data = await res.json();
      setSpeechResult(data);

      const updated = {
        ...profile,
        xp: profile.xp + 150,
        badgesEarned: Array.from(new Set([...profile.badgesEarned, 'gold-speaker'])),
        realWorldSubmissions: {
          ...profile.realWorldSubmissions,
          gd: { score: data.overallScore, date: new Date().toISOString(), feedback: data.feedback },
        },
      };
      onUpdateProfile(updated);
      fireCelebrationConfetti();
    } catch (e) {
      console.error(e);
    } finally {
      setSpeechEvaluating(false);
    }
  };

  // Submit Resume Review
  const handleEvaluateResume = async () => {
    setResumeEvaluating(true);
    try {
      const res = await fetch('/api/evaluate/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, targetRole }),
      });
      const data = await res.json();
      setResumeResult(data);

      const updated = {
        ...profile,
        xp: profile.xp + 150,
        badgesEarned: Array.from(new Set([...profile.badgesEarned, 'resume-expert'])),
        realWorldSubmissions: {
          ...profile.realWorldSubmissions,
          resume: { atsScore: data.atsScore, date: new Date().toISOString() },
        },
      };
      onUpdateProfile(updated);
      fireCelebrationConfetti();
    } catch (e) {
      console.error(e);
    } finally {
      setResumeEvaluating(false);
    }
  };

  // Submit LinkedIn Review
  const handleEvaluateLinkedIn = async () => {
    setLiEvaluating(true);
    try {
      const res = await fetch('/api/evaluate/linkedin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline: liHeadline, about: liAbout, targetField }),
      });
      const data = await res.json();
      setLiResult(data);

      const updated = {
        ...profile,
        xp: profile.xp + 150,
        badgesEarned: Array.from(new Set([...profile.badgesEarned, 'linkedin-pro'])),
        realWorldSubmissions: {
          ...profile.realWorldSubmissions,
          linkedin: { score: data.overallScore, date: new Date().toISOString() },
        },
      };
      onUpdateProfile(updated);
      fireCelebrationConfetti();
    } catch (e) {
      console.error(e);
    } finally {
      setLiEvaluating(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Real-world Tasks Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
            Hands-on Placement Simulation
          </span>
          <span className="text-xs text-slate-400">Beyond MCQs: Learn By Doing</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Real-World Placement Tasks
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Recruiters don't just hire for MCQ scores. Practice writing formal emails to HR, record Group Discussion speeches with real-time AI scoring, scan your resume against strict ATS filters, and optimize your LinkedIn profile for recruiter reach.
        </p>
      </div>

      {/* Task Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200">
        <button
          onClick={() => setActiveTaskTab('email')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTaskTab === 'email'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Email Writing to HR</span>
        </button>

        <button
          onClick={() => setActiveTaskTab('gd')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTaskTab === 'gd'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>Group Discussion & Voice</span>
        </button>

        <button
          onClick={() => setActiveTaskTab('resume')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTaskTab === 'resume'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Resume ATS Reviewer</span>
        </button>

        <button
          onClick={() => setActiveTaskTab('linkedin')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTaskTab === 'linkedin'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>LinkedIn Optimizer</span>
        </button>
      </div>

      {/* ================= TASK 1: EMAIL WRITING ================= */}
      {activeTaskTab === 'email' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
          
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Scenario Prompt
              </label>
              <select
                value={emailScenario}
                onChange={(e) => setEmailScenario(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Follow-up with HR asking for interview feedback & status after Technical Round">
                  Follow-up with HR asking for interview feedback & status
                </option>
                <option value="Negotiating Joining Date or Salary Package respectfully with HR">
                  Negotiating Joining Date or Salary Package respectfully
                </option>
                <option value="Requesting an Internal Referral from a Senior Alumnus on LinkedIn">
                  Requesting an Internal Referral from a Senior Alumnus
                </option>
                <option value="Accepting Campus Placement Offer with Gratitude">
                  Accepting Campus Placement Offer with Gratitude
                </option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Your Draft Email
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  {emailText.trim().split(/\s+/).filter(Boolean).length} Words
                </span>
              </div>
              <textarea
                rows={10}
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
                placeholder="Write your email here..."
                className="w-full p-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
              />
            </div>

            <button
              disabled={emailEvaluating || emailText.trim().length < 20}
              onClick={handleEvaluateEmail}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
            >
              {emailEvaluating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating Grammar, Tone & Professionalism...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Evaluate with AI (+100 XP)</span>
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {emailResult ? (
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">AI Evaluation</span>
                  <span className="text-xl font-black text-blue-600 font-display">
                    {emailResult.overallScore}/100
                  </span>
                </div>

                {/* Score meters */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Grammar</p>
                    <p className="text-base font-black text-slate-900 mt-0.5">{emailResult.grammarScore}%</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Professional</p>
                    <p className="text-base font-black text-slate-900 mt-0.5">{emailResult.professionalismScore}%</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Tone</p>
                    <p className="text-base font-black text-slate-900 mt-0.5">{emailResult.toneScore}%</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-700">Coach Feedback:</p>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{emailResult.feedback}</p>
                </div>

                {/* Strengths & fixes */}
                <div className="text-xs space-y-2 pt-1 border-t border-slate-100">
                  <div>
                    <p className="font-bold text-emerald-700">✓ Strengths:</p>
                    <ul className="text-slate-600 list-disc list-inside mt-0.5 space-y-0.5">
                      {emailResult.strengths?.map((s: string, idx: number) => <li key={idx}>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-amber-700">⚡ Improvements:</p>
                    <ul className="text-slate-600 list-disc list-inside mt-0.5 space-y-0.5">
                      {emailResult.improvements?.map((im: string, idx: number) => <li key={idx}>{im}</li>)}
                    </ul>
                  </div>
                </div>

                {/* Polished Rewrite */}
                {emailResult.polishedVersion && (
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Polished Corporate Rewrite</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(emailResult.polishedVersion);
                          setCopiedPolishedEmail(true);
                          setTimeout(() => setCopiedPolishedEmail(false), 2000);
                        }}
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold"
                      >
                        {copiedPolishedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPolishedEmail ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono whitespace-pre-line leading-relaxed border border-slate-800">
                      {emailResult.polishedVersion}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">AI Recruiter Evaluation</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Write your draft on the left and click Evaluate. The AI evaluates grammar accuracy, corporate professionalism, executive tone, and generates a polished rewrite.
                </p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ================= TASK 2: GROUP DISCUSSION & SPEECH ================= */}
      {activeTaskTab === 'gd' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
          
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                GD Topic
              </label>
              <select
                value={gdTopic}
                onChange={(e) => setGdTopic(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Will AI replace entry-level software developers in India, or empower them?">
                  Will AI replace entry-level software developers in India, or empower them?
                </option>
                <option value="Moonlighting in IT: Professional freedom or ethical breach?">
                  Moonlighting in IT: Professional freedom or ethical breach?
                </option>
                <option value="Work From Office vs Hybrid: What optimizes long-term innovation?">
                  Work From Office vs Hybrid: What optimizes long-term innovation?
                </option>
                <option value="Campus placements vs Higher Studies: The ROI decision matrix">
                  Campus placements vs Higher Studies: The ROI decision matrix
                </option>
              </select>
            </div>

            {/* Voice Recording Control */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleRecording}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    isRecording
                      ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/40'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                  }`}
                >
                  {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>
                <div>
                  <p className="text-sm font-bold">{isRecording ? 'Listening & Recording...' : 'Record Voice Speech'}</p>
                  <p className="text-[11px] text-slate-400">
                    {isRecording ? 'Speak clearly into your microphone' : 'Click mic to record or edit transcript below'}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Target: 30 - 60s
              </span>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Spoken Speech Transcript / Content
              </label>
              <textarea
                rows={7}
                value={speechTranscript}
                onChange={(e) => setSpeechTranscript(e.target.value)}
                placeholder="Spoken words will appear here or you can type directly..."
                className="w-full p-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-sans text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
              />
            </div>

            <button
              disabled={speechEvaluating || speechTranscript.trim().length < 15}
              onClick={handleEvaluateSpeech}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
            >
              {speechEvaluating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating Confidence, Grammar & Eye Contact Tips...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>AI Score Speech (+150 XP & Gold Speaker Badge)</span>
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {speechResult ? (
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">GD Speech Score</span>
                  <span className="text-xl font-black text-amber-600 font-display">
                    {speechResult.overallScore}/100
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Confidence</p>
                    <p className="text-base font-black text-slate-900 mt-0.5">{speechResult.confidenceScore}%</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Grammar</p>
                    <p className="text-base font-black text-slate-900 mt-0.5">{speechResult.grammarScore}%</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Clarity</p>
                    <p className="text-base font-black text-slate-900 mt-0.5">{speechResult.communicationScore}%</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs space-y-1">
                  <p className="font-bold text-blue-900">👁️ Eye Contact & Body Language:</p>
                  <p className="text-blue-950 leading-relaxed">{speechResult.eyeContactTips}</p>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-700">Articulated Feedback:</p>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{speechResult.feedback}</p>
                </div>

                {speechResult.improvedOpening && (
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                      ⚡ Commanding Hook Opening For This GD
                    </p>
                    <p className="text-xs font-mono bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 italic">
                      "{speechResult.improvedOpening}"
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                  <Mic className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">Voice Speech AI Evaluator</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Speak on the selected GD topic. Our AI evaluates vocal confidence, grammatical cadence, eye-contact camera recommendations, and suggests an attention-commanding opening statement.
                </p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ================= TASK 3: RESUME ATS SCANNER ================= */}
      {activeTaskTab === 'resume' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
          
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Target Placement Role
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Software Engineer / SDE-1">Software Engineer / SDE-1</option>
                <option value="Data Analyst / Business Intelligence">Data Analyst / Business Intelligence</option>
                <option value="Full Stack Developer (MERN / React / Node)">Full Stack Developer (MERN / React / Node)</option>
                <option value="Technology Consultant / Analyst (Deloitte/Accenture)">Technology Consultant / Analyst (Deloitte/Accenture)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Paste Resume Text (or Upload Plain Text)
              </label>
              <textarea
                rows={11}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your complete resume text here..."
                className="w-full p-4 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
              />
            </div>

            <button
              disabled={resumeEvaluating || resumeText.trim().length < 30}
              onClick={handleEvaluateResume}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
            >
              {resumeEvaluating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Scanning ATS Compatibility & Google X-Y-Z Bullets...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Complete ATS Audit (+150 XP)</span>
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {resumeResult ? (
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">ATS Match Score</span>
                  <span className="text-2xl font-black text-emerald-600 font-display">
                    {resumeResult.atsScore}%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Formatting</p>
                    <p className="text-base font-black text-slate-900 mt-0.5">{resumeResult.formattingScore}%</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Impact</p>
                    <p className="text-base font-black text-slate-900 mt-0.5">{resumeResult.impactScore}%</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Keywords</p>
                    <p className="text-base font-black text-slate-900 mt-0.5">{resumeResult.keywordMatch}%</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-700">Audit Summary:</p>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{resumeResult.summary}</p>
                </div>

                {/* Missing keywords */}
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-xs font-bold text-rose-700 mb-1.5">Missing High-Value Keywords:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeResult.missingKeywords?.map((kw: string, i: number) => (
                      <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Google X-Y-Z bullet rewrites */}
                {resumeResult.bulletRewrites && (
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <p className="text-xs font-bold text-blue-700">Google X-Y-Z Bullet Upgrades:</p>
                    {resumeResult.bulletRewrites.map((b: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                        <p className="text-slate-400 line-through">Draft: {b.original}</p>
                        <p className="text-emerald-800 font-medium">⚡ Optimized: {b.improved}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">ATS Resume Scanner</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  75% of campus resumes are filtered out automatically. Check keyword density, single-column readability, and convert duty statements into Google X-Y-Z quantified achievement bullets.
                </p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ================= TASK 4: LINKEDIN OPTIMIZER ================= */}
      {activeTaskTab === 'linkedin' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
          
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Current Headline
              </label>
              <input
                type="text"
                value={liHeadline}
                onChange={(e) => setLiHeadline(e.target.value)}
                placeholder="e.g. Student at XYZ College"
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Current About Section
              </label>
              <textarea
                rows={8}
                value={liAbout}
                onChange={(e) => setLiAbout(e.target.value)}
                placeholder="Paste your LinkedIn About section..."
                className="w-full p-4 rounded-xl border border-slate-200 text-xs font-sans text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
              />
            </div>

            <button
              disabled={liEvaluating || !liHeadline}
              onClick={handleEvaluateLinkedIn}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
            >
              {liEvaluating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing Recruiter Search Visibility...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Optimize Profile for Recruiters (+150 XP)</span>
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {liResult ? (
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Recruiter Score</span>
                  <span className="text-2xl font-black text-blue-600 font-display">
                    {liResult.overallScore}/100
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 text-center">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[9px] text-slate-500 font-bold uppercase">Headline</p>
                    <p className="text-sm font-black text-slate-900 mt-0.5">{liResult.headlineScore}%</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[9px] text-slate-500 font-bold uppercase">About</p>
                    <p className="text-sm font-black text-slate-900 mt-0.5">{liResult.aboutScore}%</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[9px] text-slate-500 font-bold uppercase">Keywords</p>
                    <p className="text-sm font-black text-slate-900 mt-0.5">{liResult.keywordsScore}%</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[9px] text-slate-500 font-bold uppercase">Reach</p>
                    <p className="text-sm font-black text-slate-900 mt-0.5">{liResult.visibilityScore}%</p>
                  </div>
                </div>

                {/* Optimized Headline */}
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
                    High-Converting Headline:
                  </p>
                  <p className="text-xs font-bold text-blue-950">{liResult.optimizedHeadline}</p>
                </div>

                {/* Optimized About */}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Story-Driven About Section:
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 text-xs font-sans whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto border border-slate-800">
                    {liResult.optimizedAbout}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                  <Share2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">LinkedIn Profile Engine</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Optimize your profile for campus recruiters on LinkedIn. Generate a keyword-stuffed headline that appears in Recruiter search results and an engaging About narrative.
                </p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
