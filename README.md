# Unicode Normalizer

A small web tool to normalize text (NFC, NFD, NFKC, NFKD, or none) and view each character’s Unicode code point.

## Hosting on GitHub Pages

1. **Create a new repository** on GitHub (e.g. `unicode-normalizer`).

2. **Push this folder** to the repo:
   ```bash
   cd unicode-normalizer
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/unicode-normalizer.git
   git push -u origin main
   ```

3. **Turn on GitHub Pages**  
   In the repo: **Settings → Pages**. Under “Build and deployment”, set **Source** to **Deploy from a branch**, choose branch **main**, folder **/ (root)**. Save.

4. After a minute or two, the site will be at:  
   `https://YOUR_USERNAME.github.io/unicode-normalizer/`

## Local use

Open `index.html` in a browser, or run a simple server:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000
