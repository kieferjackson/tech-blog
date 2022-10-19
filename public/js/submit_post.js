
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

        if (response.ok) {
            // Redirect the user to the homepage
            document.location.replace('/');
        }
        else {
            alert('Failed to submit post.');
        }
    }
    else {
        alert('Insufficient information to add new post.');
    }
}
