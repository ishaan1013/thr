// "use server";

// import { revalidatePath } from "next/cache";
// import prisma from "./prisma";

// export async function createTask(id: string, path: string, dateId: string) {
//   console.log("created");

//   await prisma.task.create({
//     data: {
//       id: id,
//       text: "New Task",
//       checked: false,
//       dateId,
//       label: "RED",
//     },
//   });

//   revalidatePath("/editor/" + path);
// }

// export async function updateTask(itemId: string, text: string) {
//   await prisma.task.update({
//     where: {
//       id: itemId,
//     },
//     data: {
//       text,
//     },
//   });
// }

// export async function relabelTask(itemId: string, label: Label) {
//   await prisma.task.update({
//     where: {
//       id: itemId,
//     },
//     data: {
//       label,
//     },
//   });
// }

// export async function checkTask(itemId: string, newState: boolean) {
//   const updated = await prisma.task.update({
//     where: {
//       id: itemId,
//     },
//     data: {
//       checked: newState,
//     },
//   });

//   console.log("checked: ", updated);
// }

// export async function deleteTask(path: string, itemId: string) {
//   // DELETE task, return status

//   await prisma.task.delete({
//     where: {
//       id: itemId,
//     },
//   });

//   revalidatePath("/editor/" + path);
// }
