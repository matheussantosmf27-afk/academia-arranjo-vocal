import { jsPDF } from "jspdf";
import { getFormation } from "@/domain/music/formations";
import type { Score } from "@/domain/music/score";
import { analyzeHarmony } from "@/domain/validation";
import { loadVexFlow, renderScore } from "@/lib/notation/render";

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 14;
/** Largura lógica da partitura (px) e fator de resolução da imagem. */
const LOGICAL_WIDTH = 760;
const RES = 2.5;

/**
 * Gera um PDF A4 da partitura: renderiza com VexFlow em <canvas> (mesmo
 * motor da tela), recorta sistema por sistema e pagina sem cortar sistemas.
 * Só funciona no navegador.
 */
export async function exportScorePdf(score: Score, opts: { includeHarmony?: boolean } = {}): Promise<Blob> {
  const VF = await loadVexFlow();
  const canvas = document.createElement("canvas");
  const result = renderScore(VF, canvas as unknown as HTMLElement, score, {
    width: LOGICAL_WIDTH * RES,
    zoom: RES,
    showLyrics: true,
    backend: "canvas",
    ...(opts.includeHarmony ? { harmony: analyzeHarmony(score) } : {}),
  });

  const pdf = new jsPDF({ unit: "mm", format: "a4", compress: true });
  pdf.setProperties({ title: score.title, creator: "Academia de Arranjo Vocal" });
  const contentW = PAGE_W - MARGIN * 2;
  const mmPerPx = contentW / canvas.width;
  const formation = getFormation(score.formation);

  let y = MARGIN;
  pdf.setFont("times", "bold");
  pdf.setFontSize(18);
  pdf.text(score.title, PAGE_W / 2, y + 6, { align: "center" });
  pdf.setFont("times", "normal");
  pdf.setFontSize(10);
  const credits = [score.metadata.composer && `Música: ${score.metadata.composer}`, score.metadata.arranger && `Arranjo: ${score.metadata.arranger}`].filter(Boolean).join(" · ");
  pdf.text(`${formation.name} · ${score.timeSignature.beats}/${score.timeSignature.beatType} · ${score.tempoBpm} bpm`, MARGIN, y + 14);
  if (credits) pdf.text(credits, PAGE_W - MARGIN, y + 14, { align: "right" });
  y += 20;

  const slice = document.createElement("canvas");
  const sctx = slice.getContext("2d");
  if (!sctx) throw new Error("Canvas 2D indisponível neste navegador.");
  for (const sys of result.systems) {
    const h = Math.min(sys.height, canvas.height - sys.top);
    if (h <= 0) continue;
    const hMm = h * mmPerPx;
    if (y + hMm > PAGE_H - MARGIN - 6) {
      pdf.addPage();
      y = MARGIN;
    }
    slice.width = canvas.width;
    slice.height = h;
    sctx.fillStyle = "#fff";
    sctx.fillRect(0, 0, slice.width, slice.height);
    sctx.drawImage(canvas, 0, sys.top, canvas.width, h, 0, 0, canvas.width, h);
    pdf.addImage(slice.toDataURL("image/png"), "PNG", MARGIN, y, contentW, hMm, undefined, "FAST");
    y += hMm;
  }

  const pages = pdf.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(110);
    pdf.text("Academia de Arranjo Vocal", MARGIN, PAGE_H - 7);
    pdf.text(`${i} / ${pages}`, PAGE_W - MARGIN, PAGE_H - 7, { align: "right" });
  }
  return pdf.output("blob");
}
