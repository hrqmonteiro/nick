import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const imagePath = req.query.slug.join("/");
  const filePath = path.resolve(".", `public/uploads/products/${imagePath}`);
  const imageBuffer = fs.readFileSync(filePath);
  res.setHeader("Content-Type", "image/jpg");
  return res.send(imageBuffer);
}