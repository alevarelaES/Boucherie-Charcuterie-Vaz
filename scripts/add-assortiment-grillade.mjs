import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import { resolve, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('Erreur : variable SANITY_TOKEN manquante.')
  console.error('Usage : $env:SANITY_TOKEN="sk-..." ; node scripts/add-assortiment-grillade.mjs')
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
  const order = await client.fetch(`*[_type == "product"] | order(order desc)[0].order`)
  return typeof order === 'number' ? order : 0
}

async function main() {
  console.log('Connexion à Sanity (projet czmblby4, dataset production)...\n')

  const maxOrder = await getMaxOrder()
  console.log(`Ordre max existant : ${maxOrder}\n`)

  console.log('1/1 — Assortiment Grillade')
  const asset = await uploadImage(
    'public/images/Photos Boucherie/Produits/Assortiment grillade/Assortimen grillade 1.jpeg'
  )

  const doc = {
    _type: 'product',
    name: {
      fr: 'Assortiment Grillade',
      de: 'Grillassortiment',
    },
    slug: { _type: 'slug', current: 'assortiment-grillade' },
    description: {
      fr: 'Sélection de pièces à griller.',
      de: 'Auswahl an Grillstücken.',
    },
    image: {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'Assortiment Grillade',
    },
    tag: 'homemade',
    availability: 'in_stock',
    order: maxOrder + 1,
  }

  const result = await client.create(doc)
  console.log(`\n  Produit créé : "Assortiment Grillade" (${result._id})`)
  console.log('\nTerminé ! Le produit est maintenant publié dans Sanity.')
  console.log('Rafraîchis le site pour le voir apparaître dans le carousel.')
}

main().catch((err) => {
  console.error('Erreur :', err.message)
  process.exit(1)
})
