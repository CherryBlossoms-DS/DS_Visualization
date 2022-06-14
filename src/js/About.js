let screen_cnt = 0;
let MAX_SCREEN = 2;
let MIN_SCREEN = 0;

document.addEventListener('keyup', (e) => {
	if (e.key == 'w') {
		screen_cnt--;
		window.scrollTo({
			top: $(window).height() * screen_cnt,
			behavior: 'smooth'
		});
	}
	else if (e.key == 's') {
		screen_cnt++;
		window.scrollTo({
			top: $(window).height() * screen_cnt,
			behavior: 'smooth'
		});
	}

	screen_cnt = Math.max(MIN_SCREEN, screen_cnt);
	screen_cnt = Math.min(MAX_SCREEN, screen_cnt);
})