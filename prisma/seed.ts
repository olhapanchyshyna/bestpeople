import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const goods = [
  {
    id: 1,
    slug: "cocktail-pistachio",
    img: "/coktail-pistachio.png",
    mobileImg: "/coktail-pistachio.png",
    title: "Protein cocktail with pistachio flavor",
    price: "44$",
    category: "popular",
  },
  {
    id: 2,
    slug: "cocktail-banana",
    img: "/coktail-banana.png",
    mobileImg: "/coktail-banana.png",
    title: "Protein cocktail  with banana flavor",
    price: "46$",
    category: "popular",
  },
  {
    id: 3,
    slug: "cocktail-salt-caramel",
    img: "/coktail-salt-caramel.png",
    mobileImg: "/coktail-salt-caramel.png",
    title: "Protein cocktail  with salted caramel flavor",
    price: "48$",
    category: "popular",
  },
  {
    id: 4,
    slug: "cocktail-strawberry",
    img: "/coktail-strawberry.png",
    mobileImg: "/coktail-strawberry.png",
    title: "Protein cocktail  with strawberry flavor",
    price: "42$",
    category: "popular",
  },
  {
    id: 5,
    slug: "cocktail",
    img: "/coktail-strawberry.png",
    mobileImg: "/coktail-strawberry.png",
    title: "Protein cocktail  with strawberry flavor",
    price: "42$",
    category: "detox",
  },
  {
    id: 6,
    slug: "detox-bottle",
    img: "/detox-bottle.png",
    mobileImg: "/detox-bottle-mobile.png",
    title: "Wellab Colostrum detox bottle 550 ml",
    price: "92$",
    category: "detox",
  },
  {
    id: 7,
    slug: "detox-box",
    img: "/detox-box.png",
    mobileImg: "/detox-box-mobile.png",
    title: "Wellab Colostrum detox bottle 550 ml",
    price: "64$",
    category: "detox",
  },
  {
    id: 8,
    slug: "detox-long-bottle",
    img: "/detox-long-box.png",
    mobileImg: "/detox-long-box.png",
    title: "Wellab Colostrum detox bottle 550 ml",
    price: "52$",
    category: "popular",
  },
  {
    id: 9,
    slug: "detox-bottle-with-box",
    img: "/detox-bottle-with-box.png",
    mobileImg: "/detox-bottle-with-box.png",
    title: "Wellab Colostrum detox bottle 550 ml",
    price: "52$",
    category: "popular",
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const good of goods) {
    const result = await prisma.goods.upsert({
      where: { slug: good.slug }, // Используйте slug вместо id, поскольку это уникальное поле
      update: {}, // Укажите, что нужно обновить, если найдена существующая запись
      create: {
        slug: good.slug,
        img: good.img,
        mobileImg: good.mobileImg,
        title: good.title,
        price: good.price,
        category: good.category,
      },
    });
    console.log(`Created event with id: ${result.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
