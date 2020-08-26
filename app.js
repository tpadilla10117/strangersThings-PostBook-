/* THIS IS THE COHORT API */
    /* - remember to specify routes */
    const API_URL = 'https://strangers-things.herokuapp.com/api/2006-CPU-RM-WEB-PT';

/* THIS IS OUR INITIAL STATE */
    const state = {
        token: '',
        responseObj: {},
        posts: [],
        searchTerm: '',
    };




/* THIS IS TO REGISTER A USER. TAKES A username and password */

    /* header --> what data type we are sending over (JSON) */
    /* we send username and password and get back a token */


    const registerUser = async (username, password) => {

        try {
            const response = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                /*notice how when you log it, you get a token and success*/
                /* You want to store the token in state */
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password
                    }
                })
            })
            const responseObj = await response.json();
            console.log('responseObj: ', responseObj);
            console.log('responseObj.data.token: ', responseObj.data.token);
            state.token = responseObj.data && responseObj.data.token;
            /* if you console.log state.token, youll get back the user's token */
            /* s successful login message */
            $('#app').empty();
            if(state.token) {
                $('#app').append(responseObj.data.message);
            } else {
            $('#app').append(responseObj.error.message);
            }
        } catch(error) {
            console.error(error);
        }
    }

/* THIS IS FOR WHEN A USER ALREADY HAS AN ACCT AND LOGS IN . TAKES A username and password */

    /* we send in the username and password & get back the token */

    const loginUser = async (username, password) => {
        try {
            const loginResponse = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password    
                    }
                })
            })
            const loginObj = await loginResponse.json();
                console.log('loginObj: ', loginObj);
            state.token = loginObj.data && loginObj.data.token;
                console.log('loginObj.data.token: ', loginObj.data.token);

        } catch(error) {
            console.error(error)
        }
    }





/* THIS REMOVES 'token' FROM LOCALSTORAGE AND STATE */







/* THIS IS TO CALL USERS/ME ROUTE AND SET USER DATA ON STATE */

    /* this is how we get the userdata back */


    /* async function fetchUserData () {
        try {
            const response = await fetch(`${API_URL}/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.token}`
                },
            });
            const responseObj = await response.json();
            console.log('responseObj:', responseObj);
            
        } catch (error) {
            console.error(error);
        }
    } */
