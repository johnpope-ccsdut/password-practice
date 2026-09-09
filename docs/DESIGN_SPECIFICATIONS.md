# Password Map Practice

## Product & Design Specification

**Version:** 1.0
**Product type:** Chrome/Chromebox classroom extension
**Primary audience:** Kindergarten / early-elementary students learning computer login skills
**Primary environment:** Shared school computer lab / Chromebox lab

---

# 1. Product Definition

## 1.1 Product purpose

Password Map Practice is a highly focused instructional typing tool designed to help young students learn their school Google-account username and password.

The extension is **not intended to be a password manager** and is **not intended to replace the school's login process**.

Its purpose is:

> **Get students logged in first, give them approximately five minutes of deliberate credential practice, then move on to the actual lesson regardless of whether they have mastered the credentials.**

The tool reinforces the same physical, color-coded "maps" students already receive on printed password cards.

The digital experience should feel like a specialized kindergarten typing game—not like a security product.

---

# 2. Core Instructional Philosophy

## 2.1 The problem

Young students can lose a disproportionate amount of instructional time attempting to log into computers.

A teacher may have 20–25 students simultaneously encountering:

* forgotten usernames
* incorrect key locations
* incorrect character order
* accidental Caps Lock
* difficulty holding Shift
* confusion between uppercase and lowercase
* difficulty remembering passwords
* uncertainty about which key to press next

The result is a class stuck at the login screen instead of learning the day's lesson.

## 2.2 New classroom workflow

The intended workflow is:

```text
Teacher / older student logs student into Google
                    ↓
Student opens Password Map Practice
                    ↓
Approximately 5 minutes of practice
                    ↓
Practice ends
                    ↓
Student proceeds to lesson
```

**The student should never be trapped in practice.**

The product does not require mastery before the student can continue.

---

# 3. Design Principles

## P1 — Practice, don't punish

Incorrect answers should provide useful information rather than punishment.

Avoid:

* lives
* failure screens
* red error explosions
* "Game Over"
* escalating penalties
* requiring mastery to proceed

Use:

* gentle correction
* visual highlighting
* repetition
* progressively reduced assistance

---

## P2 — Teach the physical keyboard

The primary instructional objective is not simply:

> "Type the password."

It is:

> "Learn where the letters/numbers are and how to physically produce them."

The interface should therefore emphasize the keyboard.

---

## P3 — Preserve the student's existing mental model

Students already have a printed colored map.

The digital experience should use the same visual language.

### Color conventions

| Meaning                      | Color                   | Purpose                       |
| ---------------------------- | ----------------------- | ----------------------------- |
| Username                     | **Orange**              | Student's username characters |
| Uppercase password character | **Blue**                | Requires Shift                |
| Lowercase password character | **Yellow**              | Normal key                    |
| Number                       | **Yellow**              | Normal number key             |
| Current target               | High-contrast highlight | "Press this key"              |
| Correct                      | Positive feedback       | Brief confirmation            |
| Incorrect                    | Gentle warning          | Explain/retry                 |

Exact colors should be configurable during visual design, but the semantic meanings should remain fixed.

---

# 4. Learning Progression

The system should explicitly distinguish between **finding keys**, **producing the correct sequence**, and **remembering**.

## Username progression

### Phase U1 — Find the keys

Student is shown the username.

Example:

```text
orange
```

The interface highlights:

```text
O
```

on the keyboard.

Student presses the key.

Then:

```text
R
```

Then:

```text
A
```

etc.

The student is learning:

> "Where is the next letter?"

---

### Phase U2 — Put them in order

Student sees the entire username:

```text
orange
```

but only the next required key is emphasized.

The system waits for the correct next key.

If the student presses `r` when `o` is expected:

```text
Not yet.

Look for O.
```

The O key becomes visually prominent.

The system should not automatically advance until the expected key is produced.

---

### Phase U3 — Reduce visual assistance

The entire username remains visible initially.

Keyboard highlighting becomes less prominent.

The student must increasingly use their own memory and the physical map.

---

### Phase U4 — Recall

The username disappears.

The student attempts to type:

```text
orange
```

from memory.

