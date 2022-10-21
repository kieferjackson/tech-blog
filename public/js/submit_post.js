
async function submit_post() {
    const title = document.querySelector('#post_title').value.trim();
    const message = document.querySelector('#post_message').value.trim();

    if (title && message) {
        const response = await fetch('/api/blogs/',
            {
                method: 'POST',
                body: JSON.stringify({ title, message }),
                headers: { 'Content-Type': 'application/json' }
            });

        if (!response.ok) { alert('Failed to submit post.'); }
    }
    else {
        alert('Insufficient information to add new post.');
    }
}

async function update_post() {
    const id = document.querySelector('#update_post_id').dataset.post_id;
    const title = document.querySelector('#update_post_title').value.trim();
    const message = document.querySelector('#update_post_message').value.trim();

    if (title && message) {
        const response = await fetch(`/api/blogs/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify({ title, message }),
                headers: { 'Content-Type': 'application/json' }
            });

        if (!response.ok) { alert('Failed to update post.'); }
    }
    else {
        alert('Insufficient information to update post.');
    }
}

async function delete_post() {
    const id = document.querySelector('#delete_post_id').dataset.post_id;

    const response = await fetch(`/api/blogs/${id}`,
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

    if (!response.ok) { alert('Failed to delete post.'); }
}

async function post_comment() {
    const post_id = parseInt(document.querySelector('#comment_post_id').dataset.post_id);
    const message = document.querySelector('#comment_message').value.trim();

    if (post_id && message) {
        const response = await fetch('/api/blogs/comment',
            {
                method: 'POST',
                body: JSON.stringify({ post_id, message }),
                headers: { 'Content-Type': 'application/json' }
            });

        if (!response.ok) { alert('Failed to submit comment.'); }
    }
    else {
        alert('Insufficient information to add new comment.');
    }
}
