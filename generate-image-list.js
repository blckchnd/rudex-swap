import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, 'public/assets/images/icons/coins-icons');
const outputFile = path.join(__dirname, 'src/components/utils/imageList.json');

const images = fs
  .readdirSync(iconsDir)
  .filter((file) => /\.(png|svg|jpg|jpeg)$/i.test(file))
  .map((file) => {
    const name = path.basename(file, path.extname(file)).toUpperCase();
    const src = `/assets/images/icons/coins-icons/${file}`;
    return { name, src };
  });

const fileContent = JSON.stringify(images, null, 2);

fs.writeFileSync(outputFile, fileContent);

console.log(`Image list saved to ${outputFile}`);