A secondary "Show map" or "Need help?" mechanism can temporarily restore assistance.

---

# 5. Password Progression

Password practice follows the same progression but adds capitalization instruction.

Example password:

```text
Ab4tQ9m
```

The student needs to understand:

```text
A = Shift + A
b = B
4 = 4
t = T
Q = Shift + Q
9 = 9
m = M
```

---

## Password Phase P1 — Find the keys

The system explicitly teaches the physical locations.

For uppercase letters, the interface should communicate:

```text
Hold SHIFT
+
press A
```

The Shift key and target letter should both be highlighted.

---

## Password Phase P2 — Correct capitalization

The system should distinguish:

```text
A
```

from:

```text
a
```

and explicitly teach that uppercase letters require Shift.

Example visual instruction:

```text
        A

Hold SHIFT + press A
```

The keyboard should show both keys highlighted.

---

## Password Phase P3 — Caps Lock awareness

The extension should detect the browser's Caps Lock state where technically possible.

If Caps Lock is unexpectedly active:

```text
CAPS LOCK IS ON

Try turning Caps Lock off.
```

The interface should not simply say:

> "Wrong password."

The instructional objective is to teach students **why** their input is wrong.

---

## Password Phase P4 — Sequence

Student types the password in order.

The target character is shown.

Example:

```text
A b 4 t Q 9 m
↑
```

Only the next character is emphasized.

---

## Password Phase P5 — Reduced assistance

The keyboard remains visible but target highlighting becomes progressively less prominent.

---

## Password Phase P6 — Recall

The password map disappears.

The student attempts the password from memory.

A temporary help mechanism can restore the map.

---

# 6. Five-Minute Session Model

The default session length is:

**5:00**

The timer begins when the student begins practice.

The timer should be clearly visible but should **not create anxiety**.

Recommended presentation:

```text
Practice time

04:32
```

Near the end:

```text
00:30
```

At zero:

```text
Practice complete!

Nice work practicing your login.

Now let's get started with today's lesson.
```

The student does not receive a score that determines whether they may continue.

---

# 7. Information Architecture

```text
Extension
│
├── Student Practice
│   ├── Welcome
│   ├── Username Practice
│   │   ├── Find Keys
│   │   ├── Sequence
│   │   ├── Reduced Help
│   │   └── Recall
│   │
│   ├── Password Practice
│   │   ├── Find Keys
│   │   ├── Shift / Uppercase
│   │   ├── Sequence
│   │   ├── Reduced Help
│   │   └── Recall
│   │
│   └── Session Complete
│
└── Session Setup
     └── One-time credential entry
```

There is no roster, student directory, account system, teacher login, or persistent credential configuration. Each session starts with masked username and password fields and is cleared when the session ends or the tab closes.

---

# 8. Wireframes

These are conceptual wireframes, not pixel-perfect visual designs.

---

## Screen 1 — Extension launcher

Purpose: provide an extremely simple entry point.

```text
┌─────────────────────────────────────┐
│  PASSWORD MAP PRACTICE              │
│                                     │
│  Student: Emma                      │
│                                     │
│  ┌───────────────────────────────┐  │
│  │       START PRACTICE          │  │
│  └───────────────────────────────┘  │
│                                     │
│  Teacher settings                   │
└─────────────────────────────────────┘
```

Student-facing UI should contain almost no unnecessary information.

---

# Screen 2 — Welcome

```text
┌───────────────────────────────────────────────────┐
│ Emma                                  05:00       │
├───────────────────────────────────────────────────┤
│                                                   │
│              LET'S PRACTICE                       │
│                                                   │
│       First we'll practice your username.         │
│       Then we'll practice your password.          │
│                                                   │
│                                                   │
│                 [ START ]                         │
│                                                   │
└───────────────────────────────────────────────────┘
```

Avoid long instructions.

Use large text and visual examples.

---

# Screen 3 — Username: Find the Key

