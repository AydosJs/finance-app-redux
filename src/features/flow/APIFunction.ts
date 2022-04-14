import { createAsyncThunk } from "@reduxjs/toolkit";
import { ItemState } from "./flowSlice";

export const assignItems = createAsyncThunk(
  'list/items',
  async () => {
    try {
      const response = await fetch('http://localhost:3000/items', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      return response.json()
    } catch (error) {
      console.log('assignItems error', error)
    }
  });

export const getItemById = createAsyncThunk('item', async (id: number | string) => {
  try {
    const response = await fetch(`http://localhost:3000/items?q=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    return response.json()
  } catch (error) {
    console.log('getItemById error', error)
  }
})

export const createItem = createAsyncThunk('create', async (payload: ItemState) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }

    const resp = await fetch('http://localhost:3000/items', requestOptions)

    return resp.json()
  } catch (error) {
    console.log('CREATE ITEM ERROR', error)
  }
})

export const deleteItem = createAsyncThunk('delete', async (payload: string | number) => {
  try {
    const resp = await fetch(`http://localhost:3000/items/${payload}`, { method: 'DELETE', })
    return payload
  } catch (e) {
    console.log('DELETE ITEM ERROR', e)
  }
})