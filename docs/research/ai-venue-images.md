# AI images of real places

Added November 8, 2026 at the owner's request, for 16 places with no freely licensed photo.

## Method

1. Find a reference photo of the place, usually on the venue's or operator's own website. These photos are copyrighted, so they are used only to describe and check. They are never published and never given to the image generator.
2. Write a text description of only what the reference shows, with explicit instructions to add nothing.
3. Generate the image with the Codex CLI's built-in image tool. The backend model and version were not exposed, so none is claimed.
4. Compare the result with the reference element by element. Reject anything invented: structures, signs, text, doors, fixtures or building geometry. For a targeted fix, edit the AI image itself (never the reference). Up to 5 rounds.
5. Crop above ground level so the image shows no entrances, thresholds, steps, ramps, railings, paths or curb cuts. In a pilot, the generator twice drew a step-free entrance where the reference was ambiguous. These are the details visitors most rely on, and the generator cannot be trusted with them.
6. A second reviewer re-checks every final against its reference before publication.

Each record in `src/data/ai-venue-images.json` names the reference page and its date, and lists known differences. The page labels each image "AI-generated image · not a photograph" and says not to use it to judge physical access.

## Not generated

- Boone Woods Park: the only official photo is a close-up of a child on play equipment.
- Francis RecreAcres: the official photos show people and paths, with no building, shelter or sign.

Both keep their labeled category artwork. A real, freely licensed photo always replaces an AI image. On November 8, 2026, free Flickr photos (found through Openverse) replaced the AI images for Southgate House Revival (CC0) and Ensemble Theatre (CC BY-SA 2.0), leaving 14 AI images. Two more (the Kenton County Erlanger and Independence branches) were added later that evening, for 16.
