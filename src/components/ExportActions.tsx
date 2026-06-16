type ExportActionsProps = {
  onDownloadPdf: () => void;
  onDownloadPng: () => void;
  busy: boolean;
  showRestart?: boolean;
  onRestart?: () => void;
};

/**
 * קבוצת כפתורי הפעולה של מסך התוצאות: הורדת PDF, שמירה כ-PNG ומילוי מחדש.
 */
export default function ExportActions({
  onDownloadPdf,
  onDownloadPng,
  busy,
  showRestart,
  onRestart,
}: ExportActionsProps) {
  return (
    <>
      {showRestart && onRestart && (
        <button type="button" className="btn btn--ghost restart" onClick={onRestart}>
          <span className="arrow" aria-hidden="true">
            ↻
          </span>
          מילוי מחדש
        </button>
      )}
      <button
        type="button"
        className="btn btn--outline"
        onClick={onDownloadPng}
        disabled={busy}
      >
        שמירה כ-PNG
      </button>
      <button
        type="button"
        className="btn btn--primary"
        onClick={onDownloadPdf}
        disabled={busy}
      >
        <span className="arrow" aria-hidden="true">
          ↓
        </span>
        הורדת PDF
      </button>
    </>
  );
}
