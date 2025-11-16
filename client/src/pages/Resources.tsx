import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BookOpen, ExternalLink, FileText, GraduationCap, Library, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Resources() {
  const originalWorks = [
    {
      title: "Physical Factors of the Historical Process (1924)",
      author: "A.L. Chizhevsky",
      description: "Trabajo fundacional que establece la correlación entre actividad solar y eventos históricos masivos",
      url: "https://cyclesresearchinstitute.org/pdf/cycles-history/chizhevsky1.pdf",
      year: 1924,
      language: "Inglés (traducción)"
    },
    {
      title: "Libro Completo de 1938 (Original en Ruso)",
      author: "A.L. Chizhevsky",
      description: "Obra completa sobre la influencia de la actividad solar en procesos biológicos y sociales",
      url: "http://gorbanev.com/literature/Book1938/BOOKcomplete.pdf",
      year: 1938,
      language: "Ruso"
    },
    {
      title: "Les Épidémies et les perturbations électro-magnétiques (1938)",
      author: "A.L. Chizhevsky",
      description: "Epidemias y perturbaciones electromagnéticas del entorno externo. Publicado en París por editorial Hipócrates",
      year: 1938,
      language: "Francés"
    },
    {
      title: "Eco terrestre de las tormentas solares (1973)",
      author: "A.L. Chizhevsky",
      description: "Definido como el 'Manifiesto de las Ciencias Naturales Cósmicas'. Publicado póstumamente",
      year: 1973,
      language: "Ruso"
    }
  ];

  const modernValidations = [
    {
      title: "Environmental Monitoring of Variability in the Noosphere",
      authors: "Halberg et al.",
      institution: "Halberg Chronobiology Center, University of Minnesota",
      description: "Validación moderna de ciclos heliobiológicos y su impacto en salud humana",
      url: "http://www.biophys.ru/archive/iki-2012.pdf",
      year: 2012
    },
    {
      title: "Heliobiology Research at IMBP",
      institution: "Institute of Biomedical Problems (IMBP), Moscow",
      description: "Investigación continua sobre biología espacial y efectos solares en organismos vivos",
      year: "2000-presente"
    },
    {
      title: "Solar Activity and Epidemic Outbreaks",
      authors: "Ada Platonova",
      institution: "Siberian Branch, USSR Academy of Sciences",
      description: "Continuación del trabajo de Chizhevsky en heliobiología moderna",
      year: 1970
    }
  ];

  const dataSources = [
    {
      name: "SILSO - Sunspot Index",
      organization: "Royal Observatory of Belgium",
      description: "Datos históricos de manchas solares desde 1755",
      url: "https://www.sidc.be/silso/",
      type: "Solar"
    },
    {
      name: "NOAA Space Weather Prediction Center",
      organization: "National Oceanic and Atmospheric Administration",
      description: "Datos de tormentas geomagnéticas y actividad solar en tiempo real",
      url: "https://www.swpc.noaa.gov/",
      type: "Geomagnético"
    },
    {
      name: "WHO - Avian Influenza",
      organization: "World Health Organization",
      description: "Reportes oficiales de brotes de gripe aviar H5N1",
      url: "https://www.who.int/health-topics/influenza-avian-and-other-zoonotic",
      type: "Epidemiológico"
    },
    {
      name: "WOAH (OIE) - Animal Health",
      organization: "World Organisation for Animal Health",
      description: "Base de datos global de enfermedades animales",
      url: "https://www.woah.org/",
      type: "Veterinario"
    },
    {
      name: "NASA Solar Dynamics Observatory",
      organization: "National Aeronautics and Space Administration",
      description: "Observaciones solares de alta resolución",
      url: "https://sdo.gsfc.nasa.gov/",
      type: "Solar"
    }
  ];

  const glossary = [
    {
      term: "Heliobiología",
      definition: "Ciencia fundada por A.L. Chizhevsky que estudia la influencia de la actividad solar sobre los procesos biológicos terrestres."
    },
    {
      term: "Ciclo Solar",
      definition: "Período de aproximadamente 11 años durante el cual la actividad del Sol (manchas solares) aumenta y disminuye."
    },
    {
      term: "Manchas Solares",
      definition: "Regiones oscuras en la superficie solar causadas por concentraciones de campo magnético. Su número indica la actividad solar."
    },
    {
      term: "Tormenta Geomagnética",
      definition: "Perturbación temporal del campo magnético terrestre causada por eyecciones de masa coronal del Sol."
    },
    {
      term: "Índice Kp",
      definition: "Escala de 0-9 que mide la intensidad de tormentas geomagnéticas. Kp≥6 indica tormenta significativa."
    },
    {
      term: "H5N1",
      definition: "Subtipo de virus de influenza aviar altamente patogénico que puede infectar aves y ocasionalmente humanos."
    },
    {
      term: "Ciclo de Hale",
      definition: "Ciclo solar de aproximadamente 22 años que incluye la reversión completa del campo magnético solar."
    },
    {
      term: "Máximo Solar",
      definition: "Período de mayor actividad solar dentro de un ciclo de 11 años, caracterizado por mayor número de manchas solares."
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Library className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">Recursos Educativos</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Biblioteca de conocimiento heliobiológico
          </p>
        </div>

        {/* Alert Introductorio */}
        <Alert className="mb-8 border-primary/50 bg-primary/5">
          <Star className="h-5 w-5 text-primary" />
          <AlertTitle className="text-lg">Legado Científico de Chizhevsky</AlertTitle>
          <AlertDescription className="text-foreground/80">
            Alexander Chizhevsky fue perseguido por sus ideas revolucionarias, pasando 8 años en campos de trabajo
            y muriendo en el exilio. Hoy, 60 años después, la ciencia moderna valida cada una de sus predicciones.
            Estos recursos documentan su genio y el reconocimiento tardío que merece.
          </AlertDescription>
        </Alert>

        {/* Obras Originales de Chizhevsky */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Obras Originales de A.L. Chizhevsky</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {originalWorks.map((work, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg flex items-start justify-between gap-2">
                    <span>{work.title}</span>
                    <span className="text-sm text-muted-foreground font-normal">({work.year})</span>
                  </CardTitle>
                  <CardDescription>{work.author}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-foreground/80">{work.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{work.language}</span>
                    {work.url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={work.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Acceder
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Validaciones Modernas */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-8 h-8 text-accent" />
            <h2 className="text-3xl font-bold">Validaciones Científicas Modernas</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {modernValidations.map((work, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">{work.title}</CardTitle>
                  <CardDescription>
                    {work.authors && <span>{work.authors} • </span>}
                    {work.institution}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-foreground/80">{work.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{work.year}</span>
                    {work.url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={work.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Leer más
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Fuentes de Datos */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-green-400" />
            <h2 className="text-3xl font-bold">Fuentes de Datos</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataSources.map((source, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                      {source.type}
                    </span>
                  </div>
                  <CardTitle className="text-base">{source.name}</CardTitle>
                  <CardDescription className="text-xs">{source.organization}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-foreground/70">{source.description}</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Visitar
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Glosario */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold">Glosario Heliobiológico</h2>
          </div>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {glossary.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-primary">{item.term}</h4>
                    <p className="text-sm text-foreground/80">{item.definition}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Alert className="border-accent/50 bg-accent/5">
            <Star className="h-4 w-4" />
            <AlertTitle>Contribuye al Conocimiento</AlertTitle>
            <AlertDescription>
              Si conoces recursos adicionales sobre heliobiología o el trabajo de Chizhevsky,
              por favor compártelos para enriquecer esta biblioteca.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
