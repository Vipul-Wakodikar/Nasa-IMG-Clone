import { createSlice } from '@reduxjs/toolkit';

const mediaTypes = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
};

const initialState = {
  value: 'image,video,audio', // Set the default value
};

export const mediaTypeSlice = createSlice({
  name: 'mediaType',
  initialState,
  reducers: {
    setMediaType: (state, action) => {
      const { mediaType } = action.payload;
      // Validate the selected media types if needed

      // Create a copy of the state
      const newState = { ...state };

      // Update the value property
      newState.value = mediaType;

      // Return the updated state
      return newState;
    },
  },
});

export const { setMediaType } = mediaTypeSlice.actions;
export default mediaTypeSlice.reducer;