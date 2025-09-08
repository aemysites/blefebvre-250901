/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Get all card links (each card is an <a> element)
  const cardLinks = element.querySelectorAll(':scope > a');

  cardLinks.forEach((card) => {
    // --- IMAGE CELL ---
    // Find the image inside the card
    const imageWrapper = card.querySelector(':scope > div');
    let imageCell = null;
    if (imageWrapper) {
      const img = imageWrapper.querySelector('img');
      if (img) {
        imageCell = img;
      }
    }

    // --- TEXT CELL ---
    // Compose the text cell: tag, date, heading
    const textContent = [];
    // Tag and date row
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) {
      // Use the tagRow directly (contains tag and date)
      textContent.push(tagRow);
    }
    // Heading
    const heading = card.querySelector('h3');
    if (heading) {
      textContent.push(heading);
    }
    // Compose cell
    const textCell = textContent;

    // Add row to table
    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
