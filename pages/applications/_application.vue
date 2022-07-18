<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Student Application
      <nuxt-link slot="right" to="/" class="button">
        Dashboard
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component  title="Profile" icon="account" class="tile is-child">
          <b-field label="Worklow progress">
            <b-input :value="application_item.worklow_progress" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Worklow progress">
            <b-input :value="application_item.workflow_state" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Worklow progress">
            <b-input :value="application_item.workflow_status" custom-class="is-static" readonly />
          </b-field>
          <hr/>
          <!--          <user-avatar class="image has-max-width is-aligned-center" />-->
          <a href="javascript:void(0)" @click="setFile(application_item.degree_certificate);">
            degree_certificate<i class="fa fa-file-pdf-o " aria-hidden="true" ></i>
          </a>
          <hr />
            <a href="javascript:void(0)" @click="setFile(application_item.passport);">
              passport<i class="fa fa-file-pdf-o" aria-hidden="true"></i>
            </a>
          <hr />
            <a href="javascript:void(0)" @click="setFile(application_item.bank_statement);">
              bank_statement<i class="fa fa-file-pdf-o" aria-hidden="true"></i>
            </a>
          <hr />
            <a href="javascript:void(0)" @click="setFile(application_item.previous_visa);">
              previous_visa<i class="fa fa-file-pdf-o" aria-hidden="true"></i>{
            </a>
          <hr />
            <a href="javascript:void(0)" @click="setFile(application_item.bank_statement);">
              personal_statement<i class="fa fa-file-pdf-o" aria-hidden="true"></i>
            </a>
          <hr />
          <a href="javascript:void(0)" @click="setFile(application_item.school_leaving);">
            school_leaving <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
            </a>
          <hr />
            <a href="javascript:void(0)" @click="setFile(application_item.recommendation_letters);">
              personal_statement<i class="fa fa-file-pdf-o" aria-hidden="true"></i>
            </a>

          <b-field label="E-mail">
            <b-input :value="userEmail" custom-class="is-static" readonly />
          </b-field>
        </card-component >
        <card-component >
          <b-field label="Document ">
          </b-field>
          <div style="height: 1050px;">
            <document-display :key="file" :file="file"></document-display>
          </div>
        </card-component>
      </tiles>
    </section>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import ProfileUpdateForm from '@/components/ProfileUpdateForm'
import PasswordUpdateForm from '@/components/PasswordUpdateForm'
import Tiles from '@/components/Tiles'
import UserAvatar from '@/components/UserAvatar'
import DocumentDisplay from '@/components/DocumentDisplay'
import ApplicationsService from "~/services/ApplicationsService";

export default {
  name: 'Student',
  layout:'Default',
  components: {
    UserAvatar,
    Tiles,
    PasswordUpdateForm,
    ProfileUpdateForm,
    HeroBar,
    TitleBar,
    CardComponent,
    DocumentDisplay
  },
  computed: {
    titleStack() {
      return ['Admin', 'Profile']
    },
    ...mapState(['userName', 'userEmail']),
    setApplication() {
      return this.application_item
    },
    getFile(){
      console.log("file")
      return this.file
    }
  },
  head() {
    return {
      title: 'Profile — Admin One Nuxt.js',
    }
  },
  data(){
    return{
      file:"",
      dialog:true,
      application_item:[]
    }
  },
  mounted(){
    // console.log($nuxt.route.query)
    this.getApplication()
  },
  methods:{
    setFile(file){
      this.file=file
      console.log(file)
    },
    async getApplication(){
      console.log(this.$route.params)
      let response = await ApplicationsService.getApplication(this.$route.params.student)
      if(response.data.status){
        this.application_item=response.data.data
        return true
      }
      console.log(this.application_item)
    },
  }
}
</script>
<style scoped>
embed { height:100%; width: 1050px;}
</style>
