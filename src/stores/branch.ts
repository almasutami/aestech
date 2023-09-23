import { defineStore } from 'pinia'
const API_URL = 'https://my-json-server.typicode.com/almasutami/'

export interface Branch {
  id: number
  email: string
  name: string
  address: string
}

interface State {
  branchesList: Branch[]
  totalBranches: number
}

export const branchStore = defineStore('branch', {
  state: (): State => ({
    branchesList: [],
    totalBranches: 0
  }),
  actions: {
    async fetchBranchesList(name: string, take: number, skip: number) {
      console.log(take, skip)
      const response = await fetch(`${API_URL}employee-data/branchs`)
      const result = await response.json()

      if (result) {
        //filter by name, usually done in backend
        const filteredResult = result.filter((branch: Branch) => {
          return branch?.name?.toLowerCase()?.includes(name?.toLowerCase())
        })
        console.log(filteredResult)
        //for pagination, usually done in backend
        const thisPageResult = filteredResult.slice(take, skip)
        this.branchesList = thisPageResult
        this.totalBranches = filteredResult.length || 0
      }

      return { result, error: result ? null : 'error' }
    }
  },
  getters: {}
})