```text
┌───────────────────────────────────────────────────┐
│ Username practice                         04:51    │
├───────────────────────────────────────────────────┤
│                                                   │
│                     O                             │
│                                                   │
│             Find this key:                       │
│                                                   │
│        [ O ]                                      │
│                                                   │
│  ┌─────────────────────────────────────────────┐  │
│  │ Q W E R T Y U I O P                         │  │
│  │ A S D F G H J K L                           │  │
│  │ Z X C V B N M                               │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
└───────────────────────────────────────────────────┘
```

The target key is strongly highlighted on the keyboard.

---

# Screen 4 — Username: Sequence

```text
┌───────────────────────────────────────────────────┐
│ Username practice                         04:12    │
├───────────────────────────────────────────────────┤
│                                                   │
│              o r a n g e                         │
│              ─                                   │
│                                                   │
│         Type the next letter                     │
│                                                   │
│              [ o r a n g e ]                     │
│                                                   │
│     ┌───────────────────────────────────────┐     │
│     │ Q W E R T Y U I O P                   │     │
│     │ A S D F G H J K L                     │     │
│     │ Z X C V B N M                         │     │
│     └───────────────────────────────────────┘     │
│                                                   │
└───────────────────────────────────────────────────┘
```

Completed characters become visually quieter.

The current character remains prominent.

---

# Screen 5 — Username: Recall

```text
┌───────────────────────────────────────────────────┐
│ Username recall                           03:24    │
├───────────────────────────────────────────────────┤
│                                                   │
│             What is your username?               │
│                                                   │
│              ┌──────────────────┐                 │
│              │                  │                 │
│              └──────────────────┘                 │
│                                                   │
│                 [ CHECK ]                         │
│                                                   │
│               [ SHOW MAP ]                        │
│                                                   │
└───────────────────────────────────────────────────┘
```

The student should not be required to remember the username perfectly before moving on.

---

# Screen 6 — Password: Uppercase Instruction

```text
┌───────────────────────────────────────────────────┐
│ Password practice                         02:57    │
├───────────────────────────────────────────────────┤
│                                                   │
│                    A                              │
│                                                   │
│             HOLD SHIFT + A                       │
│                                                   │
│        [ SHIFT ]       [ A ]                      │
│                                                   │
│     keyboard visualization                       │
│                                                   │
│       semi-transparent hands                     │
│       optionally displayed                       │
│                                                   │
└───────────────────────────────────────────────────┘
```

This is an important teaching moment.

The system should demonstrate that uppercase is an **action**, not merely a different symbol.

---

# Screen 7 — Password Sequence

```text
┌───────────────────────────────────────────────────┐
│ Password practice                         02:18    │
├───────────────────────────────────────────────────┤
│                                                   │
│                 A b 4 t Q 9 m                     │
│                 ↑                                 │
│                                                   │
│             HOLD SHIFT + A                       │
│                                                   │
│  [SHIFT]                                      [A] │
│                                                   │
│     keyboard                                      │
│                                                   │
│  finger overlay                                   │
│                                                   │
└───────────────────────────────────────────────────┘
```

The visual system should make the relationship between:

**character → physical key → finger → modifier**

very clear.

---

# Screen 8 — Caps Lock Warning

```text
┌───────────────────────────────────────────────────┐
│ Password practice                         01:42    │
├───────────────────────────────────────────────────┤
│                                                   │
│             CAPS LOCK IS ON                       │
│                                                   │
│       Your password needs lowercase here.         │
│                                                   │
│              [ TURN CAPS LOCK OFF ]               │
│                                                   │
│                 ↓                                 │
│              [ Caps ]                              │
│                                                   │
└───────────────────────────────────────────────────┘
```

Do not make this feel like a failure.

It is an instructional opportunity.

---

# Screen 9 — Help / Map

The student can temporarily reveal the map.

```text
┌───────────────────────────────────────────────────┐
│                                                   │
│             YOUR PASSWORD MAP                     │
│                                                   │
│                A b 4 t Q 9 m                      │
│                                                   │
│       🔵 uppercase                               │
│       🟨 lowercase / number                      │
│                                                   │
│             [ HIDE MAP ]                          │
└───────────────────────────────────────────────────┘
```

The exact password should be presented according to the school's established physical-map convention.

---

# Screen 10 — Session Complete

