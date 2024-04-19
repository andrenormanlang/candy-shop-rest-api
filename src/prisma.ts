// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient({
// 	log: ['error', 'info', 'warn']
// })

// export default prisma
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
	log: ['error', 'info', 'warn']
});

(async () => {
  try {
    console.log(await prisma.widget.create({ data: { } }));
  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    prisma.$disconnect();
  }
})();

export default prisma;