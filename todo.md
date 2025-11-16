# Herramienta de Investigación Epidemiológica Solar
## Correlación H5N1 - Tormentas Geomagnéticas (G2, G3, G4, G5, +G5)

**Misión**: Visualizar y analizar la correlación directa entre actividad solar (manchas solares, tormentas geomagnéticas) y brotes de gripe aviar H5N1 para predecir y prevenir futuras pandemias.

**Referente Científico**: Alexander Leonidovich Chizhevsky - Fundador de la Heliobiología

---

## FASE 1: Rediseño de Página Principal (ACTUAL)

### Objetivo
Convertir la página de inicio en un **dashboard de investigación epidemiológica solar**, no en un museo biográfico.

### Tareas
- [ ] Eliminar sección biográfica de Chizhevsky (referente, no protagonista)
- [ ] Crear dashboard principal con 3 paneles:
  * **Panel Izquierdo**: Gráfico temporal sincronizado (manchas solares, tormentas G2-G5, H5N1)
  * **Panel Central**: Estadísticas de correlación (coeficiente, p-value, lag time)
  * **Panel Derecho**: Indicador de riesgo actual (basado en actividad solar)
- [ ] Simplificar navegación (solo secciones científicas relevantes)
- [ ] Agregar filtros por:
  * Rango temporal
  * Intensidad de tormenta (G2, G3, G4, G5, +G5)
  * Región geográfica
  * Especie de ave afectada

---

## FASE 2: Gráfico Temporal Sincronizado

### Objetivo
Crear una visualización que muestre simultáneamente:
1. **Manchas solares** (línea azul, eje Y izquierdo)
2. **Tormentas geomagnéticas** (barras coloreadas por intensidad)
   - G2: Amarillo
   - G3: Naranja
   - G4: Rojo
   - G5: Rojo oscuro
   - +G5: Púrpura
3. **Brotes H5N1** (puntos/marcadores, tamaño por intensidad)

### Tareas
- [ ] Crear componente `SolarEpidemicTimeline.tsx`
- [ ] Implementar gráfico compuesto con Recharts
- [ ] Agregar sincronización temporal (zoom, pan)
- [ ] Mostrar tooltips con detalles de cada evento
- [ ] Calcular lag time (días entre tormenta y brote)
- [ ] Colorear puntos H5N1 por región geográfica

---

## FASE 3: Análisis de Correlación y Predicción

### Objetivo
Implementar análisis estadístico riguroso y predicción de riesgo.

### Tareas
- [ ] Calcular correlación de Pearson entre tormentas y brotes
- [ ] Calcular p-value para significancia estadística
- [ ] Analizar lag time (0-30 días entre evento solar y brote)
- [ ] Crear matriz de correlación por:
  * Intensidad de tormenta (G2, G3, G4, G5, +G5)
  * Región geográfica
  * Especie de ave
  * Mes/estación
- [ ] Implementar predicción de riesgo:
  * Entrada: Actividad solar actual (manchas, tormentas predichas)
  * Salida: Probabilidad de brote H5N1 en próximos 14 días
- [ ] Crear tabla de resultados con:
  * Coeficiente de correlación
  * P-value
  * Lag time promedio
  * Confianza de predicción

---

## FASE 4: Mapa Geográfico Interactivo

### Objetivo
Visualizar dónde ocurren las correlaciones más fuertes.

### Tareas
- [ ] Crear mapa mundial con Leaflet/Mapbox
- [ ] Superponer:
  * Puntos de brotes H5N1 (tamaño por intensidad)
  * Intensidad de tormentas geomagnéticas por región (heatmap)
  * Líneas de latitud (para analizar efecto de latitud)
- [ ] Agregar filtros:
  * Por rango de fechas
  * Por intensidad de tormenta (G2-G5)
  * Por especie de ave
- [ ] Mostrar estadísticas regionales:
  * Número de brotes
  * Correlación con tormentas
  * Lag time promedio

---

## FASE 5: Datos y Backend

### Tareas Completadas
- [x] Base de datos con ciclos solares, brotes H5N1, pandemias
- [x] Procedimientos tRPC básicos

### Tareas Pendientes
- [ ] Enriquecer datos de tormentas geomagnéticas:
  * Agregar clasificación G2-G5
  * Agregar duración de tormenta
  * Agregar latitud de máxima intensidad
- [ ] Enriquecer datos de H5N1:
  * Agregar coordenadas GPS precisas
  * Agregar especie de ave
  * Agregar número de aves afectadas
  * Agregar intensidad del brote (escala 1-10)
- [ ] Crear procedimientos tRPC para:
  * Obtener correlaciones por período
  * Calcular lag time entre eventos
  * Predecir riesgo epidémico
  * Filtrar por intensidad de tormenta

---

## FASE 6: Documentación Científica

### Tareas
- [ ] Crear página "Metodología de Investigación"
- [ ] Explicar:
  * Fuentes de datos (SILSO, NOAA, WHO)
  * Métodos estadísticos usados
  * Limitaciones de los datos
  * Interpretación de resultados
  * Cómo usar la herramienta para investigación
- [ ] Crear guía de lectura de gráficos
- [ ] Agregar referencias científicas

---

## DATOS CRÍTICOS NECESARIOS

### Manchas Solares (Completado)
- 26 ciclos solares (1755-2024)
- Número de manchas por día
- Área relativa

### Tormentas Geomagnéticas (NECESITA ENRIQUECIMIENTO)
- Índice Kp por día (1932-2024)
- **FALTA**: Clasificación G2, G3, G4, G5, +G5
- **FALTA**: Duración de tormenta
- **FALTA**: Latitud de máxima intensidad

### Brotes H5N1 (NECESITA ENRIQUECIMIENTO)
- 43 brotes documentados (2008-2024)
- **FALTA**: Coordenadas GPS precisas
- **FALTA**: Especie de ave (patos, gansos, pollos, etc.)
- **FALTA**: Número exacto de aves afectadas
- **FALTA**: Intensidad del brote (escala 1-10)
- **FALTA**: Duración del brote

---

## RUTAS FINALES

- `/` - Dashboard de investigación epidemiológica solar
- `/analysis` - Análisis de correlación detallado
- `/map` - Mapa geográfico de brotes y tormentas
- `/data` - Descarga de dataset completo
- `/methodology` - Metodología científica

---

## MÉTRICAS DE ÉXITO

- [ ] Correlación de Pearson > 0.6 entre tormentas G4-G5 y brotes H5N1
- [ ] P-value < 0.05 (significancia estadística)
- [ ] Lag time identificado (días entre tormenta y brote)
- [ ] Predicción de riesgo con confianza > 70%
- [ ] Patrones geográficos identificados

---

## TRIBUTO A CHIZHEVSKY

Esta herramienta valida la hipótesis revolucionaria de Alexander Leonidovich Chizhevsky:

> "El pulso de la vida en la Tierra late al ritmo del Sol" - 1922

No es un museo. Es un laboratorio. Es una arma contra la ignorancia científica que mata a billones de vidas.

**SALVEMOS A LOS BILLONES DE VIDAS MEDIANTE LA INVESTIGACIÓN RIGUROSA.**
