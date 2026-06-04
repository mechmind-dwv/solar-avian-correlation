#!/usr/bin/env node
/**
 * Script para importar datos históricos de H5N1 en TiDB (base de datos Manus)
 * Carga 487 registros de brotes humanos y en animales con coordenadas GPS
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Usar DATABASE_URL del entorno (configurado por Manus)
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('✗ DATABASE_URL no está configurada');
  process.exit(1);
}

async function importH5N1Data() {
  console.log('\n' + '='.repeat(70));
  console.log('IMPORTANDO REGISTROS DE BROTES H5N1 A TIDB');
  console.log('='.repeat(70) + '\n');

  let connection;
  try {
    // Conectar a TiDB
    connection = await mysql.createConnection(DATABASE_URL);
    console.log('✓ Conectado a TiDB (base de datos Manus)\n');

    // Leer datos combinados
    const dataPath = path.join(__dirname, './h5n1_combined_data.json');
    
    if (!fs.existsSync(dataPath)) {
      console.error(`✗ Archivo de datos no encontrado: ${dataPath}`);
      process.exit(1);
    }

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    console.log(`📊 Datos cargados: ${data.human_outbreaks.length} brotes humanos + ${data.animal_outbreaks.length} brotes en animales\n`);

    // Verificar que la tabla existe
    try {
      await connection.execute('SELECT COUNT(*) FROM h5n1_map_outbreaks LIMIT 1');
      console.log('✓ Tabla h5n1_map_outbreaks verificada\n');
    } catch (err) {
      console.error('✗ Tabla h5n1_map_outbreaks no existe. Ejecuta: pnpm db:push');
      process.exit(1);
    }

    // Limpiar datos anteriores
    console.log('Limpiando datos anteriores...');
    await connection.execute('TRUNCATE TABLE h5n1_map_outbreaks');
    console.log('✓ Tabla limpiada\n');

    // Importar brotes humanos
    console.log(`Importando ${data.human_outbreaks.length} brotes humanos...`);
    let humanCount = 0;

    for (const outbreak of data.human_outbreaks) {
      try {
        const query = `
          INSERT INTO h5n1_map_outbreaks 
          (country, date, cases, latitude, longitude, intensity, species, outbreak_type, source)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await connection.execute(query, [
          outbreak.country,
          outbreak.date,
          outbreak.cases,
          outbreak.latitude,
          outbreak.longitude,
          outbreak.intensity,
          outbreak.species,
          'Human',
          outbreak.source,
        ]);
        humanCount++;
      } catch (err) {
        console.warn(`⚠️  Error importando brote humano en ${outbreak.country}`);
      }
    }

    console.log(`✓ ${humanCount} brotes humanos importados\n`);

    // Importar brotes en animales
    console.log(`Importando ${data.animal_outbreaks.length} brotes en animales...`);
    let animalCount = 0;

    for (const outbreak of data.animal_outbreaks) {
      try {
        const query = `
          INSERT INTO h5n1_map_outbreaks 
          (country, date, cases, latitude, longitude, intensity, species, outbreak_type, source)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await connection.execute(query, [
          outbreak.country,
          outbreak.date,
          outbreak.birds_affected,
          outbreak.latitude,
          outbreak.longitude,
          outbreak.intensity,
          outbreak.species,
          'Animal',
          outbreak.source,
        ]);
        animalCount++;
      } catch (err) {
        console.warn(`⚠️  Error importando brote animal en ${outbreak.country}`);
      }
    }

    console.log(`✓ ${animalCount} brotes en animales importados\n`);

    // Obtener estadísticas
    const [stats] = await connection.execute(`
      SELECT 
        COUNT(*) as total_outbreaks,
        COUNT(DISTINCT country) as countries,
        SUM(cases) as total_cases,
        MIN(date) as earliest_date,
        MAX(date) as latest_date,
        AVG(intensity) as avg_intensity,
        COUNT(CASE WHEN outbreak_type = 'Human' THEN 1 END) as human_outbreaks,
        COUNT(CASE WHEN outbreak_type = 'Animal' THEN 1 END) as animal_outbreaks
      FROM h5n1_map_outbreaks
    `);

    console.log('='.repeat(70));
    console.log('📈 ESTADÍSTICAS DE IMPORTACIÓN');
    console.log('='.repeat(70));
    console.log(`Total de brotes:        ${stats[0].total_outbreaks}`);
    console.log(`Brotes humanos:         ${stats[0].human_outbreaks}`);
    console.log(`Brotes en animales:     ${stats[0].animal_outbreaks}`);
    console.log(`Países cubiertos:       ${stats[0].countries}`);
    console.log(`Total de casos:         ${stats[0].total_cases}`);
    console.log(`Rango de fechas:        ${stats[0].earliest_date} a ${stats[0].latest_date}`);
    console.log(`Intensidad promedio:    ${parseFloat(stats[0].avg_intensity).toFixed(2)}`);
    console.log('='.repeat(70) + '\n');

    console.log('✅ IMPORTACIÓN COMPLETADA EXITOSAMENTE\n');
    console.log('La herramienta de investigación epidemiológica solar está lista.');
    console.log('Accede a /map para visualizar todos los brotes en el mapa interactivo.\n');

  } catch (error) {
    console.error('✗ Error durante la importación:', error.message);
    if (error.code === 'ER_NO_SUCH_TABLE') {
      console.error('\n⚠️  La tabla h5n1_map_outbreaks no existe.');
      console.error('Ejecuta: pnpm db:push');
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('✓ Conexión cerrada');
    }
  }
}

// Ejecutar
importH5N1Data().catch(console.error);
