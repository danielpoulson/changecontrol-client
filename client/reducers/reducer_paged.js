import { LOAD_PAGE } from '../actions/actions_paged';

export default function(state = [], action) {
  switch (action.type) {
    case LOAD_PAGE: {
      const perPage = action.data.perPage || 10;
      const page = action.data.page || 1;
      const offset = (page - 1) * perPage;
      const paginatedItems = state.slice(offset, offset + perPage);

      return {
        page,
        perPage,
        total: state.length,
        total_pages: Math.ceil(state.length / perPage),
        data: paginatedItems
      };
    }

    default:
      return state;
  }
}
