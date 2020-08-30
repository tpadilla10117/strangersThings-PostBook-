/* THIS IS THE COHORT API */
    /* - remember to specify routes */
        const API_URL = 'https://strangers-things.herokuapp.com/api/2006-CPU-RM-WEB-PT';

/* THIS IS OUR INITIAL STATE */
        const state = {
            token: '',
            responseObj: {},
            posts: [],
            searchTerm: '',
            user: {},
        };


/* THIS IS THE MAIN RENDER FUNCTION */
        const render = () => {
            $('#app').empty();
            if(state.responseObj && state.responseObj.data) {
                $('#app').append(state.responseObj.data.message)
            } else if(state.responseObj && state.responseObj.error) {
                $('#app').append(state.responseObj.error.message);
            }
            if(state.token) {
                $('#app').append('you are logged in');
            }
        }


/* THIS IS A RENDER FOR THE Forms*/
/* [8/29] - MODAL not properly working */
        const renderForms = () => {
            
            function registerModal() {
                $('#register-Form').empty();
                const registerForm = $(`<form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>`);

              $('#register-Form').append(registerForm);
            }
            
            $('#register-btn').click(function(event) {
                event.preventDefault();
                console.log('click');
                registerModal();
                /* NEED TO CALL registerUser() function and submit values from the form to the backend */
                /* registerUser(username, password); */
            })


            function loginModal() {
                $('#login-Form').empty();
                const loginForm = $(`<form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>`);

              $('#login-Form').append(loginForm);
            }
            
            $('#login-btn').click(function(event) {
                event.preventDefault();
                console.log('click');
                loginModal();
            })
        }

     
/* THIS IS TO PLACE A TOKEN IN localStorage AND/OR SAVE IT TO state.token */
/* [8/26-Not setting token in localStorage...though seemingly fixed it] */
        const placeToken = (token) => {
            //if we have a defined token
            if(!token) {
                return;
            }
            //set the token as 'token' in localStorage
            localStorage.setItem('token', token);
            //save it to state.token
            state.token = token;
        }
        placeToken(state.token);


/* THIS IS TO GET A TOKEN FROM localStorage OR STATE */
/* [8/26-WORKS] */
        const retrieveToken = () => {
            state.token = state.token || localStorage.getItem('token');
            return state.token;
        }


/* THIS IS TO FETCH POSTS THAT ARE CREATED */
        const fetchPosts = async () => {
            const {data} = await (await fetch(`${API_URL}/posts`)).json();
                console.log('data: ', data);
            state.posts = data.posts;
        }


/* THIS IS TO REGISTER A USER. TAKES A username and password */ /* [8/26-WORKS]
 */
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
                /* Need to add a conditional for successful login message */
                /* Need to change whats seen on backend, and wjhat is given in UI */
                $('#app').empty();
                /* render(); */
                
            } catch(error) {
                console.error(error);
            }
        }

/* THIS IS A HELPER FUNCTION FOR SUCCESS/ERROR MESSAGES UPON REGISTERING */
// [8/29] - incomplete, meant for use in BACKEND only
         // const registerMessages = () => {
        //     $('#app').empty();

        //     const registrationError = "Registration unsuccessful.  Try Again.";
        //     const registerSuccess = "Registration successful!  Welcome to the community!";


/* THIS IS FOR THE MODAL THAT APPEARS WHEN YOU REGISTER A USER */
            

            

/* THIS IS FOR WHEN A USER ALREADY HAS AN ACCT AND LOGS IN . TAKES A username and password */
/* [8/26-WORKS] */


    /* we send in the username and password & get back the token */
        const loginUser = async (username, password) => {
            try {
                const response = await fetch(`${API_URL}/users/login`, {
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
                const responseObj = await response.json();
                    console.log('resonseObj: ', responseObj);
                state.token = responseObj.data && responseObj.data.token;
                    console.log('responseObj.data.token: ', responseObj.data.token);
                /* We can set the token in local storage for auto login */
                state.responseObj = responseObj;
                /* render(); */
            } catch(error) {
                console.error(error)
            }
        }

/* THIS IS FOR THE MODAL THAT APPEARS WHEN YOU LOGIN A USER */
/* [8/29] - Works - Need to find a way to display a message to User in the UI */
            const isLoggedIn = () => {
                if(state.token) {
                    console.log("We are logged in");
                    alert("Thank you for loggin in");
                } else {
                    console.log("We're logged out.");
                }
            }
            isLoggedIn();

/* THIS REMOVES 'token' FROM LOCALSTORAGE AND STATE TO LOGOUT A USER */
/* [8/26-WORKS] */

        const logOut = () => {
            localStorage.removeItem('token');
            state.token = '';
        }



/* THIS IS TO CALL USERS/ME ROUTE AND SET USER DATA ON STATE */
/* [8/26-WORKS] */
    /* this is how we get the userdata back */
        async function fetchUserData () {
            try {
                const response = await fetch(`${API_URL}/users/me`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.token}`
                    },
                });
                const responseObj = await response.json();
                    console.log('responseObj:', responseObj);
               /*  if(data.username) {
                    state.user = data.token;
                } */
                
            } catch (error) {
                console.error(error);
            }
        }


/* THIS IS FOR CREATING POSTS */
      
    /* These are the Request parameters: */
    /** 
        @param {Object} post
        @param {string} post.title
        @param {string} post.description
        @param {string} post.price
        @param {string} post.location
        @param {boolean} post.willDeliver
        @returns {undefined}
    */

    /* This is the fecth call for creating posts */
        const createPost = async post => {
            try {
                const newPost = await fetch(`${API_URL}/posts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.token}`
                    },
                    body: JSON.stringify({post})
                });
                const responseObj = await response.json();
                    console.log('responseObj: ', responseObj.data.post);
                state.posts.push(responseObj.data.post);
            }   catch (error) {
                console.error(error);
            }
        }


/* THIS FUNCTION FETCHES POSTS */
        const postFetch = async () => {
            const {data} = await (await fetch(`${API_URL}/posts`)).json();
                console.log('data: ', data);
            state.posts = data.posts;
        }


/* THIS IS FOR DELETING POSTS- SETTING isActive to false */
        /* [8/30] - Won't work until you create posts */
    /* postId is the post that will be deleted */
        /** 
        @param {string} postId
        @returns {undefined}
        */

        const deletePost = async postId => {
            try {
                const response = await fetch(`${API_URL}/posts/${postId}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.token}`
                    }
                });
                const responseObj = await response.json();
                    console.log('responseObj: ', responseObj);
                    console.log('responseObj.success :', responseObj.success);
            } catch (error) {
                console.error(error);
            }
        }

/* THIS IS A WRAPPER FOR ALL OF OUR FUNCTIONS (A 'BOOTSTRAP') */

        /* What else do I have to put in here? */
        const allTheFuncs = async () => {
            placeToken();
            retrieveToken();
                console.log('state.token: ', state.token);
            render();
            renderForms();
        }
        allTheFuncs();
