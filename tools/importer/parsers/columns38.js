/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Header row as required
  const headerRow = ['Columns block (columns38)'];

  // Second row: each cell is the content of a column div (image only)
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    // Reference the existing image element if present
    return img ? img : '';
  });

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
