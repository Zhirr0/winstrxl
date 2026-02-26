// scripts/optimizeImages.mjs
import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./public/imagesHigh";
const outputDir = "./public/imagesOptimized";

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const files = fs
  .readdirSync(inputDir)
  .filter((f) => /\.(jpg|jpeg|png)$/i.test(f));

for (const file of files) {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(
    outputDir,
    file.replace(/\.(jpg|jpeg|png)$/i, ".webp"),
  );

  await sharp(inputPath)
    .resize({ width: 900, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPath);

  console.log(`done: ${file}`);
}
