import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, basename } from "path";
import { JSDOM } from "jsdom";

// Set up DOM environment for @excalidraw/utils
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;
global.Element = dom.window.Element;
global.DOMParser = dom.window.DOMParser;
global.XMLSerializer = dom.window.XMLSerializer;

const { exportToSvg } = await import("@excalidraw/utils");

const diagramsDir = join(import.meta.dirname, "..", "diagrams");
const outputDir = join(import.meta.dirname, "..", "src", "assets", "diagrams");

const files = readdirSync(diagramsDir).filter(f => f.endsWith(".excalidraw"));

for (const file of files) {
  const name = basename(file, ".excalidraw");
  const data = JSON.parse(readFileSync(join(diagramsDir, file), "utf-8"));

  try {
    const svg = await exportToSvg({
      elements: data.elements,
      appState: {
        ...data.appState,
        exportWithDarkMode: false,
        exportBackground: true,
      },
      files: data.files || {},
    });

    const svgString = svg.outerHTML || new XMLSerializer().serializeToString(svg);
    writeFileSync(join(outputDir, `${name}.svg`), svgString);
    console.log(`Exported ${name}.svg`);
  } catch (err) {
    console.error(`Failed ${name}: ${err.message}`);
  }
}
