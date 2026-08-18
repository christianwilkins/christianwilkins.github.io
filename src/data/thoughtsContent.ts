export interface ThoughtLink {
  text: string;
  href: string;
}

export type ThoughtParagraph =
  | string
  | {
      text: string;
      links: ThoughtLink[];
    };

export interface ThoughtSection {
  title?: string;
  paragraphs: ThoughtParagraph[];
}

export interface ThoughtPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  sections: ThoughtSection[];
}

export const thoughtsIntro = {
  title: "Thoughts",
  subtitle: "Personal notes on whatever has my attention.",
  description:
    "A personal blog by Christian Wilkins about work, technology, life, and ideas in progress.",
};

export const thoughtPosts: ThoughtPost[] = [
  {
    slug: "tapped-into-the-source",
    title: "Tapped into the source",
    description:
      "A thought about intuition, performance, and doing work for reasons that matter to you.",
    date: "2026-08-16",
    tags: ["intuition", "motivation"],
    sections: [
      {
        paragraphs: [
          {
            text: "I recently listened to Rick Rubin talk about \"the Source\" in an episode of Huberman Lab about creativity. He was describing the kind of person who seems especially connected to whatever drives their work.",
            links: [
              {
                text: "an episode of Huberman Lab about creativity",
                href: "https://www.hubermanlab.com/episode/rick-rubin-how-to-access-your-creativity?timestamp=2487",
              },
            ],
          },
          "The phrase \"tapped into the source\" stuck with me because it names something I recognize but have a hard time defining. I take it to mean paying attention to the right things, listening to inspiration when it shows up, and trusting your intuition enough to follow it.",
          "It also requires being grounded. You have to know what matters to you and what matters in life, or at least be trying to figure that out. The work comes from wanting to do it well and wanting it to fulfill something in you.",
        ],
      },
      {
        title: "When the performance becomes the point",
        paragraphs: [
          "Examples of the opposite made the idea clearer for me. I see people online perform beliefs instead of living by them. They virtue signal. They act like they care because it gets them approval, attention, or access to somebody they want.",
          {
            text: "I recently watched Our Hero, Balthazar, and that disconnect is basically the whole premise. The movie follows a wealthy teenager who performs his politics online partly to impress his activist crush and partly to get attention online.",
            links: [
              {
                text: "Our Hero, Balthazar",
                href: "https://ourherobalthazar.com/",
              },
            ],
          },
          "His actions and the values he claims to care about are completely disconnected. When your motivation is built around being seen as good, attractive, smart, or morally correct, other people end up steering you. Every decision gets filtered through the reaction you want.",
          "External motivation can pull you further away from whatever mattered in the first place. You can get attention and still feel detached from what you're doing. You can even do something that looks good from the outside while knowing the reasons behind it are empty.",
          "I've also recently noticed how many people can't sit down and explain why they're doing what they're doing. I don't think everything needs some huge reason behind it. But sometimes people never think about the larger questions underneath the choices they keep making.",
        ],
      },
      {
        title: "Buying the feeling of doing the work",
        paragraphs: [
          {
            text: "I recently saw a post on X about gear acquisition syndrome, and it gave me another way to think about the same problem. The term usually describes musicians who keep buying equipment because they believe one more piece of gear will make the music better.",
            links: [
              {
                text: "gear acquisition syndrome",
                href: "https://pure.hud.ac.uk/en/publications/gear-acquisition-syndrome-consumption-of-instruments-and-technolo/",
              },
            ],
          },
          "Buying gear and showing it off can give you some of the same feeling as making music. The purchase starts to stand in for progress. You get to feel like a musician without sitting down and doing the work.",
          "It extends far beyond music. You can spend your time buying running gear instead of running. You can convince yourself you need a fancy computer before you learn programming or start using AI, even though you probably already have something good enough to take the first steps.",
          "Our lives have become abstracted from the things we originally set out to do. The products and identity around an activity can replace the activity itself. Buying your way toward the result feels easier than doing the work, even though the work was the reason you cared in the first place.",
        ],
      },
      {
        paragraphs: [
          "I think being tapped into the source requires alignment between what matters to you and what you choose to do. It means trying to do your best work because the work matters to you, and trying to build a life that feels fulfilling without letting every external reaction decide what deserves your attention.",
          "I don't have a perfect definition of the source yet. I just know it has something to do with being grounded enough to hear your own intuition, then following it for reasons that feel like your own.",
        ],
      },
    ],
  },
];

export function getThoughtParagraphText(paragraph: ThoughtParagraph) {
  return typeof paragraph === "string" ? paragraph : paragraph.text;
}

export function getThoughtSourceUrls(post: ThoughtPost) {
  return [
    ...new Set(
      post.sections.flatMap((section) =>
        section.paragraphs.flatMap((paragraph) =>
          typeof paragraph === "string" ? [] : paragraph.links.map((link) => link.href),
        ),
      ),
    ),
  ];
}

export function getThoughtReadingTime(post: ThoughtPost) {
  const words = [
    post.title,
    post.description,
    ...post.sections.flatMap((section) => [
      section.title ?? "",
      ...section.paragraphs.map(getThoughtParagraphText),
    ]),
  ]
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 225))} min read`;
}
