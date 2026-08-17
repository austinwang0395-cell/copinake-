import fs from 'node:fs/promises';

const source = '../catalog-cleanup/processed.json';
const rows = JSON.parse(await fs.readFile(source, 'utf8'));
const products = rows.map((row) => ({
  id: String(row['商品ID']),
  category: row['一级分类'],
  subcategory: row['二级分类'],
  name: row['标准产品名称'],
  price: Number(row['网页售价（人民币）']),
  priceType: row['价格性质'],
  orderMode: row['订单模式'],
  image: row['合规图片路径'] ? `/products/${row['商品ID']}.jpg` : null,
  status: row['上架状态'],
  specs: row['SKU/规格'],
}));
await fs.mkdir('app/data', { recursive: true });
await fs.writeFile('app/data/products.json', JSON.stringify(products, null, 2));
