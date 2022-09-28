async function loginUser()
{
    const email = document.querySelector('#email_login').value.trim();
    const password = document.querySelector('#password_login').value.trim();

    if (email && password)
    {
        const response = await fetch('/api/users/login',
        {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok)
        {
            // Redirect the user to the homepage
            document.location.replace('/');
        }
        else 
        {
            alert('Failed to sign up.');
        }
    }
}

async function signUpUser()
{
    const username = document.querySelector('#username_signup').value.trim();
    const email = document.querySelector('#email_signup').value.trim();
    const password = document.querySelector('#password_signup').value.trim();

    if (username && email && password)
    {
        const response = await fetch('/api/users',
        {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok)
        {
            // Redirect the user to the homepage
            document.location.replace('/');
        }
        else 
        {
            alert('Failed to sign up.');
        }
    }
}