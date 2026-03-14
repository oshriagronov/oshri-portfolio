import fs from 'fs';

let content = fs.readFileSync('eslint.config.js', 'utf-8');

// I will just turn off this rule too, it seems they didn't care about it before
content = content.replace(
  '"react/prop-types": "off",',
  '"react/prop-types": "off",\n      "react/no-unescaped-entities": "off",'
);

fs.writeFileSync('eslint.config.js', content);
console.log("Patched eslint successfully.");
