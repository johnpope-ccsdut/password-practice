# Security model

This extension is designed for shared school devices and does not create student accounts.

## Required boundaries

- No roster, student directory, teacher login, account, backend, analytics, telemetry, or external request.
- No `chrome.storage`, IndexedDB, cookies, local storage, sync storage, or downloads.
- A teacher sets the username and password at the start of each session; the student enters them again in the simulated login screens.
- Credentials exist only in the active practice page's memory.
- Credentials are cleared when practice completes, when the session is reset, and on page unload.
- Credentials never appear in URLs, extension titles, logs, error reports, or analytics.
- The practice screen reveals credential characters only as part of the active lesson. Password characters remain masked in the sequence display.
- A student can use `Next step` to continue without correctly entering a character or completing a phase.

## Shared-device reset

At the end of a session, the page clears its credential variables and input values before returning to a blank setup screen. The next student must enter a fresh session. No previous student identity is displayed or selectable.

## Review rule for future changes

Any feature that needs persistence, a network request, a student list, an account, or a way to reveal credentials outside the active lesson must be rejected unless the product requirements change explicitly and the school approves the change.
