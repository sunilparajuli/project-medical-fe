class LocalStorage {  
   
    saveAccessToken(token) {
        console.log('Access Token', token)
        localStorage.setItem('ACCESS_TOKEN', token);
	}
    saveRefreshToken(token) {
        console.log('Refresh Token', token)
        localStorage.setItem('REFRESH_TOKEN', token);
	}

    saveUser(username) {
        console.log('Username Token', username)
        localStorage.setItem('user', username);
	}

    getRefreshToken() {		
		return localStorage.getItem('REFRESH_TOKEN')
	}

    getAccessToken() {
		return localStorage.getItem('ACCESS_TOKEN')
	}

    getUser() {
		return localStorage.getItem('user')
	}

    clearContext() {
        localStorage.removeItem('ACCESS_TOKEN')
        localStorage.removeItem('REFRESH_TOKEN')
        localStorage.removeItem('user')
    }
}

export default new LocalStorage()