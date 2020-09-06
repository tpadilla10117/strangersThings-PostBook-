/* THIS IS THE COHORT API */
    /* - remember to specify routes */
    const API_URL = 'https://strangers-things.herokuapp.com/api/2006-CPU-RM-WEB-PT';

/* THIS IS OUR INITIAL STATE */
        const state = {
            token: '',
            responseObj: {},
            posts: [],
            messages: [],
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
            const app = $('#app');
            app.empty();
            app.append($(`
            <aside id="side-pane"></aside>
            <section class="overlay">
            <h1 class="animate__animated animate__wobble">Post Book</h1>
                <button type="button" id="landing-login" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#loginModal">Login</button>

                <button type="button" id="landing-register" class="btn btn-secondary btn-lg" data-toggle="modal" data-target="#registerModal">Register</button>

                <button type="button" id="guest-btn" class="btn btn-secondary btn-lg">Click to View Listings</button>

                <div id="loginLanding"></div>
                <div id="registerLanding"></div>
        </section>
        `))
        };
        render();

/* THIS IS TO RENDER NAV MENUS FOR AUTHETICATED OR UNAUTHENTICATED USERS */
        const navRender = () => {
            const authenticNav = $(`<nav id="mainNav2" class="navbar navbar-expand-lg navbar-light bg-light">

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
                  <div id="createPost-btn" data-toggle="modal" data-target="#createPostModal2">
                    <a class="nav-link" href="#">Create Post</a>
                  </div>
                </li>
                <li class="nav-item">
                  <div id="messages-btn" data-toggle="modal" data-target="#">
                    <a class="nav-link" href="#">Messages</a>
                  </div>
                </li>
                <li class="nav-item">
                  <div id="logout-btn">
                    <a class="nav-link" href="#">LogOut</a>
                  </div>
                </li>        
              </ul>
              
              <form class="search-form form-inline my-2 my-lg-0">
                <input id="searchPosts" class="form-control mr-sm-2" type="search" placeholder="Search Posts" aria-label="Search">
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
                  <div id="mainRegister-btn" data-toggle="modal" data-target="#registerModalMain">
                    <a class="nav-link" href="#">Register</a>
                  </div>
                </li>   
                <li class="nav-item">
                  <div id="mainLogin-btn" data-toggle="modal" data-target="#mainLoginModal">
                    <a class="nav-link" href="#">Login</a>
                  </div>
                </li>    
              </ul>
              
              <form class="search-form form-inline my-2 my-lg-0">
                <input id="searchPosts" class="form-control mr-sm-2" type="search" placeholder="Search Posts" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
    
            </nav>`)
            
            const loginBanner = $(
                `<div class="alert alert-success fade show" role="alert"><strong>You Are Logged In!</strong> Check Out the Listings Below!<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button></div>`);
            /* [9/3] -> Need to add functionaloty to home button */
            if(state.token) {
              $('#appNav').append(authenticNav);
              $('#alertBanner').append(loginBanner);
            } else if (state.token === '' || state.token === null) {
                $('#appNav').append(unauthenticNav);
            }

           /*  $('.home-btn').click(function () {
                console.log('home')    
            }) */
            
        }

