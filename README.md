# Keyboard Practice

A local-only Chrome extension scaffold for private five-minute keyboard practice on shared school devices.

## Load locally

1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Choose **Load unpacked**.
4. Select this project folder.
5. Click the extension action to open a fresh practice tab.

## Privacy boundary

The extension has no accounts, roster, backend, network requests, analytics, telemetry, or persistence permissions. A teacher sets a username and password for one session. The student then moves through a simulated username screen and password screen with real inputs. Values remain in the active page's memory, are cleared at completion/reset/unload, and are never placed in URLs or logs.

The student can always choose **Next step** to continue without mastering the current phase. Password sequence characters remain masked; only the active instructional target is shown.

See [SECURITY_MODEL.md](SECURITY_MODEL.md) for the non-negotiable constraints.
