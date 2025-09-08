/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Columns block (columns36)'];

  // Get the immediate grid children (the two columns)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: text content (heading, subheading, buttons)
  const textCol = gridChildren[0];

  // Second column: images grid
  const imagesCol = gridChildren[1];
  // The images are inside a nested .w-layout-grid
  const imagesGrid = imagesCol.querySelector('.w-layout-grid');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Compose the first row of content (columns)
  // First cell: textCol (all content)
  // Next cells: each image as its own cell
  const rowCells = [textCol, ...images];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    rowCells
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
