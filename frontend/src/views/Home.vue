<script>
import CreatePostComponent from '../components/CreatePostComponent.vue'

export default {
    name: "Home",
    components : { CreatePostComponent },
    data: function () {
        return {
            showEmptyPost: '',
            mode: 'home',
            postContents : '',
            postCreated : false,
            modifiedPost : false,
            isAdmin : false,
            firstNameUserConnected:'',
            lastNameUserConnected :'',
        };
    },
    methods: {
        /**
         * @function displayUserConnected() display first and last nam of the user connected
         */
        displayUserConnected(){
            const user = JSON.parse(localStorage.getItem('user'))
            this.firstNameUserConnected = user.firstName
            this.lastNameUserConnected = user.lastName
        },
        /**
         * @function setHeadersRequest to set request's headers with acces token
         */
        setHeadersRequest(){
            const user = localStorage.getItem("user");
            if (user) {
            const userDecoded = JSON.parse(user);
            this.axios.defaults.headers.common["Authorization"] = "Bearer " + userDecoded.token;
            }
        },
        /**
         * @function getAllPost get all post in database to displayed them by using GET request
         */
        getAllPost() {
            this.axios.get("/post")
                .then((res) => {
                    if (res.data == '') {
                        this.showEmptyPost = true;
                    }else{
                        this.postContents = res.data
                    }
                })
                .catch((error) => {
                console.log(error);
                });
        },
        /**
         * @function switchMode switch from view home to CreatePost component and vice versa
         * @param {*} params : the mode we clicked on
         */
        switchMode(params){
            if(params == 'home'){
                this.mode = 'home'
            }
            if(params == 'create'){
                this.mode = 'create'
            }
        },
        /**
         * @function switchToHome swicth from CreatePost component to Home view and display a success msg
         */
        switchToHome(){
            if(this.mode == 'create'){
                this.mode = 'home'
            }
            this.postCreated = true
            setTimeout(() => {
                this.postCreated = false
                this.$router.go()// refresh the page
            }, 1000)
        },
        /**
         * @function isLiked add user who liked the post to the array usersLiked
         * @param {*} post : the post that is liked
         */
        isLiked(post){
            let arrayLiked = post.usersLiked // all user who liked
            // get userId who likes the post
            let user = JSON.parse(localStorage.getItem('user'))
            let userIdWhoLikes = user.userId
            return arrayLiked.includes(userIdWhoLikes)
        },
        /**
         * @function like like the post, send a POST request
         * @param {*} idPost : the id of the post that is liked
         */
        like(idPost){
            // get userId who likes the post
            let user = JSON.parse(localStorage.getItem('user'))
            let userIdWhoLikes = user.userId
            let firstNameWhoLikes = user.firstName
            let lastNameWhoLikes = user.lastName
            // POST LIKE request
            this.axios.post(`/post/${idPost}/like`, {
                userId: userIdWhoLikes,
                firstName : firstNameWhoLikes,
                lastName : lastNameWhoLikes,
                like : 1, // means it's liked
            })
                .then((res) => {
                    this.$router.go() // refresh the page
                    return res
                })
                .catch((error)=>{
                    console.log(error)
                })   
        },
        /**
         * @function dislike to unlike the post
         * @param {*} idPost : the id of the post that is unliked
         */
        dislike(idPost){
            // get userId who likes the post
            let user = JSON.parse(localStorage.getItem('user'))
            let userIdWhoLikes = user.userId
            let firstNameWhoLikes = user.firstName
            let lastNameWhoLikes = user.lastName
            // POST DISLIKE request
            this.axios.post(`/post/${idPost}/like`, {
                userId: userIdWhoLikes,
                firstName : firstNameWhoLikes,
                lastName : lastNameWhoLikes,
                like : -1 , // means it's unliked
            })
                .then((res) => {
                    this.$router.go()// refresh the page
                    return res
                })
                .catch((error)=>{
                    console.log(error)
                })   
        },
        /**
         * @function switchToEdit change from home view to EditPost view by clicking on the button
         * @param {*} id : the post's id that we want to edit 
         */
        swicthToEdit(id) {
            this.$router.push({ name: 'EditPost', params: { id: id } })
        },
        /**
         * @function isOwner specifies that the user connected is the same user who create the post
         * @param {*} postUserId : the id of the post that interests us
         */
        isOwner(postUserId){
            let user = JSON.parse(localStorage.getItem('user'))
            let userConnected = user.userId
            return userConnected == postUserId
        },
        /**
         * @function getUser get connected user from the database to determine if he's Admin or not
         */
        getUser(){
            let user = JSON.parse(localStorage.getItem('user'))
            let userConnected = user.userId
            // GET request with the id of the connected user
            this.axios.get(`/auth/${userConnected}`)
            .then((res)=> {
                this.isAdmin = res.data.isAdmin
            })
            .catch((err)=> {
                console.log(err)
            })
        },
        /**
         * @function deletePost delete post
         * @param {*} idPost : the id of the post we want to delete
         */
        deletePost(idPost){
            // DELETE request
            this.axios.delete(`/post/${idPost}`)
                .then((res) => {
                    this.$router.go()// refresh the page
                    return res                 
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        /**
         * @function showMsgPostModified show a succes msg after post's modification
         */
        showMsgPostModified(){
            this.modifiedPost = true;
            setTimeout(()=> {
                this.modifiedPost = false
            },1000)
        },
        /**
         * @function logout log out the user by errasing the localStorage which contains token
         */
        logout(){
            localStorage.removeItem('user')
            this.$router.push({name : 'Authentification'})
        },

        
    },
    mounted() {
        this.setHeadersRequest()
        this.displayUserConnected()
        this.getAllPost();
        if(this.$route.params.success){
            //if params success in the route is true show msg
            this.showMsgPostModified()
        }
        this.getUser()
    },
}
</script>

<template>
    <div class="home">
    <div class="user">
        <p class="user__p"> 
            <i class="fa-regular fa-user"></i>
            {{ firstNameUserConnected }} {{ lastNameUserConnected }}</p>
    </div>
    <div class="btn-choice">       
        <div class="btn-choice__left">
            <button class="btn-choice__all btn-hover" id="homebtn" title="Accueil" @click="switchMode('home')" :class="{'btn-focus' : mode == 'home'}">
                <i class="fa-solid fa-house-user"></i>
            </button>
            <button class="btn-choice__add btn-hover" id ="postbtn" title="Ajouter une publication" @click="switchMode('create')" :class="{'btn-focus' : mode == 'create'}" >
                <i class="fa-brands fa-telegram"></i>
            </button>
        </div>
        <div class="btn-choice__right">
            <button class="btn-choice__logout btn-hover" @click="logout" title="Déconnexion">
                <i class="fa-solid fa-right-from-bracket"></i>
            </button>
        </div>
    </div>
    <section class="create-card">
        <CreatePostComponent v-if="mode == 'create'" @postCreated="switchToHome"></CreatePostComponent>
    </section>
        
    <section class="card-display" v-if="mode == 'home'">
        <div class="post-card" v-for="item in postContents" :key="item._id" >
            <div class="post-card__top-banner" >
                <p class="post-card__userName">{{ item.firstName }} {{ item.lastName}}</p>
                <div class="othericons">
                <span class="post-card__edit-btn" v-if="isOwner(item.userId) || isAdmin" @click="swicthToEdit(item._id)" title="Modifier">
                    <button type="button" class="btn btn-primary" id="btn1"><i class="fa-solid fa-pencil"></i></button>
                </span>
                <span class="post-card__delete-btn" @click="deletePost(item._id)" v-if="isOwner(item.userId) || isAdmin" title="Supprimer">
                    <button type="button" class="btn btn-outline-secondary" id="btn2"><i class="fa-solid fa-trash"></i></button>
                </span>
                </div>
            </div>
            <div class="post-card__img">
                <img class="post-card__img__photo" v-if="item.imageUrl" :src="item.imageUrl" :alt="item.imageUrl">
            </div>
            <div class="post-card__liked">
                <i class="fa-solid fa-thumbs-up post-card__liked__full" v-if="isLiked(item)" @click="dislike(item._id)"></i>
                <i class="fa-regular fa-thumbs-up post-card__liked__empty" v-else @click="like(item._id)"></i>
                <span  v-if="item.likes >= 1" class="post-card__liked__number">{{ item.likes }}</span>
            </div>
            <span class="post-card__text">{{ item.legend }}</span>
        </div>
    </section>

</div>
</template>

<style lang="scss">
.user{
    display: flex;
    justify-content: end;
    margin :0;
    margin-right :30px;
    padding:0;
    @media screen and (max-width: 360px){
        margin-right: 10px;
        }
    &__p{
        max-width:fit-content;
        margin-top: 10px;
        margin-bottom: 10px;
       font-size: 16px;
       font-weight: 700;
       color :#4E5166
    }
    &__icon{
        font-size : 24px;
        margin-right:5px;
        margin-bottom: 10px;
        margin-top: 10px;
    }
}
#postbtn{
    width: 60px;
    height: 40px;
}
#homebtn{
    width: 60px;
    height: 40px;

}
#btn1{
    background-color: #26A8FF;
    border: 0.5px solid #f2f2f2;
    color: white;
    width: 40px;
    height: 30px;
    border-radius: 10px;
    &:hover{
        transform : scale(1.10);
        background: darken(#26A8FF, 10%);
        cursor: pointer;
    }
}
#btn2{
    background-color: #26A8FF;
    border: 0.5px solid #f2f2f2;
    color: white;
    width: 40px;
    height: 30px;
    border-radius: 10px;
    &:hover{
        transform : scale(1.10);
        background: darken(#26A8FF, 10%);
        cursor: pointer;
    }
}
@media screen and (min-width: 320px) and (max-width: 360px) {
    .othericons{
        display: flex;
        flex-direction: row;

    }
}
@media screen and (min-width: 361px) and (max-width: 480px) {
    .othericons{
        display: flex;
        flex-direction: row;
        margin-left: -40px;
    }
}
@media screen and (min-width: 481px) {
    .othericons{
        display: flex;
        margin-left: 90px;
    }
}
.btn-choice{

    position :sticky;
    top:10px;
    display:flex;
    flex-direction: row;
    flex-wrap :wrap;
    justify-content: space-between;
    height: 40px;
    @media screen and (max-width: 550px){
        display:flex;
        align-items: center;
        flex-wrap: nowrap;
        background-color: #f2f2f2;
        top:-0.5px;
    }
    &__right {
        margin-right : 25px;
        @media screen and (max-width: 550px){
        margin-right: 20px;
        }
        @media screen and (max-width: 360px){
        margin-right: 10px;
        }
    }
    &__left{
        margin-left:25px;
        width:60% ;
        @media screen and (max-width: 550px){
        margin-left: 20px;
        }
        @media screen and (max-width: 360px){
        margin-left: 10px;
        }
    }
    &__all {
        margin-right :15px;
        font-weight:700;
        font-size: 15px;
        background-color: #26A8FF;
        color: white;
        border :none;
        border-radius: 10px;
        width : 50px;
        height : 35px;
    }
    &__add {
        font-size: 15px;
        font-weight:700;
        background-color: #26A8FF;
        color: white;
        border :none;
        border-radius: 10px;
        width : 50px;
        height : 35px;
    }
    &__logout {
        &__icon{
            display:none;
            @media screen and (max-width:550px){
                display:contents;
                font-size:15px
            }
        }
        font-size: 15px;
        font-weight:700;
        background-color: #26A8FF;
        color: white;
        border :none;
        border-radius: 10px;
        width : 80px;
        height : 40px;
        @media screen and (max-width: 550px){
            width : 50px;
            font-size:12px;
        }
        &__text{
            @media screen and (max-width:550px) {
                display:none;
            }
        }
    }
}
.btn-hover:hover {
    cursor: pointer;
    transform : scale(1.10);
    background: darken(#26A8FF, 10%);
}
.btn-focus {
    background: darken(#26A8FF, 10%)
}
.create-card{
    display:flex;
    justify-content: center;
    @media screen and (max-width:500px){
        width:90%;
    }
}
.card-add__msg{
    margin-top : 40px;
    font-size: 20px;;
}
.card-display{
    margin-top : 10px;
    padding : 25px;
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
}
textarea{
    border: none;
    background: transparent;
    -webkit-appearance: none;
    -moz-apperarance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    outline: none;
    resize: none;
    overflow: hidden;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    -ms-box-shadow: none;
    -o-box-shadow: none;
    box-shadow: none;
}
.post-card{
    width : 500px;
    max-height: 500px;
    border-radius: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 25px;
    @media screen and (max-width:360px){
        width:270px;
    }
    @media screen and (min-width: 361px) and (max-width: 480px) {
        width: 350px;
    }
    &__top-banner{
        margin-top :16px;
        margin-left : 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 500px;
        @media screen and (max-width:360px){
        max-width:260px;
        }
    }
    &__userName{
        margin :0;
        font-size:16px;
        font-weight:700;
        width :280px;
        @media screen and (max-width:360px){
        width:200px;
        }
    }
    &__edit-btn{
        font-size:16px;
        margin-right: 8px;
        &:hover{
            color:grey;
            cursor :pointer;
        }
    }
    &__delete-btn{
        font-size:16px;
        margin-right:10px;
        &:hover{
            color:grey;
            cursor :pointer;
        }
    }
    &__img{
        margin-top: 10px;
        max-height: 300px;
        width:500px;
        @media screen and (max-width:360px){
            max-width: 270px;
        }
        @media screen and (min-width: 361px) and (max-width: 480px) {
        width: 350px;
        }
        &__photo{
            width :500px;
            height :300px;
            object-fit :cover;
            @media screen and (max-width:360px){
                width:270px;
                object-fit:cover;
            }
            @media screen and (min-width: 361px) and (max-width: 480px) {
                width: 350px;
            }
        }
    }
    &__liked{
        margin-left:10px;
        margin-top:5px;
        display:flex;
        justify-content: flex-end;
        font-size : 18px;
        &__full{
            color: #26A8FF;
            &:hover{
                cursor :pointer;
            }
        }
        &__empty{
            display: flex;
            justify-content: flex-end;
            &:hover{
                color :#26A8FF;
                cursor :pointer;
            }
 
        }
        &__number{
            width: 260px;
            margin-left :3px;
            font-size : 12px;
            color:#4E5166;
        }
    }
    &__text{
        word-wrap: break-word;
        white-space:pre-line;
        overflow:hidden;
        text-overflow: ellipsis;
        width: 320px;
        max-height: 200px;
        margin: 5px 10px 20px;
        @media screen and (max-width:360px){
            width:250px;
        }
    }
}
</style>