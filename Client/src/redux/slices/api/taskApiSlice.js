import { UpdateTask } from "../../../../../Server/controllers/TaskController";
import { apiSlice } from "../apiSlice";




const TASK_URL = "/task"

export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => ({
                url: `${TASK_URL}/dashboard`,
                method: 'GET',
                credentials: 'include',
            })
        }),
        getAllTasks: builder.query({
            query: ({ strQuery, isTrashed, search }) => ({
                url: `${TASK_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
                method: 'GET',
                credentials: 'include',
            })
        }),
        CreateTask: builder.mutation({
            query: (data) => ({
                url: `${TASK_URL}/createTask`,
                method: 'POST',
                body: data,
                credentials: 'include',
            })
        }),
        duplicateTask: builder.mutation({
            query: (id) => ({
                url: `${TASK_URL}/duplicate/${id}`,
                method: 'POST',
                body: {},
                credentials: 'include',
            })
        }),
        UpdateTask: builder.mutation({
            query: (data) => ({
                url: `${TASK_URL}/update-task/${data._id}`,
                method: 'PUT',
                body: data,
                credentials: 'include',
            })
        }),
        trashTask: builder.mutation({
            query: ({ id }) => ({
                url: `${TASK_URL}/${id}`,
                method: 'PATCH',
                credentials: 'include',
            })
        }),

        SubTask: builder.mutation({
            query: ({ data, id }) => ({
                url: `${TASK_URL}/create-subtask/${id}`,
                method: 'PUT',
                body: data,
                credentials: 'include',
            })
        }),
        singleTask: builder.query({
            query: (id) => ({
                url: `${TASK_URL}/${id}`,
                method: 'GET',
                credentials: 'include',
            })
        }),
        PostTaskactivity: builder.mutation({
            query: ({ data, id }) => ({
                url: `${TASK_URL}/activity/${id}`,
                method: 'POST',
                body: data,
                credentials: 'include',
            })
        }),
          deleteRestoretask: builder.mutation({
            query: ({ id,actionType }) => ({
                url: `${TASK_URL}/delete-restore/${id}?actionType=${actionType}`,
                method: 'DELETE',
                credentials: 'include',
            })
        }),


    })
});

export const { 
    useGetDashboardStatsQuery,
    useUpdateTaskMutation,
    useTrashTaskMutation,
    useSubTaskMutation,
    useSingleTaskQuery,
    useGetAllTasksQuery,
    useCreateTaskMutation,
    useDuplicateTaskMutation,
    usePostTaskactivityMutation,
    useDeleteRestoretaskMutation
   } = taskApiSlice;