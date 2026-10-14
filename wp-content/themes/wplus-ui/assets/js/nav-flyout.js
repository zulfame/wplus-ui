/* Keeps the collapsed sidebar menu flyouts inside the window: aligns them with their item,
   moves them up when they would run off the bottom, and scrolls them when they are taller than the space. */
(function () {
	var menu = document.querySelector('.mnMn');
	if (!menu || !window.matchMedia) {
		return;
	}
	var desktop = window.matchMedia('(min-width: 896px)');

	function place(li) {
		var ul = li.querySelector(':scope > ul');
		if (!ul || !desktop.matches || getComputedStyle(ul).position !== 'absolute') {
			return;
		}
		ul.style.top = '';
		ul.style.bottom = '';
		ul.style.maxHeight = '';
		var header = document.getElementById('header');
		var top_limit = (header ? header.getBoundingClientRect().bottom : 0) + 8;
		var vh = window.innerHeight;
		var item = li.getBoundingClientRect();
		// Each child is 40px tall once the flyout is open (it is still collapsed while this runs).
		var height = ul.children.length * 40 + 2;
		var top = item.top + 3;
		if (top + height > vh - 8) {
			top = Math.max(top_limit, vh - 8 - height);
		}
		ul.style.maxHeight = Math.max(80, Math.min(height, vh - 8 - top)) + 'px';
		ul.style.overflowY = 'auto';
		ul.style.bottom = 'auto';
		ul.style.top = Math.round(top - item.top) + 'px';
	}

	menu.addEventListener('mouseover', function (e) {
		var li = e.target.closest ? e.target.closest('.mnMn > li') : null;
		if (li) {
			place(li);
		}
	});
	menu.addEventListener('focusin', function (e) {
		var li = e.target.closest ? e.target.closest('.mnMn > li') : null;
		if (li) {
			place(li);
		}
	});
}());
