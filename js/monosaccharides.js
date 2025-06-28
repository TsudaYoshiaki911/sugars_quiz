const img = document.getElementById('img');
const result = document.getElementById('result');
const option_0 = document.getElementById('options-0');
const option_1 = document.getElementById('options-1');
const option_2 = document.getElementById('options-2');
const option_3 = document.getElementById('options-3');
const container = document.getElementById('container');
const displays = document.querySelectorAll('.default-none');
const sound_correct = document.getElementById('sound-correct');
const sound_incorrect = document.getElementById('sound-incorrect');
const sound_perfect = document.getElementById('sound-perfect');

const question_list = [
    {img: 'image/alpha_glucose.jpg', name: 'α-グルコース'},
    {img: 'image/beta_glucose.jpg', name: 'β-グルコース'},
    {img: 'image/cyclic_glucose.jpg', name: 'グルコース(鎖状)'},
    {img: 'image/alpha_fructose_6.jpg', name: 'α-フルクトース(六員環)'},
    {img: 'image/beta_fructose_6.jpg', name: 'β-フルクトース(六員環)'},
    {img: 'image/alpha_fructose_5.jpg', name: 'α-フルクトース(五員環)'},
    {img: 'image/beta_fructose_5.jpg', name: 'β-フルクトース(五員環)'},
    {img: 'image/cyclic_fructose.jpg', name: 'フルクトース(鎖状)'},
    {img: 'image/alpha_galactose.jpg', name: 'α-ガラクトース'},
    {img: 'image/beta_galactose.jpg', name: 'β-ガラクトース'}
];
let remaining_list = [...question_list];
let wrong_question = [];

let correct;

// 配列をシャッフルする関数
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createQuestion(){
    if (remaining_list.length === 0) {
        result.innerText = 'すべての問題を出題しました';
        
        if (wrong_question.length > 0){
            wrong_question.forEach(item => {
                const new_element = document.createElement('p');
                new_element.className = 'new-element';

                const new_img = document.createElement('img');
                new_img.alt = item.name;
                new_img.src = item.img;
                new_img.width = 200;

                const new_span = document.createElement('span');
                new_span.textContent = item.name;

                new_element.appendChild(new_img);
                new_element.appendChild(new_span);
                container.appendChild(new_element);
            })
        }else{
            container.innerText = 'なし';
            sound_perfect.play();
        }
            displays.forEach(el => {
            el.style.display = 'none';
        })
        return;
    }

    const shuffled = shuffle([...remaining_list]);

    // 最初の1つを取得
    correct = shuffled[0];
    let options_order = [correct];
    remaining_list = remaining_list.filter(item => item !== correct);

    // 残りの3つを取得
    const incorrect = (question_list.filter(item => item !== correct)).slice(1, 4);
    options_order.push(...incorrect);

    // ボタンの順序をシャッフル
    shuffle(options_order);

    // ボタンを設定
    const button_list = [option_0,option_1,option_2,option_3];
    for (let i=0; i<4; i++){
        img.alt = correct.name;
        img.src = correct.img;

        button_list[i].value = options_order[i].name;
        button_list[i].textContent = options_order[i].name;
    }
}

function startQuiz(){
    displays.forEach(el => {
        el.style.display = 'flex';
    })

    remaining_list = [...question_list];
    wrong_question = [];
    container.innerText = '';
    result.innerText = '';
    createQuestion();
}

function answer(item){
    if(item.value === correct.name){
        result.innerText = '正解';
        sound_correct.play();
    }else{
        wrong_question.push(correct);
        result.innerText = '不正解';
        sound_incorrect.play();
    }
    createQuestion();
}