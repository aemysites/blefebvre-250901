/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a grid child
  function extractCardContent(cardEl) {
    // Find the main image (first img)
    const img = cardEl.querySelector('img');
    // Find heading and paragraph (if present)
    let heading = null;
    let description = null;
    // Defensive: look for a div with padding, then h3/p inside
    const textContainer = cardEl.querySelector('.utility-padding-all-2rem');
    if (textContainer) {
      heading = textContainer.querySelector('h3');
      description = textContainer.querySelector('p');
    }
    // Compose text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (description) textCell.push(description);
    // Always return [image, textCell]
    return [img, textCell];
  }

  // Get all direct children of the grid
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  // Build rows for cards with both image and text
  const rows = [];
  cards.forEach(cardEl => {
    // Only include cards that have both image and text
    // Defensive: check for presence of .utility-padding-all-2rem (text)
    if (cardEl.querySelector('img') && cardEl.querySelector('.utility-padding-all-2rem')) {
      rows.push(extractCardContent(cardEl));
    }
  });

  // Table header
  const headerRow = ['Cards (cards25)'];
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
