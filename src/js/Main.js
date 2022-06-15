function typing_animation(id) {
    let text_element = $(id + " .text");
    let text_array = text_element.text().split("");
    let all_words = text_element.text().split(" " );
    let text_len = text_array.length;
    console.log(text_array);
    console.log(all_words);

    const word_len = all_words.map((word) => {
        console.log(word.length);
        return word.length;
    });

    // 커서 애니메이션
    let cursor_timings = {
        duration: 700,
        iterations: Infinity,
        easing: 'cubic-bezier(0,.26,.44,.93)'
    }

    document.querySelector(id + " .text_cursor").animate([
        {
            opacity: 0
        },
        {
            opacity: 0, offset: 0.7
        },
        {
            opacity: 1
        }
    ], cursor_timings);


    // 글자 적기
    let timings = {
        easing: `steps(${Number(word_len[0] + 1)}, end)`,
        // delay: 750, // milliseconds
        duration: 750, // milliseconds
        fill: 'forwards'
    }

    if(all_words.length == 1){
        timings.easing = `steps(${Number(word_len[0])}, end)`;
    
        document.querySelector(id + " .text_hide").animate([
            { left: '0%' },
            { left: `${(100 / text_len) * (word_len[0])}%` }
        ], timings);
    
        document.querySelector(id + " .text_cursor").animate([
            { left: '0%' },
            { left: `${(100 / text_len) * (word_len[0])}%` }
        ], timings);
    } else{
        document.querySelector(id + " .text_hide").animate([
            { left: '0%' },
            { left: `${(100 / text_len) * (word_len[0] + 1)}%` }
        ], timings);
    
        document.querySelector(id + " .text_cursor").animate([
            { left: '0%' },
            { left: `${(100 / text_len) * (word_len[0] + 1)}%` }
        ], timings);
    }

    for (let i = 1; i < all_words.length; i++) {
        console.log(word_len);
        console.log(all_words.length);
        const single_word_len = word_len[i];
        console.log(single_word_len);
    
        if (i == 1) {
            var left_instance = (100 / text_len) * (word_len[i - 1] + 1);
            console.log(left_instance);
        }
    
        let timings_2 = {
            easing: `steps(${Number(single_word_len + 1)}, end)`,
            delay: (2 * (i + 1) + (2 * i)) * (250),
            // delay: ((i*2)-1)*1000,
            duration: 750,
            fill: 'forwards'
        }
    
        if (i == (all_words.length - 1)) {
            timings_2.easing = `steps(${Number(single_word_len)}, end)`;
            document.querySelector(id + " .text_hide").animate([
                { left: `${left_instance}%` },
                { left: `${left_instance + ((100 / text_len) * (word_len[i]))}%` }
            ], timings_2);
    
            document.querySelector(id + " .text_cursor").animate([
                { left: `${left_instance}%` },
                { left: `${left_instance + ((100 / text_len) * (word_len[i]))}%` }
            ], timings_2);
        } else {
            document.querySelector(id + " .text_hide").animate([
                { left: `${left_instance}%` },
                { left: `${left_instance + ((100 / text_len) * (word_len[i] + 1))}%` }
            ], timings_2);
    
            document.querySelector(id + " .text_cursor").animate([
                { left: `${left_instance}%` },
                { left: `${left_instance + ((100 / text_len) * (word_len[i] + 1))}%` }
            ], timings_2);
        }
    
        left_instance = left_instance + ((100 / text_len) * (word_len[i] + 1));
    }
}

function fadeout() {
    window.scrollTo(0, 0);

    $('.intro_position').animate({
        opacity: 0
    }, 1000);
}

function scroll_unlock() {
    $('.intro_position').css('display', 'none');
    $('body').css('overflow', 'initial');
}

function setCookie(name, value, day) {
    document.cookie = name + '=' + value + ';max-age=' + day + ';path=/';
}

function getCookie(name) {
    const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
};

function delCookie(name) {
	setCookie(name, "", -1);
}


let cookie = getCookie("user");

if (cookie === null) {
    setCookie('user', 'vistied', 3600); // 1시간 마다 쿠키가 삭제됨
    
    $(document).ready(
        window.setTimeout(typing_animation, 1000, "#project_text"),
        window.setTimeout(() => {
            $('#project_text .text').text('Cherry Blossom')
        }, 8000),
        window.setTimeout(typing_animation, 8000, "#project_text"),
        window.setTimeout(fadeout, 12000),
        window.setTimeout(scroll_unlock, 13000),
    );
}
else {
    $(document).ready(
        window.setTimeout(() => {
            $('.text_cursor').css('display', 'none');
        }, 1),
        window.setTimeout(fadeout, 1),
        window.setTimeout(scroll_unlock, 1001),
    );

    // 필요시 사용
    // delCookie('user');
}