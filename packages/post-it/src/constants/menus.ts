import { GroupMenu } from '@code-logs/menubar'
export const menus: GroupMenu[] = [
  {
    name: '글 쓰기',
    subMenus: [
      { name: '새 글 쓰기', route: '/new-post' },
      { name: '이어 쓰기', route: '/edit-post' },
    ],
  },
  {
    name: '설정',
    subMenus: [{ name: '저장소 설정', route: '/settings/repository' }],
  },
]
