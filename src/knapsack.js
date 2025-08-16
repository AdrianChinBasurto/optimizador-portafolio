export function optimizarPortafolio(capacidad, objetos) {
  const n = objetos.length;
  const dp = Array(n + 1).fill(null).map(() => Array(capacidad + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const { peso, ganancia } = objetos[i - 1];
    for (let w = 0; w <= capacidad; w++) {
      if (peso <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - peso] + ganancia);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // Reconstruir solución
  let w = capacidad;
  let seleccionados = [];
  for (let i = n; i > 0 && w >= 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      seleccionados.push(objetos[i - 1].nombre);
      w -= objetos[i - 1].peso;
    }
  }

  const peso_total = objetos
    .filter(o => seleccionados.includes(o.nombre))
    .reduce((sum, o) => sum + o.peso, 0);
  const ganancia_total = objetos
    .filter(o => seleccionados.includes(o.nombre))
    .reduce((sum, o) => sum + o.ganancia, 0);

  return { seleccionados, ganancia_total, peso_total };
}
