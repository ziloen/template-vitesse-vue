import { request, type PageParams } from '~/api'


export type Post = {
  userID: number
  id: number
  title: string
  body: string
}

/** 获取全部 Post
 * @returns
 */
export async function getPostList() {
  return request.get<Post[]>('/posts')
}

