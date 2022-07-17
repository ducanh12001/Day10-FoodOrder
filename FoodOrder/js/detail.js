document.addEventListener('DOMContentLoaded', init, false);

let CommentList, card;
async function init() {
    card = document.querySelector('.comment-container')
    let res = await fetch(`https://62cfe5951cc14f8c087fabdf.mockapi.io/api/comment`);
    CommentList = await res.json();
    renderCard()
}

function renderCard() {
    let result = '';
    CommentList.forEach((comment, index) => {
        result += `
        <div class="comment-card">
            <div class="user-info">
                <img src="${comment.image}" alt="Image" class="user-image">
                <span>${comment.username}</span>
            </div>
            <div class="comment">${comment.comment}</div>
        </div>
        `
    })
    card.innerHTML = result;
}
