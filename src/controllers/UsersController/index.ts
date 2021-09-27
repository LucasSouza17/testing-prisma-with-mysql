import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (request: Request, response: Response) => {
  try {
    const { name, email, telephone } = request.body;

    await prisma.user
      .create({
        data: {
          name: name,
          email: email,
          telephone: telephone,
        },
      })
      .then((data) => {
        return response.status(200).json({
          sucess:
            "Parabéns " +
            data.name +
            ", seu usuário foi criado com sucesso!!!!",
        });
      })
      .catch((data) => {
        console.log(data);
        return response.status(500).json({
          error:
            "Ops... Deu erro na hora da criação do seu user, tente novamente mais tarde",
        });
      });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "erro fatal consulte o log" });
  }
};

const index = async (request: Request, response: Response) => {
  try {
    await prisma.user
      .findMany()
      .then((data) => {
        return response.status(200).json(data);
      })
      .catch((data) => {
        console.log(data);
        return response.status(404).json({
          error:
            "Ops... Deu erro na hora de buscar os usuários, tente novamente mais tarde",
        });
      });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "erro fatal consulte o log" });
  }
};

const find = async (request: Request, response: Response) => {
  const { id } = request.params;

  try {
    await prisma.user
      .findUnique({ where: { id: Number(id) } })
      .then((data) => {
        return response.status(200).json(data);
      })
      .catch((data) => {
        console.log(data);
        return response.status(404).json({
          error:
            "Ops... Deu erro na hora de buscar os usuários, tente novamente mais tarde",
        });
      });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "erro fatal consulte o log" });
  }
};

const update = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { name, email, telephone } = request.body;

  try {
    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: name,
        email: email,
        telephone: telephone,
      },
    }).then((data) => {
      return response.status(200).json({
        sucess:
          "Parabéns " +
          data.name +
          ", seu usuário foi atualizado com sucesso!!!!",
        user: {
          name: data.name,
          email: data.email,
          telephone: data.telephone
        }
      });
    })
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "erro fatal consulte o log" });
  }
};

export default { create, index, find, update };
