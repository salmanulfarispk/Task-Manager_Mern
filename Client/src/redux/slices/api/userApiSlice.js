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

       deleteUser: builder.mutation({
        query: (id)=> ({
            url: `${USER_URL}/${id}`,
            method: 'DELETE',
            credentials: 'include',
        })
    }),

       userAction: builder.mutation({
        query: (data)=> ({
            url: `${USER_URL}/${data.id}`,
            method: 'PATCH',
            body: data,
            credentials: 'include',
        })
    }),
     getNotification: builder.query({
        query: ()=> ({
            url: `${USER_URL}/getNotification`,
            method: 'GET',
            credentials: 'include',
        })
    }),
    MarkNotification: builder.mutation({
        query: (data)=> ({
            url: `${USER_URL}/mark-as-read?isReadType=${data.type}&id=${data?.id}`,
            method: 'PUT',
            body:data,
            credentials: 'include',
        })
    }),
    changePassword: builder.mutation({
        query: (data)=> ({
            url: `${USER_URL}/change-Password`,
            method: 'PATCH',
            body:data,
            credentials: 'include',
        })
    }),
    
    })
});


export const{ useUpdateUserMutation,useGetTeamListQuery,useMarkNotificationMutation,useChangePasswordMutation,
               useDeleteUserMutation,useUserActionMutation,useGetNotificationQuery }=userApiSlice;