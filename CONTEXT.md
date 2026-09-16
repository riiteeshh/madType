# madtyper

A no-login typing speed test, styled after Monkeytype, with single-player practice and real-time multiplayer races.

## Language

**Test**:
A single-player typing session in either Time or Word-Count mode, ending in a Results screen.
_Avoid_: Session, attempt, run

**Race**:
A multiplayer typing session shared by multiple Guests in a Room, always run in Word-Count mode so there's a clear finish line. Ends with a ranking of who finished first.
_Avoid_: Match, game (except "Public Quick-Match")

**Mode**:
The shape of a Test or Race: either **Time** (type for a fixed duration, e.g. 30s) or **Word-Count** (type a fixed number of words, e.g. 25). Determines what a "finish" means.
_Avoid_: Type, format

**Difficulty**:
Which bundled word list a Test or Race samples its text from — **Common** (frequent English words) or **Hard** (less-common words). Independent of Mode.

**Guest**:
A participant identified only by a nickname stored in that browser's localStorage. No account, no server-side identity — a Guest's identity does not survive switching browsers/devices.
_Avoid_: User, player (use "Guest" when discussing identity specifically; "player" is fine in race-UI contexts like "player count")

**Room**:
A private multiplayer Race lobby, addressed by a short human-readable code (e.g. `X7K2PQ`) that also works embedded in a shareable URL. The creator (the Guest who made the Room) chooses its Mode, word-count/duration, Difficulty, and Punctuation/Numbers settings.
_Avoid_: Lobby (use "Room" for private, "Public Quick-Match" for the other kind)

**Public Quick-Match**:
A Race lobby anyone can join without a code — a Guest queues, and once 2-5 Guests are present a countdown starts (or the Race starts immediately at 5). Unlike a Room, no one chooses its settings: Mode is always Word-Count, and word-count/Difficulty are randomized each time.
_Avoid_: Matchmaking (use the full term), public room

**WPM**:
Words per minute, computed as *(correctly typed characters ÷ 5) ÷ minutes elapsed*. Only correct characters count.
_Avoid_: Speed, score

**Raw WPM**:
Same formula as WPM, but counting *all* typed characters (correct + incorrect), not just correct ones.

**Accuracy**:
*(correct keystrokes ÷ total keystrokes) × 100*, counting every keystroke made during the Test/Race — including ones later fixed with backspace.
