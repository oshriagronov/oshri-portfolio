import fs from 'fs';

let content = fs.readFileSync('eslint.config.js', 'utf-8');

// The spread of react configs overrides the "react/prop-types" rule!
// Move the custom rules *after* the spreads.
content = content.replace(
  '"react/prop-types": "off",\n      ...js.configs.recommended.rules,\n      ...react.configs.recommended.rules,\n      ...react.configs[\'jsx-runtime\'].rules,\n      ...reactHooks.configs.recommended.rules,',
  '...js.configs.recommended.rules,\n      ...react.configs.recommended.rules,\n      ...react.configs[\'jsx-runtime\'].rules,\n      ...reactHooks.configs.recommended.rules,\n      "react/prop-types": "off",'
);

fs.writeFileSync('eslint.config.js', content);

let aboutContent = fs.readFileSync('src/components/About.jsx', 'utf-8');
aboutContent = aboutContent.replace(
  "I'm an eternal student",
  "I&apos;m an eternal student"
).replace(
  "things. It's a journey",
  "things. It&apos;s a journey"
).replace(
  "always what I've loved",
  "always what I&apos;ve loved"
);
fs.writeFileSync('src/components/About.jsx', aboutContent);


let heroContent = fs.readFileSync('src/components/Hero.jsx', 'utf-8');
heroContent = heroContent.replace(
  "I'm Oshri",
  "I&apos;m Oshri"
);
fs.writeFileSync('src/components/Hero.jsx', heroContent);

console.log("Patched correctly.");
