/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Table header row: must match block name exactly
  const headerRow = ['Hero (hero39)'];

  // 2. Find the background image (first img in the first grid cell)
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    const firstGrid = gridDivs[0];
    bgImg = firstGrid.querySelector('img');
  }

  // 3. Find the content cell (headline, paragraph, button)
  let contentCell = [];
  if (gridDivs.length > 1) {
    const contentGrid = gridDivs[1];
    // The headline is inside the first child of contentGrid
    const innerGrid = contentGrid.querySelector('.w-layout-grid');
    if (innerGrid) {
      // Headline
      const headline = innerGrid.querySelector('h1');
      if (headline) contentCell.push(headline);
      // Paragraph and button (inside flex-vertical)
      const flexVertical = innerGrid.querySelector('.flex-vertical');
      if (flexVertical) {
        // Paragraph
        const paragraph = flexVertical.querySelector('p');
        if (paragraph) contentCell.push(paragraph);
        // Button
        const buttonGroup = flexVertical.querySelector('.button-group');
        if (buttonGroup) {
          const button = buttonGroup.querySelector('a');
          if (button) contentCell.push(button);
        }
      }
    }
  }

  // 4. Build the table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell.length ? contentCell : ''],
  ];

  // 5. Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // 6. Replace the original element
  element.replaceWith(block);
}
