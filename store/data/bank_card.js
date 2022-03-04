export const state = () => ({
  bank_cards: [
    {
      card_number:'4478 6322 9923 8990',
      user_name:'Someone',
      expire_date:'20/20',
      cvv:'123'
    }
  ],
})
export const getters = {
  bank_cards(state) {
    return state.bank_cards
  },

}
export const mutations = {
  addBankCard(state,payload){
    state.bank_cards.push(payload)
  }
}

