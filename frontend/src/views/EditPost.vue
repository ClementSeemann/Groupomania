<script>
export default{
    name:"EditPost"
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
                <textarea v-model="legendEdit" class="form-group-edit__legend" rows="5" formControlName="legend"></textarea>
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
        &:hover {
            cursor:pointer;
            color :#26A8FF;
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
        background-color: #f2f2f2;
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
    background-color:#f2f2f2;
    border-radius :30px;
    font-size : 18px;
    font-weight: 700;
    &:hover{
        cursor:pointer;
        background-color: darken(#f2f2f2, 8%);
    }
}
</style>