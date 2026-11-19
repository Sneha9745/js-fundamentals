# Design Tokens Documentation

## 1. Background Colors

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| --bg | #f8fafc | #0b1220 | Main background |
| --surface | #ffffff | #131c2e | Cards and surfaces |

## 2. Text Colors

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| --text | #0f172a | #e2e8f0 | Main text |
| --muted | #64748b | #94a3b8 | Secondary text |

## 3. Primary Colors

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| --primary | #0ea5e9 | #38bdf8 | Buttons and links |
| --primary-contrast | #ffffff | #06202e | Text on primary buttons |

## 4. Border and Radius

| Token | Value | Usage |
|---|---|---|
| --border | #e2e8f0 (Light), #243049 (Dark) | Borders |
| --radius | 0.75rem | Rounded corners |

## 5. Typography

| Token | Value | Usage |
|---|---|---|
| --font-sans | Inter, system-ui, sans-serif | Main font |

## 6. Theme System

The application supports Light Mode and Dark Mode.
CSS variables change according to the data-theme attribute.
Users can switch themes using the theme toggle button.

## 7. Responsive Design

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

CSS Grid is used for feature cards, while Flexbox is used for the hero section.