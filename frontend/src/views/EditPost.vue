<script>
export default{
    name :'EditPost',
    data () {
        return {
            imageNameDisplay: 'Aucun fichier choisi',
            legendEdit :'',
            imageURLToPreviewEdit:'',
            imageEdit:'',
        }
    },
    methods : {
        /**
         * @function getOnePost get only one post to display content's post to modify
         */
        getOnePost(){
            const idPost = this.$route.params.id // get post's id by the url of the route
            this.axios.get(`/post/${idPost}`)
                .then((res) => {
                    this.legendEdit = res.data.legend
                    if(!res.data.imageUrl){
                        this.imageURLToPreviewEdit =''
                    } else {
                        this.imageURLToPreviewEdit = res.data.imageUrl
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
        },
        /**
         * @function chooseFile when click on btn custom-btn it clicks on the choice's input btn
         */
        chooseFile(){
            this.$refs.inputValue.click()
        },
        /**
         * @function catchImg get image to displayed on screen before publish
         * @param {*} event : event provides by the change listener on the choose img btn
         */
        catchImg(event){
            const file = event.target.files[0]
            this.imageEdit = file // stock in data imageEdit 
            this.imageNameDisplay = file.name
            this.imageURLToPreviewEdit = URL.createObjectURL(file) // in URL to diplay

        },
        /**
         * @function cancelSelectedImg deselected img 
         */
        cancelSelectedImg(){
            this.imageURLToPreviewEdit = ''
            this.imageNameDisplay = 'Aucun fichier choisi'
            this.imageEdit = 'deleteImg'
        },
        /**
         * @function modifyPost send PUT request to modify the post
         */
        modifyPost(){
            if(this.imageEdit != ''){

                if(this.imageEdit == 'deleteImg'){
                // if image = deleteImg - means user wants to delete an image
                    
                    const idPost = this.$route.params.id // get post's id by the url of the route

                    // get userId, user's first and last name from the localStorage
                    let getUserInfos = JSON.parse(localStorage.getItem("user"))
                    const userIdSend = getUserInfos.userId 
                    const userFirstName = getUserInfos.firstName
                    const userLastName = getUserInfos.lastName

                    // create a formData object to send 
                    let formData = new FormData();
                    formData.append('userId', userIdSend)
                    formData.append('firstName', userFirstName)
                    formData.append('lastName', userLastName)
                    formData.append('legend', this.legendEdit)
                    formData.append('image', this.imageEdit) // using 'image' instead of 'imageUrl' so multer can find the file
                    formData.append('likes', 0)
                    formData.append('usersLiked', [])

                    // PUT request
                    this.axios.put(`/post/${idPost}`, formData)
                        .then((res) => {
                            this.$router.push( {name :'Home', params : {success: true }})
                            return res
                        })
                        .catch((error)=>{
                            console.log(error)
                        }) 

                }else{
                //this.imageEdit = something

                    const idPost = this.$route.params.id // get post's id by the url of the route

                    // get userId, user's first and last name from the localStorage
                    let getUserInfos = JSON.parse(localStorage.getItem("user"))
                    const userIdSend = getUserInfos.userId 
                    const userFirstName = getUserInfos.firstName
                    const userLastName = getUserInfos.lastName

                    // create a formData object to send 
                    let formData = new FormData();
                    formData.append('userId', userIdSend)
                    formData.append('firstName', userFirstName)
                    formData.append('lastName', userLastName)
                    formData.append('legend', this.legendEdit)
                    formData.append('image', this.imageEdit) // using 'image' instead of 'imageUrl' so multer can find the file
                    formData.append('likes', 0)
                    formData.append('usersLiked', [])

                    // PUT request
                    this.axios.put(`/post/${idPost}`, formData)
                        .then((res) => {
                            this.$router.push( {name :'Home', params : {success: true }})
                            return res
                        })
                        .catch((error)=>{
                            console.log(error)
                        }) 
                }     
            } else {
            // else user doesn't modify img so there is no image to send to the server, the user changes only text

                const idPost = this.$route.params.id // get post's id by the url of the route

                // get userId, user's first and last name from the localStorage
                let getUserInfos = JSON.parse(localStorage.getItem("user"))
                const userIdSend = getUserInfos.userId 
                const userFirstName = getUserInfos.firstName
                const userLastName = getUserInfos.lastName

                // create a formData object to send 
                let formData = new FormData();
                formData.append('userId', userIdSend)
                formData.append('firstName', userFirstName)
                formData.append('lastName', userLastName)
                formData.append('legend', this.legendEdit)               
                formData.append('likes', 0)
                formData.append('usersLiked', [])

                // PUT request
                this.axios.put(`/post/${idPost}`, formData)
                    .then((res) => {          
                        this.$router.push( {name :'Home', params : {success: true }})
                        return res
                    })
                    .catch((error)=>{
                        console.log(error)
                    })   
            }
        },
        /**
         * @function backToHome to swicth from EditPost view to Home view
         */
        backToHome(){
            this.$router.push({name: 'Home'})
        },
    },
    mounted () { 
            this.getOnePost()
    },
}
</script>

<template>
    <div class="card-edit">
        <div>
            <i class="fa-solid fa-circle-left card-edit__backToHome" title="Accueil" @click="backToHome()"></i>
        </div>
        <form @submit.prevent="modifyPost" enctype="multipart/form-data">
            <div class="form-group-edit__first">
                <div id="img-edit" v-if="imageURLToPreviewEdit !=''">    
                    <img id="img-edit-display" :src="imageURLToPreviewEdit">
                </div>
                <div class="card-edit__choose-file">
                    <input ref="inputValue" @change="catchImg" type="file" accept="image/*" hidden="hidden" >
                    <button type="button" class="card-edit__custom-btn" @click="chooseFile()">
                        <i class="fa-solid fa-image"></i>
                        Choisir un fichier
                    </button>
                    <span class="card-edit__custom-text">{{ imageNameDisplay }}</span>
                    <div class="card-edit__noMoreImg" @click="cancelSelectedImg">
                        <i  class="fa-solid fa-ban"></i>
                    </div>
                </div>
            </div>
            <div class="form-group-edit">
                <label for="legend">Ajouter une légende :</label>
                <textarea v-model="legendEdit" class="form-group-edit__legend" id="legend" rows="5" formControlName="legend"></textarea>
            </div>
            <button class="btn-editpost" >
                <i class="fa-solid fa-pencil"></i>
                Modifer
            </button>
        </form>
    </div>
</template>

<style lang="scss">
    .card-edit{
    margin:10px 20px;
    &__backToHome{
        font-size :30px;
        color: #26A8FF;
        &:hover {
            cursor:pointer;
            color :lightgray;
            transform: scale(1.10);
        }
    }
    & form{
        margin-top:30px;
        display: flex;
        flex-direction: column;
        align-items:center;
    }
    &__choose-file{
        display: flex;
        flex-direction: row;
        align-items: baseline;
    }
    &__custom-btn{
        background-color: #26A8FF;
        color: white;
        border:none;
        border-radius: 10px;
        width : 155px;
        height: 30px;
        text-align:center;
        font-size: 15px;
        margin-bottom:10px;
        &:hover{
            cursor:pointer;
            background-color: darken(#f2f2f2, 8%);
        } 
    }
    &__noMoreImg{
        margin-left : 10px;
        color :#26A8FF;
        &:hover{
            cursor:pointer;
            transform: scale(1.10);
        } 
    }
    &__custom-text{
        margin-left:5px;
    }
}
.form-group-edit {
    margin-bottom: 40px;
    width:80%;
    display:flex;
    justify-content: center;
    &__first{
        display:flex;
        flex-direction: column;
        align-items: center;
    }
    &__legend{
        margin-left: 5px;
        width : 60%;
    }
}
#img-edit{
    max-width: 300px;
    height:300px;
    margin-bottom: 10px;
    text-align: center;
}
#img-edit-display{
    width: 300px;
    height:300px;
    object-fit: cover;
}
.btn-editpost{
    width :200px;
    height : 40px;
    border:none;
    background-color:#26A8FF;
    color: white;
    border-radius :30px;
    font-size : 18px;
    font-weight: 700;
    margin-bottom: 30px;
    &:hover{
        cursor:pointer;
        background-color: darken(#f2f2f2, 8%);
    }
}
</style>