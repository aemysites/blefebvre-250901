/* global WebImporter */
export default function parse(element, { document }) {
  // Find all tab panes (each tab is a block instance)
  const tabPanes = Array.from(element.querySelectorAll(':scope > div.w-tab-pane'));
  tabPanes.forEach((tabPane) => {
    // Find the grid containing the cards
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Find all card links (each card is an <a>)
    const cards = Array.from(grid.children).filter((child) => child.tagName === 'A');
    const rows = [];
    // Header row: must match block name exactly
    const headerRow = ['Cards (cards28)'];
    rows.push(headerRow);
    // For each card, build a row: [image, text content]
    cards.forEach((card) => {
      // Find image (if present)
      let img = card.querySelector('img');
      // Find heading and description
      let heading = card.querySelector('h3');
      let desc = card.querySelector('.paragraph-sm');
      // Compose text cell (preserve heading and description semantics)
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      // Compose row
      rows.push([
        img || '',
        textCell
      ]);
    });
    // Create table and replace grid
    const table = WebImporter.DOMUtils.createTable(rows, document);
    grid.replaceWith(table);
  });
}