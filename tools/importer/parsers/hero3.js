/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Header row as specified
  const headerRow = ['Hero (hero3)'];

  // --- Row 2: Background Image ---
  // Find the background image (img element)
  let bgImg = null;
  const imgEls = element.querySelectorAll('img');
  for (const img of imgEls) {
    if (img.src) {
      bgImg = img;
      break;
    }
  }
  // If no image found, leave cell empty
  const imageRow = [bgImg ? bgImg : ''];

  // --- Row 3: Content (heading, subheading, CTA) ---
  // Find the card containing the text and CTA
  let card = null;
  const cardEls = element.querySelectorAll('.card');
  if (cardEls.length > 0) {
    card = cardEls[0];
  }
  // Defensive: If no card, fallback to all content except image
  let contentCell;
  if (card) {
    contentCell = card;
  } else {
    // Fallback: collect all headings, paragraphs, and links except image
    const contentParts = [];
    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const paragraphs = element.querySelectorAll('p');
    const links = element.querySelectorAll('a');
    headings.forEach(h => contentParts.push(h));
    paragraphs.forEach(p => contentParts.push(p));
    links.forEach(a => contentParts.push(a));
    contentCell = contentParts;
  }
  const contentRow = [contentCell];

  // --- Assemble table ---
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
