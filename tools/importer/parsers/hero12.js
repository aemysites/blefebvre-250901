/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid layout (top-level)
  const grid = element.querySelector('.w-layout-grid.grid-layout.desktop-1-column');
  if (!grid) return;

  // Get all immediate children of the grid
  const gridChildren = grid.querySelectorAll(':scope > div');
  if (gridChildren.length < 2) return;

  // Row 1: header
  const headerRow = ['Hero (hero12)'];

  // Row 2: background image (optional)
  // The first child contains the background image
  const bgImageContainer = gridChildren[0];
  const bgImg = bgImageContainer.querySelector('img');
  const bgRow = [bgImg ? bgImg : ''];

  // Row 3: content (headline, subheading, CTA)
  // The second child contains the card with content
  const contentContainer = gridChildren[1];
  // Defensive: find the card body
  const cardBody = contentContainer.querySelector('.card-body');
  let contentRowCell;
  if (cardBody) {
    // The grid inside the card body
    const innerGrid = cardBody.querySelector('.w-layout-grid.grid-layout');
    if (innerGrid) {
      // Compose all content in one cell
      contentRowCell = innerGrid;
    } else {
      contentRowCell = cardBody;
    }
  } else {
    contentRowCell = contentContainer;
  }
  const contentRow = [contentRowCell];

  // Compose table
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
