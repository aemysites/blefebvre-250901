/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background images row
  let imagesRowContent = [];
  // Find the grid of images (background collage)
  const imageGrid = element.querySelector('.grid-layout.desktop-3-column');
  if (imageGrid) {
    const imgs = Array.from(imageGrid.querySelectorAll('img'));
    if (imgs.length) {
      imagesRowContent = imgs;
    }
  }
  const imagesRow = [imagesRowContent.length ? imagesRowContent : ''];

  // 3. Content row (title, subheading, CTA)
  let contentRowContent = [];
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) {
    // Heading
    const heading = contentContainer.querySelector('h1');
    if (heading) contentRowContent.push(heading);
    // Subheading
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentRowContent.push(subheading);
    // CTAs
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length) {
        contentRowContent = contentRowContent.concat(ctas);
      }
    }
  }
  const contentRow = [contentRowContent.length ? contentRowContent : ''];

  // Compose table
  const cells = [
    headerRow,
    imagesRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
