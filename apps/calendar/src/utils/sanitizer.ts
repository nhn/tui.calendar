import DOMPurify from 'isomorphic-dompurify';

// For temporarily saving original target value
const TEMP_TARGET_ATTRIBUTE = 'data-target-temp';

/**
 * Add DOMPurify hook to handling exceptional rules for certain HTML attributes.
 * Should be set when the calendar instance is created.
 */
export function addAttributeHooks() {
  DOMPurify.addHook('beforeSanitizeAttributes', (node) => {
    // Preserve default target attribute value
    if (node.tagName === 'A') {
      const targetValue = node.getAttribute('target');

      if (targetValue) {
        node.setAttribute(TEMP_TARGET_ATTRIBUTE, targetValue);
      } else {
        node.setAttribute('target', '_self'); // set default value
      }
    }
  });

  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A' && node.hasAttribute(TEMP_TARGET_ATTRIBUTE)) {
      node.setAttribute('target', node.getAttribute(TEMP_TARGET_ATTRIBUTE) as string);
      node.removeAttribute(TEMP_TARGET_ATTRIBUTE);
      // Additionally set `rel="noopener"` to prevent another security issue.
      if (node.getAttribute('target') === '_blank') {
        node.setAttribute('rel', 'noopener');
      }
    }
  });
}

/**
 * Remove all attribute sanitizing hooks.
 * Use it in `Calendar#destroy`.
 */
export function removeAttributeHooks() {
  DOMPurify.removeAllHooks();
}

/**
 * Prevent XSS attack by sanitizing input string values via DOMPurify
 */
export function sanitize(str: string) {
  return DOMPurify.sanitize(str);
}
