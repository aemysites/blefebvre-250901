/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get all accordion items (immediate children)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Table header row
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  accordionItems.forEach((item) => {
    // Title cell: find the toggle div with the title text
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      // Defensive: Find the element with the actual title text
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // Content cell: find the dropdown list (nav.accordion-content)
    const contentNav = item.querySelector('nav.accordion-content');
    let contentEl = null;
    if (contentNav) {
      // Defensive: Use the inner content div if present
      const innerContent = contentNav.querySelector('.utility-padding-all-1rem') || contentNav;
      contentEl = innerContent;
    }

    // Add row: [title, content]
    rows.push([
      titleEl,
      contentEl
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
