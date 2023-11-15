import { createSlice } from "@reduxjs/toolkit";
import { generateFileToUrl } from "../helpers/common";

export const authBrandSlice = createSlice({
    name: 'authBrand',
    initialState: {
        brand: null
    },
    reducers: {
        updateAuthBrand: (state, action) => {
            const brand = action.payload;
            let logo = brand.logo;
            
            try {
                logo = JSON.parse(brand.logo)

                if (typeof logo === 'object') {
                    logo = generateFileToUrl(logo.value.data)
                }
            } catch (e) {
                logo = brand.logo;
            }

            return Object.assign({}, state, {
                brand: {...brand, logoUrl: logo},
            })
        }
    }
})

export const {updateAuthBrand} = authBrandSlice.actions;
export default authBrandSlice.reducer;