```text
┌───────────────────────────────────────────────────┐
│                                                   │
│                 NICE WORK!                        │
│                                                   │
│       You practiced your login today.             │
│                                                   │
│       Now it's time for today's lesson.           │
│                                                   │
│                 [ DONE ]                           │
│                                                   │
└───────────────────────────────────────────────────┘
```

Do not show:

```text
You got 62%
```

or:

```text
You failed.
```

The behavioral goal is participation, not performance pressure.

---

# 9. Keyboard Design

The keyboard is a primary instructional component.

It should visually resemble the student's physical keyboard as closely as practical.

## Keyboard states

Each key may have these states:

```text
NORMAL
TARGET
MODIFIER
CORRECT
INCORRECT
DISABLED
```

---

## Character-color rules

For passwords:

### Uppercase

```text
A
```

uses blue.

### Lowercase

```text
a
```

uses yellow.

### Numbers

```text
4
```

uses yellow.

### Username

All username characters use orange.

---

# 10. Finger / Hand Overlay

The hand overlay is an optional but strongly recommended feature.

It should be:

* semi-transparent
* anatomically simple
* visually unobtrusive
* large enough for young students to recognize
* positioned beneath or behind the keyboard
* animated only when useful

Example:

```text
              keyboard

      ┌─────────────────────┐
      │ Q W E R T Y ...     │
      │ A S D F G ...       │
      └─────────────────────┘

          transparent hands
          ↓           ↓
        fingers      fingers
```

When asking for a specific key, the appropriate finger should be emphasized.

Example:

```text
Hold SHIFT with your left pinky.
Press A with your left ring finger.
```

The system should avoid requiring perfect touch-typing technique.

The objective is to **teach useful finger/key associations**, not grade professional typing technique.

---

# 11. Interaction Rules

## Correct key

When the expected key is pressed:

1. Brief positive visual feedback.
2. Advance to the next character.
3. Highlight the next target.
4. If a modifier is required, show the modifier instruction.

Feedback should be approximately 200–500 ms and should not slow the student down.

---

## Incorrect key

When an unexpected key is pressed:

1. Do not advance.
2. Briefly indicate the incorrect key.
3. Re-emphasize the correct target.
4. Provide a concise hint if appropriate.

Example:

```text
Not that one.

Look for O.
```

Do not clear the entire answer.

---

# 12. Assistance Ladder

The system should progressively reduce assistance.

```text
LEVEL 1
Character shown
+
keyboard key highlighted
+
finger highlighted
+
instruction

        ↓

LEVEL 2
Character shown
+
keyboard key highlighted

        ↓

LEVEL 3
Character shown
+
normal keyboard

        ↓

LEVEL 4
Partial sequence shown

        ↓

LEVEL 5
Recall from memory
```

The student can request help at any point.

Help should temporarily move them backward on the assistance ladder, not permanently reset progress.

---

# 13. State Diagram

## Overall session

```text
                  ┌──────────────┐
                  │   NOT STARTED│
                  └──────┬───────┘
                         │ Start
                         ▼
                  ┌──────────────┐
                  │   WELCOME    │
                  └──────┬───────┘
                         ▼
                  ┌──────────────┐
                  │ USERNAME     │
                  │ PRACTICE     │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ PASSWORD     │
                  │ PRACTICE     │
                  └──────┬───────┘
                         │
              ┌──────────┴──────────┐
              │                     │
          timer expires          user finishes
              │                     │
              └──────────┬──────────┘
                         ▼
                  ┌──────────────┐
                  │   COMPLETE   │
                  └──────────────┘
```

---

# 14. Username State Machine

```text
U1_FIND_KEYS
     │
     ▼
U2_SEQUENCE
     │
     ▼
U3_REDUCED_HELP
     │
     ▼
U4_RECALL
     │
     ▼
PASSWORD
```

A student may move backward temporarily for help:

```text
U4_RECALL
    │
    │ Show Map
    ▼
U3_REDUCED_HELP
```

---

# 15. Password State Machine

```text
P1_FIND_KEYS
     │
     ▼
P2_SHIFT / CAPS
     │
     ▼
P3_SEQUENCE
     │
     ▼
P4_REDUCED_HELP
     │
     ▼
P5_RECALL
     │
     ▼
COMPLETE
```