/* THIS IS A RENDER FOR THE Forms*/
        const renderForms = () => {

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
                loginUser(loginSubmission, loginPassword);
            })

        /* This is for unauthenticated users */
            function mainLoginModal() {
                $('#mainLogin').empty();
                const mainLoginModal = $(`<div class="modal fade modal-dialog modal-dialog-centered" id="mainLoginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Log in To Post Book</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id=mainLoginForm>
                            <div class="form-group">
                                <label for="loginSubmissionMain">UserName</label>
                                <input type="text" required class="form-control" id="loginSubmissionMain" aria-describedby="textHelp" minlength="5" maxlength="15" placeholder="UserName">
                                <small id="textHelp" class="form-text text-muted">Enter Your UserName</small>
                                </div>
                            <div class="form-group">
                                <label for="loginPasswordMain">Password</label>
                                <input type="password" required class="form-control" id="loginPasswordMain" minlength="3" maxlength="12" placeholder="Password"><small id="textHelp" class="form-text text-muted">Enter Your Password</small>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>`)

                $('#mainLogin').append(mainLoginModal);
            }

            $('#mainLogin-btn').click(function(event) {
                event.preventDefault();
                console.log('click');
                mainLoginModal();
            })
      
            $('#app2').on('submit', '#mainLoginForm', function(event) {
                event.preventDefault();
                const loginSubmissionMain = $('#loginSubmissionMain').val();
                const loginPasswordMain = $('#loginPasswordMain').val();
                loginUser(loginSubmissionMain, loginPasswordMain);
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
                registerUser(registerSubmission, registerPassword);
            })

        /* This is the register for unauthenticated users */
        function mainRegisterModal() {
            $('#mainRegister').empty();
            const mainRegisterContainer = $(`<div class="modal fade modal-dialog modal-dialog-centered" id="registerModalMain" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Sign Up</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="registerFormMain">
                        <div class="form-group">
                            <label for="registerSubmissionMain">UserName</label>
                            <input type="text" required class="form-control" id="registerSubmissionMain" aria-describedby="textHelp" minlength="5" maxlength="15" placeholder="Create a Username">
                            <small id="textHelp" class="form-text text-muted">Create a UserName</small>
                            </div>
                        <div class="form-group">
                            <label for="registerPasswordMain">Password</label>
                            <input type="password" required class="form-control" id="registerPasswordMain" minlength="3" maxlength="12" placeholder="Create a Password"><small id="textHelp" class="form-text text-muted">Create a Password</small>
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

            $('#mainRegister').append(mainRegisterContainer);

        }

        $('#mainRegister-btn').click(function(event) {
            event.preventDefault();
            console.log('click');
            mainRegisterModal();
        })

        $('#app2').on('submit', '#registerFormMain', function(event) {
            event.preventDefault();
            const registerSubmissionMain = $('#registerSubmissionMain').val();
            const registerPasswordMain = $('#registerPasswordMain').val();
            registerUser(registerSubmissionMain, registerPasswordMain);
        })


        /* This is for the Main Page ' Create Post ' button */
        function createPostModal() {
            $('.postForm').empty();
            const postModal = $(`<div class="modal fade modal-dialog modal-dialog-centered" id="createPostModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            /* $('#createPostModal2').removeClass("goodbyeModal"); */
            createPostModal();
        })

        $('#parentNav').on('submit', '#createPostForm', async function(event) {
            event.preventDefault();
            const post = {}
            post.title = $('#itemSubmission').val();
            post.price = $('#priceSubmission').val();
            post.location = $('#locationSubmission').val();
            post.description = $('#exampleFormControlTextarea1').val();
            /* $('#createPostModal2').addClass("goodbyeModal"); */
           /*  $('.modal-backdrop').remove(); */
            await createPost(post);
            $('#postCards').empty();
            await postFetch();
            await fetchUserData();
            /* thePrepender(post); */
            renderEveryPost();
            render();
        })
    }

         
/* THIS IS TO PLACE A TOKEN IN localStorage AND/OR SAVE IT TO state.token */
    //save it to state.token -> we do this to be mindful of refresh
        const placeToken = (token) => {
            
            localStorage.setItem('token', token);
            state.token = token;
        }

/* THIS IS TO GET A TOKEN FROM localStorage OR STATE */
        const retrieveToken = () => {
            state.token = state.token || localStorage.getItem('token');
            return state.token;
        }


/* THIS IS TO REDIRECT GUESTS TO THE index.html (Main page w/ a guest view) */
        $('#app').on('click', '#guest-btn', function() {
            window.location.href = '/index.html';
            renderForms();
            renderEveryPost();
        })
    
/* THIS IS TO REGISTER A USER. TAKES A username and password */

        const registerUser = async (username, password) => {

            try {
                const response = await fetch(`${API_URL}/users/register`, {
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
                    console.log('responseObj: ', responseObj);
                    console.log('responseObj.data.token: ', responseObj.data.token);
                state.token = responseObj.data && responseObj.data.token;
                $('#app').empty();
                placeToken(responseObj?.data?.token);
                render();
                renderForms();
                renderEveryPost();
                window.location.href = '/index.html';
            } catch(error) {
                console.error(error);
            }
        }

/* THIS IS FOR WHEN A USER ALREADY HAS AN ACCT AND LOGS IN . TAKES A username and password */

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
                render();
                renderForms();
                renderEveryPost();
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
                /* alert("Thank you for logging in"); */
            }
        }
        isLoggedIn();
        

