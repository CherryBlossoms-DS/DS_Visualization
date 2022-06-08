// document.addEventListener('wheel', e => {
// 	console.log('sdf');
// 	window.scrollTo(0, 0)
// });

// document.addEventListener('scroll', e => {
// 	console.log('sdf');
// 	window.scrollTo(0, 0)
// });

// let scroll_lock = false;
// let now_page_pos = 0;

// function scroll_on_off () {
// 	scroll_lock = !scroll_lock;
// }

// function wheel_page_event (event) {
// 	if (!scroll_lock) {
// 		if (event.deltaY < 0) {
// 			console.log('scrolling up');
// 			now_page_pos = 0;
// 		}
// 		else if (event.deltaY > 0) {
// 			console.log('scrolling down');
// 			now_page_pos = screen.height;
// 		}


// 		window.scrollTo({
// 			top: now_page_pos,
// 			behavior: 'smooth'
// 		})


// 		scroll_on_off();
// 		setTimeout(scroll_on_off, 500);
// 	}
// 	else {
// 		// window.scrollTo({
// 		// 	top: now_page_pos,
// 		// 	behavior: 'smooth'
// 		// });
// 	}
// }

// document.addEventListener('wheel', wheel_page_event);
// document.addEventListener('scroll', wheel_page_event);


let screen_cnt = 0;
let MAX_SCREEN = 1;
let MIN_SCREEN = 0;

document.addEventListener('keyup', (e) => {
	if (e.key == 'w') {
		screen_cnt--;
		window.scrollTo({
			top: screen.height * screen_cnt,
			behavior: 'smooth'
		});
	}
	else if (e.key == 's') {
		screen_cnt++;
		window.scrollTo({
			top: screen.height * screen_cnt,
			behavior: 'smooth'
		});
	}

	screen_cnt = Math.max(MIN_SCREEN, screen_cnt);
	screen_cnt = Math.min(MAX_SCREEN, screen_cnt);
})