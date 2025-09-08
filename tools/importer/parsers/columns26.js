/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing the two columns
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get all immediate children of the main grid
  const gridChildren = Array.from(mainGrid.children);

  // First two children are the two columns (heading and quote)
  // Defensive: Find the first two <p> elements for left and right columns
  const leftCol = gridChildren.find(child => child.tagName === 'P' && child.classList.contains('h2-heading'));
  const rightCol = gridChildren.find(child => child.tagName === 'P' && child.classList.contains('paragraph-lg'));

  // Third child is the bottom row grid (avatar, name, divider, logo)
  const bottomGrid = gridChildren.find(child => child.classList.contains('w-layout-grid'));
  let leftBottomContent = [];
  let rightBottomContent = [];

  if (bottomGrid) {
    // Get all immediate children of the bottom grid
    const bottomChildren = Array.from(bottomGrid.children);
    // Find the avatar/name block (flex-horizontal)
    const avatarBlock = bottomChildren.find(child => child.classList.contains('flex-horizontal'));
    if (avatarBlock) leftBottomContent.push(avatarBlock);
    // Find the logo block (utility-display-inline-block)
    const logoBlock = bottomChildren.find(child => child.classList.contains('utility-display-inline-block'));
    if (logoBlock) rightBottomContent.push(logoBlock);
  }

  // Compose left column: heading + avatar/name
  const leftCell = [];
  if (leftCol) leftCell.push(leftCol);
  if (leftBottomContent.length) leftCell.push(...leftBottomContent);

  // Compose right column: quote + logo
  const rightCell = [];
  if (rightCol) rightCell.push(rightCol);
  if (rightBottomContent.length) rightCell.push(...rightBottomContent);

  // Table header
  const headerRow = ['Columns (columns26)'];
  // Table content row (2 columns)
  const contentRow = [leftCell, rightCell];

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
