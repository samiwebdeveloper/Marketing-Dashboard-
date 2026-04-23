// Anthropic warm-cream design system for PSDF Marketing Dashboard

export const THEME = {
  Backgrounds: {
    bg: { hex: "#FAF7F2", label: "Page Background", use: "Main app background" },
    surface: { hex: "#F4EFE6", label: "Surface", use: "Cards inner sections, input fields" },
    card: { hex: "#FFFFFF", label: "Card", use: "All white cards & panels" },
  },
  Borders: {
    border: { hex: "#E8E0D4", label: "Border", use: "Default card/input borders" },
    borderH: { hex: "#C8B89A", label: "Border Hover", use: "Hover state borders" },
  },
  "Coral (Primary Accent)": {
    coral: { hex: "#C5522A", label: "Coral", use: "CTAs, active tabs, highlights" },
    coralL: { hex: "#E8734A", label: "Coral Light", use: "Hover states, gradients" },
    coralBg: { hex: "#FDF1EC", label: "Coral Background", use: "Alert cards, AI briefing bg" },
  },
  Text: {
    ink: { hex: "#1A1611", label: "Ink", use: "Primary headings & values" },
    inkMid: { hex: "#3D3530", label: "Ink Mid", use: "Body text, table rows" },
    muted: { hex: "#8C7B6E", label: "Muted", use: "Labels, subtitles, captions" },
    mutedL: { hex: "#B5A596", label: "Muted Light", use: "Placeholder, helper text" },
  },
  Teal: {
    teal: { hex: "#2B6B6B", label: "Teal", use: "Secondary charts, lines" },
    tealBg: { hex: "#EBF4F4", label: "Teal Background", use: "Teal tinted sections" },
  },
  Green: {
    green: { hex: "#2E7D52", label: "Green", use: "Positive deltas, success states" },
    greenBg: { hex: "#EBF5EF", label: "Green Background", use: "Success badge backgrounds" },
  },
  Red: {
    red: { hex: "#C0392B", label: "Red", use: "Negative deltas, error states" },
    redBg: { hex: "#FDECEA", label: "Red Background", use: "Error badge backgrounds" },
  },
  Platforms: {
    instagram: { hex: "#E1306C", label: "Instagram", use: "IG charts, badges, borders" },
    youtube: { hex: "#CC0000", label: "YouTube", use: "YT charts, badges, borders" },
    facebook: { hex: "#1877F2", label: "Facebook Ads", use: "FB paid charts, badges" },
    fbPage: { hex: "#0866FF", label: "Facebook Page", use: "FB organic charts, badges" },
    twitter: { hex: "#1A1611", label: "X / Twitter", use: "X/Twitter charts, badges" },
    tiktok: { hex: "#000000", label: "TikTok", use: "TikTok charts, badges" },
    linkedin: { hex: "#0A66C2", label: "LinkedIn", use: "LinkedIn charts, badges" },
    purple: { hex: "#7C3AED", label: "Purple", use: "Saves metric bars" },
  },
};

// CSS Variables token object for easy usage
export const T = {
  // Backgrounds
  bg: "#FAF7F2",        // Page background
  surface: "#F4EFE6",   // Sections / inputs
  card: "#FFFFFF",      // Cards

  // Borders
  border: "#E8E0D4",    // Default
  borderH: "#C8B89A",   // Hover

  // Coral — Primary accent
  coral: "#C5522A",     // CTA, active, highlights
  coralL: "#E8734A",    // Hover / gradients
  coralBg: "#FDF1EC",   // Tinted backgrounds

  // Text
  ink: "#1A1611",       // Headings & values
  inkMid: "#3D3530",    // Body text
  muted: "#8C7B6E",     // Labels & captions
  mutedL: "#B5A596",    // Placeholders

  // Teal — Secondary
  teal: "#2B6B6B",
  tealBg: "#EBF4F4",

  // Semantic
  green: "#2E7D52",     // Positive / success
  greenBg: "#EBF5EF",
  red: "#C0392B",       // Negative / error
  redBg: "#FDECEA",

  // Platforms
  instagram: "#E1306C",
  youtube: "#CC0000",
  facebook: "#1877F2",
  fbPage: "#0866FF",
  twitter: "#1A1611",
  tiktok: "#000000",
  linkedin: "#0A66C2",
  purple: "#7C3AED",    // Saves metric
};

// Platform config with colors
export const PLATFORMS = {
  youtube: {
    name: "YouTube",
    color: T.youtube,
    logo: "📺",
    metrics: ["views", "watch_time", "subscribers", "engagement_rate", "ctr", "impressions"],
  },
  tiktok: {
    name: "TikTok",
    color: T.tiktok,
    logo: "🎵",
    metrics: ["views", "likes", "shares", "followers", "engagement_rate", "video_plays"],
  },
  instagram: {
    name: "Instagram",
    color: T.instagram,
    logo: "📷",
    metrics: ["reach", "impressions", "engagement_rate", "followers", "saves", "comments"],
  },
  facebook: {
    name: "Facebook",
    color: T.facebook,
    logo: "👥",
    metrics: ["reach", "engagement", "followers", "page_likes", "shares", "post_engagement"],
  },
  linkedin: {
    name: "LinkedIn",
    color: T.linkedin,
    logo: "💼",
    metrics: ["impressions", "engagement_rate", "followers", "shares", "comments", "clicks"],
  },
  twitter: {
    name: "X/Twitter",
    color: T.twitter,
    logo: "𝕏",
    metrics: ["impressions", "engagement_rate", "followers", "retweets", "likes", "replies"],
  },
};
