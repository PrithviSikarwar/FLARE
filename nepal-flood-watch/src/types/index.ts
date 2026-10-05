export type Language = 'en' | 'np';

export type RiskLevel = 'low' | 'moderate' | 'high' | 'severe';

export type StationStatus = 'normal' | 'alert' | 'danger';

export interface LocalizedText {
  en: string;
  np: string;
}

export interface RiverBasin {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  majorRivers: string[];
  riskLevel: RiskLevel;
  catchmentAreaKm2: number;
  currentDischargeM3s: number;
  dangerDischargeM3s: number;
  rainfall24hMm: number;
  trend: 'rising' | 'steady' | 'falling';
  color: string;
  center: [number, number];
  zoom: number;
}

export interface GaugeStation {
  id: string;
  name: LocalizedText;
  river: LocalizedText;
  basinId: string;
  district: LocalizedText;
  coordinates: [number, number];
  currentLevelM: number;
  warningLevelM: number;
  dangerLevelM: number;
  highestRecordedM: number;
  trend: 'rising' | 'falling' | 'steady';
  rateCmPerHour: number;
  status: StationStatus;
  updatedAt: string;
  last24hLevels: number[];
}

export interface DistrictRisk {
  id: string;
  name: LocalizedText;
  basinId: string;
  riskLevel: RiskLevel;
  floodProbability: number; // 0 - 100
  populationAtRisk: number;
  inundationAreaKm2: number;
  coordinates: [number, number];
  boundary: [number, number][];
  keyHazards: LocalizedText;
  shelterCount: number;
  leadTimeHours: number;
}

export interface GLOFLake {
  id: string;
  name: LocalizedText;
  valley: LocalizedText;
  district: LocalizedText;
  elevationM: number;
  coordinates: [number, number];
  riskLevel: 'critical' | 'high' | 'moderate';
  surfaceAreaSqKm: number;
  estimatedVolumeM3Million: number;
  expansionRate: LocalizedText;
  downstreamPopulation: number;
  mitigationStatus: LocalizedText;
  surroundingSlopeDeg?: number;
  hangingGlacierPresent?: boolean;
}

export interface Alert {
  id: string;
  title: LocalizedText;
  message: LocalizedText;
  basinId: string;
  districts: string[];
  severity: 'red' | 'orange' | 'yellow' | 'green';
  issuedAt: string;
  expiresAt: string;
  action: LocalizedText;
  source: string;
}

export interface RainfallForecastItem {
  time: string;
  koshi: number;
  gandaki: number;
  karnali: number;
  mahakali: number;
  bagmati: number;
}

export interface DischargePoint {
  time: string;
  observed: number | null;
  predicted: number | null;
  warning: number;
  danger: number;
}

export interface HistoricalFlood {
  id: string;
  year: number;
  month: string;
  title: LocalizedText;
  riverBasin: LocalizedText;
  basinId: string;
  primaryRiver: string;
  rainfall24hMm: number;
  upstreamSurgeRateCmHr: number;
  soilSaturationPct: number;
  glofTrigger: boolean;
  slopeAngleDeg?: number; // Mountain slope gradient in degrees if glacier/debris slip
  iceVolumeM3Million?: number; // Volume of sliding ice/debris mass
  peakDischargeM3s: number;
  floodType: 'Riverine Inundation' | 'Flash Flood' | 'Cloudburst Deluge' | 'GLOF / Moraine Dam Failure' | 'Embankment Breach' | 'Landslide Dam Outburst Flood';
  impact: {
    fatalities: number;
    displaced: number;
    damageUsdMillions: number;
    affectedDistricts: string[];
  };
  waterLevelAboveDangerM: number;
  leadTimeHours: number;
  summary: LocalizedText;
  cause: LocalizedText;
  lessonsLearned: LocalizedText;
}

export interface GlacierSlipDisaster {
  id: string;
  year: number;
  date: string;
  title: LocalizedText;
  location: LocalizedText;
  peakName: string;
  riverBasin: LocalizedText;
  slopeAngleDeg: number; // Mountain slope gradient (e.g., 38°, 45°, 50°)
  dropHeightM: number; // Vertical fall from detachment crown to impact zone (meters)
  hangingIceVolumeM3Million: number; // Ice/rock volume in millions of m³
  triggerMechanism: 'Permafrost Thaw & Basal Melt' | 'Seismic Trigger' | 'Intense Summer Rainfall' | 'Thermal Ice Creep & Cleavage' | 'Rock-Ice Avalanche';
  impulseWaveM?: number; // Tsunami displacement wave height generated in lake (meters)
  peakSurgeDischargeM3s: number; // Downstream peak discharge
  fatalities: number;
  displaced: number;
  infrastructureDamage: LocalizedText;
  summary: LocalizedText;
  geotechnicalAnalysis: LocalizedText;
}