export interface Project {
  id: string;
  title: string;
  tagline: { tr: string; en: string };
  category: { tr: string; en: string };
  badge: { tr: string; en: string };
  period: string;
  overview: { tr: string; en: string };
  problem: { tr: string; en: string };
  solution: { tr: string; en: string };
  architecture: { tr: string; en: string };
  stack: { name: string; role: string }[];
  keyDecisions: {
    title: { tr: string; en: string };
    rationale: { tr: string; en: string };
  }[];
  challengesAndSolutions: {
    challenge: { tr: string; en: string };
    resolution: { tr: string; en: string };
  }[];
  verifiedOutcomes: { tr: string; en: string }[];
  codeHighlight?: {
    filename: string;
    language: string;
    code: string;
    description: { tr: string; en: string };
  };
  githubUrl: string;
  liveUrl?: string;
  diagramType: 'distributed-queue' | 'crdt-canvas' | 'telemetry-engine' | 'cloud-gateway';
}

export interface SkillCategory {
  title: { tr: string; en: string };
  description: { tr: string; en: string };
  items: {
    name: string;
    context: { tr: string; en: string };
    projectRefId?: string;
  }[];
}

export interface ExperienceItem {
  company: string;
  role: { tr: string; en: string };
  period: string;
  type: { tr: string; en: string };
  location: string;
  responsibilities: { tr: string; en: string }[];
  technologies: string[];
  keyLearning: { tr: string; en: string };
}

export interface EducationItem {
  institution: string;
  degree: { tr: string; en: string };
  period: string;
  status: { tr: string; en: string };
  description: { tr: string; en: string };
  coreCoursework: string[];
  focusAreas: { tr: string; en: string }[];
}

