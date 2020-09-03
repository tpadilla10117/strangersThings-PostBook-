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

/* THIS IS THE makeHeaders() FUNCTION USED IN API REQUESTS */
        const makeHeaders = () => {
            if(state.token) {
                return {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.token}`
                }
            } else if(!state.token) {
                return {
                    'Content-Type': 'application/json'
                }
            }
        }
            
/* THIS IS THE MAIN RENDER FUNCTION */
        const render = () => {
            /* $('#app').empty(); */
            if(state.responseObj && state.responseObj.data) {
                $('#app').append(state.responseObj.data.message)
            } else if(state.responseObj && state.responseObj.error) {
                $('#app').append(state.responseObj.error.message);
            }
            if(state.token) {
                $('#app').append('you are logged in');
            }
        }

/* THIS IS TO RENDER NAV MENUS FOR AUTHETICATED OR UNAUTHENTICATED USERS */
        const navRender = () => {
            const authenticNav = $(`<nav id="mainNav" class="navbar navbar-expand-lg navbar-light bg-light">

            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <div id="createPost-btn" data-toggle="modal" data-target="#createPostModal">
                    <a class="nav-link" href="#">Create Post</a>
                  </div>
                </li>
                <li class="nav-item">
                  <div id="logout-btn">
                    <a class="nav-link" href="#">LogOut</a>
                  </div>
                </li>        
              </ul>
              
              <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search Posts" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
    
            </nav>`);
        
        
            const unauthenticNav = $(`<nav id="mainNav" class="navbar navbar-expand-lg navbar-light bg-light">

            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <div id="mainRegister-btn" data-toggle="modal" data-target="#">
                    <a class="nav-link" href="#">Register</a>
                  </div>
                </li>   
                <li class="nav-item">
                  <div id="mainLogin-btn" data-toggle="modal" data-target="#">
                    <a class="nav-link" href="#">Login</a>
                  </div>
                </li>    
              </ul>
              
              <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search Posts" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
    
            </nav>`)
            
            /* [9/3] -> Need to add functionaloty to home, login, and register buttons */
            if(state.token) {
              $('#appNav').append(authenticNav);
            } else if (state.token === '' || state.token === null) {
                $('#appNav').append(unauthenticNav);
            }
        }


/* THIS IS A RENDER FOR THE Forms*/
/* [8/29] - MODAL not properly working */
        const renderForms = () => {

            /* THIS WORKS BUT NEED TO STYLE & ADJUST SYNTAX (CLASSES, IDS, ETC) */
            /* [8/30] ALSO NEED TO SETUP FOR REGISTER */
            function landingLoginModal() {
                $('#loginLanding').empty();
                const loginModal = $(`<div class="modal fade modal-dialog modal-dialog-centered" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Log in To Post Book</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id=loginForm>
                            <div class="form-group">
                                <label for="loginSubmission">UserName</label>
                                <input type="text" required class="form-control" id="loginSubmission" aria-describedby="textHelp" minlength="5" maxlength="15" placeholder="UserName">
                                <small id="textHelp" class="form-text text-muted">Enter Your UserName</small>
                                </div>
                            <div class="form-group">
                                <label for="loginPassword">Password</label>
                                <input type="password" required class="form-control" id="loginPassword" minlength="3" maxlength="12" placeholder="Password"><small id="textHelp" class="form-text text-muted">Enter Your Password</small>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>`);

                $('#loginLanding').append(loginModal);
            }

            $('#landing-login').click(function(event) {
                event.preventDefault();
                console.log('click');
                landingLoginModal();
            })

            $('#app').on('submit', '#loginForm', function(event) {
                event.preventDefault();
                const loginSubmission = $('#loginSubmission').val();
                const loginPassword = $('#loginPassword').val();
                console.log('loginSubmission :',loginSubmission, 'loginPassword: ', loginPassword);
                loginUser(loginSubmission, loginPassword);
            })

        /* This is for the landing pg ' Register ' button */
            function landingRegisterModal() {
                $('#registerLanding').empty();
                const registerModal = $(`<div class="modal fade modal-dialog modal-dialog-centered" id="registerModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Sign Up</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="registerForm">
                            <div class="form-group">
                                <label for="registerSubmission">UserName</label>
                                <input type="text" required class="form-control" id="registerSubmission" aria-describedby="textHelp" minlength="5" maxlength="15" placeholder="Create a Username">
                                <small id="textHelp" class="form-text text-muted">Create a UserName</small>
                                </div>
                            <div class="form-group">
                                <label for="registerPassword">Password</label>
                                <input type="password" required class="form-control" id="registerPassword" minlength="3" maxlength="12" placeholder="Create a Password"><small id="textHelp" class="form-text text-muted">Create a Password</small>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>`);

                $('#registerLanding').append(registerModal);
            }

            $('#landing-register').click(function(event) {
                event.preventDefault();
                console.log('click');
                landingRegisterModal();
            })

            $('#app').on('submit', '#registerForm', function(event) {
                event.preventDefault();
                const registerSubmission = $('#registerSubmission').val();
                const registerPassword = $('#registerPassword').val();
                console.log('registerSubmission :',registerSubmission, 'loginPassword: ', registerPassword);
                registerUser(registerSubmission, registerPassword);
            })

        /* This is for the Main Page ' Create Post ' button */
        /* 9/1 - Need to read values from the form*/
        function createPostModal() {
            $('.postForm').empty();
            const postModal = $(`<div class="modal fade modal-dialog modal-dialog-centered" id="createPostModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Create a Listing</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="createPostForm">
                        <div class="form-group">
                            <label for="itemSubmission">Item</label>
                            <input type="text" required class="form-control" id="itemSubmission" aria-describedby="textHelp" placeholder="What Would You Like to Sell?">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">$</span>
                            </div>
                            <input type="text" required id="priceSubmission" class="form-control" aria-label="Amount (to the nearest dollar)" placeholder="Amount (to the nearest dollar)">
                            <div class="input-group-append">
                                <span class="input-group-text">.00</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="locationSubmission">Location</label>
                            <input type="text" required class="form-control" id="locationSubmission" placeholder="Where Are You Located?">
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Description</label>
                            <small id="textHelp" class="form-text text-muted">Describe What it is You Are Selling</small>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" required></textarea>
                        </div>
                        <button type="submit" id="createCardSubmit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>`);

            $('.postForm').append(postModal);
        }

        $('#createPost-btn').on('click', function(event) {
            event.preventDefault();
            console.log('clicked create post');
            createPostModal();
        })

        /*9/2 -> How do I render what's submitted from the form to the card... also need to make this so it only works if logged in, & can only see in UI if logged in*/
        $('#app').on('submit', '#createPostForm', function(event) {
            event.preventDefault();
            const itemSubmission = $('#itemSubmission').val();
            const priceSubmission = $('#priceSubmission').val();
            const locationSubmission = $('#locationSubmission').val();
            const descripSubmission = $('#exampleFormControlTextarea1').val();
            console.log('itemSubmission :',itemSubmission, 'priceSubmission: ', priceSubmission, 'locationSubmission: ', locationSubmission, 'descripSubmission: ', descripSubmission);
            /* registerUser(registerSubmission, registerPassword) */;
        })


    }

         
