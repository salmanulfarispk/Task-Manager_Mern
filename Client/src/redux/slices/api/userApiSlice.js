import { apiSlice } from "../apiSlice";



const USER_URL = "/user"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
       updateUser: builder.mutation({
           query: (data)=> ({
               url: `${USER_URL}/updateProfile`,
               method: 'PUT',
               body: data,
               credentials: 'include',
           })
       }),

        getTeamList: builder.query({
           query: ()=> ({
               url: `${USER_URL}/getteamlist`,
               method: 'GET',
               credentials: 'include',
           })
       }),

       deleUser: builder.mutation({
        query: (id)=> ({
            url: `${USER_URL}/${id}`,
            method: 'DELETE',
            credentials: 'include',
        })
    }),

       userAction: builder.mutation({
        query: (data)=> ({
            url: `${USER_URL}/${data.id}`,
            method: 'GET',
            credentials: 'include',
        })
    }),
    })
});


export const{ useUpdateUserMutation,useGetTeamListQuery }=userApiSlice;