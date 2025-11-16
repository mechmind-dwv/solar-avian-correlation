import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, BookOpen, Microscope, Database, CheckCircle, AlertCircle } from "lucide-react";

export default function Methodology() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Microscope className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">Metodología Científica</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Fundamentos, fuentes de datos y limitaciones
          </p>
        </div>

        {/* Alert de Advertencia */}
        <Alert className="mb-8 border-yellow-500/50 bg-yellow-500/10">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <AlertTitle className="text-lg text-yellow-400">Correlación ≠ Causalidad</AlertTitle>
          <AlertDescription className="text-foreground/80">
            Esta plataforma presenta correlaciones históricas entre actividad solar y brotes epidémicos. 
            Las correlaciones observadas NO prueban causalidad directa. La investigación continúa para 
            entender los mecanismos biofísicos subyacentes.
          </AlertDescription>
        </Alert>

        {/* Tabs */}
        <Tabs defaultValue="methodology" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="methodology">Metodología</TabsTrigger>
            <TabsTrigger value="data">Datos</TabsTrigger>
            <TabsTrigger value="limitations">Limitaciones</TabsTrigger>
            <TabsTrigger value="research">Investigación</TabsTrigger>
          </TabsList>

          {/* Metodología de Chizhevsky */}
          <TabsContent value="methodology" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                  Fundamentos de la Heliobiología
                </CardTitle>
                <CardDescription>
                  Principios científicos establecidos por Alexander Chizhevsky
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">1. Ciclos Solares de 11 Años</h4>
                  <p className="text-foreground/80">
                    El número de manchas solares sigue un ciclo aproximado de 11 años (rango: 9-14 años). 
                    Este ciclo es bien documentado desde 1755 por observatorios astronómicos independientes. 
                    La actividad solar aumenta durante máximos solares, generando mayor radiación electromagnética 
                    y eyecciones de masa coronal que afectan el campo magnético terrestre.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">2. Ciclo de Hale de 22 Años</h4>
                  <p className="text-foreground/80">
                    El campo magnético solar se invierte cada 11 años, creando un ciclo completo de 22 años. 
                    Este ciclo es más largo que el ciclo de manchas solares y puede tener efectos más profundos 
                    en los sistemas biológicos.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">3. Tormentas Geomagnéticas</h4>
                  <p className="text-foreground/80">
                    Durante máximos solares, aumentan las eyecciones de masa coronal que generan tormentas 
                    geomagnéticas (medidas por el índice Kp). Estas tormentas alteran el campo magnético terrestre, 
                    que a su vez puede afectar sistemas biológicos sensibles a campos magnéticos (navegación de aves, 
                    ciclos circadianos, sistemas inmunológicos).
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">4. Hipótesis de Chizhevsky</h4>
                  <p className="text-foreground/80">
                    Chizhevsky propuso que el 80% de eventos históricos significativos (guerras, revoluciones, 
                    epidemias) ocurren durante máximos solares. Su análisis de 2,500 años de historia (500 a.C. - 1900 d.C.) 
                    mostró correlaciones estadísticas significativas. Aunque controvertida, esta hipótesis ha sido parcialmente 
                    validada por investigaciones modernas en cronobiología y heliobiología.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">5. Mecanismos Propuestos</h4>
                  <p className="text-foreground/80">
                    Los mecanismos biofísicos propuestos incluyen: alteración de campos magnéticos que afectan 
                    la navegación de aves migratorias (facilitando transmisión de virus), cambios en radiación 
                    cósmica que afectan sistemas inmunológicos, alteración de ciclos circadianos que reducen 
                    resistencia a infecciones, y cambios en ionización atmosférica que afectan patógenos aéreos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fuentes de Datos */}
          <TabsContent value="data" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-6 h-6 text-accent" />
                  Fuentes de Datos Utilizadas
                </CardTitle>
                <CardDescription>
                  Bases de datos oficiales y verificadas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3 pb-4 border-b border-border">
                  <h4 className="font-semibold text-primary">Ciclos Solares (1755-2024)</h4>
                  <p className="text-sm text-foreground/80 mb-2">
                    <strong>Fuente:</strong> SILSO (Sunspot Index and Long-term Solar Observations), 
                    Royal Observatory of Belgium
                  </p>
                  <p className="text-sm text-foreground/80">
                    Datos históricos de manchas solares desde 1755, compilados de múltiples observatorios 
                    independientes. Este es el registro más completo y verificado de actividad solar disponible. 
                    Incluye número de manchas solares, área relativa, y clasificación de ciclos.
                  </p>
                </div>

                <div className="space-y-3 pb-4 border-b border-border">
                  <h4 className="font-semibold text-primary">Brotes H5N1 (2008-2024)</h4>
                  <p className="text-sm text-foreground/80 mb-2">
                    <strong>Fuentes:</strong> WHO (World Health Organization), WOAH (World Organisation for Animal Health), 
                    CDC (Centers for Disease Control)
                  </p>
                  <p className="text-sm text-foreground/80">
                    Reportes oficiales de brotes de gripe aviar H5N1 en aves y humanos. Incluye fecha, ubicación, 
                    número de casos, muertes, y especies afectadas. Datos verificados por organismos internacionales.
                  </p>
                </div>

                <div className="space-y-3 pb-4 border-b border-border">
                  <h4 className="font-semibold text-primary">Tormentas Geomagnéticas (1932-2024)</h4>
                  <p className="text-sm text-foreground/80 mb-2">
                    <strong>Fuente:</strong> NOAA Space Weather Prediction Center, National Oceanic and Atmospheric Administration
                  </p>
                  <p className="text-sm text-foreground/80">
                    Índice Kp (Planetary K-index) que mide la intensidad de tormentas geomagnéticas en escala 0-9. 
                    Datos desde 1932, con registros continuos desde 1957. Compilado de magnetómetros globales.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Pandemias Históricas (1889-2024)</h4>
                  <p className="text-sm text-foreground/80 mb-2">
                    <strong>Fuentes:</strong> WHO, CDC, Historical Records, Chizhevsky Archives
                  </p>
                  <p className="text-sm text-foreground/80">
                    Registros históricos de pandemias de influenza y otras enfermedades infecciosas. 
                    Incluye fechas de inicio, duración, número de muertes estimadas, y ciclos solares correspondientes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Limitaciones */}
          <TabsContent value="limitations" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-orange-400" />
                  Limitaciones y Consideraciones
                </CardTitle>
                <CardDescription>
                  Factores que afectan la interpretación de los datos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-orange-500/50 bg-orange-500/10">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                  <AlertTitle>Limitaciones Críticas</AlertTitle>
                  <AlertDescription className="text-sm text-foreground/80">
                    Las siguientes limitaciones deben considerarse al interpretar los datos:
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">1. Calidad de Datos Históricos</h4>
                  <p className="text-foreground/80 text-sm">
                    Los datos de brotes epidémicos anteriores a 2000 son menos precisos debido a falta de 
                    registros sistemáticos. Los datos de ciclos solares anteriores a 1755 son estimaciones 
                    basadas en registros de manchas solares visibles a ojo desnudo.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">2. Factores Confundentes</h4>
                  <p className="text-foreground/80 text-sm">
                    Muchos factores afectan la transmisión de enfermedades: cambio climático, urbanización, 
                    comercio internacional, prácticas agrícolas, sistemas de salud, etc. Es imposible aislar 
                    el efecto de la actividad solar de estos otros factores.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">3. Mecanismos Biológicos Desconocidos</h4>
                  <p className="text-foreground/80 text-sm">
                    Aunque existen hipótesis sobre cómo la actividad solar podría afectar sistemas biológicos, 
                    los mecanismos exactos no están completamente entendidos. Se requiere más investigación 
                    experimental.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">4. Tamaño de Muestra</h4>
                  <p className="text-foreground/80 text-sm">
                    Solo tenemos ~3 ciclos solares completos de datos confiables de brotes H5N1 (2008-2024). 
                    Para conclusiones estadísticas sólidas, se necesitarían más ciclos de datos.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">5. Variabilidad Geográfica</h4>
                  <p className="text-foreground/80 text-sm">
                    La intensidad de tormentas geomagnéticas varía por latitud. Los efectos biológicos pueden 
                    ser más pronunciados en latitudes altas. Los datos globales pueden enmascarar patrones regionales.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investigación Continua */}
          <TabsContent value="research" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Microscope className="w-6 h-6 text-green-400" />
                  Investigación Continua
                </CardTitle>
                <CardDescription>
                  Áreas que requieren más estudio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Estudios Recomendados</h4>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Investigación experimental sobre efectos de campos magnéticos en sistemas inmunológicos aviares</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Estudios de navegación de aves migratorias durante tormentas geomagnéticas</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Análisis de ciclos circadianos en aves durante variaciones de radiación cósmica</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Modelado matemático de transmisión de H5N1 correlacionado con ciclos solares</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Estudios epidemiológicos a largo plazo en múltiples ciclos solares</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <h4 className="font-semibold text-primary">Colaboraciones Necesarias</h4>
                  <p className="text-sm text-foreground/80">
                    Esta investigación requiere colaboración entre:
                  </p>
                  <ul className="space-y-1 text-sm text-foreground/80 ml-4">
                    <li>• Astrofísicos solares</li>
                    <li>• Epidemiólogos veterinarios</li>
                    <li>• Ornitólogos</li>
                    <li>• Biofísicos</li>
                    <li>• Estadísticos</li>
                    <li>• Modeladores climáticos</li>
                  </ul>
                </div>

                <Alert className="border-green-500/50 bg-green-500/10 mt-4">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <AlertTitle className="text-green-400">Llamado a la Acción</AlertTitle>
                  <AlertDescription className="text-sm text-foreground/80">
                    Si eres investigador o tienes datos relevantes, considera colaborar en esta investigación. 
                    Juntos podemos entender mejor la sincronía entre el cosmos y la biosfera terrestre.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Conclusión */}
        <Card className="mt-8 bg-card border-primary/50">
          <CardHeader>
            <CardTitle className="text-green-400">Conclusión</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/80">
              Esta plataforma presenta evidencia de correlaciones entre actividad solar y brotes epidémicos aviares, 
              validando parcialmente la hipótesis revolucionaria de Alexander Chizhevsky. Sin embargo, la ciencia 
              requiere cautela: <strong>correlación no implica causalidad</strong>.
            </p>
            <p className="text-foreground/80">
              Lo que sí podemos afirmar es que existe una sincronía notable entre ciclos solares y eventos biológicos 
              significativos. Esta sincronía merece investigación rigurosa, porque si es confirmada, podría revolucionar 
              nuestra comprensión de la vida en la Tierra y nuestra capacidad de predecir y prevenir pandemias.
            </p>
            <p className="text-foreground/80 italic">
              "El pulso de la vida en la Tierra late al ritmo del Sol" - A.L. Chizhevsky, 1922
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
