/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the card body inside the block
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Find the image (mandatory)
  const img = cardBody.querySelector('img');
  // Find the heading (optional)
  const heading = cardBody.querySelector('.h4-heading');

  // Compose the text cell
  let textCell = [];
  if (heading) {
    // Convert heading to <h2> for semantic consistency
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    textCell.push(h2);
  }

  // Table header row
  const headerRow = ['Carousel (carousel21)'];

  // Table slide row
  const slideRow = [img, textCell.length ? textCell : ''];

  // Build the table
  const cells = [headerRow, slideRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
