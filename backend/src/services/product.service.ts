import Product, { ProductDocument } from '../models/Product';

export async function createProduct(data: Partial<ProductDocument>): Promise<ProductDocument> {
  const product = new Product(data);
  return await product.save();
}

export async function getAllProducts(): Promise<ProductDocument[]> {
  return await Product.find().populate('category').exec();
}

export async function getProductById(id: string): Promise<ProductDocument | null> {
  return await Product.findById(id).populate('category').exec();
}

export async function updateProduct(id: string, data: Partial<ProductDocument>): Promise<ProductDocument | null> {
  return await Product.findByIdAndUpdate(id, data, { new: true }).exec();
}

export async function deleteProduct(id: string): Promise<ProductDocument | null> {
  return await Product.findByIdAndDelete(id).exec();
}
