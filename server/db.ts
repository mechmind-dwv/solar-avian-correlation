import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, h5n1MapOutbreaks } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Queries para ciclos solares
export async function getAllSolarCycles() {
  const db = await getDb();
  if (!db) return [];
  
  const { solarCycles } = await import('../drizzle/schema');
  return await db.select().from(solarCycles).orderBy(solarCycles.cycleNumber);
}

export async function getSolarCycleByNumber(cycleNumber: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const { solarCycles } = await import('../drizzle/schema');
  const result = await db.select().from(solarCycles)
    .where(eq(solarCycles.cycleNumber, cycleNumber))
    .limit(1);
  return result[0];
}

// Queries para brotes H5N1
export async function getAllH5N1Outbreaks() {
  const db = await getDb();
  if (!db) return [];
  
  const { h5n1Outbreaks } = await import('../drizzle/schema');
  return await db.select().from(h5n1Outbreaks).orderBy(h5n1Outbreaks.date);
}

export async function getH5N1OutbreaksByCycle(cycleNumber: number) {
  const db = await getDb();
  if (!db) return [];
  
  const { h5n1Outbreaks } = await import('../drizzle/schema');
  return await db.select().from(h5n1Outbreaks)
    .where(eq(h5n1Outbreaks.solarCycle, cycleNumber))
    .orderBy(h5n1Outbreaks.date);
}

export async function getH5N1Correlations() {
  const db = await getDb();
  if (!db) return [];
  
  const { h5n1Outbreaks } = await import('../drizzle/schema');
  return await db.select().from(h5n1Outbreaks)
    .where(eq(h5n1Outbreaks.correlation, 1))
    .orderBy(h5n1Outbreaks.date);
}

// Queries para pandemias históricas
export async function getAllHistoricalPandemics() {
  const db = await getDb();
  if (!db) return [];
  
  const { historicalPandemics } = await import('../drizzle/schema');
  return await db.select().from(historicalPandemics).orderBy(historicalPandemics.year);
}

// Función para insertar datos masivos
export async function insertSolarCycles(cycles: any[]) {
  const db = await getDb();
  if (!db) return 0;
  
  const { solarCycles } = await import('../drizzle/schema');
  let inserted = 0;
  
  for (const cycle of cycles) {
    try {
      await db.insert(solarCycles).values({
        cycleNumber: cycle.cycle_number,
        startDate: cycle.start_date,
        endDate: cycle.end_date || null,
        durationMonths: cycle.duration_months || null,
        durationYears: cycle.duration_years?.toString() || null,
        maximumDate: cycle.maximum_date || null,
        maxSunspotNumber: cycle.max_sunspot_number || null,
        minSunspotNumber: cycle.min_sunspot_number || null,
        amplitude: cycle.amplitude || null,
        cycleStrength: cycle.cycle_strength || null,
        notes: cycle.notes || null,
        historicalEvents: cycle.historical_events ? JSON.stringify(cycle.historical_events) : null,
        chizhevskyNote: cycle.chizhevsky_note || null,
        climate: cycle.climate || null,
      }).onDuplicateKeyUpdate({
        set: {
          startDate: cycle.start_date,
          endDate: cycle.end_date || null,
          durationMonths: cycle.duration_months || null,
        }
      });
      inserted++;
    } catch (error) {
      console.error(`Error inserting cycle ${cycle.cycle_number}:`, error);
    }
  }
  
  return inserted;
}

export async function insertH5N1Outbreaks(outbreaks: any[]) {
  const db = await getDb();
  if (!db) return 0;
  
  const { h5n1Outbreaks } = await import('../drizzle/schema');
  let inserted = 0;
  
  for (const outbreak of outbreaks) {
    try {
      await db.insert(h5n1Outbreaks).values({
        date: outbreak.date,
        year: outbreak.year,
        month: outbreak.month,
        solarCycle: outbreak.solar_cycle,
        solarPhase: outbreak.solar_phase,
        region: outbreak.region,
        countries: outbreak.countries ? JSON.stringify(outbreak.countries) : null,
        intensity: outbreak.intensity,
        birdsAffected: outbreak.birds_affected || null,
        species: outbreak.species ? JSON.stringify(outbreak.species) : null,
        humanCases: outbreak.human_cases || 0,
        humanDeaths: outbreak.human_deaths || 0,
        kpAvg: outbreak.kp_avg || null,
        kpMax: outbreak.kp_max || null,
        geomagStorm: outbreak.geomag_storm || null,
        description: outbreak.description,
        source: outbreak.source || null,
        chizhevskyNote: outbreak.chizhevsky_note || null,
        correlation: outbreak.correlation ? 1 : 0,
        criticalEvent: outbreak.critical_event ? 1 : 0,
        exception: outbreak.exception ? 1 : 0,
      });
      inserted++;
    } catch (error) {
      console.error(`Error inserting outbreak ${outbreak.date}:`, error);
    }
  }
  
  return inserted;
}

export async function insertHistoricalPandemics(pandemics: any[]) {
  const db = await getDb();
  if (!db) return 0;
  
  const { historicalPandemics } = await import('../drizzle/schema');
  let inserted = 0;
  
  for (const pandemic of pandemics) {
    try {
      await db.insert(historicalPandemics).values({
        name: pandemic.name,
        year: pandemic.year,
        solarCycle: pandemic.solar_cycle || null,
        solarPhase: pandemic.solar_phase || null,
        sunspotNumber: pandemic.sunspot_number || null,
        deaths: pandemic.deaths || null,
        description: pandemic.description || null,
        chizhevskyNote: pandemic.chizhevsky_note || null,
      });
      inserted++;
    } catch (error) {
      console.error(`Error inserting pandemic ${pandemic.name}:`, error);
    }
  }
  
  return inserted;
}


// Queries para brotes H5N1 con coordenadas GPS (para mapa)
export async function getH5N1MapOutbreaks() {
  const db = await getDb();
  if (!db) return [];
  
  try {
    return await db.select().from(h5n1MapOutbreaks).orderBy(h5n1MapOutbreaks.date);
  } catch (error) {
    console.error("[Database] Error fetching H5N1 map outbreaks:", error);
    return [];
  }
}

export async function getH5N1MapOutbreaksByCountry(country: string) {
  const db = await getDb();
  if (!db) return [];
  
  try {
    return await db.select().from(h5n1MapOutbreaks)
      .where(eq(h5n1MapOutbreaks.country, country))
      .orderBy(h5n1MapOutbreaks.date);
  } catch (error) {
    console.error("[Database] Error fetching outbreaks by country:", error);
    return [];
  }
}

export async function getH5N1MapOutbreaksByType(type: string) {
  const db = await getDb();
  if (!db) return [];
  
  try {
    return await db.select().from(h5n1MapOutbreaks)
      .where(eq(h5n1MapOutbreaks.outbreakType, type))
      .orderBy(h5n1MapOutbreaks.date);
  } catch (error) {
    console.error("[Database] Error fetching outbreaks by type:", error);
    return [];
  }
}

export async function getH5N1MapOutbreaksByDateRange(startDate: string, endDate: string) {
  const db = await getDb();
  if (!db) return [];
  
  try {
    return await db.select().from(h5n1MapOutbreaks)
      .where(
        sql`${h5n1MapOutbreaks.date} >= ${startDate} AND ${h5n1MapOutbreaks.date} <= ${endDate}`
      )
      .orderBy(h5n1MapOutbreaks.date);
  } catch (error) {
    console.error("[Database] Error fetching outbreaks by date range:", error);
    return [];
  }
}
