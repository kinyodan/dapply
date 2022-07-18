import {apiGetClient, apiPostClient} from './axios-config';

export default {
  lisApplications(){
    return apiGetClient.get(`/student_applications`)
  },

  addApplication(){
    return apiPostClient.post(`/student_applications`)
  },
  getApplication(uuid){
    return apiGetClient.get(`/student_applications/${uuid}`)

  }
}
