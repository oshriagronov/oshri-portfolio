import fs from 'fs';

const content = fs.readFileSync('src/components/ProjectsCard.jsx', 'utf-8');

const newContent = content
  .replace(
    'import { TbWorldWww } from "react-icons/tb";',
    'import { TbWorldWww } from "react-icons/tb";\nimport { sanitizeUrl } from "../utils/sanitizeUrl";'
  )
  .replace(
    '<a href={url}>',
    '<a href={sanitizeUrl(url)}>'
  )
  .replace(
    '<a href={github}>',
    '<a href={sanitizeUrl(github)}>'
  );

fs.writeFileSync('src/components/ProjectsCard.jsx', newContent);
console.log("Patched successfully.");
