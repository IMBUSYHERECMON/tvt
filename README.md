# TV Encyclopedia

This simple site uses Express to serve a wiki-style web page about music, and it also includes a copy of the site in the `docs/` folder for GitHub Pages.

## Development

Install dependencies and run tests:

```bash
npm install
npm test
```

Start the server for local testing:

```bash
npm start
```

The API provides song lists at `/api/songs/tvgirl` and `/api/songs/smiths`.

GitHub Pages serves the static site from the `docs/` directory. Navigate to `index.html` in that folder to view the site.
