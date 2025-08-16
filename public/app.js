const itemsDiv = document.getElementById("items");
const btnAdd = document.getElementById("btnAdd");
const btnClear = document.getElementById("btnClear");
const btnCalc = document.getElementById("btnCalc");

function addRow(nombre="", peso="", ganancia="") {
  const row = document.createElement("div");
  row.className = "item-row";
  row.innerHTML = `
    <input type="text" placeholder="ID" value="${nombre}">
    <input type="number" min="0" placeholder="Costo" value="${peso}">
    <input type="number" min="0" placeholder="Ganancia" value="${ganancia}">
    <button class="rm">Eliminar</button>
  `;
  row.querySelector(".rm").onclick = () => row.remove();
  itemsDiv.appendChild(row);
}

btnAdd.onclick = () => addRow();
btnClear.onclick = () => {
  document.getElementById("capacidad").value = 0;
  itemsDiv.innerHTML = "";
  document.getElementById("resultado").hidden = true;
};

btnCalc.onclick = async () => {
  const capacidad = Number(document.getElementById("capacidad").value);
  const objetos = [...document.querySelectorAll(".item-row")].map(r => {
    const [n, p, g] = r.querySelectorAll("input");
    return { nombre: n.value.trim(), peso: Number(p.value), ganancia: Number(g.value) };
  });

  try {
    const resp = await fetch("/optimizar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ capacidad, objetos })
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error("Error al calcular");

    document.getElementById("sel").textContent = data.seleccionados.join(", ");
    document.getElementById("gan").textContent = data.ganancia_total;
    document.getElementById("pes").textContent = data.peso_total;
    document.getElementById("resultado").hidden = false;
  } catch (e) {
    alert("Error: " + e.message);
  }
};

// Precargar ejemplo
addRow("A", 2000, 1500);
addRow("B", 4000, 3500);
addRow("C", 5000, 4000);
addRow("D", 3000, 2500);
document.getElementById("capacidad").value = 10000;
