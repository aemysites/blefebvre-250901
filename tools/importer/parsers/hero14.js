/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // Header row as required
  const headerRow = ['Hero (hero14)'];

  // ---
  // 1. Find the background image (row 2)
  // ---
  let bgImgEl = null;
  // Look for an <img> inside the first grid cell
  const gridDivs = element.querySelectorAll(':scope > div.w-layout-grid > div');
  if (gridDivs.length > 0) {
    // The first grid cell should contain the image
    const firstCell = gridDivs[0];
    bgImgEl = firstCell.querySelector('img');
  }
  // If not found, fallback to any img in the block
  if (!bgImgEl) {
    bgImgEl = element.querySelector('img');
  }

  // ---
  // 2. Find the content (row 3)
  // ---
  let contentCell = document.createElement('div');
  // The second grid cell contains the text content
  let contentSource = null;
  if (gridDivs.length > 1) {
    contentSource = gridDivs[1];
  }
  // Defensive: If not found, fallback to any h1 in the block
  if (!contentSource) {
    contentSource = element.querySelector('h1')?.parentElement;
  }
  if (contentSource) {
    // Copy all children except empty button group
    Array.from(contentSource.children).forEach(child => {
      // Exclude empty button groups
      if (child.classList.contains('button-group') && child.children.length === 0) return;
      contentCell.appendChild(child);
    });
  }

  // ---
  // 3. Build the table rows
  // ---
  const rows = [
    headerRow,
    [bgImgEl ? bgImgEl : ''],
    [contentCell]
  ];

  // ---
  // 4. Create and replace
  // ---
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
