import React from 'react';
import mermaid from "mermaid";

mermaid.initialize({
  "theme": "base",
  "themeVariables": {
    "primaryColor": "#61dafb",
    "primaryTextColor": "#282c34",
    "primaryBorderColor": "#61dafb",
  }
});

export function Mermaid({chart}) {
  mermaid.contentLoaded();
  return <div className="mermaid">{chart}</div>;
}