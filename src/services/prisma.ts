import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}
// Impede que várias instâncias sejam criadas
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma