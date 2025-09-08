/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.classList.contains('w-layout-grid')) return;

  // Header row as per block requirements
  const headerRow = ['Cards (cards6)'];
  const rows = [headerRow];

  // Get all direct children (each card is a div)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    if (!img) return;
    // Always two columns: image, text (empty string if no text)
    rows.push([img, '']);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
