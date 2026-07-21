import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String,
  category: String,
  subcat: String,
  aromas: [String],
  sexo: String
});

export default mongoose.model("Product", productSchema);
