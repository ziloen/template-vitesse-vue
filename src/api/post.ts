import z from "zod"
import type { PageParams } from '~/api'
import { request } from '~/api'

const post = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
})

export type Post = z.infer<typeof post>


/** 
 * 获取全部 Post
 * @returns
 */
export async function getPostListAPI() {
  return (await request.get<Post[]>('/posts', { 
    responseZod: post
  })).data
}

