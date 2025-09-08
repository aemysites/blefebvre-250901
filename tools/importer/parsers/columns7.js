/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element is present
  if (!element) return;

  // Header row for the block table
  const headerRow = ['Columns block (columns7)'];

  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid (should be two columns)
  const columns = Array.from(grid.children);

  // Defensive: ensure there are at least two columns
  if (columns.length < 2) return;

  // First column: heading (h2)
  const col1 = columns[0];
  // Second column: paragraph and button
  const col2 = columns[1];

  // Build the second row: each cell is the full column content
  // Reference the actual column elements for resilience
  const secondRow = [col1, col2];

  // Build the table
  const cells = [headerRow, secondRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
