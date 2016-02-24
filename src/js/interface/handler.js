/*eslint-disable*/

/**
 * Interface for event handler module for views.
 * @interface
 */
/* istanbul ignore next */
function Handler() {}

/**
 * Destroy method
 */
/* istanbul ignore next */
Handler.prototype.destroy = function() {};

/**
 * Check handler has privilige for handle emitted events.
 */
/* istanbul ignore next */
Handler.prototype.checkExpectedCondition = function() {};

/**
 * Check handler has permission to handle fired event
 */
/* istanbul ignore next */
Handler.prototype.hasPermissionToHandle = function() {};
