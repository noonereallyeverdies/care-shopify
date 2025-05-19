#!/bin/bash

# Change to the routes directory
cd /Users/yvonne/Desktop/care/new-hydrogen-app/app/routes

# Create a backup of all files before moving them
BACKUP_DIR="/Users/yvonne/Desktop/care/new-hydrogen-app/route-backup-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r * "$BACKUP_DIR/"

echo "Backup created at $BACKUP_DIR"
echo "Moving files to their new locations..."

# Create all necessary target directories first
echo "Creating directory structure..."
mkdir -p '($locale)/products'
mkdir -p '($locale)/collections'
mkdir -p '($locale)/cart'
mkdir -p '($locale)/account'
mkdir -p 'auth/($locale)'
mkdir -p '($locale)/pages'
mkdir -p '($locale)/policies'
mkdir -p 'api/($locale)'
mkdir -p '($locale)/blogs/news'
mkdir -p 'resources'

# Function to safely move files with special characters
move_file() {
    local src="$1"
    local dest="$2"
    
    if [ -f "$src" ]; then
        echo "Moving $src to $dest"
        mkdir -p "$(dirname "$dest")"
        mv "$src" "$dest"
    else
        echo "Warning: Source file $src not found"
    fi
}

# Move product routes
echo "Moving product routes..."
move_file '($locale).products.$handle.tsx' '($locale)/products/$handle.tsx'
move_file '($locale).products._index.tsx' '($locale)/products/index.tsx'

# Move collection routes
echo "Moving collection routes..."
move_file '($locale).collections.$collectionHandle.tsx' '($locale)/collections/$collectionHandle.tsx'
move_file '($locale).collections._index.tsx' '($locale)/collections/index.tsx'
move_file '($locale).collections.all.tsx' '($locale)/collections/all.tsx'

# Move cart routes
echo "Moving cart routes..."
move_file '($locale).cart.tsx' '($locale)/cart/index.tsx'
move_file '($locale).cart.$lines.tsx' '($locale)/cart/$lines.tsx'
move_file '($locale).cart.action.tsx' '($locale)/cart/action.tsx'

# Move account routes
echo "Moving account routes..."
move_file '($locale).account.tsx' '($locale)/account/index.tsx'
move_file '($locale).account.$.tsx' '($locale)/account/$.tsx'
move_file '($locale).account.address.$id.tsx' '($locale)/account/address.$id.tsx'
move_file '($locale).account.edit.tsx' '($locale)/account/edit.tsx'
move_file '($locale).account.orders.$id.tsx' '($locale)/account/orders.$id.tsx'

# Move auth routes (account_ routes)
echo "Moving auth routes..."
move_file '($locale).account_.authorize.ts' 'auth/($locale)/authorize.ts'
move_file '($locale).account_.login.tsx' 'auth/($locale)/login.tsx'
move_file '($locale).account_.logout.ts' 'auth/($locale)/logout.ts'

# Move page routes
echo "Moving page routes..."
move_file '($locale).pages.$pageHandle.tsx' '($locale)/pages/$pageHandle.tsx'
move_file '($locale).pages.hair-quiz.tsx' '($locale)/pages/hair-quiz.tsx'
move_file '($locale).pages.our-story.tsx' '($locale)/pages/our-story.tsx'
move_file '($locale).pages.science.tsx' '($locale)/pages/science.tsx'

# Move policy routes
echo "Moving policy routes..."
move_file '($locale).policies.$policyHandle.tsx' '($locale)/policies/$policyHandle.tsx'
move_file '($locale).policies._index.tsx' '($locale)/policies/index.tsx'

# Move API routes
echo "Moving API routes..."
move_file '($locale).api.countries.tsx' 'api/($locale)/countries.tsx'
move_file '($locale).api.products.tsx' 'api/($locale)/products.tsx'

# Move blog routes
echo "Moving blog routes..."
move_file '($locale).blogs.news.$articleHandle.tsx' '($locale)/blogs/news/$articleHandle.tsx'

# Move other routes
echo "Moving other routes..."
move_file '($locale).search.tsx' '($locale)/search.tsx'
move_file '($locale).featured-products.tsx' '($locale)/featured-products.tsx'
move_file '($locale).discount.$code.tsx' '($locale)/discount.$code.tsx'
move_file '($locale).$shopid.orders.$token.authenticate.tsx' '($locale)/$shopid.orders.$token.authenticate.tsx'

# Move resource routes
echo "Moving resource routes..."
move_file '[robots.txt].tsx' 'resources/[robots.txt].tsx'
move_file '[sitemap.xml].tsx' 'resources/[sitemap.xml].tsx'
move_file '[sitemap-empty.xml].tsx' 'resources/[sitemap-empty.xml].tsx'
move_file 'sitemap.$type.$page[.xml].tsx' 'resources/sitemap.$type.$page[.xml].tsx'

# Move index file 
move_file '($locale)._index.tsx' '($locale)/index.tsx'

echo "Route reorganization complete!"
echo "Next steps:"
echo "1. Update import references in the moved files"
echo "2. Implement consistent locale handling using the locale-utils.ts"
echo "3. Test all routes to ensure they function correctly"