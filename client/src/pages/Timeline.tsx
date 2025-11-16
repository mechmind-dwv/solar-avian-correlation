import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Clock, Sun, AlertTriangle, Award, BookOpen, Zap, Heart, Star } from "lucide-react";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  category: "personal" | "scientific" | "persecution" | "recognition";
  solarCycle: number;
  solarPhase: string;
  sunspots: number;
  historicalContext: string;
  icon: React.ReactNode;
}

interface SolarData {
  year: number;
  sunspots: number;
  cycle: number;
  chizhevsky?: string;
}

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Datos de la vida de Chizhevsky sincronizados con ciclos solares
  const timelineEvents: TimelineEvent[] = [
    {
      year: 1897,
      title: "Nacimiento de Alexander Leonidovich Chizhevsky",
      description: "Nace en Moscú el 26 de enero. Hijo de una familia noble rusa.",
      category: "personal",
      solarCycle: 12,
      solarPhase: "Ascenso",
      sunspots: 45,
      historicalContext: "Ciclo Solar 12 en fase ascendente. Era de transformación científica.",
      icon: <Heart className="w-6 h-6 text-red-400" />
    },
    {
      year: 1914,
      title: "Comienza trabajo en Instituto Arqueológico de Moscú",
      description: "Chizhevsky inicia su investigación descifrado de crónicas antiguas, buscando patrones en eventos históricos.",
      category: "scientific",
      solarCycle: 13,
      solarPhase: "Máximo",
      sunspots: 146,
      historicalContext: "Máximo solar del Ciclo 13. Inicio de la Primera Guerra Mundial.",
      icon: <BookOpen className="w-6 h-6 text-blue-400" />
    },
    {
      year: 1915,
      title: "Primeros experimentos solares (Telescopio Secretana)",
      description: "En verano, Chizhevsky comienza observaciones del Sol con el telescopio Secretana bajo la guía del profesor Blazhko. Registra cambios en su propio cuerpo durante 8 meses.",
      category: "scientific",
      solarCycle: 13,
      solarPhase: "Máximo",
      sunspots: 101,
      historicalContext: "Descubrimiento crucial: correlación entre manchas solares y cambios fisiológicos.",
      icon: <Sun className="w-6 h-6 text-yellow-400" />
    },
    {
      year: 1916,
      title: "Experimento con 25 cuestionarios",
      description: "Distribuye 25 cuestionarios a conocidos sin revelar el propósito. Sincroniza datos con actividad solar. ¡La coincidencia de picos resultó increíble!",
      category: "scientific",
      solarCycle: 13,
      solarPhase: "Descenso",
      sunspots: 67,
      historicalContext: "Validación estadística de la hipótesis heliobiológica.",
      icon: <Zap className="w-6 h-6 text-purple-400" />
    },
    {
      year: 1917,
      title: "Procesamiento de datos y primeras conclusiones",
      description: "Completa el análisis estadístico de sus experimentos. Descubre períodos semanales, quincenales y cuatrisemanales que coinciden con rotación solar.",
      category: "scientific",
      solarCycle: 13,
      solarPhase: "Descenso",
      sunspots: 32,
      historicalContext: "Revolución Rusa. Chizhevsky documenta que el 80% de eventos históricos ocurren durante máximos solares.",
      icon: <Star className="w-6 h-6 text-green-400" />
    },
    {
      year: 1924,
      title: "Publica 'Physical Factors of the Historical Process'",
      description: "Publicación de su trabajo fundacional estableciendo la correlación entre actividad solar y eventos históricos masivos.",
      category: "scientific",
      solarCycle: 15,
      solarPhase: "Máximo",
      sunspots: 154,
      historicalContext: "Ciclo Solar 15 en máximo. Trabajo revolucionario que funda la heliobiología.",
      icon: <BookOpen className="w-6 h-6 text-blue-500" />
    },
    {
      year: 1930,
      title: "Publica 'Catástrofes epidémicas y actividad solar'",
      description: "Monografía que documenta la correlación entre pandemias de influenza y ciclos solares.",
      category: "scientific",
      solarCycle: 16,
      solarPhase: "Descenso",
      sunspots: 78,
      historicalContext: "Validación de hipótesis sobre epidemias y actividad solar.",
      icon: <AlertTriangle className="w-6 h-6 text-orange-400" />
    },
    {
      year: 1938,
      title: "Publica 'Les Épidémies et les perturbations' en París",
      description: "Editorial Hipócrates publica su obra en francés. Chizhevsky escribe la versión francesa especialmente para esta publicación.",
      category: "scientific",
      solarCycle: 17,
      solarPhase: "Ascenso",
      sunspots: 89,
      historicalContext: "Reconocimiento internacional de su trabajo científico.",
      icon: <BookOpen className="w-6 h-6 text-blue-400" />
    },
    {
      year: 1942,
      title: "Arrestado bajo falsas acusaciones",
      description: "Chizhevsky es arrestado durante la Segunda Guerra Mundial. Acusado falsamente de espionaje y sabotaje. Comienza su calvario de 8 años en campos de trabajo.",
      category: "persecution",
      solarCycle: 18,
      solarPhase: "Máximo",
      sunspots: 185,
      historicalContext: "Ciclo Solar 18 en máximo. Persecución política durante WWII.",
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />
    },
    {
      year: 1943,
      title: "Enviado a minas de uranio en los Urales",
      description: "Trasladado a campos de trabajo forzado en las minas de uranio de los Urales. Condiciones inhumanas. Su nombre es borrado de la ciencia soviética.",
      category: "persecution",
      solarCycle: 18,
      solarPhase: "Descenso",
      sunspots: 142,
      historicalContext: "8 años de exilio y trabajo forzado. Separado de su investigación.",
      icon: <AlertTriangle className="w-6 h-6 text-red-600" />
    },
    {
      year: 1950,
      title: "Liberado de campos de trabajo",
      description: "Tras 8 años, es liberado pero exiliado a Kazajistán. Prohibido trabajar en investigación científica.",
      category: "persecution",
      solarCycle: 18,
      solarPhase: "Descenso",
      sunspots: 34,
      historicalContext: "Fin del Ciclo 18. Liberación pero continuación del exilio.",
      icon: <Heart className="w-6 h-6 text-orange-400" />
    },
    {
      year: 1962,
      title: "Rehabilitación oficial",
      description: "Chizhevsky es rehabilitado oficialmente. Su nombre es restaurado. Pero el daño científico ya está hecho.",
      category: "recognition",
      solarCycle: 20,
      solarPhase: "Máximo",
      sunspots: 156,
      historicalContext: "Ciclo Solar 20 en máximo. Era Espacial. Reconocimiento tardío.",
      icon: <Award className="w-6 h-6 text-green-500" />
    },
    {
      year: 1964,
      title: "Muerte de Alexander Chizhevsky",
      description: "Fallece el 20 de diciembre en Moscú a los 67 años. Muere olvidado por la comunidad científica occidental, pero sus ideas comienzan a ser validadas.",
      category: "personal",
      solarCycle: 20,
      solarPhase: "Descenso",
      sunspots: 96,
      historicalContext: "Fin de una vida dedicada a la verdad científica. Inicio de su reconocimiento póstumo.",
      icon: <Heart className="w-6 h-6 text-gray-400" />
    },
    {
      year: 1973,
      title: "Publicación póstuma: 'Eco terrestre de las tormentas solares'",
      description: "Se publica póstumamente su obra maestra. Definida como el 'Manifiesto de las Ciencias Naturales Cósmicas'. Demanda masiva.",
      category: "recognition",
      solarCycle: 21,
      solarPhase: "Máximo",
      sunspots: 111,
      historicalContext: "Reconocimiento póstumo. La ciencia moderna comienza a validar sus predicciones.",
      icon: <Star className="w-6 h-6 text-yellow-500" />
    }
  ];

  // Datos de ciclos solares para gráfico
  const solarData: SolarData[] = [
    { year: 1897, sunspots: 45, cycle: 12, chizhevsky: "Nacimiento" },
    { year: 1905, sunspots: 78, cycle: 13 },
    { year: 1915, sunspots: 101, cycle: 13, chizhevsky: "Experimentos" },
    { year: 1925, sunspots: 154, cycle: 15, chizhevsky: "Publicación" },
    { year: 1935, sunspots: 89, cycle: 16 },
    { year: 1945, sunspots: 142, cycle: 18, chizhevsky: "Persecución" },
    { year: 1955, sunspots: 34, cycle: 19 },
    { year: 1962, sunspots: 156, cycle: 20, chizhevsky: "Rehabilitación" },
    { year: 1973, sunspots: 111, cycle: 21, chizhevsky: "Publicación Póstuma" }
  ];

  const filteredEvents = filterCategory === "all" 
    ? timelineEvents 
    : timelineEvents.filter(e => e.category === filterCategory);

  const categoryColors: Record<string, string> = {
    personal: "bg-red-500/20 border-red-500/50",
    scientific: "bg-blue-500/20 border-blue-500/50",
    persecution: "bg-red-900/20 border-red-500/50",
    recognition: "bg-green-500/20 border-green-500/50"
  };

  const categoryLabels: Record<string, string> = {
    personal: "Personal",
    scientific: "Científico",
    persecution: "Persecución",
    recognition: "Reconocimiento"
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">Línea de Tiempo de Chizhevsky</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Sincronización de su vida con ciclos solares (1897-1973)
          </p>
        </div>

        {/* Alert Introductorio */}
        <Alert className="mb-8 border-primary/50 bg-primary/5">
          <Sun className="h-5 w-5 text-primary" />
          <AlertTitle className="text-lg">Sincronía Cósmica</AlertTitle>
          <AlertDescription className="text-foreground/80">
            Esta línea de tiempo muestra cómo los hitos más importantes de la vida de Chizhevsky coincidieron 
            con ciclos solares específicos. Su persecución ocurrió durante un máximo solar (Ciclo 18), 
            y su rehabilitación durante otro máximo (Ciclo 20).
          </AlertDescription>
        </Alert>

        {/* Gráfico de Ciclos Solares */}
        <Card className="mb-8 bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="w-6 h-6 text-primary" />
              Actividad Solar (1897-1973)
            </CardTitle>
            <CardDescription>
              Manchas solares y eventos clave de la vida de Chizhevsky
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={solarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Bar dataKey="sunspots" fill="hsl(var(--primary))" name="Manchas Solares" />
                <Line type="monotone" dataKey="cycle" stroke="hsl(var(--accent))" name="Ciclo Solar" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Filtros */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Button 
            variant={filterCategory === "all" ? "default" : "outline"}
            onClick={() => setFilterCategory("all")}
          >
            Todos los eventos
          </Button>
          <Button 
            variant={filterCategory === "personal" ? "default" : "outline"}
            onClick={() => setFilterCategory("personal")}
          >
            <Heart className="w-4 h-4 mr-2" />
            Personal
          </Button>
          <Button 
            variant={filterCategory === "scientific" ? "default" : "outline"}
            onClick={() => setFilterCategory("scientific")}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Científico
          </Button>
          <Button 
            variant={filterCategory === "persecution" ? "default" : "outline"}
            onClick={() => setFilterCategory("persecution")}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Persecución
          </Button>
          <Button 
            variant={filterCategory === "recognition" ? "default" : "outline"}
            onClick={() => setFilterCategory("recognition")}
          >
            <Award className="w-4 h-4 mr-2" />
            Reconocimiento
          </Button>
        </div>

        {/* Línea de Tiempo */}
        <div className="space-y-4">
          {filteredEvents.map((event, index) => (
            <Card 
              key={index}
              className={`cursor-pointer transition-all hover:border-primary/50 ${categoryColors[event.category]}`}
              onClick={() => setSelectedEvent(event)}
            >
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-12 gap-4">
                  {/* Año y Icono */}
                  <div className="md:col-span-2 flex flex-col items-center justify-start">
                    <div className="text-3xl font-bold text-primary mb-2">{event.year}</div>
                    <div className="p-2 rounded-full bg-background/50">
                      {event.icon}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="md:col-span-7 space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                    <p className="text-sm text-foreground/80">{event.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                        {categoryLabels[event.category]}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">
                        Ciclo Solar {event.solarCycle}
                      </span>
                    </div>
                  </div>

                  {/* Datos Solares */}
                  <div className="md:col-span-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Manchas solares:</span>
                      <span className="font-semibold text-primary">{event.sunspots}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fase:</span>
                      <span className="font-semibold">{event.solarPhase}</span>
                    </div>
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-xs text-muted-foreground italic">{event.historicalContext}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Panel de Detalles */}
        {selectedEvent && (
          <Card className="mt-8 bg-card border-primary/50 sticky bottom-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {selectedEvent.icon}
                  {selectedEvent.title}
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedEvent(null)}
                >
                  ✕
                </Button>
              </div>
              <CardDescription>
                {selectedEvent.year} • Ciclo Solar {selectedEvent.solarCycle} ({selectedEvent.solarPhase})
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">Descripción</h4>
                <p className="text-foreground/80">{selectedEvent.description}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Contexto Solar</h4>
                  <p className="text-sm text-foreground/80">
                    Manchas solares: <strong>{selectedEvent.sunspots}</strong><br />
                    Fase: <strong>{selectedEvent.solarPhase}</strong><br />
                    Ciclo: <strong>{selectedEvent.solarCycle}</strong>
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Contexto Histórico</h4>
                  <p className="text-sm text-foreground/80">{selectedEvent.historicalContext}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Conclusión */}
        <div className="mt-12 text-center">
          <Alert className="border-green-500/50 bg-green-500/10">
            <Star className="h-5 w-5 text-green-400" />
            <AlertTitle className="text-lg text-green-400">Sincronía Cósmica Confirmada</AlertTitle>
            <AlertDescription className="text-foreground/80">
              La vida de Alexander Chizhevsky estuvo profundamente entrelazada con los ciclos solares. 
              Sus mayores logros científicos ocurrieron durante máximos solares, 
              mientras que su persecución coincidió con otro máximo solar. 
              <strong className="text-primary"> ¿Coincidencia o destino cósmico?</strong>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
