import type { PageParams } from '~/api'
import { request } from '~/api'

export type Post = {
  userID: number
  id: number
  title: string
  body: string
}

/** 
 * 获取全部 Post
 * @returns
 */
export async function getPostListAPI() {
  return request.get<Post[]>('/posts')
}

