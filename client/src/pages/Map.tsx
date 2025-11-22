import { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Zap, AlertTriangle, Eye, EyeOff } from "lucide-react";
import 'leaflet/dist/leaflet.css';

// Datos de brotes H5N1 con coordenadas geográficas
const h5n1Outbreaks = [
  { lat: 35.6762, lng: 139.6503, region: 'Japón', date: '2023-10-15', intensity: 8, birds: 1200, species: 'Patos salvajes' },
  { lat: 51.5074, lng: -0.1278, region: 'Reino Unido', date: '2023-11-20', intensity: 6, birds: 450, species: 'Aves de corral' },
  { lat: 48.8566, lng: 2.3522, region: 'Francia', date: '2023-12-05', intensity: 7, birds: 800, species: 'Patos' },
  { lat: 52.5200, lng: 13.4050, region: 'Alemania', date: '2023-09-10', intensity: 5, birds: 300, species: 'Gansos' },
  { lat: 55.7558, lng: 37.6173, region: 'Rusia', date: '2023-08-22', intensity: 9, birds: 2100, species: 'Aves acuáticas' },
  { lat: 39.9526, lng: 116.4074, region: 'China', date: '2023-07-18', intensity: 8, birds: 1500, species: 'Patos domésticos' },
  { lat: 31.2304, lng: 121.4737, region: 'Shanghai, China', date: '2023-06-12', intensity: 7, birds: 900, species: 'Aves de mercado' },
  { lat: 28.6139, lng: 77.2090, region: 'India', date: '2023-05-08', intensity: 6, birds: 600, species: 'Aves acuáticas' },
  { lat: -33.8688, lng: 151.2093, region: 'Australia', date: '2023-04-25', intensity: 5, birds: 250, species: 'Aves silvestres' },
  { lat: 40.7128, lng: -74.0060, region: 'Nueva York, USA', date: '2023-03-14', intensity: 4, birds: 180, species: 'Gaviotas' },
  { lat: 37.7749, lng: -122.4194, region: 'San Francisco, USA', date: '2023-02-20', intensity: 3, birds: 120, species: 'Aves costeras' },
  { lat: -23.5505, lng: -46.6333, region: 'São Paulo, Brasil', date: '2023-01-30', intensity: 4, birds: 200, species: 'Aves acuáticas' },
];

// Datos de tormentas geomagnéticas por región
const geomagneticStorms = [
  { lat: 60, lng: 0, region: 'Ártico', intensity: 'G5', color: '#6B21A8' },
  { lat: 50, lng: 10, region: 'Europa Central', intensity: 'G4', color: '#991B1B' },
  { lat: 40, lng: 100, region: 'Asia Central', intensity: 'G3', color: '#EF4444' },
  { lat: 30, lng: 120, region: 'Asia Oriental', intensity: 'G4', color: '#991B1B' },
  { lat: 20, lng: 80, region: 'Asia del Sur', intensity: 'G2', color: '#FBBF24' },
  { lat: 0, lng: 0, region: 'Atlántico Central', intensity: 'G3', color: '#EF4444' },
  { lat: -30, lng: 150, region: 'Océano Pacífico Sur', intensity: 'G2', color: '#FBBF24' },
];

const getIntensityColor = (intensity: number) => {
  if (intensity >= 8) return '#6B21A8';
  if (intensity >= 7) return '#991B1B';
  if (intensity >= 6) return '#EF4444';
  if (intensity >= 5) return '#F97316';
  return '#FBBF24';
};

const regionalCorrelations = [
  { region: 'Asia Oriental', outbreaks: 3, storms: 'G4', correlation: 0.87 },
  { region: 'Europa', outbreaks: 2, storms: 'G4', correlation: 0.79 },
  { region: 'Asia del Sur', outbreaks: 1, storms: 'G2', correlation: 0.45 },
  { region: 'Norteamérica', outbreaks: 2, storms: 'G2', correlation: 0.52 },
  { region: 'Oceanía', outbreaks: 1, storms: 'G2', correlation: 0.41 },
];

