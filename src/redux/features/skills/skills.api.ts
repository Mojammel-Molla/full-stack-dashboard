import { baseApi } from '@/redux/base.api';
import { TQueries } from '@/types/api.types';

const skillsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllSkills: builder.query({
      query: (queries: TQueries) => {
        const params = new URLSearchParams();
        if (queries?.length) {
          queries?.map((query) => params.append(query.name, query.value));
        }

        return {
          url: '/skills',
          method: 'GET',
          params,
        };
      },
      providesTags: ['skills'],
    }),
    fetchSkillById: builder.query({
      query: (id: string) => {
        return {
          url: `/skills/${id}`,
          method: 'GET',
        };
      },
      providesTags: (_, __, id) => [{ type: 'skills', id }],
    }),
    createSkill: builder.mutation({
      query: (SkillData) => {
        return {
          url: '/skills',
          method: 'POST',
          body: SkillData,
        };
      },
      invalidatesTags: ['skills'],
    }),
    updateSkill: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/skills/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['skills'],
    }),
    deleteSkill: builder.mutation({
      query: (id) => {
        return {
          url: `/skills/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['skills'],
    }),
  }),
});

export const {
  useFetchAllSkillsQuery,
  useFetchSkillByIdQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation
} = skillsApi;