Caps Lock is an orthogonal state:

```text
NORMAL
  │
  │ Caps Lock detected
  ▼
CAPS_WARNING
  │
  │ Caps Lock corrected
  ▼
NORMAL
```

---

# 16. Timer State Machine

```text
NOT_STARTED
     │
     ▼
RUNNING
     │
     ├── student interaction
     │
     ├── temporary help
     │
     └── timer reaches 00:00
                    │
                    ▼
                COMPLETE
```

The timer should continue during normal practice.

The system should not pause simply because the student made an error.

If a help dialog is displayed, product/UX may choose whether that brief interaction pauses the timer, but the default should be **no pause**.

---

# 17. Data Model

The minimal conceptual data model should be intentionally small.

## Session credentials

```text
SessionCredentials
-------------------------
username
password
```

Credentials are entered for one session only. They are never associated with a student record.

---

## PracticeSettings

```text
PracticeSettings
-------------------------
sessionDuration
usernameEnabled
passwordEnabled
fingerOverlayEnabled
defaultAssistanceLevel
```

Recommended default:

```text
sessionDuration = 300 seconds
```

---

## SessionState

Session state should be temporary rather than permanent wherever possible.

```text
SessionState
-------------------------
sessionId
phase
subPhase
currentCharacterIndex
assistanceLevel
startedAt
remainingSeconds
```

---

## Credential representation

Conceptually:

```text
username = "orange"
password = "Ab4tQ9m"
```

Credentials exist only in the active page's memory. The scaffold does not use `chrome.storage`, IndexedDB, cookies, URLs, query strings, console logging, analytics, or external requests. There is no recovery path after the page is closed.

---

# 18. Security Requirements

This is an educational convenience mechanism, not a password manager.

## S1 — Minimize exposure

The extension should expose the credential only when necessary for practice.

The password should not appear in:

* extension names
* URLs
* browser history
* analytics
* console logging
* error reports
* telemetry
* screenshots generated by the application
* external network requests

The username is treated as sensitive too. Both values are masked during session setup and are shown only as instructional content while the student is actively working through the relevant practice phase.

---

## S2 — No network transmission

Student credentials should not be transmitted to an external service merely to operate the practice tool.

Required model:

```text
Credential
   ↓
Active extension page memory
   ↓
Practice engine
```

rather than:

```text
Credential
   ↓
Internet
   ↓
Third-party server
```

---

## S3 — No teacher settings surface

The extension has no teacher settings, roster, account, PIN, or persistent configuration surface. This removes the need for a casual-access protection mechanism.

---

## S4 — Clear session data

The session must clear its in-memory credentials and visible input values when practice completes, when the session is reset, and when the page unloads. There is no stored student credential.

---

## S5 — Shared-device consideration

The system must assume:

> Multiple students may use the same physical Chromebox.

Therefore the product must not accidentally display the previous student's:

* username
* password
* practice history
* name

to the next student.

Student switching must be explicit or controlled by the school's deployment model.

---

# 19. Teacher Workflow

## Initial setup

Teacher/administrator configures:

```text
Student
↓
Username
↓
Password
↓
Optional practice settings
```

The student does not perform this setup.

---

## Daily workflow

### Step 1

Teacher or older student logs the student into Google.

### Step 2

Student launches Password Map Practice.

### Step 3

Student practices.

### Step 4

Five minutes expires.

### Step 5

Student moves to the lesson.

---

# 20. Important Behavioral Requirement

The extension must **never become another obstacle**.

Bad behavior:

```text
"You must correctly enter your password three times
before you can continue."
```

Correct behavior:

```text
"You practiced for five minutes.
Great. Now let's learn today's lesson."
```

---

# 21. Student Feedback Language

Use simple language appropriate for kindergarten.

### Good

```text
Find O.

Try again.

Look at the blue letter.

Hold SHIFT.

Caps Lock is on.

Look at your map.

You found it!

Keep going.

Nice practice!
```

### Avoid

```text
Authentication failed.

Invalid credential.

Input mismatch.

Incorrect password.

Attempt 3 of 5.

Authentication error.
```

