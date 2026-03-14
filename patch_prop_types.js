import fs from 'fs';

let content = fs.readFileSync('src/components/ProjectsCard.jsx', 'utf-8');

// add key to map
content = content.replace(
  '<span className="px-4 py-1.5 bg-gray-100 dark:bg-slate-800 shadow-md sub-text text-sm rounded-full">',
  '<span key={item} className="px-4 py-1.5 bg-gray-100 dark:bg-slate-800 shadow-md sub-text text-sm rounded-full">'
);

fs.writeFileSync('src/components/ProjectsCard.jsx', content);
console.log("Patched ProjectsCard.jsx successfully.");