/* THIS IS TO PLACE A TOKEN IN localStorage AND/OR SAVE IT TO state.token */
/* [8/31 - will persist token in localStorage, but need to update handlers on forms */
        const placeToken = (token) => {
            //set the token as 'token' in localStorage
            localStorage.setItem('token', token);
            state.token = token;
            //save it to state.token -> we do this to be mindful of

        }

/* THIS IS TO GET A TOKEN FROM localStorage OR STATE */
/* [8/26-WORKS] */
        const retrieveToken = () => {
            state.token = state.token || localStorage.getItem('token');
            return state.token;
        }


/* THIS IS TO REDIRECT GUESTS TO THE index.html (Main page w/ a guest view) */
        $('#guest-btn').click(function() {
            window.location.href = '/index.html';
        })
    
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
                placeToken(responseObj?.data?.token);
                window.location.href = '/index.html';
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
                            username,
                            password
                        }
                    })
                })
                const responseObj = await response.json();
                /* We can set the token in local storage for auto login */
                /* set up conditional to aleart user in UI if login is successful or not */
                placeToken(responseObj?.data?.token);
                window.location.href = '/index.html';
            } catch(error) {
                console.error(error)
            }
        }

/* THIS IS FOR THE MODAL THAT APPEARS WHEN YOU LOGIN A USER */
/* [8/29] - Works - Need to find a way to display a message to User in the UI */
        const isLoggedIn = () => {
            if(state.token || localStorage.getItem('token') ) {
                console.log("We are logged in");
                alert("Thank you for logging in");
            }
        }
        isLoggedIn();

