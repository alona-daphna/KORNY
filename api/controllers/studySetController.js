import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addCardsToSet = async (req, res) => {
  try {
    const { id } = req.params.id;
    // cards must be array of object with term and definition
    // [{term, definition}]
    const { cards } = req.body;

    const set = await prisma.study_sets.findUnique({
      where: {
        set_id: id,
      },
    });

    if (set) {
      const cardsData = cards.map((card) => ({
        term: card.term,
        definition: card.definition,
        set: {
          connect: {
            set_id: set.set_id,
          },
        },
      }));

      await prisma.cards.createMany({
        data: cardsData,
      });

      const updatedSet = await prisma.study_sets.findUnique({
        where: {
          set_id: parseInt(set_id),
        },
        include: {
          cards: {
            select: {
              term: true,
              definition: true,
            },
          },
        },
      });

      res.status(201).json({ set: updatedSet });
    } else {
      res.status(404).json({ error: 'Set not found' });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createSet = async (req, res) => {
  const { name, cards } = req.body;
  try {
    const set = await prisma.study_sets.create({
      data: {
        set_name: name,
      },
    });

    const cardsData = cards.map((card) => ({
      term: card.term,
      definition: card.definition,
      set: {
        connect: {
          set_id: set.set_id,
        },
      },
    }));

    await prisma.cards.createMany({
      data: cardsData,
    });

    const updatedSet = await prisma.study_sets.findUnique({
      where: {
        set_id: set.set_id,
      },
      include: {
        cards: {
          select: {
            term: true,
            definition: true,
          },
        },
      },
    });

    res.status(201).json({ set: updatedSet });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteSet = async (req, res) => {
  try {
    const setToDelete = await prisma.study_sets.findUnique({
      where: {
        set_id: req.params.id,
      },
    });

    if (!setToDelete) return res.status(404).json({ error: 'Set Not Found' });

    await prisma.study_sets.delete({
      where: {
        set_id: req.params.id,
      },
    });
    res.status(200);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getSetById = async (req, res) => {
  try {
    const set = await prisma.study_sets.findUnique({
      where: {
        set_id: req.params.id,
      },
      include: {
        cards: {
          select: {
            term: true,
            definition: true,
          },
        },
      },
    });

    if (!set) return res.status(404).json({ error: 'Set Not Found' });

    res.status(200).json({ set });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllSets = async () => {
  try {
    res.status(200).json(await prisma.study_sets.findMany());
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
