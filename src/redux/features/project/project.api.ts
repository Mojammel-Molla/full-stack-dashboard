import { baseApi } from '@/redux/base.api';
import { TQueries } from '@/types/api.types';

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllProjects: builder.query({
      query: (queries: TQueries) => {
        const params = new URLSearchParams();
        if (queries?.length) {
          queries?.map((query) => params.append(query.name, query.value));
        }

        return {
          url: '/projects',
          method: 'GET',
          params,
        };
      },
      providesTags: ['projects'],
    }),
    fetchProjectById: builder.query({
      query: (id: string) => {
        return {
          url: `/projects/${id}`,
          method: 'GET',
        };
      },
      providesTags: (_, __, id) => [{ type: 'projects', id }],
    }),
    createProject: builder.mutation({
      query: (ProjectData) => {
        return {
          url: '/projects',
          method: 'POST',
          body: ProjectData,
        };
      },
      invalidatesTags: ['projects'],
    }),
    updateProject: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/projects/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['projects'],
    }),
    deleteProject: builder.mutation({
      query: (id) => {
        return {
          url: `/projects/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['projects'],
    }),
  }),
});

export const {
  useFetchAllProjectsQuery,
  useFetchProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation
} = projectApi;