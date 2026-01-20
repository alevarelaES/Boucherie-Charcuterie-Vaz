import { siteSettings } from './siteSettings'
import { openingHours } from './openingHours'
import { hero } from './hero'
import { product } from './product'
import { service } from './service'
import { recipe } from './recipe'
import { homepage } from './homepage'

export const schemaTypes = [
    // Singletons (un seul document)
    siteSettings,
    openingHours,
    hero,
    homepage,

    // Collections (plusieurs documents possibles)
    product,
    service,
    recipe,
]
