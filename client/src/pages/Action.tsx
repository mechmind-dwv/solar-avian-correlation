import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Heart, Globe, Users, Zap, BookOpen, Mail, ExternalLink } from "lucide-react";

export default function Action() {
  const organizations = [
    {
      name: "BirdLife International",
      description: "Conservación global de aves y biodiversidad",
      url: "https://www.birdlife.org",
      focus: "Conservación"
    },
    {
      name: "The Nature Conservancy",
      description: "Protección de ecosistemas y especies",
      url: "https://www.nature.org",
      focus: "Ecosistemas"
    },
    {
      name: "World Wildlife Fund (WWF)",
      description: "Conservación de vida silvestre y naturaleza",
      url: "https://www.worldwildlife.org",
      focus: "Biodiversidad"
    },
    {
      name: "IUCN - International Union for Conservation",
      description: "Autoridad global en estado de conservación",
      url: "https://www.iucn.org",
      focus: "Investigación"
    },
    {
      name: "Audubon Society",
      description: "Protección de aves y hábitats en América",
      url: "https://www.audubon.org",
      focus: "Aves"
    },
    {
      name: "Wetlands International",
      description: "Conservación de humedales y aves acuáticas",
      url: "https://www.wetlands.org",
      focus: "Humedales"
    }
  ];

  const actions = [
    {
      title: "Apoya Investigación Científica",
      description: "Financia estudios sobre la correlación entre ciclos solares y brotes epidémicos aviares",
      icon: <Zap className="w-8 h-8 text-primary" />,
      steps: [
        "Busca universidades investigando heliobiología",
        "Apoya proyectos de investigación en cronobiología",
        "Financia estudios de navegación de aves migratorias",
        "Colabora con institutos de medicina espacial"
      ]
    },
    {
      title: "Protege Hábitats de Aves",
      description: "Conserva los ecosistemas donde viven y migran las aves",
      icon: <Globe className="w-8 h-8 text-green-400" />,
      steps: [
        "Participa en proyectos de restauración de humedales",
        "Apoya la creación de reservas naturales",
        "Reduce tu huella de carbono",
        "Planta árboles nativos en tu comunidad"
      ]
    },
    {
      title: "Participa en Monitoreo",
      description: "Ayuda a recopilar datos sobre poblaciones de aves",
      icon: <Users className="w-8 h-8 text-blue-400" />,
      steps: [
        "Únete a proyectos de ciencia ciudadana",
        "Reporta avistamientos de aves",
        "Participa en conteos de aves migratorias",
        "Comparte datos con plataformas científicas"
      ]
    },
    {
      title: "Educa y Conciencia",
      description: "Difunde el conocimiento sobre heliobiología y conservación",
      icon: <BookOpen className="w-8 h-8 text-purple-400" />,
      steps: [
        "Comparte información sobre Chizhevsky",
        "Organiza charlas en tu comunidad",
        "Crea contenido educativo",
        "Enseña a otros sobre la sincronía cósmica"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-12 h-12 text-red-500" />
            <h1 className="text-4xl md:text-5xl font-bold">Llamado a la Acción</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Salva a billones de vidas: humanas, aves, mamíferos, plantas, insectos, felinos, mamíferos marinos
          </p>
        </div>

        {/* Alert Principal */}
        <Alert className="mb-8 border-red-500/50 bg-red-500/10">
          <Heart className="h-5 w-5 text-red-500" />
          <AlertTitle className="text-lg text-red-500">La Crisis es Real</AlertTitle>
          <AlertDescription className="text-foreground/80">
            Cada año, millones de aves mueren por gripe aviar H5N1. Mamíferos marinos, felinos salvajes 
            y otros animales también son afectados. La ignorancia científica sobre la correlación solar-epidémica 
            nos impide prepararnos adecuadamente para la próxima pandemia. <strong>El tiempo se agota.</strong>
          </AlertDescription>
        </Alert>

        {/* Acciones Principales */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {actions.map((action, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-background/50">
                    {action.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-primary mb-3">Cómo participar:</p>
                  <ul className="space-y-2">
                    {action.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-foreground/80">
                        <span className="text-primary font-bold">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Organizaciones */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Globe className="w-8 h-8 text-primary" />
            Organizaciones Aliadas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {organizations.map((org, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-base">{org.name}</CardTitle>
                  <CardDescription className="text-xs">{org.focus}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-foreground/80">{org.description}</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={org.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Visitar
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Investigación Colaborativa */}
        <Card className="mb-12 bg-card border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Únete a la Red de Investigadores
            </CardTitle>
            <CardDescription>
              Colabora en la validación de la hipótesis de Chizhevsky
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/80">
              Si eres investigador, epidemiólogo, ornitólogo, biofísico, o simplemente tienes datos relevantes, 
              considera colaborar en esta investigación global. Juntos podemos:
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Validar o refutar la correlación solar-epidémica</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Entender los mecanismos biofísicos subyacentes</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Desarrollar sistemas de predicción de pandemias</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Prepararnos mejor para futuras crisis sanitarias</span>
              </li>
            </ul>
            <Button className="w-full mt-4" size="lg" asChild>
              <a href="mailto:ia.mechmind@gmail.com">
                <Mail className="w-4 h-4 mr-2" />
                Contactar para Colaborar
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Tributo a Chizhevsky */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/50">
          <CardHeader>
            <CardTitle className="text-2xl">En Memoria de Alexander Leonidovich Chizhevsky</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <blockquote className="text-lg italic text-foreground/90 border-l-4 border-primary pl-4">
              "El pulso de la vida en la Tierra late al ritmo del Sol"
            </blockquote>
            <p className="text-foreground/80">
              Chizhevsky fue perseguido por sus ideas revolucionarias, pasó 8 años en campos de trabajo, 
              y murió en el exilio. Hoy, 60 años después de su muerte, la ciencia moderna comienza a validar 
              sus predicciones. Su legado no es solo científico, sino un llamado a la humildad: 
              <strong> somos parte de un cosmos vivo, y nuestra supervivencia depende de entender esta sincronía.</strong>
            </p>
            <p className="text-foreground/80">
              Esta plataforma es un monumento digital a su genio, un tributo a su visión, y una promesa: 
              <strong> no permitiremos que su trabajo sea olvidado nuevamente.</strong>
            </p>
          </CardContent>
        </Card>

        {/* Conclusión */}
        <div className="mt-12 text-center">
          <Alert className="border-green-500/50 bg-green-500/10">
            <Heart className="h-5 w-5 text-green-500" />
            <AlertTitle className="text-lg text-green-500">El Futuro Está en Nuestras Manos</AlertTitle>
            <AlertDescription className="text-foreground/80">
              Cada acción cuenta. Cada investigador, cada conservacionista, cada persona consciente 
              que se une a esta misión es un paso hacia un futuro donde entendemos y respetamos 
              la sincronía cósmica que sustenta toda la vida en la Tierra.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