/* THIS IS FOR DISPLAYING USER'S NAME IN THE NAVBAR WHEN LOGGED IN */
    /* [8/31] - Need to create a dropdown that displays 'LogOut' button */


/* THIS REMOVES 'token' FROM LOCALSTORAGE AND STATE TO LOGOUT A USER */
/* [8/26-WORKS] */

        const logOut = () => {
            localStorage.removeItem('token');
            state.token = '';
        }

/* THIS IS FOR LOGGING OUT ON CLICKING NAV BAR ' LOGOUT ' */
/* [9/2] - Need to write */
    /* Need to: set conditionals for successful logOut
    - on successful logOut, redirects back to landing page */
       $('#appNav').on('click', '#logout-btn', function() {
           logOut();
           alert("Thank you for logging out");
           window.location.href = '/landing.html';
       } );

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

    /* This is the fetch call for creating posts */
    /* [8/30] - works */
        const createPost = async post => {
            try {
                const response = await fetch(`${API_URL}/posts`, {
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
    
/* THIS IS FOR RENDERING POSTS */
    /* [9/1] - cards add on click, though need to attach data */
    const renderPosts = (post) => {
        function createPostCard () {
            
            const postCreator = $(`
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${post.price}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">${post.location}</h6>
                    <p class="card-text">${post.description}</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>`)

            $('#postCards').append(postCreator);
            
        }

        $('#createPost-Btn').click(function(event) {
                    event.preventDefault();
                    console.log('clicked Create');
                    createPostCard();
        })
    }
    /* renderPosts(); */

    const postObj = {

    }
    
    
/* THIS FUNCTION FETCHES POSTS */
    /* [8/30]- works */
        const postFetch = async () => {
            const {data} = await (await fetch(`${API_URL}/posts`)).json();
                console.log('data: ', data);
            state.posts = data.posts;
        }

    
/* THIS IS FOR CREATING NEW MESSAGES FOR POSTS */
        /* [8/30] - incomplete, need to figure out where to store */
    /* These are the request parameters for messages: */
    /** 
        @param {string} postId - where we put message
        @param {string} content - message content
        @returns {undefined}
    */
        /* const createMessage = async (postId, content) => {
            try {
                const response = await fetch(`${API_URL}/posts/${post._id}/messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.token}`
                    },
                    body: JSON.stringify({
                        message: {
                            content: content,
                        }
                    })
                });
                const responseObj = await response.json();
                    console.log('responseObj: ', responseObj.data.postId);
                state.posts.push(responseObj.data.postId);
            }   catch (error) {
                console.error(error);
            }
        } */
    
    
/* THIS IS FOR DELETING POSTS- SETTING isActive to false */
        /* [8/30] - Works */
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

    
/* THIS IS FOR PATCHING/UPDATING YOUR POSTS */
        /* [8/30] - works */
    /* These are the parameter requests for editPost function : */
    /**
     * @param {Object} post - post details
     * @param {string} post.title - title of the card
     * @param {string} post.description  - description of item
     * @param {string} post.price - price of item
     * @param {string} post.location - location of item
     * @param {boolean} post.willDeliver - whether or not item will be delivered
     * @returns {undefined}
     */

        const postEdit = async (post) => {
            try {
            const response = await fetch(`${API_URL}/posts/${post._id}`, {
                method: 'PATCH',
                headers: makeHeaders(),
                body: JSON.stringify({post})
            });
            const data = await response.json();
                console.log('data: ', data);
            } catch(error) {
            console.error(error);
            }
        }
    
    
    
/* THIS IS A WRAPPER FOR ALL OF OUR FUNCTIONS (A 'BOOTSTRAP') */

        /* What else do I have to put in here? */
        /* why would I use an asynchronous func here? */
        const allTheFuncs = async () => {
            const app = $('#app');
            retrieveToken();
                console.log('state.token: ', state.token);
            navRender();
            renderForms();
            render();
            /* app.append(renderPost()); */
            
        }
        allTheFuncs();
