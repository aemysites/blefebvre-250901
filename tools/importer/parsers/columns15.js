/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element is a header with expected structure
  if (!element || !element.classList.contains('section')) return;

  // Find the main grid layout containing the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid (should be two: content and image)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: text content (heading, paragraph, buttons)
  const contentCol = gridChildren[0];
  // Second column: image
  const imageCol = gridChildren[1];

  // --- First cell: left column ---
  // We'll include ALL content blocks in the left cell (not just heading, subheading, buttons)
  // This ensures all text content is included
  const leftCellContent = [];
  // Get all children of the contentCol (should be heading, subheading, button group)
  Array.from(contentCol.children).forEach(child => {
    leftCellContent.push(child);
  });

  // --- Second cell: right column ---
  // We'll include the image as the second cell
  let rightCellContent = [];
  // If the imageCol is an img, use it directly, else find the first img inside
  if (imageCol.tagName === 'IMG') {
    rightCellContent = [imageCol];
  } else {
    const img = imageCol.querySelector('img');
    if (img) rightCellContent = [img];
  }

  // Build the table rows
  const headerRow = ['Columns (columns15)'];
  const contentRow = [leftCellContent, rightCellContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
