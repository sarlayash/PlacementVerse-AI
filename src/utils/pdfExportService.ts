import { jsPDF } from 'jspdf';
import { Topic } from '../types';

export function exportTopicNotesAsPdf(topic: Topic): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Helper to ensure we have enough vertical space, otherwise create new page
  const ensureSpace = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 20) {
      doc.addPage();
      y = margin;
      drawRunningHeader();
    }
  };

  const drawRunningHeader = () => {
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, pageWidth, 12, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('PLACEMENTVERSE AI • OFFLINE PLACEMENT LESSON NOTES', margin, 8);
    doc.setFont('helvetica', 'normal');
    doc.text(`${topic.name} (${topic.moduleName})`, pageWidth - margin, 8, { align: 'right' });
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, 12, pageWidth - margin, 12);
    y = 18;
  };

  // 1. Cover / Top Header Banner
  doc.setFillColor(15, 23, 42); // Dark slate (#0f172a)
  doc.roundedRect(margin, y, contentWidth, 34, 3, 3, 'F');

  // Badge inside banner
  doc.setFillColor(37, 99, 235); // Blue (#2563eb)
  doc.roundedRect(margin + 5, y + 5, 45, 6, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text(topic.moduleName.toUpperCase(), margin + 27.5, y + 9.2, { align: 'center' });

  // Topic Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  const titleLines = doc.splitTextToSize(topic.name, contentWidth - 10);
  doc.text(titleLines, margin + 5, y + 18);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text(
    `Comprehensive 10-Minute Concept Breakdown, Formulae, Industry Cases & Offline Reference`,
    margin + 5,
    y + 28
  );

  y += 40;

  // 2. Concept Summary Section
  ensureSpace(28);
  doc.setFillColor(238, 242, 255); // Indigo light
  doc.setDrawColor(199, 210, 254);
  doc.setLineWidth(0.5);

  const summaryLines = doc.splitTextToSize(topic.learningContent.summary, contentWidth - 10);
  const summaryBoxHeight = Math.max(24, summaryLines.length * 4.5 + 14);

  doc.roundedRect(margin, y, contentWidth, summaryBoxHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 58, 138); // Dark blue
  doc.text('1. CONCEPT BREAKDOWN & CORE PRINCIPLES', margin + 5, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text(summaryLines, margin + 5, y + 13);

  y += summaryBoxHeight + 8;

  // 3. Key Formulas & Shortcuts
  if (topic.learningContent.keyFormulas && topic.learningContent.keyFormulas.length > 0) {
    ensureSpace(20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('2. CORE FORMULAS & FAST SPEED SHORTCUTS', margin, y);
    y += 5;

    for (let i = 0; i < topic.learningContent.keyFormulas.length; i++) {
      const f = topic.learningContent.keyFormulas[i];
      const noteLines = doc.splitTextToSize(f.note || '', contentWidth - 12);
      const formulaItemHeight = 16 + noteLines.length * 4;

      ensureSpace(formulaItemHeight);

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.4);
      doc.roundedRect(margin, y, contentWidth, formulaItemHeight, 2, 2, 'FD');

      // Formula Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      doc.text(f.name, margin + 4, y + 5.5);

      // Formula Code/Equation
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(margin + 4, y + 7.5, contentWidth - 8, 6, 1, 1, 'FD');
      doc.setFont('courier', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(29, 78, 216); // Blue
      doc.text(f.formula, margin + 7, y + 11.5);

      // Note
      if (f.note) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7.5);
        doc.setTextColor(100, 116, 139);
        doc.text(noteLines, margin + 4, y + 17.5);
      }

      y += formulaItemHeight + 3;
    }
    y += 4;
  }

  // 4. Worked Industry Examples
  if (topic.learningContent.workedExamples && topic.learningContent.workedExamples.length > 0) {
    ensureSpace(20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('3. WORKED STEP-BY-STEP EXAMPLES & EXAM TIPS', margin, y);
    y += 5;

    for (let i = 0; i < topic.learningContent.workedExamples.length; i++) {
      const ex = topic.learningContent.workedExamples[i];
      const probLines = doc.splitTextToSize(`Problem: ${ex.problem}`, contentWidth - 10);
      const solLines = doc.splitTextToSize(ex.solution, contentWidth - 14);
      const tipLines = doc.splitTextToSize(`Exam Tip: ${ex.tip}`, contentWidth - 14);

      const exampleHeight = 12 + probLines.length * 4 + solLines.length * 3.8 + (ex.tip ? tipLines.length * 3.8 + 4 : 0);

      ensureSpace(exampleHeight);

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.4);
      doc.roundedRect(margin, y, contentWidth, exampleHeight, 2, 2, 'FD');

      // Problem Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(probLines, margin + 4, y + 5);

      let innerY = y + 5 + probLines.length * 4;

      // Solution box
      const solBoxH = solLines.length * 3.8 + 4;
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin + 4, innerY, contentWidth - 8, solBoxH, 1, 1, 'FD');

      doc.setFont('courier', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(51, 65, 85);
      doc.text(solLines, margin + 6, innerY + 3.5);

      innerY += solBoxH + 3;

      // Exam Tip
      if (ex.tip) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(180, 83, 9); // Amber
        doc.text(tipLines, margin + 4, innerY + 2);
      }

      y += exampleHeight + 4;
    }
    y += 4;
  }

  // 5. Industry Case Study
  if (topic.learningContent.industryCase && topic.learningContent.industryCase.company) {
    const c = topic.learningContent.industryCase;
    const contextLines = doc.splitTextToSize(c.context, contentWidth - 12);
    const takeawayLines = doc.splitTextToSize(`Key Metric / Takeaway: ${c.keyTakeaway}`, contentWidth - 12);
    const caseHeight = 16 + contextLines.length * 4 + takeawayLines.length * 4;

    ensureSpace(caseHeight + 8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('4. REAL-WORLD CORPORATE APPLICATION', margin, y);
    y += 5;

    doc.setFillColor(240, 245, 255); // Pale indigo
    doc.setDrawColor(199, 210, 254);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, y, contentWidth, caseHeight, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(67, 56, 202);
    doc.text(`Company Case Study: ${c.company}`, margin + 4, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text(contextLines, margin + 4, y + 11);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 58, 138);
    doc.text(takeawayLines, margin + 4, y + 13 + contextLines.length * 4);

    y += caseHeight + 6;
  }

  // 6. Infographic Takeaways & Quick Revision Checklist
  if (topic.learningContent.infographicTakeaways && topic.learningContent.infographicTakeaways.length > 0) {
    const list = topic.learningContent.infographicTakeaways;
    const listHeight = 12 + list.length * 6;

    ensureSpace(listHeight);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('5. LAST-MINUTE REVISION CHEAT-SHEET', margin, y);
    y += 5;

    doc.setFillColor(240, 253, 244); // Light emerald
    doc.setDrawColor(187, 247, 208);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, y, contentWidth, listHeight, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(21, 128, 61);
    doc.text('High-Yield Placement Takeaways:', margin + 4, y + 6);

    let checkY = y + 11;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(22, 101, 52);

    for (let i = 0; i < list.length; i++) {
      const itemLines = doc.splitTextToSize(list[i], contentWidth - 14);
      doc.text('✓', margin + 4, checkY);
      doc.text(itemLines, margin + 9, checkY);
      checkY += Math.max(5, itemLines.length * 4);
    }

    y += listHeight + 6;
  }

  // 7. Sample Practice Questions for Offline Drill
  if (topic.practiceQuestions && topic.practiceQuestions.length > 0) {
    const sampleQuestions = topic.practiceQuestions.slice(0, 3);
    ensureSpace(24);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('6. HIGH-FREQUENCY PRACTICE DRILL (SAMPLE)', margin, y);
    y += 5;

    for (let i = 0; i < sampleQuestions.length; i++) {
      const q = sampleQuestions[i];
      const qText = `Q${i + 1} [${q.difficulty}]: ${q.question}`;
      const qLines = doc.splitTextToSize(qText, contentWidth - 10);
      const optLines = q.options.map((opt, idx) => `  ${String.fromCharCode(65 + idx)}. ${opt}`);
      const expLines = doc.splitTextToSize(`Correct: Option ${String.fromCharCode(65 + q.correctIndex)} | Explanation: ${q.explanation}`, contentWidth - 12);

      const qBoxHeight = 10 + qLines.length * 4 + optLines.length * 4 + expLines.length * 3.8;

      ensureSpace(qBoxHeight);

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, y, contentWidth, qBoxHeight, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text(qLines, margin + 4, y + 5);

      let optY = y + 5 + qLines.length * 4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);

      for (const line of optLines) {
        doc.text(line, margin + 4, optY);
        optY += 4;
      }

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.2);
      doc.setTextColor(30, 64, 175);
      doc.text(expLines, margin + 4, optY + 1);

      y += qBoxHeight + 3;
    }
  }

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text('PlacementVerse AI • Powered by Kapil • Offline Study Notes', margin, pageHeight - 7);
    doc.text(`Page ${p} of ${totalPages}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
  }

  const sanitizedTitle = topic.name.replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`${sanitizedTitle}_Lesson_Notes.pdf`);
}
