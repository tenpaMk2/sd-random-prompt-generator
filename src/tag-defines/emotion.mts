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
  `torogao`,
  `heavy breathing`,
] as const satisfies readonly string[];
export type EmotionTag = (typeof allEmotionTags)[number];

const allProfileTags = [`profile`] as const satisfies readonly string[];
export type ProfileTag = (typeof allProfileTags)[number];

export const profileExcludeTags = [
  `one eye closed`,
] as const satisfies EmotionTag[];
