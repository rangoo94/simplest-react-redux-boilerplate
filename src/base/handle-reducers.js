/**
 * Make switch/case function to prepare reducer per action.
 *
 * @param {object} reducers
 */
const handleReducers = reducers => (state, action) => {
    state = state || {}

    if (reducers[action.type]) {
        return reducers[action.type](state, action)
    }

    return state
}

export default handleReducers
