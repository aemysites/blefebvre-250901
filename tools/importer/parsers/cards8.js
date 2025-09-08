/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.classList.contains('w-layout-grid')) return;

  // Header row: exactly one column
  const headerRow = ['Cards (cards8)'];
  const rows = [];
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    if (!img) return;
    img.removeAttribute('width');
    img.removeAttribute('height');
    const imageCell = img;
    const textCell = img.alt ? img.alt.trim() : '';
    rows.push([imageCell, textCell]);
  });

  // Compose the cells array: header row (1 col), then each card row (2 cols)
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
