import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { ensureFontsReady } from './exportPng';

/**
 * מייצא את כרטיס התוצאות כ-PDF בפורמט A4.
 *
 * הגישה: מצלמים את ה-ExportCard (שמכיל עברית מלאה ב-RTL) לתמונת PNG,
 * ומשבצים אותה ב-PDF. כך אין תלות בתמיכת גופנים עבריים של jsPDF,
 * והטקסט אינו מתהפך או נשבר.
 *
 * כדי לוודא שהתמונה לעולם אינה נחתכת, מתאימים אותה במלואה לעמוד A4 יחיד
 * (contain): מחשבים את קנה המידה הקטן מבין התאמה לרוחב והתאמה לגובה,
 * וממקמים את התמונה השלמה בעמוד עם שוליים.
 */
export async function exportResultsAsPdf(element: HTMLElement): Promise<void> {
  await ensureFontsReady();

  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 2, // איכות גבוהה לטקסט חד
    width: element.offsetWidth,
    height: element.offsetHeight,
    backgroundColor: '#ffffff',
  });

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidthMm = pdf.internal.pageSize.getWidth();
  const pageHeightMm = pdf.internal.pageSize.getHeight();
  const marginMm = 10;
  const usableWidthMm = pageWidthMm - marginMm * 2;
  const usableHeightMm = pageHeightMm - marginMm * 2;

  const img = await loadImage(dataUrl);
  const imgRatio = img.naturalWidth / img.naturalHeight;

  // התאמת "contain" – התמונה השלמה נכנסת לעמוד אחד ללא חיתוך.
  let drawWidthMm = usableWidthMm;
  let drawHeightMm = drawWidthMm / imgRatio;
  if (drawHeightMm > usableHeightMm) {
    drawHeightMm = usableHeightMm;
    drawWidthMm = drawHeightMm * imgRatio;
  }

  const x = (pageWidthMm - drawWidthMm) / 2; // ממורכז אופקית
  const y = marginMm; // מיושר לראש העמוד

  pdf.addImage(dataUrl, 'PNG', x, y, drawWidthMm, drawHeightMm);
  pdf.save('manager-ai-reflection-results.pdf');
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
