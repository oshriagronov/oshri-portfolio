import fs from 'fs';

const content = fs.readFileSync('src/utils/sanitizeUrl.js', 'utf-8');

const newContent = content.replace('catch (e) {', 'catch {');

fs.writeFileSync('src/utils/sanitizeUrl.js', newContent);
console.log("Patched sanitizeUrl.js successfully.");
