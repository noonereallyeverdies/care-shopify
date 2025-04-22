import { Link } from '@remix-run/react';
import type { EnhancedMenu, ChildEnhancedMenuItem } from '~/lib/utils'; // Import types

export function FooterFallback() {
  // Basic fallback structure
  return (
    <footer className="footer fallback">
      <p>&copy; {new Date().getFullYear()} Care-atin. All rights reserved.</p>
    </footer>
  );
}

// Placeholder for the actual Footer component
// Needs props definition based on layout data (e.g., menu items)
export function Footer({ footer }: { footer?: EnhancedMenu | null }) {
  // Replace with actual footer implementation later
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Render links dynamically from the footer menu */}
        {footer?.items && footer.items.length > 0 && (
          <div className="footer-column">
            {/* Optional: Use menu title or a static title */}
            <h4>Support</h4> 
            <ul>
              {footer.items.map((item: ChildEnhancedMenuItem) => (
                <li key={item.id}>
                  <Link to={item.to} target={item.target}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Add other columns as needed (e.g., for newsletter, social icons) */}
      </div>
      <div className="footer-bottom">
         <p>&copy; {new Date().getFullYear()} Care-atin. All rights reserved.</p>
      </div>
    </footer>
  );
} 