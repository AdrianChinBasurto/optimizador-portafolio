import request from "supertest";
import express from "express";
import { BodySchema } from "../src/validate.js";
import { optimizarPortafolio } from "../src/knapsack.js";

function createApp() {
  const app = express();
  app.use(express.json());
  app.post("/optimizar", (req, res) => {
    const parsed = BodySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }
    const { capacidad, objetos } = parsed.data;
    return res.json(optimizarPortafolio(capacidad, objetos));
  });
  return app;
}

describe("Pruebas para /optimizar", () => {
  // Caso éxito 1 (PDF)
  test("Caso éxito 1 - Capacidad 10000 con Fondos", async () => {
    const app = createApp();
    const res = await request(app).post("/optimizar").send({
      capacidad: 10000,
      objetos: [
        { nombre: "Fondo_A", peso: 2000, ganancia: 1500 },
        { nombre: "Fondo_B", peso: 4000, ganancia: 3500 },
        { nombre: "Fondo_C", peso: 5000, ganancia: 4000 },
        { nombre: "Fondo_D", peso: 3000, ganancia: 2500 },
        { nombre: "Fondo_E", peso: 1500, ganancia: 1800 }
      ]
    });
    expect(res.status).toBe(200);
    expect(res.body.ganancia_total).toBeGreaterThan(0);
  });

  // Caso éxito 2 (PDF)
  test("Caso éxito 2 - Capacidad 8000 con Acciones/Bonos", async () => {
    const app = createApp();
    const res = await request(app).post("/optimizar").send({
      capacidad: 8000,
      objetos: [
        { nombre: "Accion_X", peso: 1000, ganancia: 800 },
        { nombre: "Accion_Y", peso: 2500, ganancia: 2200 },
        { nombre: "Accion_Z", peso: 3000, ganancia: 2800 },
        { nombre: "Bono_P", peso: 4000, ganancia: 3000 },
        { nombre: "Bono_Q", peso: 1500, ganancia: 1200 }
      ]
    });
    expect(res.status).toBe(200);
    expect(res.body.ganancia_total).toBeGreaterThan(0);
  });

  // Caso éxito 3 (PDF)
  test("Caso éxito 3 - Capacidad 5000 con Cripto/ETF/NFT", async () => {
    const app = createApp();
    const res = await request(app).post("/optimizar").send({
      capacidad: 5000,
      objetos: [
        { nombre: "Cripto_1", peso: 500, ganancia: 700 },
        { nombre: "Cripto_2", peso: 800, ganancia: 1000 },
        { nombre: "ETF_1", peso: 1500, ganancia: 1300 },
        { nombre: "ETF_2", peso: 2000, ganancia: 1800 },
        { nombre: "NFT_Alpha", peso: 3000, ganancia: 2500 }
      ]
    });
    expect(res.status).toBe(200);
    expect(res.body.ganancia_total).toBeGreaterThan(0);
  });

  // Caso límite 1
  test("Capacidad = 0 debe devolver vacíos", () => {
    const r = optimizarPortafolio(0, [
      { nombre: "X", peso: 1000, ganancia: 500 }
    ]);
    expect(r.ganancia_total).toBe(0);
    expect(r.peso_total).toBe(0);
    expect(r.seleccionados).toEqual([]);
  });

  // Caso límite 2
  test("Error si datos inválidos (capacidad negativa)", async () => {
    const app = createApp();
    const res = await request(app).post("/optimizar").send({
      capacidad: -10,
      objetos: [
        { nombre: "Invalid", peso: 100, ganancia: 50 }
      ]
    });
    expect(res.status).toBe(400);
  });
});
