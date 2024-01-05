const columnsTranslations: { [key: string]: string } = {
  id: 'ID',
  name: 'Nome',
  brand: 'Marca',
  price: 'Preço',
  price_sign: 'Símbolo ',
  currency: 'Moeda',
  image_link: 'Url da Imagem',
  product_link: 'Url do Produto',
  website_link: 'Url do Website',
  description: 'Descrição',
  rating: 'Avaliação',
  category: 'Categoria',
  product_type: 'Tipo do Produto',
  tag_list: 'Lista de Etiquetas',
  created_at: 'Criado em',
  updated_at: 'Atualizado em',
  product_api_url: 'URL da API Produto',
  api_featured_image: 'Imagem da API',
  product_colors: 'Cores do Produto',
}

export function translateColumn(key: string) {
  return columnsTranslations[key].toUpperCase() || key.toUpperCase()
}