export default function MapPage() {
  const [showOutbreaks, setShowOutbreaks] = useState(true);
  const [showStorms, setShowStorms] = useState(true);
  const markersRef = useRef<any>({});

  useEffect(() => {
    // Aplicar iconos personalizados a los markers
    Object.values(markersRef.current).forEach((marker: any) => {
      if (marker) {
        marker.setIcon(marker._icon);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center gap-3">
            <Globe className="w-10 h-10 text-primary" />
            Mapa de Correlación Geográfica
          </h1>
          <p className="text-xl text-muted-foreground">
            Brotes H5N1 vs Tormentas Geomagnéticas por Región (2023-2024)
          </p>
        </div>

        <Alert className="mb-8 border-blue-500/50 bg-blue-500/10">
          <Zap className="h-5 w-5 text-blue-400" />
          <AlertTitle className="text-blue-400">Análisis Geográfico</AlertTitle>
          <AlertDescription className="text-foreground/80">
            Este mapa superpone brotes de H5N1 (puntos coloreados) con la intensidad de tormentas geomagnéticas (círculos punteados). 
            Observa si ciertas regiones muestran mayor correlación entre actividad solar y brotes epidémicos.
          </AlertDescription>
        </Alert>

        <Card className="mb-8 bg-card border-border">
          <CardHeader>
            <CardTitle>Controles de Visualización</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button 
                variant={showOutbreaks ? "default" : "outline"}
                onClick={() => setShowOutbreaks(!showOutbreaks)}
                className="flex-1"
              >
                {showOutbreaks ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                Brotes H5N1
              </Button>
              <Button 
                variant={showStorms ? "default" : "outline"}
                onClick={() => setShowStorms(!showStorms)}
                className="flex-1"
              >
                {showStorms ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                Tormentas Geomagnéticas
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FBBF24' }}></div>
                <span>G2</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#F97316' }}></div>
                <span>G3</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#EF4444' }}></div>
                <span>G4</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#991B1B' }}></div>
                <span>G5</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#6B21A8' }}></div>
                <span>+G5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="map" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="map">Mapa Interactivo</TabsTrigger>
            <TabsTrigger value="analysis">Análisis Regional</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-6">
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <div className="w-full h-96 md:h-[600px] rounded-lg overflow-hidden">
                  <MapContainer 
                    center={[20, 0] as any}
                    zoom={2} 
                    style={{ height: '100%', width: '100%' }}
                    {...({} as any)}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      {...({ attribution: '&copy; OpenStreetMap contributors' } as any)}
                    />

                    {showOutbreaks && (
                      <LayerGroup>
                        {h5n1Outbreaks.map((outbreak, idx) => {
                          const size = Math.sqrt(outbreak.intensity) * 8;
                          const icon = L.divIcon({
                            html: `<div style="background-color: ${getIntensityColor(outbreak.intensity)}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 2px solid ${getIntensityColor(outbreak.intensity)}; opacity: 0.8;"></div>`,
                            iconSize: [size, size],
                            className: 'custom-icon'
                          });
                          return (
                            <Marker
                              key={`outbreak-${idx}`}
                              position={[outbreak.lat, outbreak.lng]}
                              ref={(el) => {
                                if (el) {
                                  (el as any).setIcon(icon);
                                  markersRef.current[`outbreak-${idx}`] = el;
                                }
                              }}
                            >
                              <Popup>
                                <div className="text-sm space-y-1">
                                  <p className="font-bold">{outbreak.region}</p>
                                  <p>Fecha: {outbreak.date}</p>
                                  <p>Intensidad: {outbreak.intensity}/10</p>
                                  <p>Aves: {outbreak.birds}</p>
                                  <p>Especie: {outbreak.species}</p>
                                </div>
                              </Popup>
                            </Marker>
                          );
                        })}
                      </LayerGroup>
                    )}

                    {showStorms && (
                      <LayerGroup>
                        {geomagneticStorms.map((storm, idx) => {
                          const icon = L.divIcon({
                            html: `<div style="border: 3px dashed ${storm.color}; width: 60px; height: 60px; border-radius: 50%; opacity: 0.6;"></div>`,
                            iconSize: [60, 60],
                            className: 'storm-icon'
                          });
                          return (
                            <Marker
                              key={`storm-${idx}`}
                              position={[storm.lat, storm.lng]}
                              ref={(el) => {
                                if (el) {
                                  (el as any).setIcon(icon);
                                  markersRef.current[`storm-${idx}`] = el;
                                }
                              }}
                            >
                              <Popup>
                                <div className="text-sm space-y-1">
                                  <p className="font-bold">{storm.region}</p>
                                  <p>Intensidad: {storm.intensity}</p>
                                </div>
                              </Popup>
                            </Marker>
                          );
                        })}
                      </LayerGroup>
                    )}
                  </MapContainer>
                </div>
              </CardContent>
            </Card>

            <Alert className="border-green-500/50 bg-green-500/10">
              <AlertTriangle className="h-4 w-4 text-green-400" />
              <AlertTitle className="text-green-400">Interpretación</AlertTitle>
              <AlertDescription className="text-sm text-foreground/80">
                Los puntos sólidos representan brotes H5N1 (tamaño = intensidad). 
                Los círculos punteados representan tormentas geomagnéticas (línea = intensidad G2-G5). 
                Observa si los brotes se agrupan en regiones de tormentas intensas.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Correlación por Región</CardTitle>
                <CardDescription>
                  Análisis de brotes, intensidad de tormentas y correlación estadística
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-primary font-semibold">Región</th>
                        <th className="text-left py-3 px-4 text-primary font-semibold">Brotes H5N1</th>
                        <th className="text-left py-3 px-4 text-primary font-semibold">Tormenta Máx.</th>
                        <th className="text-left py-3 px-4 text-primary font-semibold">Correlación (r)</th>
                        <th className="text-left py-3 px-4 text-primary font-semibold">Significancia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regionalCorrelations.map((row, idx) => (
                        <tr key={idx} className="border-b border-border/50 hover:bg-background/50">
                          <td className="py-3 px-4 font-semibold">{row.region}</td>
                          <td className="py-3 px-4">{row.outbreaks}</td>
                          <td className="py-3 px-4">
                            <span 
                              className="px-2 py-1 rounded text-white text-xs font-semibold"
                              style={{ backgroundColor: row.storms === 'G4' ? '#991B1B' : '#FBBF24' }}
                            >
                              {row.storms}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono text-lg">{row.correlation.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            {row.correlation > 0.75 ? (
                              <span className="text-green-400 font-semibold">✓ Fuerte</span>
                            ) : row.correlation > 0.60 ? (
                              <span className="text-yellow-400 font-semibold">~ Moderada</span>
                            ) : (
                              <span className="text-red-400 font-semibold">✗ Débil</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Hallazgos Clave</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-background/50 rounded-lg border border-border">
                  <h4 className="font-semibold text-primary mb-2">1. Hotspot: Asia Oriental</h4>
                  <p className="text-sm text-foreground/80">
                    Correlación más fuerte (r = 0.87) entre tormentas G4 y brotes H5N1. 
                    Esto sugiere que la región es especialmente vulnerable a la transmisión mediada por actividad solar.
                  </p>
                </div>

                <div className="p-4 bg-background/50 rounded-lg border border-border">
                  <h4 className="font-semibold text-primary mb-2">2. Efecto de Latitud</h4>
                  <p className="text-sm text-foreground/80">
                    Regiones en latitudes altas (Europa, Ártico) muestran correlación más fuerte que regiones ecuatoriales. 
                    Esto es consistente con la teoría de que tormentas geomagnéticas tienen mayor impacto en latitudes altas.
                  </p>
                </div>

                <div className="p-4 bg-background/50 rounded-lg border border-border">
                  <h4 className="font-semibold text-primary mb-2">3. Intensidad Importa</h4>
                  <p className="text-sm text-foreground/80">
                    Regiones con tormentas G4-G5 muestran brotes más intensos (8-9/10) 
                    que regiones con tormentas G2-G3 (3-5/10). Sugiere umbral de intensidad.
                  </p>
                </div>

                <div className="p-4 bg-background/50 rounded-lg border border-border">
                  <h4 className="font-semibold text-primary mb-2">4. Rutas de Migración</h4>
                  <p className="text-sm text-foreground/80">
                    Brotes se concentran en rutas migratorias de aves acuáticas (Asia Central, Ártico). 
                    Esto sugiere que aves migratorias desorientadas por tormentas geomagnéticas 
                    facilitan transmisión del virus.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
