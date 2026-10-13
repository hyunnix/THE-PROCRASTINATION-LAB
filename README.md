# THE PROCRASTINATION LAB
## Why Am I Not Starting?

A small interactive website for **“Represent a Phenomenon with Code and AI,” MSTU 5003/5013**, Teachers College, Columbia University. Built with HTML, CSS, and vanilla JavaScript. No installation, build step, external images, external fonts, APIs, or backend is needed.

## Observed phenomenon

People sometimes delay starting a task even when they intend to complete it. This project represents that phenomenon through three adjustable variables: task difficulty, motivation, and distraction. It does not claim to document the student's personal observations or collect participant data.

The pink, cream, and black interface presents a fictional digital lab: a control panel, an observation window, an original inline SVG brain character, preset experiments, and an explanation of the model. All activity stays in the browser; no data is saved or transmitted.

## Computational thinking

| Concept | Representation |
| --- | --- |
| Decomposition | Break a complex phenomenon into three smaller inputs. |
| Pattern recognition | Compare presets and change one slider at a time to explore relationships between inputs and the simulated outcome. |
| Abstraction | Substitute numbers from 1–10 and three character states for a much more complex human experience. |
| Algorithm design | Apply the same calculation, bounds, and state thresholds after every input change. |

These concepts also appear in the expandable “The computational thinking behind it” note on the website.

## Algorithm

```text
readiness = 50 + (motivation × 6) − (difficulty × 4) − (distraction × 4)
readiness = max(0, min(100, readiness))
```

The baseline of 50 and the weights of 6, −4, and −4 are illustrative design choices, not empirical findings. Increasing motivation by one adds six points before clamping; increasing difficulty or distraction by one subtracts four. Clamping keeps the displayed score between 0 and 100 and can hide additional changes at either end.

| Score | State |
| --- | --- |
| 65–100 | Ready to begin |
| 35–64 | Hesitating |
| 0–34 | Avoiding |

With integer inputs, the formula produces even scores, so 36 and 66 are the first reachable scores in the upper two states. The code still uses the specified thresholds of 35 and 65.

| Configuration | Difficulty | Motivation | Distraction | Calculated score |
| --- | --- | --- | --- | --- |
| Default / Reset | 6 | 4 | 5 | 30 |
| Deadline Panic | 9 | 5 | 8 | 12 |
| Productive Morning | 3 | 9 | 2 | 84 |
| Just One More Scroll | 6 | 2 | 10 | 0 (raw: −2) |

### Pseudocode

```text
SET inputs to defaults: difficulty 6, motivation 4, distraction 5
WHEN the page loads, a slider moves, a preset is selected, or Reset is clicked:
    READ the three input values as numbers
    DISPLAY each input's current value
    CALCULATE readiness using the formula
    CLAMP readiness between 0 and 100
    IF readiness >= 65: choose Ready to begin
    ELSE IF readiness >= 35: choose Hesitating
    ELSE: choose Avoiding
    UPDATE percentage, progress bar, character, and reaction text
    MARK any matching preset as selected
```

## AI-assisted development process

The student supplied the phenomenon, assignment context, design direction, variables, exact formula, state thresholds, preset values, and required copy. AI translated that brief into semantic HTML, responsive CSS, an inline SVG character, and JavaScript event handling, and drafted this documentation. AI assistance is part of the implementation process; it does not validate the model or provide evidence about human psychology.

The student can review and revise the visual choices and code, explain the algorithm in their own words, and add their own genuine observations and reflections. No personal observations, user-study results, or completed testing claims are invented here.

## Limitations

- This is an educational conceptual simulation, not a scientifically validated assessment or diagnostic tool.
- Three independent sliders omit emotions, context, habits, individual differences, and other factors.
- The model assumes fixed linear effects. Real relationships may differ, interact, or change over time.
- “Deadline Panic” is a fictional scenario; its title introduces no extra hidden rule.
- The percentage is an illustrative output, not a probability or measurement of actual readiness.
- Character states categorize the model's result; they do not label or judge a person.

## Files

- `index.html`: content, accessible native controls, and inline SVG illustration.
- `style.css`: responsive layout, visual identity, and reduced-motion-aware animation.
- `script.js`: formula, state selection, slider events, presets, and reset.
- `README.md`: assignment context, model explanation, and setup.

## Run locally

Open `index.html` in a modern browser directly. The project works offline.

Alternatively, from this folder, if Python 3 is installed:

```sh
python3 -m http.server 8000
```

Visit `http://localhost:8000`. Stop the server with Control+C.

## Publish using GitHub Pages

1. Create a GitHub repository and upload the four files to its root. Keep the filename `index.html` lowercase.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select **main** and **/ (root)**, then save.
5. Wait for deployment to finish and open the site link shown in Pages settings (usually `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`).

Relative CSS and JavaScript paths work under a repository subpath. No build command or secrets are needed. See [GitHub's publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for current setup details.

## Manual review checklist

This checklist describes checks to perform, rather than claiming completed testing:

- Confirm the initial values are 6, 4, 5 and the readiness is 30% (Avoiding).
- Drag each slider and use Tab plus arrow keys; verify immediate number updates.
- Select all three presets and compare against the table above.
- Try 1, 10, 1 for the upper clamp (100%) and 10, 1, 10 for the lower clamp (0%).
- Set difficulty 6, motivation 5, distraction 5 for Hesitating (36%).
- Select Reset and verify the original inputs, score, character, and preset selection.
- Inspect a wide desktop and a narrow mobile viewport for overflow and readable controls.
- Enable reduced motion in the operating system and confirm decorative motion stops.
- Check keyboard focus, screen-reader labels, and the readiness announcement.
