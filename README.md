# Microservicio de Optimización de Portafolio

Proyecto desarrollado como parte del examen de **Arquitectura de Software**, que implementa un **microservicio** para optimizar la selección de inversiones/proyectos con **restricción presupuestaria**, usando **programación dinámica (mochila 0/1)**.

---

## Tecnologías utilizadas
- **Node.js** + **Express**
- **Zod** (validación de datos)
- **Swagger UI** (documentación de API)
- **HTML / CSS / JavaScript** (frontend)
- **Jest** + **Supertest** (pruebas)
- **Docker** (empaquetado opcional)

---

## Estructura del proyecto
```
optimizador-portafolio/
├─ src/
│  ├─ index.js          # Servidor Express + endpoint /optimizar
│  ├─ knapsack.js       # Algoritmo de optimización
│  ├─ validate.js       # Validación con Zod
│  └─ openapi.yaml      # Documentación OpenAPI
├─ public/
│  ├─ index.html        # Interfaz web
│  ├─ app.js            # Lógica frontend
│  └─ styles.css        # Estilos
├─ tests/
│  └─ optimizar.test.js # Pruebas Jest/Supertest
├─ Dockerfile           # Configuración para contenedor
├─ .dockerignore        # Exclusiones de Docker
└─ package.json
```

---

## Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/AdrianChinBasurto/optimizador-portafolio.git
cd optimizador-portafolio
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en modo desarrollo
```bash
npm run dev
```

### 4. Ejecutar en modo producción
```bash
npm start
```

El servidor se levantará en:
```
http://localhost:3000
```

---

## Uso del microservicio

### Endpoint: **POST /optimizar**
- **Descripción:** Calcula la combinación óptima de proyectos que maximiza la ganancia sin superar la capacidad.
- **Entrada (JSON):**
```json
{
  "capacidad": 10000,
  "objetos": [
    { "nombre": "A", "peso": 2000, "ganancia": 1500 },
    { "nombre": "B", "peso": 4000, "ganancia": 3500 },
    { "nombre": "C", "peso": 5000, "ganancia": 4000 },
    { "nombre": "D", "peso": 3000, "ganancia": 2500 }
  ]
}
```
- **Salida (JSON):**
```json
{
  "seleccionados": ["C", "B"],
  "ganancia_total": 7500,
  "peso_total": 9000
}
```

---

## Frontend
- Abre en el navegador:
```
http://localhost:3000
```
- Permite:
  - Ingresar capacidad
  - Agregar/eliminar proyectos
  - Calcular resultados
  - Limpiar formulario
  - Ver resultados en tabla

---

## Documentación de API
Swagger disponible en:
```
http://localhost:3000/docs
```

---

## Pruebas
Ejecutar pruebas:
```bash
npm test
```
Incluye:
- Casos de éxito (PDF + casos corregidos)
- Casos límite (capacidad 0, lista vacía, datos inválidos)

---

## Docker 

Docker (obligatorio para entrega)
1. Construir imagen
Always show details
docker build -t optimizador-portafolio .

2. Ejecutar contenedor
Always show details
docker run --rm -p 3000:3000 optimizador-portafolio

3. Probar API con curl
Always show details
curl -X POST http://localhost:3000/optimizar \
  -H "Content-Type: application/json" \
  -d '{
    "capacidad": 10000,
    "objetos": [
      { "nombre": "A", "peso": 2000, "ganancia": 1500 },
      { "nombre": "B", "peso": 4000, "ganancia": 3500 },
      { "nombre": "C", "peso": 5000, "ganancia": 4000 },
      { "nombre": "D", "peso": 3000, "ganancia": 2500 }
    ]
  }'