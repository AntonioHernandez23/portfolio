# Portafolio Digital - Antonio Hernandez

Versión estática del portafolio publicada en GitHub Pages:
https://antoniohernandez23.github.io/portfolio/

## No editar a mano

El contenido vive en `backend/data/portfolio.json` del proyecto Flask local.
Este sitio se genera a partir de esa misma plantilla y se publica con:

```
python export_github_pages.py --publicar
```

o con doble clic en `publicar_github.bat`.

## Notas

- GitHub Pages solo sirve archivos estáticos, así que la demo descargable
  de PanFighters (444 MB, por encima del límite de 100 MB por archivo de
  GitHub) se enlaza desde itch.io en esta versión.
- La versión con servidor real (Flask + descarga directa) corre en local
  y se expone con Cloudflare Tunnel.
