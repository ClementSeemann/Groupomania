<script>
export default{
    name: "HeaderComponent"
}
</script>

<template>
    <header>
    <div class="logobanner">
        <img src="../assets/icon-left-font-monochrome-white.png" class="imagebanner" width="250" height="250" alt="Groupomania, le premier réseau social d'entreprise" />
        
    </div>
    <h1>Le réseau social d'entreprise</h1>
    </header>
</template>

<style lang="scss">
    .logobanner{
        display: flex;
        justify-content: center;
        align-content: center;
        margin-top: -50px;
        margin-bottom: -50px;
    }
    header{
        border-bottom: 1px solid grey;
        background-color: #26A8FF;
    }
    h1{
        font-size: 19px;
        display: flex;
        justify-content: center;
        color: white;
        margin-bottom: 40px;
        margin-top: -30px;
        font-weight: normal;

    }
</style>
