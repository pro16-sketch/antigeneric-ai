"use client";

import { useState } from "react";
import {
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Building2,
  Copy,
  Check,
  ShieldAlert,
  Compass,
  Palette,
  Type,
  Target,
  Megaphone,
  Lightbulb,
  Tag,
  Download,
  Code2,
  Activity,
  AlertTriangle,
  Terminal,
  Eye,
  X,
  Layout,
  Smartphone,
  Share2,
  Sparkle,
  FileDown,
  Wand,
  Crosshair,
  Mail,
  Send,
  BookOpen,
  FolderPlus,
  Bookmark,
  Image as ImageIcon,
} from "lucide-react";

interface ColorItem {
  name: string;
  hex: string;
  contrastRatio?: number;
  wcagStatus?: string;
  bgTest?: string;
}

interface TypographyItem {
  headerFont: string;
  bodyFont: string;
}

interface AudienceItem {
  demographics: string;
  psychographics: string;
}

interface PillarItem {
  title: string;
  description: string;
}

interface AdCopyItem {
  headline: string;
  body: string;
}

interface PipelineNode {
  id: string;
  name: string;
  status: "completed" | "active" | "queued";
  executionTimeMs: number;
  summary: string;
  output: unknown;
}

interface ClicheItem {
  phrase: string;
  threat: string;
  penalty: number;
  replacement: string;
  verdict: string;
}

interface RedTeamAudit {
  threatScore: number;
  flaggedCount: number;
  flaggedCliches: ClicheItem[];
  sanitizedText?: string;
  verdictSummary: string;
}

interface ArchetypeAngle {
  title: string;
  tagline: string;
  score: number;
  rationale: string;
}

interface CompetitorItem {
  name: string;
  weakness: string;
  moatAdvantage: string;
  attackVector: string;
  riskRating: string;
}

interface ContentSuite {
  linkedIn: {
    hook: string;
    body: string;
    hashtags: string[];
  };
  twitterThread: string[];
  coldEmail: {
    subject: string;
    body: string;
  };
  googleMetaAds: {
    headline1: string;
    headline2: string;
    primaryText: string;
    callToAction: string;
  };
  productHuntLaunch: {
    tagline: string;
    makerComment: string;
  };
}

interface PitchSlide {
  slide: number;
  title: string;
  takeaway: string;
}

interface VoicePersona {
  persona: string;
  tagline: string;
  sampleCopy: string;
}

interface StrategyResult {
  brandName: string;
  style: string;
  tagline: string;
  taglineOptions?: string[];
  brandArchetype?: string;
  toneOfVoice?: string;
  colorPalette?: ColorItem[];
  typography?: TypographyItem;
  targetAudience?: AudienceItem;
  elevatorPitch?: string;
  messagingPillars?: PillarItem[];
  sampleAdCopy?: AdCopyItem;
  logoConcept?: string;
  pipelineSteps?: PipelineNode[];
  redTeamAudit?: RedTeamAudit;
  tailwindConfigSnippet?: string;
  figmaTokensJson?: Record<string, unknown>;
  brandPlaybookMarkdown?: string;
  brandHealthScore?: {
    overall: number;
    voiceAlignment: number;
    differentiationIndex: number;
    clarityScore: number;
    accessibilityScore: number;
  };
  archetypeBattle?: {
    angleA: ArchetypeAngle;
    angleB: ArchetypeAngle;
  };
  competitorBattlecard?: {
    incumbents: CompetitorItem[];
    moatScore: number;
    strategicWedge: string;
  };
  contentSuite?: ContentSuite;
  pitchDeckBlueprint?: PitchSlide[];
  voicePersonaMatrix?: {
    appleStyle: VoicePersona;
    stripeStyle: VoicePersona;
    duolingoStyle: VoicePersona;
  };
  error?: string;
}

// Initial Demo State so page opens 100% populated with live brand data!


