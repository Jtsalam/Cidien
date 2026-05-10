import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage, type RGB } from "pdf-lib";

export type ApprovedNotePdfRow = {
  index: number;
  roomNumber: number;
  bedLetter: string;
  patientNote: string;
  recordedAt: Date | null;
};

export type ApprovedNotesPdfMeta = {
  centerName?: string;
  nurseName: string;
  nurseStaffId: string;
  patientName: string;
};

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 36;
const BOTTOM = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;
const EMERALD = rgb(0.016, 0.47, 0.34);
const GRAY_GRID = rgb(0.9, 0.91, 0.92);
const GRAY_TEXT = rgb(0.22, 0.25, 0.29);

const COL = {
  idx: 36,
  date: 68,
  time: 52,
  room: 44,
  bed: 28,
  note: CONTENT_W - (36 + 68 + 52 + 44 + 28),
} as const;

const X = {
  idx: MARGIN,
  date: MARGIN + COL.idx,
  time: MARGIN + COL.idx + COL.date,
  room: MARGIN + COL.idx + COL.date + COL.time,
  bed: MARGIN + COL.idx + COL.date + COL.time + COL.room,
  note: MARGIN + COL.idx + COL.date + COL.time + COL.room + COL.bed,
};

function wrapToWidth(text: string, font: PDFFont, size: number, maxW: number): string[] {
  const normalized = text.replace(/\s+/g, " ").trim() || " ";
  const words = normalized.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= maxW) {
      line = next;
      continue;
    }
    if (line) lines.push(line);
    if (font.widthOfTextAtSize(word, size) <= maxW) {
      line = word;
      continue;
    }
    let chunk = "";
    for (const ch of word) {
      const t = chunk + ch;
      if (font.widthOfTextAtSize(t, size) <= maxW) chunk = t;
      else {
        if (chunk) lines.push(chunk);
        chunk = ch;
      }
    }
    line = chunk;
  }
  if (line) lines.push(line);
  return lines;
}

