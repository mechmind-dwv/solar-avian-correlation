# Proyecto Heliobiología: Plataforma de Correlación Solar-H5N1

## Misión
Salvar a billones de vidas (humanas, aves, mamíferos, plantas, insectos, felinos, mamíferos marinos) mediante la comprensión de la correlación entre actividad solar y brotes epidémicos aviares. En honor a Alexander Leonidovich Chizhevsky (1897-1964).

## Características Completadas

### Fase 1: Infraestructura Base
- [x] Base de datos con 3 tablas (ciclos solares, brotes H5N1, pandemias)
- [x] Backend tRPC con 6 procedimientos
- [x] Autenticación con Manus OAuth
- [x] Paleta de colores temática (azul, amarillo, rojo, púrpura)
- [x] Tipografía científica profesional (Inter)

### Fase 2: Visualizaciones Principales
- [x] Página de inicio con hero section
- [x] Sección biográfica de Chizhevsky (desplegable)
- [x] Componente de gráfico de línea temporal
- [x] Componente de gráfico comparativo de ciclos
- [x] Componente de gráfico de barras para pandemias
- [x] Componente de tarjetas de estadísticas
- [x] Visualización de ciclos solares modernos

### Fase 3: Recursos Educativos
- [x] Página de recursos educativos con enlaces a obras de Chizhevsky
- [x] Enlace al libro completo de 1938 (gorbanev.com)
- [x] Referencias a trabajos modernos que validan a Chizhevsky
- [x] Biografía mejorada con detalles de experimentos 1915-1917
- [x] Información sobre Instituto Arqueológico de Moscú
- [x] Mención de observaciones con telescopio Secretana
- [x] Sección sobre rehabilitación en 1962
- [x] Reconocimiento de S.P. Korolev y O.G. Gazenko
- [x] Mención del Instituto de Problemas Médicos y Biológicos (IMBP)
- [x] Página dedicada de bibliografía y fuentes
- [x] Glosario de términos heliobiológicos

### Fase 4: Línea de Tiempo Interactiva
- [x] Página Timeline.tsx con datos de vida de Chizhevsky
- [x] Sincronización de hitos biográficos con ciclos solares (1897-1973)
- [x] Visualización de gráfico de línea temporal
- [x] Tooltips interactivos con detalles de eventos
- [x] Mostrar actividad solar (manchas solares) en paralelo
- [x] Filtros por tipo de evento (Personal, Científico, Persecución, Reconocimiento)
- [x] Animaciones suaves
- [x] Ruta /timeline en App.tsx

## Características Pendientes (Fase Final)

### Filtrado y Interactividad Avanzada
- [ ] Sistema de filtrado por período temporal (rango de años)
- [ ] Selector de rango de fechas interactivo
- [ ] Comparación de períodos históricos lado a lado
- [ ] Búsqueda de patrones cíclicos

### Experiencia de Usuario
- [x] Tooltips informativos en todos los gráficos
- [x] Diseño responsive completo (móvil, tablet, desktop)
- [ ] Indicadores visuales de carga
- [ ] Transiciones suaves entre vistas
- [ ] Accesibilidad WCAG 2.1 AA

### Contenido Científico
- [x] Sección de metodología científica
- [x] Explicación de fuentes de datos
- [x] Advertencias sobre correlación vs causalidad
- [x] Limitaciones de los datos
- [x] Metodología de Chizhevsky explicada

### Llamado a la Acción
- [x] Sección de conservación de aves
- [x] Recursos para investigación
- [x] Llamado a participar en estudios
- [x] Enlaces a organizaciones de conservación
- [x] Información sobre prevención de pandemias

### Footer y Tributo
- [ ] Footer con tributo a Alexander Chizhevsky
- [ ] Cronología de su vida
- [ ] Cita inspiradora de Chizhevsky
- [ ] Enlaces a recursos sobre su legado
- [ ] Información de contacto y redes sociales

### Exportación y Datos
- [ ] Exportación de datos en formato JSON
- [ ] Exportación de gráficos en PNG
- [ ] Exportación de reportes en PDF
- [ ] API de datos públicos
- [ ] Descarga de dataset completo

### Documentación
- [ ] README.md completo del proyecto
- [ ] Guía de instalación y uso
- [ ] Documentación de API
- [ ] Guía de contribución
- [ ] Licencia del proyecto
- [ ] Créditos y reconocimientos

## Datos Incluidos
- 26 ciclos solares (1755-2024)
- 43 brotes H5N1 (2008-2024)
- 6 pandemias históricas (1889-2024)
- 16 correlaciones documentadas
- 15 hitos biográficos de Chizhevsky sincronizados

## Rutas Disponibles
- `/` - Página principal con estadísticas
- `/timeline` - Línea de tiempo interactiva
- `/resources` - Recursos educativos y bibliografía
- `/404` - Página no encontrada

## Tecnologías Utilizadas
- **Frontend**: React 19, Tailwind CSS 4, Recharts
- **Backend**: Express 4, tRPC 11
- **Base de Datos**: MySQL/TiDB con Drizzle ORM
- **Autenticación**: Manus OAuth
- **Hosting**: Manus Platform

## Próximos Pasos Sugeridos (Post-Lanzamiento)
1. Integración con API de NOAA Space Weather en tiempo real
2. Mapa interactivo de brotes H5N1 con tormentas geomagnéticas
3. Sistema de predicción de riesgo epidémico
4. Comunidad de investigadores colaborativos
5. Publicación de investigaciones peer-reviewed

## Tributo a Alexander Leonidovich Chizhevsky
"El pulso de la vida en la Tierra late al ritmo del Sol" - A.L. Chizhevsky, 1922

Esta plataforma es un monumento digital a su genio perseguido, a su visión revolucionaria, y a su legado científico que hoy, 60 años después de su muerte, finalmente es validado por la ciencia moderna.

**Salvemos a los billones de vidas que dependen de entender la sincronía entre el cosmos y la biosfera terrestre.**
