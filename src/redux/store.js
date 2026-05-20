import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import foodReducer from "./slices/foodSlice";

import storageSession from "redux-persist/lib/storage";

import {
    persistStore,
    persistReducer,
} from "redux-persist";

const storage = storageSession.default || storageSession;

// ROOT REDUCER
const rootReducer = combineReducers({
    auth: authReducer,
    food: foodReducer,
});

// PERSIST CONFIG
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"], // only auth persist
};

// PERSISTED REDUCER
const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
);

// STORE
export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// PERSISTOR
export const persistor = persistStore(store);