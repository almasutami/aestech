import { defineStore } from 'pinia'
const API_URL = 'https://my-json-server.typicode.com/almasutami/'

export enum Gender {
  Pria = 'L',
  Wanita = 'P'
}

export interface SocMed {
  twitter: string
  facebook: string
  instagram: string
}

export interface Employee {
  id: string
  fullname: string
  gender: Gender
  date_of_birth: string
  position: string
  avatar: string
  branch: {
    id: number
    email: string
    name: string
    address: string
  }
  social_media: SocMed[]
  telepon?: string
  email?: string
  alamat?: string
}

interface State {
  selectedEmployee: Employee | null
}

export const employeeStore = defineStore('employee', {
  state: (): State => ({
    selectedEmployee: null
  }),
  actions: {
    async fetchThisEmployee(id: string) {
      const response = await fetch(`${API_URL}employee-data/${id}`)
      const result = await response.json()

      if (result) {
        this.selectedEmployee = result
      }

      return { result, error: result ? null : 'error' }
    }
  },
  getters: {
    getSelectedEmployee(): Employee | null {
      return this.selectedEmployee
    }
  }
})
