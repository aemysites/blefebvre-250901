/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check for tab menu and content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');
  if (!tabMenu || !tabContent) return;

  // Get all tab labels (anchors in tab menu)
  const tabLinks = Array.from(tabMenu.querySelectorAll('a'));
  // Get all tab panes (tab content)
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Defensive: ensure matching number of tabs and panes
  if (tabLinks.length !== tabPanes.length) return;

  // Header row as specified
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // For each tab, extract label and content
  for (let i = 0; i < tabLinks.length; i++) {
    const link = tabLinks[i];
    // Tab label: use the text content of the anchor or its child div
    let label = '';
    const labelDiv = link.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = link.textContent.trim();
    }

    // Tab content: reference the inner content of the pane
    const pane = tabPanes[i];
    // Defensive: skip if pane is missing
    if (!pane) continue;
    // Usually the pane has a single grid div as its first child
    // We'll reference the first child div (the grid), or fallback to the pane itself
    let contentElem = pane.querySelector('div') || pane;

    rows.push([label, contentElem]);
  }

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
