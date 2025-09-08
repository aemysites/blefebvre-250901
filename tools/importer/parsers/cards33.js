/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Get all direct card links (each card is an <a> child)
  const cardLinks = element.querySelectorAll(':scope > a');

  cardLinks.forEach((cardLink) => {
    // Each card's content is inside the <a> (image + text block)
    // Find the image (first img inside the card)
    const img = cardLink.querySelector('img');

    // Find the text content block (the div after the image)
    // Defensive: find all direct children of the card's inner grid
    const innerGrid = cardLink.querySelector(':scope > div');
    let textBlock = null;
    if (innerGrid) {
      // The text block is the second child of the inner grid (after img)
      // But sometimes the structure may vary, so let's find the div that contains the heading
      const candidates = innerGrid.querySelectorAll('div');
      for (const candidate of candidates) {
        if (candidate.querySelector('h3, .h4-heading')) {
          textBlock = candidate;
          break;
        }
      }
      // Fallback: if not found, use the last child div
      if (!textBlock && candidates.length) {
        textBlock = candidates[candidates.length - 1];
      }
    }

    // Defensive: if no textBlock found, fallback to the cardLink itself
    if (!textBlock) textBlock = cardLink;

    // Build the row: [image, text content]
    rows.push([
      img,
      textBlock
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
