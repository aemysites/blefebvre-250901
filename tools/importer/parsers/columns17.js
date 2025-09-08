/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process if element contains the expected grid
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columnDivs = Array.from(grid.children);

  // For each column, find the image container and get the image element
  const columns = columnDivs.map((colDiv) => {
    // Defensive: Find the first img inside this column
    const img = colDiv.querySelector('img');
    if (img) {
      return img;
    }
    // If no img, fallback to the column div itself
    return colDiv;
  });

  // Table header row
  const headerRow = ['Columns block (columns17)'];
  // Table content row: one cell per column
  const contentRow = columns;

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