function formatDate(d: Date | null): string {
  if (!d) return "—";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function formatTime(d: Date | null): string {
  if (!d) return "—";
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}

/** Simple line-art stethoscope (bell + tube + earpiece) beside the report title. */
function drawStethoscopeIcon(p: PDFPage, cx: number, cy: number, scale: number, color: RGB) {
  const s = scale;
  p.drawEllipse({
    x: cx - 5.5 * s,
    y: cy,
    xScale: 3.2 * s,
    yScale: 3.2 * s,
    borderColor: color,
    borderWidth: 1.1,
  });
  p.drawLine({
    start: { x: cx - 2.2 * s, y: cy + 0.8 * s },
    end: { x: cx + 5 * s, y: cy + 2.2 * s },
    thickness: 1.1,
    color,
  });
  p.drawLine({
    start: { x: cx + 1 * s, y: cy + 1.2 * s },
    end: { x: cx - 1 * s, y: cy + 3.8 * s },
    thickness: 1.1,
    color,
  });
  p.drawEllipse({
    x: cx + 6.2 * s,
    y: cy + 2.4 * s,
    xScale: 2.2 * s,
    yScale: 2.2 * s,
    borderColor: color,
    borderWidth: 1,
  });
}

/** Nursing progress PDF (layout inspired by Charting-Device remote.py ReportLab table). */
export async function buildSessionApprovedNotesPdf(
  rows: ApprovedNotePdfRow[],
  meta: ApprovedNotesPdfMeta,
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const titleSize = 18;
  const headerSize = 9;
  const subHeaderSize = 10;
  const cellSize = 8;
  const lead = 11;
  const notePad = 6;
  const noteMaxW = COL.note - notePad * 2;

  let page = pdfDoc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - MARGIN;

  const drawCenteredLine = (p: PDFPage, text: string, size: number, f: PDFFont, color: RGB, extraGap = 2) => {
    const lines = wrapToWidth(text, f, size, CONTENT_W - 8);
    for (const hl of lines) {
      const hw = f.widthOfTextAtSize(hl, size);
      p.drawText(hl, {
        x: (PAGE_W - hw) / 2,
        y: y - size,
        size,
        font: f,
        color,
      });
      y -= size + extraGap;
    }
  };

  const drawTitle = (p: PDFPage, continued: boolean) => {
    const title = continued ? "Nursing Progress Report (continued)" : "Nursing Progress Report";
    const titleW = fontBold.widthOfTextAtSize(title, titleSize);
    const iconHalfW = 14;
    const gap = 10;
    const totalW = iconHalfW * 2 + gap + titleW;
    const leftX = (PAGE_W - totalW) / 2;
    const titleBaseline = y - titleSize;
    const iconCx = leftX + iconHalfW;
    const iconCy = titleBaseline + titleSize * 0.32;
    drawStethoscopeIcon(p, iconCx, iconCy, 1.15, EMERALD);

    p.drawText(title, {
      x: leftX + iconHalfW * 2 + gap,
      y: titleBaseline,
      size: titleSize,
      font: fontBold,
      color: EMERALD,
    });
    y -= titleSize + 8;

    const nurseLine = `Nurse: ${meta.nurseName}  ·  Staff ID: ${meta.nurseStaffId}`;
    drawCenteredLine(p, nurseLine, subHeaderSize, fontBold, GRAY_TEXT, 3);
    drawCenteredLine(p, `Patient: ${meta.patientName}`, subHeaderSize, font, GRAY_TEXT, 6);

    const gen = new Date().toISOString().slice(0, 19).replace("T", " ");
    const bits = [meta.centerName ? `Center: ${meta.centerName}` : null, `Generated: ${gen}`].filter(Boolean);
    const headerLine = bits.join("  ·  ");
    drawCenteredLine(p, headerLine, headerSize, font, EMERALD, 2);
    y -= 10;
  };

  const drawTableHeader = (p: PDFPage) => {
    const headerH = 22;
    p.drawRectangle({
      x: MARGIN,
      y: y - headerH,
      width: CONTENT_W,
      height: headerH,
      color: rgb(0.976, 0.98, 0.984),
      borderColor: GRAY_GRID,
      borderWidth: 0.5,
    });
    const headers: { t: string; x: number }[] = [
      { t: "Index", x: X.idx + 4 },
      { t: "Date", x: X.date + 2 },
      { t: "Time", x: X.time + 2 },
      { t: "Room", x: X.room + 2 },
      { t: "Bed", x: X.bed + 2 },
      { t: "Patient note", x: X.note + 4 },
    ];
    for (const { t, x: lx } of headers) {
      p.drawText(t, {
        x: lx,
        y: y - 14,
        size: 9,
        font: fontBold,
        color: GRAY_TEXT,
      });
    }
    y -= headerH + 4;
  };

  const ensureSpace = (need: number) => {
    if (y - need < BOTTOM) {
      page = pdfDoc.addPage([PAGE_W, PAGE_H]);
      y = PAGE_H - MARGIN;
      drawTitle(page, true);
      drawTableHeader(page);
    }
  };

  drawTitle(page, false);
  drawTableHeader(page);

  for (const row of rows) {
    const noteLines = wrapToWidth(row.patientNote, font, cellSize, noteMaxW);
    const rowTextH = Math.max(lead + 4, noteLines.length * lead + 8);
    ensureSpace(rowTextH + 8);

    const rowTop = y;
    page.drawRectangle({
      x: MARGIN,
      y: y - rowTextH,
      width: CONTENT_W,
      height: rowTextH,
      borderColor: GRAY_GRID,
      borderWidth: 0.4,
    });

    const baseY = y - 14;
    page.drawText(String(row.index), { x: X.idx + 6, y: baseY, size: cellSize, font, color: GRAY_TEXT });
    page.drawText(formatDate(row.recordedAt), {
      x: X.date + 2,
      y: baseY,
      size: cellSize,
      font,
      color: GRAY_TEXT,
    });
    page.drawText(formatTime(row.recordedAt), {
      x: X.time + 2,
      y: baseY,
      size: cellSize,
      font,
      color: GRAY_TEXT,
    });
    page.drawText(String(row.roomNumber), {
      x: X.room + 4,
      y: baseY,
      size: cellSize,
      font,
      color: GRAY_TEXT,
    });
    page.drawText(row.bedLetter, { x: X.bed + 8, y: baseY, size: cellSize, font, color: GRAY_TEXT });

    let ny = baseY;
    for (const nl of noteLines) {
      page.drawText(nl, {
        x: X.note + notePad,
        y: ny,
        size: cellSize,
        font,
        color: GRAY_TEXT,
      });
      ny -= lead;
    }

    y = rowTop - rowTextH - 2;
  }

  return pdfDoc.save();
}
