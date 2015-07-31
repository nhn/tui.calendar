/*eslint-disable*/

/**
 * Interface for event handler module for views.
 * @interface
 */
function Handler() {}

/**
 * Destroy method
 */
Handler.prototype.destroy = function() {};

/**
 * Connect view, dragHandler, controllers.
 */
Handler.prototype.connect = function() {};

/**
 * Check handler has privilige for handle emitted events.
 */
Handler.prototype.checkExpectedCondition = function() {};
