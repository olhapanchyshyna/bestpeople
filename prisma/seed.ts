import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const b = ["The rich content of isoflavones, especially gynestein, has an inhibitory effect on the development of cancer cells. The most pronounced effect is observed in oncology of the stomach, pancreas, reproductive system and intestines. In addition, ginestein reduces blood clotting and prevents blood clots. Isoflavones have an antioxidant effect, protecting cell membranes from damage by free radicals, stopping the aging process. A number of studies show that consuming soy protein prevents the development of mastopathy, fibroids, polycystic ovary syndrome and endometriosis in women.", "Soy protein is a hypoallergenic protein, unlike cows milk proteins. Replacing soy protein with milk protein has saved hundreds of thousands of children born with various types of autoimmune diseases.", "Sea buckthorn juice is rich in antioxidants (including the anti-cancer lycopene), which bind free radicals into a stable form and remove toxins from the body, slowing down the aging process and reducing the risk of malignant tumors. Recommended for the prevention and optimization of treatment of atherosclerosis and vascular disorders associated with the deposition of cholesterol plaques and insulin resistance. Also recommended for low acidity of gastric juice and atonic constipation, it strengthens the immune system and has a stimulating effect on the entire body. The results of the study proved the cardioprotective properties of sea buckthorn in obesity.", "Guarana extract improves memory, stimulates brain function, and also prevents the development of atherosclerosis. Indispensable in the fight against chronic fatigue and apathy. Guarana improves metabolism in the body, removes toxins and excess fluid, and also reduces hunger, has a strong stimulating effect, almost 5 times greater than the effect of natural coffee. But at the same time there is no overexcitation and rapid heartbeat! Due to its unique properties, guarana is widely used in the field of sports nutrition. It increases endurance, gives a lot of energy, due to this it becomes possible to increase the load and duration of training."];

const foolDescr = JSON.stringify(b)

const goods = [
  {
    id: 1,
    slug: "cocktail-pistachio",
    img: "['/coktail-pistachio.png', '/coktail-banana.png', '/coktail-salt-caramel.png', '/coktail-strawberry.png']",
    mobileImg: "/coktail-pistachio.png",
    title: "Protein cocktail with pistachio flavor",
    price: "44$",
    category: "popular",
    vendorCode: "99865432123",
    brend: "Wellab",
    descr:
      "dietary balanced nutrition, additional source of protein, vitamins, minerals, reduction of hunger, for people with lactose and/or gluten intolerance",
    foolDescr,
    application:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    howWork:
      "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
  },
  {
    id: 2,
    slug: "cocktail-banana",
    img: "['/coktail-banana.png', '/coktail-pistachio.png', '/coktail-salt-caramel.png', '/coktail-strawberry.png']",
    mobileImg: "/coktail-banana.png",
    title: "Protein cocktail  with banana flavor",
    price: "46$",
    category: "popular",
    vendorCode: "99865432123",
    brend: "Wellab",
    descr:
      "dietary balanced nutrition, additional source of protein, vitamins, minerals, reduction of hunger, for people with lactose and/or gluten intolerance",
     foolDescr,
    application:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    howWork:
      "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
  },
  {
    id: 3,
    slug: "cocktail-salt-caramel",
    img: "['/coktail-salt-caramel.png', '/coktail-banana.png', '/coktail-pistachio.png', '/coktail-strawberry.png']",
    mobileImg: "/coktail-salt-caramel.png",
    title: "Protein cocktail  with salted caramel flavor",
    price: "48$",
    category: "popular",
    vendorCode: "99865432123",
    brend: "Wellab",
    descr:
      "dietary balanced nutrition, additional source of protein, vitamins, minerals, reduction of hunger, for people with lactose and/or gluten intolerance",
     foolDescr,
    application:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    howWork:
      "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
  },
  {
    id: 4,
    slug: "cocktail-strawberry",
    img: "['/coktail-strawberry.png', '/coktail-salt-caramel.png', '/coktail-banana.png', '/coktail-pistachio.png',]",
    mobileImg: "/coktail-strawberry.png",
    title: "Protein cocktail  with strawberry flavor",
    price: "42$",
    category: "popular",
    vendorCode: "1245899",
    brend: "Wellab",
    descr:
      "dietary balanced nutrition, additional source of protein, vitamins, minerals, reduction of hunger, for people with lactose and/or gluten intolerance",
     foolDescr,
    application:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    howWork:
      "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
  },
  {
    id: 5,
    slug: "cocktail",
    img: "['/coktail-strawberry.png', '/coktail-salt-caramel.png', '/coktail-banana.png', '/coktail-pistachio.png',]",
    mobileImg: "/coktail-strawberry.png",
    title: "Protein cocktail  with strawberry flavor",
    price: "42$",
    category: "detox",
    vendorCode: "324790763",
    brend: "Wellab",
    descr:
      "dietary balanced nutrition, additional source of protein, vitamins, minerals, reduction of hunger, for people with lactose and/or gluten intolerance",
     foolDescr,
    application:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    howWork:
      "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
  },
  {
    id: 6,
    slug: "detox-bottle",
    img: "['detox-bottle.png', '/detox-box.png', '/detox-long-box.png', '/detox-bottle-with-box.png']",
    mobileImg: "/detox-bottle-mobile.png",
    title: "Wellab Colostrum detox bottle 550 ml",
    price: "92$",
    category: "detox",
    vendorCode: "358900972",
    brend: "Wellab",
    descr:
      "dietary balanced nutrition, additional source of protein, vitamins, minerals, reduction of hunger, for people with lactose and/or gluten intolerance",
     foolDescr,
    application:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    howWork:
      "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
  },
  {
    id: 7,
    slug: "detox-box",
    img: "[ '/detox-box.png', 'detox-bottle.png', '/detox-long-box.png', '/detox-bottle-with-box.png']",
    mobileImg: "/detox-box-mobile.png",
    title: "Wellab Colostrum detox bottle 550 ml",
    price: "64$",
    category: "detox",
    vendorCode: "7790022",
    brend: "Wellab",
    descr:
      "dietary balanced nutrition, additional source of protein, vitamins, minerals, reduction of hunger, for people with lactose and/or gluten intolerance",
     foolDescr,
    application:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    howWork:
      "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
  },
  {
    id: 8,
    slug: "detox-long-bottle",
    img: "[ '/detox-long-box.png', '/detox-box.png', 'detox-bottle.png', '/detox-bottle-with-box.png']",
    mobileImg: "/detox-long-box.png",
    title: "Wellab Colostrum detox bottle 550 ml",
    price: "52$",
    category: "popular",
    vendorCode: "0097532",
    brend: "Wellab",
    descr:
      "dietary balanced nutrition, additional source of protein, vitamins, minerals, reduction of hunger, for people with lactose and/or gluten intolerance",
     foolDescr,
    application:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    howWork:
      "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
  },
  {
    id: 9,
    slug: "detox-bottle-with-box",
    img: "['/detox-bottle-with-box.png', '/detox-long-box.png', '/detox-box.png', 'detox-bottle.png']",
    mobileImg: "/detox-bottle-with-box.png",
    title: "Wellab Colostrum detox bottle 550 ml",
    price: "52$",
    category: "popular",
    vendorCode: "789976433",
    brend: "Wellab",
    descr:
      "dietary balanced nutrition, additional source of protein, vitamins, minerals, reduction of hunger, for people with lactose and/or gluten intolerance",
     foolDescr,
    application:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    howWork:
      "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const good of goods) {
    const result = await prisma.goods.upsert({
      where: { id: good.id },
      update: {},
      create: good,
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
