import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Routers para datos de heliobiología
  heliobiology: router({
    // Obtener todos los ciclos solares
    getAllSolarCycles: publicProcedure.query(async () => {
      const { getAllSolarCycles } = await import('./db');
      return await getAllSolarCycles();
    }),
    
    // Obtener todos los brotes H5N1
    getAllH5N1Outbreaks: publicProcedure.query(async () => {
      const { getAllH5N1Outbreaks } = await import('./db');
      return await getAllH5N1Outbreaks();
    }),
    
    // Obtener brotes H5N1 por ciclo solar
    getH5N1OutbreaksByCycle: publicProcedure
      .input((input: unknown) => {
        if (typeof input !== 'number') throw new Error('Cycle number must be a number');
        return input;
      })
      .query(async ({ input }) => {
        const { getH5N1OutbreaksByCycle } = await import('./db');
        return await getH5N1OutbreaksByCycle(input);
      }),
    
    // Obtener correlaciones H5N1
    getH5N1Correlations: publicProcedure.query(async () => {
      const { getH5N1Correlations } = await import('./db');
      return await getH5N1Correlations();
    }),
    
    // Obtener pandemias históricas
    getAllHistoricalPandemics: publicProcedure.query(async () => {
      const { getAllHistoricalPandemics } = await import('./db');
      return await getAllHistoricalPandemics();
    }),
    
    // Obtener estadísticas globales
    getGlobalStats: publicProcedure.query(async () => {
      const { getAllSolarCycles, getAllH5N1Outbreaks, getH5N1Correlations } = await import('./db');
      
      const cycles = await getAllSolarCycles();
      const outbreaks = await getAllH5N1Outbreaks();
      const correlations = await getH5N1Correlations();
      
      const criticalEvents = outbreaks.filter(o => o.criticalEvent === 1).length;
      const stormsCount = outbreaks.filter(o => o.geomagStorm).length;
      
      return {
        totalCycles: cycles.length,
        totalOutbreaks: outbreaks.length,
        totalCorrelations: correlations.length,
        criticalEvents,
        stormsCount,
        cycle24Outbreaks: outbreaks.filter(o => o.solarCycle === 24).length,
        cycle25Outbreaks: outbreaks.filter(o => o.solarCycle === 25).length,
      };
    }),
    
    // Cargar datos iniciales (solo para desarrollo)
    loadInitialData: publicProcedure.mutation(async () => {
      const { insertSolarCycles, insertH5N1Outbreaks, insertHistoricalPandemics } = await import('./db');
      const { readFileSync } = await import('fs');
      const { join } = await import('path');
      
      try {
        // Cargar datos desde archivos JSON
        const dataDir = join(process.cwd(), '../heliobiology-project/data');
        const solarCyclesData = JSON.parse(readFileSync(join(dataDir, 'solar_cycles.json'), 'utf-8'));
        const h5n1OutbreaksData = JSON.parse(readFileSync(join(dataDir, 'h5n1_outbreaks.json'), 'utf-8'));
        
        // Insertar ciclos solares
        const cyclesInserted = await insertSolarCycles(solarCyclesData.solar_cycles_complete || []);
        
        // Insertar brotes H5N1
        const cycle24 = h5n1OutbreaksData.outbreaks_cycle_24 || [];
        const cycle25 = h5n1OutbreaksData.outbreaks_cycle_25 || [];
        const outbreaksInserted = await insertH5N1Outbreaks([...cycle24, ...cycle25]);
        
        // Insertar pandemias históricas
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
        
        const pandemicsInserted = await insertHistoricalPandemics(pandemics);
        
        return {
          success: true,
          cyclesInserted,
          outbreaksInserted,
          pandemicsInserted,
        };
      } catch (error: any) {
        return {
          success: false,
          error: error.message,
        };
      }
    }),
  }),

  // H5N1 Map Research Router - Consultas para visualización en mapa
  h5n1Map: router({
    getMapOutbreaks: publicProcedure.query(async () => {
      const { getH5N1MapOutbreaks } = await import('./db');
      return await getH5N1MapOutbreaks();
    }),
    
    getOutbreaksByCountry: publicProcedure
      .input((input: unknown) => {
        if (typeof input !== 'string') throw new Error('Country must be a string');
        return input;
      })
      .query(async ({ input }) => {
        const { getH5N1MapOutbreaksByCountry } = await import('./db');
        return await getH5N1MapOutbreaksByCountry(input);
      }),
    
    getOutbreaksByType: publicProcedure
      .input((input: unknown) => {
        if (typeof input !== 'string') throw new Error('Type must be a string');
        return input;
      })
      .query(async ({ input }) => {
        const { getH5N1MapOutbreaksByType } = await import('./db');
        return await getH5N1MapOutbreaksByType(input);
      }),
    
    getOutbreaksByDateRange: publicProcedure
      .input((input: unknown) => {
        if (typeof input === 'object' && input !== null && 'startDate' in input && 'endDate' in input) {
          return input as { startDate: string; endDate: string };
        }
        throw new Error('Must provide startDate and endDate');
      })
      .query(async ({ input }) => {
        const { getH5N1MapOutbreaksByDateRange } = await import('./db');
        return await getH5N1MapOutbreaksByDateRange(input.startDate, input.endDate);
      }),
  }),
});

export type AppRouter = typeof appRouter;
