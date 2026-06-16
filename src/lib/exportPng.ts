import { toPng } from 'html-to-image';

/**
 * מייצא אלמנט נתון כקובץ PNG.
 * האלמנט אמור להיות ה-ExportCard בגודל קבוע (1080×1350),
 * כך שהתוצאה אינה תלויה ברוחב המסך של המשתמש/ת.
 */
export async function exportResultsAsPng(element: HTMLElement): Promise<void> {
  await ensureFontsReady();

  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 1,
    width: element.offsetWidth,
    height: element.offsetHeight,
    backgroundColor: '#ffffff',
  });

  triggerDownload(dataUrl, 'manager-ai-reflection-results.png');
}

export async function ensureFontsReady(): Promise<void> {
  try {
    if (document.fonts && 'ready' in document.fonts) {
      await document.fonts.ready;
    }
  } catch {
    /* ignore – fall back to whatever is loaded */
  }
}

function triggerDownload(dataUrl: string, fileName: string): void {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}
