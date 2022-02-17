import {createCRUD} from '~/plugins/crud';

const crudModule = createCRUD({
  resource: 'trade',
});

const state = () => crudModule.state;
const { actions, mutations, getters } = crudModule;

export {
  state,
  actions,
  mutations,
  getters
}
