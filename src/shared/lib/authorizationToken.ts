export function getAuthorizationToken() {
    return localStorage.getItem('token');
}

export function setAuthorizationToken(token: string) {
    if (!token) {
        console.error('No token found');
        throw new Error('No token found');
    }

    localStorage.setItem('token', token);
}