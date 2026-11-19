import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const benchlmDirectory = "data/sources/benchlm/2026-11-18/";
const openLlmDirectory = "data/sources/open-llm-leaderboard/2025-03-20/";
const openLlmRevision = "9c09a7cae43334062a82cb164f2ef255013dafa2";
const ticks = [0, 20, 40, 60, 80, 100];
const manifest = JSON.parse(read(benchlmDirectory + "manifest.json"));

function read(path) {
  return readFileSync(new URL(path, root), "utf8").replace(/^\uFEFF/, "");
}

function readLines(path) {
  return read(path).split(/\r?\n/).filter(line => line.trim()).map(line => JSON.parse(line));
}

function readBenchlm(name) {
  const bytes = readFileSync(new URL(benchlmDirectory + name, root));
  const expected = manifest.files.find(file => file.name === name);
  if (createHash("sha256").update(bytes).digest("hex") !== expected?.sha256) {
    throw new Error("BenchLM manifest hash mismatch: " + name);
  }
  return JSON.parse(bytes.toString("utf8"));
}

const modelSnapshot = readBenchlm("models.json");
const leaderboard = readBenchlm("leaderboard.json");
const benchlmModels = new Map(modelSnapshot.items.map(model => [model.id, model]));
const boards = [
  ["overall", leaderboard.items],
  ...Object.entries(leaderboard.categories)
].map(([id, rows]) => {
  const mode = rows[0].rankingMode;
  if (rows.some(row => row.rankingMode !== mode)) throw new Error("Mixed scoring methods for " + id);
  const label = rows[0].categoryLabel ?? "Overall";
  return {
    id: "benchlm-" + id,
    rows: new Map(rows.map(row => [row.slug, row])),
    benchmark: {
      name: "BenchLM · " + label,
      group: "BenchLM",
      unit: "pts",
      ticks,
      snapshot: leaderboard.generatedAt.slice(0, 10),
      methodology: mode === "bench-align-v5" ? "BenchAlign v5" : mode,
      attribution: leaderboard.attribution,
      sourceUrl: leaderboard.canonicalUrl,
      license: leaderboard.license,
      licenseUrl: leaderboard.licenseUrl
    }
  };
});

// Link the two official Qwen repositories to their verified release records.
const openLlmRepositories = new Map([
  ["alibaba:qwen2-5-72b:2024-09-19", "Qwen/Qwen2.5-72B"],
  ["alibaba:qwen2-5-coder-32b-instruct:2024-11-12", "Qwen/Qwen2.5-Coder-32B-Instruct"]
]);
const officialRepositories = new Set(openLlmRepositories.values());
const evaluatedWeights = readLines(openLlmDirectory + "contents.jsonl").filter(row =>
  officialRepositories.has(row.fullname) && row["Weight type"] === "Original" && row.Flagged === false
);
const openLlmMetrics = [
  ["average", "Average ⬆️", "Average"],
  ["ifeval", "IFEval", "IFEval"],
  ["bbh", "BBH", "BBH"],
  ["math", "MATH Lvl 5", "MATH Level 5"],
  ["gpqa", "GPQA", "GPQA"],
  ["musr", "MUSR", "MUSR"],
  ["mmlu-pro", "MMLU-PRO", "MMLU-Pro"]
];
const benchmarks = Object.fromEntries(boards.map(board => [board.id, board.benchmark]));
for (const [id, , title] of openLlmMetrics) {
  benchmarks["open-llm-" + id] = {
    name: "Open LLM · " + title,
    group: "Open LLM Leaderboard",
    unit: "pts",
    ticks,
    snapshot: "2025-03-20",
    methodology: "Published leaderboard score",
    attribution: "Data from Open LLM Leaderboard",
    sourceUrl: "https://huggingface.co/datasets/open-llm-leaderboard/contents/tree/" + openLlmRevision
  };
}

function buildRelease(row) {
  const scores = {};
  const model = benchlmModels.get(row.benchlm_model_id);
  // A shared slug for a generic model does not identify an upgraded or pinned version.
  if (model && model.slug === row.benchlm_slug && model.model.toLowerCase() === row.model.toLowerCase()) {
    for (const board of boards) {
      const score = board.rows.get(model.slug);
      if (!score || score.canonicalModelKey !== model.canonicalModelKey || !Number.isFinite(score.score)) continue;
      const range = score.scoreInterval90;
      scores[board.id] = {
        value: score.score,
        evidence: score.evidenceStatus,
        range: range && [range.lower, range.upper].every(Number.isFinite) ? [range.lower, range.upper] : undefined,
        sourceUrl: score.url
      };
    }
  }

  const repository = openLlmRepositories.get(row.id);
  const evaluations = evaluatedWeights.filter(item => item.fullname === repository);
  if (evaluations.length === 1) {
    const [evaluation] = evaluations;
    for (const [id, column] of openLlmMetrics) {
      if (!Number.isFinite(evaluation[column])) continue;
      scores["open-llm-" + id] = {
        value: evaluation[column],
        model: evaluation.fullname,
        precision: evaluation.Precision,
        submitted: evaluation["Submission Date"],
        sourceUrl: "https://huggingface.co/" + evaluation.fullname + "/tree/" + evaluation["Model sha"]
      };
    }
  }

  return {
    id: row.id,
    family: row.family.toLowerCase(),
    name: row.model,
    lab: row.lab,
    date: row.released_on,
    kind: row.kind === "발표" ? "Announcement" : "General availability",
    sourceUrl: row.source_url,
    scores
  };
}

const releases = readLines("data/releases/six-families.jsonl")
  .filter(row => row.status === "confirmed" && row.released_on && row.source_url)
  .map(buildRelease)
  .sort((a, b) => b.date.localeCompare(a.date));
const data = JSON.stringify({ benchmarks, releases }).replace(/</g, "\\u003c");
writeFileSync(new URL("site/timeline-data.local.js", root), "window.AIHCI_TIMELINE_DATA = " + data + ";\n");
console.log("Wrote local chart data for " + releases.length + " confirmed release events.");
