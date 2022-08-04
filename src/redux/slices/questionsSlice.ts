import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export enum statusEnum {
  loading = 'loading',
  success = 'success',
  error = 'error',
}

interface IOwner {
  display_name: string
  reputation: number
}

export interface IItem {
  title: string
  question_id: number
  score: number
  view_count: number
  is_answered: boolean
  owner: IOwner
}

interface Iquestions {
  items: IItem[]
  status: statusEnum
}

const initialState: Iquestions = {
  items: [],
  status: statusEnum.loading,
}

export const fetchQiestions = createAsyncThunk<IItem[], number>(
  'question/fetchQuestion',
  async (date) => {
    const { data } = await axios.get(
      `https://api.stackexchange.com/2.3/questions?pagesize=5&fromdate=${date}&order=desc&sort=votes&tagged=react-redux&site=stackoverflow`
    )
    return data.items
  }
)

const questionsSlice = createSlice({
  name: 'questionsSlice',
  initialState,
  reducers: {
    increment(state, action: PayloadAction<number>) {
      const item = state.items.find(
        (item) => item.question_id === action.payload
      )

      item ? item.score++ : ''
    },
    decrement(state, action: PayloadAction<number>) {
      const item = state.items.find(
        (item) => item.question_id === action.payload
      )

      item ? item.score-- : ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQiestions.pending, (state) => {
      state.items = []
      state.status = statusEnum.loading
    })
    builder.addCase(fetchQiestions.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = statusEnum.success
    })
    builder.addCase(fetchQiestions.rejected, (state) => {
      state.items = []
      state.status = statusEnum.error
    })
  },
})

export const { increment, decrement } = questionsSlice.actions

export default questionsSlice.reducer