/* THIS IS FOR DISPLAYING USER'S NAME IN THE NAVBAR WHEN LOGGED IN */
    /* [8/31] - Need to create a dropdown that displays 'LogOut' button */


/* THIS REMOVES 'token' FROM LOCALSTORAGE AND STATE TO LOGOUT A USER */

        const logOut = () => {
            localStorage.removeItem('token');
            state.token = '';
            render();
        }

/* THIS IS FOR LOGGING OUT ON CLICKING NAV BAR ' LOGOUT ' */
/* [9/2] - Need to write */
    /* Need to: set conditionals for successful logOut
    - on successful logOut, redirects back to landing page */
       $('#appNav').on('click', '#logout-btn', function() {
           logOut();
           alert("Thank you for logging out");
           window.location.href = '/landing.html';
           render();
       } );

/* THIS IS TO CALL USERS/ME ROUTE AND SET USER DATA ON STATE */
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
                state.responseObj = responseObj;
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

    /* This is the fetch call for creating all posts */
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

/* THIS IS FOR RENDERING POSTS IN THE UI, USED WITH renderEveryPost() BELOW */
    const renderPosts = (post) => {
        return $(`
                <div id="cards" class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h2 class="card-title">${post.author.username}</h2>
                        <h5 class="card-title">${post.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Price: ${post.price}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Location: ${post.location}</h6>
                        <p class="card-text"> Description: ${post.description}</p>
                        ${post.isAuthor ? '<button type="button" id="editCard" class="btn btn-info" data-toggle="modal" data-target="#editModal">Edit</button>' : ''}
                        </div>
                        ${post.isAuthor ? '<button type="button" id="deleteCard" class="btn btn-danger">Delete</button>' : '<button type="button" id="messageBtn" class="btn btn-success">Message Author</button>'}
                        <div id="messageFormHolder">
                            <form id="send-message" class="inactive">
                                <div class="make-title">
                                    <label for="formGroupExampleInput">Send A Message To Author:</label>
                                    <input type="text" class="form-control" id="write-message" placeholder="Write A Message">
                                </div>
                                <button class="new-messageBtn" type="submit">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>`).data('post', post);
    }

/* THIS RENDERS EVERY POST IN EXISTENCE ON THE API */
        const renderEveryPost = () => {
            const prependPosts = $('#postCards');
            postFetch();
            state.posts.forEach(post => {
                prependPosts.prepend(renderPosts(post))
            })
        }

/* THIS FUNCTION FETCHES POSTS & ALLOWS isAuthor KEY TO HAVE A BOOLEAN TRUE FOR CURRENT USER */
        const postFetch = async () => {
            const {data} = await (await fetch(`${API_URL}/posts`, {
                headers: makeHeaders()
            })).json();
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
        const createMessage = async (postId, content) => {
            try {
                const response = await fetch(`${API_URL}/posts/${postId}/messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.token}`
                    },
                    body: JSON.stringify({
                        message: {
                            content,
                        }
                    })
                });
                const responseObj = await response.json();
                    console.log('responseObj: ', responseObj);
                state.messages.push({postId, content});
            }   catch (error) {
                console.error(error);
            }
        }

/* THIS IS TO Toggle A MESSAGE FORM ON THE CLICK OF ' MESSAGE AUTHOR ' */

        $('#app2').on('click', '#messageBtn', async function(event) {
            const card = $(this).closest('#cards');
            const containerSearch = card.find('#messageFormHolder form');
            containerSearch.toggleClass('inactive');

        })


    
