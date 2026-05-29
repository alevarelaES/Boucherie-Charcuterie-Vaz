import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import { resolve, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('Erreur : variable SANITY_TOKEN manquante.')
  console.error('Usage : $env:SANITY_TOKEN="sk-..." ; node scripts/add-products-sanity.mjs')
  process.exit(1)
}

const client = createClient({
  projectId: 'czmblby4',
  dataset: 'production',
  apiVersion: '2024-01-20',
  token,
  useCdn: false,
})

async function uploadImage(relativePath) {
  const fullPath = resolve(__dirname, '..', relativePath)
  const filename = basename(fullPath)
  console.log(`  Upload image : ${filename}...`)
  const stream = createReadStream(fullPath)
  const asset = await client.assets.upload('image', stream, { filename, contentType: 'image/jpeg' })
  console.log(`  Asset créé : ${asset._id}`)
  return asset
}

async function getMaxOrder() {
  const products = await client.fetch(`*[_type == "product"] | order(order desc)[0].order`)
  return typeof products === 'number' ? products : 0
}

async function createProduct({ name, slug, description, imageAssetId, tag, order }) {
  const doc = {
    _type: 'product',
    name,
    slug: { _type: 'slug', current: slug },
    description,
    image: {
      _type: 'image',
      asset: { _type: 'reference', _ref: imageAssetId },
      alt: name.fr,
    },
    tag,
    availability: 'in_stock',
    order,
  }
  const result = await client.create(doc)
  console.log(`  Produit créé : "${name.fr}" (${result._id})`)
  return result
}

async function main() {
  console.log('Connexion à Sanity (projet czmblby4, dataset production)...\n')

  const maxOrder = await getMaxOrder()
  console.log(`Ordre max existant : ${maxOrder}\n`)

  // --- Côte de boeuf rassis ---
  console.log('1/2 — Côte de boeuf rassis')
  const asset1 = await uploadImage('public/images/Photos Boucherie/Produits/Cote de boeuf rassis.jpeg')
  await createProduct({
    name: {
      fr: 'Côte de boeuf rassis',
      de: 'Gereiftes Rindsentrecôte',
    },
    slug: 'cote-de-boeuf-rassis',
    description: {
      fr: 'Côte de boeuf maturée à sec, tendre et savoureuse. Une pièce d\'exception préparée selon les règles de l\'art par notre boucher.',
      de: 'Trocken gereiftes Rindsentrecôte, zart und aromatisch. Ein außergewöhnliches Stück, von unserem Metzger nach traditioneller Art zubereitet.',
    },
    imageAssetId: asset1._id,
    tag: 'premium',
    order: maxOrder + 1,
  })

  console.log('')

  // --- La ponpinarde ---
  console.log('2/2 — La ponpinarde')
  const asset2 = await uploadImage('public/images/Photos Boucherie/Produits/La ponpinarde.jpeg')
  await createProduct({
    name: {
      fr: 'La ponpinarde',
      de: 'Die Ponpinarde',
    },
    slug: 'la-ponpinarde',
    description: {
      fr: 'Notre spécialité maison — la ponpinarde est une préparation artisanale aux saveurs authentiques, élaborée selon la recette traditionnelle de la maison.',
      de: 'Unsere Hausspezialität — die Ponpinarde ist eine handwerkliche Zubereitung mit authentischen Aromen, nach dem traditionellen Hausrezept hergestellt.',
    },
    imageAssetId: asset2._id,
    tag: 'specialty',
    order: maxOrder + 2,
  })

  console.log('\nTerminé ! Les deux produits sont maintenant publiés dans Sanity.')
  console.log('Rafraîchis le site pour les voir apparaître dans le carousel.')
}

main().catch((err) => {
  console.error('Erreur :', err.message)
  process.exit(1)
})
