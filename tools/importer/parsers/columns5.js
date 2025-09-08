/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists and is a container with columns
  if (!element || !element.classList.contains('grid-layout')) return;

  // Header row as specified
  const headerRow = ['Columns (columns5)'];

  // Get all immediate children (each column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its main content (image or other)
  const columns = columnDivs.map((colDiv) => {
    // Find the first image inside this column
    const img = colDiv.querySelector('img');
    if (img) return img;
    // If no image, include the whole column div
    return colDiv;
  });

  // Build the table rows
  const cells = [
    headerRow,
    columns
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
