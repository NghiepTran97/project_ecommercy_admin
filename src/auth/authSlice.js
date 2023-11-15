import { createSlice } from "@reduxjs/toolkit";
import { generateFileToUrl } from "../helpers/common";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        updateAuthUser: (state, action) => {
            const user = action.payload;
            let avatar = user.avatar;
            
            try {
                avatar = JSON.parse(user.avatar)

                if (typeof avatar === 'object') {
                    avatar = generateFileToUrl(avatar.value.data)
                }
            } catch (e) {
                avatar = user.avatar;
            }

            return Object.assign({}, state, {
                user: {...user, avatarUrl: avatar},
            })
        }
    }
})

export const {updateAuthUser} = authSlice.actions;
export default authSlice.reducer;