const allEmotionTags = [
  `blush`,
  `nose blush`,
  `smile`,
  `light smile`,
  `parted lips`,
  `:d`,
  `;d`,
  `:\\)`,
  `;\\)`,
  `:o`,
  `;o`,
  `open mouth`,
  `closed mouth`,
  `half-closed eyes`,
  `expressionless`,
  `surprised`,
  `embarrassed`,
  `nervous`,
  `flustered`,
  `naughty face`,
  `scowl`,
  `one eye closed`,
  `profile`, // TODO
] as const satisfies readonly string[];
export type EmotionTag = (typeof allEmotionTags)[number];
