#!/bin/bash

# Create optimized versions of packaging images
echo "Optimizing packaging images..."
for img in images/packaging/*.jpg; do
  filename=$(basename "$img")
  # Create a 1200px wide version (large enough for most web uses)
  sharp -i "$img" -o "optimized-images/packaging/${filename%.*}.webp" resize 1200 -q 80
  # Create a 600px wide version for smaller screens
  sharp -i "$img" -o "optimized-images/packaging/${filename%.*}-600.webp" resize 600 -q 80
  # Create JPG fallbacks for browsers that don't support WebP
  sharp -i "$img" -o "optimized-images/packaging/${filename%.*}.jpg" resize 1200 -q 80
  sharp -i "$img" -o "optimized-images/packaging/${filename%.*}-600.jpg" resize 600 -q 80
done

# Optimize product images
echo "Optimizing product images..."
for img in images/products/*.jpg images/products/*.png; do
  if [ -f "$img" ]; then
    filename=$(basename "$img")
    # Create a 800px wide version (large enough for product displays)
    sharp -i "$img" -o "optimized-images/products/${filename%.*}.webp" resize 800 -q 80
    # Create a 400px wide version for smaller screens
    sharp -i "$img" -o "optimized-images/products/${filename%.*}-400.webp" resize 400 -q 80
    # Create JPG fallbacks
    sharp -i "$img" -o "optimized-images/products/${filename%.*}.jpg" resize 800 -q 80
    sharp -i "$img" -o "optimized-images/products/${filename%.*}-400.jpg" resize 400 -q 80
  fi
done

# Optimize banner images
echo "Optimizing banner images..."
for img in images/banners/*.jpg; do
  filename=$(basename "$img")
  # Create a 1600px wide version (for large screens)
  sharp -i "$img" -o "optimized-images/banners/${filename%.*}.webp" resize 1600 -q 80
  # Create a 800px wide version for smaller screens
  sharp -i "$img" -o "optimized-images/banners/${filename%.*}-800.webp" resize 800 -q 80
  # Create JPG fallbacks
  sharp -i "$img" -o "optimized-images/banners/${filename%.*}.jpg" resize 1600 -q 80
  sharp -i "$img" -o "optimized-images/banners/${filename%.*}-800.jpg" resize 800 -q 80
done

# Optimize icons and logos (keep original size but optimize)
echo "Optimizing icons and logos..."
for img in images/icons/*.png; do
  filename=$(basename "$img")
  sharp -i "$img" -o "optimized-images/icons/${filename%.*}.webp" -q 90
  sharp -i "$img" -o "optimized-images/icons/${filename%.*}.png" -q 90
done

for img in images/logo/*.jpg; do
  filename=$(basename "$img")
  sharp -i "$img" -o "optimized-images/logo/${filename%.*}.webp" -q 90
  sharp -i "$img" -o "optimized-images/logo/${filename%.*}.jpg" -q 90
done

echo "Image optimization complete!"
