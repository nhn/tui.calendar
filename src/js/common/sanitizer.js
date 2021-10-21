/**
 * @fileoverview Sanitizer module in order to prevent XSS attacks.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var DOMPurify = require('dompurify');

// For temporarily saving original target value
var TEMP_TARGET_ATTRIBUTE = 'data-target-temp';

/**
 * Add DOMPurify hook to handling exceptional rules for certain HTML attributes.
 * Should be set when the calendar instance is created.
 */
function addAttributeHooks() {
    DOMPurify.addHook('beforeSanitizeAttributes', function(node) {
        var targetValue;
        // Preserve default target attribute value
        if (node.tagName === 'A') {
            targetValue = node.getAttribute('target');

            if (targetValue) {
                node.setAttribute(TEMP_TARGET_ATTRIBUTE, targetValue);
            } else {
                // set default value
                node.setAttribute('target', '_self');
            }
        }
    });

    DOMPurify.addHook('afterSanitizeAttributes', function(node) {
        if (node.tagName === 'A' && node.hasAttribute(TEMP_TARGET_ATTRIBUTE)) {
            node.setAttribute('target', node.getAttribute(TEMP_TARGET_ATTRIBUTE));
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
function removeAttributeHooks() {
    DOMPurify.removeAllHooks();
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
    addAttributeHooks: addAttributeHooks,
    removeAttributeHooks: removeAttributeHooks
};
