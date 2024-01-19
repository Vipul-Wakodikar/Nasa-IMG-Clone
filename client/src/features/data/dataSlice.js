import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
  totalHits: "",
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateSearch: (state, action) => {
      // Create a copy of the state
      const newState = { ...state };

      // Update the value property
      newState.value = action.payload;

      // Return the updated state
      return newState;
    },
    updateTotalHits: (state, action) => {
      const newState = {...state}
      newState.totalHits = action.payload
      return newState
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateSearch, updateTotalHits } = counterSlice.actions

export default counterSlice.reducer