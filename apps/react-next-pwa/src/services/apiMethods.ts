import { ILoginFormValues, ISignupFormValues } from '~/interfaces/props';

export const loginMethod = async (payload: ILoginFormValues) => {
    const loginUrl = process.env.NEXT_PUBLIC_CHAT_SERVER_API + '/auth/login' || '';
    try {
        const resp = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (resp) {
            const responseData = await resp.json();
            if (resp && resp.status === 200 && resp.ok) {
                // set token to localstorage for session persistance
                const lsKey = process.env.NEXT_PUBLIC_AUTH_KEY || 'token';
                // window.localStorage.setItem(lsKey, JSON.stringify(responseData.token));
                window.localStorage.setItem(lsKey, responseData.token);
                return {
                    status: 'ok',
                    message: responseData.message
                }
            } else {
                return {
                    status: 'error',
                    message: responseData.message
                }
            }
        }
        return {
            status: 'error',
            message: 'Something went wrong'
        }

    } catch (error) {
        console.log('error :>> ', error);
        return {
            status: 'error',
            message: 'Something went wrong'
        }
    }
}

export const signupMethod = async (payload: ISignupFormValues) => {
    const signUpUrl = process.env.NEXT_PUBLIC_CHAT_SERVER_API + '/auth/signup' || '';
    try {
        const resp = await fetch(signUpUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (resp) {
            const respData = await resp.json();

            if (resp && resp.status === 200 && resp.ok) {
                return {
                    status: 'ok',
                    message: respData.message
                }
            } else {
                return {
                    status: 'error',
                    message: respData.message
                }
            }
        }
        return {
            status: 'error',
            message: 'Something went wrong'
        }

    } catch (error) {
        console.log('error :>> ', error);
        return {
            status: 'error',
            message: 'Something went wrong'
        }
    }
}

export const getCurrentUser = async () => {
    const lsKey = process.env.NEXT_PUBLIC_AUTH_KEY || 'token';
    const authToken = window.localStorage.getItem(lsKey);
    const currentUserUrl = process.env.NEXT_PUBLIC_CHAT_SERVER_API + '/auth/users/me' || '';

    if (authToken) {
        try {
            const resp = await fetch(currentUserUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (resp) {
                const respData = await resp.json();

                if (resp && resp.status === 200 && resp.ok) {
                    return {
                        status: 'ok',
                        data: {
                            ...respData
                        }
                    }
                }
                return null;
            }
            return null;

        } catch (error) {
            console.log('error :>> ', error);
        }
    }
    return null;
}

export const getAllUsers = async () => {
    const lsKey = process.env.NEXT_PUBLIC_AUTH_KEY || 'token';
    const authToken = window.localStorage.getItem(lsKey);
    const fetchAllUsersURL = process.env.NEXT_PUBLIC_CHAT_SERVER_API + '/users' || '';

    if (authToken) {
        try {
            const resp = await fetch(fetchAllUsersURL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (resp) {
                const respData = await resp.json();

                if (resp && resp.status === 200 && resp.ok) {
                    return {
                        status: 'ok',
                        data: [...respData]
                    }
                }
                return null;
            }
            return null;

        } catch (error) {
            console.log('error :>> ', error);
        }
    }
    return null;
}

export const getUser = async ({ userId }: { userId: string }) => {
    const lsKey = process.env.NEXT_PUBLIC_AUTH_KEY || 'token';
    const authToken = window.localStorage.getItem(lsKey);
    const fetchAllUsersURL = process.env.NEXT_PUBLIC_CHAT_SERVER_API + '/users' + `/${userId}` || '';

    if (authToken) {
        try {
            const resp = await fetch(fetchAllUsersURL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (resp) {
                const respData = await resp.json();

                if (resp && resp.status === 200 && resp.ok) {
                    return {
                        status: 'ok',
                        data: {
                            ...respData
                        }
                    }
                }
                return null;
            }
            return null;

        } catch (error) {
            console.log('error :>> ', error);
        }
    }
    return null;
}

export const logout = () => {
    const lsKey = process.env.NEXT_PUBLIC_AUTH_KEY || 'token';
    window.localStorage.removeItem(lsKey);
    location.reload();
}