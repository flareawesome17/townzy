export interface Post {
  id: string
  author: {
    id: string
    name: string
    username?: string
    avatar?: string
    verified?: boolean
  }
  content: string
  image?: string
  createdAt: string
  likes: number
  comments: number
  hashtags?: string[]
  event?: {
    id: string
    title: string
    date: string
    location: string
    image?: string
  }
}
