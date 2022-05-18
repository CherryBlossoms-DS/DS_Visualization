var canvas = document.getElementById("tutorial");

if (!canvas.getContext) {
    alert('지원하지 않는 브라우저입니다.');
}

var ctx = canvas.getContext('2d');
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';

function ctx_clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let animation_time = 750;
// TODO : 애니메이션 도중이 아닐 때, 마우스로 조작 가능하도록 해야함.

class Circle {
    x;
    y;
    radius;
    font_size;
    color;
    text;
    left_child;
    right_child;
    parent_node;
    position;

    tree_generator() {
        // tree 위치 찾기
        let previous_node = null;
        let search_node = root_node;
        let is_right_child = true;

        while (search_node != null) {
            previous_node = search_node;

            // 오른쪽 자식으로 이동
            if (parseInt(this.text) > parseInt(search_node.text)) {       
                this.position.push(1);
                is_right_child = true;
                search_node = search_node.right_child;
            } else { // 왼쪽 자식으로 이동
                this.position.push(-1);
                is_right_child = false;
                search_node = search_node.left_child;
            }        
        }

        if (previous_node == null) {
            this.x = canvas.width / 2;
            this.y = this.radius + 20;

            root_node = this;
        } else if (is_right_child) {
            previous_node.right_child = this;
        } else {
            previous_node.left_child = this;
        }

        this.parent_node = previous_node;
    }

    constructor(radius, color, text, font_size) {
        // todo : 노드 별 위치 관리하기
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.font_size = font_size;
        this.left_child = null;
        this.right_child = null;
        this.parent_node = null;
        this.position = [];
        
        this.tree_generator();
    }

    Draw_line(r2, color) {
        let distance = Math.sqrt(Math.pow(r2.y - this.y, 2) + Math.pow(r2.x - this.x, 2));
        let start_x = (this.radius * (r2.x - this.x)) / distance;
        let start_y = (this.radius * (r2.y - this.y)) / distance;        

        
        ctx.beginPath();
        ctx.moveTo(start_x + this.x, start_y + this.y);
        ctx.lineTo(r2.x - start_x, r2.y - start_y);

        ctx.strokeStyle = color;
        ctx.stroke();

        // Todo : Draw_Arrow
    }

    Draw_Circle(color) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();

        ctx.strokeStyle = color;
        ctx.stroke();
    }

    Draw_text() {
        ctx.font = this.font_size + 'px sans-serif';
        ctx.fillText(this.text, this.x, this.y);
    }

    append_animation() {
        let parent_node = root_node;
        let pre_node = null;

        let cnt = 1;
        while (parent_node != null) {
            // 오른쪽 자식으로 이동
        
            setTimeout(call_draw_Circle, animation_time * cnt, parent_node, 'white');
            setTimeout(call_draw_Circle, animation_time * cnt, parent_node, 'red');

            if (pre_node != null) {
                setTimeout(call_draw_Circle, animation_time * cnt, pre_node, 'white');
                setTimeout(call_draw_Circle, animation_time * cnt, pre_node, 'black');
                setTimeout(call_draw_line, (animation_time * cnt) - (animation_time * 0.5), parent_node, pre_node, 'red');
                setTimeout(call_draw_line, animation_time * cnt, parent_node, pre_node, 'black');
            }
            
            pre_node = parent_node;
            if (parseInt(this.text) > parseInt(parent_node.text)) {       
                parent_node = parent_node.right_child;
            } else { // 왼쪽 자식으로 이동
                parent_node = parent_node.left_child;
            }  

            cnt++
        }

        setTimeout(call_draw_text, animation_time * (cnt - 1), pre_node);
        setTimeout(call_draw_Circle, animation_time * cnt, pre_node, 'white');
        setTimeout(call_draw_Circle, animation_time * cnt, pre_node, 'black');
    }

    Draw() {
        ctx_clear();

        get_position(root_node, this);
        this.append_animation();
    }
}

function call_draw_text(node) {
    node.Draw_text();
}

function call_draw_Circle(node, color) {
    node.Draw_Circle(color);
}

function call_draw_line(parent_node, child_node, color) {
    child_node.Draw_line(parent_node, color);
}

// search_node 의 왼쪽 자식의 개수를 구하는 함수입니다.
function get_sub_tree_cnt(search_node) {
    if (search_node == null) 
        return 0;

    let right_child = search_node.right_child;
    let left_child = search_node.left_child;
    return 1 + get_sub_tree_cnt(left_child) + get_sub_tree_cnt(right_child);
}

function get_position(parent_node, append_node) {
    if (parent_node == append_node) {
        return null;
    }

    let right_child = parent_node.right_child;
    let left_child = parent_node.left_child;

    parent_node.Draw_text();
    parent_node.Draw_Circle(parent_node.color);
    
    if (right_child) {
        let left_child_cnt = get_sub_tree_cnt(right_child.left_child);
        // 왼쪽 자식의 개수
        right_child.x = parent_node.x + (left_child_cnt + 1) * parent_node.radius * 1.5;
        right_child.y = parent_node.y + parent_node.radius + 20;

        get_position(parent_node.right_child, append_node);

        if (right_child != append_node) {
            right_child.Draw_line(parent_node, right_child.color);
        }
    }
    if (left_child) {
        let right_child_cnt = get_sub_tree_cnt(left_child.right_child);

        // 왼쪽 자식의 개수
        left_child.x = parent_node.x - (right_child_cnt + 1) * parent_node.radius * 1.5;
        left_child.y = parent_node.y + parent_node.radius + 20;

        get_position(parent_node.left_child, append_node);

        if (left_child != append_node) {
            left_child.Draw_line(parent_node, left_child.color);
        }
    }
}

function makeCircle() {
    let value = document.getElementById('input_field').value;
    let radius = 20;
    let color = 'black';

    let newCircle = new Circle(radius, color, (value).toString());
    newCircle.Draw();
}

ctx.clearRect(0, 0, canvas.width, canvas.height);

let root_node;

// TODO : 영역 밖으로 나갔을 경우에 대한 오류 설정


// 캔버스 움직이기
var running = false;
var x, y, clientX, clientY;

canvas.addEventListener('mousedown', function(e) {
    if (!running) {
        raf = window.requestAnimationFrame(root_node.Draw);
        running = true;

        // 처음 위치
        x = root_node.x; 
        y = root_node.y;

        clientX = e.clientX;
        clientY = e.clientY;
    }
});

canvas.addEventListener('mouseup', move_tree);
canvas.addEventListener('mouseout', move_tree);
function move_tree(e) {
    if (running) {
        window.cancelAnimationFrame(raf);
        running = false;

        // TODO : 트리의 맨 상/하/좌/우가 경계에 나가지 않도록
        //          즉, canvas에 흰 화면만 나오지 않도록 해야 함.
        if (root_node.x < 0) {
            root_node.x = root_node.radius * 1.5;
        } else if (root_node.x > canvas.width) {
            root_node.x = canvas.width - root_node.radius * 1.5;
        }

        if (root_node.y < 0) {
            root_node.y = root_node.radius * 1.5;
        } else if (root_node.y > canvas.height) {
            root_node.y = canvas.height - root_node.radius * 1.5;
        }

        ctx_clear();
        get_position(root_node, null);
    }
};

canvas.addEventListener('mousemove', function(e) {
    if (running) {
        root_node.x = x + (e.clientX - clientX);
        root_node.y = y + (e.clientY - clientY);
        ctx_clear();
        get_position(root_node, null);
    }
});