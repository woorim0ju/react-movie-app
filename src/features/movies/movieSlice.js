import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    //const movieText = "Harry";
    const res = await movieApi.get(
      //`?apikey=${APIKey}&s=${movieText}&type=movie`
      `?apikey=${APIKey}&s=${term}&type=movie`
    );
    return res.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    //const seriesText = "Friends";
    const res = await movieApi.get(
      //`?apikey=${APIKey}&s=${seriesText}&type=series`
      `?apikey=${APIKey}&s=${term}&type=series`
    );
    return res.data;
  }
);

export const fetchAsyncSelectedOneDetail = createAsyncThunk(
  "movies/fetchAsyncSelectedOneDetail",
  async (id) => {
    const res = await movieApi.get(`?apikey=${APIKey}&i=${id}&Plot=full`);
    return res.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedOne: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducer: {
    removeSelectedOne: (state) => {
      //71번에서 action을 export 하기
      state.selectedOne = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("movies fulfilled");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("rejected");
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("shows fulfilled");
      return { ...state, shows: payload };
    },
    [fetchAsyncSelectedOneDetail.fulfilled]: (state, { payload }) => {
      console.log("selected one fulfilled");
      return { ...state, selectedOne: payload };
    },
  },
});

export const { removeSelectedOne } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies; //name: movies의 movies property
export const getAllShows = (state) => state.movies.shows; //name: movies의 shows property
export const getSelectedOne = (state) => state.movies.selectedOne; //name: movies의 selectedOne property
export default movieSlice.reducer;