export default function Home() {
  const [brandName, setBrandName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Modern & Tech");
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "posters" | "canvas" | "battlecard" | "contentsuite" | "pitchdeck" | "voicepersona" | "redteam" | "devtokens"
  >("posters");

  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile" | "social">("desktop");
  const [activeChannel, setActiveChannel] = useState<"linkedin" | "twitter" | "email" | "ads" | "producthunt">("linkedin");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [posterRatio, setPosterRatio] = useState<"4:5" | "1:1" | "9:16">("4:5");
  const [selectedNode, setSelectedNode] = useState<PipelineNode | null>(null);
  const [result, setResult] = useState<StrategyResult | null>(null);

  // Saved Workspace Brands
  const [savedWorkspaces, setSavedWorkspaces] = useState<Array<{ name: string; date: string; data: StrategyResult }>>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("antigen_saved_workspaces");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const saveToWorkspace = () => {
    if (!result) return;
    const newEntry = {
      name: result.brandName,
      date: new Date().toLocaleDateString(),
      data: result,
    };
    const updated = [newEntry, ...savedWorkspaces.filter((w) => w.name !== result.brandName)].slice(0, 5);
    setSavedWorkspaces(updated);
    try {
      localStorage.setItem("antigen_saved_workspaces", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const styleOptions = [
    { name: "Modern & Tech", desc: "Data-driven, sleek & innovative" },
    { name: "Bold & Premium", desc: "High-contrast luxury & prestige" },
    { name: "Creative & Friendly", desc: "Vibrant, playful & human" },
    { name: "Minimalist & Sleek", desc: "Subtle, clean & essential" },
    { name: "Cyberpunk & Futuristic", desc: "Neon-lit, high-octane & edgy" },
    { name: "Warm & Organic", desc: "Earth-toned, authentic & holistic" },
  ];

  const presetExamples = [
    {
      name: "NovaFlow AI",
      style: "Modern & Tech",
      prompt:
        "The ultimate AI solution revolutionizing the industry with seamless integration for software teams.",
    },
    {
      name: "Aurelius Chrono",
      style: "Bold & Premium",
      prompt:
        "Game-changing luxury titanium watches offering best-in-class precision for high-net-worth leaders.",
    },
    {
      name: "PulseMatrix",
      style: "Cyberpunk & Futuristic",
      prompt:
        "Disruptive innovation in real-time neural bio-feedback for hyper-velocity cyber athletes.",
    },
  ];

  const handleGenerate = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const targetPrompt = customPrompt !== undefined ? customPrompt : prompt;
    if (!brandName.trim() && !targetPrompt.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/brand-pipeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName,
          prompt: targetPrompt,
          style: selectedStyle,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
      } else {
        setResult({
          brandName: brandName || "Brand",
          style: selectedStyle,
          tagline: "",
          error: data.error || "Failed to execute brand pipeline.",
        });
      }
    } catch {
      setResult({
        brandName: brandName || "Brand",
        style: selectedStyle,
        tagline: "",
        error: "Network error. Please check connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const applySanitizedPitch = () => {
    if (!result?.redTeamAudit?.sanitizedText) return;
    const cleanPitch = result.redTeamAudit.sanitizedText;
    setPrompt(cleanPitch);
    handleGenerate(undefined, cleanPitch);
  };

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const downloadFigmaTokens = () => {
    if (!result?.figmaTokensJson) return;
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(result.figmaTokensJson, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${result.brandName.toLowerCase().replace(/\s+/g, "-")}-tokens.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const downloadPlaybookMd = () => {
    if (!result?.brandPlaybookMarkdown) return;
    const dataStr =
      "data:text/markdown;charset=utf-8," +
      encodeURIComponent(result.brandPlaybookMarkdown);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${result.brandName.toLowerCase().replace(/\s+/g, "-")}-playbook.md`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const loadPreset = (preset: { name: string; style: string; prompt: string }) => {
    setBrandName(preset.name);
    setSelectedStyle(preset.style);
    setPrompt(preset.prompt);
  };

  const primaryHex = result?.colorPalette?.[0]?.hex || "#6366f1";
  const accentHex = result?.colorPalette?.[1]?.hex || "#06b6d4";
  const darkHex = result?.colorPalette?.[2]?.hex || "#0f172a";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Ambient Radial Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Navigation Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-800/80 mb-8">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-500 rounded-2xl shadow-lg shadow-indigo-500/25">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Antigen AI
                </h1>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-indigo-500/20 text-indigo-300 rounded-md border border-indigo-500/30">
                  Brand OS & AI Poster Studio
                </span>
              </div>
              <p className="text-xs text-indigo-400 font-medium">
                Multi-Agent Brand Operations & Visual Poster Generator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {savedWorkspaces.length > 0 && (
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-400">Saved:</span>
                {savedWorkspaces.map((ws) => (
                  <button
                    key={ws.name}
                    onClick={() => setResult(ws.data)}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-indigo-600 text-slate-200 text-[11px] transition-all cursor-pointer font-semibold"
                  >
                    {ws.name}
                  </button>
                ))}
              </div>
            )}
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AI Poster Generator Engine Online
            </span>
          </div>
        </header>

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 text-indigo-300 border border-indigo-500/20 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
            AI Poster Graphics & Brand OS Infrastructure
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent leading-tight">
            Generate AI Brand Posters & Disruption Assets
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Render high-resolution AI visual posters, competitor battlecards, 10-slide pitch decks, and Red-Team anti-buzzword audited copy in seconds.
          </p>
        </div>

        {/* Quick Inspiration Presets */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2.5">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1 mr-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Presets to Test Brand OS:
          </span>
          {presetExamples.map((preset) => (
            <button
              key={preset.name}
              onClick={() => loadPreset(preset)}
              className="px-3 py-1.5 text-xs font-medium bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-indigo-400" />
              {preset.name} ({preset.style})
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Form Column (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 md:p-7 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" />
                Brand OS Configuration
              </h3>
              <span className="text-xs text-slate-400 font-mono">Agent Input</span>
            </div>

            <form onSubmit={(e) => handleGenerate(e)} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Brand / Product Name
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Apex Volt AI"
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all font-medium text-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Product Pitch / Mission
                  </label>
                  <span className="text-[10px] text-amber-400 font-mono">Scanned by Red-Team</span>
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  placeholder="e.g. The ultimate AI solution revolutionizing the industry with seamless integration..."
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-indigo-500 transition-all text-sm resize-none font-sans"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Style Tone & Archetype
                  </label>
                  <span className="text-[11px] text-indigo-400 font-medium">Controls Vibe</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {styleOptions.map((opt) => {
                    const isSelected = selectedStyle === opt.name;
                    return (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() => setSelectedStyle(opt.name)}
                        className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? "bg-gradient-to-br from-indigo-950/50 to-slate-900 border-indigo-500 text-white shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/50"
                            : "bg-slate-950/50 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-0.5">
                          <span className="text-xs font-bold">{opt.name}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 line-clamp-1">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || (!brandName.trim() && !prompt.trim())}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    Generating Posters & Strategy...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4 text-indigo-200 group-hover:rotate-12 transition-transform" />
                    Generate AI Posters & OS ({selectedStyle})
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Output Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 md:p-7 backdrop-blur-xl min-h-[620px] flex flex-col shadow-2xl space-y-5">
              
              {/* Empty state — shown before first generation */}
              {!result && !loading && (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-16">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-600/20 via-violet-600/20 to-cyan-600/20 border border-indigo-500/20 flex items-center justify-center">
                      <ImageIcon className="w-9 h-9 text-indigo-400" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </span>
                  </div>
                  <div className="space-y-2 max-w-sm">
                    <h3 className="text-xl font-bold text-slate-100">Your Brand OS Awaits</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Enter your brand name and product description on the left, then hit{" "}
                      <span className="text-indigo-400 font-semibold">Generate</span> to run the multi-agent pipeline.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 w-full max-w-sm text-left">
                    {[
                      { icon: "🔍", step: "1. Analyse", desc: "Extract audience & problem domain" },
                      { icon: "⚔️", step: "2. Audit", desc: "Red-team clichés & buzzwords" },
                      { icon: "🎨", step: "3. Generate", desc: "Posters, tokens & playbook" },
                    ].map((s) => (
                      <div key={s.step} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                        <span className="text-lg">{s.icon}</span>
                        <p className="text-[11px] font-bold text-slate-200">{s.step}</p>
                        <p className="text-[10px] text-slate-500 leading-snug">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading state */}
              {loading && (
                <div className="flex-1 flex flex-col items-center justify-center gap-5 py-16">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
                    <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin" />
                    <div className="absolute inset-2 rounded-full border-t-2 border-violet-500 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm font-bold text-slate-100">Running Multi-Agent Pipeline…</p>
                    <p className="text-xs text-slate-400">Extracting · Auditing · Synthesizing · Generating</p>
                  </div>
                </div>
              )}

              {/* FEATURE 1: LangGraph Visualizer Bar */}
              {result?.pipelineSteps && (
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-indigo-400" />
                      LangGraph Visualizer (Multi-Agent Node Execution)
                    </span>
                    <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 4 Nodes Completed
                    </span>
                  </div>

                  {/* Interactive Nodes Horizontal Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {result.pipelineSteps.map((node, i) => (
                      <button
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                          selectedNode?.id === node.id
                            ? "bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500/50"
                            : "bg-slate-900 border-slate-800/90 hover:border-slate-700 text-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="text-[10px] font-mono text-indigo-400 font-bold">
                            Node {i + 1}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-800">
                            {node.executionTimeMs}ms
                          </span>
                        </div>
                        <span className="text-xs font-bold truncate group-hover:text-indigo-300 transition-colors">
                          {node.name.replace(/^Node \d+:\s*/, "")}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                          <Eye className="w-3 h-3 text-slate-500" /> Inspect Payload
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Enterprise Studio Navigation Tabs Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-base font-bold text-slate-100">Brand OS Studio Modules</h3>
                </div>

                {result && !result.error && (
                  <div className="flex flex-wrap items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setActiveTab("posters")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                        activeTab === "posters"
                          ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-sm font-bold"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-cyan-400" /> AI Posters
                    </button>

                    <button
                      onClick={() => setActiveTab("canvas")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                        activeTab === "canvas"
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Layout className="w-3.5 h-3.5" /> Canvas
                    </button>

                    <button
                      onClick={() => setActiveTab("battlecard")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                        activeTab === "battlecard"
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Crosshair className="w-3.5 h-3.5 text-amber-400" /> Competitors
                    </button>

                    <button
                      onClick={() => setActiveTab("contentsuite")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                        activeTab === "contentsuite"
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Megaphone className="w-3.5 h-3.5 text-emerald-400" /> Campaigns
                    </button>

                    <button
                      onClick={() => setActiveTab("pitchdeck")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                        activeTab === "pitchdeck"
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Pitch Deck
                    </button>

                    <button
                      onClick={() => setActiveTab("voicepersona")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                        activeTab === "voicepersona"
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Type className="w-3.5 h-3.5 text-purple-400" /> A/B Voice Lab
                    </button>

                    <button
                      onClick={() => setActiveTab("redteam")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                        activeTab === "redteam"
                          ? "bg-rose-600 text-white shadow-sm"
                          : "text-rose-400 hover:text-rose-300"
                      }`}
                    >
                      <ShieldAlert className="w-3.5 h-3.5" /> Red-Team
                    </button>

                    <button
                      onClick={() => setActiveTab("devtokens")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                        activeTab === "devtokens"
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5" /> Dev Export
                    </button>
                  </div>
                )}
              </div>

              {/* Main Content Loading / Results */}
              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin flex items-center justify-center" />
                    <Sparkles className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-200">
                      Generating AI Poster Visuals & Strategy...
                    </h3>
                    <p className="text-xs text-slate-400 max-w-xs mt-1">
                      Synthesizing brand graphics ➔ Poster layouts ➔ Red-Team Auditing ➔ Design System Tokens
                    </p>
                  </div>
                </div>
              ) : result ? (
                <div className="flex-1 space-y-5">
                  {result.error ? (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                      {result.error}
                    </div>
                  ) : (
                    <>
                      {/* Top Strategy Summary Banner */}
                      <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-800/40 relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2.5">
                            <h2 className="text-2xl font-black text-white">
                              {result.brandName}
                            </h2>
                            <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              {result.style}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap">
                            <button
                              onClick={saveToWorkspace}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <FolderPlus className="w-3.5 h-3.5" />
                              Save Workspace
                            </button>

                            <button
                              onClick={downloadPlaybookMd}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <FileDown className="w-3.5 h-3.5 text-indigo-400" />
                              Playbook (.md)
                            </button>

                            <button
                              onClick={downloadFigmaTokens}
                              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              Figma Tokens (.json)
                            </button>
                          </div>
                        </div>

                        {result.tagline && (
                          <p className="text-lg font-serif italic text-indigo-200">
                            &ldquo;{result.tagline}&rdquo;
                          </p>
                        )}
                      </div>

                      {/* FEATURE TAB: AI BRAND POSTER GENERATOR STUDIO */}
                      {activeTab === "posters" && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                          {/* Aspect Ratio Toolbar */}
                          <div className="flex items-center justify-between bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                              <ImageIcon className="w-4 h-4 text-cyan-400" /> AI Visual Brand Posters ({result.style})
                            </span>

                            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                              <button
                                onClick={() => setPosterRatio("4:5")}
                                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                                  posterRatio === "4:5" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
                                }`}
                              >
                                Portrait 4:5
                              </button>
                              <button
                                onClick={() => setPosterRatio("1:1")}
                                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                                  posterRatio === "1:1" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
                                }`}
                              >
                                Square 1:1
                              </button>
                              <button
                                onClick={() => setPosterRatio("9:16")}
                                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                                  posterRatio === "9:16" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
                                }`}
                              >
                                Story 9:16
                              </button>
                            </div>
                          </div>

                          {/* 4 Rendered AI Brand Visual Posters Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            {/* POSTER 1: Neon Cyberpunk Matrix Poster */}
                            <div
                              className={`p-6 rounded-2xl border border-cyan-500/40 relative overflow-hidden shadow-2xl flex flex-col justify-between ${
                                posterRatio === "1:1" ? "aspect-square" : posterRatio === "9:16" ? "aspect-[9/16]" : "aspect-[4/5]"
                              }`}
                              style={{ backgroundColor: "#05050d" }}
                            >
                              {/* Background Visual Matrix Grid & Glows */}
                              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff0d_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff0d_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-[80px] bg-cyan-500/30 pointer-events-none" />
                              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full blur-[80px] bg-purple-500/30 pointer-events-none" />

                              {/* Poster Header */}
                              <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center font-black text-slate-950 text-xs shadow-lg shadow-cyan-500/20">
                                    {result.brandName.charAt(0)}
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black text-white uppercase tracking-wider">{result.brandName}</h4>
                                    <span className="text-[9px] font-mono text-cyan-400">SYSTEM ARCHITECTURE</span>
                                  </div>
                                </div>
                                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                  {result.style}
                                </span>
                              </div>

                              {/* Poster Center Headline */}
                              <div className="relative z-10 my-auto py-4 space-y-2">
                                <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase block">
                                  01 // OFFICIAL POSTER
                                </span>
                                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight uppercase font-mono">
                                  {result.tagline}
                                </h3>
                                <p className="text-[11px] text-slate-300 leading-relaxed max-w-xs font-sans">
                                  {result.elevatorPitch}
                                </p>
                              </div>

                              {/* Poster Footer */}
                              <div className="relative z-10 flex items-center justify-between border-t border-cyan-500/20 pt-3 text-[10px] font-mono text-slate-400">
                                <span>ANTIGEN AI // GENERATED</span>
                                <div className="flex items-center gap-1 text-cyan-400">
                                  <Sparkle className="w-3 h-3" /> VERIFIED HIGH-RES
                                </div>
                              </div>
                            </div>

                            {/* POSTER 2: Minimalist Editorial Prestige Poster */}
                            <div
                              className={`p-6 rounded-2xl border border-slate-700/60 relative overflow-hidden shadow-2xl flex flex-col justify-between ${
                                posterRatio === "1:1" ? "aspect-square" : posterRatio === "9:16" ? "aspect-[9/16]" : "aspect-[4/5]"
                              }`}
                              style={{ backgroundColor: darkHex }}
                            >
                              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/30 rounded-full blur-[90px] pointer-events-none" />

                              {/* Large Monogram Watermark */}
                              <div className="absolute bottom-4 right-4 text-[120px] font-serif font-black text-white/5 pointer-events-none select-none">
                                {result.brandName.charAt(0)}
                              </div>

                              <div className="relative z-10 flex items-center justify-between">
                                <span className="text-xs font-serif italic text-slate-300">{result.brandName}</span>
                                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                                  {result.brandArchetype}
                                </span>
                              </div>

                              <div className="relative z-10 my-auto py-4 space-y-3">
                                <h3 className="text-xl md:text-3xl font-serif text-white leading-tight">
                                  &ldquo;{result.sampleAdCopy?.headline || result.tagline}&rdquo;
                                </h3>
                                <p className="text-xs text-slate-300 leading-relaxed font-sans max-w-xs">
                                  {result.sampleAdCopy?.body || result.elevatorPitch}
                                </p>
                              </div>

                              <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3">
                                <div className="flex items-center gap-1.5">
                                  {result.colorPalette?.map((c) => (
                                    <div
                                      key={c.name}
                                      className="w-3 h-3 rounded-full border border-white/20"
                                      style={{ backgroundColor: c.hex }}
                                      title={c.name}
                                    />
                                  ))}
                                </div>
                                <span className="text-[10px] font-mono text-slate-400">DESIGN TOKEN SYSTEM</span>
                              </div>
                            </div>

                            {/* POSTER 3: Bold Luxury Gold Foil Poster */}
                            <div
                              className={`p-6 rounded-2xl border border-amber-500/40 relative overflow-hidden shadow-2xl flex flex-col justify-between ${
                                posterRatio === "1:1" ? "aspect-square" : posterRatio === "9:16" ? "aspect-[9/16]" : "aspect-[4/5]"
                              }`}
                              style={{ backgroundColor: "#09090b" }}
                            >
                              <div className="absolute inset-2 border border-amber-500/20 rounded-xl pointer-events-none" />

                              <div className="relative z-10 text-center pt-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                                  THE SOVEREIGN EDITION
                                </span>
                                <h3 className="text-xl font-extrabold text-white mt-1 uppercase tracking-tight">
                                  {result.brandName}
                                </h3>
                              </div>

                              <div className="relative z-10 text-center my-auto py-4 space-y-2">
                                <p className="text-lg md:text-xl font-serif italic text-amber-200">
                                  &ldquo;{result.tagline}&rdquo;
                                </p>
                                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                                  {result.elevatorPitch}
                                </p>
                              </div>

                              <div className="relative z-10 text-center pb-2">
                                <span className="px-4 py-1.5 rounded-full text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30">
                                  Excellence Redefined
                                </span>
                              </div>
                            </div>

                            {/* POSTER 4: Vibrant Modern SaaS Visual Poster */}
                            <div
                              className={`p-6 rounded-2xl border border-indigo-500/40 relative overflow-hidden shadow-2xl flex flex-col justify-between ${
                                posterRatio === "1:1" ? "aspect-square" : posterRatio === "9:16" ? "aspect-[9/16]" : "aspect-[4/5]"
                              }`}
                              style={{
                                backgroundImage: `linear-gradient(135deg, ${darkHex} 0%, #1e1b4b 100%)`,
                              }}
                            >
                              <div
                                className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[100px] opacity-40 pointer-events-none"
                                style={{ backgroundColor: primaryHex }}
                              />

                              <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Zap className="w-5 h-5 text-indigo-400" />
                                  <span className="font-bold text-white text-sm">{result.brandName}</span>
                                </div>
                                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/10">
                                  PRO ENGINE
                                </span>
                              </div>

                              <div className="relative z-10 my-auto py-4 space-y-3">
                                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                                  {result.sampleAdCopy?.headline || result.tagline}
                                </h3>
                                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/90">
                                  {result.messagingPillars?.[0]?.description || result.elevatorPitch}
                                </div>
                              </div>

                              <div className="relative z-10 flex items-center justify-between pt-2">
                                <span className="text-xs font-bold text-indigo-300">Antigen AI Visual Studio</span>
                                <span className="text-[10px] text-white/60">v3.0 Poster Engine</span>
                              </div>
                            </div>

                          </div>
                        </div>
                      )}

                      {/* TAB: LIVE BRAND MOCKUP CANVAS STUDIO */}
                      {activeTab === "canvas" && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                          {/* Device Switcher */}
                          <div className="flex items-center justify-between bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                              <Layout className="w-4 h-4 text-indigo-400" /> Live Rendered Mockup Canvas
                            </span>

                            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800/80">
                              <button
                                onClick={() => setPreviewDevice("desktop")}
                                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                                  previewDevice === "desktop"
                                    ? "bg-indigo-600 text-white shadow-sm"
                                    : "text-slate-400 hover:text-slate-200"
                                }`}
                              >
                                <Layout className="w-3 h-3" /> SaaS Hero
                              </button>
                              <button
                                onClick={() => setPreviewDevice("mobile")}
                                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                                  previewDevice === "mobile"
                                    ? "bg-indigo-600 text-white shadow-sm"
                                    : "text-slate-400 hover:text-slate-200"
                                }`}
                              >
                                <Smartphone className="w-3 h-3" /> Mobile Card
                              </button>
                              <button
                                onClick={() => setPreviewDevice("social")}
                                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                                  previewDevice === "social"
                                    ? "bg-indigo-600 text-white shadow-sm"
                                    : "text-slate-400 hover:text-slate-200"
                                }`}
                              >
                                <Share2 className="w-3 h-3" /> Social Card
                              </button>
                            </div>
                          </div>

                          {/* Render Preview 1: SaaS Landing Page Hero Unit */}
                          {previewDevice === "desktop" && (
                            <div
                              className="p-6 md:p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden transition-all space-y-6"
                              style={{ backgroundColor: darkHex }}
                            >
                              <div
                                className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-[100px] opacity-30 pointer-events-none"
                                style={{ backgroundColor: primaryHex }}
                              />
                              <div
                                className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-25 pointer-events-none"
                                style={{ backgroundColor: accentHex }}
                              />

                              <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-md"
                                    style={{ backgroundColor: primaryHex }}
                                  >
                                    {result.brandName.charAt(0)}
                                  </div>
                                  <span className="font-bold text-white text-sm">
                                    {result.brandName}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-white/70">
                                  <span>Product</span>
                                  <span>Features</span>
                                  <span
                                    className="px-3 py-1 rounded-lg text-white font-semibold text-xs shadow-sm"
                                    style={{ backgroundColor: primaryHex }}
                                  >
                                    Get Started
                                  </span>
                                </div>
                              </div>

                              <div className="text-center max-w-xl mx-auto space-y-4 py-4 relative z-10">
                                <span
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border border-white/10"
                                  style={{ color: accentHex, backgroundColor: `${accentHex}15` }}
                                >
                                  <Sparkle className="w-3 h-3" /> {result.style} Paradigm
                                </span>

                                <h3 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                                  {result.sampleAdCopy?.headline || result.tagline}
                                </h3>

                                <p className="text-xs md:text-sm text-white/80 leading-relaxed max-w-md mx-auto">
                                  {result.elevatorPitch}
                                </p>

                                <div className="pt-2 flex items-center justify-center gap-3">
                                  <button
                                    className="px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-lg transition-transform hover:scale-105 cursor-pointer"
                                    style={{ backgroundColor: primaryHex }}
                                  >
                                    Launch Engine
                                  </button>
                                  <button className="px-4 py-2.5 rounded-xl font-semibold text-xs text-white/80 bg-white/10 border border-white/15 hover:bg-white/20 transition-all cursor-pointer">
                                    Explore Architecture
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Render Preview 2: Mobile Interface Card */}
                          {previewDevice === "mobile" && (
                            <div className="max-w-xs mx-auto p-4 rounded-3xl bg-slate-900 border-4 border-slate-800 shadow-2xl space-y-4">
                              <div className="w-16 h-1.5 bg-slate-800 rounded-full mx-auto" />
                              <div
                                className="p-4 rounded-2xl text-white space-y-3 shadow-lg"
                                style={{ backgroundColor: darkHex }}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold">{result.brandName}</span>
                                  <span
                                    className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white"
                                    style={{ backgroundColor: accentHex }}
                                  >
                                    Active
                                  </span>
                                </div>
                                <h4 className="text-sm font-bold leading-tight">
                                  {result.tagline}
                                </h4>
                                <p className="text-[11px] text-white/70">
                                  {result.messagingPillars?.[0]?.description || result.elevatorPitch}
                                </p>
                                <button
                                  className="w-full py-2 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer"
                                  style={{ backgroundColor: primaryHex }}
                                >
                                  Execute Command
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Render Preview 3: Social Media Ad Card */}
                          {previewDevice === "social" && (
                            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 max-w-md mx-auto shadow-xl">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md"
                                  style={{ backgroundColor: primaryHex }}
                                >
                                  {result.brandName.charAt(0)}
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                                    {result.brandName}
                                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
                                  </h4>
                                  <span className="text-[10px] text-slate-400">@{result.brandName.toLowerCase().replace(/\s+/g, "")}_ai</span>
                                </div>
                              </div>
                              <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                                {result.sampleAdCopy?.body}
                              </p>
                              <div
                                className="p-4 rounded-xl border border-white/10 space-y-1 text-white"
                                style={{ backgroundColor: darkHex }}
                              >
                                <span className="text-[10px] uppercase font-bold text-cyan-300 block">
                                  Official Announcement
                                </span>
                                <h5 className="text-xs font-bold">
                                  {result.sampleAdCopy?.headline}
                                </h5>
                                <p className="text-[11px] text-white/70 font-serif italic">
                                  &ldquo;{result.tagline}&rdquo;
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* ENTERPRISE MODULE 1: COMPETITOR BATTLECARD & DISRUPTION RADAR */}
                      {activeTab === "battlecard" && result.competitorBattlecard && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                              <div className="flex items-center gap-2">
                                <Crosshair className="w-5 h-5 text-amber-400" />
                                <div>
                                  <h4 className="text-sm font-bold text-slate-200">
                                    Competitor Battlecard & Market Disruption Radar
                                  </h4>
                                  <p className="text-xs text-slate-400">
                                    {result.competitorBattlecard.strategicWedge}
                                  </p>
                                </div>
                              </div>
                              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                Moat Score: {result.competitorBattlecard.moatScore}/100
                              </span>
                            </div>

                            <div className="space-y-3">
                              {result.competitorBattlecard.incumbents.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs"
                                >
                                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                    <span className="font-bold text-slate-100 text-sm">{item.name}</span>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-amber-400 border border-amber-500/30">
                                      {item.riskRating}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 pt-1">
                                    <div>
                                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Competitor Vulnerability</span>
                                      <p>{item.weakness}</p>
                                    </div>
                                    <div>
                                      <span className="text-emerald-400 font-bold block text-[10px] uppercase">Unfair Advantage</span>
                                      <p>{item.moatAdvantage}</p>
                                    </div>
                                  </div>
                                  <div className="pt-2 border-t border-slate-800/80 text-cyan-300 font-mono text-[11px]">
                                    <strong>Attack Vector:</strong> {item.attackVector}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ENTERPRISE MODULE 2: MULTI-CHANNEL PRODUCTION COPY SUITE */}
                      {activeTab === "contentsuite" && result.contentSuite && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                          {/* Channel Selector */}
                          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 flex-wrap">
                            <button
                              onClick={() => setActiveChannel("linkedin")}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                activeChannel === "linkedin"
                                  ? "bg-indigo-600 text-white shadow-sm"
                                  : "text-slate-400 hover:text-slate-200"
                              }`}
                            >
                              LinkedIn Post
                            </button>
                            <button
                              onClick={() => setActiveChannel("twitter")}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                activeChannel === "twitter"
                                  ? "bg-indigo-600 text-white shadow-sm"
                                  : "text-slate-400 hover:text-slate-200"
                              }`}
                            >
                              Twitter Thread
                            </button>
                            <button
                              onClick={() => setActiveChannel("email")}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                activeChannel === "email"
                                  ? "bg-indigo-600 text-white shadow-sm"
                                  : "text-slate-400 hover:text-slate-200"
                              }`}
                            >
                              Cold Email
                            </button>
                            <button
                              onClick={() => setActiveChannel("ads")}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                activeChannel === "ads"
                                  ? "bg-indigo-600 text-white shadow-sm"
                                  : "text-slate-400 hover:text-slate-200"
                              }`}
                            >
                              Google/Meta Ads
                            </button>
                            <button
                              onClick={() => setActiveChannel("producthunt")}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                activeChannel === "producthunt"
                                  ? "bg-indigo-600 text-white shadow-sm"
                                  : "text-slate-400 hover:text-slate-200"
                              }`}
                            >
                              Product Hunt
                            </button>
                          </div>

                          {/* Channel 1: LinkedIn */}
                          {activeChannel === "linkedin" && (
                            <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                <span className="text-xs font-bold uppercase text-indigo-400 flex items-center gap-1.5">
                                  <Share2 className="w-4 h-4" /> LinkedIn Thought Leadership Post
                                </span>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      `${result.contentSuite?.linkedIn.hook}\n\n${result.contentSuite?.linkedIn.body}\n\n${result.contentSuite?.linkedIn.hashtags.join(" ")}`,
                                      "linkedIn"
                                    )
                                  }
                                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                                >
                                  {copiedField === "linkedIn" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                              <div className="space-y-2 text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                                <h4 className="font-bold text-sm text-white">{result.contentSuite.linkedIn.hook}</h4>
                                <p>{result.contentSuite.linkedIn.body}</p>
                                <p className="text-indigo-400 font-semibold">{result.contentSuite.linkedIn.hashtags.join(" ")}</p>
                              </div>
                            </div>
                          )}

                          {/* Channel 2: Twitter Thread */}
                          {activeChannel === "twitter" && (
                            <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                <span className="text-xs font-bold uppercase text-cyan-400 flex items-center gap-1.5">
                                  <Send className="w-4 h-4" /> Twitter / X Viral Thread Blueprint
                                </span>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      result.contentSuite?.twitterThread.join("\n\n") || "",
                                      "twitter"
                                    )
                                  }
                                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                                >
                                  {copiedField === "twitter" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                              <div className="space-y-3">
                                {result.contentSuite.twitterThread.map((tweet, i) => (
                                  <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200">
                                    {tweet}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Channel 3: Cold Email */}
                          {activeChannel === "email" && (
                            <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                <span className="text-xs font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                                  <Mail className="w-4 h-4" /> High-Converting Cold Email Sequence
                                </span>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      `Subject: ${result.contentSuite?.coldEmail.subject}\n\n${result.contentSuite?.coldEmail.body}`,
                                      "coldEmail"
                                    )
                                  }
                                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                                >
                                  {copiedField === "coldEmail" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                              <div className="space-y-2 text-xs">
                                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 font-bold text-slate-200">
                                  Subject: {result.contentSuite.coldEmail.subject}
                                </div>
                                <pre className="p-3.5 rounded bg-slate-900 border border-slate-800 text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                                  {result.contentSuite.coldEmail.body}
                                </pre>
                              </div>
                            </div>
                          )}

                          {/* Channel 4: Google/Meta Ads */}
                          {activeChannel === "ads" && (
                            <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                <span className="text-xs font-bold uppercase text-amber-400 flex items-center gap-1.5">
                                  <Target className="w-4 h-4" /> Performance Ad Campaign Matrix
                                </span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                                  <span className="text-[10px] text-slate-400 font-bold uppercase">Headline 1</span>
                                  <p className="font-bold text-white">{result.contentSuite.googleMetaAds.headline1}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                                  <span className="text-[10px] text-slate-400 font-bold uppercase">Headline 2</span>
                                  <p className="font-bold text-white">{result.contentSuite.googleMetaAds.headline2}</p>
                                </div>
                                <div className="sm:col-span-2 p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                                  <span className="text-[10px] text-slate-400 font-bold uppercase">Primary Ad Text</span>
                                  <p className="text-slate-300">{result.contentSuite.googleMetaAds.primaryText}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Channel 5: Product Hunt */}
                          {activeChannel === "producthunt" && (
                            <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                <span className="text-xs font-bold uppercase text-rose-400 flex items-center gap-1.5">
                                  <Sparkles className="w-4 h-4" /> Product Hunt Launch Script
                                </span>
                              </div>
                              <div className="space-y-2 text-xs">
                                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-bold text-rose-300">
                                  Tagline: &ldquo;{result.contentSuite.productHuntLaunch.tagline}&rdquo;
                                </div>
                                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 leading-relaxed">
                                  <strong className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Maker First Comment Story</strong>
                                  {result.contentSuite.productHuntLaunch.makerComment}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* ENTERPRISE MODULE 3: 10-SLIDE INVESTOR PITCH DECK BLUEPRINT */}
                      {activeTab === "pitchdeck" && result.pitchDeckBlueprint && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                          <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                              <div className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-cyan-400" />
                                <h4 className="text-sm font-bold text-slate-200">
                                  10-Slide Investor Pitch Deck Blueprint
                                </h4>
                              </div>
                              <span className="text-xs text-cyan-400 font-mono">
                                Slide {activeSlideIndex + 1} of {result.pitchDeckBlueprint.length}
                              </span>
                            </div>

                            {/* Slide Navigation Stepper */}
                            <div className="flex items-center gap-1 overflow-x-auto pb-2">
                              {result.pitchDeckBlueprint.map((slide, idx) => (
                                <button
                                  key={slide.slide}
                                  onClick={() => setActiveSlideIndex(idx)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                    activeSlideIndex === idx
                                      ? "bg-cyan-600 text-white shadow-md"
                                      : "bg-slate-900 hover:bg-slate-800 text-slate-400"
                                  }`}
                                >
                                  Slide {slide.slide}
                                </button>
                              ))}
                            </div>

                            {/* Active Slide Card */}
                            {result.pitchDeckBlueprint[activeSlideIndex] && (
                              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 border border-slate-800 space-y-3 min-h-[160px] flex flex-col justify-center">
                                <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
                                  {result.pitchDeckBlueprint[activeSlideIndex].title}
                                </span>
                                <h3 className="text-lg font-bold text-white">
                                  {result.pitchDeckBlueprint[activeSlideIndex].takeaway}
                                </h3>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* ENTERPRISE MODULE 4: A/B PERSONA VOICE LAB */}
                      {activeTab === "voicepersona" && result.voicePersonaMatrix && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                          <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                              <div className="flex items-center gap-2">
                                <Type className="w-5 h-5 text-purple-400" />
                                <h4 className="text-sm font-bold text-slate-200">
                                  A/B Brand Persona & Tone Simulator
                                </h4>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {/* Apple Persona */}
                              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                                  🍏 {result.voicePersonaMatrix.appleStyle.persona}
                                </span>
                                <h5 className="text-xs font-bold text-indigo-300">
                                  &ldquo;{result.voicePersonaMatrix.appleStyle.tagline}&rdquo;
                                </h5>
                                <p className="text-xs text-slate-300 leading-relaxed font-serif italic">
                                  {result.voicePersonaMatrix.appleStyle.sampleCopy}
                                </p>
                              </div>

                              {/* Stripe Persona */}
                              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                                  💳 {result.voicePersonaMatrix.stripeStyle.persona}
                                </span>
                                <h5 className="text-xs font-bold text-cyan-300">
                                  &ldquo;{result.voicePersonaMatrix.stripeStyle.tagline}&rdquo;
                                </h5>
                                <p className="text-xs text-slate-300 leading-relaxed font-mono text-[11px]">
                                  {result.voicePersonaMatrix.stripeStyle.sampleCopy}
                                </p>
                              </div>

                              {/* Duolingo Persona */}
                              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                                  🦉 {result.voicePersonaMatrix.duolingoStyle.persona}
                                </span>
                                <h5 className="text-xs font-bold text-rose-300">
                                  &ldquo;{result.voicePersonaMatrix.duolingoStyle.tagline}&rdquo;
                                </h5>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                  {result.voicePersonaMatrix.duolingoStyle.sampleCopy}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* FEATURE 2: Live Red-Team Cliché Audit & 1-Click Pitch Sanitizer */}
                      {activeTab === "redteam" && result.redTeamAudit && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                          <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-rose-900/30 pb-3">
                              <div className="flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                                <div>
                                  <h4 className="text-sm font-bold text-rose-200">
                                    Adversarial Red-Team Threat Audit & Heatmap
                                  </h4>
                                  <p className="text-xs text-rose-300/80">
                                    {result.redTeamAudit.verdictSummary}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={applySanitizedPitch}
                                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Wand className="w-3.5 h-3.5" />
                                  1-Click Auto-Sanitize Pitch
                                </button>
                              </div>
                            </div>

                            {/* Flagged Clichés Table */}
                            <div className="space-y-3">
                              <span className="text-xs uppercase font-bold tracking-wider text-slate-300 block">
                                Flagged Startup Buzzwords & Active Replacements ({result.redTeamAudit.flaggedCliches.length})
                              </span>

                              <div className="space-y-2.5">
                                {result.redTeamAudit.flaggedCliches.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="p-3.5 rounded-lg bg-slate-950/90 border border-slate-800 space-y-2"
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                                      <div className="flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                                        <span className="text-xs font-bold text-rose-300 line-through">
                                          &ldquo;{item.phrase}&rdquo;
                                        </span>
                                      </div>
                                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 w-fit">
                                        Threat: {item.threat} (-{item.penalty} pts)
                                      </span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
                                      <div className="flex items-center gap-2 text-emerald-300">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                        <span>
                                          <strong>Engine Replacement:</strong> &ldquo;{item.replacement}&rdquo;
                                        </span>
                                      </div>
                                      <span className="text-[11px] text-slate-400 italic">
                                        Verdict: {item.verdict}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* FEATURE 3: Developer Export & WCAG AAA Accessibility */}
                      {activeTab === "devtokens" && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                          {/* WCAG Accessibility Swatches */}
                          {result.colorPalette && (
                            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                              <span className="text-xs uppercase font-bold tracking-wider text-slate-300 block flex items-center gap-1.5">
                                <Palette className="w-4 h-4 text-indigo-400" />
                                WCAG AAA Accessibility Color Swatches
                              </span>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {result.colorPalette.map((col) => (
                                  <div
                                    key={col.name}
                                    className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2"
                                  >
                                    <div
                                      className="w-full h-12 rounded-md shadow-inner flex items-end justify-end p-1.5"
                                      style={{ backgroundColor: col.hex }}
                                    >
                                      <span
                                        className="text-[9px] font-bold px-1.5 py-0.5 rounded shadow"
                                        style={{
                                          color: col.bgTest,
                                          backgroundColor: col.bgTest === "#ffffff" ? "#0f172a" : "#ffffff",
                                        }}
                                      >
                                        {col.contrastRatio}:1
                                      </span>
                                    </div>
                                    <div>
                                      <div className="text-xs font-bold text-slate-200">{col.name}</div>
                                      <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between mt-0.5">
                                        {col.hex}
                                        <span
                                          className={`text-[9px] font-bold px-1.5 rounded ${
                                            col.wcagStatus?.includes("AAA")
                                              ? "bg-emerald-500/20 text-emerald-400"
                                              : "bg-indigo-500/20 text-indigo-300"
                                          }`}
                                        >
                                          {col.wcagStatus}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Tailwind Preset Generator Snippet */}
                          {result.tailwindConfigSnippet && (
                            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs uppercase font-bold tracking-wider text-slate-300 flex items-center gap-1.5">
                                  <Code2 className="w-4 h-4 text-cyan-400" />
                                  Tailwind Preset Generator (tailwind.config.js)
                                </span>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      result.tailwindConfigSnippet || "",
                                      "tailwindConfig"
                                    )
                                  }
                                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-all flex items-center gap-1 cursor-pointer"
                                >
                                  {copiedField === "tailwindConfig" ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-400" /> Copied Snippet
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" /> Copy Config
                                    </>
                                  )}
                                </button>
                              </div>
                              <pre className="p-3.5 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-[11px] text-cyan-300 overflow-x-auto leading-relaxed">
                                {result.tailwindConfigSnippet}
                              </pre>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center py-20 text-center text-slate-500">
                  <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl mb-4 text-slate-600 shadow-inner">
                    <Compass className="w-10 h-10 stroke-[1.25]" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-300">
                    No Brand Strategy Generated Yet
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs mt-1">
                    Fill in your product pitch on the left to trigger the Multi-Agent Node Pipeline and Brand OS Suite.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal / Inspector Drawer for LangGraph Node Payload Logs */}
        {selectedNode && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                  <h4 className="text-sm font-bold text-slate-100">{selectedNode.name}</h4>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Execution Latency: <strong className="text-emerald-400">{selectedNode.executionTimeMs}ms</strong></span>
                  <span>Status: <strong className="text-indigo-400 uppercase">{selectedNode.status}</strong></span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                  <strong className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Agent Node Summary</strong>
                  {selectedNode.summary}
                </div>
                <div className="space-y-1">
                  <strong className="block text-slate-400 text-[10px] uppercase font-bold">Node Output Payload</strong>
                  <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-indigo-300 overflow-x-auto max-h-48">
                    {JSON.stringify(selectedNode.output, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
