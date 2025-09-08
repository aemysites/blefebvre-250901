/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two columns: image and content
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Table header row (must match block name exactly)
  const headerRow = ['Columns (columns32)'];

  // Table content row: each cell is the actual column element
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
