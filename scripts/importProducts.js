const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Purabelleza:5728@purabelleza.80f9wbh.mongodb.net/pura_belleza");

// ===== IMPORTAR CATALOGO =====
const catalog = require("./catalog.js");

// ===== MISMA LOGICA (igual que React) =====
const toItem = (p, forcedCategory = "") => {
  const category = forcedCategory || p.category || "";

  let sexo = "";
  const img = p.img || "";
  if (category === "perfumeria") {
    if (img.includes("/perfumeria/femenina/")) sexo = "femenina";
    if (img.includes("/perfumeria/masculina/")) sexo = "masculina";
  }

  const aromas = Array.isArray(p.aromas) && p.aromas.length
    ? p.aromas.slice(0, 3).join(", ")
    : "";

  const desc = [p.subcat || "", aromas ? `Aromas: ${aromas}` : ""]
    .filter(Boolean)
    .join(" • ");

  return {
    id: String(p.id),
    name: p.name,
    category,
    sexo,
    price: p.price,
    img: p.img.replace(/^.*img/, "/img"),
    desc: desc || "Producto Natura",
  };
};

// ===== ARMAR PRODUCTS =====
const products = [
  ...catalog.productosPerfumeria.map((p) => toItem(p, "perfumeria")),
  ...catalog.productosCuidados.map((p) => toItem(p, "cuidados")),
  ...catalog.productosMaquillaje.map((p) => toItem(p, "maquillaje")),
  ...catalog.productosRegalos.map((p) => toItem(p, "regalos")),
];

// ===== MONGOOSE =====
const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  category: String,
  sexo: String,
  price: Number,
  img: String,
  desc: String,
});

const Product = mongoose.model("Product", productSchema);

// ===== IMPORTACION =====
const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("💣 Productos reales importados");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
