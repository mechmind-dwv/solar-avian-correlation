import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Ciclos solares históricos desde 1755
 * Basado en datos de SILSO (Sunspot Index and Long-term Solar Observations)
 */
export const solarCycles = mysqlTable("solar_cycles", {
  id: int("id").autoincrement().primaryKey(),
  cycleNumber: int("cycle_number").notNull().unique(),
  startDate: varchar("start_date", { length: 10 }).notNull(),
  endDate: varchar("end_date", { length: 10 }),
  durationMonths: int("duration_months"),
  durationYears: varchar("duration_years", { length: 10 }),
  maximumDate: varchar("maximum_date", { length: 10 }),
  maxSunspotNumber: int("max_sunspot_number"),
  minSunspotNumber: int("min_sunspot_number"),
  amplitude: int("amplitude"),
  cycleStrength: varchar("cycle_strength", { length: 50 }),
  notes: text("notes"),
  historicalEvents: text("historical_events"), // JSON array
  chizhevskyNote: text("chizhevsky_note"),
  climate: text("climate"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SolarCycle = typeof solarCycles.$inferSelect;
export type InsertSolarCycle = typeof solarCycles.$inferInsert;

/**
 * Brotes de H5N1 (Gripe Aviar) correlacionados con actividad solar
 * Período: 2008-2024 (Ciclos Solares 24 y 25)
 */
export const h5n1Outbreaks = mysqlTable("h5n1_outbreaks", {
  id: int("id").autoincrement().primaryKey(),
  date: varchar("date", { length: 10 }).notNull(),
  year: int("year").notNull(),
  month: int("month").notNull(),
  solarCycle: int("solar_cycle").notNull(),
  solarPhase: varchar("solar_phase", { length: 50 }).notNull(),
  region: varchar("region", { length: 100 }).notNull(),
  countries: text("countries"), // JSON array
  intensity: int("intensity").notNull(),
  birdsAffected: int("birds_affected"),
  species: text("species"), // JSON array
  humanCases: int("human_cases").default(0),
  humanDeaths: int("human_deaths").default(0),
  kpAvg: int("kp_avg"),
  kpMax: int("kp_max"),
  geomagStorm: varchar("geomag_storm", { length: 200 }),
  description: text("description").notNull(),
  source: varchar("source", { length: 200 }),
  chizhevskyNote: text("chizhevsky_note"),
  correlation: int("correlation").default(0), // boolean as int
  criticalEvent: int("critical_event").default(0), // boolean as int
  exception: int("exception").default(0), // boolean as int
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type H5N1Outbreak = typeof h5n1Outbreaks.$inferSelect;
export type InsertH5N1Outbreak = typeof h5n1Outbreaks.$inferInsert;

/**
 * Pandemias históricas para análisis comparativo
 */
export const historicalPandemics = mysqlTable("historical_pandemics", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  year: int("year").notNull(),
  solarCycle: int("solar_cycle"),
  solarPhase: varchar("solar_phase", { length: 50 }),
  sunspotNumber: int("sunspot_number"),
  deaths: int("deaths"),
  description: text("description"),
  chizhevskyNote: text("chizhevsky_note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type HistoricalPandemic = typeof historicalPandemics.$inferSelect;
export type InsertHistoricalPandemic = typeof historicalPandemics.$inferInsert;


/**
 * Brotes H5N1 con coordenadas geográficas para visualización en mapa
 * Datos históricos desde 1997 de OMS, FAO y EMPRES-i
 */
export const h5n1MapOutbreaks = mysqlTable("h5n1_map_outbreaks", {
  id: int("id").autoincrement().primaryKey(),
  country: varchar("country", { length: 100 }).notNull(),
  date: varchar("date", { length: 10 }).notNull(),
  cases: int("cases").default(0),
  latitude: varchar("latitude", { length: 20 }).notNull(),
  longitude: varchar("longitude", { length: 20 }).notNull(),
  intensity: int("intensity").notNull(), // 1-10 scale
  species: varchar("species", { length: 200 }),
  outbreakType: varchar("outbreak_type", { length: 50 }).notNull(), // 'Human' or 'Animal'
  source: varchar("source", { length: 200 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type H5N1MapOutbreak = typeof h5n1MapOutbreaks.$inferSelect;
export type InsertH5N1MapOutbreak = typeof h5n1MapOutbreaks.$inferInsert;