/* THIS IS FOR DISPLAYING MESSAGES THAT THE USER HAS */
        /* need to create a card formatted for the messages */

        /* $('#parentNav').on('click', '#messages-btn', async function() {
            try {
                await fetchUserData();
                const messages = state.responseObj.messages;
                $('#postCards').empty();
                $('#postCards').append(messages.map(renderMessageCards));
            } catch (error) {
                console.log(error);
            }
        }) */

        const renderMessageCards = (post) => {
            return $(`
                    <div id="message-cards" class="card" style="width: 18rem;">
                        <div class="message-body">
                            <h2 class="card-title">${post.author.username}</h2>
                            <h5 class="card-title">${post.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Price: ${post.price}</h6>
                            <h6 class="card-subtitle mb-2 text-muted">Location: ${post.location}</h6>
                            <p class="card-text"> Description: ${post.description}</p>
                            <button type="button" class="btn btn-success">Message Author</button>
                        </div>
                    </div>`)
        }

    
/* THIS IS FOR DELETING POSTS- SETTING isActive to false */
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

/* THIS IS FOR THE DELETE BUTTON */
     
        $('#app2').on('click', '#deleteCard', async function() {
            const theCard = $(this).closest('#cards');
            console.log('clicked delete');
            console.log(theCard.data('post')._id);
                const theCardId = theCard.data('post')._id;
                 try { 
                    await deletePost(theCardId); 
                    theCard.slideUp();
                    await postFetch();
                    $('#postCards').empty()
                    renderEveryPost();
                 } catch (error) {
                    console.error(error);
                }   
        })

    
/* THIS IS FOR PATCHING/UPDATING YOUR POSTS */

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

/* THIS IS TO RENDER A MODAL FOR EDITING POSTS */
        const editModalRender = () => {
            $('#editModalContainer').empty();
            const editModalContainer = $(`<div class="modal fade modal-dialog modal-dialog-centered" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Your Post</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="editModalForm">
                        <div class="form-group">
                            <label for="editItem">Item</label>
                            <input type="text" class="form-control" id="editItem" aria-describedby="textHelp" placeholder="What Would You Like to Sell?">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">$</span>
                            </div>
                            <input type="text" id="editPrice" class="form-control" aria-label="Amount (to the nearest dollar)" placeholder="Amount (to the nearest dollar)">
                            <div class="input-group-append">
                                <span class="input-group-text">.00</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="editLocation">Location</label>
                            <input type="text" class="form-control" id="editLocation" placeholder="Where Are You Located?">
                        </div>
                        <div class="form-group">
                            <label for="editDescription">Description</label>
                            <small id="textHelp" class="form-text text-muted">Describe What it is You Are Selling</small>
                            <textarea class="form-control" id="editDescription" rows="3"></textarea>
                        </div>
                        <button type="submit" id="editCardSubmit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>`)

            $("#editModalContainer").append(editModalContainer);
        }

/* THIS IS FOR THE ON CLICK OF AN EDIT BUTTON */
        $('#app2').on('click', '#editCard', function() {
            const theCard = $(this);
            console.log('clicked edit');
            editModalRender();
        }) 
    
/* THIS IS FOR FILTERING THROUGH THE POSTS */
        $('#appNav').on('submit', '.search-form', function(event){
            event.preventDefault();
            const searchInput = $(this).find('input').val();
            const searchFiltered = state.posts.filter(function(post){ 
            return post.description.toLowerCase().includes(searchInput.toLowerCase())|| post.title.toLowerCase().includes(searchInput.toLowerCase())||
            post.price.toLowerCase().includes(searchInput.toLowerCase())||
            post.author.username.toLowerCase().includes(searchInput.toLowerCase());
        });
            $('#app2').find('#postCards').empty();
            $('#app2').find('#postCards').append(searchFiltered.map(renderPosts));
        });
  
/* THIS IS A WRAPPER FOR ALL OF OUR FUNCTIONS (A 'BOOTSTRAP') */

        const allTheFuncs = async () => {
            const app = $('#app');
            const app2 = $('#postCards');
            app.empty();
            app2.empty();
            render();
            retrieveToken();
            try {
                await postFetch();
            navRender();
            renderForms();
            renderEveryPost();
            } catch(error) {
                console.error(error);
            }
        }
        allTheFuncs();
