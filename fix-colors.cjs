const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Fix: rgba(var(--text-primary), X) -> rgb(var(--text-primary) / X)
    // This handles inline style strings like style={{ background: 'rgba(var(--text-primary),0.5)' }}
    content = content.replace(/rgba\(var\(--text-primary\)\s*,\s*([\d.]+)\)/g, 'rgb(var(--text-primary) / $1)');
    
    // Fix: rgba(var(--bg-primary), X) -> rgb(var(--bg-primary) / X)
    content = content.replace(/rgba\(var\(--bg-primary\)\s*,\s*([\d.]+)\)/g, 'rgb(var(--bg-primary) / $1)');
    
    // Fix: rgba(var(--bg-card), X) -> rgb(var(--bg-card) / X)
    content = content.replace(/rgba\(var\(--bg-card\)\s*,\s*([\d.]+)\)/g, 'rgb(var(--bg-card) / $1)');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed ${path.basename(filePath)}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
            processFile(fullPath);
        }
    }
}

walkDir(componentsDir);
processFile(path.join(__dirname, 'src', 'App.jsx'));
processFile(path.join(__dirname, 'src', 'index.css'));
console.log('Done.');
