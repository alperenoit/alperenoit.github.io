import React, { useState } from 'react';

interface ArchitectureSchematicProps {
  type: 'distributed-queue' | 'crdt-canvas' | 'telemetry-engine' | 'cloud-gateway';
  lang: 'tr' | 'en';
  interactive?: boolean;
}

export const ArchitectureSchematic: React.FC<ArchitectureSchematicProps> = ({
  type,
  lang,
  interactive = true,
}) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  if (type === 'distributed-queue') {
    return (
      <div className="w-full bg-[#18202F] text-slate-200 rounded-xl p-5 border border-slate-700/60 shadow-inner overflow-hidden select-none">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/50 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-sm bg-sky-400"></span>
            SYSTEM ARCHITECTURE: TASK QUEUE &amp; WORKER POOL
          </span>
          <span className="text-[11px] text-slate-400">
            {lang === 'tr' ? 'Etkileşimli Blok Şeması' : 'Interactive Architecture Block'}
          </span>
        </div>

        {/* SVG Diagram */}
        <div className="relative w-full aspect-[21/9] min-h-[220px]">
          <svg viewBox="0 0 840 320" className="w-full h-full text-xs font-mono" fill="none">
            {/* Grid background */}
            <defs>
              <pattern id="grid-dist" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              </pattern>
              <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="#64748b" />
              </marker>
              <marker id="arrowhead-active" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="#38bdf8" />
              </marker>
            </defs>
            <rect width="840" height="320" fill="url(#grid-dist)" />

            {/* Connecting lines */}
            <path
              d="M 130 160 L 190 160"
              stroke={activeNode === 'ingress' ? '#38bdf8' : '#475569'}
              strokeWidth="2"
              markerEnd={activeNode === 'ingress' ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
            />
            <path
              d="M 330 160 L 390 160"
              stroke={activeNode === 'queue' ? '#38bdf8' : '#475569'}
              strokeWidth="2"
              markerEnd={activeNode === 'queue' ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
            />
            <path
              d="M 530 160 L 590 110"
              stroke="#475569"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M 530 160 L 590 160"
              stroke="#475569"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M 530 160 L 590 210"
              stroke="#475569"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M 720 160 L 760 160"
              stroke="#475569"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
            />
            {/* DLQ fallback branch */}
            <path
              d="M 460 210 L 460 270 L 620 270"
              stroke="#dc2626"
              strokeDasharray="4 4"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
            />

            {/* Node 1: Client / Ingress */}
            <g
              transform="translate(20, 110)"
              className="cursor-pointer transition-transform duration-150 hover:-translate-y-0.5"
              onMouseEnter={() => interactive && setActiveNode('ingress')}
              onMouseLeave={() => interactive && setActiveNode(null)}
            >
              <rect
                width="110"
                height="100"
                rx="8"
                fill="#1e293b"
                stroke={activeNode === 'ingress' ? '#38bdf8' : '#334155'}
                strokeWidth="1.5"
              />
              <text x="55" y="45" textAnchor="middle" fill="#f8fafc" fontWeight="600" fontSize="13">
                Clients
              </text>
              <text x="55" y="65" textAnchor="middle" fill="#94a3b8" fontSize="11">
                REST / gRPC
              </text>
              <text x="55" y="82" textAnchor="middle" fill="#64748b" fontSize="9">
                Job Producers
              </text>
            </g>

            {/* Node 2: Scheduler / Gateway */}
            <g
              transform="translate(190, 100)"
              className="cursor-pointer transition-transform duration-150 hover:-translate-y-0.5"
              onMouseEnter={() => interactive && setActiveNode('queue')}
              onMouseLeave={() => interactive && setActiveNode(null)}
            >
              <rect
                width="140"
                height="120"
                rx="8"
                fill="#1e293b"
                stroke={activeNode === 'queue' ? '#38bdf8' : '#334155'}
                strokeWidth="1.5"
              />
              <text x="70" y="40" textAnchor="middle" fill="#f8fafc" fontWeight="600" fontSize="13">
                Task Gateway
              </text>
              <text x="70" y="60" textAnchor="middle" fill="#38bdf8" fontSize="11">
                Go Ingress Router
              </text>
              <text x="70" y="80" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Rate Limit &amp; Token
              </text>
              <text x="70" y="98" textAnchor="middle" fill="#64748b" fontSize="9">
                Idempotency Key
              </text>
            </g>

            {/* Node 3: Redis Streams Broker */}
            <g
              transform="translate(390, 85)"
              className="cursor-pointer transition-transform duration-150 hover:-translate-y-0.5"
              onMouseEnter={() => interactive && setActiveNode('broker')}
              onMouseLeave={() => interactive && setActiveNode(null)}
            >
              <rect
                width="140"
                height="145"
                rx="8"
                fill="#1e293b"
                stroke={activeNode === 'broker' ? '#38bdf8' : '#dc2626'}
                strokeWidth="1.5"
              />
              <text x="70" y="35" textAnchor="middle" fill="#f8fafc" fontWeight="600" fontSize="13">
                Redis Streams
              </text>
              <text x="70" y="55" textAnchor="middle" fill="#f87171" fontSize="11">
                Consumer Groups
              </text>
              <text x="70" y="78" textAnchor="middle" fill="#94a3b8" fontSize="10">
                XADD / XREADGROUP
              </text>
              <text x="70" y="98" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Distributed Lock
              </text>
              <text x="70" y="122" textAnchor="middle" fill="#64748b" fontSize="9">
                Pending Entry List (PEL)
              </text>
            </g>

            {/* Node 4: Worker Pool (Goroutines) */}
            <g transform="translate(590, 70)">
              <rect width="130" height="175" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
              <text x="65" y="28" textAnchor="middle" fill="#f8fafc" fontWeight="600" fontSize="12">
                Worker Pool
              </text>
              <g transform="translate(10, 42)">
                <rect width="110" height="34" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
                <text x="55" y="21" textAnchor="middle" fill="#e2e8f0" fontSize="11">Worker #1 [Go]</text>
              </g>
              <g transform="translate(10, 84)">
                <rect width="110" height="34" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
                <text x="55" y="21" textAnchor="middle" fill="#e2e8f0" fontSize="11">Worker #2 [Go]</text>
              </g>
              <g transform="translate(10, 126)">
                <rect width="110" height="34" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
                <text x="55" y="21" textAnchor="middle" fill="#e2e8f0" fontSize="11">Worker #3 [Go]</text>
              </g>
            </g>

            {/* Node 5: Storage & ACK */}
            <g transform="translate(760, 110)">
              <rect width="60" height="100" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="30" y="45" textAnchor="middle" fill="#34d399" fontWeight="600" fontSize="11">Postgres</text>
              <text x="30" y="65" textAnchor="middle" fill="#94a3b8" fontSize="10">ACK</text>
              <text x="30" y="82" textAnchor="middle" fill="#64748b" fontSize="8">State</text>
            </g>

            {/* DLQ Box */}
            <g transform="translate(620, 252)">
              <rect width="100" height="36" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
              <text x="50" y="22" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="600">
                DLQ (Dead Letter)
              </text>
            </g>
          </svg>
        </div>

        {/* Dynamic Explanatory Footer */}
        <div className="mt-3 pt-3 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              {lang === 'tr' ? 'Goroutine Concurrency' : 'Goroutine Concurrency'}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {lang === 'tr' ? 'At-Least-Once Garantisi' : 'At-Least-Once Delivery'}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              {lang === 'tr' ? 'DLQ İzolasyonu' : 'DLQ Fault Isolation'}
            </span>
          </div>
          <div className="font-mono text-slate-400 text-[11px]">
            {activeNode === 'ingress'
              ? (lang === 'tr' ? 'İstemciler: Idempotent HTTP/gRPC çağrıları üretir' : 'Ingress: Generates idempotent HTTP/gRPC tasks')
              : activeNode === 'broker'
              ? (lang === 'tr' ? 'Redis Streams: XREADGROUP ile dağıtır, PEL ile askıda kalanları izler' : 'Redis Streams: Dispatches with XREADGROUP, tracks pending leases via PEL')
              : (lang === 'tr' ? 'Sürekli Otomatik Claim (Orphan Task Recovery) aktif' : 'Automatic Orphan Task Reclaim supervisor active')}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'crdt-canvas') {
    return (
      <div className="w-full bg-[#1A1F2C] text-slate-200 rounded-xl p-5 border border-slate-700/60 shadow-inner overflow-hidden select-none">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/50 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-sm bg-indigo-400"></span>
            SYSTEM ARCHITECTURE: STATE-BASED CRDT SYNC
          </span>
          <span className="text-[11px] text-slate-400">
            {lang === 'tr' ? 'Matematiksel Yakınsama' : 'Conflict-Free Convergence'}
          </span>
        </div>

        <div className="relative w-full aspect-[21/9] min-h-[220px]">
          <svg viewBox="0 0 840 320" className="w-full h-full text-xs font-mono" fill="none">
            <defs>
              <pattern id="grid-crdt" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              </pattern>
              <marker id="arrow-crdt" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="#818cf8" />
              </marker>
            </defs>
            <rect width="840" height="320" fill="url(#grid-crdt)" />

            {/* Connecting arcs */}
            <path d="M 220 120 C 320 80, 360 80, 420 110" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M 420 110 C 480 80, 520 80, 620 120" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow-crdt)" />
            <path d="M 620 180 C 520 220, 480 220, 420 190" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M 420 190 C 360 220, 320 220, 220 180" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow-crdt)" />

            {/* Client A */}
            <g transform="translate(40, 70)">
              <rect width="180" height="170" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="90" y="32" textAnchor="middle" fill="#f8fafc" fontWeight="600" fontSize="13">
                Client A (Browser)
              </text>
              <rect x="15" y="48" width="150" height="34" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />
              <text x="90" y="70" textAnchor="middle" fill="#93c5fd" fontSize="11">Local Y.Doc State</text>
              <rect x="15" y="90" width="150" height="34" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />
              <text x="90" y="112" textAnchor="middle" fill="#38bdf8" fontSize="11">Canvas 2D (60 FPS)</text>
              <rect x="15" y="132" width="150" height="24" rx="4" fill="#0284c7" fillOpacity="0.2" />
              <text x="90" y="148" textAnchor="middle" fill="#7dd3fc" fontSize="10">IndexedDB Cache</text>
            </g>

            {/* Central WebSocket Relay Hub */}
            <g transform="translate(340, 80)">
              <rect width="160" height="150" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="80" y="35" textAnchor="middle" fill="#f8fafc" fontWeight="600" fontSize="13">
                WebSocket Relay
              </text>
              <text x="80" y="55" textAnchor="middle" fill="#a5b4fc" fontSize="11">
                Zero-Lock Server
              </text>
              <text x="80" y="80" textAnchor="middle" fill="#94a3b8" fontSize="10">
                Binary Delta Broadcast
              </text>
              <text x="80" y="102" textAnchor="middle" fill="#94a3b8" fontSize="10">
                State Vector Sync
              </text>
              <text x="80" y="126" textAnchor="middle" fill="#34d399" fontSize="9">
                Sub-10ms Relay Time
              </text>
            </g>

            {/* Client B */}
            <g transform="translate(620, 70)">
              <rect width="180" height="170" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="90" y="32" textAnchor="middle" fill="#f8fafc" fontWeight="600" fontSize="13">
                Client B (Browser)
              </text>
              <rect x="15" y="48" width="150" height="34" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />
              <text x="90" y="70" textAnchor="middle" fill="#93c5fd" fontSize="11">Local Y.Doc State</text>
              <rect x="15" y="90" width="150" height="34" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />
              <text x="90" y="112" textAnchor="middle" fill="#38bdf8" fontSize="11">Canvas 2D (60 FPS)</text>
              <rect x="15" y="132" width="150" height="24" rx="4" fill="#0284c7" fillOpacity="0.2" />
              <text x="90" y="148" textAnchor="middle" fill="#7dd3fc" fontSize="10">IndexedDB Cache</text>
            </g>
          </svg>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span>· {lang === 'tr' ? 'Optimistik Yerel Tepki (<16ms)' : 'Optimistic Local Response (<16ms)'}</span>
            <span>· {lang === 'tr' ? 'İkili State Vector Farkı' : 'Binary State-Vector Diffing'}</span>
            <span>· {lang === 'tr' ? 'Çevrimdışı Çalışma Garantisi' : 'Full Offline Durability'}</span>
          </div>
          <span className="font-mono text-[11px] text-indigo-300">
            Commutative &amp; Idempotent Merge
          </span>
        </div>
      </div>
    );
  }

  if (type === 'telemetry-engine') {
    return (
      <div className="w-full bg-[#141C2E] text-slate-200 rounded-xl p-5 border border-slate-700/60 shadow-inner overflow-hidden select-none">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/50 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-sm bg-teal-400"></span>
            SYSTEM ARCHITECTURE: COLUMNAR LOG STORAGE ENGINE
          </span>
          <span className="text-[11px] text-slate-400">
            {lang === 'tr' ? 'LSM & Sütun Odaklı Pruning' : 'LSM & Column Chunk Pruning'}
          </span>
        </div>

        <div className="relative w-full aspect-[21/9] min-h-[220px]">
          <svg viewBox="0 0 840 320" className="w-full h-full text-xs font-mono" fill="none">
            <defs>
              <pattern id="grid-tele" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              </pattern>
              <marker id="arrow-tele" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="#2dd4bf" />
              </marker>
            </defs>
            <rect width="840" height="320" fill="url(#grid-tele)" />

            <path d="M 180 160 L 250 160" stroke="#2dd4bf" strokeWidth="2" markerEnd="url(#arrow-tele)" />
            <path d="M 430 160 L 500 160" stroke="#2dd4bf" strokeWidth="2" markerEnd="url(#arrow-tele)" />
            <path d="M 680 160 L 730 160" stroke="#2dd4bf" strokeWidth="2" markerEnd="url(#arrow-tele)" />

            {/* Ingestion stream */}
            <g transform="translate(30, 95)">
              <rect width="150" height="130" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
              <text x="75" y="35" textAnchor="middle" fill="#f8fafc" fontWeight="600" fontSize="12">Ingress Streams</text>
              <text x="75" y="55" textAnchor="middle" fill="#2dd4bf" fontSize="11">Log &amp; Metric Events</text>
              <text x="75" y="80" textAnchor="middle" fill="#94a3b8" fontSize="10">High Throughput</text>
              <text x="75" y="100" textAnchor="middle" fill="#64748b" fontSize="9">Zero-alloc Ingestion</text>
            </g>

            {/* Memtable Double Buffer */}
            <g transform="translate(250, 80)">
              <rect width="180" height="160" rx="8" fill="#132e35" stroke="#14b8a6" strokeWidth="1.5" />
              <text x="90" y="32" textAnchor="middle" fill="#f8fafc" fontWeight="600" fontSize="12">MemTable (RAM)</text>
              <rect x="15" y="48" width="150" height="40" rx="4" fill="#0f172a" stroke="#2dd4bf" strokeWidth="1" />
              <text x="90" y="66" textAnchor="middle" fill="#5eead4" fontSize="10">Active SkipList Buffer</text>
              <text x="90" y="80" textAnchor="middle" fill="#64748b" fontSize="8">Accepting Writes</text>
              <rect x="15" y="98" width="150" height="40" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
              <text x="90" y="116" textAnchor="middle" fill="#94a3b8" fontSize="10">Frozen Buffer (Flushing)</text>
              <text x="90" y="130" textAnchor="middle" fill="#64748b" fontSize="8">Async Disk I/O</text>
            </g>

            {/* Columnar Chunks on Disk */}
            <g transform="translate(500, 75)">
              <rect width="180" height="170" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
              <text x="90" y="30" textAnchor="middle" fill="#f8fafc" fontWeight="600" fontSize="12">Disk Column Chunks</text>
              <g transform="translate(15, 45)">
                <rect width="150" height="28" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                <text x="75" y="18" textAnchor="middle" fill="#bae6fd" fontSize="10">Timestamp [Delta Encoded]</text>
              </g>
              <g transform="translate(15, 80)">
                <rect width="150" height="28" rx="3" fill="#0f172a" stroke="#a78bfa" strokeWidth="1" />
                <text x="75" y="18" textAnchor="middle" fill="#ddd6fe" fontSize="10">Latency [Min/Max Header]</text>
              </g>
              <g transform="translate(15, 115)">
                <rect width="150" height="28" rx="3" fill="#0f172a" stroke="#34d399" strokeWidth="1" />
                <text x="75" y="18" textAnchor="middle" fill="#a7f3d0" fontSize="10">StatusCode [RLE Encoded]</text>
              </g>
            </g>

            {/* Fast Aggregation Query Scanner */}
            <g transform="translate(730, 95)">
              <rect width="80" height="130" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="40" y="35" textAnchor="middle" fill="#fbbf24" fontWeight="600" fontSize="11">Vector</text>
              <text x="40" y="52" textAnchor="middle" fill="#fbbf24" fontWeight="600" fontSize="11">Scanner</text>
              <text x="40" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9">p95 / p99</text>
              <text x="40" y="98" textAnchor="middle" fill="#34d399" fontSize="9">&lt; 18ms</text>
            </g>
          </svg>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span>· {lang === 'tr' ? '%72 Disk Tasarrufu (Gorilla Compression)' : '72% Storage Savings (Gorilla)'}</span>
            <span>· {lang === 'tr' ? 'Blok Budama (Sparse Min/Max Pruning)' : 'Sparse Min/Max Chunk Pruning'}</span>
          </div>
          <span className="font-mono text-[11px] text-teal-300">
            Valgrind Zero-Leak Tested
          </span>
        </div>
      </div>
    );
  }

  // Fallback: cloud-gateway
  return (
    <div className="w-full bg-[#182338] text-slate-200 rounded-xl p-5 border border-slate-700/60 shadow-inner overflow-hidden select-none">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700/50 text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-sm bg-emerald-400"></span>
          SYSTEM ARCHITECTURE: REVERSE PROXY &amp; CIRCUIT BREAKER
        </span>
        <span className="text-[11px] text-slate-400">
          {lang === 'tr' ? 'Hata İzolasyon Hattı' : 'Fault Isolation Pipeline'}
        </span>
      </div>

      <div className="relative w-full aspect-[21/9] min-h-[220px]">
        <svg viewBox="0 0 840 320" className="w-full h-full text-xs font-mono" fill="none">
          <defs>
            <pattern id="grid-gw" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            <marker id="arrow-gw" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
              <polygon points="0 0, 6 2, 0 4" fill="#34d399" />
            </marker>
          </defs>
          <rect width="840" height="320" fill="url(#grid-gw)" />

          <path d="M 130 160 L 200 160" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-gw)" />
          <path d="M 370 160 L 440 160" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-gw)" />
          <path d="M 610 160 L 670 110" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrow-gw)" />
          <path d="M 610 160 L 670 160" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrow-gw)" />
          <path d="M 610 160 L 670 210" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrow-gw)" />

          {/* Inbound Client */}
          <g transform="translate(30, 110)">
            <rect width="100" height="100" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
            <text x="50" y="45" textAnchor="middle" fill="#f8fafc" fontWeight="600" fontSize="13">Inbound</text>
            <text x="50" y="65" textAnchor="middle" fill="#94a3b8" fontSize="11">Traffic</text>
            <text x="50" y="82" textAnchor="middle" fill="#64748b" fontSize="9">TLS / HTTP/2</text>
          </g>

          {/* Rate Limiter */}
          <g transform="translate(200, 95)">
            <rect width="170" height="130" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="85" y="32" textAnchor="middle" fill="#f8fafc" fontWeight="600" fontSize="12">Rate Limiter (Redis)</text>
            <text x="85" y="52" textAnchor="middle" fill="#60a5fa" fontSize="10">Sliding Window Counter</text>
            <text x="85" y="74" textAnchor="middle" fill="#94a3b8" fontSize="10">Token Bucket Policy</text>
            <text x="85" y="94" textAnchor="middle" fill="#94a3b8" fontSize="10">Atomic Lua Scripts</text>
            <text x="85" y="114" textAnchor="middle" fill="#34d399" fontSize="9">Overhead &lt; 0.8ms</text>
          </g>

          {/* Circuit Breaker & Router */}
          <g transform="translate(440, 85)">
            <rect width="170" height="150" rx="8" fill="#064e3b" fillOpacity="0.4" stroke="#10b981" strokeWidth="1.5" />
            <text x="85" y="32" textAnchor="middle" fill="#f8fafc" fontWeight="600" fontSize="12">Circuit Breaker</text>
            <text x="85" y="52" textAnchor="middle" fill="#34d399" fontSize="10">Finite State Machine</text>
            <g transform="translate(15, 65)">
              <rect width="140" height="22" rx="3" fill="#047857" />
              <text x="70" y="15" textAnchor="middle" fill="#d1fae5" fontSize="9">CLOSED (Healthy)</text>
            </g>
            <g transform="translate(15, 92)">
              <rect width="140" height="22" rx="3" fill="#b45309" />
              <text x="70" y="15" textAnchor="middle" fill="#fef3c7" fontSize="9">HALF-OPEN (Canary)</text>
            </g>
            <text x="85" y="134" textAnchor="middle" fill="#94a3b8" fontSize="9">503 Fast Fallback</text>
          </g>

          {/* Downstream microservices */}
          <g transform="translate(670, 75)">
            <rect width="140" height="170" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <text x="70" y="28" textAnchor="middle" fill="#f8fafc" fontWeight="600" fontSize="11">Downstream</text>
            <g transform="translate(10, 40)">
              <rect width="120" height="32" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              <text x="60" y="20" textAnchor="middle" fill="#cbd5e1" fontSize="10">Auth Service</text>
            </g>
            <g transform="translate(10, 80)">
              <rect width="120" height="32" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              <text x="60" y="20" textAnchor="middle" fill="#cbd5e1" fontSize="10">Order Service</text>
            </g>
            <g transform="translate(10, 120)">
              <rect width="120" height="32" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              <text x="60" y="20" textAnchor="middle" fill="#cbd5e1" fontSize="10">Payment Gateway</text>
            </g>
          </g>
        </svg>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-700/50 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span>· {lang === 'tr' ? 'Basamaklı Çöküş Önleme' : 'Cascading Failure Prevention'}</span>
          <span>· {lang === 'tr' ? 'p95 Gecikme Ek Yükü < 2.8ms' : 'p95 Transit Overhead < 2.8ms'}</span>
        </div>
        <span className="font-mono text-[11px] text-emerald-300">
          OpenTelemetry Trace Tracing
        </span>
      </div>
    </div>
  );
};
