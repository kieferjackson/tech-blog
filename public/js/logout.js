
async function logoutUser()
{
    const response = await fetch('/api/user/logout',
    {
        method: 'POST',
        header: { 'Content-Type': 'application/json' }
    });

    if (response.ok)
    {
        // Redirect the user to the homepage
        document.location.replace('/');
    }
    else 
    {
        alert('Failed to log out.');
    }
}