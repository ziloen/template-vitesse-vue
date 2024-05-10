## Vue Vite template

### Browser supports

 - Chrome 92+
 - Edge 92+
 - Safari 15.4+
 - Firefox 95+
 - Opera 78+
 - not ie

Based on feature can not polyfill:

| API                   | Chrome | Firefox | Safari | Edge | Opera |
| :-------------------- | :----- | :------ | :----- | :--- | :---- |
| `aspect-ratio`        | 88     | 89      | 15     | 88   | 74    |
| `crypto.randomUUID()` | 92     | 95      | 15.4   | 92   | 78    |
| `:has()`selector      | 105    | 121     | 15.4   | 105  | 91    |
| `lh` unit             | 109    | 120     | 16.4   | 109  | 95    |
| CSS Subgrid           | 117    | 71      | 16.0   | 117  | 103   |
| OffscreenCanvas       | 67     | 105     | 16.2   | 79   | 64    |