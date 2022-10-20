<script>
export default {
    name : 'LogIn'
}
</script>

<template>
    <div class="card">
        <h2 class="card__title" > Connexion </h2>

        <div class="form-row">
            <label class="form-row__label" for="email">Adresse email :</label>
            <input v-model="internalEmail" @change="checkEmailLogin" name="email" class="form-row__input" type="text" placeholder="Adresse Email"/>
            <p v-if="showErrorEmail ==true" class="msgError">Email incorrect</p>
        </div>
        <div class="form-row">
            <label class="form-row__label" for="password">Mot de passe :</label>
            <input v-model="password" name="password" class="form-row__input" type="password" placeholder="Mot de passe"/>
            <p v-if="showErrorPassword == true" class="msgError">Mot de passe erroné</p>
        </div>
        <div class="form-row">
            <button  @click="login()" class="button-connect" :="{'disabled': !validatedFields}" :class="{'button--disabled': !validatedFields}">Connexion</button>
            <p class="msgError__btn" v-if="showError == true">Email et/ou mot de passe incorrect(s)</p>
        </div>
    </div>
</template>

<style lang="scss">
    .card {
    display : flex;
    flex-direction: column;
    background-color:white;
   box-shadow: 0 0 5px rgb(180, 178, 178);
    width : 50%;
    max-height: 100%;
    border-radius: 20px;
    text-align: center;
    @media screen and (max-width: 500px){
       width :90%;
    }
    &__title{
       display: flex;
       justify-content: center;
       margin-bottom : 15px;
       color : #26A8FF;
       @media screen and (max-width: 500px){
        font-size : 22px;
       }
    }
}
.form-row{
    display: flex;
    justify-content: center;
    &__label {
        width:100%;
        display :flex;
        align-self: start;
        margin-left : 5%;
        font-size: 15px;
    }
    
    &__input{
        background-color: rgb(199, 195, 195);
        width: 90%;
        height: 25px;
        border:0;
        border-radius: 8px;
        margin : 5px 15px;
        &::placeholder {
            padding-left : 5px;
        }
    }
}

.button-connect {
    width: 80%;
    height: 40px;
    background-color: #f2f2f2;
    border :none;
    border-radius: 8px;
    margin: 15px 10px;
    font-weight: 700;
    font-size:medium;
    &:hover {
        cursor: pointer;
        background: darken(#f2f2f2, 8%);

    }
}
.button--disabled:hover{
    background-color: #f2f2f2 ;
}
.msgError {
    margin: 0;
    font-size : 12px;
    color:red;
    align-self: start;
    margin-left: 5%;
    &__btn{
        color:red;
        align-self: center;
        margin-bottom : 8px;
    }
}
</style>
