#!/usr/bin/env node

// Simple script to create a basic icon for testing
const fs = require('fs');
const path = require('path');

// Create a simple SVG icon
const svgIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="512" height="512" fill="url(#gradient)" rx="80"/>
  
  <!-- Gradient definition -->
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Book icon -->
  <g transform="translate(128, 128)">
    <!-- Book spine -->
    <rect x="0" y="0" width="256" height="320" fill="#ffffff" rx="8"/>
    <rect x="8" y="8" width="240" height="304" fill="#f8f9fa" rx="4"/>
    
    <!-- Book pages -->
    <rect x="20" y="40" width="216" height="4" fill="#3498db" rx="2"/>
    <rect x="20" y="60" width="180" height="3" fill="#7f8c8d" rx="1.5"/>
    <rect x="20" y="75" width="200" height="3" fill="#7f8c8d" rx="1.5"/>
    <rect x="20" y="90" width="160" height="3" fill="#7f8c8d" rx="1.5"/>
    <rect x="20" y="105" width="190" height="3" fill="#7f8c8d" rx="1.5"/>
    
    <!-- Book title area -->
    <rect x="20" y="140" width="216" height="40" fill="#3498db" rx="4"/>
    <text x="128" y="165" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">📚</text>
    
    <!-- More lines -->
    <rect x="20" y="200" width="180" height="3" fill="#7f8c8d" rx="1.5"/>
    <rect x="20" y="215" width="200" height="3" fill="#7f8c8d" rx="1.5"/>
    <rect x="20" y="230" width="160" height="3" fill="#7f8c8d" rx="1.5"/>
    <rect x="20" y="245" width="190" height="3" fill="#7f8c8d" rx="1.5"/>
    <rect x="20" y="260" width="170" height="3" fill="#7f8c8d" rx="1.5"/>
  </g>
  
  <!-- App name -->
  <text x="256" y="480" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="32" font-weight="bold">Book Sorter</text>
</svg>`;

// Ensure assets directory exists
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Write SVG file
const svgPath = path.join(assetsDir, 'icon.svg');
fs.writeFileSync(svgPath, svgIcon);

console.log('✅ Created basic SVG icon at:', svgPath);
console.log('');
console.log('📝 Next steps to get a proper icon in the Dock:');
console.log('1. Convert SVG to PNG: Use online converter or ImageMagick');
console.log('2. Create icon.png (512x512) in assets/ folder');
console.log('3. For macOS: Convert PNG to ICNS format');
console.log('4. For Windows: Convert PNG to ICO format');
console.log('');
console.log('🔧 Quick conversion commands:');
console.log('# Install ImageMagick first: brew install imagemagick');
console.log('convert assets/icon.svg -resize 512x512 assets/icon.png');
console.log('# For ICNS: Use online converter or iconutil on macOS');
console.log('# For ICO: Use online converter or ImageMagick');
console.log('');
console.log('🌐 Online converters:');
console.log('- PNG to ICNS: https://convertio.co/png-icns/');
console.log('- PNG to ICO: https://convertio.co/png-ico/');
