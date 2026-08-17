---
name: publish-thought
description: Turn a dictated transcript, voice-to-text ramble, rough note, or chat explanation into a personal post for the chriswiki.com Thoughts blog. Use when Christian says he wants to create, draft, edit, or publish a blog post, thought, personal note, or piece of writing in this repository. Do not use for consulting-focused Insights posts unless he explicitly asks to publish there.
---

# Publish a thought

Turn Christian's raw words into a clear post without replacing his voice. Add the finished post to the existing Thoughts content system and verify the site.

## Workflow

1. Treat the transcript as source material, even when it is repetitive or unstructured. If Christian says he is still dictating, wait for the rest. Otherwise, proceed without making him fill out a form.
2. Identify the main point, supporting turns, and anything that sounds unresolved. Do not invent facts, anecdotes, opinions, or certainty.
3. Draft a title, a one-sentence description, a short lowercase hyphenated slug, zero to three specific tags, and the post body. Use headings only when they make a longer post easier to follow.
4. Preserve first person, bluntness, humor, uncertainty, fragments, and recurring word choices when they sound intentional. Remove transcription debris such as false starts, filler words, and accidental repetition. Keep useful repetition when it supplies rhythm or emphasis.
5. Do not add an SEO opening, generic lesson, call to action, inspirational ending, or tidy conclusion unless Christian asked for one. A thought can end unresolved.
6. Use `$avoid-ai-writing` as an editorial pass when that skill is available. Use rewrite mode, the `blog` context, and a voice calibrated from the transcript rather than a preset persona. Keep the edit minimal and use the corrected second-pass version. Do not show the audit unless Christian asks for it. If the skill is unavailable, check manually for generic AI framing, uniform rhythm, inflated claims, excessive headings, em dashes, and conclusions the transcript did not contain.
7. Re-read the result against the transcript. Every claim and personal stance must trace back to Christian's words. Prefer the transcript when polish and voice conflict.

## Add the post

Unless Christian asks for draft-only output:

1. Add the newest entry to the top of `thoughtPosts` in `src/data/thoughtsContent.ts`.
2. Use the local date in `YYYY-MM-DD` format. Let `getThoughtReadingTime` calculate the reading time.
3. Store prose as paragraphs in `sections`. Use a section without a title for an unheaded opening. Escape apostrophes and quotation marks correctly for TypeScript strings.
4. Keep slugs unique. Do not silently revise older posts.
5. Add `https://chriswiki.com/thoughts/<slug>` to `public/sitemap.xml`.
6. Add an RSS `<item>` to `public/rss.xml` with the same title, URL, date, and description. Put title and description text inside CDATA.
7. Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.
8. Report the title, route, files changed, and checks. Do not deploy, commit, or push unless Christian asks.

Use this entry shape:

```ts
{
  slug: "a-short-slug",
  title: "A title in Christian's voice",
  description: "One plain sentence that says what the post is about.",
  date: "YYYY-MM-DD",
  tags: ["specific topic"],
  sections: [
    {
      paragraphs: [
        "Opening paragraph.",
        "Another paragraph.",
      ],
    },
    {
      title: "An optional sentence-case heading",
      paragraphs: ["More of the post."],
    },
  ],
},
```

## Edit an existing thought

Find the post by slug and make only the requested changes. Run the same editorial pass and checks. Update the RSS item if the title, description, date, or slug changes, and update the sitemap if the slug changes.
