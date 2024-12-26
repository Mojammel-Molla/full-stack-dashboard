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
          url: '/experience',
          method: 'GET',
          params,
        };
      },
      providesTags: ['experience'],
    }),
    fetchExperienceById: builder.query({
      query: (id: string) => {
        return {
          url: `/experience/${id}`,
          method: 'GET',
        };
      },
      providesTags: (_, __, id) => [{ type: 'experience', id }],
    }),
    createExperience: builder.mutation({
      query: (ExperienceData) => {
        return {
          url: '/experience',
          method: 'POST',
          body: ExperienceData,
        };
      },
      invalidatesTags: ['experience'],
    }),
    updateExperience: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/experience/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['experience'],
    }),
    deleteExperience: builder.mutation({
      query: (id) => {
        return {
          url: `/experience/${id}`,
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