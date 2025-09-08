/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two column areas
  const grids = element.querySelectorAll(':scope > div > .w-layout-grid');
  const mainGrid = grids[0]; // The grid with headline/content
  const imageGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');

  // --- LEFT COLUMN ---
  // Eyebrow and headline
  const headlineBlock = mainGrid.children[0];
  // --- RIGHT COLUMN ---
  // Paragraph, author, button
  const contentBlock = mainGrid.children[1];

  // --- IMAGES ---
  let images = [];
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  }

  // Compose left column: headline block + first image
  const leftColumn = document.createElement('div');
  // Move (not clone) the headline block and image into the left column
  if (headlineBlock) leftColumn.appendChild(headlineBlock);
  if (images[0]) leftColumn.appendChild(images[0]);

  // Compose right column: content block + second image
  const rightColumn = document.createElement('div');
  if (contentBlock) rightColumn.appendChild(contentBlock);
  if (images[1]) rightColumn.appendChild(images[1]);

  // Table header as per block guidelines
  const headerRow = ['Columns (columns16)'];
  const contentRow = [leftColumn, rightColumn];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
