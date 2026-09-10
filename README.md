# Keyboard Practice

A local-only Chrome extension scaffold for private five-minute keyboard practice on shared school devices.

[Online Demo](https://johnpope-ccsdut.github.io/password-practice/practice.html)

## Load locally

1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Choose **Load unpacked**.
4. Select this project folder.
5. Click the extension action to open a fresh practice tab.

## GitHub Pages backup

The same `practice.html`, `practice.js`, and `practice.css` also run as a static website. The root `index.html` redirects to `practice.html`, so there is no second UI to maintain.

To publish it:

1. Push this repository to GitHub.
2. Open the repository's **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch and `/ (root)` folder, then save.
5. Open the Pages URL; it will redirect to `practice.html`.

GitHub Pages is a backup/static practice site, not a secure credential service. Session values remain in the page's memory and are not sent to a server, but use the extension or a trusted school deployment for classroom credentials.

## Privacy boundary

The extension has no accounts, roster, backend, network requests, analytics, telemetry, or persistence permissions. A teacher sets a username and password for one session. The student then moves through a simulated username screen and password screen with real inputs. Values remain in the active page's memory, are cleared at completion/reset/unload, and are never placed in URLs or logs.

The student can always choose **Next step** to continue without mastering the current phase. Password sequence characters remain masked; only the active instructional target is shown.

See [SECURITY_MODEL.md](SECURITY_MODEL.md) for the non-negotiable constraints.
