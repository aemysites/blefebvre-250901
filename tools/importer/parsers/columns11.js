/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (should be two: content and image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: content block (heading, paragraph, buttons)
  const leftCol = columns.find((col) => col.querySelector('h2'));
  // Right column: image
  const rightCol = columns.find((col) => col.tagName === 'IMG');

  // Defensive fallback if structure is different
  const leftContent = leftCol || columns[0];
  const rightContent = rightCol || columns.find((col) => col.tagName === 'IMG') || columns[1];

  // Table header
  const headerRow = ['Columns (columns11)'];
  // Table content row: left column (content), right column (image)
  const contentRow = [leftContent, rightContent];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