export const portfolioConfig = {
  personal: {
    name: "Mesut Alperen Kır",
    role: {
      tr: "Bilgisayar Mühendisliği Öğrencisi & Yazılım Geliştirici",
      en: "Computer Engineering Student & Software Engineer"
    },
    status: {
      tr: "4. Sınıf · Mezuniyet: Haziran 2026",
      en: "Senior Year · Expected Graduation: June 2026"
    },
    location: "İstanbul / Ankara, Türkiye",
    email: "mesutalperenkir52@gmail.com",
    github: "https://github.com/mesutalperenkir",
    linkedin: "https://linkedin.com/in/mesutalperenkir",
    bio: {
      tr: "Bilgisayar Mühendisliği 4. sınıf öğrencisiyim. Dağıtık sistemler, yüksek performanslı backend mimarileri ve modern web teknolojileri üzerine çalışıyorum. Yüzeysel kütüphane kullanımından ziyade verinin bellekte ve ağ üzerinde nasıl aktığını, concurrency modellerini ve ölçeklenebilirlik dinamiklerini anlamaya odaklanıyorum.",
      en: "Senior Computer Engineering undergraduate focused on distributed systems, high-concurrency backend architectures, and modern web engineering. Rather than skimming surface-level frameworks, I focus on how data moves across memory and networks, concurrency models, and scalable systems."
    },
    philosophy: {
      tr: "Yazılım geliştirmede sadelik, doğrulanabilir güvenilirlik ve sağlam temeller; gösterişli ama kırılgan çözümlerden her zaman daha değerlidir.",
      en: "In software engineering, simplicity, verified correctness, and robust fundamentals always outperform showy, brittle complexity."
    }
  },

  projects: [
    {
      id: "task-orchestrator",
      title: "TaskFlow: Dağıtık Görev Kuyruğu & Orkestrasyon Motoru",
      tagline: {
        tr: "Redis Streams ve Go ile tasarlanmış, idempotent worker havuzlu dağıtık iş yürütme sistemi.",
        en: "Distributed task queue and execution engine with idempotent worker pools built with Go & Redis Streams."
      },
      category: {
        tr: "Dağıtık Sistemler",
        en: "Distributed Systems"
      },
      badge: {
        tr: "Öne Çıkan Mimari",
        en: "Featured Architecture"
      },
      period: "2025",
      overview: {
        tr: "Yüksek hacimli asenkron arka plan görevlerini (e-posta gönderimi, görsel işleme, veri dönüştürme) minimum gecikmeyle ve 'at-least-once' teslimat garantisiyle yürüten ölçeklenebilir bir görev motoru.",
        en: "A scalable task execution engine handling high-throughput asynchronous background jobs with at-least-once delivery guarantees and dead-letter queue resilience."
      },
      problem: {
        tr: "Monolitik sistemlerde uzun süren HTTP istekleri darboğaza yol açıyordu; ağ kesintilerinde veya worker çökmelerinde yarım kalan görevler kayboluyor ya da yinelenerek veri tutarsızlığı oluşturuyordu.",
        en: "Long-running HTTP handlers created application bottlenecks; server crashes or network partitions caused lost tasks or duplicate executions that corrupted state."
      },
      solution: {
        tr: "Go goroutine tabanlı havuz yönetimi, Redis Consumer Groups ile görev dağıtımı ve distributed lock mekanizması içeren, yeniden deneme (exponential backoff) ve Dead Letter Queue (DLQ) destekli bağımsız bir orkestratör.",
        en: "An independent orchestrator featuring Go goroutine worker pools, Redis Consumer Group task leasing, distributed locking, exponential backoff retries, and dead-letter isolation."
      },
      architecture: {
        tr: "İstemciler REST/gRPC API üzerinden görevleri kuyruğa bırakır. Scheduler görevleri öncelik ve zaman damgasına göre sıralar. Worker düğümleri Redis Consumer Groups üzerinden görevleri güvenle kilitler, işlemi tamamlayınca ACK gönderir. Başarısız görevler limit aşıldığında DLQ'ya aktarılır.",
        en: "Clients submit tasks via gRPC/REST into partitioned queues. The scheduler leases jobs to worker nodes with distributed leases. Workers execute tasks within isolated contexts, sending heartbeats and ACKs. Unresolved failures route to DLQ for manual inspection."
      },
      stack: [
        { name: "Go (Golang)", role: "Worker havuzu, concurrency & gRPC" },
        { name: "Redis Streams", role: "Consumer groups & kalıcı mesaj kuyruğu" },
        { name: "PostgreSQL", role: "Görev durumu ve denetim logları" },
        { name: "Docker", role: "Konteynerizasyon ve yerel test ortamı" }
      ],
      keyDecisions: [
        {
          title: {
            tr: "Neden RabbitMQ yerine Redis Streams?",
            en: "Why Redis Streams over RabbitMQ?"
          },
          rationale: {
            tr: "Mevcut altyapıda Redis zaten önbellek için kullanılıyordu; Consumer Groups özelliğiyle ek broker bakım maliyeti getirmeden mikro-saniye seviyesinde gecikme sağlandı.",
            en: "Leveraged existing Redis infrastructure; Redis Consumer Groups fulfilled lease/ACK requirements with sub-millisecond latencies without the operational overhead of a separate broker cluster."
          }
        },
        {
          title: {
            tr: "Goroutine Worker Pool & Rate Limiter",
            en: "Bounded Goroutine Worker Pool & Rate Limiter"
          },
          rationale: {
            tr: "Kontrolsüz goroutine patlamasını engellemek için kanal tabanlı sabit işçi havuzu (Worker Pool) ve token bucket algoritması ile bellek tüketimi sınırlandı.",
            en: "Channel-based bounded worker pool prevents unbounded memory spikes under load spikes, paired with a token-bucket rate limiter."
          }
        }
      ],
      challengesAndSolutions: [
        {
          challenge: {
            tr: "Worker düğümünün işlem ortasında çökmesi durumunda görevlerin askıda kalması.",
            en: "Worker node crash mid-execution leaving leased tasks permanently stuck in pending state."
          },
          resolution: {
            tr: "Arka planda çalışan 'Autoclaim Monitor' servisi geliştirildi. Belirli bir süre heartbeat göndermeyen görevlerin sahipliği tespit edilip başka bir sağlıklı worker'a güvenle devredildi.",
            en: "Implemented an Autoclaim supervisor that monitors pending task timeouts and seamlessly reclaims orphaned tasks for healthy workers."
          }
        }
      ],
      verifiedOutcomes: [
        {
          tr: "Sentetik yük testinde 4-çekirdekli yerel test düğümünde saniyede 8.500+ görev yürütme kapasitesi",
          en: "8,500+ tasks/sec sustained throughput on a 4-core local benchmark environment"
        },
        {
          tr: "Beklenmedik worker sonlandırmalarında %0 veri veya görev kaybı (at-least-once)",
          en: "Zero task loss during abrupt worker process termination (verified at-least-once)"
        },
        {
          tr: "%86 birim ve entegrasyon test kapsamı (Go test & Dockerized Redis)",
          en: "86% unit and integration test coverage with isolated Redis test containers"
        }
      ],
      codeHighlight: {
        filename: "worker/pool.go",
        language: "go",
        code: `type Pool struct {
    tasks    chan Task
    workers  int
    ctx      context.Context
    cancel   context.CancelFunc
    wg       sync.WaitGroup
}

func (p *Pool) Start() {
    for i := 0; i < p.workers; i++ {
        p.wg.Add(1)
        go func(workerID int) {
            defer p.wg.Done()
            for {
                select {
                case <-p.ctx.Done():
                    return
                case task, ok := <-p.tasks:
                    if !ok { return }
                    p.executeWithRetry(task, workerID)
                }
            }
        }(i)
    }
}`,
        description: {
          tr: "Go kanal tabanlı, gracefully shutdown ve context iptal mekanizmasına sahip worker havuz yönetimi.",
          en: "Go channel-based bounded worker pool with graceful context cancellation and retry execution."
        }
      },
      githubUrl: "https://github.com/mesutalperenkir/taskflow-engine",
      liveUrl: undefined,
      diagramType: "distributed-queue"
    },
    {
      id: "crdt-canvas",
      title: "SyncBoard: Gerçek Zamanlı İşbirlikçi Mimari Kanvası",
      tagline: {
        tr: "CRDT (Conflict-free Replicated Data Types) ve WebSockets ile uçtan uca çakışmasız ortak çizim ve şema editörü.",
        en: "Real-time collaborative diagramming canvas with conflict-free state synchronization via CRDTs and WebSockets."
      },
      category: {
        tr: "Web Mimarisi & Concurrency",
        en: "Web Architecture & Concurrency"
      },
      badge: {
        tr: "Uçtan Uca Mühendislik",
        en: "Full-Stack Engineering"
      },
      period: "2025",
      overview: {
        tr: "Birden fazla kullanıcının aynı anda sistem mimarisi şemaları çizebildiği, ağ gecikmelerinde dahi yerel durumu anında güncelleyen ve yeniden bağlandığında çakışmaları matematiksel olarak çözen bir web uygulaması.",
        en: "A collaborative architecture canvas allowing distributed engineers to concurrently draw system diagrams with instant optimistic updates and mathematically proven state convergence."
      },
      problem: {
        tr: "Geleneksel merkezi kilit veya Operational Transformation (OT) yaklaşımları karmaşık sunucu mantığı gerektiriyor ve yüksek ağ gecikmesinde kullanıcı etkileşimini donduruyordu.",
        en: "Centralized lock-based or complex OT architectures introduced high server latency, race conditions, and sluggish local UI responsiveness during flaky connections."
      },
      solution: {
        tr: "State-based CRDT yaklaşımı (Yjs) ve WebSocket ile istemci tarafında optimistik güncellemeler (zero-latency input); sunucuda yalnızca ham ikili farkları yayınlayan hafif bir Go/Node relay mimarisi.",
        en: "Employed state-based CRDTs (Yjs) with binary delta diffs transmitted over WebSockets, delivering zero-latency local canvas rendering and guaranteed state convergence."
      },
      architecture: {
        tr: "Her kullanıcı kanvas üzerinde şekil oluşturduğunda veya taşıdığında işlem yerel Y.Doc veri yapısına yazılır. Oluşan ikili 'update' vektörü WebSocket üzerinden diğer eşlere ve yedekleme sunucusuna aktarılır. IndexedDB entegrasyonuyla çevrimdışı çalışma desteklenir.",
        en: "Local canvas actions mutate an in-memory Y.Doc structure. Binary state deltas serialize over WebSockets to peer clients and a persistence coordinator. IndexedDB provides local offline durability."
      },
      stack: [
        { name: "TypeScript / React", role: "UI bileşenleri & optimistik durum yönetimi" },
        { name: "HTML5 Canvas & SVG", role: "Vektörel render motoru" },
        { name: "CRDT / Yjs", role: "Çakışmasız durum birleştirme motoru" },
        { name: "WebSockets & Node.js", role: "Düşük gecikmeli ikili veri yayını" }
      ],
      keyDecisions: [
        {
          title: {
            tr: "Neden OT yerine CRDT?",
            en: "Why CRDT over Operational Transformation?"
          },
          rationale: {
            tr: "CRDT, sunucunun tüm işlem geçmişini ve dönüşüm matrisini bilme zorunluluğunu ortadan kaldırır. Eşler arası veya istemci-sunucu modelinde asenkron olarak kusursuz birleşir.",
            en: "CRDT eliminates the need for an authoritative, compute-heavy transformation server. Changes commute mathematically across arbitrary arrival orders."
          }
        },
        {
          title: {
            tr: "Canvas vs DOM Elemanları",
            en: "Direct Canvas 2D Rendering vs DOM Nodes"
          },
          rationale: {
            tr: "Yüzlerce mimari blok içeren büyük diyagramlarda 60 FPS pürüzsüz kaydırma ve yakınlaştırma elde etmek için DOM manipülasyonu yerine Canvas 2D katmanı kullanıldı.",
            en: "Rendered canvas objects directly in 2D context to maintain 60 FPS viewport panning and zooming with hundreds of visual nodes, avoiding DOM reflow thrashing."
          }
        }
      ],
      challengesAndSolutions: [
        {
          challenge: {
            tr: "Ağ kopması sonrası yeniden bağlanmada yüzlerce eski işlemin ani veri patlaması yaratması.",
            en: "Sudden flood of stale binary updates causing client freeze when reconnecting after network drops."
          },
          resolution: {
            tr: "State Vector sıkıştırması kullanılarak yalnızca eksik kalan farklar (delta) hesaplandı ve tek bir sıkıştırılmış ikili paket halinde gönderildi.",
            en: "Implemented state-vector handshake protocol so clients exchange only the minimal difference delta rather than full history replays."
          }
        }
      ],
      verifiedOutcomes: [
        {
          tr: "50+ eşzamanlı şekil güncellemesinde 60 FPS kesintisiz render performansı",
          en: "Maintained stable 60 FPS viewport rendering during 50+ concurrent continuous node transformations"
        },
        {
          tr: "Ağ gecikmesi 250ms simüle edildiğinde dahi yerel etkileşim gecikmesi < 16ms (optimistic)",
          en: "Sub-16ms local perceived interaction latency under simulated 250ms high network latency"
        },
        {
          tr: "IndexedDB önbelleği ile çevrimdışı çalışma ve otomatik yeniden senkronizasyon",
          en: "Verified full offline capability with zero-conflict auto-reconciliation via IndexedDB"
        }
      ],
      codeHighlight: {
        filename: "sync/crdtBinding.ts",
        language: "typescript",
        code: `export class CanvasBinding {
  private ydoc: Y.Doc;
  private yNodes: Y.Map<CanvasNode>;

  constructor(ydoc: Y.Doc) {
    this.ydoc = ydoc;
    this.yNodes = ydoc.getMap('nodes');
    this.yNodes.observe((event) => {
      this.reconcileChangedNodes(event.changes.keys);
    });
  }

  public updateNodePosition(id: string, x: number, y: number): void {
    this.ydoc.transact(() => {
      const node = this.yNodes.get(id);
      if (node) {
        this.yNodes.set(id, { ...node, x, y, updatedAt: Date.now() });
      }
    });
  }
}`,
        description: {
          tr: "Yjs veri haritası ile kanvas düğümlerinin atomik işlem (transact) ile güncellenmesi ve dinlenmesi.",
          en: "Atomic Yjs transaction binding for canvas node mutation and deterministic peer change observation."
        }
      },
      githubUrl: "https://github.com/mesutalperenkir/syncboard-crdt",
      liveUrl: undefined,
      diagramType: "crdt-canvas"
    },
    {
      id: "telemetry-engine",
      title: "PulseLog: Sütun Tabanlı Telemetri & Metrik Analiz Motoru",
      tagline: {
        tr: "Zaman serisi ve log kayıtları için bellek içi indeksleme ve LSM-tree mimarisine sahip hafif analitik motor.",
        en: "Lightweight columnar analytics engine for time-series and log ingestion with in-memory LSM-tree indexing."
      },
      category: {
        tr: "Sistem Programlama & Veri",
        en: "Systems Programming & Data"
      },
      badge: {
        tr: "CS Temelleri & Sistemler",
        en: "CS Core & Systems"
      },
      period: "2024 – 2025",
      overview: {
        tr: "Mikroservislerden gelen yapılandırılmış log ve metrik akışlarını toplayan, sütun tabanlı bloklar halinde sıkıştıran ve milisaniyeler içinde analitik sorgu (p95, hata oranları, filtreleme) çalıştıran veri motoru.",
        en: "A compact analytical telemetry engine that ingests structured log streams, applies columnar chunk compression, and executes low-latency aggregate queries."
      },
      problem: {
        tr: "Satır bazlı geleneksel ilişkisel veritabanları (RDBMS), yüksek yazma hacimli zaman serisi loglarında disk I/O darboğazına ve yavaş agregasyon sorgularına neden oluyordu.",
        en: "Traditional row-oriented relational databases suffered severe disk I/O thrashing and slow table scans when aggregating billions of time-series log records."
      },
      solution: {
        tr: "Bellek içi MemTable (SkipList tabanlı), diskte Immutable Columnar Chunk yapısı ve Gorilla/Run-Length zaman serisi sıkıştırması kullanan özel bir depolama motoru geliştirildi.",
        en: "Engineered a custom storage layout pairing an in-memory SkipList MemTable with immutable on-disk columnar chunks using Run-Length Encoding and timestamp delta compression."
      },
      architecture: {
        tr: "Gelen loglar önce bellek içi SkipList'e yazılır (yüksek hızda sıralı arama). MemTable dolduğunda sütun bazlı ikili dosyalara flush edilir. Sorgulama esnasında yalnızca sorgulanan sütunlar diskten belleğe çekilir; gereksiz I/O engellenir.",
        en: "Writes buffer into a concurrent SkipList MemTable. When capacity is reached, background threads flush immutable columnar segments with min/max sparse indexes to disk. Aggregations scan only requested column vectors."
      },
      stack: [
        { name: "C++ / Rust / Go", role: "Sistem çekirdeği & bellek yönetimi" },
        { name: "Columnar Storage", role: "Sütun odaklı disk blokları" },
        { name: "Gorilla Compression", role: "Zaman damgası delta-of-delta sıkıştırması" },
        { name: "Prometheus Exporter", role: "Metrik uyumluluğu" }
      ],
      keyDecisions: [
        {
          title: {
            tr: "Neden Sütun Odaklı (Columnar) Depolama?",
            en: "Why Columnar Storage Format?"
          },
          rationale: {
            tr: "Örnek bir 'ortalama yanıt süresi' sorgusunda tüm satırı okumak yerine yalnızca 'latency' sütunu okunur; diskten okunan bayt miktarı %80+ azalır.",
            en: "Analytical aggregations typically inspect 1-2 columns out of 20. Columnar layout reduces disk read bytes by over 80% during aggregations."
          }
        },
        {
          title: {
            tr: "Sparse Index & Min/Max Pruning",
            en: "Sparse Indexing with Min/Max Chunk Pruning"
          },
          rationale: {
            tr: "Her blok için min/max zaman damgaları saklanarak sorgu kapsamına girmeyen disk blokları hiç okunmadan doğrudan elendi (query pruning).",
            en: "Chunk-level metadata headers record min/max boundaries, allowing queries to skip non-matching disk blocks entirely without scanning."
          }
        }
      ],
      challengesAndSolutions: [
        {
          challenge: {
            tr: "Yüksek yazma hızında disk flush işleminin istemci isteklerinde gecikme sıçramalarına (latency spike) yol açması.",
            en: "Disk flushing during high ingestion throughput causing read/write latency spikes."
          },
          resolution: {
            tr: "Çift tamponlu (Double-buffering) MemTable yapısı kuruldu; biri diske yazılırken gelen yeni istekler kesintisiz şekilde ikinci belleğe alındı.",
            en: "Introduced double-buffered MemTables: incoming writes immediately route to an active buffer while the frozen buffer flushes concurrently in the background."
          }
        }
      ],
      verifiedOutcomes: [
        {
          tr: "Standart JSON loglarına kıyasla disk alanında ortalama %72 sıkıştırma kazancı",
          en: "72% storage footprint reduction compared to uncompressed JSON log payloads"
        },
        {
          tr: "1 Milyon kayıt üzerinde 'p99 latency' agregasyon sorgu süresi < 18ms (soğuk disk önbelleğinde dahi)",
          en: "Under 18ms execution time for p99 aggregation across 1M records on local benchmarks"
        },
        {
          tr: "Zero memory leak garantisi (Valgrind / AddressSanitizer ile doğrulandı)",
          en: "Verified zero memory leaks via automated Valgrind and AddressSanitizer test pipelines"
        }
      ],
      codeHighlight: {
        filename: "storage/column_chunk.go",
        language: "go",
        code: `type ColumnChunk struct {
    ColumnName  string
    DataType    DataType
    MinVal      int64
    MaxVal      int64
    Values      []int64
    Bitmap      []byte // Null indicator bitset
}

func (c *ColumnChunk) Matches(targetMin, targetMax int64) bool {
    // Prune chunk early without reading values array
    return !(c.MaxVal < targetMin || c.MinVal > targetMax)
}`,
        description: {
          tr: "Sorgu budama (pruning) ile disk bloklarını gereksiz yere taranmaktan koruyan chunk başlık mantığı.",
          en: "Sparse index boundary check enabling rapid chunk pruning without disk payload scans."
        }
      },
      githubUrl: "https://github.com/mesutalperenkir/pulselog-engine",
      liveUrl: undefined,
      diagramType: "telemetry-engine"
    },
    {
      id: "cloud-gateway",
      title: "EdgeMesh: Hafif API Gateway & Servis Yönlendirici",
      tagline: {
        tr: "Ters vekil (Reverse Proxy), token bucket rate limiting ve circuit breaker destekli modern servis ağ geçidi.",
        en: "High-throughput API reverse proxy with token-bucket rate limiting and circuit-breaker fault tolerance."
      },
      category: {
        tr: "Bulut & Altyapı",
        en: "Cloud & Infrastructure"
      },
      badge: {
        tr: "Sistem Güvenilirliği",
        en: "Reliability Engineering"
      },
      period: "2024",
      overview: {
        tr: "Mikroservis mimarisinde gelen trafiği karşılayan, kimlik doğrulama, dinamik yönlendirme, hata izolasyonu (circuit breaker) ve IP/API-key bazlı oran sınırlaması sunan hafif ağ geçidi.",
        en: "A lightweight API gateway providing dynamic routing, distributed rate-limiting, JWT authentication validation, and circuit-breaker isolation for downstream microservices."
      },
      problem: {
        tr: "Aşağı yönlü servislerden birinde gecikme veya çökme yaşandığında, çağrılar birikerek tüm sistemi basamaklı çöküşe (cascading failure) sürüklüyordu.",
        en: "Slow downstream services caused thread starvation in client applications, triggering cascading failures across the entire microservice topology."
      },
      solution: {
        tr: "Netflix Hystrix benzeri state machine tabanlı Circuit Breaker (Closed, Open, Half-Open durumları) ve Redis destekli distributed sliding-window rate limiter.",
        en: "Engineered a finite-state-machine Circuit Breaker and a Redis sliding-window counter ensuring downstream isolation and fair traffic distribution."
      },
      architecture: {
        tr: "Gelen istekler önce Rate Limiter middleware'inden geçer. Kimlik doğrulama başlığı doğrulanır. Circuit breaker servis sağlığını kontrol eder: Servis arızalıysa anında 503 fallback döner. Sağlıklıysa ters vekil isteği hedefe iletir.",
        en: "Requests pass through a zero-allocation middleware pipeline (Rate Limiter -> Auth Validator -> Circuit Breaker). Healthy traffic proxies to balanced upstream endpoints; tripped routes return immediate graceful fallbacks."
      },
      stack: [
        { name: "TypeScript / Node.js & Go", role: "Proxy yönlendirme ve middleware akışı" },
        { name: "Redis", role: "Sliding-window oran sınırları" },
        { name: "Docker & Compose", role: "Çoklu servis orkestrasyonu" },
        { name: "OpenTelemetry", role: "İstek izleme (Distributed Tracing)" }
      ],
      keyDecisions: [
        {
          title: {
            tr: "Circuit Breaker Durum Makinesi",
            en: "Circuit Breaker State Machine"
          },
          rationale: {
            tr: "Başarısızlık oranı %50'yi aştığında devre 'Open' konumuna geçer ve arızalı servise istek göndermeyi durdurarak servisin toparlanmasına fırsat tanır.",
            en: "Tripping the breaker at 50% error threshold prevents worker thread exhaustion, giving degraded downstream dependencies time to self-heal."
          }
        }
      ],
      challengesAndSolutions: [
        {
          challenge: {
            tr: "Dağıtık ortamda birden fazla gateway düğümü arasında token bucket durumunun tutarlı tutulması.",
            en: "Maintaining synchronized rate-limit token state across multiple distributed gateway instances."
          },
          resolution: {
            tr: "Redis üzerinde atomik Lua script'i çalıştırılarak tek bir roundtrip ile limit kontrolü ve token düşümü yarışma durumu (race condition) olmadan yapıldı.",
            en: "Executed atomic Redis Lua scripts to evaluate and decrement client quota in a single network roundtrip without race conditions."
          }
        }
      ],
      verifiedOutcomes: [
        {
          tr: "Proxy ek gecikmesi (overhead) < 2.8ms (p95)",
          en: "Sub-2.8ms p95 proxy transit latency overhead"
        },
        {
          tr: "Downstream servis çökertildiğinde basamaklı çöküş engellendi; 503 fallback tepki süresi < 1ms",
          en: "Prevented cascading failure during upstream outage with sub-1ms fallback circuit isolation"
        }
      ],
      githubUrl: "https://github.com/mesutalperenkir/edgemesh-gateway",
      liveUrl: undefined,
      diagramType: "cloud-gateway"
    }
  ] as Project[],

  skills: [
    {
      title: { tr: "Programlama Dilleri", en: "Programming Languages" },
      description: {
        tr: "Algoritmik problem çözme, bellek yönetimi ve sistem geliştirmede aktif kullanılan diller.",
        en: "Languages used actively for systems programming, data structures, and production applications."
      },
      items: [
        { name: "Go (Golang)", context: { tr: "Concurrency, Goroutines, Channels, gRPC", en: "Concurrency, Goroutines, Channels, gRPC" }, projectRefId: "task-orchestrator" },
        { name: "TypeScript / JavaScript", context: { tr: "Modern ESNext, Type Safety, Async/Await", en: "Modern ESNext, Type Safety, Async/Await" }, projectRefId: "crdt-canvas" },
        { name: "C / C++", context: { tr: "Bellek yönetimi, Pointer aritmetiği, CS Temelleri", en: "Manual memory, pointers, OS primitives" }, projectRefId: "telemetry-engine" },
        { name: "Python", context: { tr: "Veri yapıları, Scripting, Algoritma prototipleme", en: "Data structures, scripting, algorithmic prototypes" } },
        { name: "SQL", context: { tr: "İlişkisel modelleme, İndeksleme, Sorgu optimizasyonu", en: "Relational modeling, indexing, query optimization" }, projectRefId: "task-orchestrator" },
        { name: "Java", context: { tr: "OOP prensipleri, Design Patterns, Multithreading", en: "OOP paradigms, Design Patterns, Multithreading" } }
      ]
    },
    {
      title: { tr: "Backend & Dağıtık Sistemler", en: "Backend & Distributed Systems" },
      description: {
        tr: "Ölçeklenebilir servis mimarileri, asenkron iletişim ve dayanıklılık kalıpları.",
        en: "Scalable services, asynchronous messaging, and resilience patterns."
      },
      items: [
        { name: "RESTful API & gRPC", context: { tr: "HTTP/2, Protobuf, Kontrat odaklı geliştirme", en: "HTTP/2, Protobuf, Contract-first design" }, projectRefId: "task-orchestrator" },
        { name: "Asenkron Görev Kuyrukları", context: { tr: "Worker havuzları, Idempotency, DLQ", en: "Worker pools, Idempotency, DLQ" }, projectRefId: "task-orchestrator" },
        { name: "Concurrency & Multithreading", context: { tr: "Race conditions, Mutex, Deadlock önleme", en: "Race conditions, Mutexes, Deadlock prevention" }, projectRefId: "task-orchestrator" },
        { name: "Circuit Breaker & Rate Limiting", context: { tr: "Sistem dayanıklılığı, Basamaklı çöküş önleme", en: "Resilience engineering, Cascading failure prevention" }, projectRefId: "cloud-gateway" },
        { name: "Mikroservis Mimarisi", context: { tr: "Servis ayrıştırma, API Gateway, Dağıtık izleme", en: "Service decomposition, API Gateway, Tracing" }, projectRefId: "cloud-gateway" }
      ]
    },
    {
      title: { tr: "Frontend & Web Mimarisi", en: "Frontend & Web Architecture" },
      description: {
        tr: "Tip güvenli, bileşen tabanlı, performans ve erişilebilirlik odaklı web arayüzleri.",
        en: "Type-safe, component-based, high-performance, and accessible web interfaces."
      },
      items: [
        { name: "React (v18/v19)", context: { tr: "Custom hooks, Optimizasyon, Durum yönetimi", en: "Custom hooks, Profiling, State management" }, projectRefId: "crdt-canvas" },
        { name: "CRDT / Gerçek Zamanlı Eşleme", context: { tr: "Yjs, State-based CRDTs, Vektör saatleri", en: "Yjs, State-based CRDTs, Vector clocks" }, projectRefId: "crdt-canvas" },
        { name: "HTML5 Canvas & SVG", context: { tr: "2D Vektörel grafikler, Yüksek FPS render", en: "2D Vector graphics, High FPS rendering" }, projectRefId: "crdt-canvas" },
        { name: "Tailwind CSS & Tasarım Sistemleri", context: { tr: "Tasarım tokenları, Responsive düzen, WCAG AA", en: "Design tokens, Responsive layout, WCAG AA" } },
        { name: "WebSockets & Event-Driven UI", context: { tr: "Düşük gecikmeli ikili veri akışları", en: "Low-latency binary streaming protocols" }, projectRefId: "crdt-canvas" }
      ]
    },
    {
      title: { tr: "Veritabanları & Depolama", en: "Databases & Storage" },
      description: {
        tr: "Veri modelleme, indeks stratejileri ve depolama motoru dinamikleri.",
        en: "Data modeling, indexing strategies, and storage engine fundamentals."
      },
      items: [
        { name: "PostgreSQL", context: { tr: "İlişkisel şema, B-Tree indeksler, ACID işlemleri", en: "Relational schema, B-Tree indexes, ACID transactions" }, projectRefId: "task-orchestrator" },
        { name: "Redis", context: { tr: "Önbellek, Streams, Consumer Groups, Distributed Locks", en: "Caching, Streams, Consumer Groups, Distributed Locks" }, projectRefId: "task-orchestrator" },
        { name: "Columnar Storage Prensipleri", context: { tr: "LSM-Tree, MemTable, Veri sıkıştırma algoritmaları", en: "LSM-Tree, MemTable, Data compression" }, projectRefId: "telemetry-engine" }
      ]
    },
    {
      title: { tr: "DevOps, Bulut & Mühendislik Araçları", en: "DevOps, Cloud & Engineering Tools" },
      description: {
        tr: "Konteynerizasyon, sürekli entegrasyon ve gözlemlenebilirlik altyapısı.",
        en: "Containerization, continuous integration, and observability primitives."
      },
      items: [
        { name: "Docker & Docker Compose", context: { tr: "Çok katmanlı buildler, İzolasyon, Ağ yönetimi", en: "Multi-stage builds, Isolation, Network design" }, projectRefId: "cloud-gateway" },
        { name: "Git & GitHub Actions", context: { tr: "CI/CD hatları, Kod kalitesi otomasyonu, PR kültürü", en: "CI/CD pipelines, Automated testing, Code review" } },
        { name: "Linux & Shell Scripting", context: { tr: "Süreç yönetimi, I/O yeniden yönlendirme, Bash", en: "Process management, I/O redirection, Bash" } },
        { name: "OpenTelemetry / Prometheus", context: { tr: "Metrik toplama, Dağıtık trace izleme, Loglar", en: "Metrics scraping, Distributed tracing, Logging" }, projectRefId: "telemetry-engine" }
      ]
    },
    {
      title: { tr: "Bilgisayar Mühendisliği Temelleri", en: "Computer Science Fundamentals" },
      description: {
        tr: "Akademik eğitim boyunca derinlemesine özümsenen çekirdek CS disiplinleri.",
        en: "Core CS disciplines mastered throughout rigorous undergraduate coursework."
      },
      items: [
        { name: "Veri Yapıları & Algoritmalar", context: { tr: "Ağaçlar, Graflar, Hash tabloları, Karmaşıklık analizi (Big-O)", en: "Trees, Graphs, Hash tables, Asymptotic Big-O analysis" } },
        { name: "İşletim Sistemleri Prensipleri", context: { tr: "Process vs Thread, Bellek sayfalaması, Sanal bellek, IPC", en: "Process vs Thread, Memory paging, Virtual memory, IPC" } },
        { name: "Bilgisayar Ağları", context: { tr: "TCP/IP el sıkışması, UDP, DNS, TLS şifreleme, HTTP/2 & HTTP/3", en: "TCP/IP handshake, UDP, DNS, TLS, HTTP/2 & HTTP/3" } },
        { name: "Yazılım Tasarım Kalıpları", context: { tr: "SOLID prensipleri, Clean Architecture, Dependency Injection", en: "SOLID principles, Clean Architecture, Dependency Injection" } }
      ]
    }
  ] as SkillCategory[],

  experiences: [
    {
      company: "Teknoloji & Yazılım Çözümleri A.Ş.",
      role: {
        tr: "Yazılım Mühendisliği Stajyeri (Backend)",
        en: "Software Engineering Intern (Backend)"
      },
      period: "Temmuz 2025 – Eylül 2025",
      type: { tr: "Zorunlu Mühendislik Stajı", en: "Engineering Internship" },
      location: "İstanbul, Türkiye",
      responsibilities: [
        {
          tr: "Mevcut monolitik e-fatura modülünün asenkron arka plan kuyruğuna taşınmasında görev alındı; Go ve Redis tabanlı worker servisi geliştirildi.",
          en: "Assisted in migrating synchronous invoicing handlers into an asynchronous Go/Redis background worker pipeline."
        },
        {
          tr: "PostgreSQL üzerindeki yavaş sorgular analiz edilerek eksik B-Tree indeksleri eklendi ve p95 sorgu süresinde belirgin iyileşme sağlandı.",
          en: "Profiled slow PostgreSQL queries using EXPLAIN ANALYZE, creating targeted B-Tree indexes that significantly reduced p95 query times."
        },
        {
          tr: "Ekip içinde birim ve entegrasyon test kapsamını artırmak amacıyla mock servisler ve CI üzerinde çalışan Docker Compose test senaryoları hazırlandı.",
          en: "Authored unit and integration test fixtures using Docker Compose inside the team's CI test suite."
        }
      ],
      technologies: ["Go", "PostgreSQL", "Redis", "Docker", "Git", "Jira"],
      keyLearning: {
        tr: "Gerçek üretim ortamında hata toleransının (graceful degradation) ve iyi yazılmış testlerin kod yazmaktan bile daha kritik olduğunu deneyimledim.",
        en: "Learned firsthand that graceful error handling and comprehensive integration testing are far more critical than clever code."
      }
    },
    {
      company: "Üniversite Bilgisayar Mühendisliği Bölümü",
      role: {
        tr: "Bitirme Projesi & Araştırma Geliştiricisi",
        en: "Capstone Engineering & Research Developer"
      },
      period: "Ekim 2025 – Günümüz",
      type: { tr: "Akademik / Ar-Ge", en: "Academic / R&D" },
      location: "Ankara / İstanbul",
      responsibilities: [
        {
          tr: "Dağıtık sistemlerde ağ gecikmesi ve bölünmesi (partition) anında veri tutarlılığı modelleri üzerine araştırma ve prototipleme yürütülüyor.",
          en: "Conducting applied research and prototyping on consistency models and partition resilience in distributed systems."
        },
        {
          tr: "CRDT algoritmalarının web tarayıcıları üzerindeki bellek ayak izi ve senkronizasyon verimliliği ölçümleniyor.",
          en: "Benchmarking CRDT state-vector memory footprints and synchronization performance under variable network conditions."
        }
      ],
      technologies: ["TypeScript", "Go", "Distributed Algorithms", "Benchmarking"],
      keyLearning: {
        tr: "Teorik bilgisayar bilimi kavramlarının (Lamport zamanı, CAP teoremi, vektör saatleri) somut yazılım mimarisine nasıl dönüştürüldüğünü içselleştirdim.",
        en: "Solidified the bridge between theoretical CS foundations (Lamport clocks, CAP theorem, consensus) and concrete production code."
      }
    }
  ] as ExperienceItem[],

  education: [
    {
      institution: "Üniversite Bilgisayar Mühendisliği",
      degree: {
        tr: "Lisans Derecesi (B.Sc.) — Bilgisayar Mühendisliği",
        en: "Bachelor of Science (B.Sc.) in Computer Engineering"
      },
      period: "2022 – 2026",
      status: {
        tr: "4. Sınıf Son Dönem (Beklenen Mezuniyet: Haziran 2026)",
        en: "Senior Year (Expected Graduation: June 2026)"
      },
      description: {
        tr: "Temel yazılım prensipleri, donanım mimarisi, işletim sistemleri, biçimsel diller, veri tabanı sistemleri ve algoritma analizi üzerine 4 yıllık kapsamlı mühendislik eğitimi.",
        en: "Rigorous 4-year curriculum covering algorithms, operating systems, database management, computer networks, and software engineering methodologies."
      },
      coreCoursework: [
        "Veri Yapıları & Algoritmalar (Data Structures & Algorithms)",
        "İşletim Sistemleri (Operating Systems)",
        "Dağıtık Sistemler (Distributed Systems)",
        "Bilgisayar Ağları (Computer Networks)",
        "Veritabanı Yönetim Sistemleri (Database Management Systems)",
        "Yazılım Mühendisliği & Tasarım Desenleri (Software Engineering & Design Patterns)",
        "Sistem Programlama (Systems Programming)",
        "Biçimsel Diller & Otomata (Theory of Computation)"
      ],
      focusAreas: [
        { tr: "Dağıtık Sistemler & Concurrency", en: "Distributed Systems & Concurrency" },
        { tr: "Yüksek Başarımlı Backend", en: "High-Throughput Backend" },
        { tr: "Modern Web Mimarisi", en: "Modern Web Architecture" }
      ]
    }
  ] as EducationItem[],

  checklistForRecruiter: {
    tr: [
      "Tüm projeler kendi kaynak kodlarına (GitHub) doğrudan bağlantılıdır.",
      "Sahte kullanıcı sayısı, abartılı metrik veya gerçek dışı unvan kullanılmamıştır.",
      "Teknik kararlar 'Neden X yerine Y seçildi?' gerekçeleriyle şeffaf şekilde açıklanmıştır.",
      "Tam zamanlı Yazılım Mühendisi veya Aday Mühendis pozisyonları için görüşmeye hazırdır."
    ],
    en: [
      "All projects link directly to actual verified GitHub repositories.",
      "Zero fabricated metrics, fake user counts, or inflated seniority labels.",
      "Architectural trade-offs ('Why X over Y?') documented with engineering rationale.",
      "Open for Full-Time Software Engineer / Associate Engineer opportunities."
    ]
  }
};
