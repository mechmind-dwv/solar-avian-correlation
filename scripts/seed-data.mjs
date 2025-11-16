#!/usr/bin/env node
/**
 * Script para cargar datos iniciales de ciclos solares y brotes H5N1
 * Proyecto Heliobiología - En honor a Alexander Chizhevsky
 */

import { drizzle } from 'drizzle-orm/mysql2';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Conectar a la base de datos
const db = drizzle(process.env.DATABASE_URL);

console.log('='.repeat(60));
console.log('PROYECTO HELIOBIOLOGÍA - CARGA DE DATOS INICIALES');
console.log('En Honor a Alexander Leonidovich Chizhevsky (1897-1964)');
console.log('='.repeat(60));

// Cargar datos JSON
const dataDir = join(__dirname, '../../heliobiology-project/data');
const solarCyclesPath = join(dataDir, 'solar_cycles.json');
const h5n1OutbreaksPath = join(dataDir, 'h5n1_outbreaks.json');

console.log('\n📂 Cargando archivos de datos...');

let solarCyclesData, h5n1OutbreaksData;

try {
  solarCyclesData = JSON.parse(readFileSync(solarCyclesPath, 'utf-8'));
  console.log('✓ Datos de ciclos solares cargados');
  
  h5n1OutbreaksData = JSON.parse(readFileSync(h5n1OutbreaksPath, 'utf-8'));
  console.log('✓ Datos de brotes H5N1 cargados');
} catch (error) {
  console.error('❌ Error cargando archivos:', error.message);
  process.exit(1);
}

// Insertar ciclos solares
console.log('\n🌞 Insertando ciclos solares...');
const cycles = solarCyclesData.solar_cycles_complete || [];
let cyclesInserted = 0;

for (const cycle of cycles) {
  try {
    await db.execute(`
      INSERT INTO solar_cycles (
        cycle_number, start_date, end_date, duration_months, duration_years,
        maximum_date, max_sunspot_number, min_sunspot_number, amplitude,
        cycle_strength, notes, historical_events, chizhevsky_note, climate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        start_date = VALUES(start_date),
        end_date = VALUES(end_date),
        duration_months = VALUES(duration_months),
        duration_years = VALUES(duration_years),
        maximum_date = VALUES(maximum_date),
        max_sunspot_number = VALUES(max_sunspot_number),
        min_sunspot_number = VALUES(min_sunspot_number),
        amplitude = VALUES(amplitude),
        cycle_strength = VALUES(cycle_strength),
        notes = VALUES(notes),
        historical_events = VALUES(historical_events),
        chizhevsky_note = VALUES(chizhevsky_note),
        climate = VALUES(climate)
    `, [
      cycle.cycle_number,
      cycle.start_date,
      cycle.end_date || null,
      cycle.duration_months || null,
      cycle.duration_years?.toString() || null,
      cycle.maximum_date || null,
      cycle.max_sunspot_number || null,
      cycle.min_sunspot_number || null,
      cycle.amplitude || null,
      cycle.cycle_strength || null,
      cycle.notes || null,
      cycle.historical_events ? JSON.stringify(cycle.historical_events) : null,
      cycle.chizhevsky_note || null,
      cycle.climate || null
    ]);
    cyclesInserted++;
  } catch (error) {
    console.error(`❌ Error insertando ciclo ${cycle.cycle_number}:`, error.message);
  }
}

console.log(`✓ ${cyclesInserted} ciclos solares insertados/actualizados`);

// Insertar brotes H5N1
console.log('\n🦅 Insertando brotes H5N1...');
const cycle24 = h5n1OutbreaksData.outbreaks_cycle_24 || [];
const cycle25 = h5n1OutbreaksData.outbreaks_cycle_25 || [];
const allOutbreaks = [...cycle24, ...cycle25];
let outbreaksInserted = 0;

