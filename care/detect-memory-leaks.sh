#!/bin/bash

# Memory Leak Detection Script for React Components

echo "🔍 Memory Leak Detection - Scanning React Components"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

TOTAL_ISSUES=0

echo -e "${BLUE}Scanning for potential memory leaks...${NC}\n"

# Function to check a pattern and report results
check_pattern() {
    local pattern="$1"
    local description="$2"
    local files=$(grep -r "$pattern" app --include="*.tsx" --include="*.ts" -l)
    
    if [ ! -z "$files" ]; then
        echo -e "${YELLOW}⚠️  $description${NC}"
        echo "Files with potential issues:"
        echo "$files" | while read file; do
            echo "  - $file"
        done
        echo
        TOTAL_ISSUES=$((TOTAL_ISSUES + 1))
    fi
}

# Check for missing interval cleanup
echo -e "${BLUE}1. Checking for missing interval cleanup...${NC}"
check_pattern "setInterval.*useEffect" "Missing interval cleanup - check for clearInterval in useEffect cleanup"

# Check for missing event listener cleanup
echo -e "${BLUE}2. Checking for missing event listener cleanup...${NC}"
check_pattern "addEventListener.*useEffect" "Missing event listener cleanup - check for removeEventListener"

# Check for missing observer cleanup
echo -e "${BLUE}3. Checking for IntersectionObserver cleanup...${NC}"
check_pattern "IntersectionObserver.*useEffect" "Missing IntersectionObserver cleanup - check for disconnect()"

# Check for requestAnimationFrame without cleanup
echo -e "${BLUE}4. Checking for requestAnimationFrame cleanup...${NC}"
check_pattern "requestAnimationFrame.*useEffect" "Missing requestAnimationFrame cleanup - check for cancelAnimationFrame"

# Check for document/body style changes
echo -e "${BLUE}5. Checking for document/body style modifications...${NC}"
check_pattern "document\.body\.style\|document\.style" "Document/body style changes - ensure restoration in cleanup"

# Check for useEffect without cleanup functions
echo -e "${BLUE}6. Checking for useEffect hooks with side effects but no cleanup...${NC}"
grep -r "useEffect" app --include="*.tsx" --include="*.ts" | grep -v "return () =>" | grep -v "// eslint-disable" > temp_useeffects.txt
if [ -s temp_useeffects.txt ]; then
    echo -e "${YELLOW}⚠️  Found useEffect hooks that might need cleanup functions:${NC}"
    head -10 temp_useeffects.txt
    echo "... (showing first 10 results)"
    echo
    TOTAL_ISSUES=$((TOTAL_ISSUES + 1))
fi
rm -f temp_useeffects.txt

# Check for components with multiple useEffect hooks (potential complexity)
echo -e "${BLUE}7. Checking for components with multiple useEffect hooks...${NC}"
for file in $(find app -name "*.tsx" -o -name "*.ts" | grep -v ".d.ts"); do
    if [ -f "$file" ]; then
        count=$(grep -c "useEffect" "$file" 2>/dev/null | tr -d '\n' || echo "0")
        # Ensure count is a valid integer
        if [[ "$count" =~ ^[0-9]+$ ]] && [ "$count" -gt 3 ]; then
            echo -e "${YELLOW}⚠️  $file has $count useEffect hooks - consider component complexity${NC}"
            TOTAL_ISSUES=$((TOTAL_ISSUES + 1))
        fi
    fi
done

# Generate report
echo -e "\n${BLUE}Memory Leak Detection Summary${NC}"
echo "=============================="

if [ $TOTAL_ISSUES -eq 0 ]; then
    echo -e "${GREEN}✅ No obvious memory leak patterns detected!${NC}"
else
    echo -e "${RED}⚠️  Found $TOTAL_ISSUES potential memory leak patterns${NC}"
    echo -e "${YELLOW}Please review the files mentioned above and ensure proper cleanup${NC}"
fi

echo -e "\n${BLUE}Memory Leak Prevention Checklist:${NC}"
echo "1. Always return cleanup functions from useEffect"
echo "2. Clear intervals/timeouts with clearInterval/clearTimeout"  
echo "3. Remove event listeners with removeEventListener"
echo "4. Disconnect IntersectionObserver instances"
echo "5. Cancel requestAnimationFrame with cancelAnimationFrame"
echo "6. Restore document/body style changes"
echo "7. Test component mount/unmount cycles"

echo -e "\n${GREEN}Scan complete! Review any issues found above.${NC}"
