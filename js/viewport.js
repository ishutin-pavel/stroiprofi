function checkViewport()
{
	if ( window.innerWidth == min_width )
	{
		return;
	}//*/
	
	if ( window.innerWidth < min_width + 2 )
	{
		var scale = window.innerWidth / min_width;
		viewport.setAttribute('content', 'width='+min_width+', user-scalable=yes, maximum-scale='+scale+', minimum-scale='+scale+', initial-scale='+scale);
		max_scale_set_timeout = setTimeout(function(){
			viewport.setAttribute('content', 'width='+min_width+', user-scalable=yes, maximum-scale='+scale+', minimum-scale='+scale+', initial-scale='+scale);
		}, 1000);// потому что сначала открывается отскейленое */
	}
	else
	{
		viewport.setAttribute('content', initial_viewport);
		clearTimeout(max_scale_set_timeout);
	}
}


var viewport = document.querySelector("meta[name=viewport]");
var min_width = 400;
var initial_viewport = viewport.getAttribute('content');
var max_scale_set_timeout = null;



var supportsOrientationChange = "onorientationchange" in window, 
	orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

if ( supportsOrientationChange )
{
	window.addEventListener(orientationEvent, function() {
		checkViewport();
	}, false);
}

checkViewport();

window.onload = function(){
	checkViewport();
};
