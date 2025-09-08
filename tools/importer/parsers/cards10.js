/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Table header row as specified
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct child <a> elements (each card)
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach((card) => {
    // Defensive: check for image container and image
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    let imgEl = null;
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img');
    }

    // Defensive: check for text content container
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    let textContent = [];
    if (textContainer) {
      // Tag (optional)
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        textContent.push(tagGroup);
      }
      // Heading (optional)
      const heading = textContainer.querySelector('h3, .h4-heading');
      if (heading) {
        textContent.push(heading);
      }
      // Description (optional)
      const desc = textContainer.querySelector('p');
      if (desc) {
        textContent.push(desc);
      }
    }

    // Each row: [image, text content]
    rows.push([
      imgEl || '',
      textContent.length === 1 ? textContent[0] : textContent
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
