# Skill: Escáner y Modelador de Catálogo Millanel

## Objetivo
Escanear los archivos (PDF, imágenes o textos) ubicados en la carpeta `catalogo-input/` y transformarlos en un archivo estructurado `src/data/perfumes.js`.

## Estructura del JSON/Objeto a generar
Cada perfume debe tener este formato:
{
  "id": "m-101",
  "codigoMillanel": "101",
  "nombreVanna": "VANNA N° 101",
  "inspiracion": "La Vie Est Belle (Lancôme)",
  "genero": "femenino", // femenino, masculino, unisex
  "familia": "Floral Frutal Gourmand",
  "notas": {
    "salida": ["Grosellas negras", "Pera"],
    "corazon": ["Iris", "Jazmín", "Flor de azahar"],
    "fondo": ["Pachulí", "Haba tonka", "Vainilla", "Praliné"]
  },
  "tamanos": [
    { "ml": 30, "precio": 4500 },
    { "ml": 50, "precio": 7200 },
    { "ml": 100, "precio": 12000 }
  ],
  "destacado": true,
  "stock": true
}