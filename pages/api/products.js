import prisma from "../../lib/prisma";

export default async function handle(req, res) {
  const Prof = await prisma.Prof.findMany();
  res.json(Prof);
}

// export async function getServerSideProps() {
//   const updatedCampus = async () => await prisma.Prof.update({
//     where: { email: "gdennis@icstars.org" },
//       data: {
//         profile: {
//           update: {
//             Campus: value
//         },
//       },
//     },
//   });
//   return {
//     props: {updatedCampus}
//   }
// }
