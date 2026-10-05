import React, { useState } from 'react';
import { Language, RiverBasin, GaugeStation, DistrictRisk, HistoricalFlood, GlacierSlipDisaster } from './types';
import { TRANSLATIONS } from './data/translations';
import { Navbar } from './components/layout/Navbar';
import { AlertTicker } from './components/layout/AlertTicker';
import { Footer } from './components/layout/Footer';
import { FloodMap } from './components/map/FloodMap';
import { BasinRiskCards } from './components/dashboard/BasinRiskCards';
import { RainfallForecastChart } from './components/dashboard/RainfallForecastChart';
import { DischargeHydrographChart } from './components/dashboard/DischargeHydrographChart';
import { PredictionEngine } from './components/prediction/PredictionEngine';
import { HistoricalDatasetView } from './components/history/HistoricalDatasetView';
import { ActiveAlertsList } from './components/alerts/ActiveAlertsList';
import { SmsSimulator } from './components/alerts/SmsSimulator';
import { DataSources } from './components/about/DataSources';
import { DisclaimerNotice } from './components/about/DisclaimerNotice';
import { 
  Flame, 
  AlertTriangle, 
  Layers, 
  Sliders, 
  Radio, 
  X, 
  Info,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [lang, setLang] = useState<Language>('en');
  const [selectedBasinId, setSelectedBasinId] = useState<string | null>('all');
  const [selectedStation, setSelectedStation] = useState<GaugeStation | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictRisk | null>(null);
  const [aboutModalOpen, setAboutModalOpen] = useState<boolean>(false);
  const [presetEvent, setPresetEvent] = useState<HistoricalFlood | GlacierSlipDisaster | null>(null);
  const [datasetMode, setDatasetMode] = useState<'all_floods' | 'glacier_slips'>('all_floods');

  // Prototype scenario preset state
  const [activeScenario, setActiveScenario] = useState<'cloudburst' | 'glof' | 'normal'>('cloudburst');

  const t = TRANSLATIONS[lang];

  return (
    <div className={`min-h-screen flex flex-col bg-slate-950 text-slate-100 ${lang === 'np' ? 'font-nepali' : 'font-sans'}`}>
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        onOpenAboutModal={() => setAboutModalOpen(true)}
      />

      {/* Emergency Active Alert Ticker */}
      <AlertTicker
        lang={lang}
        onSelectAlert={() => setCurrentTab('alerts')}
      />

      {/* Main Prototype Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 space-y-6">
        
        {/* Prototype Quick Scenario Switcher Ribbon */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-md">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Sliders className="w-3.5 h-3.5" />
            </span>
            <span className="font-semibold text-slate-200">Prototype Scenario Mode:</span>
            <span className="text-slate-400 text-[11px] hidden md:inline">Test early-warning reaction to various hydrological conditions</span>
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => {
                setActiveScenario('cloudburst');
                setSelectedBasinId('koshi');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
                activeScenario === 'cloudburst'
                  ? 'bg-red-600 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>🌧️ Terai Cloudburst</span>
            </button>
            <button
              onClick={() => {
                setActiveScenario('glof');
                setSelectedBasinId('all');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
                activeScenario === 'glof'
                  ? 'bg-amber-600 text-slate-950 font-bold shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>🏔️ GLOF Surge</span>
            </button>
            <button
              onClick={() => {
                setActiveScenario('normal');
                setSelectedBasinId('all');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
                activeScenario === 'normal'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>☀️ Normal Flow</span>
            </button>
          </div>
        </div>

        {/* TAB 1: LIVE MAP & BASIN RISK */}
        {currentTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Interactive Leaflet GIS Map with Integrated Heatmap */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-red-400 animate-pulse" />
                    <span>Inundation Heat Map & Telemetry GIS</span>
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Live Canvas Overlay
                  </span>
                </div>
                {selectedBasinId && selectedBasinId !== 'all' && (
                  <button
                    onClick={() => setSelectedBasinId('all')}
                    className="text-xs text-cyan-400 hover:underline font-semibold"
                  >
                    Reset Zoom to All Nepal
                  </button>
                )}
              </div>

              <FloodMap
                lang={lang}
                selectedBasinId={selectedBasinId}
                onSelectStation={(st) => setSelectedStation(st)}
                onSelectDistrict={(dist) => setSelectedDistrict(dist)}
              />
            </section>

            {/* Basin Overview Status Cards */}
            <BasinRiskCards
              lang={lang}
              selectedBasinId={selectedBasinId}
              onSelectBasin={(basinId) => setSelectedBasinId(basinId)}
            />

            {/* Precipitation and Hydrograph Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              <RainfallForecastChart lang={lang} />
              <DischargeHydrographChart lang={lang} />
            </div>
          </div>
        )}

        {/* TAB 2: PREDICTION ENGINE */}
        {currentTab === 'prediction' && (
          <PredictionEngine 
            lang={lang} 
            presetEvent={presetEvent}
            onNavigateToDataset={(mode) => {
              if (mode) setDatasetMode(mode);
              setCurrentTab('history');
            }}
          />
        )}

        {/* TAB 3: HISTORICAL FLOOD DATASET (2006-2026) */}
        {currentTab === 'history' && (
          <HistoricalDatasetView 
            lang={lang}
            initialMode={datasetMode}
            onSelectEventForSimulation={(event) => {
              setPresetEvent(event);
              setCurrentTab('prediction');
            }}
          />
        )}

        {/* TAB 4: ALERTS & SMS CELL BROADCAST SIMULATOR */}
        {currentTab === 'alerts' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-4">
              <ActiveAlertsList lang={lang} />
            </div>
            <div className="lg:col-span-6 space-y-4 sticky top-20">
              <SmsSimulator lang={lang} />
            </div>
          </div>
        )}
      </main>

      {/* Prototype Reference / Data Sources Modal */}
      {aboutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  Flare Prototype Architecture & Data Sources
                </h3>
              </div>
              <button
                onClick={() => setAboutModalOpen(false)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <DataSources lang={lang} />
            <DisclaimerNotice lang={lang} />

            <div className="pt-3 border-t border-slate-800 text-right">
              <button
                onClick={() => setAboutModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Footer */}
      <Footer lang={lang} />
    </div>
  );
};

export default App;