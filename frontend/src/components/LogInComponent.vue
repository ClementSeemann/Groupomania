<script>
export default {
    name : 'LogInCompononent',
    data () {
        return {
            internalEmail :'',
            password :'',
            showErrorEmail :'',
            showErrorPassword:'',
            showError:'',
    }
    },
    props : {
       email:  { type: String, default :''} // email collect from singup
    },
      computed : {
        /**
         * @function validatedFields to check if inputs are empty or not to disabled subscribe button
         */
        validatedFields(){
            if(this.internalEmail =="" & this.password ==""){
                return false
            }else{
                return true
            }
        },
    },
    methods : {
        /**
         * @function checkEmailLogin to check if email's input is correctfully completed
         */
        checkEmailLogin(){
            const emailRegExp = new RegExp("[a-z0-9]+@[a-z]+\\.[a-z]{2,3}");
            let check = emailRegExp.test(this.internalEmail);
            if(!check){
                this.showErrorEmail = true
                return false
            }else {
                this.showErrorEmail = false
                return true
            }
        },
        /**
         * @function checkPasswordLogin to check if password's input is correctfully completed
        */
        checkPasswordLogin(){
            const passwordRegExp = new RegExp("[a-z0-9]+@[a-z]+\\.[a-z]{2,3}");
            let check = passwordRegExp.test(this.password);
            if(!check){
                this.showErrorPassword = true
                return false
            }else {
                this.showErrorPassword = false
                return true
            }
        },
        /**
         * @function login send the POST request to log the user, and stock informations (as the token) in localStorage
         */
        login(){
            if(this.checkEmailLogin || this.checkPasswordLogin){
            //if inputs are correct

                this.axios.post('/auth/login', {
                    email : this.internalEmail,
                    password : this.password
                })
                    .then((res) => {
                        // sotck infos in localStorage
                        localStorage.setItem("user", JSON.stringify({
                            token :res.data.token, 
                            userId : res.data.userId,
                            firstName : res.data.firstName,
                            lastName : res.data.lastName
                        })) 
                        this.$router.push({name: 'Home'}) // go to the home page
                    })
                    .catch((error)=>{
                        this.showError = true;
                        this.password='';
                        console.log(error)
                    })
            }else{
                console.log('error form')
            }
        }
    },
    mounted(){
        this.internalEmail = this.email // the email placeholder of login = the email send by signup component
    }
}
</script>

<template>
    <div class="card">

        <div class="form-row">
            <input v-model="internalEmail" @change="checkEmailLogin" name="email" class="form-row__input" type="text" placeholder="Adresse Email"/>
            <p v-if="showErrorEmail ==true" class="msgError">Email incorrect</p>
        </div>
        <div class="form-row">
            <input v-model="password" name="password" class="form-row__input" type="password" placeholder="Mot de passe"/>
            <p v-if="showErrorPassword == true" class="msgError">Mot de passe erroné</p>
        </div>
        <div class="form-row">
            <button  @click="login()" id="gobutton" class="button-connect" :="{'disabled': !validatedFields}" :class="{'button--disabled': !validatedFields}">Connexion</button>
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
        margin-top: 10px;
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
    color:#26A8FF;
    align-self: start;
    margin-left: 5%;
    &__btn{
        color:#26A8FF;
        align-self: center;
        margin-bottom : 8px;
    }
}
#gobutton{
    border-radius: 30px;
    background-color: #26A8FF;
    color: white;
}
</style>
