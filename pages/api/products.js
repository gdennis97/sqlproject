import prisma from "../../lib/prisma";

export default async function handle(req, res) {
  const Prof = await prisma.Prof.findMany();
  res.json(Prof);
}