The child is learning a physical skill, not debugging authentication.

---

# 22. Accessibility

The interface should support:

* large text
* high contrast
* keyboard-only interaction
* visual + textual feedback
* color plus another visual indicator
* no reliance on color alone
* reduced animation
* clear focus indicators
* minimal reading requirements

Because the product is specifically designed around color-coded physical maps, colors are important—but every semantic color should have a second cue.

For example:

```text
BLUE + "SHIFT"
YELLOW + "normal"
ORANGE + "username"
```

---

# 23. Audio

Audio should be optional.

If implemented:

* short
* calm
* non-annoying
* no continuous narration
* no punishment sounds

Examples:

```text
"Find O."

"Hold Shift."

"Nice work."
```

The application must remain fully usable without audio.

---

# 24. Session Setup

```text
┌──────────────────────────────────────────────────┐
│ KEYBOARD PRACTICE — PRIVATE SESSION             │
├──────────────────────────────────────────────────┤
│                                                  │
│ Username                                         │
│ [ ********                                      ]│
│                                                  │
│ Password                                         │
│ [ ********                                      ]│
│                                                  │
│ [ ********                                      ]│
│                                                  │
│ [ START PRACTICE ]                               │
└──────────────────────────────────────────────────┘
```

There is no teacher configuration screen. A session is started by entering credentials into masked fields, and the fields are cleared after the session. No student name is collected.

---

# 25. Visual Design Direction

The overall aesthetic should be:

**Friendly classroom tool + physical keyboard + printed map**

Not:

* hacker aesthetic
* cybersecurity aesthetic
* corporate login portal
* generic typing-test software
* arcade game

Recommended visual characteristics:

* large rounded controls
* generous spacing
* simple illustrations
* physical-keyboard metaphor
* restrained animation
* very obvious current target
* friendly but not childish cartoon overload

---

# 26. Animation Principles

Animation should communicate state.

Good:

```text
target key gently enlarges
finger moves toward key
correct key briefly glows
```

Bad:

```text
entire keyboard explodes
confetti every time
rapid flashing
large score animations
```

Young students need to maintain attention on the keyboard.

---

# 27. Progress / Mastery Model

The system should distinguish between:

### Practice progress

What the student is currently doing.

### Mastery

Whether the student has demonstrated reliable recall.

Mastery should **not** control access to the lesson.

A student can finish with:

```text
Mastery: developing
```

and still proceed.

---

# 28. Analytics and telemetry

Analytics, telemetry, scoreboards, rankings, and error reporting are out of scope and prohibited. The extension must not collect or transmit student activity or credential data.

---

# 29. Acceptance Criteria

## Core functionality

### AC-01

 A student or teacher can enter credentials for the current session without creating an account or saving them.

### AC-02

Username is treated as case-insensitive.

### AC-03

The system recognizes the password as case-sensitive.

### AC-04

The system can distinguish uppercase password characters from lowercase characters and numbers.

### AC-05

The system teaches uppercase letters using Shift.

### AC-06

The system detects Caps Lock state when technically supported by the browser/device.

### AC-07

The system visually identifies the next required keyboard key.

### AC-08

The system does not advance on an incorrect character.

### AC-09

Incorrect input produces instructional feedback rather than a generic authentication error.

### AC-10

The student can request additional visual help.

---

# 30. Timing Acceptance Criteria

### AC-11

Default session duration is five minutes.

### AC-12

Timer begins when practice begins.

### AC-13

When the timer reaches zero, practice ends automatically.

### AC-14

The student can proceed regardless of mastery.

### AC-15

There is no requirement to correctly enter the password before the session can end.

---

# 31. Security Acceptance Criteria

### AC-16

Credentials are not sent to an external service during normal practice.

### AC-17

Credentials are not included in analytics.

### AC-18

Credentials are not written to browser console logs.

### AC-19

Credentials are not exposed in visible URLs.

### AC-20

Previous-student credentials cannot remain visible when a new student begins.

### AC-21

There is no teacher configuration, roster, account, or persistent credential surface.

### AC-22

Session credentials are cleared on completion, reset, and page unload.

---

