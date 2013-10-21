/*
 * Enables registering callbacks, to be called when
 * renderInto is done rendering root component tree
 *
 * @author: Lex Podgorny
 */

(function (enyo) {

	var aCallbacks = [];
	
	var fInvoke = function (oRoot) {
			var nLength = aCallbacks.length,
				a,
				n;
				
			for (n=0; n<nLength; n++) {
				a = aCallbacks[n];
				a[0].apply(a[1] || enyo.global, [oRoot]);
			}
		};
	
	/*********** ENYO PUBLIC **********/

	//* Registers callback to be called every time a root is rendered after calling Control.renderInto()
	enyo.rendered = function (f, oContext) {
		aCallbacks.push([f, oContext]);
	};
	
	//* Adds control to enyo.roots; Called from Control.renderInto()
	enyo.addToRoots = function(oRoot) {
		if (!enyo.exists(enyo.roots)) {
			enyo.roots = [ oRoot ];
		} else {
			enyo.roots.push(oRoot);
		}
		
		var fRendered = oRoot.rendered;
		oRoot.rendered = function() {
			fRendered.apply(oRoot, []);
			fInvoke(oRoot);
		};
		oRoot._isRoot = true;
	};
	
})(enyo);
