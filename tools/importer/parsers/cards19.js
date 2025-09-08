/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all direct children (cards)
  const cardNodes = Array.from(element.querySelectorAll(':scope > div'));

  // Table header as specified
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  cardNodes.forEach((card) => {
    // Each card has: icon (svg) in .icon, and a <p> with text
    let iconEl = null;
    let textEl = null;

    // Defensive: find .icon and <p> among direct children
    const children = Array.from(card.children);
    children.forEach((child) => {
      if (!iconEl && child.querySelector('.icon')) {
        iconEl = child.querySelector('.icon');
      }
      if (!textEl && child.tagName === 'P') {
        textEl = child;
      }
    });

    // Fallback: try to find .icon and <p> anywhere inside card
    if (!iconEl) iconEl = card.querySelector('.icon');
    if (!textEl) textEl = card.querySelector('p');

    // Defensive: if either is missing, skip this card
    if (!iconEl || !textEl) return;

    rows.push([iconEl, textEl]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
