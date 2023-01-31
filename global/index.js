const currentTime = new Date().getTime();
const TERMS = "#";
const WHITEPAPER = `#?${currentTime}`;
const SOCIALS = {
  discord: {
    label: "@sharkracecom",
    url: "https://discord.gg/sharkracecom"
  },
  twitter: {
    label: "@sharkracecom",
    url: "https://twitter.com/sharkracecom"
  },
  telegram: {
    label: "@sharkracecom",
    url: "https://t.me/sharkracecom"
  },
  instagram: {
    label: "@sharkracecom",
    url: "https://www.instagram.com/sharkracecom/"
  },
  youtube: {
    label: "@sharkracecom",
    url: "https://www.youtube.com/c/sharkracecom"
  },
  medium: {
    label: "@sharkracecom",
    url: "https://medium.com/@sharkracecom"
  },
  facebook: {
    label: "@sharkracecom",
    url: "https://www.facebook.com/sharkracecom/"
  },
  tiktok: {
    label: "@sharkrace",
    url: "https://www.tiktok.com/@sharkrace"
  },
  linkedin: {
    label: "@sharkracecom",
    url: "https://www.linkedin.com/company/sharkracecom/"
  }
};
/* eslint-disable */
const LAYERS = [
  { ids: [1, 17],      category: "background",         label: "Background" },
  { ids: [2],          category: "back",               label: "Back" },
  { ids: [3, 6, 10],   category: "body",               label: "Body" },
  { ids: [4, 7, 11],   category: "outfit",             label: "Outfit" },
  { ids: [5],          category: "left-hand",          label: "Left fin" },
  { ids: [8],          category: "neck",               label: "Neck" },
  { ids: [9],          category: "under-right-hand",   label: "Under right fin" },
  { ids: [12],         category: "over-right-hand",    label: "Over right fin" },
  { ids: [13],         category: "mouth",              label: "Mouth" },
  { ids: [14],         category: "head",               label: "Head" },
  { ids: [15],         category: "eye",                label: "Eye" },
  { ids: [16],         category: "nose",               label: "Nose" }
]
export { SOCIALS, TERMS, WHITEPAPER, LAYERS };
