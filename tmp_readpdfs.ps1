$ErrorActionPreference = 'Stop'
$paths = @(
  'C:\Users\jonat\eclipse\PDFs\Recetario nuevas bebidas.pdf',
  'C:\Users\jonat\eclipse\PDFs\Recetas  Bebidas.pdf'
)

python -c "import sys; from pathlib import Path; from pypdf import PdfReader; paths=[Path(r'C:\Users\jonat\eclipse\PDFs\Recetario nuevas bebidas.pdf'), Path(r'C:\Users\jonat\eclipse\PDFs\Recetas  Bebidas.pdf')];
for p in paths:
    print('FILE:', p.name)
    print('EXISTS:', p.exists(), 'SIZE:', p.stat().st_size if p.exists() else 0)
    if p.exists():
        reader = PdfReader(str(p));
        text = '\n'.join(page.extract_text() or '' for page in reader.pages)
        print(text[:6000])
        print('---END---')"