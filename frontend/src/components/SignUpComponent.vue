<script>
  export default {
    name : 'SignUp'
}
</script>

<template>
    <form class="card" @submit.prevent="createAccount()">
        <h1 class="card__title" > Inscription </h1>
        <div class="form-row__name">
            <div class="name">
                <label class="name__label-name" for="firstName">Prénom :</label>
                <input @change="checkFirstName()" v-model="firstName" name="firstName" class="form-row__input-name" type="text" placeholder="Prénom" required/>
                <p class="msgError__name" v-if="showErrorFistname == true">Saisie incorrecte</p>
            </div>
            <div class="name">
                <label class="name__label-name" for="lastName">Nom :</label>
                <input @change="checkLastName()" v-model="lastName" name="lastName" class="form-row__input-name" type="text" placeholder="Nom" required/>
                <p class="msgError__name" v-if="showErrorLastName == true">Saisie incorrecte</p>
            </div>
        </div>
        <div class="form-row">
            <label class="name__label" for="email">Adresse email :</label>
            <input @change="checkEmail()" v-model="email" name="email" class="form-row__input" type="text" placeholder="Adresse Email" required/>
            <p class="msgError" v-if="showErrorEmail == true">Email incorrect</p>
        </div>
        <div class="form-row">
            <label class="name__label" for="password">Mot de passe :</label>
            <input @change="checkPassword()" v-model="password" name="password" class="form-row__input" type="password" placeholder="Mot de passe" required/>
            <p class="msgError" v-if="showErrorPassword == true">Mot de passe incorrect</p>
        </div>
        <div class="form-row__btn">
            <button class="button" :="{'disabled': !validatedFields}" :class="{'button--disabled' : !validatedFields}">Créer un compte</button>
            <p class="msgError__btn" v-if="showErrorCreateAccount == true">Utilisateur déja existant</p>
        </div>    
    </form>
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
    @media screen and (max-width: 500px){
       width :90%;
    }
    &__title{
       display: flex;
       justify-content: center;
       margin-bottom : 20px;
       @media screen and (max-width: 500px){
        font-size : 22px;
       }
    }
}
.form-row{
    display: flex;
    align-items: center;
    flex-direction: column;
    width:100%;
    &__name {
        display: flex;
        flex-direction: row;
    }
    &__btn {
        width:100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &__input{
        background-color: rgb(199, 195, 195);
        width: 90%;
        height: 25px;
        border:none;
        border-radius: 8px;
        margin: 5px 15px;

        &::placeholder {
            padding-left: 5px;
        }    
    }
    &__input-name {
        background-color: rgb(199, 195, 195);
        height: 25px;
        border:none;
        border-radius: 8px;
        width: 80%;
    }
}
.name {
    width :60%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__label {
        margin-top:8px;
        font-size : 15px;
        display :flex;
        align-self: start;
        margin-left : 5%;
    }
    &__label-name {
        display :flex;
        align-self: start;
        margin-left: 10%;
        font-size:15px;
    }
}
input {
    outline: none;
}

.button {
    width: 80%;
    height: 40px;
    background: color #f2f2f2;;
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
    background-color: #f2f2f2;
}
.msgError {
    margin: 0;
    font-size : 12px;
    color:red;
    align-self: start;
    margin-left: 5%;
    &__name {
        margin: 0;
        font-size : 12px;
        color:red;
        align-self: start;
        margin-left:10%
    }
    &__btn{
        color:red;
        margin:0;
        align-self: center;
        margin-bottom : 8px;
        font-size : 12px;
    }
}
</style>