for (const outbreak of allOutbreaks) {
  try {
    await db.execute(`
      INSERT INTO h5n1_outbreaks (
        date, year, month, solar_cycle, solar_phase, region, countries,
        intensity, birds_affected, species, human_cases, human_deaths,
        kp_avg, kp_max, geomag_storm, description, source,
        chizhevsky_note, correlation, critical_event, \`exception\`
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      outbreak.date,
      outbreak.year,
      outbreak.month,
      outbreak.solar_cycle,
      outbreak.solar_phase,
      outbreak.region,
      outbreak.countries ? JSON.stringify(outbreak.countries) : null,
      outbreak.intensity,
      outbreak.birds_affected || null,
      outbreak.species ? JSON.stringify(outbreak.species) : null,
      outbreak.human_cases || 0,
      outbreak.human_deaths || 0,
      outbreak.kp_avg || null,
      outbreak.kp_max || null,
      outbreak.geomag_storm || null,
      outbreak.description,
      outbreak.source || null,
      outbreak.chizhevsky_note || null,
      outbreak.correlation ? 1 : 0,
      outbreak.critical_event ? 1 : 0,
      outbreak.exception ? 1 : 0
    ]);
    outbreaksInserted++;
  } catch (error) {
    console.error(`❌ Error insertando brote ${outbreak.date}:`, error.message);
  }
}

console.log(`✓ ${outbreaksInserted} brotes H5N1 insertados`);

// Insertar pandemias históricas
console.log('\n📜 Insertando pandemias históricas...');
const pandemics = [
  {
    name: 'Pandemia de Influenza Rusa',
    year: 1889,
    solar_cycle: 13,
    solar_phase: 'Máximo',
    sunspot_number: 146,
    deaths: 1000000,
    description: 'Primera pandemia de influenza moderna documentada. Coincide con máximo solar del Ciclo 13.',
    chizhevsky_note: 'PANDEMIA durante máximo solar + crisis económica'
  },
  {
    name: 'Gripe Española (H1N1)',
    year: 1918,
    solar_cycle: 15,
    solar_phase: 'Máximo',
    sunspot_number: 154,
    deaths: 50000000,
    description: 'La pandemia más mortífera del siglo XX. Ocurrió durante el máximo solar del Ciclo 15.',
    chizhevsky_note: 'Máximo solar + fin de Primera Guerra Mundial'
  },
  {
    name: 'Gripe Asiática (H2N2)',
    year: 1957,
    solar_cycle: 19,
    solar_phase: 'Máximo',
    sunspot_number: 285,
    deaths: 1100000,
    description: 'Pandemia durante uno de los ciclos solares más fuertes registrados (Ciclo 19).',
    chizhevsky_note: 'Ciclo solar más fuerte del siglo XX'
  },
  {
    name: 'Gripe de Hong Kong (H3N2)',
    year: 1968,
    solar_cycle: 20,
    solar_phase: 'Ascenso hacia máximo',
    sunspot_number: 156,
    deaths: 1000000,
    description: 'Pandemia durante fase ascendente del Ciclo Solar 20.',
    chizhevsky_note: 'Fase ascendente correlaciona con reactivación viral'
  },
  {
    name: 'Gripe Porcina (H1N1)',
    year: 2009,
    solar_cycle: 24,
    solar_phase: 'Mínimo extendido',
    sunspot_number: 2,
    deaths: 284500,
    description: 'ANOMALÍA: Pandemia durante mínimo solar profundo. Chizhevsky: 20% eventos pueden ocurrir fuera de máximos.',
    chizhevsky_note: 'ANOMALÍA: Pandemia durante mínimo solar. Cepa diferente (H1N1, no H5N1).'
  },
  {
    name: 'H5N1 Alta Patogenicidad',
    year: 2024,
    solar_cycle: 25,
    solar_phase: 'Máximo',
    sunspot_number: 165,
    deaths: 0,
    description: 'Pandemia aviar global sin precedentes. MÁXIMA intensidad coincide con tormenta G5 en mayo 2024.',
    chizhevsky_note: 'CONFIRMACIÓN DRAMÁTICA de Chizhevsky. Mayor brote aviar de la historia.'
  }
];

let pandemicsInserted = 0;
for (const pandemic of pandemics) {
  try {
    await db.execute(`
      INSERT INTO historical_pandemics (
        name, year, solar_cycle, solar_phase, sunspot_number,
        deaths, description, chizhevsky_note
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      pandemic.name,
      pandemic.year,
      pandemic.solar_cycle,
      pandemic.solar_phase,
      pandemic.sunspot_number,
      pandemic.deaths,
      pandemic.description,
      pandemic.chizhevsky_note
    ]);
    pandemicsInserted++;
  } catch (error) {
    console.error(`❌ Error insertando pandemia ${pandemic.name}:`, error.message);
  }
}

console.log(`✓ ${pandemicsInserted} pandemias históricas insertadas`);

console.log('\n' + '='.repeat(60));
console.log('✓ CARGA DE DATOS COMPLETADA');
console.log('='.repeat(60));
console.log(`\n📊 RESUMEN:`);
console.log(`  • Ciclos solares: ${cyclesInserted}`);
console.log(`  • Brotes H5N1: ${outbreaksInserted}`);
console.log(`  • Pandemias históricas: ${pandemicsInserted}`);
console.log(`\n🌟 "El pulso de la vida en la Tierra late al ritmo del Sol"`);
console.log(`   — Alexander Leonidovich Chizhevsky, 1922\n`);

process.exit(0);
