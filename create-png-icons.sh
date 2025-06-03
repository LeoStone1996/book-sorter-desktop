#!/bin/bash

echo "🖼️ Creating PNG versions of the logo..."

# Check if we have ImageMagick or other conversion tools
if command -v convert &> /dev/null; then
    echo "✅ ImageMagick found, converting SVG to PNG..."
    
    # Convert SVG to different PNG sizes
    convert assets/icon.svg -resize 192x192 assets/icon-192.png
    convert assets/icon.svg -resize 512x512 assets/icon-512.png
    
    echo "✅ PNG icons created:"
    echo "   📁 assets/icon-192.png (192x192)"
    echo "   📁 assets/icon-512.png (512x512)"
    
elif command -v rsvg-convert &> /dev/null; then
    echo "✅ rsvg-convert found, converting SVG to PNG..."
    
    # Convert using rsvg-convert
    rsvg-convert -w 192 -h 192 assets/icon.svg -o assets/icon-192.png
    rsvg-convert -w 512 -h 512 assets/icon.svg -o assets/icon-512.png
    
    echo "✅ PNG icons created:"
    echo "   📁 assets/icon-192.png (192x192)"
    echo "   📁 assets/icon-512.png (512x512)"
    
else
    echo "⚠️  No SVG conversion tool found."
    echo "📝 Please convert manually:"
    echo "   1. Open assets/icon.svg in browser"
    echo "   2. Take screenshot or use online converter"
    echo "   3. Save as assets/icon-192.png (192x192)"
    echo "   4. Save as assets/icon-512.png (512x512)"
    echo ""
    echo "🌐 Online converters:"
    echo "   - https://convertio.co/svg-png/"
    echo "   - https://cloudconvert.com/svg-to-png"
fi

echo ""
echo "📱 For macOS Dock icon:"
echo "   Convert PNG to ICNS: https://convertio.co/png-icns/"
echo "   Save as: assets/icon.icns"

