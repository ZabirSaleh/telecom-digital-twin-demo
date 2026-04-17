import React, { useMemo, useState } from "react";
import {
  MapPin,
  TowerControl,
  Radio,
  Router,
  Cable,
  Network,
  Database,
  Building2,
  ChevronRight,
  Globe,
  Cpu,
  Wifi,
} from "lucide-react";

const Card = ({ className = "", children }) => (
  <div className={`bg-white ${className}`}>{children}</div>
);

const CardHeader = ({ className = "", children }) => (
  <div className={className}>{children}</div>
);

const CardTitle = ({ className = "", children }) => (
  <h3 className={className}>{children}</h3>
);

const CardContent = ({ className = "", children }) => (
  <div className={className}>{children}</div>
);

const Button = ({ className = "", variant, children, ...props }) => {
  const style =
    variant === "outline"
      ? "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
      : "bg-blue-600 text-white hover:bg-blue-700";
  return (
    <button
      className={`${style} px-4 py-2 text-sm font-medium transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ className = "", variant, children }) => {
  const style =
    variant === "secondary"
      ? "bg-slate-100 text-slate-700"
      : "bg-blue-100 text-blue-700";
  return (
    <span className={`inline-flex items-center ${style} ${className}`}>
      {children}
    </span>
  );
};

const sites = [
  {
    id: "SITE-BD-CHD-001",
    name: "Chandpur Tower Site",
    division: "Chattogram",
    district: "Chandpur",
    type: "Metro Macro",
    status: "Active",
    lat: 23.2333,
    lon: 90.671,
    towerHeight: "55 m",
    backhaul: "Microwave + FTTx",
    vendor: "Huawei + FiberHome",
    technologies: ["2G", "3G", "4G", "5G-ready"],
    inventory: [
      { name: "BBU", qty: 2, vendor: "Huawei", type: "Active" },
      { name: "RRU", qty: 6, vendor: "Huawei", type: "Active" },
      { name: "Antenna", qty: 3, vendor: "Huawei", type: "Passive" },
      { name: "Microwave IDU/ODU", qty: 2, vendor: "NEC", type: "Active" },
      { name: "Fiber Cable", qty: 1, vendor: "FiberHome", type: "Passive" },
      { name: "Power Rectifier", qty: 1, vendor: "Delta", type: "Active" },
    ],
  },
  {
    id: "SITE-BD-CTG-002",
    name: "Chattogram Hub Site",
    division: "Chattogram",
    district: "Chattogram",
    type: "Regional Hub",
    status: "Active",
    lat: 22.3569,
    lon: 91.7832,
    towerHeight: "70 m",
    backhaul: "FTTx Core Ring",
    vendor: "Ericsson + Nokia",
    technologies: ["3G", "4G", "5G"],
    inventory: [
      { name: "BBU", qty: 4, vendor: "Ericsson", type: "Active" },
      { name: "RRU", qty: 8, vendor: "Ericsson", type: "Active" },
      { name: "Antenna", qty: 6, vendor: "Kathrein", type: "Passive" },
      { name: "OLT", qty: 1, vendor: "Nokia", type: "Active" },
      { name: "ONT/ONU Aggregation", qty: 12, vendor: "Nokia", type: "Active" },
      { name: "Fiber Cable", qty: 1, vendor: "Prysmian", type: "Passive" },
    ],
  },
];

const pageList = [
  "Dashboard",
  "Bangladesh Map",
  "Site Details",
  "Inventory",
  "Architecture",
];

function SiteBadge({ children }) {
  return <Badge className="rounded-full px-3 py-1 text-xs">{children}</Badge>;
}

function StatCard({ title, value, icon: Icon, subtitle }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">{title}</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BangladeshMap({ selectedSiteId, onSelectSite }) {
  const selected = sites.find((s) => s.id === selectedSiteId) || sites[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <Card className="overflow-hidden rounded-3xl shadow-sm">
        <CardHeader className="p-6">
          <CardTitle className="text-xl">Bangladesh Network Map</CardTitle>
          <p className="text-sm text-slate-500">
            Simplified demo map with highlighted RAN sites.
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative h-[420px] w-full bg-gradient-to-br from-sky-50 to-blue-100">
            <svg viewBox="0 0 800 420" className="absolute inset-0 h-full w-full">
              <path
                d="M285 50 C 350 20, 470 30, 540 85 C 590 125, 610 190, 575 250 C 548 298, 515 318, 497 360 C 480 395, 430 405, 390 382 C 345 356, 300 355, 262 322 C 225 289, 210 242, 220 198 C 230 154, 215 108, 255 76 C 265 67, 275 58, 285 50 Z"
                fill="#c7f9cc"
                stroke="#1e3a8a"
                strokeWidth="4"
              />
              <path
                d="M530 295 C 560 310, 575 340, 565 376"
                stroke="#1d4ed8"
                strokeWidth="5"
                fill="none"
                strokeDasharray="8 8"
              />
              <path
                d="M435 135 C 455 165, 470 210, 490 245"
                stroke="#0f766e"
                strokeWidth="6"
                fill="none"
                opacity="0.8"
              />

              <g>
                <circle
                  cx="455"
                  cy="188"
                  r="12"
                  fill={selected.id === "SITE-BD-CHD-001" ? "#dc2626" : "#2563eb"}
                />
                <circle cx="455" cy="188" r="22" fill="rgba(37,99,235,0.15)" />
                <text x="472" y="183" fontSize="18" fontWeight="700" fill="#0f172a">
                  Chandpur
                </text>
                <text x="472" y="205" fontSize="13" fill="#334155">
                  Tower Site
                </text>
              </g>

              <g>
                <circle
                  cx="560"
                  cy="300"
                  r="12"
                  fill={selected.id === "SITE-BD-CTG-002" ? "#dc2626" : "#2563eb"}
                />
                <circle cx="560" cy="300" r="22" fill="rgba(37,99,235,0.15)" />
                <text x="577" y="296" fontSize="18" fontWeight="700" fill="#0f172a">
                  Chattogram
                </text>
                <text x="577" y="318" fontSize="13" fill="#334155">
                  Regional Hub
                </text>
              </g>

              <path d="M460 195 L 555 294" stroke="#475569" strokeWidth="3" strokeDasharray="7 7" />
            </svg>

            <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur">
              <p className="text-sm font-semibold text-slate-900">Demo Links</p>
              <p className="mt-1 text-xs text-slate-600">
                Dashed line shows transport relation between Chandpur and Chattogram.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl shadow-sm">
        <CardHeader className="p-6">
          <CardTitle className="text-xl">Site List</CardTitle>
          <p className="text-sm text-slate-500">Select a site to view details.</p>
        </CardHeader>
        <CardContent className="space-y-4 p-6 pt-0">
          {sites.map((site) => (
            <button
              key={site.id}
              onClick={() => onSelectSite(site.id)}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                selectedSiteId === site.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-slate-900">{site.name}</h4>
                  <p className="text-sm text-slate-500">
                    {site.district}, {site.division}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <SiteBadge>{site.type}</SiteBadge>
                <SiteBadge>{site.backhaul}</SiteBadge>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function SiteDetails({ site }) {
  const info = [
    { label: "Site ID", value: site.id },
    { label: "District", value: site.district },
    { label: "Division", value: site.division },
    { label: "Tower Height", value: site.towerHeight },
    { label: "Longitude", value: site.lon },
    { label: "Latitude", value: site.lat },
    { label: "Backhaul", value: site.backhaul },
    { label: "Vendor", value: site.vendor },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <Card className="rounded-3xl shadow-sm">
        <CardHeader className="p-6">
          <CardTitle className="text-xl">Site Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="grid gap-4 sm:grid-cols-2">
            {info.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl shadow-sm">
        <CardHeader className="p-6">
          <CardTitle className="text-xl">Technology & Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-6 pt-0">
          <div>
            <p className="text-sm text-slate-500">Current Status</p>
            <div className="mt-2 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              {site.status}
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-500">Site Type</p>
            <p className="mt-2 font-semibold text-slate-900">{site.type}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Technology Layers</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {site.technologies.map((tech) => (
                <SiteBadge key={tech}>{tech}</SiteBadge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InventoryPage({ site }) {
  const iconFor = (name) => {
    if (name.includes("BBU")) return Cpu;
    if (name.includes("RRU")) return Radio;
    if (name.includes("Antenna")) return Wifi;
    if (name.includes("Cable") || name.includes("Fiber")) return Cable;
    if (name.includes("OLT") || name.includes("ONT") || name.includes("ONU")) return Router;
    return Database;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {site.inventory.map((item) => {
        const Icon = iconFor(item.name);
        return (
          <Card key={item.name} className="rounded-3xl shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-2xl bg-slate-100 p-3">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                  {item.type}
                </Badge>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.name}</h3>
              <p className="mt-1 text-sm text-slate-500">Vendor: {item.vendor}</p>
              <p className="mt-3 text-2xl font-bold text-slate-900">{item.qty}</p>
              <p className="text-sm text-slate-500">Installed quantity</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function ArchitecturePage({ site }) {
  return (
    <Card className="overflow-hidden rounded-3xl shadow-sm">
      <CardHeader className="p-6">
        <CardTitle className="text-xl">Simplified Site Architecture</CardTitle>
        <p className="text-sm text-slate-500">
          Physical and logical relationship view for {site.name}.
        </p>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="overflow-auto">
          <div className="min-w-[850px] rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="grid gap-6 md:grid-cols-5">
              <div className="rounded-2xl border bg-white p-4 text-center shadow-sm">
                <TowerControl className="mx-auto h-8 w-8" />
                <h4 className="mt-3 font-semibold">Tower</h4>
                <p className="text-sm text-slate-500">{site.towerHeight}</p>
              </div>
              <div className="rounded-2xl border bg-white p-4 text-center shadow-sm">
                <Wifi className="mx-auto h-8 w-8" />
                <h4 className="mt-3 font-semibold">Antennas</h4>
                <p className="text-sm text-slate-500">Sector mounted</p>
              </div>
              <div className="rounded-2xl border bg-white p-4 text-center shadow-sm">
                <Radio className="mx-auto h-8 w-8" />
                <h4 className="mt-3 font-semibold">RRU</h4>
                <p className="text-sm text-slate-500">Radio units</p>
              </div>
              <div className="rounded-2xl border bg-white p-4 text-center shadow-sm">
                <Cpu className="mx-auto h-8 w-8" />
                <h4 className="mt-3 font-semibold">BBU</h4>
                <p className="text-sm text-slate-500">Baseband pool</p>
              </div>
              <div className="rounded-2xl border bg-white p-4 text-center shadow-sm">
                <Network className="mx-auto h-8 w-8" />
                <h4 className="mt-3 font-semibold">Backhaul</h4>
                <p className="text-sm text-slate-500">{site.backhaul}</p>
              </div>
            </div>

            <div className="my-5 flex items-center justify-center gap-2 text-slate-400">
              <div className="h-1 w-24 rounded bg-slate-300" />
              <ChevronRight className="h-5 w-5" />
              <div className="h-1 w-24 rounded bg-slate-300" />
              <ChevronRight className="h-5 w-5" />
              <div className="h-1 w-24 rounded bg-slate-300" />
              <ChevronRight className="h-5 w-5" />
              <div className="h-1 w-24 rounded bg-slate-300" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border bg-white p-5">
                <h4 className="font-semibold text-slate-900">Passive Components</h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• Tower / Mast structure</li>
                  <li>• Antenna mounting accessories</li>
                  <li>• Feeder / fiber / cable path</li>
                  <li>• Shelter / cabinet / grounding</li>
                </ul>
              </div>
              <div className="rounded-2xl border bg-white p-5">
                <h4 className="font-semibold text-slate-900">Active Components</h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• BBU and RRU equipment</li>
                  <li>• Power rectifier</li>
                  <li>• Microwave IDU / ODU or OLT uplink</li>
                  <li>• Transmission aggregation node</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [selectedSiteId, setSelectedSiteId] = useState("SITE-BD-CHD-001");
  const selectedSite = useMemo(
    () => sites.find((s) => s.id === selectedSiteId) || sites[0],
    [selectedSiteId]
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white p-6 lg:flex">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-600 p-3 text-white">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold">BD RAN Twin</h1>
              <p className="text-sm text-slate-500">Simple React Demo</p>
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {pageList.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {page}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold">Selected Site</p>
            <p className="mt-2 text-base font-bold">{selectedSite.name}</p>
            <p className="text-sm text-slate-500">{selectedSite.district}, Bangladesh</p>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">
                Nationwide Telecom Digital Twin
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Demo pages for Bangladesh map, site details, inventory, and architecture view.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => setSelectedSiteId("SITE-BD-CHD-001")}
              >
                Load Chandpur
              </Button>
              <Button
                className="rounded-2xl"
                onClick={() => setSelectedSiteId("SITE-BD-CTG-002")}
              >
                Load Chattogram
              </Button>
            </div>
          </div>

          {currentPage === "Dashboard" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  title="Total Sites"
                  value="2"
                  subtitle="Demo nationwide nodes"
                  icon={Building2}
                />
                <StatCard
                  title="Active Technologies"
                  value="4"
                  subtitle="2G / 3G / 4G / 5G-ready"
                  icon={Radio}
                />
                <StatCard
                  title="Transport Types"
                  value="2"
                  subtitle="Microwave and FTTx"
                  icon={Network}
                />
                <StatCard
                  title="Mapped Districts"
                  value="2"
                  subtitle="Chandpur and Chattogram"
                  icon={MapPin}
                />
              </div>
              <BangladeshMap
                selectedSiteId={selectedSiteId}
                onSelectSite={setSelectedSiteId}
              />
            </div>
          )}

          {currentPage === "Bangladesh Map" && (
            <BangladeshMap
              selectedSiteId={selectedSiteId}
              onSelectSite={setSelectedSiteId}
            />
          )}
          {currentPage === "Site Details" && <SiteDetails site={selectedSite} />}
          {currentPage === "Inventory" && <InventoryPage site={selectedSite} />}
          {currentPage === "Architecture" && <ArchitecturePage site={selectedSite} />}
        </main>
      </div>
    </div>
  );
}