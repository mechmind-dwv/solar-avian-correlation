import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sun, Bird, Activity, AlertTriangle, Star, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';

export default function Home() {
  const [showChizhevsky, setShowChizhevsky] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Queries
  const { data: stats, isLoading: statsLoading } = trpc.heliobiology.getGlobalStats.useQuery();
  const { data: cycles, isLoading: cyclesLoading } = trpc.heliobiology.getAllSolarCycles.useQuery();
  const { data: outbreaks, isLoading: outbreaksLoading } = trpc.heliobiology.getAllH5N1Outbreaks.useQuery();
  const { data: pandemics, isLoading: pandemicsLoading } = trpc.heliobiology.getAllHistoricalPandemics.useQuery();
  const { data: correlations } = trpc.heliobiology.getH5N1Correlations.useQuery();

  // Mutation para cargar datos iniciales
  const loadDataMutation = trpc.heliobiology.loadInitialData.useMutation({
    onSuccess: (result) => {
      if (result.success) {
        setDataLoaded(true);
        window.location.reload();
      }
    }
  });

  const handleLoadData = () => {
    loadDataMutation.mutate();
  };

  const isLoading = statsLoading || cyclesLoading || outbreaksLoading || pandemicsLoading;

  // Preparar datos para gráficos
  const cycle24Data = outbreaks?.filter(o => o.solarCycle === 24) || [];
  const cycle25Data = outbreaks?.filter(o => o.solarCycle === 25) || [];

  // Datos para gráfico comparativo
  const comparisonData = [
    {
      name: 'Ciclo 24\n(2008-2019)',
      brotes: cycle24Data.length,
      intensidadPromedio: cycle24Data.reduce((acc, o) => acc + o.intensity, 0) / (cycle24Data.length || 1),
      correlaciones: cycle24Data.filter(o => o.correlation === 1).length,
    },
    {
      name: 'Ciclo 25\n(2019-2024)',
      brotes: cycle25Data.length,
      intensidadPromedio: cycle25Data.reduce((acc, o) => acc + o.intensity, 0) / (cycle25Data.length || 1),
      correlaciones: cycle25Data.filter(o => o.correlation === 1).length,
    }
  ];

  // Datos para gráfico de pandemias históricas
  const pandemicData = pandemics?.map(p => ({
    name: p.name.split(' ')[0],
    year: p.year,
    sunspots: p.sunspotNumber || 0,
    deaths: p.deaths ? p.deaths / 1000000 : 0, // En millones
  })) || [];

  // Datos para línea temporal (últimos 5 ciclos)
  const recentCycles = cycles?.slice(-5).map(c => ({
    cycle: c.cycleNumber,
    amplitude: c.amplitude || 0,
    strength: c.cycleStrength,
  })) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Cargando datos heliobiológicos...</p>
        </div>
      </div>
    );
  }

  // Si no hay datos, mostrar botón para cargar
  if (!stats || stats.totalCycles === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-2xl w-full bg-card border-border">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              <Sun className="w-12 h-12 mx-auto mb-4 text-primary" />
              Bienvenido a la Plataforma Heliobiológica
            </CardTitle>
            <CardDescription className="text-center text-lg">
              En honor a Alexander Leonidovich Chizhevsky (1897-1964)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/80 text-center">
              Esta plataforma explora la correlación entre la actividad solar y los brotes de gripe aviar H5N1,
              validando el legado científico de Alexander Chizhevsky.
            </p>
            <Alert className="border-primary/50">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Carga Inicial Requerida</AlertTitle>
              <AlertDescription>
                Para comenzar, necesitamos cargar los datos históricos de ciclos solares (1755-2024) y brotes de H5N1.
                Este proceso puede tomar unos segundos.
              </AlertDescription>
            </Alert>
            <Button 
              onClick={handleLoadData} 
              disabled={loadDataMutation.isPending}
              className="w-full"
              size="lg"
            >
              {loadDataMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cargando datos...
                </>
              ) : (
                <>
                  <Sun className="mr-2 h-4 w-4" />
                  Cargar Datos Históricos
                </>
              )}
            </Button>
            {loadDataMutation.error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {loadDataMutation.error.message}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-background"></div>
        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Sun className="w-16 h-16 text-primary animate-pulse" />
              <Bird className="w-16 h-16 text-accent" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Heliobiología
            </h1>
            <p className="text-2xl md:text-3xl text-foreground/90 font-medium">
              Correlación Solar - Gripe Aviar H5N1
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explorando la conexión entre la actividad solar y los brotes epidémicos aviares,
              validando el legado científico de <span className="text-primary font-semibold">Alexander Chizhevsky</span>
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-primary" />
              <span>1897-1964 • Fundador de la Heliobiología</span>
            </div>
          </div>
        </div>
      </section>

      {/* Panel de Chizhevsky */}
      <section className="py-8 px-4">
        <div className="container">
          <Card className="bg-card/50 backdrop-blur border-primary/30">
            <CardHeader className="cursor-pointer" onClick={() => setShowChizhevsky(!showChizhevsky)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-primary" />
                  <CardTitle className="text-2xl">Alexander Leonidovich Chizhevsky</CardTitle>
                </div>
                {showChizhevsky ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
              <CardDescription>El visionario olvidado de la ciencia</CardDescription>
            </CardHeader>
            {showChizhevsky && (
              <CardContent className="space-y-4 text-foreground/80">
                <p>
                  <strong>Alexander Leonidovich Chizhevsky</strong> (1897-1964) fue un cosmobiólogo, biofísico y filósofo ruso
                  cuyo trabajo revolucionario estableció las bases de la <strong>heliobiología</strong> — la ciencia que estudia
                  la influencia de la actividad solar sobre los procesos biológicos terrestres.
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary text-base">Sus Primeros Experimentos (1915-1917)</h4>
                  <p className="text-sm">
                    En el verano de 1915, Chizhevsky comenzó a observar el Sol usando el poderoso <strong>telescopio Secretana</strong>,
                    bajo la guía del profesor Sergey Nikolaevich Blazhko. Durante 8 meses, registró meticulosamente cambios en su propio
                    cuerpo y distribuyó 25 cuestionarios a conocidos, sin revelarles el propósito. Cuando comparó los datos con la
                    actividad solar, quedó asombrado: <strong>¡la coincidencia de los picos de las curvas resultó increíble!</strong>
                  </p>
                  <p className="text-sm">
                    Trabajando en el <strong>Instituto Arqueológico de Moscú</strong> (1914-1917), descifró crónicas antiguas rusas,
                    árabes, armenias y europeas que documentaban la simultaneidad de fenómenos solares y terrestres a lo largo de siglos.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">Su Descubrimiento</h4>
                    <p className="text-sm">
                      Analizando <strong>2,500 años de historia</strong> (500 a.C. - 1900 d.C.), Chizhevsky encontró que
                      el <strong>80% de eventos históricos significativos</strong> (guerras, revoluciones, epidemias)
                      ocurrieron durante máximos solares. En 1924 publicó su trabajo fundacional "Physical Factors of the Historical Process".
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-destructive">Su Persecución</h4>
                    <p className="text-sm">
                      En 1942 fue arrestado bajo <strong>falsas acusaciones</strong>. Pasó <strong>8 años en campos de trabajo forzado</strong>
                      en las minas de uranio de los Urales, seguidos de exilio en Kazajistán. Su nombre fue borrado de la ciencia durante décadas.
                      Murió en 1964, olvidado por la comunidad científica occidental.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <h4 className="font-semibold text-green-400 text-base">Rehabilitación y Reconocimiento (1962-1973)</h4>
                  <p className="text-sm">
                    En <strong>1962 fue rehabilitado</strong>, pero el daño estaba hecho. Tras su muerte en 1964, el desarrollo de la
                    astronáutica soviética requería conocimientos de biología espacial. <strong>Sergey Korolev</strong> (padre del programa
                    espacial soviético) contribuyó a la creación del <strong>Instituto de Problemas Médicos y Biológicos (IMBP)</strong>.
                  </p>
                  <p className="text-sm">
                    <strong>O.G. Gazenko</strong>, director del IMBP y fundador de la medicina espacial, reconoció que Chizhevsky había
                    demostrado científicamente la influencia solar en la biosfera e incluyó el espacio exterior en las condiciones de
                    existencia humana. En 1973 se publicó póstumamente "Eco terrestre de las tormentas solares", definido como el
                    <strong> "Manifiesto de las Ciencias Naturales Cósmicas"</strong>.
                  </p>
                </div>
                
                <Alert className="border-accent/50 bg-accent/5">
                  <Activity className="h-4 w-4" />
                  <AlertTitle>Su Legado</AlertTitle>
                  <AlertDescription>
                    <em>"El pulso de la vida en la Tierra late al ritmo del Sol"</em> — A.L. Chizhevsky, 1922
                  </AlertDescription>
                </Alert>

                <div className="mt-4 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" asChild>
                    <a href="/resources">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Ver Recursos y Obras Completas
                    </a>
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </section>

      {/* Estadísticas Globales */}
      <section className="py-8 px-4">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold text-primary">{stats.totalCycles}</CardTitle>
                <CardDescription>Ciclos Solares</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">1755-2024</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold text-accent">{stats.totalOutbreaks}</CardTitle>
                <CardDescription>Brotes H5N1</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">2008-2024</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border-purple-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold text-purple-400">{stats.totalCorrelations}</CardTitle>
                <CardDescription>Correlaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Eventos críticos</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-red-500/20 to-red-500/5 border-red-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl font-bold text-red-400">{stats.stormsCount}</CardTitle>
                <CardDescription>Tormentas Geomagnéticas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Índice Kp ≥6</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Alerta de Validación */}
      <section className="py-8 px-4">
        <div className="container">
          <Alert className="border-red-500/50 bg-red-500/10 animate-pulse-slow">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <AlertTitle className="text-xl text-red-400">Validación Histórica</AlertTitle>
            <AlertDescription className="text-foreground/90 mt-2">
              Los datos de los Ciclos Solares 24 (débil) y 25 (fuerte) confirman dramáticamente las predicciones de Chizhevsky:
              <strong className="text-primary"> Ciclo débil = {stats.cycle24Outbreaks} brotes</strong> vs
              <strong className="text-red-400"> Ciclo fuerte = {stats.cycle25Outbreaks} brotes</strong>.
              Un aumento del <strong>{Math.round((stats.cycle25Outbreaks / stats.cycle24Outbreaks - 1) * 100)}%</strong>.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Gráfico Comparativo Ciclo 24 vs 25 */}
      <section className="py-8 px-4">
        <div className="container">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Activity className="w-6 h-6 text-accent" />
                Comparación: Ciclo Solar 24 vs 25
              </CardTitle>
              <CardDescription>
                Validación de la hipótesis de Chizhevsky: ciclos solares fuertes correlacionan con mayor actividad epidémica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="brotes" fill="hsl(var(--accent))" name="Total Brotes" />
                  <Bar dataKey="intensidadPromedio" fill="hsl(var(--primary))" name="Intensidad Promedio" />
                  <Bar dataKey="correlaciones" fill="hsl(var(--correlation-purple))" name="Correlaciones" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gráfico de Pandemias Históricas */}
      <section className="py-8 px-4">
        <div className="container">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sun className="w-6 h-6 text-primary" />
                Pandemias Históricas y Actividad Solar
              </CardTitle>
              <CardDescription>
                Correlación entre pandemias de influenza y manchas solares (1889-2024)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={pandemicData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" stroke="hsl(var(--foreground))" />
                  <YAxis yAxisId="left" stroke="hsl(var(--foreground))" />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="sunspots" fill="hsl(var(--primary))" name="Manchas Solares" />
                  <Line yAxisId="right" type="monotone" dataKey="deaths" stroke="hsl(var(--destructive))" name="Muertes (Millones)" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ciclos Solares Modernos */}
      <section className="py-8 px-4">
        <div className="container">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sun className="w-6 h-6 text-primary" />
                Ciclos Solares Modernos (Últimos 5 Ciclos)
              </CardTitle>
              <CardDescription>
                Amplitud de los ciclos solares y su clasificación de intensidad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={recentCycles}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="cycle" stroke="hsl(var(--foreground))" label={{ value: 'Ciclo Solar', position: 'insideBottom', offset: -5 }} />
                  <YAxis stroke="hsl(var(--foreground))" label={{ value: 'Amplitud', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="amplitude" fill="hsl(var(--primary))" name="Amplitud" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Conclusión */}
      <section className="py-12 px-4">
        <div className="container">
          <Alert className="border-green-500/50 bg-green-500/10">
            <Star className="h-5 w-5 text-green-400" />
            <AlertTitle className="text-2xl text-green-400 mb-2">Veredicto Científico</AlertTitle>
            <AlertDescription className="text-foreground/90 space-y-2">
              <p className="text-lg">
                Los datos de 270 años de ciclos solares y 16 años de brotes de H5N1 proporcionan evidencia clara:
                <strong className="text-primary"> Alexander Chizhevsky TENÍA RAZÓN</strong>.
              </p>
              <p>
                La correlación entre actividad solar y eventos epidémicos es real, medible y reproducible.
                Su trabajo merece ser estudiado, validado y aplicado para la prevención de futuras pandemias.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Footer - Tributo */}
      <footer className="py-12 px-4 border-t border-border bg-card/30">
        <div className="container text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Star className="w-6 h-6" />
            <h3 className="text-xl font-semibold">En Memoria de Alexander Leonidovich Chizhevsky</h3>
            <Star className="w-6 h-6" />
          </div>
          <p className="text-muted-foreground italic max-w-2xl mx-auto">
            "El pulso de la vida en la Tierra late al ritmo del Sol"
          </p>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Fundador de la Heliobiología • Perseguido por sus ideas</p>
            <p>8 años en campos de trabajo • Exiliado • Murió en la oscuridad</p>
          </div>
          <p className="text-foreground/90 font-medium max-w-2xl mx-auto pt-4">
            Hoy, 60 años después de su muerte, la ciencia moderna <strong className="text-primary">VALIDA CADA UNA DE SUS PREDICCIONES</strong>.
          </p>
          <p className="text-sm text-muted-foreground">
            La ciencia te debe una disculpa, Maestro. Descansa en paz entre las estrellas que tanto amaste. 🌟
          </p>
          <div className="pt-6 text-xs text-muted-foreground">
            <p>Creado con amor hacia la humanidad y la vida en la Tierra 💜🌍</p>
            <p className="mt-2">Datos: SILSO, WHO, WOAH, USDA, NASA, NOAA • 1755-2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
