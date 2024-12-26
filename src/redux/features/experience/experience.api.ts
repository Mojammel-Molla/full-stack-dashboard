import { baseApi } from '@/redux/base.api';
import { TQueries } from '@/types/api.types';

const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllExperience: builder.query({
      query: (queries: TQueries) => {
        const params = new URLSearchParams();
        if (queries?.length) {
          queries?.map((query) => params.append(query.name, query.value));
        }

        return {
          url: '/experiences',
          method: 'GET',
          params,
        };
      },
      providesTags: ['experience'],
    }),
    fetchExperienceById: builder.query({
      query: (id: string) => {
        return {
          url: `/experiences/${id}`,
          method: 'GET',
        };
      },
      providesTags: (_, __, id) => [{ type: 'experience', id }],
    }),
    createExperience: builder.mutation({
      query: (experienceData) => {
        return {
          url: '/experiences',
          method: 'POST',
          body: experienceData,
        };
      },
      invalidatesTags: ['experience'],
    }),
    updateExperience: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/experiences/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['experience'],
    }),
    deleteExperience: builder.mutation({
      query: (id) => {
        return {
          url: `/experiences/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['experience'],
    }),
  }),
});

export const {
  useFetchAllExperienceQuery,
  useFetchExperienceByIdQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation
} = experienceApi;