import React, { useEffect, useRef, useState } from 'react';
import mermaid from "mermaid";

mermaid.initialize({
  "startOnLoad": false,
  "theme": "base",
  "themeVariables": {
    "primaryColor": "#61dafb",
    "primaryTextColor": "#282c34",
    "primaryBorderColor": "#61dafb",
  }
});

let idSeq = 0;

export function Mermaid({chart}) {
  const ref = useRef(null);
  const [id] = useState(() => `mermaid-${idSeq++}`);

  useEffect(() => {
    let cancelled = false;
    mermaid
      .render(id, chart)
      .then(({svg}) => {
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
        }
      })
      .catch((err) => {
        console.error('Mermaid render failed', err);
      });
    return () => {
      cancelled = true;
    };
  }, [id, chart]);

  return <div className="mermaid" ref={ref} />;
}
