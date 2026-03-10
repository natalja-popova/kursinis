import mongoose from "mongoose";
const schema = mongoose.Schema({
  id: { type: String, required: true },
  albumName: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
});
export default mongoose.model("Album", schema);
