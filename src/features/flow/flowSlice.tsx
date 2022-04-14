import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { assignItems, createItem, deleteItem } from "./APIFunction"

export interface CategoryTypeState {
  id: number,
  title: 'Income' | 'Expense'
}

export interface CategoryState {
  id: number,
  title: string,
  type: number,
  icon: string | null
}

export interface ItemState {
  amount: number | string,
  categoryId: number,
  title: string | null,
  date: string,
  id?: number | string
}

interface IncomeAmountState {
  totalIncomeAmount: number,
  incomeItems: Array<ItemState>,
  type: CategoryTypeState
}

interface expenseAmountState {
  totalEpenseAmount: number,
  expenseItems: Array<ItemState>,
  type: CategoryTypeState
}

interface BaseAmountState {
  totalAmount: number,
  incomeAmount: IncomeAmountState
  expenseAmount: expenseAmountState
}

export interface flowState {
  items: Array<ItemState>,
  category: Array<CategoryState | any>,
  type: Array<CategoryTypeState>,
  baseAmount: BaseAmountState,
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  itemById?: ItemState | object
}

const initialState: flowState = {
  items: [],
  category: [
    {
      id: 1,
      type: 2,
      title: 'Grocery',
      icon: 'https://previews.123rf.com/images/bsd555/bsd5552003/bsd555200303437/143161384-convenience-store-rgb-color-icon-grocery-shop-exterior-small-business-in-retail-duty-free-mall-with-.jpg'
    },
    {
      id: 2,
      type: 2,
      title: 'Netflix',
      icon: 'https://simg.nicepng.com/png/small/151-1510639_netflix-app-icon-png.png'
    }
    ,
    {
      id: 3,
      type: 1,
      title: 'Salary',
      icon: 'https://cdn-icons-png.flaticon.com/512/2631/2631378.png'
    }
  ],
  type: [
    {
      id: 1,
      title: 'Income'
    },
    {
      id: 2,
      title: 'Expense'
    }
  ],
  baseAmount: {
    totalAmount: 0,
    incomeAmount: {
      totalIncomeAmount: 0,
      incomeItems: [],
      type: {
        id: 1,
        title: 'Income'
      }
    },
    expenseAmount: {
      totalEpenseAmount: 0,
      expenseItems: [],
      type: {
        id: 2,
        title: 'Expense'
      }
    }
  },

  itemById: {},
  status: 'idle',
}

export const flowSlice = createSlice({
  name: 'flow',
  initialState,

  reducers: {
    addItem: (state, action: PayloadAction<ItemState>) => {
      const payload = action.payload
      payload.id = String(uid())
    },
    totalAmountControl: (state: flowState) => {

      state.baseAmount.totalAmount = 0

      state.items.map(item => {
        if (typeFounder(item.categoryId).type === 2) {
          state.baseAmount.totalAmount = state.baseAmount.totalAmount - Number(item.amount)
        } else if (typeFounder(item.categoryId).type === 1) {
          state.baseAmount.totalAmount = state.baseAmount.totalAmount + Number(item.amount)
        }
      })
    }
  },

  extraReducers: (builder) => {
    builder.addCase(assignItems.fulfilled, (state, action: PayloadAction<{} | ItemState | any>) => {
      state.items = action.payload
    });
    builder.addCase(createItem.fulfilled, (state, action: PayloadAction<ItemState>) => {
      const payload = action.payload
      // payload.id = String(uid())

      if (typeFounder(payload.categoryId).type === 2) {
        state.baseAmount.totalAmount = state.baseAmount.totalAmount - Number(payload.amount)
        state.baseAmount.expenseAmount.expenseItems.push(payload)
      } else if (typeFounder(payload.categoryId).type === 1) {
        state.baseAmount.totalAmount = state.baseAmount.totalAmount + Number(payload.amount)
        state.baseAmount.incomeAmount.incomeItems.push(payload)
      }
      state.items.push(payload)
    });
    builder.addCase(deleteItem.fulfilled, (state, action: any) => {
      const itemIndex = state.items.findIndex(item => item.id == action.payload)
      state.items = state.items.filter(item => item.id !== action.payload)
      console.log("itemIndex", state.items, itemIndex)
    });
  },
})

const typeFounder = (id: string | number) => {
  return initialState.category.find(item => item.id === id)
}

function uid() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "");
};


export const { addItem, totalAmountControl } = flowSlice.actions
export const flowList = (state: RootState) => state.flow
export default flowSlice.reducer