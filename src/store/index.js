import Vue from "vue";
import Vuex from "vuex";
import puppetsData from "../data/puppets";

Vue.use(Vuex);

function puppet(id) {
  return puppetsData.find(p => {
    return p.id === id;
  });
}

export default new Vuex.Store({
  state: {
    basket: {
      items: [],
      itemsCount: 0,
      show: false
    },
    cartMessage: {
      show: false,
      timeout: 0,
      color: "",
      text: "",
      multiline: false
    },
    puppets: []
  },
  getters: {
    itemsInCart: async state => {
      state.basket.items.length;
    },
    numberInStock: () => puppetId => {
      const puppet = puppetsData.find(p => p.id === puppetId);
      if (puppet) {
        return puppet.numberInStock;
      }
    },
    puppet: state => puppetId => {
      return state.puppets.find(p => p.id === puppetId);
    },
    puppetCartItem: state => puppetId => {
      return state.basket.items.find(i => i.puppet === puppetId);
    },
    puppetAmountInCart: state => puppetId => {
      if (state.items) {
        const cartItem = state.items.find(i => i.puppet === puppetId);
        return cartItem ? cartItem.amount : 0;
      }
      return 0;
    }
  },
  mutations: {
    addToBasket(state, basketItem) {
      state.basket.items = [basketItem, ...state.basket.items];

      // state.basket.itemsCount = state.basket.items.array.reduce((accum, o) => {
      //   return accum + o.amount;
      // });
    },
    deleteBasketItem(state, id) {
      const item = state.basket.items.find(item => item.id === id);
      if (item) {
        state.basket.items.splice(state.basket.items.indexOf(item), 1);
      }
    },
    setPuppets(state, puppets) {
      state.puppets = puppets;
    },
    hideCartMessage(state) {
      state.cartMessage.show = false;
    },
    randomizePuppets(state) {
      state.puppets.map(p => (p.random = Math.random()));
      state.puppets.sort((a, b) => a.random - b.random);
    },
    setRemoveArticleFromCart(state, articleId) {
      state.basket.items = state.basket.items.filter(i => {
        return i.puppet !== articleId;
      });
    },
    setCartItemAmount(state, { cartItem, amount, stockWarning }) {
      const index = state.basket.items.indexOf(cartItem);

      state.basket.items.splice(index, 1, {
        ...cartItem,
        amount,
        stockWarning
      });
    },
    showCartMessage(state, { text, color, timeout, multiline }) {
      state.cartMessage.text = text;
      state.cartMessage.color = color;
      state.cartMessage.timeout = timeout;
      state.cartMessage.multiline = multiline;
      state.cartMessage.show = true;
    },
    toggleCart(state, show) {
      state.basket.show = show;
    }
  },
  actions: {
    addToBasket({ commit, state, dispatch }, basketItem) {
      const item = state.basket.items.find(i => i.puppet === basketItem.puppet);
      if (item) {
        return dispatch("setBasketItemAmount", {
          id: item.id,
          newAmount: item.amount + basketItem.amount
        });
      }

      const numberInStock = puppet(basketItem.puppet).numberInStock;
      const isInStock = basketItem.amount <= numberInStock;

      commit("addToBasket", {
        ...basketItem,
        amount: isInStock ? basketItem.amount : numberInStock,
        stockWarning: isInStock ? null : `only ${numberInStock} in s(t)ock`
      });

      if (!isInStock) {
        return dispatch("showCartMessage", {
          text: `Only ${numberInStock} in s(t)ock, ${numberInStock} added to the shopping cart`,
          color: `error`,
          timeout: 3000,
          multiline: true
        });
      }

      dispatch("showCartMessage", {
        text: `${basketItem.amount} added to the shopping cart.`,
        color: "success",
        timeout: 2000,
        multiline: false
      });
    },
    changeCartItemAmount({ commit, state }, { articleId, amount }) {
      const cartItem = state.basket.items.find(i => {
        return i.puppet === articleId;
      });
      commit("setCartItemAmount", { cartItem, amount });
    },
    checkNumberInStock({ state }, { articleId, amount }) {
      return new Promise((resolve, reject) => {
        const article = state.puppets.find(i => i.id === articleId);

        if (!article)
          return reject({
            message: "article not found"
          });

        const numberInStock = article.numberInStock;

        if (amount > numberInStock) {
          return resolve({
            sufficient: false,
            number: numberInStock,
            message: `We're sorry, currently we have max ${numberInStock} article${
              numberInStock > 1 ? "s" : ""
            } in s(t)ock`
          });
        }
        resolve({
          sufficient: true,
          number: numberInStock,
          message: "stock reaches"
        });
      });
    },
    fetchPuppets({ commit, state }) {
      if (state.puppets.length === 0) {
        const puppets = puppetsData;
        commit("setPuppets", puppets);
      }
    },
    randomizePuppets({ commit }) {
      commit("randomizePuppets");
    },
    removeArticleFromCart({ commit, state }, { articleId }) {
      const cartItem = state.basket.items.find(i => {
        return i.puppet === articleId;
      });
      if (cartItem) {
        commit("setRemoveArticleFromCart", articleId);
      }
    },

    showCartMessage({ commit }, { text, color, timeout, multiline }) {
      commit("showCartMessage", { text, color, timeout, multiline });
    },
    hideCartMessage({ commit }) {
      commit("hideCartMessage");
    },
    toggleCart({ commit }, show) {
      commit("toggleCart", show);
    }
  }
});
