import path from "path";
import fs from "fs";
import { assets } from "../src/lib/config.js";

function throughDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        const abs = path.join(dir, file);
        if (fs.statSync(abs).isDirectory()) return throughDirectory(abs);
        else return files.push(abs.replaceAll("\\", "/"));
    });
}

// Find the json data files to delete in the build/data folder
let files  = [];
throughDirectory("./build/");
let codes = files.filter(file => file.slice(-10) === "index.html")
  .map(file => file.split("/")[1])
  .filter(code => code.length == 9);
codes.unshift("");
let date = (new Date()).toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${codes.map(code => `<url>
<loc>${assets}/${code ? `${code}/` : ""}</loc>
<lastmod>${date}</lastmod>
<changefreq>monthly</changefreq>
<priority>1.0</priority>
</url>`).join("\n")}
</urlset>`;

fs.writeFileSync("./build/sitemap.xml", xml);
console.log(`Wrote sitemap.xml with ${codes.length} urls...`);