# 32. UX Acceptance Criteria

### AC-23

A kindergarten student can understand what to do without reading a long paragraph.

### AC-24

The next required key is visually obvious.

### AC-25

Uppercase characters visibly communicate that Shift is required.

### AC-26

Username uses the established orange visual convention.

### AC-27

Uppercase password characters use blue.

### AC-28

Lowercase letters and numbers use yellow.

### AC-29

Color is not the only indicator of meaning.

### AC-30

The UI does not resemble a conventional password-login error screen.

---

# 33. Finger Overlay Acceptance Criteria

If enabled:

### AC-31

The appropriate finger is indicated for the target key.

### AC-32

Shift instruction identifies which Shift key/finger to use.

### AC-33

The hand overlay does not obscure the keyboard.

### AC-34

The overlay can be disabled.

### AC-35

The overlay is instructional rather than a requirement for advancing.

---

# 34. Failure Scenarios

## Student presses the wrong key

Expected:

```text
No advancement.

Correct key becomes emphasized.

Brief instructional feedback.
```

---

## Student has Caps Lock enabled

Expected:

```text
Caps Lock warning.

Explain why the character is wrong.

Guide student toward correcting Caps Lock.
```

---

## Student repeatedly gets the password wrong

Expected:

```text
Continue practicing.

Increase assistance.

Do not lock the student out.

Do not display "wrong password" repeatedly.
```

---

## Student cannot remember the username

Expected:

```text
Student can Show Map.

Practice continues.

No penalty.
```

---

## Student never demonstrates mastery

Expected:

```text
Five minutes expires.

Practice ends.

Student moves to lesson.
```

This is a **successful product outcome**, not a failure.

---

# 35. Out-of-Scope

The first version should NOT attempt to become:

* a general password manager
* a Google authentication replacement
* a browser autofill system
* a student grading system
* a general typing tutor
* a competitive typing game
* an LMS
* a full student-information system
* a cloud credential-management platform

The narrower the product remains, the more effective it can be as a classroom intervention.

---

# 36. Recommended MVP

The first implementation should contain only:

### Student

* Welcome screen
* Five-minute timer
* Username practice
* Password practice
* Keyboard visualization
* Orange/blue/yellow visual system
* Shift instruction
* Caps Lock detection
* Show Map
* Basic finger overlay
* Completion screen

### Session setup

* Enter masked username
* Enter masked password
* Start a one-time session

Everything else can wait.

---

# 37. Future Enhancements

Potential later additions:

### Adaptive difficulty

Automatically determine whether a student needs:

```text
key location
→ sequence
→ recall
```

or can skip ahead.

### Classroom roster

Not permitted. The extension must never maintain or display a classroom roster. Each student starts a fresh session by entering credentials locally.

### Physical-map mode

Display a digital replica of the student's existing printed password map.

### Teacher dashboard

Not permitted. There is no dashboard, activity history, or student analytics.

### Targeted remediation

If a student repeatedly struggles with:

```text
Q
```

future practice can emphasize Q.

### Keyboard-specific layouts

Support different physical keyboards if the lab hardware changes.

---

# 38. Product Success Definition

The product should not be judged primarily by:

> "How many students typed their password perfectly?"

Instead, success is:

> **Students get into the classroom routine of practicing their login every day without sacrificing lesson time.**

The ideal long-term trajectory is:

```text
Week 1
Teacher/older student logs them in
↓
Student practices with lots of help

Week 2
Teacher/older student logs them in
↓
Student needs less help

Week 3
Student remembers username
↓
Student practices password

Week 4+
Student increasingly knows credentials independently
↓
Login becomes routine
```

The ultimate success state is:

```text
Student sits down
        ↓
Knows username
        ↓
Knows password
        ↓
Logs in independently
        ↓
Gets to today's lesson
```

The extension is the **training bridge** between teacher-assisted login and independent computer use.

---

# 39. One-Sentence Product Requirement

> **Build a five-minute, kindergarten-friendly keyboard practice experience that uses the student's existing color-coded password map to teach username location, character sequence, capitalization, Shift usage, and eventual recall—without ever allowing login difficulty to consume the student's instructional time.**
