import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createUser = async () => {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'pnartov+1@gmail.com',
    },
  })

  console.info(user)
}

const createUserWithPosts = async () => {
  const user = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'pnartov+2@gmail.com',
      posts: {
        create: {
          title: 'Hello World',
        },
      },
    },
  })

  console.info(user)
}

const findUsers = async () => {
  const users = await prisma.user.findMany()
  console.info(users)
}

const findUsersWithPosts = async () => {
  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.dir(usersWithPosts, { depth: null })
}

async function main() {
  // await createUserWithPosts()
  await findUsersWithPosts()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
