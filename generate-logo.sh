#!/bin/bash

echo "🎨 Generating Book Sorter Pro Logo..."

# Create the professional SVG logo directly
cat > assets/icon.svg << 'SVGEOF'
<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Main gradient background -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#764ba2;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#667eea;stop-opacity:1" />
    </linearGradient>
    
    <!-- Book gradient -->
    <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f8f9fa;stop-opacity:1" />
    </linearGradient>
    
    <!-- Accent gradient -->
    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3498db;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2980b9;stop-opacity:1" />
    </linearGradient>
    
    <!-- Shadow filter -->
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.2"/>
    </filter>
  </defs>
  
  <!-- Background with rounded corners -->
  <rect width="512" height="512" fill="url(#bgGradient)" rx="90" ry="90"/>
  
  <!-- Central logo design -->
  <g transform="translate(256, 256)">
    
    <!-- Circular background for logo -->
    <circle cx="0" cy="0" r="160" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    
    <!-- Stack of books (modern 3D design) -->
    <g transform="translate(-60, -40)">
      
      <!-- Book 1 (back, red) -->
      <g transform="translate(15, 10) rotate(-8)" filter="url(#shadow)">
        <rect x="0" y="0" width="90" height="120" fill="#e74c3c" rx="6"/>
        <rect x="6" y="6" width="78" height="108" fill="#c0392b" rx="3"/>
        <rect x="12" y="15" width="66" height="2" fill="rgba(255,255,255,0.4)" rx="1"/>
        <rect x="12" y="22" width="50" height="1.5" fill="rgba(255,255,255,0.3)" rx="0.75"/>
        <rect x="12" y="28" width="60" height="1.5" fill="rgba(255,255,255,0.3)" rx="0.75"/>
      </g>
      
      <!-- Book 2 (middle, green) -->
      <g transform="translate(25, 5) rotate(-3)" filter="url(#shadow)">
        <rect x="0" y="0" width="90" height="120" fill="#27ae60" rx="6"/>
        <rect x="6" y="6" width="78" height="108" fill="#229954" rx="3"/>
        <rect x="12" y="15" width="66" height="2" fill="rgba(255,255,255,0.4)" rx="1"/>
        <rect x="12" y="22" width="55" height="1.5" fill="rgba(255,255,255,0.3)" rx="0.75"/>
        <rect x="12" y="28" width="45" height="1.5" fill="rgba(255,255,255,0.3)" rx="0.75"/>
      </g>
      
      <!-- Book 3 (front, blue) -->
      <g transform="translate(35, 0) rotate(2)" filter="url(#shadow)">
        <rect x="0" y="0" width="90" height="120" fill="url(#accentGradient)" rx="6"/>
        <rect x="6" y="6" width="78" height="108" fill="url(#bookGradient)" rx="3"/>
        <rect x="12" y="15" width="66" height="3" fill="url(#accentGradient)" rx="1.5"/>
        <rect x="12" y="25" width="50" height="2" fill="#7f8c8d" rx="1"/>
        <rect x="12" y="32" width="60" height="2" fill="#7f8c8d" rx="1"/>
        <rect x="12" y="39" width="45" height="2" fill="#7f8c8d" rx="1"/>
        
        <!-- Book icon/symbol -->
        <circle cx="45" cy="65" r="15" fill="url(#accentGradient)"/>
        <text x="45" y="72" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">📖</text>
      </g>
    </g>
    
    <!-- Sorting arrows/indicators -->
    <g transform="translate(80, -20)">
      <!-- Up arrow -->
      <path d="M 0 10 L 8 0 L 16 10 L 12 10 L 12 20 L 4 20 L 4 10 Z" fill="rgba(255,255,255,0.8)" filter="url(#shadow)"/>
      <!-- Down arrow -->
      <path d="M 0 35 L 8 45 L 16 35 L 12 35 L 12 25 L 4 25 L 4 35 Z" fill="rgba(255,255,255,0.6)"/>
    </g>
    
    <!-- Analytics/stats indicator -->
    <g transform="translate(-120, 20)">
      <rect x="0" y="15" width="4" height="15" fill="rgba(255,255,255,0.6)" rx="2"/>
      <rect x="8" y="10" width="4" height="20" fill="rgba(255,255,255,0.7)" rx="2"/>
      <rect x="16" y="5" width="4" height="25" fill="rgba(255,255,255,0.8)" rx="2"/>
      <rect x="24" y="0" width="4" height="30" fill="rgba(255,255,255,0.9)" rx="2"/>
    </g>
  </g>
  
  <!-- App name with modern typography -->
  <text x="256" y="450" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="28" font-weight="300" opacity="0.9">Book Sorter</text>
  <text x="256" y="475" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-family="Arial, sans-serif" font-size="14" font-weight="500">PRO</text>
</svg>
SVGEOF

echo "✅ Professional Book Sorter Pro logo created!"
echo "📁 Location: assets/icon.svg"
echo ""
echo "🎨 Logo Features:"
echo "   • Modern 3D stack of books (red, green, blue)"
echo "   • Sorting arrows indicating organization"
echo "   • Analytics bars showing data insights"
echo "   • Professional gradient background"
echo "   • Clean typography with 'PRO' branding"
echo "   • Drop shadows and modern design elements"
echo ""
echo "📝 Next steps:"
echo "   1. Convert SVG to PNG (512x512)"
echo "   2. Convert PNG to ICNS for macOS"
echo "   3. Restart Electron app to see new icon"
