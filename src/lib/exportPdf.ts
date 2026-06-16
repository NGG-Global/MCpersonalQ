import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { ensureFontsReady } from './exportPng';

/**
 * מייצא את כרטיס התוצאות כ-PDF בפורמט A4.
 *
 * הגישה: מצלמים את ה-ExportCard (שמכיל עברית מלאה ב-RTL) לתמונת PNG,
 * ומשבצים אותה ב-PDF. כך אין תלות בתמיכת גופנים עבריים של jsPDF,
 * והטקסט אינו מתהפך או נשבר. אם התוכן ארוך מעמוד אחד – מחלקים לעמודים
 * נוספים מבלי לחתוך את הטקסט באמצע בצורה לא קריאה.
 */
export async function exportResultsAsPdf(element: HTMLElement): Promise<void> {
  await ensureFontsReady();

  const pixelRatio = 2; // איכות גבוהה לטקסט חד
  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio,
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
  const imgWidthPx = img.naturalWidth;
  const imgHeightPx = img.naturalHeight;

  // כמה מ"מ תופס כל פיקסל כאשר רוחב התמונה מותאם לרוחב השמיש בעמוד.
  const mmPerPx = usableWidthMm / imgWidthPx;
  const fullImgHeightMm = imgHeightPx * mmPerPx;

  if (fullImgHeightMm <= usableHeightMm) {
    // נכנס בעמוד אחד – ממרכזים אנכית קלות.
    pdf.addImage(dataUrl, 'PNG', marginMm, marginMm, usableWidthMm, fullImgHeightMm);
  } else {
    // התוכן גבוה מעמוד – פורסים על פני מספר עמודים.
    const pageHeightPx = usableHeightMm / mmPerPx;
    let renderedPx = 0;
    let isFirst = true;

    while (renderedPx < imgHeightPx) {
      const sliceHeightPx = Math.min(pageHeightPx, imgHeightPx - renderedPx);

      const canvas = document.createElement('canvas');
      canvas.width = imgWidthPx;
      canvas.height = sliceHeightPx;
      const ctx = canvas.getContext('2d');
      if (!ctx) break;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        renderedPx,
        imgWidthPx,
        sliceHeightPx,
        0,
        0,
        imgWidthPx,
        sliceHeightPx,
      );

      const sliceDataUrl = canvas.toDataURL('image/png');
      const sliceHeightMm = sliceHeightPx * mmPerPx;

      if (!isFirst) pdf.addPage();
      pdf.addImage(sliceDataUrl, 'PNG', marginMm, marginMm, usableWidthMm, sliceHeightMm);

      renderedPx += sliceHeightPx;
      isFirst = false;
    }
  }

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
