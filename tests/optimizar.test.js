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

describe("Pruebas de /optimizar", () => {
  test("Caso de éxito 1", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/optimizar")
      .send({
        capacidad: 11000,
        objetos: [
          { nombre: "Fondo_A", peso: 2000, ganancia: 1500 },
          { nombre: "Fondo_B", peso: 4000, ganancia: 3500 },
          { nombre: "Fondo_C", peso: 5000, ganancia: 4000 },
          { nombre: "Fondo_D", peso: 3000, ganancia: 2500 },
          { nombre: "Fondo_E", peso: 1500, ganancia: 1800 }
        ]
      });
    expect(res.status).toBe(200);
    expect(res.body.ganancia_total).toBe(9300);
    expect(res.body.peso_total).toBe(11000);
    expect(new Set(res.body.seleccionados))
      .toEqual(new Set(["Fondo_B", "Fondo_C", "Fondo_E"]));
  });

  test("Capacidad 0 => no selecciona nada", () => {
    const r = optimizarPortafolio(0, [
      { nombre: "X", peso: 1, ganancia: 100 }
    ]);
    expect(r.ganancia_total).toBe(0);
    expect(r.peso_total).toBe(0);
    expect(r.seleccionados).toEqual([]);
  });

  test("Error si datos son inválidos", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/optimizar")
      .send({
        capacidad: -5,
        objetos: []
      });
    expect(res.status).toBe(400);
  });
});
