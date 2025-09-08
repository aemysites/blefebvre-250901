/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid container (columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the immediate children of the grid (should be two columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: content block (text, heading, button)
  const leftCol = columns[0];
  // Second column: image
  const rightCol = columns[1];

  // Table header row
  const headerRow = ['Columns block (columns27)'];

  // Table content row: each column as a cell
  const contentRow = [leftCol, rightCol];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
