<script>
import SignUp from '../components/SignUpComponent.vue';
import LogIn from '../components/LogInComponent.vue';

export default {
    name :'Authentification', 
    components : {SignUp, LogIn},
    data : function() {
        return { 
            mode : 'login',
            email :'',
        }
    },
    methods : {
        /**
         * @function show to show the right component following the button clicked
         * @param {*} params which is the state/ component we want
         */
        show(params){
            if(params == 'login'){
                this.mode = 'login'
            }else {
                this.mode = 'signup'
            }
        },
        /**
         * @function switchTab to switch from signup to login component with the email adress of the user
         * @param {*} email : the email send by the signup Component
         */
        switchTab(email){
            if(this.mode =='signup'){
                this.mode = 'login'
                this.email = email
            }
            
        }
    },
    mounted(){
        localStorage.clear()
    }
}
</script>

<template>
    <div class="authentification">
        <div class="button-auth">
            <button class="button-auth__auth" @click="show('signup')" :class="{'focus': mode == 'signup'}">S'inscrire</button>           
            <button class="button-auth__auth" @click="show('login')" :class="{'focus': mode == 'login'}">Se connecter</button>
        </div>
        <div class="auth-card">
            <SignUp class="card-log" @signup="switchTab" v-if="mode == 'signup'"></SignUp>
            <LogIn class="card-log" :email="email" v-if="mode == 'login'"></LogIn>
        </div>
    </div>
</template>

<style lang="scss">
.button-auth{
    font-family: 'Lato' !important;
    margin-top: 40px;
    display :flex;
    flex-direction: row;
    gap: 60px;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    &__auth {
        border:none;
        border-radius: 30px;
        color: #f2f2f2;
        background-color: #26A8FF;
        width : 20%;
        height: 40px;
        font-weight : 700;
        font-size: 15px;
        @media screen and (max-width: 500px){
            width: 30%
        }
        &:hover {
            cursor: pointer;
        }
    }
}
.focus {
     background: #26A8FF;
}
.auth-card {
    display:flex;
    justify-content: center;
    align-items: center;
    margin-bottom : 40px;
}
.card.card-log{
    border: 1px solid #f3f3f3;
    border-radius: 25px !important;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px !important;
}
.form-row__input{
    background-color: #f3f3f3 !important;
    width: 60% !important;
    border: 1px solid #f3f3f3;
    border-radius: 70px !important;
}
.button-auth__auth{
    font-family: 'Lato' !important;
}
#gobutton{
    font-family: 'Lato' !important;
    max-width: 300px;
}
</style>