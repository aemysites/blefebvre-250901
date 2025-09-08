/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid container (usually the content block)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (usually text and CTA)
  const gridChildren = Array.from(grid.children);

  // Find the text block (with headings and subheading)
  let textBlock = null;
  let ctaBlock = null;
  gridChildren.forEach((child) => {
    if (child.querySelector('h1, h2, h3, h4, h5, h6')) {
      textBlock = child;
    } else if (child.tagName === 'A' || child.querySelector('a')) {
      ctaBlock = child;
    }
  });

  // Defensive: If not found, fallback to first and second child
  if (!textBlock && gridChildren.length > 0) {
    textBlock = gridChildren[0];
  }
  if (!ctaBlock && gridChildren.length > 1) {
    ctaBlock = gridChildren[1];
  }

  // Compose the content cell: heading, subheading, CTA
  const contentCell = [];
  if (textBlock) {
    // Add all headings and paragraphs from the text block
    Array.from(textBlock.children).forEach((el) => {
      if (/^H[1-6]$/.test(el.tagName) || el.tagName === 'P') {
        contentCell.push(el);
      }
    });
  }
  if (ctaBlock) {
    // Add the CTA link (button)
    if (ctaBlock.tagName === 'A') {
      contentCell.push(ctaBlock);
    } else {
      const link = ctaBlock.querySelector('a');
      if (link) contentCell.push(link);
    }
  }

  // Table rows: header, (optional) image, content
  const headerRow = ['Hero (hero35)'];
  const imageRow = ['']; // No image in this block
  const contentRow = [contentCell];

  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
