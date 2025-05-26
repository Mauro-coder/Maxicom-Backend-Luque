import { productsManager } from "../data/dao.factory.js";
import ProductDTO from "../dto/products.dto.js";

const createProductRep = async (data) => {
  data = new ProductDTO(data);
  await productsManager.create(data);
};
const readProductsRep = async (filter) => await productsManager.readAll(filter);
const readOneProductRep = async (pid) => await productsManager.readById(pid);
const updateProductRep = async (pid, data) =>
  await productsManager.updateById(pid, data);
const deleteProductRep = async (pid) => await productsManager.destroyById(pid);
const paginateRep = async (page, limit) =>
  await productsManager.paginate(page, limit);
const pidParamRep = async (pid) => await productsManager.pidParam(pid);

export {
  createProductRep,
  readProductsRep,
  readOneProductRep,
  updateProductRep,
  deleteProductRep,
  paginateRep,
  pidParamRep,
};
