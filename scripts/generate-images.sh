#!/bin/zsh
# Generates cover art through the Codex CLI's built-in image tool (ChatGPT subscription — no API key).
#
#   scripts/generate-images.sh                      # regenerate every cover below
#   scripts/generate-images.sh <name> "<subject>"   # one image → assets-src/generated/<name>.png
#
# Then run `npm run images` to produce the WebP files in public/images.
set -u
cd "${0:A:h}/.."
mkdir -p assets-src/generated

STYLE="Shared style: premium dark editorial 3D render, near-black #0a0a0b background, glassy translucent materials, soft volumetric glow, indigo #6366f1 and cyan #22d3ee accents, shallow depth of field, minimal composition with negative space on the left third, absolutely no text, no letters, no numbers, no logos, no people's faces. Landscape 16:10."

gen() {
  local name="$1" subject="$2"
  # `< /dev/null` matters: without it codex waits on stdin forever when backgrounded.
  codex exec --skip-git-repo-check -s workspace-write -C "$PWD" \
    "Use your built-in image generation tool (not code) to create ONE image and save it as PNG at assets-src/generated/$name.png. Subject: $subject. $STYLE Reply only with the saved path." \
    < /dev/null > "assets-src/generated/$name.log" 2>&1 && echo "done $name" || echo "FAILED $name (see assets-src/generated/$name.log)"
}

if [[ $# -eq 2 ]]; then
  gen "$1" "$2"
  exit
fi

# Run three at a time to stay friendly with subscription rate limits.
gen case-marketyo "a glowing glass grocery basket made of light filaments with small luminous product spheres flowing into it from a network of storefront nodes, two streams of light merging into one larger stream symbolising an acquisition" &
gen case-deliveryhero "a dark glass globe seen at an angle with luminous delivery route arcs spanning continents, small glowing hub nodes, sense of global logistics scale" &
gen case-medibulut "a translucent glass heart-rate pulse line rising like a growth curve, floating soft UI cards for appointments and video consults, calm teal-cyan medical glow" &
wait
gen case-istanbul "an abstract top-down night map of Istanbul with the Bosphorus strait as a dark ribbon, glowing transit lines crossing both continents, tiny light particles moving along routes, cartographic contour lines" &
gen case-aya "a calm abstract topographic relief map with gentle warm amber and cyan glowing pins clustering and connected by thin aid-route lines, hopeful and respectful tone, no destruction" &
gen ai-lab "an abstract glass neural network of agents: several small glowing glass cubes passing light signals to each other along thin threads, orchestrated around a central brighter cube" &
wait
echo "ALL DONE — now run: npm run images"
