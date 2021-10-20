'use strict';

var DOMPurify = require('dompurify');

/**
 * Add DOMPurify hook to handling exceptional rules for certain HTML attributes.
 * Should be set when the calendar instance is created.
 */
function addAttributeHook() {
    DOMPurify.addHook('afterSanitizeAttributes', function sanitizeHook(node) {
        var hasRelAttr = node.hasAttribute('rel');
        // Allowing `target="_blank"` usage.
        // Additionally set `rel="noopener"` to prevent another security issue.
        if ('target' in node) {
            node.setAttribute('target', '_blank');

            if (!hasRelAttr) {
                node.setAttribute('rel', 'noopener');
            }
        }
    });
}

/**
 * Remove all attribute sanitizing hooks.
 * Use it in `Calendar#destroy`.
 */
function removeAttributeHook() {
    DOMPurify.removeHooks('afterSanafterSanitizeAttributes');
}

/**
 * Prevent XSS attack by sanitizing input string values via DOMPurify
 * @param {string} str target string value
 * @returns {string} sanitized string
 */
function sanitize(str) {
    return DOMPurify.sanitize(str);
}

module.exports = {
    sanitize: sanitize,
    addAttributeHook: addAttributeHook,
    removeAttributeHook: removeAttributeHook
};
