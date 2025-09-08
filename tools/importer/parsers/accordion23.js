/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Table header row as per block spec: exactly one column
  const headerRow = ['Accordion (accordion23)'];
  const rows = [headerRow];

  // Get all immediate children with class 'divider' (each is an accordion item)
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  dividers.forEach((divider) => {
    // Each divider contains a grid-layout with two children: title and content
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return;
    const children = Array.from(grid.children);
    if (children.length < 2) return;
    const title = children[0];
    const content = children[1];
    rows.push([title, content]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
