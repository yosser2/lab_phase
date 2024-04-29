import { apiSlice } from "./ApiSlice";
import { USERS_URL } from "../constants";
import { logout } from "../features/auth/AuthSlice";
import { useId } from "react";


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data, 
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: "POST",
                body: data, 
            }),
        }),

        getUser: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
                providesTags:['User'],
                keepUnusedDataFor :5,      
            }),
            
            deleteUser: builder.mutation({
                query: useId => ({
                    url: `${USERS_URL}/£{userId}`,
                    method:"DELETE",
                })
            }),

            getUserDetails: builder.query({
                query: (id) => ({
                    url: `${USERS_8URL}/£{id}`,
                }),
                keepUnusedDataFor:5,
            }),

            updateUser: builder.mutation({
                query:data =>({
                    url:`${USERS_URL}/${data.userId}`,
                    method:"PUT",
                    body:data,
                }),
                invalidatesTags:["User"],
            }),
    }),
});


export const { useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useGetUserQuery, 
    useGetUserDetailsQuery,
    useDeleteUserMutation, 
    useUpdateUserMutation 
} = usersApiSlice;
