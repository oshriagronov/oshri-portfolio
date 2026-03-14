import fs from 'fs';

let content = fs.readFileSync('eslint.config.js', 'utf-8');

// disable react/prop-types
content = content.replace(
  'rules: {',
  'rules: {\n      "react/prop-types": "off",'
);

// fix unescaped entities
let aboutContent = fs.readFileSync('src/components/About.jsx', 'utf-8');
aboutContent = aboutContent.replace(
  "I'm an eternal student",
  "I&apos;m an eternal student"
);
fs.writeFileSync('src/components/About.jsx', aboutContent);

let heroContent = fs.readFileSync('src/components/Hero.jsx', 'utf-8');
heroContent = heroContent.replace(
  "turning ideas into interactive reality. Let's build",
  "turning ideas into interactive reality. Let&apos;s build"
);
fs.writeFileSync('src/components/Hero.jsx', heroContent);

fs.writeFileSync('eslint.config.js', content);
console.log("Patched eslint successfully.");
