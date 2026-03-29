import fs from 'fs';

let content = fs.readFileSync('src/components/ProjectsCard.jsx', 'utf8');

// Add useMemo to react imports (if react exists, otherwise import it)
if (!content.includes('import React')) {
  // Try to find an existing react import
  if (content.match(/import\s+{[^}]*}\s+from\s+["']react["']/)) {
     content = content.replace(/import\s+{([^}]*)}\s+from\s+["']react["']/, (match, p1) => {
         if (p1.includes('useMemo')) return match;
         return `import { ${p1}, useMemo } from "react"`;
     });
  } else {
     // Prepend the import
     content = `import { useMemo } from "react";\n${content}`;
  }
}

// Replace the sanitizeUrl calls
content = content.replace(
  /const safeUrl = sanitizeUrl\(url\);/g,
  `const safeUrl = useMemo(() => sanitizeUrl(url), [url]);`
);

content = content.replace(
  /const safeGithub = sanitizeUrl\(github\);/g,
  `const safeGithub = useMemo(() => sanitizeUrl(github), [github]);`
);

fs.writeFileSync('src/components/ProjectsCard.jsx', content);
