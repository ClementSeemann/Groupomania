<script>
export default{
    name:"Home"
}
</script>

<template>
    <div class="home">
    <div class="user">
        <p class="user__p"> 
            <i class="fa-solid fa-circle-user user__icon"></i>
            {{ firstNameUserConnected }} {{ lastNameUserConnected }}</p>
    </div>
    <div class="btn-choice">       
        <div class="btn-choice__left">
            <button class="btn-choice__all btn-hover" title="Accueil" @click="switchMode('home')" :class="{'btn-focus' : mode == 'home'}">
                <i class="fa-solid fa-house"></i>
            </button>
            <button class="btn-choice__add btn-hover" title="Ajouter une publication" @click="switchMode('create')" :class="{'btn-focus' : mode == 'create'}" >
                <i class="fa-solid fa-circle-plus"></i>
            </button>
        </div>
        <div class="btn-choice__right">
            <button class="btn-choice__logout btn-hover" @click="logout" title="Déconnexion">
                <span class="btn-choice__logout__text">Se déconnecter</span>
                <i class="fa-solid fa-right-from-bracket btn-choice__logout__icon"></i>
            </button>
        </div>
    </div>
    <section class="create-card">
        <p class="card-add__msg" v-if="postCreated">
            <span>&#127881;</span>
            Publication créée !
        </p>
        <p class="card-add__msg" v-if="modifiedPost">
            <span>&#127912;</span>
            Publication modifiée !
        </p>
        <CreatePostComponent v-if="mode == 'create'" @postCreated="switchToHome"></CreatePostComponent>
    </section>
        
    <section class="card-display" v-if="mode == 'home'">
        <p class="empty-post" v-if="showEmptyPost == true"> 
            <span>&#128553;</span> Aucune publication pour le moment..
        </p>
        <div class="post-card" v-for="item in postContents" :key="item._id" >
            <div class="post-card__top-banner">
                <p class="post-card__userName">{{ item.firstName }} {{ item.lastName}}</p>
                <span class="post-card__edit-btn" v-if="isOwner(item.userId) || isAdmin" @click="swicthToEdit(item._id)" title="Modifier">
                    <i class="fa-solid fa-pencil"></i>
                </span>
                <span class="post-card__delete-btn" @click="deletePost(item._id)" v-if="isOwner(item.userId) || isAdmin" title="Supprimer">
                    <i class="fa-solid fa-trash-can" ></i>
                </span>

            </div>
            <div class="post-card__img">
                <img class="post-card__img__photo" v-if="item.imageUrl" :src="item.imageUrl" :alt="item.imageUrl">
            </div>
            <div class="post-card__liked">
                <i class="fa-solid fa-heart post-card__liked__full" v-if="isLiked(item)" @click="dislike(item._id)"></i>
                <i class="fa-regular fa-heart post-card__liked__empty" v-else @click="like(item._id)"></i>
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
        margin: 0;
        margin-bottom: 5px;
       font-size: 16px;
       font-weight: 700;
       color :#4E5166
    }
    &__icon{
        font-size : 20px;
        margin-right:5px;
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
        background-color: white;
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
        background-color: #FFD7D7;
        border :none;
        border-radius: 10px;
        width : 50px;
        height : 35px;
    }
    &__add {
        font-size: 15px;
        font-weight:700;
        background-color: #FFD7D7;
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
        background-color: #FFD7D7;
        border :none;
        border-radius: 10px;
        width : 150px;
        height : 35px;
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
    background: darken(#FFD7D7, 10%);
}
.btn-focus {
    background: darken(#FFD7D7, 10%)
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
}
.post-card{
    width : 350px;
    max-height: 500px;
    border-radius: 20px;
    box-shadow: 0 0 5px rgb(180 178 178);
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 25px;
    @media screen and (max-width:360px){
        width:270px;
    }
    &__top-banner{
        margin-top :16px;
        margin-left : 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        max-width: 330px;
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
        max-width:350px;
        @media screen and (max-width:360px){
            max-width: 270px;
        }
        &__photo{
            width :350px;
            height :300px;
            object-fit :cover;
            @media screen and (max-width:360px){
                width:270px;
                object-fit:cover;
            }
        }
    }
    &__liked{
        margin-left:10px;
        margin-top:5px;
        display:flex;
        align-items: stretch;
        font-size : 16px;
        &__full{
            color: red;
            &:hover{
                cursor :pointer;
            }
        }
        &__empty{
            &:hover{
                color :grey;
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