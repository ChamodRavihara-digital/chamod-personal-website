import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  X,
  Download,
  Copy,
  ExternalLink,
  RefreshCw,
  Search,
  Globe,
  Sparkles,
  FileCode,
} from "lucide-react";
import {
  auditCurrentPageSEO,
  generateDailySitemap,
  downloadSitemapXml,
  runDailyAutoSEO,
  SEOHealthReport,
  getTodayDateString,
} from "../utils/seoEngine";

interface AutoSEOModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export const AutoSEOModal: React.FC<AutoSEOModalProps> = ({
  isOpen,
  onClose,
  currentPath,
}) => {
  const [report, setReport] = useState<SEOHealthReport | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "sitemap" | "console">("overview");
  const [syncedJustNow, setSyncedJustNow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      runDailyAutoSEO(currentPath);
      setReport(auditCurrentPageSEO());
    }
  }, [isOpen, currentPath]);

  if (!isOpen) return null;

  const handleManualSync = () => {
    runDailyAutoSEO(currentPath);
    setReport(auditCurrentPageSEO());
    setSyncedJustNow(true);
    setTimeout(() => setSyncedJustNow(false), 3000);
  };

  const handleCopySitemap = () => {
    const xml = generateDailySitemap();
    navigator.clipboard.writeText(xml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const sitemapXml = generateDailySitemap();
  const today = getTodayDateString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#1d1d1f] border border-[#3a3a3c] rounded-[16px] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-[0_24px_64px_rgba(0,0,0,0.6)] overflow-hidden text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3a3a3c] bg-[#2c2c2e]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2997ff]/20 flex items-center justify-center text-[#2997ff]">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-sans font-bold text-[17px] text-white">
                  Daily Auto-SEO Engine
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#16A34A]/20 text-[#4ADE80] border border-[#16A34A]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                  Active • Daily Synced
                </span>
              </div>
              <p className="font-mono text-[12px] text-[#a1a1a6]">
                Automatic Google Indexing, Dynamic Meta &amp; Lastmod Stamping
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#a1a1a6] hover:text-white rounded-lg hover:bg-[#3a3a3c] transition-colors"
            aria-label="Close SEO inspector"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#3a3a3c] bg-[#161617] px-6 gap-6 font-mono text-[13px]">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`py-3 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === "overview"
                ? "border-[#2997ff] text-[#2997ff]"
                : "border-transparent text-[#a1a1a6] hover:text-white"
            }`}
          >
            Health &amp; Live Audit ({report?.score || 100}%)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("sitemap")}
            className={`py-3 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === "sitemap"
                ? "border-[#2997ff] text-[#2997ff]"
                : "border-transparent text-[#a1a1a6] hover:text-white"
            }`}
          >
            Dynamic sitemap.xml ({today})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("console")}
            className={`py-3 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === "console"
                ? "border-[#2997ff] text-[#2997ff]"
                : "border-transparent text-[#a1a1a6] hover:text-white"
            }`}
          >
            Google Console Tools
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[14px]">
          {activeTab === "overview" && (
            <>
              {/* Top Status Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#2c2c2e] border border-[#3a3a3c] rounded-[10px] p-3">
                  <div className="font-mono text-[11px] text-[#a1a1a6] uppercase tracking-wider">
                    SEO Health Score
                  </div>
                  <div className="font-sans font-extrabold text-[24px] text-white mt-0.5 flex items-baseline gap-1">
                    <span>{report?.score || 100}</span>
                    <span className="text-[14px] text-[#4ADE80] font-mono">/ 100</span>
                  </div>
                </div>

                <div className="bg-[#2c2c2e] border border-[#3a3a3c] rounded-[10px] p-3">
                  <div className="font-mono text-[11px] text-[#a1a1a6] uppercase tracking-wider">
                    Today&apos;s Stamped Lastmod
                  </div>
                  <div className="font-mono font-bold text-[15px] text-[#2997ff] mt-1">
                    {report?.lastSyncDate || today}
                  </div>
                  <div className="font-mono text-[10px] text-[#a1a1a6] mt-0.5">
                    Synced: {report?.lastSyncTime || "Active"}
                  </div>
                </div>

                <div className="bg-[#2c2c2e] border border-[#3a3a3c] rounded-[10px] p-3 flex flex-col justify-between">
                  <div className="font-mono text-[11px] text-[#a1a1a6] uppercase tracking-wider">
                    Daily Re-Sync
                  </div>
                  <button
                    type="button"
                    onClick={handleManualSync}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#0071e3] hover:bg-[#0077ed] text-white font-mono text-[12px] font-semibold transition-colors mt-1"
                  >
                    <RefreshCw size={13} className={syncedJustNow ? "animate-spin" : ""} />
                    {syncedJustNow ? "Synced Now!" : "Run Sync Now"}
                  </button>
                </div>
              </div>

              {/* Current Page Meta Inspection */}
              <div className="bg-[#161617] border border-[#3a3a3c] rounded-[12px] p-4 space-y-3">
                <div className="font-mono text-[12px] text-[#2997ff] uppercase font-bold tracking-wider flex items-center gap-2">
                  <Search size={14} /> Current Route Live Inspection
                </div>
                <div>
                  <div className="font-mono text-[11px] text-[#a1a1a6]">Active Title:</div>
                  <div className="font-semibold text-white mt-0.5">{report?.title}</div>
                </div>
                <div>
                  <div className="font-mono text-[11px] text-[#a1a1a6]">Meta Description:</div>
                  <div className="text-[13px] text-[#a1a1a6] mt-0.5 leading-relaxed">
                    {report?.description}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[11px] text-[#a1a1a6]">Canonical URL:</div>
                  <div className="font-mono text-[12px] text-[#00E5FF] mt-0.5 truncate">
                    {report?.canonicalUrl}
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-2">
                <div className="font-mono text-[12px] text-[#a1a1a6] uppercase tracking-wider font-semibold">
                  Automated Search Engine Compliance Checklist
                </div>
                <div className="space-y-2">
                  {report?.checks.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-start gap-3 p-3 rounded-[10px] bg-[#2c2c2e] border border-[#3a3a3c]"
                    >
                      {c.status === "pass" ? (
                        <CheckCircle2 size={18} className="text-[#4ADE80] shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle size={18} className="text-[#2997ff] shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-medium text-[14px] text-white">{c.name}</div>
                        <div className="text-[12px] text-[#a1a1a6] mt-0.5">{c.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "sitemap" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#2c2c2e] p-4 rounded-[12px] border border-[#3a3a3c]">
                <div>
                  <div className="font-semibold text-white">Daily XML Sitemap Generator</div>
                  <div className="text-[12px] text-[#a1a1a6] font-mono">
                    All 12 URLs stamped with today&apos;s date: <code>{today}</code>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopySitemap}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#0071e3] hover:bg-[#0077ed] text-white text-[12px] font-mono transition-colors"
                  >
                    <Copy size={14} />
                    {copied ? "Copied!" : "Copy XML"}
                  </button>
                  <button
                    type="button"
                    onClick={downloadSitemapXml}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#2997ff] hover:bg-[#0077ed] text-[#1d1d1f] font-semibold text-[12px] font-mono transition-colors"
                  >
                    <Download size={14} />
                    Download .xml
                  </button>
                </div>
              </div>

              <div className="relative">
                <pre className="bg-[#051818] border border-[#3a3a3c] rounded-[10px] p-4 font-mono text-[11px] text-[#a1a1a6] overflow-x-auto max-h-[300px] leading-relaxed">
                  {sitemapXml}
                </pre>
              </div>
            </div>
          )}

          {activeTab === "console" && (
            <div className="space-y-4">
              <div className="p-4 rounded-[12px] bg-[#2c2c2e] border border-[#3a3a3c] space-y-3">
                <div className="flex items-center gap-2 font-semibold text-white text-[15px]">
                  <Globe size={18} className="text-[#2997ff]" />
                  Google Search Console Indexing Actions
                </div>
                <p className="text-[13px] text-[#a1a1a6] leading-relaxed">
                  Your website includes canonical tags, an automated <code>/sitemap.xml</code>,
                  and a strict <code>/robots.txt</code>. Use the official Google verification tools
                  below to trigger fresh indexing:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href="https://search.google.com/test/rich-results?url=https%3A%2F%2Fwww.chamod.digital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-[8px] bg-[#0071e3]/50 hover:bg-[#0071e3] border border-[#0071e3] transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-white text-[13px]">
                        Google Rich Results Test
                      </div>
                      <div className="text-[11px] text-[#a1a1a6]">
                        Validate Person &amp; Service schema
                      </div>
                    </div>
                    <ExternalLink size={15} className="text-[#2997ff]" />
                  </a>

                  <a
                    href="https://search.google.com/search-console"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-[8px] bg-[#0071e3]/50 hover:bg-[#0071e3] border border-[#0071e3] transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-white text-[13px]">
                        Google Search Console
                      </div>
                      <div className="text-[11px] text-[#a1a1a6]">
                        Submit sitemap.xml to Google
                      </div>
                    </div>
                    <ExternalLink size={15} className="text-[#2997ff]" />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-[12px] bg-[#161617] border border-[#3a3a3c] font-mono text-[12px] text-[#a1a1a6] space-y-2">
                <div className="text-[#2997ff] font-bold flex items-center gap-1.5">
                  <FileCode size={14} /> How Daily Auto-SEO Works
                </div>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>Daily stamped <code>meta name=&quot;last-modified&quot;</code> in the DOM.</li>
                  <li>Dynamic Schema.org Breadcrumbs injected per URL visited.</li>
                  <li>Live sitemap.xml generation with daily updated lastmod timestamps.</li>
                  <li>100% compliance with Google Mobile-First and Core Web Vitals standards.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#3a3a3c] bg-[#2c2c2e] flex items-center justify-between text-[12px] font-mono text-[#a1a1a6]">
          <span>Chamod Ravihara • Auto-SEO Engine</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-[8px] bg-[#3a3a3c] hover:bg-[#2A5E5E] text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
